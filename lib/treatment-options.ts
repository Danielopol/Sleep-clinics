export interface TreatmentOption {
  name: string
  sampleTerms: string[]
}

export interface TreatmentCategory {
  category: string
  treatments: TreatmentOption[]
}

export const treatmentOptionsData: TreatmentCategory[] = [
  {
    category: "PAP Therapies",
    treatments: [
      { name: "CPAP Therapy", sampleTerms: ["CPAP Therapy", "CPAP therapy", "CPAP Clinic", "CPAP Clinics", "CPAP Management Program", "CPAP Titration", "CPAP Titration Therapy", "CPAP overnight Sleep Studies", "Continuous positive airway pressure therapy (CPAP)", "Non-invasive CPAP Therapy"] },
      { name: "BiPAP/BPAP Therapy", sampleTerms: ["BiPAP Therapy", "BiPAP therapy", "BPAP Therapy", "BIPAP Therapy & Supplies", "Bilevel PAP therapy"] },
      { name: "CPAP/BiPAP Therapy", sampleTerms: ["CPAP/BiPAP Therapy", "CPAP/BiPAP test", "PAP Therapy", "Positive airway pressure (PAP) via CPAP and BiPAP therapy"] },
      { name: "Adaptive Servo-Ventilation (ASV)", sampleTerms: ["Adaptive servo-ventilation (ASV)"] },
    ]
  },
  {
    category: "Equipment & Supplies",
    treatments: [
      { name: "CPAP Equipment & Supplies", sampleTerms: ["CPAP Equipment", "CPAP Products", "CPAPs & Supplies", "Supplies", "Supply and Resupply", "Therapy Devices", "Mask Fitting"] },
      { name: "Durable Medical Equipment (DME)", sampleTerms: ["Set-up and Delivery of Durable Medical Equipment", "Home & Portable Oxygen", "Nebulizers"] },
    ]
  },
  {
    category: "Sleep Testing",
    treatments: [
      { name: "In-Lab Sleep Testing (Polysomnography)", sampleTerms: ["In-Lab Testing", "In-Lab Sleep Testing", "In-lab sleep testing", "Inpatient Sleep Testing", "Polysomnography", "Polysomnogram", "Polysomnograms", "Overnight Polysomnography", "Overnight sleep studies", "Sleep Studies (Polysomnograms)", "Sleep Laboratory"] },
      { name: "Home Sleep Testing", sampleTerms: ["Home Sleep Testing", "Home Sleeping Apnea Testing", "Home Sleep Studies", "Home Studies", "In-home sleep testing", "Home Sleep Test Devices"] },
      { name: "Sleep Studies", sampleTerms: ["Sleep Studies", "Sleep studies"] },
      { name: "Multiple Sleep Latency Test (MSLT)", sampleTerms: ["Multiple Sleep Latency Test", "Multiple Sleep Latency Testing", "Multiple sleep latency test"] },
      { name: "Maintenance of Wakefulness Test (MWT)", sampleTerms: ["Maintenance Wakefulness Test", "Maintenance of Wakefulness Test"] },
    ]
  },
  {
    category: "Diagnosis",
    treatments: [
      { name: "Sleep Disorders Diagnosis", sampleTerms: ["Sleep Disorders Diagnosis", "Sleep Disorders Diagnostic", "Sleep Disorders Care", "Sleep Disorders evaluations", "Sleep Disorders Testing", "Sleep Disorders Diagnosis and Management", "Sleep Disorders Diagnosis and Treatment"] },
      { name: "Daytime Sleepiness Evaluation", sampleTerms: ["Daytime Sleepiness Evaluation", "Excessive Daytime Sleepiness", "Sleepiness", "Chronic Fatigue", "Drowsy Driving"] },
      { name: "Sleep-Disordered Breathing", sampleTerms: ["Sleep-disordered breathing"] },
    ]
  },
  {
    category: "Condition-Specific Treatments",
    treatments: [
      { name: "Sleep Apnea Treatment", sampleTerms: ["Sleep Apnea Treatment", "Sleep Apnea treatment", "Obstructive Sleep Apnea Treatment", "Obstructive sleep apnea Treatment", "Obstructive Sleep Apnea Syndrome Treatment", "Central Sleep Apnea Treatment", "Sleep Apnea Diagnosis and Treatment", "Sleep Apnea Testing"] },
      { name: "Insomnia Treatment", sampleTerms: ["Insomnia Treatment", "Insomnia treatment", "Insomnia management by behavioral intervention or medication therapy"] },
      { name: "Narcolepsy Treatment", sampleTerms: ["Narcolepsy Treatment"] },
      { name: "Restless Leg Syndrome Treatment", sampleTerms: ["Restless Leg Syndrome Treatment", "Restless Legs Syndrome Treatment"] },
      { name: "Periodic Limb Movement Disorder Treatment", sampleTerms: ["Periodic Limb Movement", "Periodic Limb Movement Treatment", "Periodic Limb Movements Disorder Treatment"] },
      { name: "Parasomnias Treatment", sampleTerms: ["Parasomnias Treatment", "Night terrors", "Sleep terrors Treatment", "Sleepwalking", "Sleep Walking Treatment", "Sleep walking Treatment", "Sleep Talking", "Acting out dreams", "Nocturnal eating"] },
      { name: "REM Behavior Disorder Treatment", sampleTerms: ["REM Behavior Disorder (RBD)", "REM Behavior Disorder Treatment"] },
      { name: "Circadian Rhythm Disorder Treatment", sampleTerms: ["Circadian Rhythm Disorder", "Shift Work Sleep Disorder"] },
      { name: "Hypersomnia Treatment", sampleTerms: ["Hypersomnia", "Idiopathic hypersomnia"] },
      { name: "Snoring Treatment", sampleTerms: ["Snoring Treatment"] },
    ]
  },
  {
    category: "Therapies & Interventions",
    treatments: [
      { name: "Behavioral Sleep Medicine", sampleTerms: ["Behavioral Sleep Medicine", "Behavioral Therapy"] },
      { name: "Oral Appliance Therapy", sampleTerms: ["Oral Appliances", "Oral appliances", "Oral Devices", "Oral Appliance Studies", "Dental appliance", "Mandibular advancement devices"] },
      { name: "Dental Sleep Medicine", sampleTerms: ["Dental Sleep Medicine"] },
      { name: "Inspire Therapy (Upper Airway Stimulation)", sampleTerms: ["Inspire Therapy", "Inspire Surgery", "Inspire Device Evaluations", "Inspire Upper Airway Stimulation", "Inspired Upper Airway Stimulation monitoring"] },
      { name: "Sleep Apnea Surgery", sampleTerms: ["Sleep Apnea Surgery"] },
      { name: "ExciteOSA Therapy", sampleTerms: ["ExciteOSA"] },
      { name: "iNAP Therapy", sampleTerms: ["iNAP"] },
      { name: "Non-Invasive Ventilation", sampleTerms: ["Non-invasive ventilation"] },
      { name: "Sleep Disorders Therapy", sampleTerms: ["Sleep Disorders Therapy", "Sleep Disorders Treatments", "Treatment Options", "Treatment Plans for Sleep Disorders Diagnosis", "Treatment for Sleep Disorders Diagnosis", "Sleep Medicine & Treatments"] },
    ]
  },
  {
    category: "Clinical Services",
    treatments: [
      { name: "Sleep Medicine Consultation", sampleTerms: ["Sleep Medicine", "Sleep medicine", "Sleep Clinic", "Sleep Consultation", "Consultations", "In-person consultations", "Specialist Consultation", "Sleep Specialists"] },
      { name: "Pediatric Sleep Medicine", sampleTerms: ["Pediatric Sleep Medicine", "Pediatric sleep medicine", "Pediatric Sleep", "Pediatric Sleep Health", "Pediatric Sleep Studies", "Pediatric Sleep Disorders Diagnosis"] },
      { name: "Virtual/Telemedicine Consultations", sampleTerms: ["Video consultations"] },
      { name: "Neurological Evaluation", sampleTerms: ["Neurological Evaluation"] },
      { name: "Pulmonary Medicine", sampleTerms: ["Pulmonary Medicine", "Pulmonary Rehabilitation", "Pulmonary & Sleep Medicine", "Pulmonary and Sleep", "Respiratory Therapy"] },
      { name: "Sleep Disorders Education", sampleTerms: ["Sleep Disorders Education"] },
    ]
  },
]
