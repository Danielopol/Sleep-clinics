export interface SleepDisorder {
  name: string
  sampleTerms: string[]
}

export interface SleepDisorderCategory {
  category: string
  disorders: SleepDisorder[]
}

export const sleepDisordersData: SleepDisorderCategory[] = [
  {
    category: "Sleep-Related Breathing Disorders",
    disorders: [
      { name: "Obstructive Sleep Apnea (OSA)", sampleTerms: ["Obstructive sleep apnea", "Complex Obstructive Sleep Apnea"] },
      { name: "Central Sleep Apnea (CSA)", sampleTerms: ["Central sleep apnea", "CSA"] },
      { name: "Complex/Mixed Sleep Apnea", sampleTerms: ["Complex or mixed sleep apnea", "Mixed Sleep Apnea"] },
      { name: "Sleep Apnea (General)", sampleTerms: ["Sleep apnea", "Infant apnea", "Pediatric sleep apnea"] },
      { name: "Sleep-Disordered Breathing", sampleTerms: ["Breathing difficulties", "Breathing disorders"] },
      { name: "Upper Airway Resistance Syndrome", sampleTerms: ["UARS", "Upper Airway Resistance"] },
      { name: "Hypoventilation Syndromes", sampleTerms: ["Obesity hypoventilation syndrome", "Nocturnal Hypoxemia"] },
      { name: "Snoring", sampleTerms: ["Chronic Snoring", "Excessive snoring"] },
    ]
  },
  {
    category: "Insomnia",
    disorders: [
      { name: "Insomnia", sampleTerms: ["Chronic Insomnia", "Difficulty Falling Asleep", "Difficulty staying asleep"] },
      { name: "Poor Sleep Hygiene", sampleTerms: ["Inadequate sleep hygiene", "Dependence on sleeping pills"] },
    ]
  },
  {
    category: "Hypersomnias",
    disorders: [
      { name: "Narcolepsy", sampleTerms: ["Cataplexy", "Narcolepsy with cataplexy"] },
      { name: "Idiopathic Hypersomnia", sampleTerms: ["Idiopathic hypersomnia (IH)", "Hypersomnolence Syndrome"] },
      { name: "Excessive Daytime Sleepiness", sampleTerms: ["Hypersomnia", "Daytime drowsiness", "Daytime Fatigue"] },
      { name: "Kleine-Levin Syndrome", sampleTerms: ["Klein-Levine Syndrome"] },
      { name: "Insufficient Sleep Syndrome", sampleTerms: ["Sleep deprivation", "Chronic sleep loss"] },
    ]
  },
  {
    category: "Circadian Rhythm Disorders",
    disorders: [
      { name: "Circadian Rhythm Disorders", sampleTerms: ["Abnormal circadian rhythm", "Sleep-wake schedule disorders"] },
      { name: "Delayed Sleep Phase Disorder", sampleTerms: ["DSPD", "Delayed sleep phase syndrome"] },
      { name: "Advanced Sleep Phase Disorder", sampleTerms: ["ASPS", "Advanced sleep syndrome"] },
      { name: "Shift Work Disorder", sampleTerms: ["Shift Work Sleep Disorder", "Shift work problems"] },
      { name: "Jet Lag", sampleTerms: ["Jet lag"] },
      { name: "Non-24-Hour Sleep-Wake Disorder", sampleTerms: ["Non-24-hour sleep-wake syndrome"] },
      { name: "Irregular Sleep-Wake Rhythm", sampleTerms: ["Irregular sleep-wake rhythm"] },
    ]
  },
  {
    category: "Parasomnias",
    disorders: [
      { name: "Sleepwalking", sampleTerms: ["Somnambulism", "Sleep Walking"] },
      { name: "Sleep Talking", sampleTerms: ["Somniloquy", "Sleeptalking"] },
      { name: "Night Terrors", sampleTerms: ["Sleep Terrors", "Night tremors"] },
      { name: "Nightmare Disorder", sampleTerms: ["Nightmares", "Bad dreams"] },
      { name: "REM Sleep Behavior Disorder", sampleTerms: ["RBD", "Acting out dreams"] },
      { name: "Confusional Arousals", sampleTerms: ["Confusional arousals"] },
      { name: "Sleep Paralysis", sampleTerms: ["Sleep paralysis"] },
      { name: "Sleep-Related Eating Disorder", sampleTerms: ["Nocturnal eating", "Sleep eating"] },
      { name: "Bruxism", sampleTerms: ["Teeth grinding", "Nocturnal Bruxism"] },
      { name: "Sleep Hallucinations", sampleTerms: ["Hypnagogic hallucinations", "Hypnopompic hallucinations"] },
      { name: "Catathrenia", sampleTerms: ["Sleep-Related Groaning"] },
    ]
  },
  {
    category: "Movement Disorders",
    disorders: [
      { name: "Restless Legs Syndrome", sampleTerms: ["RLS", "Painful sensations in legs"] },
      { name: "Periodic Limb Movement Disorder", sampleTerms: ["PLMD", "Jerking of limbs during sleep"] },
    ]
  },
  {
    category: "Pediatric Sleep Disorders",
    disorders: [
      { name: "Pediatric Sleep Disorders", sampleTerms: ["Childhood Sleep Disorders", "Bedtime problems"] },
      { name: "Bedwetting", sampleTerms: ["Sleep Enuresis", "Nocturnal urinary incontinence"] },
    ]
  },
  {
    category: "Other Conditions",
    disorders: [
      { name: "Sleep-Related Seizures", sampleTerms: ["Nocturnal seizures", "Night-time Epilepsy"] },
      { name: "Sleep Fragmentation", sampleTerms: ["Frequent awakenings", "Nighttime awakenings"] },
      { name: "Unrefreshing Sleep", sampleTerms: ["Restless sleep", "Non-refreshed sleep"] },
      { name: "Nocturia", sampleTerms: ["Frequent urination at night"] },
      { name: "Nocturnal Panic Attacks", sampleTerms: ["Panic attacks during sleep"] },
    ]
  },
]
