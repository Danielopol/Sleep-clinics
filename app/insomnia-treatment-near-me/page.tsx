import { Metadata } from "next"
import { TopicHub } from "@/components/topic-hub"
import { getClinicsData } from "@/lib/clinics"
import { getStatesMatching, treatsInsomnia } from "@/lib/locations"
import { OG_IMAGE } from "@/lib/og-image"

const PATH = "/insomnia-treatment-near-me"
const TITLE = "Insomnia Treatment Near Me: CBT-I and Insomnia Specialists"

function insomniaCount() {
  return getClinicsData().filter(treatsInsomnia).length.toLocaleString("en-US")
}

export function generateMetadata(): Metadata {
  const description = `Find insomnia treatment near you. ${insomniaCount()} sleep clinics treat insomnia, including CBT-I and behavioral sleep medicine. Browse insomnia doctors and specialists by state.`
  return {
    title: TITLE,
    description,
    alternates: { canonical: `https://www.ussleepclinics.com${PATH}` },
    openGraph: { title: TITLE, description, url: `https://www.ussleepclinics.com${PATH}`, images: OG_IMAGE },
  }
}

export default function InsomniaTreatmentNearMePage() {
  return (
    <TopicHub
      path={PATH}
      breadcrumb="Insomnia Treatment Near Me"
      heading="Find Insomnia Treatment Near You"
      intro={
        <>
          <p>
            Chronic insomnia means trouble falling asleep or staying asleep at least three nights a week for three
            months or more. The recommended first treatment is cognitive behavioral therapy for insomnia (CBT-I), not
            sleeping pills.
          </p>
          <p>
            {insomniaCount()} clinics in our directory treat insomnia. Search your city, or pick your state below to find
            an insomnia specialist near you.
          </p>
        </>
      }
      states={getStatesMatching(treatsInsomnia)}
      stateLabel={(s) => `Insomnia treatment in ${s.name}`}
      countNoun={["clinic treats insomnia", "clinics treat insomnia"]}
      faq={[
        {
          question: "What is the best treatment for chronic insomnia?",
          answer:
            "Cognitive behavioral therapy for insomnia (CBT-I) is the first-line treatment recommended by the American Academy of Sleep Medicine and the American College of Physicians. It changes the habits and thoughts that keep insomnia going, and its benefits tend to last after treatment ends. Medication can help in the short term but is usually not the first choice.",
        },
        {
          question: "What kind of doctor treats insomnia?",
          answer:
            "Sleep medicine physicians diagnose insomnia and rule out other causes, and behavioral sleep medicine specialists (usually psychologists) deliver CBT-I. Primary care doctors and psychiatrists also treat insomnia, especially when it occurs with depression or anxiety.",
        },
        {
          question: "How long does CBT-I take?",
          answer:
            "CBT-I is usually four to eight sessions spread over six to eight weeks. Sleep often gets a little worse in the first week or two of sleep restriction before it improves.",
        },
        {
          question: "Do I need a sleep study for insomnia?",
          answer:
            "Usually not. Insomnia is diagnosed from your history and sleep diary. A sleep study is ordered when another disorder, such as sleep apnea or periodic limb movements, may be causing or worsening the insomnia.",
        },
        {
          question: "Can I get CBT-I online?",
          answer:
            "Yes. Many providers deliver CBT-I by video visit, and there are structured digital CBT-I programs. Ask a sleep clinic near you whether it offers telehealth sessions.",
        },
      ]}
      guideSlugs={[
        "cbt-i-for-insomnia-how-it-works",
        "insomnia-vs-sleep-apnea-difference",
        "why-you-wake-up-at-3am",
        "better-sleep-hygiene-tips",
        "telemedicine-for-sleep-disorders",
      ]}
    />
  )
}
