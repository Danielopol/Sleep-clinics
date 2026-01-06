"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Moon, HelpCircle, CheckCircle2, Building2, Stethoscope, MapPin, MessageSquare, Pill } from "lucide-react"

const faqData = [
  {
    id: "clinics-count",
    icon: Building2,
    question: "How many sleep clinics are in your directory?",
    answer: "Our directory features over 4,000 verified sleep clinics and sleep disorder centers across the United States. This makes us the most comprehensive online resource for finding sleep care providers nationwide. Each clinic in our database has been carefully verified to ensure you're connecting with legitimate, professional healthcare facilities. Whether you're in a major metropolitan area or a smaller community, our extensive network helps you find qualified sleep specialists near you."
  },
  {
    id: "clinic-info",
    icon: HelpCircle,
    question: "What information is available for each sleep clinic listing?",
    answer: "We provide comprehensive details for every clinic to help you make an informed decision: Complete Contact Information (phone numbers, fax numbers, email addresses, website URLs, and physical addresses), Google Maps Integration (one-click directions and interactive location mapping), Services Offered (full list of available diagnostic tests and treatments, including sleep studies, cognitive behavioral therapy for insomnia (CBT-I), CPAP therapy, and more), Sleep Disorders Treated (detailed information about conditions each clinic specializes in treating, from insomnia and sleep apnea to restless legs syndrome, circadian rhythm disorders, hypersomnia, sleep walking, and pregnancy insomnia), AASM Accreditation Status, Hours of Operation, Patient Reviews, and Clinic Photos. This comprehensive approach ensures you have everything you need to choose the right sleep care provider for your needs."
  },
  {
    id: "free-use",
    icon: CheckCircle2,
    question: "Is your sleep clinic directory free to use?",
    answer: "Yes! Our directory is completely free for patients seeking sleep care. There are no subscription fees, no hidden charges, and no cost to access any of the information in our database. You can search as many times as you need, view unlimited clinic profiles, read all patient reviews, and access complete contact information without paying anything. Our mission is to make quality sleep care accessible to everyone, and that starts with providing free, unrestricted access to our comprehensive directory of sleep specialists and clinics."
  },
  {
    id: "aasm",
    icon: CheckCircle2,
    question: "What is AASM accreditation and why does it matter?",
    answer: "AASM accreditation stands for American Academy of Sleep Medicine accreditation, which is the gold standard in sleep medicine quality assurance. The AASM sets rigorous standards for sleep disorder centers, including requirements for: state-of-the-art equipment and technology, qualified personnel with specialized training in sleep medicine, comprehensive policies and procedures, regular quality assessments and continuing education, and adherence to evidence-based treatment protocols. When you choose an AASM-accredited facility, you're ensuring that you'll receive care that meets the highest professional standards in the field. These centers have demonstrated their commitment to excellence and undergone extensive evaluation to earn this prestigious designation. Our directory clearly identifies which clinics hold AASM accreditation, making it easy to prioritize facilities that have proven their quality of care."
  },
  {
    id: "disorders",
    icon: Stethoscope,
    question: "What types of sleep disorders can I find treatment for through your directory?",
    answer: "Our directory includes clinics that treat the full spectrum of sleep disorders, including: Insomnia (including chronic insomnia, pregnancy insomnia, and various forms of sleeplessness), Sleep Apnea (both obstructive and central sleep apnea), Restless Legs Syndrome (RLS) (movement disorders affecting sleep quality), Circadian Rhythm Disorders (including delayed sleep phase syndrome and shift work disorder), Hypersomnia (excessive daytime sleepiness and related conditions), Parasomnias (sleep walking, night terrors, REM sleep behavior disorder), Narcolepsy (sudden sleep attacks and cataplexy), Sleep-Related Breathing Disorders, Familial Insomnia (rare genetic sleep disorders), and Sleep Disturbances (various conditions affecting sleep quality and duration). Many clinics also offer specialized care for sleep problems related to pregnancy, pediatric sleep disorders, and sleep issues associated with other medical or mental health conditions. You can filter your search by specific disorders to find clinics with expertise in your particular condition."
  },
  {
    id: "find-clinic",
    icon: MapPin,
    question: "How do I find a sleep doctor or clinic near me?",
    answer: "Finding a sleep specialist near you is simple with our user-friendly search tools: 1) Location Search: Enter your city, state, or zip code in the search bar. 2) Filter by Distance: Refine results to show only clinics within your desired radius. 3) Filter by Specialty: Select specific sleep disorders or services you need. 4) Filter by Accreditation: Choose to view only AASM-accredited facilities if preferred. 5) Sort Results: Organize by distance, rating, or other criteria. 6) Review Details: Click on any clinic to see complete information. 7) Get Directions: Use integrated Google Maps for one-click navigation. Our platform provides instant access to contact information, so you can call for appointments right away. Whether you're searching for \"sleep doctor near me,\" need urgent care for a sleep-related issue, or want to schedule a comprehensive sleep study, our directory streamlines the entire process of finding and connecting with the right provider."
  },
  {
    id: "reviews",
    icon: MessageSquare,
    question: "Can I read patient reviews before choosing a clinic?",
    answer: "Absolutely! We understand that choosing a healthcare provider is an important decision, which is why every clinic listing includes patient reviews from individuals who have actually received care at that facility. These reviews provide valuable insights into: quality of care and treatment effectiveness, staff professionalism and bedside manner, facility cleanliness and comfort, wait times and scheduling convenience, insurance and billing experiences, and overall patient satisfaction. Reading real patient experiences helps you make a more informed decision and choose a clinic that aligns with your expectations and needs. We believe in transparency and empowering patients with the information they need to advocate for their own health. Patient reviews complement the objective information we provide about services, accreditation, and specialties, giving you a complete picture of what to expect."
  },
  {
    id: "treatments",
    icon: Pill,
    question: "What treatment options are available at sleep clinics?",
    answer: "Sleep clinics offer a wide range of evidence-based treatments tailored to specific sleep disorders. For Insomnia: Cognitive Behavioral Therapy for Insomnia (CBT-I) - often the most effective long-term solution, sleep hygiene education and counseling, medication management (including medications like Belsomra), relaxation techniques and stress management, and light therapy for circadian rhythm issues. For Sleep Apnea: Continuous Positive Airway Pressure (CPAP) therapy, BiPAP and other positive airway pressure devices, oral appliance therapy, positional therapy, and surgical interventions when appropriate. For Other Sleep Disorders: sleep studies (polysomnography) for accurate diagnosis, Multiple Sleep Latency Tests (MSLT) for narcolepsy evaluation, home sleep apnea testing, medication for restless legs syndrome, narcolepsy, and other conditions, and specialized treatments for parasomnias and circadian rhythm disorders. The specific treatments available vary by clinic, which is why our detailed listings include comprehensive service information. Many clinics take a multidisciplinary approach, combining medical treatments with behavioral interventions and lifestyle modifications to address sleep problems holistically. Professional sleep care goes far beyond sleep apps, calming music for sleep, or binaural beats. While these tools can be helpful supplements, they cannot replace the expertise of trained sleep medicine specialists who can diagnose underlying conditions and provide evidence-based treatment tailored to your specific needs."
  }
]

