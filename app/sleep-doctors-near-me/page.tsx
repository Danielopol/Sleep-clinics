import { Metadata } from "next"
import { TopicHub } from "@/components/topic-hub"
import { getClinicsData } from "@/lib/clinics"
import { getStatesMatching, offersConsultation } from "@/lib/locations"
import { OG_IMAGE } from "@/lib/og-image"

const PATH = "/sleep-doctors-near-me"
const TITLE = "Sleep Doctor Near Me: Find a Sleep Specialist for Sleep Apnea & More"

function consultCount() {
  return getClinicsData().filter(offersConsultation).length.toLocaleString("en-US")
}

export function generateMetadata(): Metadata {
  const description = `Find a sleep doctor near you. ${consultCount()} sleep clinics offer consultations with sleep medicine specialists for sleep apnea, insomnia, narcolepsy, and restless legs. Browse by state.`
  return {
    title: TITLE,
    description,
    alternates: { canonical: `https://www.ussleepclinics.com${PATH}` },
    openGraph: { title: TITLE, description, url: `https://www.ussleepclinics.com${PATH}`, images: OG_IMAGE },
  }
}

export default function SleepDoctorsNearMePage() {
  return (
    <TopicHub
      path={PATH}
      breadcrumb="Sleep Doctors Near Me"
      heading="Find a Sleep Doctor Near You"
      intro={
        <>
          <p>
            A sleep doctor, or sleep medicine specialist, diagnoses and treats sleep apnea, insomnia, narcolepsy,
            restless legs syndrome, and other sleep disorders. Most trained first in pulmonology, neurology, psychiatry,
            internal medicine, or ENT, and many are board-certified in sleep medicine.
          </p>
          <p>
            {consultCount()} clinics in our directory offer sleep medicine consultations. Search your city, or pick your
            state below to find a sleep specialist near you.
          </p>
        </>
      }
      states={getStatesMatching(offersConsultation)}
      stateLabel={(s) => `Sleep doctors in ${s.name}`}
      countNoun={["clinic offers consultations", "clinics offer consultations"]}
      faq={[
        {
          question: "When should I see a sleep doctor?",
          answer:
            "See a sleep specialist if you snore loudly with pauses or gasps, feel very sleepy during the day despite enough time in bed, have had trouble falling or staying asleep for three months or more, fall asleep suddenly at odd times, have uncomfortable leg sensations at night, or act out your dreams.",
        },
        {
          question: "What kind of doctor treats sleep apnea?",
          answer:
            "A sleep medicine specialist diagnoses sleep apnea and manages treatment such as CPAP. Pulmonologists and ENT surgeons often treat it as well, and dentists trained in dental sleep medicine can fit oral appliances once a physician has made the diagnosis.",
        },
        {
          question: "Do I need a referral to see a sleep specialist?",
          answer:
            "That depends on your insurance rather than the clinic. Many HMO plans require a referral from your primary care doctor, while PPO plans often do not. Check your plan, then ask the clinic whether it accepts self-referrals.",
        },
        {
          question: "What happens at a first sleep medicine appointment?",
          answer:
            "The doctor reviews your symptoms, sleep schedule, medications, and medical history, often with a questionnaire such as the Epworth Sleepiness Scale, and examines your airway. If a sleep disorder is suspected, they may order a home sleep test or an overnight in-lab study.",
        },
        {
          question: "Can I see a sleep doctor online?",
          answer:
            "Yes. Many sleep clinics offer telemedicine visits, and home sleep testing and CPAP follow-up can often be handled remotely. An in-lab study still requires a night at the sleep center.",
        },
      ]}
      guideSlugs={[
        "board-certified-sleep-medicine-physician",
        "how-to-choose-the-right-sleep-clinic",
        "sleep-disorder-symptom-checklist",
        "snoring-vs-sleep-apnea-warning-sign",
        "telemedicine-for-sleep-disorders",
        "what-to-expect-during-a-sleep-study",
      ]}
    />
  )
}
