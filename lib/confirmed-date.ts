/**
 * "October 24, 2026" from an ISO timestamp or date, for the "Details confirmed
 * by the clinic on <date>" marker. Formatted in UTC so the server render and
 * the browser agree on the day. Null when there is no usable date.
 */
export function formatConfirmedDate(value: string | null | undefined): string | null {
  if (!value) return null
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00Z` : value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}
