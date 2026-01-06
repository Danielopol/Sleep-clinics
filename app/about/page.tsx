import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import {
  Moon,
  Search,
  MapPin,
  Phone,
  Clock,
  Star,
  Camera,
  Award,
  Stethoscope,
  Heart,
  Brain,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--deep-navy)] via-[var(--twilight)] to-[var(--midnight)] py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--dream-blue)] rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--healing-teal)] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-[var(--dream-blue-light)] text-sm font-medium mb-6">
            <Moon className="h-4 w-4" />
            Your Trusted Sleep Care Resource
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Us
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Connecting you with expert sleep care professionals and accredited clinics nationwide.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] mx-auto rounded-full" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center">
            We are dedicated to connecting individuals experiencing sleep disturbances with expert sleep care professionals
            and accredited clinics nationwide. Whether you're struggling with insomnia, restless legs, sleep apnea, or other
            sleep-related disorders, our comprehensive directory of over 4,000 verified sleep clinics makes it easy to find
            qualified sleep specialists in your area. We believe that quality sleep is fundamental to health and well-being,
            and everyone deserves access to professional care that can help them achieve better sleep and improved quality of life.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] mx-auto rounded-full" />
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--dream-blue)] to-[var(--dream-blue-dark)] flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Comprehensive Database of Verified Sleep Care Providers
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Our directory features more than 4,000 sleep clinics across the United States, each carefully verified to ensure
                  you're connecting with legitimate, professional healthcare providers. We've done the research so you don't have to,
                  compiling the most extensive database of sleep medicine specialists, sleep disorder centers, and AASM-accredited
                  facilities available online.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--healing-teal)] to-[var(--healing-teal-light)] flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Easy-to-Use Search and Filtering Tools
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Finding the right sleep clinic near you has never been easier. Our intuitive search functionality allows you to
                  filter by location, specific sleep disorders treated, available services, AASM accreditation status, and patient
                  reviews. Whether you need treatment for insomnia, circadian rhythm disorders, sleep deprivation, hypersomnia,
                  or other conditions, you can quickly identify clinics that specialize in your particular needs.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800 md:col-span-2 lg:col-span-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--calm-indigo)] to-purple-600 flex items-center justify-center mb-4">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Detailed Information About Each Clinic and Specialist
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Every listing in our directory includes comprehensive details to help you make an informed decision about your care.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Features List */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md">
              <Phone className="h-6 w-6 text-[var(--dream-blue)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Full Contact Information</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Phone numbers, fax numbers, email addresses, website URLs, and physical addresses for every clinic</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md">
              <MapPin className="h-6 w-6 text-[var(--healing-teal)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Google Maps Integration</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Direct access to directions and location mapping</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md">
              <CheckCircle2 className="h-6 w-6 text-[var(--dream-blue)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Services Offered</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Complete list of diagnostic tests, therapies, and treatments including CBT-I, sleep studies, CPAP therapy, and more</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md">
              <Moon className="h-6 w-6 text-[var(--healing-teal)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Sleep Disorders Treated</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Detailed information about conditions addressed, from common issues to complex conditions like delayed sleep phase syndrome</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md">
              <Award className="h-6 w-6 text-[var(--dream-blue)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">AASM Accreditation Status</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Clear indication of which facilities are accredited by the American Academy of Sleep Medicine</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md">
              <Clock className="h-6 w-6 text-[var(--healing-teal)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Hours of Operation</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Know exactly when each clinic is open to schedule your appointment</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md">
              <Star className="h-6 w-6 text-[var(--dream-blue)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Patient Reviews</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Real feedback from individuals who have received care at each facility</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md">
              <Camera className="h-6 w-6 text-[var(--healing-teal)] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Clinic Photos</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Visual information to help you familiarize yourself with each location</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Access Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Direct Access to Contact Information and Directions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] mx-auto rounded-full mb-8" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center">
            No more navigating through multiple websites or waiting on hold to find basic information. Every clinic profile
            provides immediate access to phone numbers, addresses, and one-click directions via Google Maps. Whether you're
            searching for a "sleep doctor near me" or need to find an urgent care center that treats sleep problems, our
            platform puts all the information you need at your fingertips.
          </p>
        </div>
      </section>

      {/* Get Better Sleep Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--dream-blue)]/5 to-[var(--healing-teal)]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Get Better Sleep</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] mx-auto rounded-full mb-8" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-12">
            Sleep disorders affect millions of Americans, but quality care is available. Whether you're dealing with insomnia,
            sleep apnea, restless legs syndrome (RLS), or other sleep-related issues, our directory can help you find the right
            specialist to address your needs.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-[var(--dream-blue)]" />
                  Understanding Sleep Disorders
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Sleep problems manifest in many forms and can significantly impact your daily life. Chronic insomnia and
                  sleeplessness can lead to sleep deprivation effects that compromise your health, productivity, and mental
                  well-being. Conditions like sleep apnea can pose serious health risks if left untreated. Sleep walking,
                  night terrors, and other parasomnias can disrupt not just your sleep but your entire household's rest.
                  Understanding your sleep disturbance is the first step toward finding effective treatment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-[var(--healing-teal)]" />
                  Evidence-Based Treatment Options
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Modern sleep medicine offers numerous proven treatments tailored to specific conditions. For insomnia,
                  cognitive behavioral therapy for insomnia (CBT-I) has been shown to be highly effective, often providing
                  better long-term results than medication. For sleep apnea, continuous positive airway pressure (CPAP) therapy
                  remains the gold standard. Other insomnia treatments include medications like Belsomra, sleep hygiene education,
                  and light therapy for circadian rhythm disorders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialized Care Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Specialized Care for Every Need</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] mx-auto rounded-full mb-8" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center">
            Sleep disorders during pregnancy require special attention, and our directory includes clinics experienced in
            treating pregnancy insomnia and other maternal sleep issues. We also list facilities that specialize in pediatric
            sleep medicine, helping families address childhood sleep problems early. For shift workers struggling with delayed
            sleep phase syndrome or other circadian rhythm disruptions, we can connect you with specialists who understand the
            unique challenges of non-traditional sleep schedules.
          </p>
        </div>
      </section>

      {/* Importance of Professional Diagnosis */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              The Importance of Professional Diagnosis
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] mx-auto rounded-full mb-8" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center">
            While sleep apps, relaxing music for sleep, binaural beats, deep sleep music, and meditation for sleep can be
            helpful tools, they're not substitutes for professional medical evaluation when you have persistent sleep problems.
            If you find yourself thinking "I can't sleep" night after night, or if your sleep debt is accumulating, it's time
            to consult with a qualified sleep specialist. Many sleep disorders have underlying medical causes that require
            professional diagnosis and treatment.
          </p>
        </div>
      </section>

      {/* AASM Accreditation Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-[var(--dream-blue)]/10 to-[var(--healing-teal)]/10 dark:from-[var(--dream-blue)]/20 dark:to-[var(--healing-teal)]/20">
            <CardContent className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--dream-blue)] to-[var(--healing-teal)] flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                  AASM Accreditation: Your Assurance of Quality
                </h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                The American Academy of Sleep Medicine (AASM) sets rigorous standards for sleep medicine facilities.
                AASM-accredited centers meet comprehensive requirements for equipment, personnel qualifications, and procedures,
                ensuring you receive care that adheres to the highest professional standards. Our directory clearly identifies
                which facilities hold this prestigious accreditation, making it easy to choose clinics that have demonstrated
                their commitment to excellence in sleep medicine.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Professional Sleep Care Matters */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Professional Sleep Care Matters
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] mx-auto rounded-full mb-8" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-12">
            Sleep is not a luxury—it's a biological necessity as vital as nutrition and exercise. Untreated sleep disorders
            can contribute to serious health conditions including:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Heart, text: "Cardiovascular disease and hypertension" },
              { icon: AlertTriangle, text: "Diabetes and metabolic disorders" },
              { icon: Brain, text: "Depression and anxiety" },
              { icon: Brain, text: "Cognitive impairment and memory problems" },
              { icon: Shield, text: "Weakened immune function" },
              { icon: AlertTriangle, text: "Increased accident risk" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-md">
                <item.icon className="h-5 w-5 text-[var(--dream-blue)] flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-200">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center">
            When you can't sleep or experience chronic sleep disturbances, your entire quality of life suffers. Relationships
            strain, work performance declines, and enjoyment of daily activities diminishes. Professional treatment can break
            this cycle, helping you achieve sound sleep and restore your health and vitality.
          </p>
        </div>
      </section>

      {/* How Our Directory Helps */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">How Our Directory Helps You</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] mx-auto rounded-full mb-8" />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-8">
            Finding quality healthcare shouldn't be complicated. We've eliminated the frustration of searching through scattered
            resources, outdated listings, and incomplete information. With over 4,000 verified clinics, comprehensive details for
            each location, and user-friendly search tools, we've created the most reliable resource for finding sleep care in the
            United States.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center">
            Whether you're looking for a walk-in clinic that treats sleep problems, need to find urgent care for a sleep-related
            emergency, or want to schedule a comprehensive evaluation at an AASM-accredited sleep center, our platform provides the
            information you need to take the next step toward better sleep.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--deep-navy)] via-[var(--twilight)] to-[var(--midnight)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Moon className="h-16 w-16 text-[var(--dream-blue-light)] mx-auto mb-8" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Your Journey to Better Sleep Starts Here
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Don't let another night of sleeplessness go by. Don't let sleep debt continue to accumulate. Don't accept sleep
            deprivation as your new normal. Effective treatment is available, and the right specialist for your needs is waiting
            to help you achieve the restful, restorative sleep you deserve.
          </p>
          <p className="text-lg text-slate-400 mb-10">
            Start your search today and discover how professional sleep care can transform your nights—and your days.
            <br />
            <span className="text-[var(--dream-blue-light)] font-semibold">Because when you sleep well, you live well.</span>
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--dream-blue)] to-[var(--healing-teal)] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Find a Sleep Clinic Near You
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