export function FAQSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with subtle gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--cloud)]/50 to-[var(--pearl)] dark:from-transparent dark:via-[var(--deep-navy)]/50 dark:to-[var(--midnight)]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-300/20 to-transparent" />

      {/* Floating decorative circles */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-indigo-300/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-violet-300/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-indigo-400/10 via-violet-300/10 to-purple-400/10 border border-indigo-300/20 shadow-lg shadow-indigo-300/5">
            <Moon className="w-8 h-8 text-indigo-400" strokeWidth={1.5} />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about finding the right sleep care provider for your needs
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="relative">
          {/* Subtle card container */}
          <div className="bg-white/80 dark:bg-[var(--deep-navy)]/80 backdrop-blur-sm rounded-3xl border border-[var(--border-color)] shadow-xl shadow-[var(--dream-blue)]/5 overflow-hidden">
            <Accordion type="single" collapsible className="divide-y divide-[var(--border-color)]">
              {faqData.map((faq, index) => {
                const Icon = faq.icon
                return (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border-none px-6 sm:px-8 group"
                  >
                    <AccordionTrigger className="py-6 hover:no-underline gap-4 [&[data-state=open]]:text-[var(--dream-blue)] transition-colors">
                      <div className="flex items-start gap-4 text-left">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--pearl)] to-[var(--cloud)] dark:from-[var(--twilight)] dark:to-[var(--deep-navy)] border border-[var(--border-color)] flex items-center justify-center group-[[data-state=open]]:border-[var(--dream-blue)]/30 group-[[data-state=open]]:bg-[var(--dream-blue)]/10 transition-all duration-300">
                          <Icon className="w-5 h-5 text-[var(--soft-slate)] group-[[data-state=open]]:text-[var(--dream-blue)] transition-colors duration-300" strokeWidth={1.5} />
                        </div>
                        <span className="text-base sm:text-lg font-semibold text-[var(--text-primary)] group-[[data-state=open]]:text-[var(--dream-blue)] transition-colors duration-300 leading-snug pt-1.5">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-14">
                      <div className="text-[var(--text-secondary)] leading-relaxed text-[15px] pr-4">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>

          {/* Bottom accent line */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 opacity-60" />
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-r from-indigo-400/5 via-violet-300/5 to-purple-400/5 border border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-400/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-[var(--text-primary)] font-medium">
                Still have questions?
              </span>
            </div>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-400/25 hover:shadow-xl hover:shadow-indigo-400/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              Learn More
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
