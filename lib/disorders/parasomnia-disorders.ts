import { SleepDisorderContent } from '../sleep-disorders-content'

export const parasomniaDisorders: SleepDisorderContent[] = [
  {
    slug: "sleepwalking",
    name: "Sleepwalking",
    category: "Parasomnias",
    description: "A sleep disorder involving walking or performing complex behaviors while in a state of partial arousal from deep sleep.",
    overview: "Sleepwalking (somnambulism) is a parasomnia involving complex behaviors, most notably walking, that occur during partial arousal from deep non-REM sleep (stages N3). Sleepwalkers appear awake with their eyes open but are actually in a state of incomplete awakening, unresponsive or only partially responsive to their environment, and have no memory of the episode upon full awakening. Episodes typically occur during the first third of the night when deep sleep is most prominent. Behaviors can range from simply sitting up in bed to walking, eating, or even driving, and can occasionally result in injury.",
    prevalence: "Sleepwalking is common in children, affecting up to 15-30% at some point during childhood, with peak prevalence between ages 8-12. Most children outgrow it by adolescence. In adults, prevalence is approximately 2-4%. There is a strong genetic component: the risk is 10 times higher if a first-degree relative is affected, and identical twins show high concordance.",
    causes: "Sleepwalking occurs when the brain becomes partially aroused from deep sleep, but fails to fully awaken. Contributing factors include: genetics (most important factor), sleep deprivation, irregular sleep schedules, stress and anxiety, fever (especially in children), certain medications (sedatives, hypnotics, some antidepressants), alcohol, sleeping in unfamiliar environments, sleep disorders that fragment sleep (sleep apnea, restless legs), and conditions causing frequent arousal from deep sleep. The immature brain in children makes incomplete arousals more likely.",
    symptoms: [
      {
        name: "Walking during sleep",
        description: "The hallmark symptom is getting out of bed and walking while remaining in a sleep state. Eyes are typically open but have a glassy, unfocused appearance."
      },
      {
        name: "Difficulty awakening during episode",
        description: "Sleepwalkers are difficult to wake and may become confused or agitated if awakened. It's generally recommended to gently guide them back to bed."
      },
      {
        name: "No memory of the event",
        description: "Upon waking the next morning, the person has no recollection of the sleepwalking episode or any events that occurred."
      },
      {
        name: "Complex behaviors",
        description: "Beyond walking, sleepwalkers may perform complex activities like eating, dressing, opening doors, going outside, or even driving."
      },
      {
        name: "Blank expression",
        description: "During episodes, the face appears blank and unresponsive. The person may not recognize family members or respond to their names."
      },
      {
        name: "Episodes during first third of night",
        description: "Most sleepwalking occurs in the first few hours after falling asleep, when deep (slow-wave) sleep is most abundant."
      },
      {
        name: "Potential for injury",
        description: "Sleepwalkers may trip, fall, walk into objects, or leave the house, potentially resulting in injury."
      }
    ],
    selfTestQuestions: [
      "Has anyone observed you walking around while appearing asleep?",
      "Do you wake up in unexpected places or find evidence of activities you don't remember?",
      "Do family members report that you're difficult to wake during these episodes?",
      "Do you have no memory of these events the next morning?",
      "Do episodes occur in the first few hours after falling asleep?",
      "Do you have family members who sleepwalk?"
    ],
    diagnosisOverview: "Diagnosis is typically clinical, based on history from bed partners or family members. Polysomnography is not usually required but may be done to rule out other conditions or when episodes are frequent, violent, or associated with injury.",
    diagnosticTests: [
      {
        name: "Clinical History",
        description: "Detailed description of events from witnesses, including timing, behaviors, responsiveness, and duration, is the primary diagnostic tool."
      },
      {
        name: "Sleep Diary",
        description: "Tracking sleep patterns and episodes can identify triggers and patterns."
      },
      {
        name: "Polysomnography",
        description: "Sleep study may be performed to capture episodes (if frequent), rule out sleep apnea or seizures, or when diagnosis is uncertain. Extended video-EEG may be needed."
      },
      {
        name: "Neurological Evaluation",
        description: "May be indicated if seizures are suspected or if episodes begin in adulthood without apparent cause."
      }
    ],
    treatmentOverview: "For most people, especially children, sleepwalking resolves without specific treatment. Management focuses on safety measures and addressing triggers. Medication is reserved for frequent, dangerous, or disruptive episodes.",
    treatments: [
      {
        name: "Safety Precautions",
        description: "The first priority is preventing injury: lock windows and doors, install alarms, remove obstacles, sleep on ground floor if possible, and secure dangerous objects."
      },
      {
        name: "Address Triggers",
        description: "Treating sleep deprivation, sleep apnea, and restless legs can reduce episodes. Managing stress and avoiding alcohol helps."
      },
      {
        name: "Scheduled Awakenings",
        description: "For children with predictable timing, briefly waking them 15-30 minutes before usual episode time can disrupt the pattern."
      },
      {
        name: "Benzodiazepines",
        description: "Clonazepam at bedtime can be effective for frequent or dangerous episodes by reducing deep sleep transitions and arousals."
      },
      {
        name: "Antidepressants",
        description: "SSRIs or tricyclic antidepressants may help some patients, possibly by affecting sleep architecture."
      },
      {
        name: "Hypnotherapy",
        description: "Some evidence supports hypnosis as a treatment for parasomnia, particularly in children and adolescents."
      }
    ],
    lifestyleChanges: [
      "Maintain a consistent sleep schedule with adequate sleep time",
      "Avoid alcohol, especially before bed",
      "Reduce stress through relaxation techniques",
      "Create a safe sleep environment (clear pathways, lock doors)",
      "Install alarms on bedroom doors",
      "Sleep on the ground floor if possible",
      "Address any underlying sleep disorders",
      "Avoid sleep deprivation, which is a common trigger",
      "Be cautious with new medications that may affect sleep"
    ],
    relatedDisorders: ["Sleep Terrors", "Confusional Arousals", "REM Sleep Behavior Disorder", "Sleep-Related Eating Disorder"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "sleep-talking",
    name: "Sleep Talking",
    category: "Parasomnias",
    description: "A common sleep disorder involving talking during sleep without awareness, ranging from simple sounds to complex conversations.",
    overview: "Sleep talking (somniloquy) is a parasomnia characterized by talking during sleep without awareness of doing so. It can occur during any sleep stage but is most common during lighter NREM sleep and REM sleep. Speech can range from mumbling, simple sounds, or meaningless words to clear, coherent sentences or extended conversations. Episodes are usually brief and infrequent, though some individuals may talk extensively or nightly. Sleep talking is generally harmless but can disturb bed partners and occasionally reveal private thoughts, causing social embarrassment.",
    prevalence: "Sleep talking is very common, especially in children. Approximately 50% of children and 5% of adults talk in their sleep at least occasionally. Regular sleep talking (multiple nights per week) occurs in about 5% of adults. It often runs in families and may co-occur with other parasomnias like sleepwalking and night terrors. Fever, stress, and sleep deprivation increase frequency.",
    causes: "Sleep talking often has no identifiable cause and is usually benign. Contributing factors include: genetics and family history, sleep deprivation, stress and anxiety, fever, alcohol consumption, certain medications, other sleep disorders (sleep apnea, REM behavior disorder), mental health conditions (PTSD, anxiety), sleeping in unfamiliar environments, and transitions between sleep stages. When associated with REM behavior disorder, it may reflect dream content.",
    symptoms: [
      {
        name: "Vocalizations during sleep",
        description: "Speaking, mumbling, or making sounds while asleep, ranging from unintelligible sounds to clear speech or even singing."
      },
      {
        name: "No awareness of talking",
        description: "The sleeper is unaware they are talking and has no memory of the episodes upon waking."
      },
      {
        name: "Content variability",
        description: "Speech may be nonsensical, related to dreams, or occasionally reflect waking concerns. It may sound emotional (angry, fearful, happy)."
      },
      {
        name: "Brief episodes",
        description: "Most episodes last only seconds, though some may continue for extended periods or recur multiple times per night."
      },
      {
        name: "Bed partner disturbance",
        description: "While harmless to the sleeper, sleep talking can significantly disrupt a bed partner's sleep."
      }
    ],
    selfTestQuestions: [
      "Has a bed partner or family member told you that you talk in your sleep?",
      "Do you have no memory of talking during the night?",
      "Does the talking seem to disturb your bed partner but not affect your own sleep quality?",
      "Do you have other sleep behaviors like sleepwalking or moving during dreams?",
      "Does sleep talking increase during times of stress or sleep deprivation?"
    ],
    diagnosisOverview: "Sleep talking is usually diagnosed based on reports from bed partners or family members. Medical evaluation is generally unnecessary unless it's associated with other concerning symptoms like violent movements (suggesting REM behavior disorder) or disrupted sleep.",
    diagnosticTests: [
      {
        name: "History from Bed Partner",
        description: "Description of the sleep talking, including frequency, content, associated movements, and any concerning behaviors."
      },
      {
        name: "Polysomnography",
        description: "Not typically needed for isolated sleep talking but may be performed if REM behavior disorder or another parasomnia is suspected."
      }
    ],
    treatmentOverview: "Sleep talking usually doesn't require treatment as it is benign and doesn't affect the sleeper's health. Management focuses on reducing triggers and addressing any underlying conditions.",
    treatments: [
      {
        name: "Address Triggers",
        description: "Reducing stress, improving sleep hygiene, treating sleep disorders, and avoiding alcohol can decrease frequency of sleep talking."
      },
      {
        name: "Treat Underlying Sleep Disorders",
        description: "If sleep talking is associated with sleep apnea, REM behavior disorder, or other conditions, treating those disorders often reduces sleep talking."
      },
      {
        name: "Reassurance",
        description: "Education that sleep talking is common and harmless can relieve anxiety about the behavior."
      },
      {
        name: "Bed Partner Accommodations",
        description: "White noise machines, earplugs for bed partners, or sleeping in separate rooms may be needed if sleep talking is very disruptive."
      }
    ],
    lifestyleChanges: [
      "Get adequate sleep on a regular schedule",
      "Reduce stress through relaxation techniques",
      "Avoid alcohol before bed",
      "Treat any underlying sleep disorders",
      "Consider white noise to mask sounds for bed partners",
      "Maintain a comfortable, quiet sleep environment",
      "Avoid heavy meals before bed"
    ],
    relatedDisorders: ["Sleepwalking", "REM Sleep Behavior Disorder", "Night Terrors", "Sleep Apnea"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "night-terrors",
    name: "Night Terrors",
    category: "Parasomnias",
    description: "Episodes of intense fear, screaming, and apparent terror during deep sleep, typically with no memory of the event upon awakening.",
    overview: "Night terrors (sleep terrors) are a parasomnia characterized by episodes of intense fear, screaming, and physical agitation during partial arousal from deep non-REM sleep. The person appears terrified and may sit up, scream, cry, thrash, or attempt to flee, but is actually in a state of incomplete awakening and is unresponsive to comfort. Episodes typically last 1-10 minutes and are followed by return to sleep with no memory of the event. Night terrors are most common in children ages 4-12 and usually resolve by adolescence. They are distinct from nightmares, which occur during REM sleep and are remembered.",
    prevalence: "Night terrors affect approximately 3-6% of children, with peak prevalence between ages 4-12. Most children outgrow them by adolescence. In adults, prevalence is less than 1%. There is a strong genetic component, with occurrence much more likely if parents had night terrors or sleepwalking. Night terrors and sleepwalking are closely related and often co-occur.",
    causes: "Night terrors occur when the brain becomes stuck between deep sleep and wakefulness. The same factors that trigger sleepwalking can trigger night terrors: genetics (strong family history), sleep deprivation, irregular sleep schedules, fever, stress and emotional conflict, certain medications, sleeping in unfamiliar places, and conditions that cause arousal from deep sleep (sleep apnea, restless legs, noise). The immature nervous system in children makes them more susceptible.",
    symptoms: [
      {
        name: "Screaming or crying out",
        description: "Episodes typically begin with a sudden, piercing scream or shout, often terrifying to parents or bed partners."
      },
      {
        name: "Appearance of intense fear",
        description: "The person appears extremely frightened with wide eyes, racing heart, rapid breathing, sweating, and flushed skin."
      },
      {
        name: "Unresponsive to comfort",
        description: "Unlike nightmares, the person cannot be consoled during a night terror. They don't recognize caregivers and may become more agitated if restrained."
      },
      {
        name: "Physical agitation",
        description: "Sitting up, thrashing, kicking, running, or bolting from bed may occur. Injury is possible during violent episodes."
      },
      {
        name: "No memory of the event",
        description: "Upon awakening (either after the episode or the next morning), there is no recollection of the event or only fragmentary, confused memories."
      },
      {
        name: "Timing in first third of night",
        description: "Most night terrors occur in the first few hours of sleep when deep (slow-wave) sleep predominates."
      },
      {
        name: "Return to sleep",
        description: "After the episode (typically 1-10 minutes), the person calms and returns to sleep, usually with no lingering effects."
      }
    ],
    selfTestQuestions: [
      "Does the person scream, appear terrified, or bolt upright during sleep?",
      "Are they unresponsive to attempts at comfort during episodes?",
      "Do they have no memory of the episode the next morning?",
      "Do episodes occur in the first few hours after falling asleep?",
      "Is there a family history of night terrors or sleepwalking?",
      "Does sleep deprivation, stress, or fever seem to trigger episodes?"
    ],
    diagnosisOverview: "Night terrors are diagnosed clinically based on the characteristic features: sudden arousal from deep sleep with intense fear, unresponsiveness, and amnesia. Polysomnography is rarely needed unless episodes are atypical or frequent.",
    diagnosticTests: [
      {
        name: "Clinical History",
        description: "Detailed description of episodes from observers, including timing, behaviors, responsiveness, and aftermath. History distinguishes night terrors from nightmares and seizures."
      },
      {
        name: "Sleep Diary",
        description: "Tracking sleep patterns and episodes helps identify triggers such as sleep deprivation or irregular schedules."
      },
      {
        name: "Polysomnography with Video",
        description: "May be performed if episodes are very frequent, atypical, or if nocturnal seizures need to be excluded."
      }
    ],
    treatmentOverview: "Most children outgrow night terrors without treatment. Management focuses on safety, addressing triggers, and reassuring parents. Medication is rarely needed but may be considered for severe or dangerous episodes.",
    treatments: [
      {
        name: "Parental Reassurance and Education",
        description: "Understanding that night terrors are common, not harmful to the child, and usually resolve with age helps reduce parental anxiety."
      },
      {
        name: "Safety Measures",
        description: "Ensuring a safe sleep environment to prevent injury during episodes: remove hazards, lock doors and windows, consider bedroom alarms."
      },
      {
        name: "Address Triggers",
        description: "Ensuring adequate sleep, consistent sleep schedules, and reduced stress can significantly decrease episode frequency."
      },
      {
        name: "Scheduled Awakenings",
        description: "For children with predictable episode timing, briefly waking them 15-30 minutes before usual episode time can prevent night terrors."
      },
      {
        name: "Treat Underlying Sleep Disorders",
        description: "If sleep apnea, restless legs, or other disorders are fragmenting sleep, treating them can reduce night terrors."
      },
      {
        name: "Benzodiazepines",
        description: "Clonazepam or diazepam at bedtime may be used short-term for severe, dangerous, or extremely frequent episodes."
      }
    ],
    lifestyleChanges: [
      "Ensure adequate sleep time for age",
      "Maintain very consistent sleep schedules",
      "Create a calming bedtime routine",
      "Reduce stressors in the child's life",
      "Keep the sleep environment safe",
      "Don't try to wake the child during an episode; gently guide them back to bed",
      "Don't discuss the episode extensively the next day, which may increase anxiety",
      "Consider a brief scheduled awakening if episodes occur at predictable times"
    ],
    relatedDisorders: ["Sleepwalking", "Confusional Arousals", "Nightmares", "Sleep-Related Seizures"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "nightmare-disorder",
    name: "Nightmare Disorder",
    category: "Parasomnias",
    description: "Recurrent, disturbing dreams that cause significant distress or impairment, often leading to fear of sleep and daytime dysfunction.",
    overview: "Nightmare Disorder involves repeated occurrences of extended, extremely distressing dreams that usually involve threats to survival, security, or physical integrity. The dreams are vividly recalled upon awakening, which occurs fully alert and oriented. Nightmares occur during REM sleep and are therefore most common in the latter part of the night. While occasional nightmares are normal (affecting nearly everyone at some point), nightmare disorder is diagnosed when nightmares are frequent, cause significant distress or impairment, and are not attributable to substances or other conditions.",
    prevalence: "Occasional nightmares are very common, affecting 50-85% of adults at some point. True nightmare disorder, with clinically significant distress or impairment, affects approximately 2-8% of adults. Nightmares are more common in children (peak around ages 6-10) but the disorder persists into adulthood in some individuals. Nightmare disorder is strongly associated with PTSD (affecting 50-70% of PTSD patients), anxiety, depression, and traumatic experiences.",
    causes: "Nightmares result from activation of fear and threat-response brain systems during REM sleep. Contributing factors include: trauma and PTSD (most significant factor for chronic nightmares), stress and anxiety, major life changes, psychiatric conditions (depression, anxiety disorders, personality disorders), certain medications (antidepressants, blood pressure medications, beta-blockers), alcohol and drug withdrawal, sleep deprivation, fever, and late-night eating. Genetic factors also play a role.",
    symptoms: [
      {
        name: "Disturbing dream content",
        description: "Dreams typically involve threats to safety or survival, such as being chased, attacked, or experiencing catastrophic events. Content is clearly remembered."
      },
      {
        name: "Full alertness upon awakening",
        description: "Unlike night terrors, the person awakens quickly and is fully oriented, able to describe the dream in detail."
      },
      {
        name: "Occurrence in latter part of sleep",
        description: "Nightmares typically occur in the last third of the night when REM sleep is most abundant."
      },
      {
        name: "Fear of going to sleep",
        description: "Anticipation of nightmares can lead to sleep avoidance, insomnia, and anxiety about bedtime."
      },
      {
        name: "Daytime distress and impairment",
        description: "Nightmares can cause residual fear, anxiety, depression, and difficulty concentrating during the day."
      },
      {
        name: "Sleep disruption",
        description: "Frequent awakenings from nightmares fragment sleep and reduce total sleep time, leading to daytime fatigue."
      },
      {
        name: "Physical symptoms upon awakening",
        description: "Racing heart, sweating, and rapid breathing are common immediately after waking from a nightmare."
      }
    ],
    selfTestQuestions: [
      "Do you have frequent, vivid, disturbing dreams that wake you up?",
      "Are you fully alert and able to recall the dream clearly after waking?",
      "Do the dreams typically involve threats to your safety or other distressing scenarios?",
      "Do nightmares occur more often in the second half of the night?",
      "Have you developed fear or anxiety about going to sleep?",
      "Are the nightmares affecting your daily life, mood, or functioning?"
    ],
    diagnosisOverview: "Diagnosis is clinical, based on the frequency and nature of nightmares and their impact on functioning. Assessment should include screening for PTSD and other psychiatric conditions, as nightmares often occur in this context.",
    diagnosticTests: [
      {
        name: "Clinical Interview",
        description: "Detailed history of nightmare content, frequency, triggers, and impact on sleep and daytime functioning."
      },
      {
        name: "Sleep Diary",
        description: "Recording nightmares, including content and associated emotions, helps characterize the problem."
      },
      {
        name: "PTSD Screening",
        description: "Given the strong association with trauma, screening for PTSD and trauma history is important."
      },
      {
        name: "Psychiatric Evaluation",
        description: "Assessment for depression, anxiety, and other conditions that commonly co-occur with nightmare disorder."
      },
      {
        name: "Polysomnography",
        description: "Not typically needed for nightmare disorder diagnosis but may be done to evaluate for other sleep disorders or REM behavior disorder."
      }
    ],
    treatmentOverview: "Treatment combines psychological interventions (particularly Imagery Rehearsal Therapy) with medications for severe or treatment-resistant cases. Addressing underlying conditions like PTSD is essential.",
    treatments: [
      {
        name: "Imagery Rehearsal Therapy (IRT)",
        description: "The first-line psychological treatment. Patients write down a recurrent nightmare, change the storyline to a less threatening or positive outcome, and rehearse the new dream imagery daily. Highly effective, with 60-70% improvement rates."
      },
      {
        name: "Prazosin",
        description: "An alpha-1 blocker originally for blood pressure, prazosin is effective for PTSD-related nightmares and is first-line medication treatment. Typically started at low dose and increased gradually."
      },
      {
        name: "PTSD Treatment",
        description: "For trauma-related nightmares, treating the underlying PTSD with evidence-based therapies (CPT, EMDR, prolonged exposure) often reduces nightmares."
      },
      {
        name: "Cognitive Behavioral Therapy",
        description: "CBT techniques addressing sleep anxiety, maladaptive beliefs about sleep, and relaxation strategies can reduce nightmare frequency."
      },
      {
        name: "Other Medications",
        description: "Various medications including certain antidepressants, atypical antipsychotics, and cyproheptadine have shown some benefit in treatment-resistant cases."
      }
    ],
    lifestyleChanges: [
      "Practice good sleep hygiene",
      "Avoid alcohol and recreational drugs, which can worsen nightmares",
      "Review medications with your doctor that might contribute to nightmares",
      "Reduce stress through relaxation techniques before bed",
      "Avoid disturbing content (news, violent movies) before bed",
      "Create a calming bedtime routine",
      "Practice daily imagery rehearsal of alternative dream outcomes",
      "Consider keeping a dream journal to track patterns and themes",
      "Seek treatment for any underlying mental health conditions"
    ],
    supportResources: [
      { name: "American Academy of Sleep Medicine", url: "https://sleepeducation.org/" },
      { name: "National Center for PTSD", url: "https://www.ptsd.va.gov/" }
    ],
    relatedDisorders: ["PTSD", "Night Terrors", "REM Sleep Behavior Disorder", "Insomnia", "Anxiety Disorders"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "rem-sleep-behavior-disorder",
    name: "REM Sleep Behavior Disorder",
    category: "Parasomnias",
    description: "A disorder where the normal muscle paralysis during REM sleep is absent, causing people to physically act out their dreams, potentially causing injury.",
    overview: "REM Sleep Behavior Disorder (RBD) is a parasomnia in which the normal muscle atonia (paralysis) that occurs during REM sleep is absent or incomplete. This allows individuals to physically act out their dreams, which are often vivid, action-filled, and may be violent or frightening. Dream enactment can include talking, yelling, punching, kicking, jumping, or running, potentially causing injury to the person or their bed partner. RBD is notable for its strong association with neurodegenerative diseases: most people diagnosed with RBD will eventually develop Parkinson's disease or related disorders.",
    prevalence: "RBD affects approximately 0.5-1% of the general population but is more common in older adults and males (about 90% of patients are male). Prevalence increases significantly with age. The disorder is strongly associated with neurodegenerative conditions: 70-90% of patients with idiopathic RBD will develop Parkinson's disease, dementia with Lewy bodies, or multiple system atrophy within 10-15 years.",
    causes: "In healthy REM sleep, the brainstem sends signals that temporarily paralyze voluntary muscles. In RBD, dysfunction in these brainstem circuits allows movement during REM sleep. Causes include: neurodegenerative diseases affecting the brainstem (Parkinson's, Lewy body dementia, multiple system atrophy), certain medications (especially antidepressants, which cause up to 6% of RBD cases), narcolepsy (RBD is common in narcolepsy), brainstem lesions (tumors, strokes), and idiopathic (unknown) causes that may represent prodromal neurodegeneration.",
    symptoms: [
      {
        name: "Dream enactment",
        description: "Physical movements corresponding to dream content, such as punching, kicking, grabbing, jumping out of bed, or running while asleep."
      },
      {
        name: "Vocalizations",
        description: "Talking, shouting, screaming, laughing, or cursing during dreams. Speech may reflect dream dialogue."
      },
      {
        name: "Vivid, action-filled dreams",
        description: "Dreams are often violent, involving fighting, being chased, or defending against attack. The person often reports dreams matching witnessed behaviors."
      },
      {
        name: "Occurrence in latter part of night",
        description: "Because RBD occurs during REM sleep, episodes are most common in the second half of the night when REM predominates."
      },
      {
        name: "Injury to self or bed partner",
        description: "Violent movements during dream enactment can cause bruises, cuts, fractures, or subdural hematomas to the sleeper or partner."
      },
      {
        name: "Quick awakening and recall",
        description: "When awakened during an episode, the person becomes quickly alert and can usually describe the dream that corresponds to their behaviors."
      }
    ],
    selfTestQuestions: [
      "Have you or your partner noticed that you move, kick, punch, or act out during dreams?",
      "Have you injured yourself or your bed partner during sleep?",
      "Are your dreams often vivid and action-filled, involving fighting or fleeing?",
      "Do episodes occur more in the second half of the night?",
      "When awakened, can you recall a dream that matches your behaviors?",
      "Are you male and over age 50, or do you have symptoms of Parkinson's disease?"
    ],
    diagnosisOverview: "Diagnosis requires polysomnography showing REM sleep without atonia (muscle paralysis) along with history of dream enactment. Given the association with neurodegenerative disease, neurological evaluation is recommended.",
    diagnosticTests: [
      {
        name: "Polysomnography with EMG",
        description: "The gold standard for diagnosis. Shows increased muscle activity (lack of atonia) during REM sleep, often with visible movements corresponding to dream reports."
      },
      {
        name: "Video Polysomnography",
        description: "Video recording during sleep study documents dream enactment behaviors and correlates them with REM sleep."
      },
      {
        name: "RBD Screening Questionnaire",
        description: "Validated questionnaires can identify individuals likely to have RBD who need formal sleep study."
      },
      {
        name: "Neurological Evaluation",
        description: "Given the strong link to Parkinson's and related diseases, neurological assessment for subtle motor signs, sense of smell testing, and sometimes dopamine transporter imaging may be recommended."
      }
    ],
    treatmentOverview: "Treatment aims to reduce injury risk through environmental modifications and medications that reduce REM-related muscle activity. Patients should be counseled about the possible relationship to future neurodegenerative disease.",
    treatments: [
      {
        name: "Safety Modifications",
        description: "Creating a safe sleep environment is the first priority: padding around bed, removing dangerous objects, placing mattress on floor, or sleeping in a sleeping bag to restrict movement."
      },
      {
        name: "Clonazepam",
        description: "A benzodiazepine taken at bedtime is highly effective (90% of patients), reducing both movements and injurious behaviors. Start at low dose (0.25-0.5 mg)."
      },
      {
        name: "Melatonin",
        description: "High-dose melatonin (3-12 mg) at bedtime can reduce RBD symptoms with fewer side effects than clonazepam. Often used as first-line or in combination."
      },
      {
        name: "Medication Review",
        description: "Discontinuing or switching antidepressants (especially SSRIs, SNRIs, mirtazapine) may reduce medication-induced RBD."
      },
      {
        name: "Treat Underlying Conditions",
        description: "If RBD is associated with narcolepsy, treating narcolepsy may help. If early Parkinson's disease is present, its treatment may affect RBD."
      }
    ],
    lifestyleChanges: [
      "Create a safe sleep environment (pad the floor, remove sharp objects)",
      "Consider barriers between sleepers to protect bed partner",
      "Sleep in a sleeping bag or weighted blanket to restrict movements",
      "Avoid alcohol, which can worsen symptoms",
      "Discuss medication history with your doctor (antidepressants can cause RBD)",
      "Maintain regular sleep schedules",
      "Report any symptoms suggestive of Parkinson's disease to your neurologist",
      "Consider participating in research studies on RBD and neurodegeneration"
    ],
    supportResources: [
      { name: "Michael J. Fox Foundation (Parkinson's)", url: "https://www.michaeljfox.org/" },
      { name: "American Academy of Sleep Medicine", url: "https://sleepeducation.org/" }
    ],
    relatedDisorders: ["Parkinson's Disease", "Lewy Body Dementia", "Narcolepsy", "Nightmare Disorder", "Sleepwalking"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "confusional-arousals",
    name: "Confusional Arousals",
    category: "Parasomnias",
    description: "Episodes of confusion and disorientation during partial awakening from deep sleep, typically without complex behaviors or leaving the bed.",
    overview: "Confusional arousals are a parasomnia characterized by mental confusion, disorientation, and inappropriate behavior during or following arousal from deep non-REM sleep. During episodes, individuals may appear awake but are mentally foggy, speak slowly or incoherently, respond inappropriately to questions, and have impaired memory and judgment. Unlike sleepwalking, individuals typically remain in bed. Episodes usually last 5-15 minutes but can persist longer. Confusional arousals are very common in children and often occur along with sleepwalking and night terrors as part of the 'disorders of arousal.'",
    prevalence: "Confusional arousals are very common in children, affecting approximately 17% of children ages 3-13. They typically decrease with age but persist in about 4% of adults. The disorder is more common in individuals with other NREM parasomnias (sleepwalking, night terrors) and those with sleep disorders that cause frequent arousals. There is a strong genetic component.",
    causes: "Confusional arousals occur when the brain becomes partially aroused from deep sleep but fails to fully awaken. The same factors that trigger sleepwalking and night terrors apply: genetics, sleep deprivation, irregular sleep schedules, stress, fever, certain medications (sedatives, hypnotics), alcohol, forced awakenings from deep sleep, and conditions causing sleep fragmentation (sleep apnea, restless legs, noise). Adults may be more susceptible if they had childhood parasomnias or have hypersomnia disorders.",
    symptoms: [
      {
        name: "Confusion and disorientation",
        description: "The primary symptom is mental confusion during or after arousal from sleep. The person may not know where they are, what time it is, or recognize people."
      },
      {
        name: "Slowed speech and thought",
        description: "Speech is slow, slurred, or nonsensical. Responses to questions are inappropriate or delayed."
      },
      {
        name: "Inappropriate behavior",
        description: "May include answering a phone that isn't ringing, looking for objects that aren't there, or performing strange actions."
      },
      {
        name: "Remaining in or near bed",
        description: "Unlike sleepwalking, individuals with confusional arousals typically stay in bed or only sit up, though some may leave the bed briefly."
      },
      {
        name: "Agitation if disturbed",
        description: "Attempts to fully awaken the person may meet resistance or cause aggression and irritability."
      },
      {
        name: "Amnesia for the event",
        description: "Little or no memory of the episode or the confused behaviors upon full awakening."
      },
      {
        name: "Timing in first third of night",
        description: "Most confusional arousals occur in the first hours of sleep when deep slow-wave sleep predominates."
      }
    ],
    selfTestQuestions: [
      "Do you or your child show confusion and inappropriate behavior when awakened from sleep?",
      "During these episodes, is there slowed, slurred, or nonsensical speech?",
      "Does the person typically stay in or near the bed rather than walking around?",
      "Is there resistance to being awakened or irritability during episodes?",
      "Is there little or no memory of the episode the next day?",
      "Do episodes occur in the first few hours after falling asleep?"
    ],
    diagnosisOverview: "Diagnosis is clinical based on the characteristic features of confusional behavior during arousal from deep sleep. Polysomnography is rarely needed unless other disorders are suspected or episodes are concerning for seizures.",
    diagnosticTests: [
      {
        name: "Clinical History",
        description: "Detailed description from observers of the confusion, behavior, timing, and duration of episodes."
      },
      {
        name: "Sleep Diary",
        description: "Tracking episodes and sleep patterns can identify triggers and patterns."
      },
      {
        name: "Polysomnography with Video",
        description: "May be performed if episodes are frequent, if seizures need to be ruled out, or if there are unusual features."
      }
    ],
    treatmentOverview: "Most children outgrow confusional arousals without treatment. Management focuses on avoiding triggers and ensuring safety. Medication is rarely needed.",
    treatments: [
      {
        name: "Address Triggers",
        description: "Ensuring adequate sleep, maintaining consistent sleep schedules, treating sleep disorders (sleep apnea), and avoiding forced awakenings can reduce episodes."
      },
      {
        name: "Reassurance and Education",
        description: "Parents should be reassured that confusional arousals are common and typically resolve with age."
      },
      {
        name: "Safety During Episodes",
        description: "Gently guiding the person back to sleep without forcing awakening. Don't restrain them, which may increase agitation."
      },
      {
        name: "Scheduled Awakenings",
        description: "For children with predictable timing, briefly waking them 15-30 minutes before usual episode time may prevent arousals."
      },
      {
        name: "Medication",
        description: "Rarely needed, but benzodiazepines (clonazepam) at bedtime may help in severe or frequent cases."
      }
    ],
    lifestyleChanges: [
      "Ensure adequate sleep for age",
      "Keep very consistent sleep and wake times",
      "Avoid forced awakenings from deep sleep when possible",
      "Treat any underlying sleep disorders",
      "Reduce stress and anxiety",
      "Avoid alcohol and sedating medications",
      "Create a calming bedtime routine",
      "Don't try to fully awaken someone during an episode"
    ],
    relatedDisorders: ["Sleepwalking", "Night Terrors", "Sleep Inertia"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "sleep-paralysis",
    name: "Sleep Paralysis",
    category: "Parasomnias",
    description: "A temporary inability to move or speak while falling asleep or upon waking, often accompanied by frightening hallucinations.",
    overview: "Sleep paralysis is a temporary inability to move or speak that occurs when transitioning between wakefulness and sleep—either when falling asleep (hypnagogic) or upon awakening (hypnopompic). During episodes, the person is conscious and aware but cannot move their body, which can be terrifying. Episodes often include vivid hallucinations, such as sensing an intruder in the room or pressure on the chest. Sleep paralysis occurs when the normal muscle atonia of REM sleep intrudes into wakefulness. While frightening, it is generally benign and brief (lasting seconds to a few minutes).",
    prevalence: "Sleep paralysis is remarkably common, with approximately 8% of the general population experiencing at least one episode in their lifetime. It is more common in students (28%) and psychiatric patients (32%). Recurrent sleep paralysis (multiple episodes) affects about 5% of individuals. It can occur as an isolated phenomenon or as part of narcolepsy. Risk is higher with irregular sleep schedules, sleep deprivation, and supine sleeping position.",
    causes: "Sleep paralysis occurs when the brain's mechanism for muscle paralysis during REM sleep becomes active during the transition to or from wakefulness. Contributing factors include: sleep deprivation (most common trigger), irregular sleep schedules, sleeping in the supine (face-up) position, stress and anxiety, shift work, jet lag, narcolepsy (where it is a core symptom), other sleep disorders, genetic factors, and certain medications. The hallucinations result from REM dream imagery intruding into waking consciousness.",
    symptoms: [
      {
        name: "Inability to move",
        description: "Complete or near-complete paralysis of the body while fully conscious. Breathing continues normally, but voluntary movement is impossible."
      },
      {
        name: "Inability to speak",
        description: "Despite trying to call out for help, no sound comes out. The person feels unable to communicate."
      },
      {
        name: "Awareness and consciousness",
        description: "Unlike during actual sleep, the person is awake and aware of their surroundings during the paralysis."
      },
      {
        name: "Hallucinations",
        description: "Vivid, often frightening hallucinations are common. These may include sensing an evil presence, seeing intruders or shadowy figures, or feeling pressure on the chest."
      },
      {
        name: "Fear and panic",
        description: "The combination of paralysis and hallucinations typically induces intense fear, even when the person intellectually understands what is happening."
      },
      {
        name: "Brief duration",
        description: "Episodes typically last from a few seconds to 1-2 minutes, though they can feel much longer. They end spontaneously or when touched by another person."
      },
      {
        name: "Occurrence at sleep transitions",
        description: "Episodes occur when falling asleep or, more commonly, when waking up, particularly during disrupted sleep."
      }
    ],
    selfTestQuestions: [
      "Have you experienced being awake but completely unable to move upon waking or when falling asleep?",
      "During these episodes, were you aware of your surroundings?",
      "Did you experience frightening hallucinations, such as sensing a presence in the room?",
      "Did the paralysis last only seconds to minutes before resolving on its own?",
      "Were you sleep-deprived or had irregular sleep around the time of episodes?",
      "Do you have other symptoms suggestive of narcolepsy (excessive daytime sleepiness, cataplexy)?"
    ],
    diagnosisOverview: "Isolated sleep paralysis is diagnosed based on clinical history. If episodes are frequent or associated with other symptoms like excessive daytime sleepiness, evaluation for narcolepsy may be warranted.",
    diagnosticTests: [
      {
        name: "Clinical History",
        description: "Characteristic description of paralysis at sleep transitions with maintained awareness is sufficient for diagnosis of isolated sleep paralysis."
      },
      {
        name: "Narcolepsy Screening",
        description: "If sleep paralysis is recurrent and accompanied by excessive daytime sleepiness, cataplexy, or hypnagogic hallucinations, evaluation for narcolepsy is recommended."
      },
      {
        name: "Polysomnography and MSLT",
        description: "Sleep studies may be performed if narcolepsy is suspected, looking for sleep-onset REM periods."
      }
    ],
    treatmentOverview: "Isolated sleep paralysis usually doesn't require treatment beyond reassurance and addressing triggers. For recurrent episodes, improving sleep habits is the primary intervention. Medication is occasionally needed for severe cases.",
    treatments: [
      {
        name: "Education and Reassurance",
        description: "Understanding that sleep paralysis is common, benign, and brief helps reduce anxiety about episodes and may reduce their occurrence."
      },
      {
        name: "Improve Sleep Habits",
        description: "Getting adequate, regular sleep is the most effective prevention. Avoid sleep deprivation and maintain consistent sleep schedules."
      },
      {
        name: "Avoid Supine Position",
        description: "Sleeping on your side rather than your back reduces episode frequency for some people."
      },
      {
        name: "Stress Management",
        description: "Reducing stress and anxiety through relaxation techniques may decrease episodes."
      },
      {
        name: "Antidepressants",
        description: "For severe, frequent episodes, SSRIs or tricyclic antidepressants that suppress REM sleep can reduce occurrence."
      },
      {
        name: "Treat Underlying Conditions",
        description: "If narcolepsy is present, treating it may reduce sleep paralysis. Treat other sleep disorders that disrupt sleep."
      }
    ],
    lifestyleChanges: [
      "Get adequate sleep (7-9 hours for adults)",
      "Keep a consistent sleep schedule, even on weekends",
      "Avoid sleeping on your back",
      "Reduce stress through relaxation practices",
      "Avoid alcohol and heavy meals before bed",
      "Limit caffeine and avoid it after early afternoon",
      "Create a relaxing bedtime routine",
      "During an episode: remember it will end soon, try to wiggle a finger or toe, and focus on calm breathing"
    ],
    relatedDisorders: ["Narcolepsy", "Sleep Hallucinations", "Nightmare Disorder", "Insomnia"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "sleep-related-eating-disorder",
    name: "Sleep-Related Eating Disorder",
    category: "Parasomnias",
    description: "A disorder involving recurrent episodes of eating and drinking during partial arousal from sleep, with little or no memory of the behavior.",
    overview: "Sleep-Related Eating Disorder (SRED) is a parasomnia characterized by recurrent episodes of eating and drinking during the main sleep period, with impaired consciousness during eating and partial or complete amnesia for the episodes. Individuals typically eat unusual foods or combinations (including inedible substances in some cases), often consuming high-calorie foods. SRED differs from Night Eating Syndrome (NES), where eating occurs with full awareness. SRED can lead to weight gain, injury from cooking activities, and consumption of toxic substances.",
    prevalence: "SRED affects approximately 1-5% of the general population but is more common in individuals with other eating disorders (10-15%) and other parasomnias. It is more common in women (60-80% of cases). Onset is typically in young adulthood, with an average age of 22-27 years. It is often associated with sleepwalking, restless legs syndrome, and use of sedative-hypnotic medications.",
    causes: "SRED occurs during partial arousal from deep NREM sleep, similar to sleepwalking. Contributing factors include: sedative-hypnotic medications (particularly zolpidem, which is a known trigger), other sleep disorders (sleepwalking, restless legs, sleep apnea), daytime dieting or caloric restriction, stress and psychological factors, prior history of sleepwalking, eating disorders, and genetic predisposition. The disorder appears to involve dysfunction in both sleep arousal and appetite regulation systems.",
    symptoms: [
      {
        name: "Eating during sleep",
        description: "Recurrent episodes of eating (and sometimes preparing food) during partial arousal from sleep, typically in the first half of the night."
      },
      {
        name: "Unusual food choices",
        description: "Consuming odd foods, unusual combinations (peanut butter on frozen pizza), raw ingredients (frozen meat, butter), or even non-food items."
      },
      {
        name: "Impaired awareness",
        description: "Eating occurs in a state of reduced consciousness, with the person appearing 'on autopilot' and difficult to fully awaken."
      },
      {
        name: "Amnesia for episodes",
        description: "Partial or complete inability to remember the eating episodes the next morning. Evidence (dirty dishes, missing food) reveals the behavior."
      },
      {
        name: "Weight gain",
        description: "Consumption of high-calorie foods during episodes often leads to unwanted weight gain."
      },
      {
        name: "Risk of injury",
        description: "Preparing food while impaired can lead to cuts, burns, or consumption of toxic substances (cleaning products, frozen foods)."
      },
      {
        name: "Morning nausea or fullness",
        description: "Waking up feeling nauseated, overly full, or with no appetite for breakfast may indicate nighttime eating."
      }
    ],
    selfTestQuestions: [
      "Do you find evidence of eating (missing food, dirty dishes) that you don't remember?",
      "Have you gained weight unexpectedly without daytime overeating?",
      "Do you eat unusual foods or combinations during these episodes?",
      "Do you have difficulty fully waking during eating episodes?",
      "Have you started taking a new sedative medication (like zolpidem) before episodes began?",
      "Do you have a history of sleepwalking or other parasomnias?"
    ],
    diagnosisOverview: "Diagnosis is based on history of recurrent eating during sleep with impaired awareness and amnesia. Polysomnography can capture episodes and rule out other conditions. Medication history is important as sedatives frequently trigger SRED.",
    diagnosticTests: [
      {
        name: "Clinical History",
        description: "Detailed history of eating behaviors, timing, awareness, memory, food choices, and any injuries. Bed partner reports are valuable."
      },
      {
        name: "Video Polysomnography",
        description: "Extended sleep study with video may capture eating episodes, document the sleep stage of occurrence, and rule out seizures."
      },
      {
        name: "Medication Review",
        description: "Careful review of all medications, particularly sedative-hypnotics (zolpidem), is essential as these are frequent triggers."
      },
      {
        name: "Evaluation for Related Conditions",
        description: "Assessment for sleepwalking, restless legs syndrome, sleep apnea, and eating disorders."
      }
    ],
    treatmentOverview: "Treatment involves discontinuing triggering medications, treating underlying sleep disorders, safety measures, and sometimes medication. Response to treatment is generally good.",
    treatments: [
      {
        name: "Discontinue Triggering Medications",
        description: "If zolpidem or other sedative-hypnotics trigger SRED, discontinuing or switching medications often resolves the disorder."
      },
      {
        name: "Treat Underlying Sleep Disorders",
        description: "Treating sleepwalking, restless legs syndrome, or sleep apnea when present can reduce SRED episodes."
      },
      {
        name: "Topiramate",
        description: "This anticonvulsant has shown effectiveness in reducing SRED episodes, possibly through effects on both sleep and appetite regulation."
      },
      {
        name: "Dopaminergic Agents",
        description: "Pramipexole and other dopamine agonists may help, particularly when restless legs syndrome is present."
      },
      {
        name: "Safety Measures",
        description: "Locking the kitchen, removing dangerous foods and utensils, installing alarms on kitchen doors."
      },
      {
        name: "SSRIs",
        description: "Sertraline and other SSRIs have helped some patients, particularly when there is concurrent depression or anxiety."
      }
    ],
    lifestyleChanges: [
      "Avoid sedative-hypnotic medications when possible",
      "Lock the kitchen or install door alarms",
      "Remove easy-to-grab high-calorie foods from the kitchen",
      "Maintain a regular sleep schedule",
      "Ensure adequate sleep to reduce arousal triggers",
      "Avoid alcohol before bed",
      "Don't go to bed hungry (have a light snack if needed)",
      "Treat any underlying eating disorder or dieting behaviors"
    ],
    relatedDisorders: ["Sleepwalking", "Night Eating Syndrome", "Restless Legs Syndrome", "Sleep Apnea"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "bruxism",
    name: "Bruxism",
    category: "Parasomnias",
    description: "Involuntary grinding, gnashing, or clenching of teeth during sleep, which can cause dental damage, jaw pain, and headaches.",
    overview: "Sleep bruxism is a sleep-related movement disorder characterized by grinding, gnashing, or clenching of teeth during sleep. It is classified as repetitive jaw-muscle activity characterized by clenching or grinding of the teeth and/or by bracing or thrusting of the mandible. Bruxism can cause significant dental damage (worn enamel, cracked teeth), jaw pain, temporomandibular joint (TMJ) disorders, headaches, and sleep disruption for bed partners due to grinding sounds. It often co-occurs with other sleep disorders and stress.",
    prevalence: "Sleep bruxism affects approximately 8-13% of adults and is more common in children and adolescents (14-17%). Prevalence decreases with age. It affects men and women equally. Approximately one-third of adults experience bruxism at some point. The disorder often runs in families and is strongly associated with stress, anxiety, and other sleep disorders like sleep apnea.",
    causes: "The exact cause of sleep bruxism is not fully understood. It appears to be related to central nervous system arousal mechanisms and may be associated with: stress and anxiety, sleep disorders (especially obstructive sleep apnea), certain medications (SSRIs, SNRIs, amphetamines), caffeine and alcohol use, smoking, genetic factors, malocclusion (though less evidence than previously thought), gastroesophageal reflux, and neurological conditions. Bruxism events often occur in association with microarousals during sleep.",
    symptoms: [
      {
        name: "Grinding or clenching sounds",
        description: "Bed partners often report hearing grinding, gnashing, or clicking sounds during sleep. The sounds can be surprisingly loud."
      },
      {
        name: "Tooth damage",
        description: "Worn tooth enamel, flattened or fractured teeth, and increased tooth sensitivity are common dental signs."
      },
      {
        name: "Jaw pain and fatigue",
        description: "Morning jaw pain, stiffness, fatigue, or soreness in the jaw muscles, especially upon waking."
      },
      {
        name: "Headaches",
        description: "Dull headaches, particularly in the temples, upon waking are common with bruxism."
      },
      {
        name: "TMJ symptoms",
        description: "Temporomandibular joint pain, clicking, or difficulty opening the mouth fully may develop."
      },
      {
        name: "Ear pain",
        description: "Pain near the ear (referred from the jaw muscles) that may be mistaken for ear infection."
      },
      {
        name: "Sleep disruption",
        description: "While the bruxer may not wake, the activity can fragment sleep. Bed partners are often more disturbed."
      }
    ],
    selfTestQuestions: [
      "Has a bed partner told you that you grind your teeth during sleep?",
      "Do you wake up with jaw pain, stiffness, or fatigue?",
      "Have you noticed worn, flattened, or chipped teeth?",
      "Do you have frequent morning headaches, especially in your temples?",
      "Do you have pain or clicking in your temporomandibular joint (TMJ)?",
      "Do you clench your jaw during the day when stressed?"
    ],
    diagnosisOverview: "Diagnosis is often made based on patient history and dental examination showing characteristic tooth wear. Polysomnography can confirm the diagnosis and assess severity, and is particularly useful if sleep apnea is suspected.",
    diagnosticTests: [
      {
        name: "Clinical and Dental Examination",
        description: "Assessment of tooth wear patterns, jaw muscle tenderness, TMJ function, and facial pain provides evidence of bruxism."
      },
      {
        name: "Polysomnography",
        description: "Sleep study with EMG of jaw muscles can document bruxism episodes, quantify severity, and identify associated sleep disorders like apnea."
      },
      {
        name: "Bed Partner History",
        description: "Reports of grinding sounds during sleep, when available, are helpful for diagnosis."
      },
      {
        name: "Sleep Apnea Evaluation",
        description: "Given the association with sleep apnea, evaluation for this condition is often warranted."
      }
    ],
    treatmentOverview: "Treatment aims to prevent dental damage, relieve pain, and reduce bruxism frequency. A dental guard protects teeth, while addressing underlying causes and associated sleep disorders is essential.",
    treatments: [
      {
        name: "Dental Guard (Occlusal Splint)",
        description: "Custom-fitted mouthguards worn during sleep protect teeth from damage and may reduce grinding. This is the first-line treatment for dental protection."
      },
      {
        name: "Treat Sleep Apnea",
        description: "When bruxism is associated with obstructive sleep apnea, treating the apnea (with CPAP or oral appliance) often reduces bruxism."
      },
      {
        name: "Stress Management",
        description: "Cognitive behavioral therapy, relaxation techniques, and stress reduction can help when stress/anxiety contributes to bruxism."
      },
      {
        name: "Medication Review",
        description: "If medications (particularly SSRIs) may be contributing, discussing alternatives with your doctor may help."
      },
      {
        name: "Botulinum Toxin (Botox)",
        description: "Injections into the jaw muscles (masseter, temporalis) can reduce muscle activity and grinding force. Effects last 3-4 months."
      },
      {
        name: "Medications",
        description: "Various medications (muscle relaxants, clonazepam, clonidine) have been tried with variable success, but none are specifically approved for bruxism."
      }
    ],
    lifestyleChanges: [
      "Reduce stress through relaxation techniques",
      "Avoid caffeine and alcohol, especially before bed",
      "Don't chew on objects (pens, pencils) during the day",
      "Avoid chewing gum, which can reinforce clenching patterns",
      "Practice keeping jaw relaxed during the day (lips together, teeth apart)",
      "Apply warm compresses to the jaw if sore",
      "Maintain good sleep habits",
      "Get regular dental checkups to monitor tooth wear"
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "TMJ Disorders", "Insomnia", "Stress-Related Conditions"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "sleep-hallucinations",
    name: "Sleep Hallucinations",
    category: "Parasomnias",
    description: "Vivid, dreamlike experiences that occur at the boundary between wakefulness and sleep, either when falling asleep or waking up.",
    overview: "Sleep-related hallucinations are vivid, often frightening sensory experiences that occur at the transition between wakefulness and sleep. Hypnagogic hallucinations occur when falling asleep, while hypnopompic hallucinations occur upon awakening. These hallucinations can involve any sense but are most often visual, and may include seeing people, animals, or figures in the room, hearing voices or sounds, or feeling sensations of touch or movement. They are caused by intrusion of dream imagery into waking consciousness and are often associated with sleep paralysis.",
    prevalence: "Sleep hallucinations are common, affecting approximately 25-37% of the general population at some point. They are particularly common in adolescents and young adults. Frequency decreases with age. Sleep hallucinations are extremely common in narcolepsy (80% of patients). They are more common in people with sleep deprivation, irregular sleep schedules, and certain psychiatric conditions.",
    causes: "Sleep hallucinations occur when REM sleep dream imagery intrudes into the transition between sleep and wakefulness. Contributing factors include: sleep deprivation (most common trigger), narcolepsy (hallucinations are a core symptom), irregular sleep schedules, sleep disorders that fragment sleep, certain medications and substances, alcohol and drug use or withdrawal, stress and anxiety, fever, and psychiatric conditions (particularly psychotic disorders, though the hallucinations differ in character).",
    symptoms: [
      {
        name: "Visual hallucinations",
        description: "Seeing people, shadows, figures, animals, or objects that are not there. These are often realistic and may involve the actual bedroom environment."
      },
      {
        name: "Auditory hallucinations",
        description: "Hearing voices, sounds, music, or noises such as doorbell or phone ringing that are not real."
      },
      {
        name: "Sense of presence",
        description: "A strong feeling that someone or something is in the room, often perceived as threatening."
      },
      {
        name: "Tactile hallucinations",
        description: "Sensations of being touched, pulled, or feeling something crawling on the skin."
      },
      {
        name: "Brief duration",
        description: "Hallucinations typically last seconds to a few minutes and fade as full wakefulness (or sleep) is achieved."
      },
      {
        name: "Association with sleep paralysis",
        description: "Hallucinations often occur with sleep paralysis, making the experience particularly frightening."
      },
      {
        name: "Fear and distress",
        description: "The experience is often frightening, though some people experience neutral or even pleasant hallucinations."
      }
    ],
    selfTestQuestions: [
      "Do you see, hear, or feel things that aren't there when falling asleep or waking up?",
      "Are these experiences vivid and realistic?",
      "Do they occur only at the transitions to or from sleep?",
      "Do they sometimes occur with an inability to move (sleep paralysis)?",
      "Have you been sleep-deprived or had irregular sleep schedules?",
      "Do you have excessive daytime sleepiness or other symptoms of narcolepsy?"
    ],
    diagnosisOverview: "Diagnosis is based on the characteristic description of hallucinations at sleep transitions. Evaluation for narcolepsy should be considered if hallucinations are frequent or accompanied by other narcolepsy symptoms.",
    diagnosticTests: [
      {
        name: "Clinical History",
        description: "Detailed description of the hallucinations, their timing relative to sleep, and associated symptoms (sleep paralysis, daytime sleepiness) guides diagnosis."
      },
      {
        name: "Sleep Diary",
        description: "Tracking sleep patterns and hallucination episodes can identify triggers and patterns."
      },
      {
        name: "Narcolepsy Evaluation",
        description: "If hallucinations are frequent and accompanied by excessive daytime sleepiness or cataplexy, polysomnography and MSLT may be indicated."
      },
      {
        name: "Psychiatric Evaluation",
        description: "If hallucinations occur at times other than sleep transitions or have unusual features, evaluation for psychiatric conditions may be warranted."
      }
    ],
    treatmentOverview: "Isolated sleep hallucinations often improve with better sleep habits. For frequent or distressing hallucinations, treating underlying conditions and sometimes medication may help.",
    treatments: [
      {
        name: "Improve Sleep Habits",
        description: "Getting adequate, regular sleep is the most effective intervention. Address sleep deprivation and maintain consistent schedules."
      },
      {
        name: "Education and Reassurance",
        description: "Understanding that sleep hallucinations are common and benign can significantly reduce distress."
      },
      {
        name: "Treat Underlying Conditions",
        description: "If narcolepsy is present, treating it often reduces hallucinations. Address other sleep disorders or psychiatric conditions."
      },
      {
        name: "Medication Review",
        description: "Discontinue or adjust medications that may be contributing to hallucinations."
      },
      {
        name: "Antidepressants",
        description: "For severe or frequent hallucinations, SSRIs or tricyclic antidepressants that suppress REM sleep may be helpful."
      }
    ],
    lifestyleChanges: [
      "Get adequate sleep every night",
      "Maintain a consistent sleep schedule",
      "Reduce stress through relaxation techniques",
      "Avoid alcohol and recreational drugs",
      "Limit caffeine",
      "Create a comfortable sleep environment",
      "During a hallucination: remember it will pass, try to move, and remind yourself it's not real",
      "Keep a light within reach if needed for reassurance upon waking"
    ],
    relatedDisorders: ["Sleep Paralysis", "Narcolepsy", "Nightmare Disorder", "REM Sleep Behavior Disorder"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "catathrenia",
    name: "Catathrenia",
    category: "Parasomnias",
    description: "A sleep disorder characterized by groaning or moaning sounds during sleep, particularly during exhalation.",
    overview: "Catathrenia, also known as nocturnal groaning or sleep-related groaning, is an uncommon parasomnia characterized by expiratory groaning or moaning sounds during sleep. The groaning typically occurs in clusters, mainly during REM sleep, and can last from several seconds to a minute per episode. The sounds are produced during prolonged, deep exhalation. While harmless to the affected person, catathrenia can be very disturbing to bed partners and roommates. The exact cause is unknown, but it is classified as a sleep-related breathing disorder rather than a classic parasomnia.",
    prevalence: "Catathrenia is relatively rare, though the exact prevalence is unknown. It appears to be more common in males and typically begins in adolescence or young adulthood. Many cases go unreported or are mistaken for snoring. Awareness of the condition has increased in recent years, leading to more diagnoses.",
    causes: "The exact cause of catathrenia is unknown. It appears to involve partial closure of the upper airway during exhalation in sleep, creating the characteristic groaning sound. Unlike snoring (which occurs during inhalation), catathrenia occurs during long exhalations. Possible contributing factors include upper airway anatomy, changes in breathing patterns during REM sleep, and neural control of breathing. It is not associated with sleep apnea or other significant respiratory problems.",
    symptoms: [
      {
        name: "Groaning sounds during sleep",
        description: "Monotonous groaning, moaning, or humming sounds produced during exhalation. The sounds can be quite loud and sustained."
      },
      {
        name: "Occurrence during exhalation",
        description: "Unlike snoring which occurs during inhalation, catathrenia sounds occur during prolonged exhalation lasting up to 30-50 seconds."
      },
      {
        name: "Cluster pattern",
        description: "Episodes tend to occur in clusters throughout the night, particularly during REM sleep in the second half of the night."
      },
      {
        name: "No awareness by the sleeper",
        description: "The person making the sounds is unaware and has no memory of groaning. Sleep quality is typically unaffected."
      },
      {
        name: "Bed partner disturbance",
        description: "The primary complaint usually comes from bed partners or roommates who are awakened by the sounds."
      },
      {
        name: "Normal breathing pattern otherwise",
        description: "No apneas, oxygen desaturation, or other breathing abnormalities are present."
      }
    ],
    selfTestQuestions: [
      "Has a bed partner or roommate told you that you groan or moan during sleep?",
      "Are the sounds described as occurring during breathing out, often sustained?",
      "Do you have no memory of making these sounds?",
      "Is your own sleep quality unaffected?",
      "Do episodes occur throughout the night, perhaps worse in the second half?",
      "Have you been told the sounds are different from snoring?"
    ],
    diagnosisOverview: "Diagnosis is based on bed partner reports of characteristic groaning sounds during exhalation. Polysomnography can confirm the diagnosis by capturing episodes and documenting that they occur during REM sleep with prolonged exhalation.",
    diagnosticTests: [
      {
        name: "Bed Partner History",
        description: "Description of the groaning sounds, including timing (during breathing out), pattern, and loudness."
      },
      {
        name: "Audio/Video Recording",
        description: "Recording sounds at night can capture the characteristic groaning pattern and distinguish it from snoring."
      },
      {
        name: "Polysomnography",
        description: "Sleep study documents prolonged exhalation with groaning sounds, typically during REM sleep, without apneas or desaturation."
      }
    ],
    treatmentOverview: "Catathrenia is challenging to treat, and there is no consistently effective therapy. It does not harm the sleeper, so treatment focuses on reducing disturbance to bed partners.",
    treatments: [
      {
        name: "CPAP Therapy",
        description: "Some case reports suggest CPAP may reduce catathrenia, possibly by keeping the airway more stable during exhalation."
      },
      {
        name: "Oral Appliances",
        description: "Mandibular advancement devices, similar to those used for snoring, may help some patients."
      },
      {
        name: "Bed Partner Accommodations",
        description: "Earplugs, white noise machines, or separate sleeping arrangements may be necessary for severely affected bed partners."
      },
      {
        name: "Positional Therapy",
        description: "Some patients have less catathrenia in certain sleep positions; experimentation may help."
      },
      {
        name: "Sleep Surgery",
        description: "Upper airway surgery has been tried in a few cases with variable results."
      }
    ],
    lifestyleChanges: [
      "Try different sleep positions to see if one reduces groaning",
      "Maintain regular sleep schedules",
      "Consider white noise for bed partner",
      "Avoid alcohol before bed",
      "Keep the bedroom at a comfortable temperature",
      "Communicate openly with bed partner about the condition"
    ],
    relatedDisorders: ["Snoring", "Sleep Apnea", "Sleep Talking"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
