import { TreatmentContent } from '../treatment-options-content'

export const sleepTesting: TreatmentContent[] = [
  {
    slug: "polysomnography",
    name: "Polysomnography (In-Lab Sleep Study)",
    category: "Sleep Testing",
    description: "A comprehensive overnight sleep study conducted in a sleep laboratory that monitors brain waves, breathing, heart rhythm, oxygen levels, and muscle activity to diagnose sleep disorders.",
    overview: "Polysomnography (PSG) is the gold-standard diagnostic test for sleep disorders. Conducted overnight in a sleep laboratory, PSG comprehensively monitors multiple body functions during sleep including brain activity (EEG), eye movements (EOG), muscle tone (EMG), heart rhythm (ECG), breathing effort and airflow, oxygen saturation, and leg movements. This wealth of data allows sleep specialists to accurately diagnose a wide range of sleep disorders and determine their severity.",
    howItWorks: "During a PSG, a sleep technologist applies sensors to your scalp, face, chest, and legs using adhesive and tape. These sensors connect to monitoring equipment that records data throughout the night. You sleep in a private, hotel-like room while a technologist monitors your study from an adjacent control room. The recorded data is later analyzed by a sleep physician who scores sleep stages and identifies any abnormal events.",
    candidatesFor: "PSG is recommended when sleep apnea is suspected but home testing is not appropriate, when other sleep disorders (narcolepsy, parasomnias, nocturnal seizures, periodic limb movements) are suspected, for CPAP titration studies, and when initial testing is inconclusive. Certain conditions like significant cardiopulmonary disease, potential central sleep apnea, or safety-sensitive occupations may require in-lab testing.",
    benefits: [
      {
        name: "Comprehensive Monitoring",
        description: "PSG monitors far more parameters than home testing, enabling diagnosis of conditions that can't be detected at home, including sleep stages, arousals, and detailed respiratory events."
      },
      {
        name: "Professional Oversight",
        description: "A trained technologist monitors your study and can intervene if needed—adjusting sensors, noting events, or initiating CPAP if part of a split-night study."
      },
      {
        name: "Accurate Sleep Staging",
        description: "EEG monitoring allows precise measurement of sleep architecture, including REM sleep, which is important for diagnosing conditions like REM sleep behavior disorder and narcolepsy."
      },
      {
        name: "Split-Night Studies",
        description: "If severe sleep apnea is diagnosed in the first half of the night, CPAP titration can begin immediately, completing diagnosis and treatment in one night."
      },
      {
        name: "Diagnoses Multiple Disorders",
        description: "PSG can identify sleep apnea, narcolepsy, periodic limb movement disorder, REM sleep behavior disorder, parasomnias, and nocturnal seizures in a single study."
      }
    ],
    sideEffects: [
      {
        name: "First-Night Effect",
        description: "Sleeping in an unfamiliar environment with sensors attached may affect sleep quality. However, this rarely prevents accurate diagnosis of significant sleep disorders."
      },
      {
        name: "Inconvenience",
        description: "Requires spending a night away from home, typically arriving in the evening and leaving in the morning. May require time off work."
      },
      {
        name: "Sensor Discomfort",
        description: "The sensors and wires, while not painful, can feel unusual and may take some time to adjust to. Most patients sleep adequately despite them."
      },
      {
        name: "Waiting Time",
        description: "In-lab sleep studies may have longer wait times for scheduling compared to home tests, depending on local availability."
      },
      {
        name: "Higher Cost",
        description: "PSG is more expensive than home sleep testing, though most insurance covers it when medically necessary."
      }
    ],
    variations: [
      {
        name: "Diagnostic PSG",
        description: "Standard overnight study to diagnose sleep disorders without any treatment intervention during the study."
      },
      {
        name: "Split-Night PSG",
        description: "If severe OSA is identified in the first 2-3 hours, CPAP titration begins for the remainder of the night, combining diagnosis and titration."
      },
      {
        name: "CPAP Titration Study",
        description: "Full-night study for patients already diagnosed with sleep apnea, focused on finding the optimal CPAP pressure setting."
      },
      {
        name: "BiPAP/ASV Titration",
        description: "Specialized titration study for patients who need BiPAP or adaptive servo-ventilation therapy."
      },
      {
        name: "Extended EEG Monitoring",
        description: "Additional EEG leads for patients with suspected nocturnal seizures or unusual nocturnal behaviors."
      }
    ],
    tips: [
      {
        title: "Maintain Normal Routine",
        description: "Follow your usual daytime routine before the study. Don't nap, avoid caffeine after noon, and don't use alcohol—you want the study to reflect your typical sleep."
      },
      {
        title: "Bring Comfort Items",
        description: "Bring your own pillow, pajamas, and any items that help you sleep. Most labs accommodate personal preferences."
      },
      {
        title: "Shower Before Arrival",
        description: "Clean hair and skin help sensors stick better. Avoid hair products, lotions, and makeup on the night of your study."
      },
      {
        title: "List Your Medications",
        description: "Bring a list of all medications. Some may affect sleep and will be noted in your study interpretation."
      },
      {
        title: "Arrive Prepared to Sleep",
        description: "Eat dinner before arriving. Complete your bedtime routine (brushing teeth, etc.) before the technologist begins setup."
      },
      {
        title: "Communicate Needs",
        description: "Let the technologist know if you need to use the bathroom, adjust room temperature, or if something is uncomfortable. They're there to help."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" },
      { name: "Sleep Education - Sleep Studies", url: "https://sleepeducation.org/sleep-studies/" }
    ],
    relatedTreatments: ["Home Sleep Testing", "MSLT", "MWT", "CPAP Therapy"],
    treatedConditions: ["Obstructive Sleep Apnea", "Central Sleep Apnea", "Narcolepsy", "REM Sleep Behavior Disorder", "Periodic Limb Movement Disorder", "Parasomnias"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "home-sleep-testing",
    name: "Home Sleep Testing (HST)",
    category: "Sleep Testing",
    description: "A simplified sleep study performed in your own home using a portable monitoring device to diagnose obstructive sleep apnea in appropriate candidates.",
    overview: "Home Sleep Testing (HST), also called Home Sleep Apnea Testing (HSAT) or out-of-center sleep testing, allows patients to complete a sleep study in the comfort of their own bed. A portable device monitors key parameters—typically airflow, breathing effort, oxygen saturation, and heart rate—to detect obstructive sleep apnea. HST is appropriate for many patients with suspected moderate to severe OSA without significant comorbidities, offering convenience and lower cost compared to in-lab studies.",
    howItWorks: "You pick up a small portable device from your sleep clinic or have it mailed to you. At home, you follow instructions to apply sensors—typically a nasal cannula for airflow, a belt for breathing effort, and a finger probe for oxygen and heart rate. You wear the device during a typical night's sleep, then return it for data download and analysis by a sleep physician.",
    candidatesFor: "HST is appropriate for patients with a high pretest probability of moderate to severe obstructive sleep apnea without significant comorbidities. It's not recommended for patients with significant cardiopulmonary disease, potential central sleep apnea, neuromuscular disease, chronic opioid use, or when other sleep disorders are suspected. Your sleep physician will determine if HST is appropriate for you.",
    benefits: [
      {
        name: "Sleep in Your Own Bed",
        description: "Testing at home eliminates the 'first-night effect' of sleeping in an unfamiliar environment, potentially providing more representative results."
      },
      {
        name: "Convenience",
        description: "No need to take time off work or spend a night away from home. You complete the test on your own schedule."
      },
      {
        name: "Faster Access",
        description: "HST devices are often available immediately, without the scheduling delays that can occur with in-lab studies."
      },
      {
        name: "Lower Cost",
        description: "HST typically costs significantly less than in-lab polysomnography, reducing out-of-pocket expenses even with insurance."
      },
      {
        name: "Sufficient for Many Patients",
        description: "For straightforward OSA diagnosis in appropriate candidates, HST provides adequate information to initiate treatment."
      }
    ],
    sideEffects: [
      {
        name: "Limited Data",
        description: "HST doesn't measure brain waves (EEG), so it can't determine sleep stages, detect arousals, or diagnose many non-respiratory sleep disorders."
      },
      {
        name: "Potential for Technical Failure",
        description: "Without a technologist present, sensor disconnection or data loss may require repeating the test."
      },
      {
        name: "May Underestimate Severity",
        description: "Because HST estimates (rather than measures) total sleep time, it may underestimate OSA severity, particularly in milder cases."
      },
      {
        name: "Not Suitable for Everyone",
        description: "Patients with certain conditions require in-lab testing for accurate diagnosis. Inappropriate use of HST may miss important diagnoses."
      },
      {
        name: "User-Dependent Setup",
        description: "You must correctly apply sensors yourself. Poor application can affect data quality."
      }
    ],
    variations: [
      {
        name: "Type III Devices",
        description: "Monitor at least 4 channels including airflow, respiratory effort, and oxygen saturation. The most common type used for HST."
      },
      {
        name: "Type IV Devices",
        description: "Simpler devices monitoring 1-2 channels, typically just oxygen saturation. Less comprehensive but used for initial screening."
      },
      {
        name: "WatchPAT",
        description: "Wrist-worn device using peripheral arterial tone (PAT) technology to detect respiratory events. Easy to apply with good accuracy."
      },
      {
        name: "Disposable HST Devices",
        description: "Single-use devices that are discarded after testing, eliminating cleaning and return shipping."
      }
    ],
    tips: [
      {
        title: "Practice Before Test Night",
        description: "Review instructions and practice applying sensors before your test night. This helps ensure correct application when it counts."
      },
      {
        title: "Choose a Typical Night",
        description: "Test on a night when you expect normal sleep. Avoid alcohol, unusual schedules, or anything that might affect your typical sleep pattern."
      },
      {
        title: "Follow Instructions Carefully",
        description: "Proper sensor placement is crucial for accurate data. Review written instructions and any instructional videos provided."
      },
      {
        title: "Sleep Your Usual Amount",
        description: "Try to get a typical night's sleep duration. Very short sleep periods may provide insufficient data."
      },
      {
        title: "Note Any Issues",
        description: "If sensors fall off or you have an unusual night, make notes to share with your provider when interpreting results."
      },
      {
        title: "Understand Potential Next Steps",
        description: "If HST is negative or inconclusive but symptoms persist, in-lab PSG may be needed. A negative HST doesn't definitively rule out sleep apnea."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" },
      { name: "Sleep Education", url: "https://sleepeducation.org/" }
    ],
    relatedTreatments: ["Polysomnography", "CPAP Therapy", "Sleep Disorders Diagnosis"],
    treatedConditions: ["Obstructive Sleep Apnea"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "sleep-studies",
    name: "Sleep Studies",
    category: "Sleep Testing",
    description: "Diagnostic tests that monitor body functions during sleep to identify sleep disorders, including overnight polysomnography, home sleep tests, and specialized daytime studies.",
    overview: "Sleep studies are diagnostic tests that record what happens in your body during sleep. They're essential for diagnosing sleep disorders that can't be identified through symptoms and physical examination alone. Sleep studies range from comprehensive in-lab polysomnography to simplified home tests, and include specialized daytime tests for conditions like narcolepsy. The type of study recommended depends on your symptoms and suspected diagnosis.",
    howItWorks: "All sleep studies work by monitoring physiological signals during sleep. These may include brain waves (EEG), eye movements (EOG), muscle activity (EMG), heart rhythm (ECG), breathing (airflow and effort), oxygen levels, and body position. The data is recorded and analyzed by sleep specialists to identify abnormal patterns that indicate specific sleep disorders.",
    candidatesFor: "Sleep studies are recommended for patients with symptoms suggesting sleep-disordered breathing (snoring, witnessed apneas, gasping), unexplained excessive daytime sleepiness, suspected narcolepsy or idiopathic hypersomnia, unusual behaviors during sleep (parasomnias), restless legs symptoms, or when clinical evaluation suggests a sleep disorder requiring objective confirmation.",
    benefits: [
      {
        name: "Objective Diagnosis",
        description: "Sleep studies provide objective data that confirms or rules out sleep disorders, moving beyond symptom-based suspicion to definitive diagnosis."
      },
      {
        name: "Severity Assessment",
        description: "Studies quantify disorder severity (mild, moderate, severe), which guides treatment decisions and establishes baselines for measuring improvement."
      },
      {
        name: "Treatment Guidance",
        description: "Results help determine appropriate treatment—whether CPAP, oral appliance, surgery, or medication—and the specific parameters needed."
      },
      {
        name: "Insurance Requirements",
        description: "Most insurance requires objective testing before covering treatments like CPAP. Sleep studies fulfill this documentation requirement."
      },
      {
        name: "Identify Unexpected Findings",
        description: "Studies sometimes reveal conditions patients didn't know they had, such as periodic limb movements or cardiac arrhythmias during sleep."
      }
    ],
    sideEffects: [
      {
        name: "Sleep Disruption",
        description: "The testing environment and sensors may affect sleep quality, though this rarely prevents diagnosis of significant disorders."
      },
      {
        name: "Time and Inconvenience",
        description: "In-lab studies require a night away from home. Home tests require learning to apply sensors correctly."
      },
      {
        name: "Possible Need for Repeat Testing",
        description: "Technical problems, insufficient sleep, or inconclusive results may require a repeat study."
      },
      {
        name: "Waiting for Results",
        description: "Analysis and interpretation take time. Most patients receive results within 1-2 weeks of their study."
      }
    ],
    variations: [
      {
        name: "Overnight Polysomnography (PSG)",
        description: "Comprehensive in-lab study monitoring many parameters. Gold standard for diagnosing most sleep disorders."
      },
      {
        name: "Home Sleep Testing (HST)",
        description: "Portable device for home use, primarily for diagnosing obstructive sleep apnea in appropriate candidates."
      },
      {
        name: "CPAP Titration Study",
        description: "In-lab study to determine optimal CPAP pressure for patients diagnosed with sleep apnea."
      },
      {
        name: "Split-Night Study",
        description: "Combined diagnostic and titration study—diagnosis first half, CPAP titration second half—for patients with severe OSA."
      },
      {
        name: "Multiple Sleep Latency Test (MSLT)",
        description: "Daytime study measuring how quickly you fall asleep and enter REM, used to diagnose narcolepsy."
      },
      {
        name: "Maintenance of Wakefulness Test (MWT)",
        description: "Daytime study measuring ability to stay awake, used for assessing alertness in safety-sensitive situations."
      }
    ],
    tips: [
      {
        title: "Prepare Questions",
        description: "Before your study, ask your provider what type of study you're having, what it will measure, and what to expect during and after."
      },
      {
        title: "Follow Pre-Study Instructions",
        description: "Instructions about caffeine, alcohol, napping, and medications are important for accurate results. Follow them carefully."
      },
      {
        title: "Bring Medical Information",
        description: "A list of medications, relevant medical history, and your referring physician's contact information facilitates smooth study completion."
      },
      {
        title: "Communicate Concerns",
        description: "If you're anxious about the study, have special needs, or have had problems with previous studies, let your provider know in advance."
      },
      {
        title: "Understand the Follow-up Process",
        description: "Know how and when you'll receive results, and who will discuss them with you. Don't hesitate to ask questions about findings and next steps."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" },
      { name: "Sleep Education", url: "https://sleepeducation.org/" }
    ],
    relatedTreatments: ["Polysomnography", "Home Sleep Testing", "MSLT", "MWT"],
    treatedConditions: ["Obstructive Sleep Apnea", "Central Sleep Apnea", "Narcolepsy", "Idiopathic Hypersomnia", "Parasomnias", "REM Sleep Behavior Disorder", "Periodic Limb Movement Disorder"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "mslt",
    name: "Multiple Sleep Latency Test (MSLT)",
    category: "Sleep Testing",
    description: "A daytime sleep study that measures how quickly you fall asleep and whether you enter REM sleep rapidly, used to diagnose narcolepsy and assess excessive daytime sleepiness.",
    overview: "The Multiple Sleep Latency Test (MSLT) is the standard diagnostic test for narcolepsy and is used to objectively measure excessive daytime sleepiness. Conducted during the day following an overnight sleep study, the MSLT consists of 4-5 scheduled nap opportunities. It measures sleep latency (how quickly you fall asleep) and whether you enter REM sleep during naps. The pattern of results helps diagnose narcolepsy and differentiate it from other causes of excessive sleepiness.",
    howItWorks: "The MSLT is performed after an overnight polysomnogram to document adequate sleep the night before. Starting about 2 hours after waking, you're given 4-5 opportunities to nap, spaced 2 hours apart. During each 20-minute nap trial, sensors monitor brain waves to determine if you fall asleep, how long it takes, and whether you enter REM sleep. Between naps, you must stay awake.",
    candidatesFor: "MSLT is indicated for patients with suspected narcolepsy (excessive sleepiness plus symptoms like cataplexy, sleep paralysis, or hypnagogic hallucinations), unexplained excessive daytime sleepiness after sleep apnea and insufficient sleep have been ruled out, and sometimes for suspected idiopathic hypersomnia. It's not appropriate for evaluating sleep apnea or general fatigue.",
    benefits: [
      {
        name: "Diagnoses Narcolepsy",
        description: "MSLT is the gold standard for narcolepsy diagnosis. The combination of short sleep latency and multiple sleep-onset REM periods (SOREMPs) is highly specific for narcolepsy."
      },
      {
        name: "Objective Sleepiness Measurement",
        description: "Unlike subjective questionnaires, MSLT provides objective measurement of your physiological tendency to fall asleep."
      },
      {
        name: "Differentiates Causes of Sleepiness",
        description: "MSLT results help distinguish narcolepsy from idiopathic hypersomnia, insufficient sleep, and other causes of excessive sleepiness."
      },
      {
        name: "Documents Severity",
        description: "The degree of sleep latency reduction helps quantify sleepiness severity, which may influence treatment decisions."
      },
      {
        name: "Required for Treatment",
        description: "Many insurance plans require MSLT documentation before covering narcolepsy medications."
      }
    ],
    sideEffects: [
      {
        name: "All-Day Testing",
        description: "MSLT requires most of the day (typically 8am-5pm), requiring time off work or other obligations."
      },
      {
        name: "Strict Requirements",
        description: "Accurate results require proper preparation: adequate sleep the preceding weeks, discontinuation of certain medications, overnight PSG the night before."
      },
      {
        name: "False Negatives Possible",
        description: "Inadequate preparation, medication effects, or an atypical day can lead to false-negative results, potentially requiring repeat testing."
      },
      {
        name: "Staying Awake Is Hard",
        description: "Patients with true excessive sleepiness may find it very difficult to stay awake between naps, as required by the protocol."
      },
      {
        name: "May Need to Stop Medications",
        description: "REM-suppressing medications (antidepressants, stimulants) must typically be discontinued 2 weeks before testing, which can be difficult."
      }
    ],
    variations: [
      {
        name: "Standard 5-Nap MSLT",
        description: "The standard protocol includes 5 nap opportunities. If 2 SOREMPs occur in the first 4 naps, the 5th may be skipped."
      },
      {
        name: "4-Nap MSLT",
        description: "Some protocols use 4 naps. Diagnostic criteria may be adjusted accordingly."
      },
      {
        name: "MSLT with Preceding PSG",
        description: "Standard practice includes overnight PSG before MSLT to document sleep quality and rule out other disorders."
      }
    ],
    tips: [
      {
        title: "Follow Sleep Schedule Instructions",
        description: "Keep a regular sleep schedule (typically 7+ hours per night) for 1-2 weeks before testing. Sleep logs or actigraphy may be required."
      },
      {
        title: "Review Medications Early",
        description: "Discuss all medications with your sleep physician well in advance. Some need to be stopped weeks before the test."
      },
      {
        title: "Avoid Caffeine and Alcohol",
        description: "Eliminate caffeine and alcohol for at least 24 hours before testing, as they affect sleep architecture and results."
      },
      {
        title: "Bring Quiet Activities",
        description: "You'll need to stay awake between naps. Bring books, puzzles, or other quiet activities (no sleeping!)."
      },
      {
        title: "Dress Comfortably",
        description: "Wear comfortable clothes suitable for napping. You'll be changing positions multiple times throughout the day."
      },
      {
        title: "Expect to Feel Strange",
        description: "Repeated napping throughout the day can feel disorienting. This is normal and temporary."
      }
    ],
    additionalResources: [
      { name: "Narcolepsy Network", url: "https://narcolepsynetwork.org/" },
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" }
    ],
    relatedTreatments: ["Polysomnography", "MWT", "Narcolepsy Treatment"],
    treatedConditions: ["Narcolepsy Type 1", "Narcolepsy Type 2", "Idiopathic Hypersomnia"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "mwt",
    name: "Maintenance of Wakefulness Test (MWT)",
    category: "Sleep Testing",
    description: "A daytime test that measures your ability to stay awake in a quiet, non-stimulating environment, used to assess whether sleepiness poses a safety risk.",
    overview: "The Maintenance of Wakefulness Test (MWT) measures your ability to stay awake during quiet, non-stimulating conditions. Unlike the MSLT which measures tendency to fall asleep, the MWT assesses your capacity to remain awake when trying to do so. This test is particularly important for people in safety-sensitive jobs (pilots, commercial drivers, heavy equipment operators) and for assessing treatment effectiveness in conditions like narcolepsy and sleep apnea.",
    howItWorks: "The MWT consists of 4 trials, each 40 minutes long, spaced 2 hours apart. You sit comfortably in a quiet, dimly lit room and are asked to try to stay awake. Brain wave monitoring detects if and when you fall asleep. The test measures how long you can remain awake across the trials. Average sleep latencies above 30-40 minutes are generally considered normal.",
    candidatesFor: "MWT is primarily used for assessing ability to stay awake in safety-sensitive occupations (aviation, commercial driving, military), evaluating treatment effectiveness in narcolepsy or sleep apnea, and medicolegal situations where alertness capacity must be documented. It's not typically used for initial diagnosis of sleep disorders.",
    benefits: [
      {
        name: "Assesses Safety Risk",
        description: "MWT provides objective data about ability to maintain wakefulness, which is critical for determining fitness for safety-sensitive duties."
      },
      {
        name: "Evaluates Treatment Effectiveness",
        description: "For patients with narcolepsy or treated sleep apnea, MWT can demonstrate whether treatment adequately restores normal alertness."
      },
      {
        name: "Regulatory Compliance",
        description: "Some regulatory agencies (FAA, FMCSA) may require or accept MWT results for return-to-duty decisions."
      },
      {
        name: "Medicolegal Documentation",
        description: "MWT provides objective documentation of alertness capacity that can be important in legal and disability contexts."
      },
      {
        name: "More Ecologically Valid",
        description: "Testing ability to stay awake may be more relevant to real-world safety than testing tendency to fall asleep (MSLT)."
      }
    ],
    sideEffects: [
      {
        name: "Time-Consuming",
        description: "The test requires most of a day (typically 6-8 hours), requiring time away from work or other responsibilities."
      },
      {
        name: "Boring",
        description: "Sitting quietly in a dim room trying to stay awake with nothing to do is tedious by design. This is intentional but uncomfortable."
      },
      {
        name: "Anxiety About Results",
        description: "When employment depends on results, test anxiety is common and may actually affect performance."
      },
      {
        name: "Not Standardized Across All Contexts",
        description: "While the 40-minute protocol is standard, interpretation and 'normal' thresholds vary somewhat by context and jurisdiction."
      },
      {
        name: "May Require Repeat Testing",
        description: "Abnormal results may need to be repeated after treatment optimization to demonstrate improvement."
      }
    ],
    variations: [
      {
        name: "40-Minute Protocol",
        description: "The standard protocol uses 40-minute trials. Each trial ends if you fall asleep or after 40 minutes of wakefulness."
      },
      {
        name: "20-Minute Protocol",
        description: "A shorter version using 20-minute trials, sometimes used but less sensitive for detecting mild sleepiness."
      },
      {
        name: "With Preceding PSG",
        description: "MWT is often performed after overnight PSG to document that adequate sleep occurred the night before."
      }
    ],
    tips: [
      {
        title: "Get Adequate Sleep Before",
        description: "Get a full night's sleep (or your usual CPAP use) the night before. The test should reflect your typical daytime alertness on adequate sleep."
      },
      {
        title: "Avoid Caffeine",
        description: "No caffeine on the test day. You want results that reflect your true alertness, not caffeine-enhanced wakefulness."
      },
      {
        title: "Optimize Treatment First",
        description: "If you're being tested to demonstrate treatment effectiveness, make sure your treatment (CPAP, medications) is optimized before the test."
      },
      {
        title: "Understand the Purpose",
        description: "Know why the test was ordered and how results will be used. This helps frame expectations and reduces anxiety."
      },
      {
        title: "Don't Fight Sleep Artificially",
        description: "Don't use physical stimulation (pinching yourself, fidgeting excessively) to stay awake. The test measures natural ability to maintain wakefulness."
      },
      {
        title: "Discuss Results Thoroughly",
        description: "If results have implications for employment or driving, make sure you understand them fully and discuss next steps with your provider."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" }
    ],
    relatedTreatments: ["MSLT", "Polysomnography", "CPAP Therapy", "Narcolepsy Treatment"],
    treatedConditions: ["Narcolepsy", "Obstructive Sleep Apnea", "Idiopathic Hypersomnia"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
