/**
 * Light spam protection for the free listing forms (submit a clinic, claim a
 * listing). They cost nothing to send, so without this they are an open inbox.
 *
 * Two signals, both silent: a field people never see ("nickname"), and how long
 * the form was on screen before it was sent. A request that trips either gets a
 * normal looking success answer and nothing else happens, so a bot learns
 * nothing. A burst limit per IP caps what one sender can queue up.
 */

export const MIN_FILL_MS = 3_000

const BURST_WINDOW_MS = 10 * 60 * 1000
const BURST_MAX = 3
const bursts = new Map<string, Map<string, number[]>>()

/** Per server instance, per form. Good enough to stop one sender looping. */
export function overBurstLimit(form: string, key: string): boolean {
  const now = Date.now()
  const byKey = bursts.get(form) ?? new Map<string, number[]>()
  bursts.set(form, byKey)

  const recent = (byKey.get(key) ?? []).filter((t) => now - t < BURST_WINDOW_MS)
  recent.push(now)
  byKey.set(key, recent)

  if (byKey.size > 5_000) {
    for (const [k, times] of byKey) {
      if (times.every((t) => now - t >= BURST_WINDOW_MS)) byKey.delete(k)
    }
  }
  return recent.length > BURST_MAX
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  )
}

export function looksAutomated(input: { nickname?: string; elapsedMs?: number }): boolean {
  return Boolean(input.nickname) || input.elapsedMs == null || input.elapsedMs < MIN_FILL_MS
}

/** "www.example.com" and "example.com" from a URL or a bare host. Null if unparseable. */
export function hostnameOf(urlOrHost: string | undefined | null): string | null {
  if (!urlOrHost) return null
  try {
    const url = new URL(/^https?:\/\//i.test(urlOrHost) ? urlOrHost : `https://${urlOrHost}`)
    return url.hostname.toLowerCase().replace(/^www\./, "")
  } catch {
    return null
  }
}

/**
 * Whether an email address is at the clinic's website domain, or a subdomain
 * of it. A hint for the operator, never a check on its own: anyone can type
 * any address, so the operator still has to get a reply from it.
 */
export function emailMatchesWebsite(email: string, website: string | undefined | null): boolean {
  const site = hostnameOf(website)
  const domain = email.split("@")[1]?.toLowerCase().trim()
  if (!site || !domain) return false
  return domain === site || domain.endsWith(`.${site}`) || site.endsWith(`.${domain}`)
}
