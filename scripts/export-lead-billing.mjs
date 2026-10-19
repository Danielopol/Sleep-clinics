#!/usr/bin/env node
/**
 * Exports one month of billable appointment requests, per clinic, for invoicing.
 *
 *   npm run export-lead-billing -- 2026-11
 *
 * With no month, exports last month. Reads SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY from .env. Writes two CSV files under
 * exports/lead-billing/ (gitignored):
 *
 *   <month>-summary.csv  one line per clinic: request count and amount due
 *   <month>-detail.csv   one line per request: reference, date, clinic, fee
 *
 * Neither file holds patient details. Clinics match the reference against the
 * request email they received. Same rules as the lead_billing_monthly view:
 * delivered and billable only, government insured never, months in UTC.
 *
 * This only reports. It charges nothing and sends nothing.
 */

import { createClient } from "@supabase/supabase-js"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const arg = process.argv[2]
let year, month
if (arg) {
  const match = /^(\d{4})-(\d{2})$/.exec(arg)
  if (!match || Number(match[2]) < 1 || Number(match[2]) > 12) {
    console.error(`Expected a month like 2026-11, got "${arg}".`)
    process.exit(1)
  }
  year = Number(match[1])
  month = Number(match[2])
} else {
  const now = new Date()
  const last = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1))
  year = last.getUTCFullYear()
  month = last.getUTCMonth() + 1
}

const label = `${year}-${String(month).padStart(2, "0")}`
const start = new Date(Date.UTC(year, month - 1, 1)).toISOString()
const end = new Date(Date.UTC(year, month, 1)).toISOString()

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (in .env or the environment).")
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })

const rows = []
const PAGE = 1000
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase
    .from("lead_requests")
    .select("id, clinic_slug, clinic_name, insurance_type, fee_cents, created_at, delivered_at")
    .eq("billable", true)
    .eq("status", "delivered")
    .gte("created_at", start)
    .lt("created_at", end)
    .order("clinic_slug")
    .order("created_at")
    .range(from, from + PAGE - 1)

  if (error) {
    console.error("Query failed:", error.message)
    process.exit(1)
  }
  rows.push(...data)
  if (data.length < PAGE) break
}

const ref = (id) => `REQ-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`
const csvCell = (value) => {
  const s = value == null ? "" : String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
const toCsv = (header, lines) => [header, ...lines].map((l) => l.map(csvCell).join(",")).join("\n") + "\n"
const dollars = (cents) => (cents / 100).toFixed(2)

const byClinic = new Map()
for (const r of rows) {
  const entry = byClinic.get(r.clinic_slug) ?? { name: r.clinic_name, count: 0, cents: 0, missingFee: 0 }
  entry.count += 1
  entry.cents += r.fee_cents ?? 0
  if (r.fee_cents == null) entry.missingFee += 1
  byClinic.set(r.clinic_slug, entry)
}

const outDir = join(process.cwd(), "exports", "lead-billing")
mkdirSync(outDir, { recursive: true })

const summaryPath = join(outDir, `${label}-summary.csv`)
writeFileSync(
  summaryPath,
  toCsv(
    ["month", "clinic_slug", "clinic_name", "billable_requests", "requests_without_fee", "amount_usd"],
    [...byClinic].map(([slug, e]) => [label, slug, e.name, e.count, e.missingFee, dollars(e.cents)])
  )
)

const detailPath = join(outDir, `${label}-detail.csv`)
writeFileSync(
  detailPath,
  toCsv(
    ["reference", "clinic_slug", "clinic_name", "created_at_utc", "delivered_at_utc", "insurance_type", "fee_usd"],
    rows.map((r) => [
      ref(r.id),
      r.clinic_slug,
      r.clinic_name,
      r.created_at,
      r.delivered_at,
      r.insurance_type,
      r.fee_cents == null ? "" : dollars(r.fee_cents),
    ])
  )
)

console.log(`${label}: ${rows.length} billable requests across ${byClinic.size} clinics.`)
for (const [slug, e] of byClinic) {
  const warn = e.missingFee ? `  (${e.missingFee} with no fee set on the partner row)` : ""
  console.log(`  ${slug}: ${e.count} requests, $${dollars(e.cents)}${warn}`)
}
console.log(`Wrote ${summaryPath}`)
console.log(`Wrote ${detailPath}`)
