import { SleepDisorderContent } from '../sleep-disorders-content'

export const insomniaDisorders: SleepDisorderContent[] = [
  {
    slug: "insomnia",
    name: "Insomnia",
    category: "Insomnia",
    description: "A common sleep disorder characterized by difficulty falling asleep, staying asleep, or waking too early and being unable to return to sleep.",
    overview: "Insomnia is the most common sleep disorder, characterized by persistent difficulty initiating or maintaining sleep, or experiencing non-restorative sleep, despite adequate opportunity and circumstances for sleep. This difficulty causes significant daytime impairment, including fatigue, mood disturbances, and reduced cognitive function. Insomnia can be acute (short-term, lasting days to weeks) or chronic (lasting three months or longer, with symptoms occurring at least three nights per week). It can occur independently or alongside other medical or psychiatric conditions.",
    prevalence: "Insomnia symptoms affect approximately 30-35% of adults at some point in their lives. Chronic insomnia disorder affects about 10-15% of the adult population. It is more common in women than men, and prevalence increases with age. Insomnia is also more prevalent in individuals with medical or psychiatric conditions, shift workers, and those under significant stress.",
    causes: "Insomnia has multiple potential causes including: psychological factors (stress, anxiety, depression, worry about sleep), medical conditions (chronic pain, heart disease, asthma, GERD, neurological conditions), medications (stimulants, some antidepressants, steroids, decongestants), substances (caffeine, alcohol, nicotine), poor sleep habits (irregular schedule, stimulating activities before bed, uncomfortable sleep environment), life changes (job changes, travel, bereavement), and other sleep disorders. In chronic insomnia, conditioned arousal and unhelpful beliefs about sleep often perpetuate the problem even after the initial trigger resolves.",
    types: [
      {
        name: "Acute Insomnia",
        description: "Short-term insomnia lasting from a few days to a few weeks, usually triggered by stress, illness, or environmental factors. Often resolves without treatment."
      },
      {
        name: "Chronic Insomnia",
        description: "Insomnia occurring at least 3 nights per week for 3 months or longer. Usually requires treatment and may involve conditioned arousal patterns."
      },
      {
        name: "Sleep Onset Insomnia",
        description: "Difficulty falling asleep at the beginning of the night, often associated with anxiety or delayed circadian rhythm."
      },
      {
        name: "Sleep Maintenance Insomnia",
        description: "Difficulty staying asleep, with frequent or prolonged awakenings during the night."
      },
      {
        name: "Early Morning Awakening",
        description: "Waking up earlier than desired and being unable to return to sleep, often associated with depression or advanced circadian phase."
      }
    ],
    symptoms: [
      {
        name: "Difficulty falling asleep",
        description: "Taking more than 30 minutes to fall asleep after going to bed, often lying awake with racing thoughts or anxiety about sleep."
      },
      {
        name: "Waking frequently during the night",
        description: "Multiple awakenings throughout the night with difficulty returning to sleep after each awakening."
      },
      {
        name: "Waking too early",
        description: "Waking hours before the desired wake time and being unable to fall back asleep."
      },
      {
        name: "Non-restorative sleep",
        description: "Even when sleep duration seems adequate, waking up feeling unrefreshed and unrested."
      },
      {
        name: "Daytime fatigue or sleepiness",
        description: "Feeling tired, low on energy, or sleepy during the day due to poor nighttime sleep."
      },
      {
        name: "Mood disturbances",
        description: "Irritability, anxiety, or depression often accompany and are worsened by insomnia."
      },
      {
        name: "Cognitive impairment",
        description: "Difficulty with concentration, attention, memory, and decision-making due to sleep deprivation."
      },
      {
        name: "Worry about sleep",
        description: "Preoccupation with sleep and anxiety about the consequences of poor sleep, which can perpetuate the insomnia."
      }
    ],
    selfTestQuestions: [
      "Do you have difficulty falling asleep most nights, taking more than 30 minutes to fall asleep?",
      "Do you wake up frequently during the night and have trouble falling back asleep?",
      "Do you wake up too early in the morning and can't get back to sleep?",
      "Do you feel unrefreshed when you wake up, even after a full night in bed?",
      "Does your sleep difficulty cause problems during the day such as fatigue, irritability, or difficulty concentrating?",
      "Has your sleep problem lasted for more than a month?"
    ],
    diagnosisOverview: "Insomnia is primarily diagnosed through clinical evaluation, including detailed sleep history, sleep diary review, and assessment for comorbid conditions. Sleep studies are not routinely needed unless another sleep disorder is suspected.",
    diagnosticTests: [
      {
        name: "Clinical Interview",
        description: "A thorough evaluation of sleep patterns, daytime symptoms, medical history, medications, and lifestyle factors. This is the primary diagnostic tool for insomnia."
      },
      {
        name: "Sleep Diary",
        description: "A 1-2 week log of bedtime, wake time, time to fall asleep, nighttime awakenings, and daytime symptoms provides objective data about sleep patterns."
      },
      {
        name: "Insomnia Severity Index (ISI)",
        description: "A validated questionnaire that measures the severity of insomnia symptoms and their impact on daily functioning."
      },
      {
        name: "Actigraphy",
        description: "A wrist-worn device that tracks movement patterns over days to weeks, providing objective data about sleep-wake patterns."
      },
      {
        name: "Polysomnography",
        description: "Not routinely used for insomnia diagnosis but may be ordered if another sleep disorder (such as sleep apnea or periodic limb movements) is suspected."
      }
    ],
    treatmentOverview: "The first-line treatment for chronic insomnia is Cognitive Behavioral Therapy for Insomnia (CBT-I), which is more effective than medications for long-term management. Medications may be used for short-term relief or in combination with CBT-I.",
    treatments: [
      {
        name: "Cognitive Behavioral Therapy for Insomnia (CBT-I)",
        description: "The gold-standard treatment combining sleep restriction, stimulus control, cognitive therapy, sleep hygiene education, and relaxation techniques. Typically delivered in 4-8 sessions and produces lasting improvements."
      },
      {
        name: "Sleep Restriction Therapy",
        description: "Limiting time in bed to match actual sleep time, then gradually increasing as sleep efficiency improves. Creates mild sleep deprivation that increases sleep drive."
      },
      {
        name: "Stimulus Control Therapy",
        description: "Reconditioning the bed and bedroom as cues for sleep by only using the bed for sleep and intimacy, and leaving the bedroom if unable to sleep."
      },
      {
        name: "Prescription Sleep Medications",
        description: "Medications including benzodiazepine receptor agonists (zolpidem, eszopiclone), melatonin receptor agonists (ramelteon), and orexin receptor antagonists (suvorexant, lemborexant) may be used short-term."
      },
      {
        name: "Over-the-Counter Sleep Aids",
        description: "Antihistamines like diphenhydramine and doxylamine are available without prescription but have limited evidence for insomnia and can cause next-day drowsiness."
      },
      {
        name: "Melatonin and Supplements",
        description: "Melatonin may help with sleep onset, particularly for circadian rhythm issues. Other supplements (valerian, magnesium) have limited evidence but are generally safe."
      }
    ],
    lifestyleChanges: [
      "Maintain a consistent sleep schedule, even on weekends",
      "Create a relaxing bedtime routine to wind down before sleep",
      "Make your bedroom dark, quiet, cool, and comfortable",
      "Limit caffeine, especially after noon",
      "Avoid alcohol close to bedtime (it fragments sleep)",
      "Exercise regularly, but not too close to bedtime",
      "Avoid screens and blue light 1-2 hours before bed",
      "Don't watch the clock - turn it away from view",
      "Get out of bed if you can't sleep after 20 minutes",
      "Limit naps to 20-30 minutes, early in the afternoon"
    ],
    supportResources: [
      { name: "American Academy of Sleep Medicine", url: "https://sleepeducation.org/" },
      { name: "National Sleep Foundation", url: "https://www.thensf.org/" },
      { name: "CBT-I Coach App (VA)", url: "https://mobile.va.gov/app/cbt-i-coach" }
    ],
    relatedDisorders: ["Poor Sleep Hygiene", "Circadian Rhythm Disorders", "Anxiety Disorders", "Depression"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "poor-sleep-hygiene",
    name: "Poor Sleep Hygiene",
    category: "Insomnia",
    description: "Sleep difficulties arising from daily living practices and habits that are inconsistent with good quality sleep.",
    overview: "Poor sleep hygiene refers to habits and practices that are inconsistent with obtaining quality sleep and full daytime alertness. While not a formal sleep disorder diagnosis in current classifications, inadequate sleep hygiene is a significant contributing factor to insomnia and other sleep problems. It encompasses behaviors and environmental factors that interfere with sleep, including irregular sleep schedules, stimulating activities before bed, uncomfortable sleep environments, and substance use that disrupts sleep.",
    prevalence: "Poor sleep hygiene is extremely common in modern society. Studies suggest that up to 40% of adults engage in behaviors that negatively impact their sleep quality. The rise of electronic devices, 24/7 connectivity, and busy lifestyles has made poor sleep hygiene increasingly prevalent, particularly among younger adults and adolescents.",
    causes: "Poor sleep hygiene develops from lifestyle choices and environmental factors including: irregular sleep and wake times, excessive use of electronic devices before bed, caffeine or alcohol consumption near bedtime, exercising too late in the evening, using the bedroom for work or stimulating activities, uncomfortable mattress or pillows, excessive noise or light in the bedroom, daytime napping that interferes with nighttime sleep, and dependence on sleeping pills.",
    symptoms: [
      {
        name: "Difficulty falling asleep",
        description: "Engaging in stimulating activities or consuming caffeine close to bedtime can make it hard to fall asleep."
      },
      {
        name: "Fragmented sleep",
        description: "Environmental disturbances, alcohol use, or uncomfortable sleep conditions lead to frequent awakenings."
      },
      {
        name: "Non-restorative sleep",
        description: "Despite time in bed, sleep doesn't feel refreshing due to poor quality caused by unhealthy sleep practices."
      },
      {
        name: "Daytime sleepiness",
        description: "Inadequate or poor-quality sleep leads to excessive tiredness during the day."
      },
      {
        name: "Variable sleep patterns",
        description: "Inconsistent bedtimes and wake times lead to irregular sleep and circadian rhythm disruption."
      },
      {
        name: "Dependence on sleep aids",
        description: "Over-reliance on sleeping pills, alcohol, or other substances to initiate sleep."
      }
    ],
    selfTestQuestions: [
      "Do you go to bed and wake up at different times on weekdays versus weekends?",
      "Do you use electronic devices (phone, tablet, TV) in bed or within an hour of bedtime?",
      "Do you consume caffeine after noon or alcohol within 3 hours of bedtime?",
      "Is your bedroom used for activities other than sleep and intimacy (work, TV, eating)?",
      "Do you exercise vigorously within 2-3 hours of bedtime?",
      "Do you take long naps during the day or nap after 3 PM?"
    ],
    diagnosisOverview: "Diagnosis involves reviewing sleep habits and identifying behaviors that may be contributing to sleep difficulties. A sleep diary and detailed history of daily routines are helpful in identifying problematic patterns.",
    diagnosticTests: [
      {
        name: "Sleep Diary",
        description: "Tracking sleep and wake times, bedtime routines, caffeine and alcohol intake, exercise, and screen use helps identify poor sleep hygiene practices."
      },
      {
        name: "Sleep Hygiene Assessment",
        description: "Structured questionnaires evaluate various aspects of sleep habits, environment, and daytime behaviors that affect sleep."
      },
      {
        name: "Clinical Interview",
        description: "Discussion of daily routines, bedroom environment, and lifestyle factors helps identify specific areas for improvement."
      }
    ],
    treatmentOverview: "Treatment focuses on education and behavioral modification to establish habits that promote good sleep. Changes may feel challenging initially but lead to significant improvements in sleep quality.",
    treatments: [
      {
        name: "Sleep Hygiene Education",
        description: "Learning about behaviors and environmental factors that promote or hinder sleep, and understanding why certain practices are important."
      },
      {
        name: "Behavioral Modification",
        description: "Systematically changing problematic habits, such as reducing screen time before bed, limiting caffeine, and establishing consistent sleep schedules."
      },
      {
        name: "Environmental Optimization",
        description: "Improving the sleep environment by addressing temperature, light, noise, and comfort of bedding."
      },
      {
        name: "Gradual Changes",
        description: "Implementing changes incrementally rather than all at once to make new habits sustainable."
      }
    ],
    lifestyleChanges: [
      "Set a consistent bedtime and wake time, including weekends (within 1 hour variance)",
      "Create a 30-60 minute wind-down routine before bed",
      "Stop using electronic devices at least 1 hour before bed",
      "Reserve the bedroom only for sleep and intimacy",
      "Keep the bedroom dark, quiet, and cool (65-68°F/18-20°C)",
      "Avoid caffeine after noon and limit total daily intake",
      "Don't drink alcohol within 3 hours of bedtime",
      "Exercise regularly, but finish at least 3-4 hours before bed",
      "Limit naps to 20-30 minutes before 3 PM",
      "Get natural light exposure during the day, especially morning",
      "Avoid large meals close to bedtime",
      "Invest in a comfortable mattress and pillows"
    ],
    relatedDisorders: ["Insomnia", "Circadian Rhythm Disorders", "Excessive Daytime Sleepiness"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
