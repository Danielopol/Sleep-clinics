import { Metadata } from "next"
import { TopicHub } from "@/components/topic-hub"
import { ClinicCard } from "@/components/clinic-card"
import { getClinicsData } from "@/lib/clinics"
import { getClinicLocationSlugs, isVaClinic, stateNameFromAbbr } from "@/lib/locations"
import { OG_IMAGE } from "@/lib/og-image"

const PATH = "/va-sleep-clinics"
const TITLE = "VA Sleep Clinics: Veterans Affairs Sleep Centers, Locations & Phone Numbers"

function vaClinicsByState() {
  const groups = new Map<string, ReturnType<typeof getClinicsData>>()
  for (const clinic of getClinicsData().filter(isVaClinic)) {
    const state = getClinicLocationSlugs(clinic)?.stateAbbr ?? clinic.state
    groups.set(state, [...(groups.get(state) ?? []), clinic])
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))
}

export function generateMetadata(): Metadata {
  const total = vaClinicsByState().reduce((sum, [, list]) => sum + list.length, 0)
  const description = `Find ${total} VA sleep clinic locations with addresses and phone numbers. How veterans get a sleep study or sleep apnea care through the VA, and when community care applies.`
  return {
    title: TITLE,
    description,
    alternates: { canonical: `https://www.ussleepclinics.com${PATH}` },
    openGraph: { title: TITLE, description, url: `https://www.ussleepclinics.com${PATH}`, images: OG_IMAGE },
  }
}

export default function VaSleepClinicsPage() {
  const groups = vaClinicsByState()

  return (
    <TopicHub
      path={PATH}
      breadcrumb="VA Sleep Clinics"
      heading="VA Sleep Clinics"
      intro={
        <p>
          The Veterans Health Administration runs sleep medicine programs at many VA medical centers. Below are the VA
          sleep clinic locations in our directory, with addresses and phone numbers. Veterans enrolled in VA health care
          usually start with a referral from their VA primary care team.
        </p>
      }
      faq={[
        {
          question: "How do veterans get a sleep study through the VA?",
          answer:
            "Ask your VA primary care provider for a referral to the sleep clinic. Depending on your symptoms, the VA may send you a home sleep apnea test or schedule an overnight study in a sleep lab, then follow up with treatment such as CPAP.",
        },
        {
          question: "Can I use a non-VA sleep center?",
          answer:
            "Possibly. Through the VA Community Care program, eligible veterans can be referred to a community provider, for example when the VA cannot schedule care within its wait-time standards or the nearest VA facility is too far away. The VA must approve the referral before your visit.",
        },
        {
          question: "What is the phone number for a VA sleep clinic?",
          answer:
            "Each VA sleep clinic listed on this page shows its address and phone number. If a clinic's line does not answer, call the main number of the VA medical center it belongs to and ask for the sleep medicine or pulmonary clinic.",
        },
        {
          question: "Does the VA treat sleep apnea?",
          answer:
            "Yes. VA sleep programs diagnose sleep apnea and provide treatment, including CPAP machines and supplies, for enrolled veterans.",
        },
      ]}
      guideSlugs={[
        "what-to-expect-during-a-sleep-study",
        "home-sleep-test-vs-in-lab-sleep-study",
        "best-cpap-machine-for-beginners",
      ]}
    >
      {groups.map(([state, clinics]) => (
        <div key={state} className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5">VA sleep clinics in {stateNameFromAbbr(state)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {clinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} />
            ))}
          </div>
        </div>
      ))}
    </TopicHub>
  )
}
