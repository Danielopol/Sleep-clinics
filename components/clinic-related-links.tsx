import Link from "next/link"
import { Clinic } from "@/lib/data"
import { getClinicRelatedLinks, RelatedLink } from "@/lib/related-links"

function LinkCard({ link }: { link: RelatedLink }) {
  return (
    <Link
      href={link.href}
      className="block rounded-xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--pearl)] to-[var(--cloud)] dark:from-[var(--twilight)] dark:to-[var(--deep-navy)] p-4 transition-colors hover:border-[var(--healing-teal)]"
    >
      <span className="block font-medium text-[var(--text-primary)]">
        {link.label}
      </span>
      {link.sublabel && (
        <span className="mt-1 block text-sm text-[var(--text-secondary)]">
          {link.sublabel}
        </span>
      )}
    </Link>
  )
}

function Pills({ links }: { links: RelatedLink[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--healing-teal)] hover:text-[var(--healing-teal)]"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-10 last:mb-0">
      <h2 className="mb-4 font-[var(--font-display)] text-xl font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      {children}
    </div>
  )
}

/**
 * Internal links shown below a clinic's details.
 *
 * Clinic pages previously emitted no links of their own beyond site
 * navigation, so roughly 5,700 pages were crawl and browsing dead ends. Each
 * section here is omitted entirely when it has nothing real to show, so a
 * clinic that is the only one in its city does not render an empty heading.
 */
export function ClinicRelatedLinks({ clinic }: { clinic: Clinic }) {
  const related = getClinicRelatedLinks(clinic)

  const hasAnything =
    related.siblings.length > 0 ||
    related.cityLink ||
    related.stateLink ||
    related.nearbyCities.length > 0 ||
    related.disorders.length > 0 ||
    related.treatments.length > 0

  if (!hasAnything) {
    return null
  }

  const remaining = related.siblingTotal - related.siblings.length

  return (
    <section className="py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {related.siblings.length > 0 && (
          <Section title={`Other sleep clinics in ${clinic.city}, ${clinic.state}`}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.siblings.map((link) => (
                <LinkCard key={link.href} link={link} />
              ))}
            </div>
            {remaining > 0 && related.cityLink && (
              <Link
                href={related.cityLink.href}
                className="mt-4 inline-block text-sm font-medium text-[var(--healing-teal)] hover:underline"
              >
                View all {related.siblingTotal + 1} clinics in {clinic.city}
              </Link>
            )}
          </Section>
        )}

        {related.disorders.length > 0 && (
          <Section title="Conditions treated at this clinic">
            <Pills links={related.disorders} />
          </Section>
        )}

        {related.treatments.length > 0 && (
          <Section title="Services and treatments">
            <Pills links={related.treatments} />
          </Section>
        )}

        {related.nearbyCities.length > 0 && (
          <Section title={`Other cities in ${related.stateName ?? clinic.state}`}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.nearbyCities.map((link) => (
                <LinkCard key={link.href} link={link} />
              ))}
            </div>
          </Section>
        )}

        <Section title="Browse the directory">
          <div className="grid gap-3 sm:grid-cols-2">
            {related.cityLink && <LinkCard link={related.cityLink} />}
            {related.stateLink && <LinkCard link={related.stateLink} />}
          </div>
        </Section>
      </div>
    </section>
  )
}
