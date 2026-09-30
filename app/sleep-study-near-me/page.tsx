import { Metadata } from "next"
import { TopicHub } from "@/components/topic-hub"
import { getClinicsData } from "@/lib/clinics"
import { getStatesMatching, offersHomeTest, offersInLabStudy, offersSleepStudy } from "@/lib/locations"
import { OG_IMAGE } from "@/lib/og-image"

const PATH = "/sleep-study-near-me"
const TITLE = "Sleep Study Near Me: Find a Sleep Lab or Home Sleep Test"

function counts() {
  const clinics = getClinicsData()
  return {
    inLab: clinics.filter(offersInLabStudy).length.toLocaleString("en-US"),
    home: clinics.filter(offersHomeTest).length.toLocaleString("en-US"),
  }
}

export function generateMetadata(): Metadata {
  const { inLab, home } = counts()
  const description = `Find a sleep study near you. ${inLab} sleep centers list in-lab sleep studies and ${home} list home sleep apnea testing. Browse sleep labs by state and learn what to expect.`
  return {
    title: TITLE,
    description,
    alternates: { canonical: `https://www.ussleepclinics.com${PATH}` },
    openGraph: { title: TITLE, description, url: `https://www.ussleepclinics.com${PATH}`, images: OG_IMAGE },
  }
}

export default function SleepStudyNearMePage() {
  const { inLab, home } = counts()

  return (
    <TopicHub
      path={PATH}
      breadcrumb="Sleep Study Near Me"
      heading="Find a Sleep Study Near You"
      intro={
        <>
          <p>
            A sleep study records your breathing, blood oxygen, heart rhythm, and brain activity while you sleep. It is
            how sleep apnea, narcolepsy, and most other sleep disorders are diagnosed.
          </p>
          <p>
            In our directory, {inLab} sleep centers list in-lab sleep studies (polysomnography) and {home} list home
            sleep apnea testing. Search your city, or pick your state below to see sleep labs near you.
          </p>
        </>
      }
      states={getStatesMatching(offersSleepStudy)}
      stateLabel={(s) => `Sleep studies in ${s.name}`}
      countNoun={["clinic offers testing", "clinics offer testing"]}
      faq={[
        {
          question: "How do I get a sleep study near me?",
          answer:
            "A sleep study is ordered by a doctor, usually your primary care provider or a sleep specialist. Pick a sleep center near you, call to ask which tests it offers and whether it needs a referral, and check with your insurer about prior authorization before you book.",
        },
        {
          question: "What is the difference between an in-lab sleep study and a home sleep test?",
          answer:
            "An in-lab study (polysomnography) is done overnight at a sleep center while a technologist monitors your brain waves, breathing, oxygen, heart rhythm, and leg movements, so it can diagnose the full range of sleep disorders. A home sleep apnea test uses a smaller device you wear in your own bed. It mainly measures breathing and oxygen, so it is used to check adults for obstructive sleep apnea.",
        },
        {
          question: "How long does a sleep study take?",
          answer:
            "An in-lab study is usually a single night: you arrive in the evening and go home the next morning. Some people need a second night, for example to fit a CPAP machine, or a daytime nap test (MSLT) when narcolepsy is suspected. A home sleep test typically covers one to three nights.",
        },
        {
          question: "Does insurance cover a sleep study?",
          answer:
            "Most plans, including Medicare, cover a sleep study when it is medically necessary. Many require prior authorization, and some require a home test first before they will approve an in-lab study. Call your insurer before you schedule.",
        },
        {
          question: "Should I choose an AASM-accredited sleep lab?",
          answer:
            "Accreditation by the American Academy of Sleep Medicine (AASM) means the center's staff, equipment, and scoring have been reviewed against national standards. It is voluntary, so an unaccredited lab can still do good work, but accreditation is a useful signal when you are comparing labs.",
        },
      ]}
      guideSlugs={[
        "what-to-expect-during-a-sleep-study",
        "home-sleep-test-vs-in-lab-sleep-study",
        "how-much-does-a-sleep-study-cost",
        "does-insurance-cover-sleep-studies",
        "why-aasm-accreditation-matters",
        "how-to-choose-the-right-sleep-clinic",
      ]}
    />
  )
}
