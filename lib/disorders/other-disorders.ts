import { SleepDisorderContent } from '../sleep-disorders-content'

export const otherDisorders: SleepDisorderContent[] = [
  {
    slug: "sleep-related-seizures",
    name: "Sleep-Related Seizures",
    category: "Other Conditions",
    description: "Epileptic seizures that occur predominantly or exclusively during sleep, which can disrupt sleep quality and be difficult to distinguish from other sleep disorders.",
    overview: "Sleep-related seizures are epileptic seizures that occur predominantly or exclusively during sleep. Several epilepsy syndromes are characterized by sleep-related seizures, including nocturnal frontal lobe epilepsy, benign epilepsy with centrotemporal spikes (BECTS), and others. Sleep and epilepsy have a complex bidirectional relationship: sleep can trigger seizures, and seizures/epilepsy can disrupt sleep. Nocturnal seizures can be difficult to distinguish from parasomnias, and accurate diagnosis is important for appropriate treatment.",
    prevalence: "Approximately 10-20% of people with epilepsy have seizures that occur exclusively during sleep, and about 30-40% have seizures that occur both during sleep and wakefulness. Certain epilepsy syndromes are highly associated with sleep-related seizures. BECTS, a common childhood epilepsy, occurs almost exclusively during sleep. Nocturnal frontal lobe epilepsy is another well-recognized sleep-related epilepsy syndrome.",
    causes: "Sleep-related seizures occur because sleep alters brain activity in ways that can promote seizure activity. NREM sleep, in particular, is associated with increased synchronization of brain activity that can facilitate seizure propagation. Specific epilepsy syndromes have genetic causes or result from structural brain abnormalities. Sleep deprivation is a well-known seizure trigger. Other factors that can provoke nocturnal seizures include stress, alcohol withdrawal, and missed medications.",
    types: [
      {
        name: "Nocturnal Frontal Lobe Epilepsy (NFLE)",
        description: "Features brief, stereotyped motor seizures arising from the frontal lobes during sleep. Can appear similar to parasomnias."
      },
      {
        name: "Benign Epilepsy with Centrotemporal Spikes (BECTS)",
        description: "A common childhood epilepsy with seizures occurring almost exclusively during sleep, typically outgrown by adolescence."
      },
      {
        name: "Electrical Status Epilepticus during Sleep (ESES)",
        description: "Continuous spike-wave activity during NREM sleep, associated with cognitive and language problems."
      },
      {
        name: "Generalized Tonic-Clonic Seizures during Sleep",
        description: "Various epilepsy syndromes can cause generalized convulsive seizures during sleep."
      }
    ],
    symptoms: [
      {
        name: "Nocturnal motor events",
        description: "Jerking, stiffening, twitching, or complex movements during sleep. May be brief (seconds) or more prolonged."
      },
      {
        name: "Tongue biting or incontinence",
        description: "Signs that may indicate a convulsive seizure rather than a parasomnia."
      },
      {
        name: "Stereotyped events",
        description: "Seizures are typically very similar from one episode to the next, unlike more variable parasomnia behaviors."
      },
      {
        name: "Post-ictal confusion",
        description: "Confusion, fatigue, or headache following the event may indicate a seizure."
      },
      {
        name: "Disrupted sleep",
        description: "Seizures fragment sleep, leading to daytime sleepiness and fatigue."
      },
      {
        name: "Waking with unexplained injuries",
        description: "Tongue bites, bruises, or muscle soreness upon waking without memory of the event."
      },
      {
        name: "Bedwetting in older children/adults",
        description: "New-onset nocturnal incontinence can indicate seizures."
      }
    ],
    selfTestQuestions: [
      "Have you had episodes of jerking, stiffening, or unusual movements during sleep?",
      "Do you wake up with unexplained tongue bites, bruises, or muscle soreness?",
      "Has a bed partner witnessed convulsive movements or rhythmic shaking during your sleep?",
      "Are the events very similar (stereotyped) from one night to the next?",
      "Do you wake up confused, with a headache, or excessively tired?",
      "Have you ever been diagnosed with epilepsy or had daytime seizures?"
    ],
    diagnosisOverview: "Diagnosis requires capturing events on video-EEG monitoring to document that events are epileptic seizures. Routine EEG (especially with sleep deprivation), brain MRI, and careful history help distinguish seizures from parasomnias.",
    diagnosticTests: [
      {
        name: "Video-EEG Monitoring",
        description: "Extended EEG monitoring with video recording to capture events is the gold standard for diagnosis, showing ictal EEG changes during events."
      },
      {
        name: "Routine EEG",
        description: "Standard EEG, especially with sleep deprivation and recording during sleep, may show interictal epileptiform discharges."
      },
      {
        name: "Sleep-Deprived EEG",
        description: "Sleep deprivation increases the likelihood of capturing sleep and epileptiform activity on EEG."
      },
      {
        name: "Brain MRI",
        description: "MRI may identify structural causes of epilepsy such as malformations, tumors, or scarring."
      },
      {
        name: "Home Video Recording",
        description: "Videos recorded by family members can help clinicians characterize events before formal monitoring."
      }
    ],
    treatmentOverview: "Treatment involves antiseizure medications appropriate for the specific epilepsy syndrome. Maintaining good sleep hygiene is important as sleep deprivation can trigger seizures. Some patients may be candidates for surgery.",
    treatments: [
      {
        name: "Antiseizure Medications",
        description: "Carbamazepine, oxcarbazepine, lacosamide, and other medications are used depending on the seizure type and syndrome. Medication choice is tailored to the individual."
      },
      {
        name: "Avoid Seizure Triggers",
        description: "Getting adequate sleep, avoiding alcohol, and taking medications consistently help prevent seizures."
      },
      {
        name: "BECTS Management",
        description: "For benign epilepsy with centrotemporal spikes, treatment may not be necessary as seizures are infrequent and the condition is outgrown."
      },
      {
        name: "Epilepsy Surgery",
        description: "For refractory cases with an identifiable seizure focus, surgery may be an option."
      },
      {
        name: "Treat Comorbid Sleep Disorders",
        description: "Treating sleep apnea or other sleep disorders that fragment sleep may improve seizure control."
      }
    ],
    lifestyleChanges: [
      "Get adequate, regular sleep (sleep deprivation triggers seizures)",
      "Take antiseizure medications consistently as prescribed",
      "Avoid alcohol and recreational drugs",
      "Maintain a regular sleep schedule",
      "Treat any underlying sleep disorders",
      "Consider safety modifications for the sleep environment",
      "Ensure bed partners know seizure first aid",
      "Wear medical identification if you have epilepsy"
    ],
    supportResources: [
      { name: "Epilepsy Foundation", url: "https://www.epilepsy.com/" },
      { name: "Citizens United for Research in Epilepsy", url: "https://www.cureepilepsy.org/" }
    ],
    relatedDisorders: ["Sleepwalking", "REM Sleep Behavior Disorder", "Night Terrors", "Epilepsy"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "sleep-fragmentation",
    name: "Sleep Fragmentation",
    category: "Other Conditions",
    description: "Frequent brief arousals and awakenings during sleep that disrupt sleep continuity and reduce sleep quality, leading to daytime impairment.",
    overview: "Sleep fragmentation refers to the disruption of sleep continuity by frequent arousals or awakenings. While some brief arousals are normal, excessive fragmentation prevents the brain from progressing through normal sleep cycles and obtaining adequate deep and REM sleep. This results in non-restorative sleep and daytime symptoms despite apparently adequate sleep duration. Sleep fragmentation is not a disorder itself but a feature of many sleep disorders and can also result from environmental, medical, or medication-related factors.",
    prevalence: "Sleep fragmentation is extremely common and increases with age. It is present in most people with obstructive sleep apnea, periodic limb movement disorder, and chronic pain. Environmental causes (noise, temperature, bed partner disturbance) affect many people. The prevalence of clinically significant sleep fragmentation depends on the underlying cause.",
    causes: "Sleep fragmentation has many potential causes: sleep disorders (sleep apnea, restless legs, periodic limb movements, parasomnias), medical conditions (chronic pain, arthritis, GERD, nocturia, heart failure, respiratory disease), psychiatric conditions (anxiety, depression, PTSD), medications (diuretics, stimulating medications), substances (alcohol, caffeine), environmental factors (noise, light, temperature, uncomfortable bed, bed partner), age-related changes in sleep architecture, and infant/child care responsibilities.",
    symptoms: [
      {
        name: "Frequent awakenings",
        description: "Waking up multiple times during the night, whether or not you remember these awakenings."
      },
      {
        name: "Non-restorative sleep",
        description: "Despite spending adequate time in bed, sleep doesn't feel refreshing and you wake up tired."
      },
      {
        name: "Daytime fatigue and sleepiness",
        description: "Excessive tiredness during the day that impacts functioning and quality of life."
      },
      {
        name: "Cognitive impairment",
        description: "Difficulty with concentration, memory, and mental processing due to inadequate restorative sleep."
      },
      {
        name: "Mood changes",
        description: "Irritability, mood swings, anxiety, and depression associated with poor sleep quality."
      },
      {
        name: "Increased sleep time with poor quality",
        description: "Needing more time in bed to feel rested because sleep efficiency is low."
      }
    ],
    selfTestQuestions: [
      "Do you wake up multiple times during the night?",
      "Do you feel unrefreshed in the morning despite spending enough time in bed?",
      "Is your daytime functioning impaired by tiredness or sleepiness?",
      "Do you have a sleep disorder, chronic pain, or medical condition that disturbs your sleep?",
      "Is your sleep environment noisy, too bright, or uncomfortable?",
      "Do you take medications or substances that might disrupt your sleep?"
    ],
    diagnosisOverview: "Evaluation focuses on identifying the underlying cause of sleep fragmentation. This involves detailed sleep history, sleep diary, and often polysomnography to document arousals and identify specific sleep disorders.",
    diagnosticTests: [
      {
        name: "Polysomnography",
        description: "Sleep study documents the arousal index (number of arousals per hour), sleep efficiency, and identifies specific causes like apnea or limb movements."
      },
      {
        name: "Sleep Diary",
        description: "Tracking sleep patterns, awakenings, and daytime symptoms helps characterize the problem."
      },
      {
        name: "Actigraphy",
        description: "Extended monitoring of rest-activity patterns can show disrupted sleep over multiple nights."
      },
      {
        name: "Medical Evaluation",
        description: "Assessment for medical conditions (pain, GERD, nocturia, etc.) that may be causing awakenings."
      }
    ],
    treatmentOverview: "Treatment targets the underlying cause of fragmentation. This may involve treating sleep disorders, managing medical conditions, adjusting medications, or optimizing the sleep environment.",
    treatments: [
      {
        name: "Treat Underlying Sleep Disorders",
        description: "CPAP for sleep apnea, medications for restless legs, treatment for parasomnias—addressing the primary sleep disorder improves continuity."
      },
      {
        name: "Manage Medical Conditions",
        description: "Optimizing treatment for pain, GERD, nocturia, and other conditions that cause awakenings."
      },
      {
        name: "Medication Review",
        description: "Adjusting timing or type of medications that may be fragmenting sleep (diuretics, stimulants, some antidepressants)."
      },
      {
        name: "Environmental Modifications",
        description: "Improving the sleep environment: reducing noise (white noise, earplugs), darkening the room, optimizing temperature, upgrading mattress."
      },
      {
        name: "Cognitive Behavioral Therapy",
        description: "CBT-I techniques can help reduce awakenings and improve sleep efficiency."
      }
    ],
    lifestyleChanges: [
      "Identify and address factors causing awakenings",
      "Create an optimal sleep environment (dark, quiet, cool)",
      "Limit fluids before bed to reduce nighttime urination",
      "Avoid alcohol, which fragments sleep in the second half of the night",
      "Limit caffeine, especially after noon",
      "Maintain consistent sleep schedules",
      "Address pain before bed with appropriate medications or positioning",
      "Consider separate sleeping arrangements if bed partner disturbs sleep",
      "Use white noise to mask environmental sounds"
    ],
    relatedDisorders: ["Sleep Apnea", "Restless Legs Syndrome", "Periodic Limb Movement Disorder", "Insomnia", "Chronic Pain"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "unrefreshing-sleep",
    name: "Unrefreshing Sleep",
    category: "Other Conditions",
    description: "A subjective feeling of poor sleep quality despite adequate sleep duration, waking up feeling tired and unrested.",
    overview: "Unrefreshing sleep (also called non-restorative sleep) describes the subjective experience of sleep that fails to restore energy and alertness, leaving the person feeling tired upon waking despite spending adequate time asleep. It is not a diagnosis itself but a symptom that can occur in many conditions. Unrefreshing sleep is a core feature of chronic fatigue syndrome/ME and fibromyalgia, and is common in depression, sleep disorders, and various medical conditions. The mechanisms may involve disruption of restorative deep sleep, sleep fragmentation, or alterations in sleep quality that are difficult to measure.",
    prevalence: "Unrefreshing sleep is extremely common. Population studies suggest 10-25% of adults regularly experience non-restorative sleep. It is present in nearly all patients with chronic fatigue syndrome and fibromyalgia, and is common in depression, chronic pain, and various sleep disorders. Prevalence increases with age and is higher in women.",
    causes: "Causes of unrefreshing sleep include: sleep disorders (sleep apnea, restless legs, PLMD, insomnia), insufficient deep sleep or disrupted sleep architecture, chronic fatigue syndrome/ME, fibromyalgia, depression and anxiety, chronic pain conditions, autoimmune and inflammatory conditions, thyroid disorders, anemia, medication effects, substance use (alcohol, cannabis), and idiopathic (unknown) causes. In many cases, standard sleep studies appear relatively normal despite the subjective experience.",
    symptoms: [
      {
        name: "Waking unrefreshed",
        description: "Despite adequate time in bed, waking up feeling as tired (or more tired) than when going to sleep."
      },
      {
        name: "Daytime fatigue",
        description: "Persistent tiredness and low energy throughout the day, distinct from sleepiness."
      },
      {
        name: "Cognitive difficulties",
        description: "Brain fog, difficulty concentrating, and mental fatigue often accompany unrefreshing sleep."
      },
      {
        name: "Morning symptoms",
        description: "Waking with stiffness, achiness, or headache in addition to fatigue."
      },
      {
        name: "Need for excessive sleep time",
        description: "Spending longer in bed trying to achieve feeling rested, often without success."
      },
      {
        name: "Functional impairment",
        description: "The fatigue and cognitive issues impact work, relationships, and quality of life."
      }
    ],
    selfTestQuestions: [
      "Do you wake up feeling tired even after a full night's sleep?",
      "Is your sleep failing to restore your energy levels?",
      "Do you experience daytime fatigue and low energy despite adequate sleep time?",
      "Do you have chronic fatigue syndrome, fibromyalgia, or chronic pain?",
      "Have you been evaluated for sleep disorders?",
      "Is the problem affecting your daily functioning?"
    ],
    diagnosisOverview: "Evaluation focuses on identifying underlying causes including sleep disorders, medical conditions, and psychiatric factors. A thorough history, sleep study, and medical workup are typically indicated.",
    diagnosticTests: [
      {
        name: "Sleep History",
        description: "Detailed assessment of sleep habits, symptoms, and their impact on functioning."
      },
      {
        name: "Polysomnography",
        description: "Sleep study to rule out sleep apnea, periodic limb movements, and assess sleep architecture."
      },
      {
        name: "Blood Tests",
        description: "Evaluation for thyroid disorders, anemia, vitamin deficiencies, inflammatory markers, and other medical causes."
      },
      {
        name: "Psychiatric Evaluation",
        description: "Assessment for depression, anxiety, and other psychiatric conditions."
      },
      {
        name: "Evaluation for CFS/ME and Fibromyalgia",
        description: "If other symptoms suggest these conditions, appropriate evaluation is warranted."
      }
    ],
    treatmentOverview: "Treatment depends on identifying and addressing underlying causes. When sleep disorders or medical conditions are treated, unrefreshing sleep often improves. For some conditions like CFS/ME, management focuses on symptom relief and pacing.",
    treatments: [
      {
        name: "Treat Underlying Sleep Disorders",
        description: "If sleep apnea, restless legs, or other disorders are identified, treating them may restore refreshing sleep."
      },
      {
        name: "Treat Medical Conditions",
        description: "Managing depression, thyroid disorders, anemia, chronic pain, and other conditions that contribute to unrefreshing sleep."
      },
      {
        name: "Sleep Hygiene Optimization",
        description: "Improving sleep habits may help even when no specific disorder is identified."
      },
      {
        name: "Cognitive Behavioral Therapy",
        description: "CBT for insomnia or depression can improve sleep quality."
      },
      {
        name: "Medications",
        description: "Low-dose tricyclic antidepressants (like amitriptyline) or other medications may improve sleep quality in conditions like fibromyalgia."
      },
      {
        name: "CFS/ME Management",
        description: "For chronic fatigue syndrome, pacing strategies and symptom management are key; aggressive exercise can worsen symptoms."
      }
    ],
    lifestyleChanges: [
      "Maintain excellent sleep hygiene",
      "Keep a consistent sleep schedule",
      "Optimize the sleep environment",
      "Exercise regularly but not too close to bedtime",
      "Manage stress through relaxation techniques",
      "Limit alcohol and caffeine",
      "Pace activities to avoid overexertion (especially important in CFS/ME)",
      "Seek treatment for any mental health conditions",
      "Keep a sleep and symptom diary to identify patterns"
    ],
    relatedDisorders: ["Chronic Fatigue Syndrome", "Fibromyalgia", "Depression", "Sleep Apnea", "Insomnia"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "nocturia",
    name: "Nocturia",
    category: "Other Conditions",
    description: "The need to wake during the night to urinate, which disrupts sleep and can be caused by various medical conditions.",
    overview: "Nocturia is the complaint of having to wake one or more times during the night to urinate, with each urination preceded and followed by sleep. While occasionally waking to urinate is common, nocturia that occurs two or more times per night significantly impacts sleep quality and is associated with increased health risks. Nocturia is not a disease but a symptom that can result from various causes including overactive bladder, reduced bladder capacity, excessive nighttime urine production, sleep disorders, and medical conditions. It becomes increasingly common with age.",
    prevalence: "Nocturia is extremely common, especially with aging. Approximately 50% of adults over 50 and up to 80% of those over 80 experience nocturia. It affects men and women approximately equally, though the underlying causes differ. Two or more voids per night (clinically significant nocturia) affects about 20-30% of adults over 40. Nocturia is one of the most common causes of sleep disruption.",
    causes: "Nocturia results from three main mechanisms: nocturnal polyuria (excessive urine production at night, due to congestive heart failure, peripheral edema, excessive evening fluid intake, or reduced nighttime ADH), reduced bladder capacity (overactive bladder, benign prostatic hyperplasia, interstitial cystitis), and sleep disorders (sleep apnea causes nocturia through hormonal mechanisms). Other factors include diabetes, medications (diuretics, especially if taken in evening), caffeine and alcohol, and primary sleep disorders where awakening for other reasons leads to urination.",
    symptoms: [
      {
        name: "Waking to urinate",
        description: "Needing to get up one or more times during the night specifically to urinate, with return to sleep afterward."
      },
      {
        name: "Sleep disruption",
        description: "Fragmented sleep with difficulty returning to sleep after bathroom trips in some people."
      },
      {
        name: "Daytime fatigue",
        description: "Tiredness resulting from repeated nighttime awakenings."
      },
      {
        name: "Large nighttime urine volume",
        description: "In nocturnal polyuria, the total amount of urine produced at night is excessive (more than one-third of daily volume)."
      },
      {
        name: "Associated urinary symptoms",
        description: "May include urgency, frequency during the day, weak stream, or incomplete emptying depending on the underlying cause."
      }
    ],
    selfTestQuestions: [
      "Do you wake up two or more times per night to urinate?",
      "Is the need to urinate what wakes you, or do you urinate because you're already awake?",
      "Do you produce large amounts of urine at night?",
      "Do you have daytime urinary symptoms like urgency or frequency?",
      "Do you have swelling in your legs during the day that goes down at night?",
      "Do you snore or have you been told you have sleep apnea?"
    ],
    diagnosisOverview: "Evaluation includes a voiding diary (bladder diary) to characterize the pattern, and assessment for underlying causes. The voiding diary is essential to determine whether the problem is nocturnal polyuria, reduced bladder capacity, or both.",
    diagnosticTests: [
      {
        name: "Voiding Diary (Bladder Diary)",
        description: "A 24-72 hour log of timing and volume of all urinations, plus fluid intake. Essential for determining the mechanism of nocturia."
      },
      {
        name: "Medical History and Physical",
        description: "Assessment for heart failure, diabetes, BPH, overactive bladder, and other contributing conditions."
      },
      {
        name: "Urinalysis",
        description: "To check for urinary tract infection, glucose (diabetes), and other abnormalities."
      },
      {
        name: "Post-Void Residual",
        description: "Ultrasound measurement of urine remaining after voiding to assess for incomplete emptying."
      },
      {
        name: "Sleep Study",
        description: "If sleep apnea is suspected based on snoring, witnessed apneas, or unexplained nocturia."
      },
      {
        name: "Blood Tests",
        description: "Glucose, BUN/creatinine, and other tests based on suspected underlying conditions."
      }
    ],
    treatmentOverview: "Treatment depends on the underlying cause. Behavioral strategies are first-line. Treating sleep apnea with CPAP often dramatically reduces nocturia. Medications are available for overactive bladder and nocturnal polyuria.",
    treatments: [
      {
        name: "Behavioral Strategies",
        description: "Limiting fluids in the evening (especially caffeine and alcohol), elevating legs in the afternoon (for fluid redistribution), compression stockings, and timed voiding before bed."
      },
      {
        name: "Treat Sleep Apnea",
        description: "CPAP treatment for sleep apnea often significantly reduces nocturia, sometimes eliminating it entirely."
      },
      {
        name: "Desmopressin",
        description: "For nocturnal polyuria, desmopressin (DDAVP) reduces nighttime urine production. Use requires careful monitoring of sodium levels, especially in older adults."
      },
      {
        name: "Overactive Bladder Medications",
        description: "Anticholinergics or beta-3 agonists (mirabegron) for overactive bladder symptoms."
      },
      {
        name: "BPH Treatment",
        description: "Alpha-blockers, 5-alpha reductase inhibitors, or other treatments for benign prostatic hyperplasia in men."
      },
      {
        name: "Diuretic Timing",
        description: "If on diuretics, taking them in mid-afternoon rather than evening can shift urine production earlier."
      }
    ],
    lifestyleChanges: [
      "Limit fluid intake in the 2-3 hours before bed",
      "Avoid caffeine and alcohol, especially in the evening",
      "Elevate legs for 1-2 hours in the afternoon to reduce fluid accumulation",
      "Consider compression stockings if leg swelling is present",
      "Urinate immediately before getting into bed",
      "Treat constipation, which can worsen urinary symptoms",
      "Keep a bladder diary to understand patterns",
      "Make sure the path to the bathroom is safe (lighting, no obstacles)"
    ],
    relatedDisorders: ["Sleep Apnea", "Overactive Bladder", "Benign Prostatic Hyperplasia", "Heart Failure", "Diabetes"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "nocturnal-panic-attacks",
    name: "Nocturnal Panic Attacks",
    category: "Other Conditions",
    description: "Panic attacks that occur during sleep, waking the person with sudden intense fear and physical symptoms of panic.",
    overview: "Nocturnal panic attacks are panic attacks that occur during sleep, waking the person from sleep with the sudden onset of intense fear accompanied by physical symptoms such as racing heart, sweating, trembling, and difficulty breathing. These attacks typically occur during the transition from stage 2 to stage 3 (deep) sleep, rather than during REM sleep when dreams occur. Nocturnal panic attacks are not caused by nightmares. They occur in approximately 50-70% of people who have panic disorder and can lead to fear of sleep, insomnia, and significant distress.",
    prevalence: "Nocturnal panic attacks occur in approximately 50-70% of people with panic disorder. Some people have panic attacks exclusively at night. Panic disorder itself affects approximately 2-3% of the population. Nocturnal panic attacks are more common in women, mirroring the gender distribution of panic disorder generally.",
    causes: "Nocturnal panic attacks are a manifestation of panic disorder, which involves dysfunction in the brain's fear and arousal systems. The attacks occur during NREM sleep, particularly during transitions to deep sleep, suggesting involvement of arousal mechanisms. Contributing factors include: panic disorder (the underlying condition), sleep deprivation (can trigger attacks), stress and anxiety, caffeine and stimulants, certain medications, and hyperventilation or breathing changes during sleep. The attacks are not triggered by dreams.",
    symptoms: [
      {
        name: "Sudden awakening with fear",
        description: "Waking abruptly from sleep with intense fear, dread, or sense of impending doom."
      },
      {
        name: "Racing heart (palpitations)",
        description: "Rapid, pounding heartbeat is one of the most common symptoms."
      },
      {
        name: "Sweating",
        description: "Profuse sweating often accompanies the panic attack."
      },
      {
        name: "Trembling or shaking",
        description: "Uncontrollable trembling during the attack."
      },
      {
        name: "Shortness of breath",
        description: "Difficulty breathing or feeling of choking."
      },
      {
        name: "Chest discomfort",
        description: "Chest pain or tightness that may feel like a heart attack."
      },
      {
        name: "Derealization or depersonalization",
        description: "Feeling that things aren't real or feeling detached from oneself."
      },
      {
        name: "Fear of dying or losing control",
        description: "Intense fear that something catastrophic is happening."
      },
      {
        name: "No memory of a dream",
        description: "Unlike nightmares, nocturnal panic attacks are not associated with dream recall."
      }
    ],
    selfTestQuestions: [
      "Do you wake from sleep with sudden intense fear and physical symptoms like racing heart or sweating?",
      "Do these episodes occur without any nightmare or dream you can remember?",
      "Do you experience panic attacks during the daytime as well?",
      "Have you developed fear about going to sleep because of these attacks?",
      "Do the symptoms peak within minutes and then gradually subside?",
      "Have you had medical evaluation ruling out cardiac or other medical causes?"
    ],
    diagnosisOverview: "Diagnosis is based on the characteristic symptoms and history consistent with panic disorder. Medical evaluation is important to rule out cardiac and other conditions that can cause similar symptoms. Sleep studies may help distinguish nocturnal panic attacks from other sleep disorders.",
    diagnosticTests: [
      {
        name: "Clinical History",
        description: "Detailed description of the attacks, timing, symptoms, and presence of daytime panic attacks."
      },
      {
        name: "Panic Disorder Assessment",
        description: "Evaluation for panic disorder using clinical criteria and validated questionnaires."
      },
      {
        name: "Medical Evaluation",
        description: "Cardiac workup (ECG, possibly others) to rule out arrhythmias or other cardiac causes of nocturnal symptoms."
      },
      {
        name: "Polysomnography",
        description: "Sleep study may help distinguish nocturnal panic attacks from night terrors, sleep apnea-related arousals, or sleep-related seizures."
      },
      {
        name: "Psychiatric Evaluation",
        description: "Assessment for panic disorder, other anxiety disorders, depression, and PTSD."
      }
    ],
    treatmentOverview: "Treatment is the same as for panic disorder generally: cognitive behavioral therapy (CBT) is first-line, with medications (SSRIs, SNRIs, or benzodiazepines) for more severe cases. Addressing sleep-specific fears is important.",
    treatments: [
      {
        name: "Cognitive Behavioral Therapy (CBT)",
        description: "First-line treatment for panic disorder. CBT helps identify and change thought patterns that contribute to panic, and includes exposure techniques. Sleep-specific CBT addresses fear of sleep."
      },
      {
        name: "SSRIs and SNRIs",
        description: "Antidepressants like sertraline, paroxetine, fluoxetine, or venlafaxine are first-line medications for panic disorder."
      },
      {
        name: "Benzodiazepines",
        description: "Clonazepam or other benzodiazepines may be used short-term or as adjuncts, but carry risks of dependence."
      },
      {
        name: "Relaxation Techniques",
        description: "Deep breathing, progressive muscle relaxation, and mindfulness can help manage anxiety and reduce panic frequency."
      },
      {
        name: "Sleep Hygiene",
        description: "Good sleep habits reduce sleep deprivation, which can trigger panic attacks."
      }
    ],
    lifestyleChanges: [
      "Avoid caffeine, especially later in the day",
      "Avoid alcohol, which can worsen anxiety and panic",
      "Maintain regular sleep schedules and get adequate sleep",
      "Practice relaxation techniques before bed",
      "Exercise regularly (but not too close to bedtime)",
      "If an attack occurs, remind yourself it will pass and practice slow breathing",
      "Address daytime stress and anxiety",
      "Avoid sleeping in excessively warm environments",
      "Keep a panic diary to track patterns and triggers"
    ],
    supportResources: [
      { name: "Anxiety and Depression Association of America", url: "https://adaa.org/" },
      { name: "National Alliance on Mental Illness", url: "https://www.nami.org/" }
    ],
    relatedDisorders: ["Panic Disorder", "Night Terrors", "Nightmares", "Sleep Apnea", "Anxiety Disorders"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
