/**
 * Helpers for building notification emails out of untrusted form input.
 *
 * The submit and subscribe forms are open to anyone on the internet, and their
 * values are interpolated into an HTML email that lands in a human inbox.
 * Without escaping, a submitter controls the markup of that email and can
 * forge links, so every interpolated value has to pass through here first.
 */

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}

/** Escapes a value for interpolation into HTML text or an attribute. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
}

/** Escapes a value and turns newlines into line breaks, for free text fields. */
export function escapeHtmlMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>")
}

/**
 * Parses a submitted website into an http(s) URL, or null if it is not one.
 *
 * Rejects other schemes so a submission cannot put javascript: or data: behind
 * a link in the notification email. A value with no scheme is retried as https,
 * since people routinely type "example.com".
 */
export function safeHttpUrl(value: unknown): string | null {
  const raw = String(value ?? "").trim()

  if (!raw) {
    return null
  }

  const candidates = raw.includes("://") ? [raw] : [raw, `https://${raw}`]

  for (const candidate of candidates) {
    try {
      const parsed = new URL(candidate)

      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.toString()
      }
    } catch {
      // Try the next candidate.
    }
  }

  return null
}

/**
 * Flattens a value to a single trimmed line for use in an email subject.
 *
 * Keeps a submitter from padding the subject with newlines or unbounded text.
 */
export function singleLineSubject(value: unknown, maxLength = 120): string {
  const flattened = String(value ?? "").replace(/\s+/g, " ").trim()

  return flattened.length > maxLength ? `${flattened.slice(0, maxLength - 1)}…` : flattened
}
