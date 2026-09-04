import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Server-side Supabase client, built lazily from the service-role key.
 *
 * The service-role key bypasses row level security, so this module must never
 * be imported from a client component. Every table it touches is written only
 * by API routes (Stripe webhooks and form handlers) and read only by server
 * components.
 *
 * Returns null when the env vars are absent. That is a supported state: the
 * site keeps working without a database, orders still complete in Stripe, and
 * the notification emails still go out. Only the durable record and the
 * featured-placement flags need Supabase.
 */
let cached: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  if (cached) return cached
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}

export function isStoreConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}
