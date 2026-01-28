import { SleepDisorderContent } from '../sleep-disorders-content'

export const movementDisorders: SleepDisorderContent[] = [
  {
    slug: "restless-legs-syndrome",
    name: "Restless Legs Syndrome",
    category: "Movement Disorders",
    description: "A neurological disorder causing uncomfortable sensations in the legs and an irresistible urge to move them, particularly during rest and in the evening.",
    overview: "Restless Legs Syndrome (RLS), also known as Willis-Ekbom Disease, is a common neurological sensorimotor disorder characterized by an uncomfortable urge to move the legs, typically accompanied by unpleasant sensations. These symptoms occur primarily during periods of rest or inactivity, are worse in the evening and at night, and are at least temporarily relieved by movement. RLS significantly impairs quality of life by disrupting sleep onset and causing daytime fatigue, and is associated with depression and anxiety. It affects both sleep and daytime functioning.",
    prevalence: "RLS affects approximately 5-10% of adults in Western populations, with moderate to severe symptoms occurring in 2-3%. It is more common in women (about 2:1 ratio) and prevalence increases with age. RLS can begin at any age, including childhood, and tends to worsen over time. There is a strong genetic component, with about 50% of patients having an affected first-degree relative.",
    causes: "The exact cause of RLS is not fully understood, but it involves dysfunction in the brain's dopamine system and iron metabolism. Primary RLS appears to be genetic, with several risk genes identified. Secondary RLS can be caused by: iron deficiency (the most important modifiable factor), kidney failure/dialysis, pregnancy (temporary), neuropathy, certain medications (antihistamines, antidepressants, antipsychotics, anti-nausea drugs), caffeine and alcohol, and other medical conditions. The brain may have difficulty using iron even when blood levels appear normal.",
    symptoms: [
      {
        name: "Urge to move the legs",
        description: "An uncomfortable, sometimes irresistible need to move the legs. The urge is typically accompanied by or caused by unpleasant sensations in the legs."
      },
      {
        name: "Unusual sensations",
        description: "Described variously as creeping, crawling, pulling, itching, tingling, burning, or 'pins and needles' feelings deep inside the legs. Some patients struggle to describe the sensation."
      },
      {
        name: "Symptoms worse at rest",
        description: "Symptoms begin or worsen during periods of inactivity such as sitting or lying down."
      },
      {
        name: "Symptoms worse in evening/night",
        description: "There is a distinct circadian pattern with symptoms being most severe in the late evening and night, often peaking around midnight."
      },
      {
        name: "Relief with movement",
        description: "Walking, stretching, or moving the legs provides temporary relief, but symptoms return when movement stops."
      },
      {
        name: "Sleep disruption",
        description: "Difficulty falling asleep due to symptoms, and sometimes awakening during the night with recurrent symptoms."
      },
      {
        name: "Arm involvement",
        description: "While legs are most commonly affected, some patients also experience symptoms in the arms."
      }
    ],
    selfTestQuestions: [
      "Do you have an uncomfortable urge to move your legs, especially when sitting or lying down?",
      "Are the sensations associated with your urge to move uncomfortable (creeping, crawling, pulling)?",
      "Are your symptoms worse in the evening or at night?",
      "Do your symptoms improve when you walk or move your legs?",
      "Do your symptoms make it difficult to fall asleep or stay asleep?",
      "Do you have family members with similar symptoms?"
    ],
    diagnosisOverview: "RLS is diagnosed clinically based on the presence of four essential criteria. Blood tests are important to check iron levels and rule out secondary causes. Sleep studies may be done to assess for periodic limb movements.",
    diagnosticTests: [
      {
        name: "Clinical Criteria",
        description: "Diagnosis requires all four criteria: urge to move legs with uncomfortable sensations, symptoms worse at rest, relief with movement, and symptoms worse in evening/night."
      },
      {
        name: "Iron Studies",
        description: "Serum ferritin and iron saturation should be checked. Low ferritin (below 50-75 ng/mL) is associated with RLS even if not frankly deficient."
      },
      {
        name: "Blood Tests",
        description: "Complete blood count, kidney function, thyroid function, and other tests may identify secondary causes."
      },
      {
        name: "Polysomnography",
        description: "Sleep study can document periodic limb movements in sleep (PLMS), which occur in about 80% of RLS patients. Not required for diagnosis."
      },
      {
        name: "IRLS Rating Scale",
        description: "The International RLS Study Group Rating Scale quantifies symptom severity and can track treatment response."
      }
    ],
    treatmentOverview: "Treatment begins with addressing any underlying causes (especially iron deficiency) and triggers. Medications are used for more severe symptoms, but must be carefully managed to avoid 'augmentation' (worsening of symptoms over time).",
    treatments: [
      {
        name: "Iron Supplementation",
        description: "If ferritin is below 50-75 ng/mL, iron supplementation (oral or IV) is first-line treatment. IV iron may be more effective and faster-acting."
      },
      {
        name: "Alpha-2-Delta Ligands",
        description: "Gabapentin enacarbil (Horizant), gabapentin, and pregabalin are first-line medications. They improve sensory symptoms and sleep without causing augmentation."
      },
      {
        name: "Dopamine Agonists",
        description: "Pramipexole (Mirapex), ropinirole (Requip), and rotigotine patch are effective but carry significant risk of augmentation with long-term use. Used at low doses when needed."
      },
      {
        name: "Low-Dose Opioids",
        description: "For severe, refractory RLS, low-dose opioids (oxycodone, methadone) may be used carefully. Effective but require monitoring for dependence."
      },
      {
        name: "Avoid Triggering Medications",
        description: "Discontinue or substitute medications that worsen RLS: antihistamines, most antidepressants (except bupropion), anti-nausea drugs, antipsychotics."
      },
      {
        name: "Treat Underlying Conditions",
        description: "Managing kidney disease, neuropathy, and other conditions contributing to RLS."
      }
    ],
    lifestyleChanges: [
      "Check and optimize iron levels (ferritin should be above 50-75 ng/mL)",
      "Avoid caffeine, especially in the afternoon and evening",
      "Limit alcohol consumption",
      "Avoid medications that worsen RLS (antihistamines, many antidepressants)",
      "Maintain regular moderate exercise (not too close to bedtime)",
      "Apply heat or cold to the legs as needed",
      "Try leg massage or stretching before bed",
      "Keep a consistent sleep schedule",
      "Distract yourself during symptoms with mental activities",
      "Consider compression devices or vibrating pads designed for RLS"
    ],
    supportResources: [
      { name: "Restless Legs Syndrome Foundation", url: "https://www.rls.org/" },
      { name: "Willis-Ekbom Disease Foundation", url: "https://www.rls.org/" }
    ],
    relatedDisorders: ["Periodic Limb Movement Disorder", "Insomnia", "Iron Deficiency", "Neuropathy"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "periodic-limb-movement-disorder",
    name: "Periodic Limb Movement Disorder",
    category: "Movement Disorders",
    description: "A sleep disorder involving repetitive, involuntary movements of the legs (and sometimes arms) during sleep, potentially disrupting sleep quality.",
    overview: "Periodic Limb Movement Disorder (PLMD) is characterized by repetitive, stereotyped limb movements that occur during sleep, primarily involving the lower extremities. These movements typically consist of extension of the big toe and dorsiflexion of the ankle, sometimes with flexion of the knee and hip—similar to a Babinski reflex. Movements occur in clusters, typically every 20-40 seconds, mainly during NREM sleep. PLMD is only diagnosed when the movements cause clinically significant sleep disturbance or daytime impairment, and when they are not better explained by another disorder such as RLS or sleep apnea.",
    prevalence: "Periodic limb movements in sleep (PLMS) are very common and increase with age: they occur in about 5% of young adults, 25-45% of adults over 65, and up to 60% of elderly individuals. However, true PLMD (PLMS with resulting symptoms and impairment) is much less common. PLMS occur in about 80% of patients with restless legs syndrome. PLMD as a primary diagnosis is relatively uncommon.",
    causes: "The exact cause of PLMD is unknown. Like RLS, it appears to involve dopamine system dysfunction and may share genetic risk factors. Conditions associated with increased PLMS include: restless legs syndrome (very common), sleep apnea (PLMS may improve with CPAP), narcolepsy, REM sleep behavior disorder, iron deficiency, renal disease, peripheral neuropathy, spinal cord injury, and certain medications (especially antidepressants, which commonly increase PLMS). In many elderly individuals, PLMS occur without clear cause or clinical significance.",
    symptoms: [
      {
        name: "Repetitive leg movements during sleep",
        description: "Stereotyped movements involving toe extension, ankle flexion, and sometimes knee/hip flexion. The sleeper is typically unaware of these movements."
      },
      {
        name: "Sleep disruption",
        description: "While movements themselves may not awaken the sleeper, they often cause brief arousals that fragment sleep and reduce sleep quality."
      },
      {
        name: "Unrefreshing sleep",
        description: "Despite adequate sleep duration, the person may wake feeling tired and unrested due to sleep fragmentation."
      },
      {
        name: "Daytime sleepiness",
        description: "Excessive sleepiness or fatigue during the day resulting from disrupted nighttime sleep."
      },
      {
        name: "Bed partner disturbance",
        description: "Bed partners may be kicked or disturbed by the movements and may report the leg jerking."
      },
      {
        name: "No awareness of movements",
        description: "Unlike RLS, which causes waking discomfort, PLMD movements occur during sleep without awareness."
      }
    ],
    selfTestQuestions: [
      "Has a bed partner told you that your legs jerk or move repeatedly during sleep?",
      "Do you feel unrefreshed or tired despite getting enough sleep?",
      "Do you have excessive daytime sleepiness without another explanation?",
      "Have you been told you kick or move frequently during sleep?",
      "Do you have restless legs syndrome symptoms when awake?",
      "Have you had a sleep study showing elevated periodic limb movement index?"
    ],
    diagnosisOverview: "Diagnosis requires polysomnography showing periodic limb movements with an index of 15 or more per hour in adults, along with clinical sleep disturbance or daytime impairment. Other disorders (RLS, sleep apnea) must be excluded as the primary cause.",
    diagnosticTests: [
      {
        name: "Polysomnography",
        description: "The gold standard for diagnosis. Leg EMG electrodes detect periodic limb movements. A PLM index ≥15/hour in adults (≥5/hour in children) is considered elevated."
      },
      {
        name: "PLM Arousal Index",
        description: "Counting PLMs that are associated with EEG arousals helps determine if movements are disrupting sleep."
      },
      {
        name: "Iron Studies",
        description: "Ferritin and iron saturation should be checked, as iron deficiency is a treatable cause."
      },
      {
        name: "RLS Assessment",
        description: "Evaluating for restless legs syndrome, which commonly causes PLMS. If RLS is present, the diagnosis is RLS, not PLMD."
      },
      {
        name: "Sleep Apnea Evaluation",
        description: "PLMS commonly occur with sleep apnea and may resolve with apnea treatment."
      }
    ],
    treatmentOverview: "Treatment is only indicated when PLMS cause significant symptoms. Treatment of underlying conditions (RLS, sleep apnea, iron deficiency) often resolves PLMS. The same medications used for RLS are used for PLMD when treatment is needed.",
    treatments: [
      {
        name: "Treat Underlying Conditions",
        description: "If RLS, sleep apnea, or iron deficiency is present, treating these conditions often reduces PLMS. CPAP for apnea frequently reduces PLMS."
      },
      {
        name: "Iron Supplementation",
        description: "If ferritin is low (below 50-75 ng/mL), iron supplementation may reduce PLMS."
      },
      {
        name: "Dopamine Agonists",
        description: "Pramipexole and ropinirole reduce PLMS and may improve sleep quality, but risk of augmentation exists with long-term use."
      },
      {
        name: "Alpha-2-Delta Ligands",
        description: "Gabapentin, gabapentin enacarbil, and pregabalin may reduce PLMS and improve sleep."
      },
      {
        name: "Benzodiazepines",
        description: "Clonazepam may improve sleep quality even without reducing PLMS frequency, by reducing arousals."
      },
      {
        name: "Medication Review",
        description: "Discontinuing or changing antidepressants (which often increase PLMS) may help if possible."
      }
    ],
    lifestyleChanges: [
      "Check and optimize iron levels",
      "Avoid caffeine and alcohol, especially before bed",
      "Review medications with your doctor (antidepressants often worsen PLMS)",
      "Maintain regular moderate exercise",
      "Keep a consistent sleep schedule",
      "Treat any underlying sleep disorders",
      "Avoid nicotine"
    ],
    relatedDisorders: ["Restless Legs Syndrome", "Sleep Apnea", "Narcolepsy", "REM Sleep Behavior Disorder"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
