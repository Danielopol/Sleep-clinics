import { TreatmentContent } from '../treatment-options-content'

export const diagnosisServices: TreatmentContent[] = [
  {
    slug: "sleep-disorders-diagnosis",
    name: "Sleep Disorders Diagnosis",
    category: "Diagnosis Services",
    description: "Comprehensive evaluation by sleep specialists to identify and diagnose the full range of sleep disorders using clinical assessment, questionnaires, and diagnostic testing.",
    overview: "Sleep disorders diagnosis involves a systematic evaluation to identify conditions affecting sleep quality, quantity, and timing. Sleep specialists use clinical interviews, validated questionnaires, physical examination, sleep diaries, and objective testing (polysomnography, home sleep tests, actigraphy) to diagnose over 80 recognized sleep disorders. Accurate diagnosis is essential because treatments differ significantly between conditions—what helps one disorder may worsen another.",
    howItWorks: "The diagnostic process typically begins with a detailed sleep history covering sleep patterns, symptoms, medical history, medications, and lifestyle factors. Validated questionnaires assess sleepiness, insomnia severity, and specific symptoms. Physical examination evaluates anatomical factors and signs of sleep disorders. Based on this evaluation, appropriate objective testing is ordered. All information is synthesized to reach a diagnosis and treatment plan.",
    candidatesFor: "Anyone with persistent sleep complaints should consider evaluation: difficulty falling or staying asleep, excessive daytime sleepiness, loud snoring or witnessed breathing pauses, unusual behaviors during sleep, restless legs sensations, irregular sleep schedules, or sleep that doesn't feel refreshing despite adequate time in bed.",
    benefits: [
      {
        name: "Accurate Identification",
        description: "Proper diagnosis identifies the specific sleep disorder(s) present, which is essential for selecting effective treatment."
      },
      {
        name: "Rules Out Serious Conditions",
        description: "Evaluation can detect sleep apnea, narcolepsy, and other conditions with significant health implications that require specific treatment."
      },
      {
        name: "Avoids Inappropriate Treatment",
        description: "Self-treating or treating the wrong condition can be ineffective or harmful. Proper diagnosis ensures appropriate therapy."
      },
      {
        name: "Identifies Comorbidities",
        description: "Sleep disorders often coexist. Comprehensive evaluation can identify multiple conditions requiring treatment."
      },
      {
        name: "Enables Insurance Coverage",
        description: "Documented diagnosis is typically required for insurance coverage of treatments like CPAP therapy or narcolepsy medications."
      }
    ],
    sideEffects: [
      {
        name: "Multiple Appointments",
        description: "Complete evaluation may require multiple visits: initial consultation, sleep study, and follow-up for results and treatment planning."
      },
      {
        name: "Time and Cost",
        description: "Evaluation takes time and may involve costs depending on insurance coverage. However, untreated sleep disorders have greater long-term costs."
      },
      {
        name: "Anxiety About Findings",
        description: "Some patients feel anxious about potential diagnoses. Remember that identifying a problem is the first step to solving it."
      },
      {
        name: "Inconvenience of Testing",
        description: "Objective testing (sleep studies) requires time and cooperation, though options like home testing minimize inconvenience."
      }
    ],
    variations: [
      {
        name: "Sleep Medicine Consultation",
        description: "Initial evaluation by a board-certified sleep specialist who reviews history, performs examination, and orders appropriate tests."
      },
      {
        name: "Primary Care Screening",
        description: "Basic sleep evaluation by primary care providers who can screen for common disorders and refer to specialists when indicated."
      },
      {
        name: "Telehealth Sleep Evaluation",
        description: "Remote consultation via video visit, appropriate for initial evaluation and follow-up, with testing arranged locally."
      },
      {
        name: "Comprehensive Sleep Center Evaluation",
        description: "Full-service sleep center offering consultation, all types of sleep testing, and treatment initiation in one location."
      }
    ],
    tips: [
      {
        title: "Track Your Sleep",
        description: "Keep a sleep diary for 1-2 weeks before your appointment, noting bedtimes, wake times, awakenings, and daytime symptoms."
      },
      {
        title: "Document Symptoms Thoroughly",
        description: "Note all sleep-related symptoms, even those that seem unrelated. Mention snoring, leg movements, dream-enacting, and daytime issues."
      },
      {
        title: "Bring a Bed Partner",
        description: "If possible, bring someone who observes your sleep. They may notice snoring, breathing pauses, or movements you're unaware of."
      },
      {
        title: "List All Medications",
        description: "Many medications affect sleep. Bring a complete list including over-the-counter drugs, supplements, and substances."
      },
      {
        title: "Be Honest About Sleep Habits",
        description: "Accurately report sleep schedules, caffeine/alcohol use, and lifestyle factors. This information is crucial for proper diagnosis."
      },
      {
        title: "Prepare Questions",
        description: "Write down questions about your symptoms, potential diagnoses, and what to expect from testing and treatment."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" },
      { name: "Sleep Education", url: "https://sleepeducation.org/" },
      { name: "National Sleep Foundation", url: "https://www.thensf.org/" }
    ],
    relatedTreatments: ["Polysomnography", "Home Sleep Testing", "MSLT", "Sleep Studies"],
    treatedConditions: ["Obstructive Sleep Apnea", "Insomnia", "Narcolepsy", "Restless Legs Syndrome", "Circadian Rhythm Disorders", "Parasomnias"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "daytime-sleepiness-evaluation",
    name: "Daytime Sleepiness Evaluation",
    category: "Diagnosis Services",
    description: "Specialized assessment to identify the cause of excessive daytime sleepiness, including screening for sleep apnea, narcolepsy, insufficient sleep, and other conditions.",
    overview: "Daytime sleepiness evaluation is a focused diagnostic approach for patients whose primary complaint is feeling excessively sleepy during the day. This symptom can result from many causes: insufficient sleep, poor sleep quality (as in sleep apnea), primary disorders of sleepiness (narcolepsy, idiopathic hypersomnia), circadian rhythm disorders, medications, or medical conditions. Systematic evaluation identifies the underlying cause so targeted treatment can restore normal alertness.",
    howItWorks: "Evaluation begins with detailed history about sleep duration, quality, schedule, and daytime symptoms. Standardized measures like the Epworth Sleepiness Scale quantify sleepiness severity. Sleep diaries and actigraphy assess sleep patterns over time. If sleep apnea is suspected, sleep testing is performed. If sleepiness persists despite adequate sleep and absence of sleep apnea, tests like the MSLT evaluate for narcolepsy or idiopathic hypersomnia.",
    candidatesFor: "Anyone experiencing excessive daytime sleepiness—difficulty staying awake during passive activities, unintended napping, impaired concentration, or decreased productivity due to sleepiness—should be evaluated. This is especially important if sleepiness affects driving, work safety, or quality of life.",
    benefits: [
      {
        name: "Identifies Root Cause",
        description: "Rather than just treating sleepiness symptoms, proper evaluation finds and addresses the underlying cause."
      },
      {
        name: "Improves Safety",
        description: "Excessive sleepiness is a major cause of accidents. Identifying and treating the cause improves safety for you and others."
      },
      {
        name: "Restores Quality of Life",
        description: "Effective treatment of sleepiness dramatically improves energy, productivity, mood, and overall quality of life."
      },
      {
        name: "Detects Hidden Disorders",
        description: "Evaluation may reveal conditions like sleep apnea or narcolepsy that patients weren't aware they had."
      },
      {
        name: "Guides Appropriate Treatment",
        description: "Treatment differs based on cause—CPAP for sleep apnea, stimulants for narcolepsy, sleep extension for insufficient sleep."
      }
    ],
    sideEffects: [
      {
        name: "Multiple Tests May Be Needed",
        description: "Comprehensive evaluation of sleepiness may require several tests (PSG, MSLT, actigraphy) to reach a diagnosis."
      },
      {
        name: "Time Investment",
        description: "Full evaluation including sleep studies and follow-up takes time, though it's necessary for accurate diagnosis."
      },
      {
        name: "Lifestyle Changes May Be Needed",
        description: "Evaluation may reveal that insufficient sleep or poor sleep habits are contributing, requiring lifestyle modifications."
      },
      {
        name: "Medication Discontinuation",
        description: "Some tests (like MSLT) require stopping certain medications beforehand, which can be difficult."
      }
    ],
    variations: [
      {
        name: "Epworth Sleepiness Scale",
        description: "Simple questionnaire assessing likelihood of dozing in various situations. Scores above 10 suggest excessive sleepiness."
      },
      {
        name: "Sleep Diary and Actigraphy",
        description: "Tracking sleep patterns over 1-2 weeks helps identify insufficient sleep or circadian rhythm problems as causes."
      },
      {
        name: "Polysomnography",
        description: "Overnight sleep study to evaluate for sleep apnea and other disorders that fragment sleep and cause daytime sleepiness."
      },
      {
        name: "MSLT",
        description: "Daytime nap study performed after PSG to diagnose narcolepsy and objectively quantify sleepiness."
      },
      {
        name: "Blood Tests",
        description: "Laboratory testing may be ordered to check for thyroid disorders, anemia, or other medical causes of fatigue."
      }
    ],
    tips: [
      {
        title: "Distinguish Sleepiness from Fatigue",
        description: "Sleepiness is difficulty staying awake; fatigue is tiredness without sleep drive. Tell your provider which you experience—treatments differ."
      },
      {
        title: "Track Sleep Honestly",
        description: "Keep an accurate sleep diary including weekends. Chronic sleep restriction is the most common cause of sleepiness."
      },
      {
        title: "Note When Sleepiness Occurs",
        description: "Document when you're sleepiest—after meals, in meetings, while driving. Patterns help with diagnosis."
      },
      {
        title: "Report Near-Miss Accidents",
        description: "If you've had close calls while driving due to sleepiness, report this—it indicates severity and guides urgency of treatment."
      },
      {
        title: "Consider Sleep Extension Trial",
        description: "Before extensive testing, you may be asked to extend sleep time for 1-2 weeks to rule out simple sleep deprivation."
      },
      {
        title: "Don't Mask Symptoms with Caffeine",
        description: "While caffeine helps temporarily, it doesn't treat underlying causes. Accurate evaluation requires understanding natural sleepiness levels."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" },
      { name: "Sleep Education", url: "https://sleepeducation.org/" }
    ],
    relatedTreatments: ["MSLT", "Polysomnography", "Narcolepsy Treatment", "CPAP Therapy"],
    treatedConditions: ["Narcolepsy", "Idiopathic Hypersomnia", "Obstructive Sleep Apnea", "Insufficient Sleep Syndrome", "Circadian Rhythm Disorders"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "sleep-disordered-breathing-diagnosis",
    name: "Sleep-Disordered Breathing Diagnosis",
    category: "Diagnosis Services",
    description: "Evaluation and testing to identify breathing abnormalities during sleep, including obstructive sleep apnea, central sleep apnea, and hypoventilation syndromes.",
    overview: "Sleep-disordered breathing (SDB) encompasses conditions where breathing is abnormal during sleep, including obstructive sleep apnea (OSA), central sleep apnea (CSA), sleep-related hypoventilation, and upper airway resistance syndrome. Diagnosis involves clinical evaluation to assess risk and symptoms, followed by objective sleep testing to confirm the diagnosis and determine severity. Accurate SDB diagnosis is crucial because untreated SDB has significant cardiovascular, metabolic, and cognitive consequences.",
    howItWorks: "Evaluation begins with assessment of symptoms (snoring, witnessed apneas, gasping, choking, daytime sleepiness), risk factors (obesity, neck circumference, craniofacial features, family history), and comorbidities (hypertension, atrial fibrillation, heart failure). Screening questionnaires like STOP-BANG estimate OSA probability. Diagnosis is confirmed through polysomnography or home sleep testing, which measure respiratory events, oxygen levels, and sleep fragmentation.",
    candidatesFor: "Evaluation is recommended for patients with snoring and witnessed apneas, excessive daytime sleepiness, unexplained hypertension (especially resistant hypertension), atrial fibrillation, heart failure, pre-operative assessment for at-risk patients, and commercial drivers or safety-sensitive workers with risk factors.",
    benefits: [
      {
        name: "Identifies Type and Severity",
        description: "Testing distinguishes obstructive from central apnea and grades severity (mild, moderate, severe), which determines treatment approach."
      },
      {
        name: "Quantifies Cardiovascular Risk",
        description: "SDB severity correlates with cardiovascular risk. Diagnosis enables treatment that reduces heart disease, stroke, and hypertension risk."
      },
      {
        name: "Guides Treatment Selection",
        description: "Mild OSA may respond to oral appliances or positional therapy; severe OSA typically requires CPAP. Central apnea needs different approaches."
      },
      {
        name: "Enables Treatment Coverage",
        description: "Insurance coverage for CPAP and other treatments requires documented diagnosis with specific severity criteria."
      },
      {
        name: "Identifies Contributing Factors",
        description: "Evaluation may reveal factors contributing to SDB (obesity, alcohol use, sleep position, nasal obstruction) that can be modified."
      }
    ],
    sideEffects: [
      {
        name: "Testing Required",
        description: "Diagnosis requires objective testing (PSG or home test). This involves time and either a night in a lab or wearing home monitoring equipment."
      },
      {
        name: "False Negatives with Home Testing",
        description: "Home tests may underestimate severity or miss mild OSA. Negative results with persistent symptoms may require in-lab PSG."
      },
      {
        name: "Waiting for Results",
        description: "After testing, there's typically a waiting period for analysis and follow-up appointment to discuss results."
      },
      {
        name: "Anxiety About Findings",
        description: "Patients may feel anxious about discovering they have sleep apnea. Remember that diagnosis enables effective treatment."
      }
    ],
    variations: [
      {
        name: "Clinical Screening",
        description: "Tools like STOP-BANG questionnaire assess OSA probability based on symptoms and risk factors, helping prioritize who needs testing."
      },
      {
        name: "Home Sleep Apnea Testing",
        description: "Portable devices for home use that diagnose OSA in appropriate patients. More convenient and less expensive than in-lab testing."
      },
      {
        name: "In-Lab Polysomnography",
        description: "Comprehensive overnight testing required for complex patients, suspected central apnea, or when home testing is inconclusive."
      },
      {
        name: "Drug-Induced Sleep Endoscopy (DISE)",
        description: "Evaluation of upper airway collapse patterns under sedation to guide surgical treatment planning for select patients."
      },
      {
        name: "Capnography",
        description: "Measurement of CO2 levels to diagnose hypoventilation syndromes, particularly in patients with obesity or neuromuscular disease."
      }
    ],
    tips: [
      {
        title: "Know Your Risk Factors",
        description: "Obesity, large neck circumference, crowded airway, family history of OSA, and being male increase risk. Share this information with your provider."
      },
      {
        title: "Ask Your Bed Partner",
        description: "Partners often observe snoring, breathing pauses, and gasping that patients don't notice. Their observations are diagnostically valuable."
      },
      {
        title: "Don't Dismiss Symptoms",
        description: "Snoring isn't just annoying—it may indicate airway obstruction. Daytime sleepiness isn't normal aging. These symptoms warrant evaluation."
      },
      {
        title: "Mention Cardiovascular History",
        description: "If you have hypertension, heart failure, atrial fibrillation, or history of stroke, mention this—SDB is common and treatable in these conditions."
      },
      {
        title: "Be Prepared for Treatment Discussion",
        description: "If diagnosed with SDB, your provider will discuss treatment options. Be open to CPAP—it's highly effective when used consistently."
      },
      {
        title: "Follow Up on Negative Tests",
        description: "If your test is negative but symptoms persist, discuss with your provider. You may need in-lab testing or evaluation for other conditions."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" },
      { name: "Sleep Education - Sleep Apnea", url: "https://sleepeducation.org/sleep-disorders/sleep-apnea/" }
    ],
    relatedTreatments: ["Home Sleep Testing", "Polysomnography", "CPAP Therapy", "BiPAP Therapy", "Oral Appliance Therapy"],
    treatedConditions: ["Obstructive Sleep Apnea", "Central Sleep Apnea", "Complex Sleep Apnea", "Sleep-Related Hypoventilation", "Upper Airway Resistance Syndrome"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
