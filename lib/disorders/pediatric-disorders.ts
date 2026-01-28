import { SleepDisorderContent } from '../sleep-disorders-content'

export const pediatricDisorders: SleepDisorderContent[] = [
  {
    slug: "pediatric-sleep-disorders",
    name: "Pediatric Sleep Disorders",
    category: "Pediatric Sleep Disorders",
    description: "A range of sleep problems affecting infants, children, and adolescents, including behavioral sleep issues and medical sleep disorders.",
    overview: "Pediatric sleep disorders encompass a wide range of conditions affecting sleep in infants, children, and adolescents. Sleep problems are extremely common in childhood, affecting 25-50% of children at some point. These can include behavioral sleep problems (difficulty falling asleep, night wakings), medical sleep disorders (sleep apnea, restless legs), parasomnias (sleepwalking, night terrors), and circadian rhythm issues. Adequate sleep is crucial for children's physical health, cognitive development, emotional regulation, and academic performance. Sleep needs vary significantly by age.",
    prevalence: "Sleep problems affect 25-50% of children at some point in development. Behavioral insomnia of childhood affects about 20-30% of young children. Obstructive sleep apnea affects 1-5% of children. Parasomnias (sleepwalking, night terrors) affect up to 15-30% of children. Circadian rhythm issues are extremely common in adolescents. Many pediatric sleep problems resolve with development, but some require intervention.",
    causes: "Causes vary by specific disorder: behavioral sleep problems often result from inconsistent bedtime routines, inappropriate sleep associations, and parenting practices; sleep apnea in children is most commonly caused by enlarged tonsils and adenoids; parasomnias are related to immature nervous system development; circadian rhythm delays in teens relate to both biological and social factors. Medical conditions, developmental disorders (autism, ADHD), anxiety, and environmental factors (screen time, irregular schedules) can all contribute to pediatric sleep problems.",
    types: [
      {
        name: "Behavioral Insomnia of Childhood",
        description: "Includes sleep-onset association type (needing specific conditions like being rocked to fall asleep) and limit-setting type (bedtime resistance, stalling)."
      },
      {
        name: "Pediatric Obstructive Sleep Apnea",
        description: "Breathing obstruction during sleep, usually due to enlarged tonsils/adenoids. Presents differently than adult OSA."
      },
      {
        name: "Pediatric Parasomnias",
        description: "Sleepwalking, night terrors, and confusional arousals are common in children and usually outgrown."
      },
      {
        name: "Delayed Sleep Phase in Adolescents",
        description: "Biological shift toward later sleep timing during puberty, often compounded by social and technology factors."
      },
      {
        name: "Restless Legs Syndrome in Children",
        description: "Often underdiagnosed in children, who may describe symptoms as 'growing pains' or restlessness."
      }
    ],
    symptoms: [
      {
        name: "Difficulty falling asleep",
        description: "Bedtime resistance, frequent curtain calls, inability to fall asleep independently, or taking more than 30 minutes to fall asleep."
      },
      {
        name: "Night wakings",
        description: "Frequent awakenings during the night requiring parental intervention to return to sleep."
      },
      {
        name: "Snoring and breathing pauses",
        description: "Regular snoring, gasping, or witnessed apneas may indicate pediatric sleep apnea."
      },
      {
        name: "Daytime sleepiness or hyperactivity",
        description: "Unlike adults, sleepy children often become hyperactive, irritable, or inattentive rather than obviously drowsy."
      },
      {
        name: "Morning headaches",
        description: "Can indicate sleep-disordered breathing or insufficient sleep."
      },
      {
        name: "Behavioral problems",
        description: "Poor sleep is associated with behavioral issues, emotional dysregulation, and symptoms mimicking ADHD."
      },
      {
        name: "Academic difficulties",
        description: "Sleep problems can impair attention, memory, and learning, affecting school performance."
      },
      {
        name: "Parasomnias",
        description: "Sleepwalking, night terrors, bedwetting, and sleep talking are common in children."
      }
    ],
    selfTestQuestions: [
      "Does your child have difficulty falling asleep or staying asleep?",
      "Does your child snore regularly or have pauses in breathing during sleep?",
      "Is your child difficult to wake in the morning?",
      "Does your child seem overtired, cranky, or hyperactive during the day?",
      "Does your child resist bedtime or have frequent 'curtain calls'?",
      "Has your child experienced sleepwalking, night terrors, or bedwetting?"
    ],
    diagnosisOverview: "Evaluation includes detailed sleep history, developmental history, and assessment for specific disorders. Sleep diaries and actigraphy help document patterns. Polysomnography is used when sleep apnea or other medical sleep disorders are suspected.",
    diagnosticTests: [
      {
        name: "Sleep History",
        description: "Detailed history of sleep patterns, bedtime routines, night behaviors, and daytime functioning from parents and child."
      },
      {
        name: "Sleep Diary",
        description: "1-2 week log of bedtimes, wake times, night wakings, and daytime naps to identify patterns."
      },
      {
        name: "Pediatric Sleep Questionnaires",
        description: "Validated questionnaires (CSHQ, PSQ) screen for various pediatric sleep problems."
      },
      {
        name: "Polysomnography",
        description: "Overnight sleep study for suspected sleep apnea, unexplained sleepiness, or unusual nocturnal behaviors. Pediatric criteria differ from adults."
      },
      {
        name: "Actigraphy",
        description: "Wrist-worn device tracking sleep-wake patterns over days to weeks."
      }
    ],
    treatmentOverview: "Treatment depends on the specific disorder. Behavioral interventions are first-line for behavioral sleep problems. Sleep apnea is often treated with tonsillectomy/adenoidectomy. Age-appropriate sleep hygiene is foundational for all children.",
    treatments: [
      {
        name: "Behavioral Interventions",
        description: "Sleep training approaches for young children, including graduated extinction, bedtime fading, and positive routines. These are highly effective for behavioral insomnia."
      },
      {
        name: "Sleep Hygiene Education",
        description: "Age-appropriate sleep schedules, consistent bedtime routines, limiting screens, and optimal sleep environment."
      },
      {
        name: "Adenotonsillectomy",
        description: "First-line treatment for pediatric obstructive sleep apnea caused by enlarged tonsils and adenoids. Cures OSA in about 75% of cases."
      },
      {
        name: "CPAP/BiPAP",
        description: "For children with persistent OSA after surgery or when surgery isn't indicated, positive airway pressure can be used."
      },
      {
        name: "Melatonin",
        description: "May help children with sleep onset difficulties, particularly those with ADHD, autism, or circadian rhythm issues. Use should be guided by a clinician."
      },
      {
        name: "Iron Supplementation",
        description: "For children with restless legs syndrome or periodic limb movements, checking and supplementing iron if needed."
      }
    ],
    lifestyleChanges: [
      "Establish consistent bedtime and wake time (including weekends)",
      "Create a calming 20-30 minute bedtime routine",
      "Remove screens from the bedroom and limit screen time before bed",
      "Ensure the bedroom is dark, quiet, and cool",
      "Avoid caffeine in children and adolescents",
      "Ensure age-appropriate physical activity during the day",
      "Limit naps based on age (eliminate for school-age children)",
      "Address anxiety or fears that may interfere with sleep",
      "Model good sleep habits as parents"
    ],
    supportResources: [
      { name: "American Academy of Sleep Medicine - Children", url: "https://sleepeducation.org/" },
      { name: "National Sleep Foundation", url: "https://www.thensf.org/" }
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "Sleepwalking", "Night Terrors", "Bedwetting", "ADHD"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "bedwetting",
    name: "Bedwetting",
    category: "Pediatric Sleep Disorders",
    description: "Involuntary urination during sleep in children who are old enough to be expected to stay dry, also known as nocturnal enuresis.",
    overview: "Bedwetting (nocturnal enuresis) is the involuntary release of urine during sleep in a child who is old enough to reasonably be expected to stay dry at night, typically age 5-6 and older. It is classified as primary (the child has never been consistently dry) or secondary (bedwetting resumes after at least 6 months of dryness). Bedwetting is not the child's fault and is not a behavioral problem—it results from developmental factors affecting bladder capacity, arousal, and hormone production. Most children outgrow bedwetting, but it can be distressing for children and families.",
    prevalence: "Bedwetting is very common: approximately 15-20% of 5-year-olds, 10% of 7-year-olds, 5% of 10-year-olds, and 1-2% of teenagers wet the bed. Boys are affected more often than girls (approximately 2:1). About 15% of affected children spontaneously become dry each year. There is a strong genetic component: if one parent wet the bed, the child has a 45% chance; if both parents did, the chance is 75%.",
    causes: "Bedwetting results from a combination of factors: delayed maturation of bladder control mechanisms, decreased nighttime production of antidiuretic hormone (ADH) leading to excess urine production, small functional bladder capacity, high arousal threshold (difficulty waking to bladder signals), and genetic factors. Secondary enuresis may be triggered by stress, urinary tract infections, constipation, diabetes, or sleep disorders. Rarely, structural abnormalities are involved.",
    types: [
      {
        name: "Primary Nocturnal Enuresis",
        description: "The child has never achieved consistent nighttime dryness. This is the most common type and typically developmental."
      },
      {
        name: "Secondary Nocturnal Enuresis",
        description: "Bedwetting resumes after at least 6 months of nighttime dryness. More likely to have an underlying cause."
      },
      {
        name: "Monosymptomatic Enuresis",
        description: "Bedwetting without daytime wetting or other urinary symptoms."
      },
      {
        name: "Non-Monosymptomatic Enuresis",
        description: "Bedwetting accompanied by daytime symptoms such as urgency, frequency, or daytime wetting."
      }
    ],
    symptoms: [
      {
        name: "Wet bed upon waking",
        description: "The primary symptom is waking up with a wet bed from involuntary urination during sleep."
      },
      {
        name: "Frequency of episodes",
        description: "May occur nightly, several times per week, or occasionally. Frequency varies greatly between children."
      },
      {
        name: "Large urine volume",
        description: "Many children with enuresis produce larger-than-normal amounts of urine at night."
      },
      {
        name: "Difficulty waking",
        description: "Many bedwetting children are deep sleepers and don't wake to bladder signals or wetness."
      },
      {
        name: "Emotional impact",
        description: "Shame, embarrassment, low self-esteem, and anxiety about sleepovers or camps are common."
      }
    ],
    selfTestQuestions: [
      "Is your child age 5 or older and still wetting the bed regularly?",
      "Has your child never had a prolonged period (6+ months) of dry nights?",
      "Or did your child have a dry period and then start wetting again?",
      "Does your child have daytime wetting or urgency as well?",
      "Is there a family history of bedwetting?",
      "Does your child snore or have other signs of sleep-disordered breathing?"
    ],
    diagnosisOverview: "Diagnosis is based on history and age. Physical examination and urinalysis rule out medical causes. Further testing is only needed if there are concerning features like daytime symptoms, recurrent UTIs, or signs of structural or neurological problems.",
    diagnosticTests: [
      {
        name: "Medical History",
        description: "Detailed history including timing, frequency, daytime symptoms, fluid intake, bowel habits, and family history."
      },
      {
        name: "Physical Examination",
        description: "General exam including genitourinary examination, spine examination for signs of spinal abnormalities, and neurological assessment."
      },
      {
        name: "Urinalysis",
        description: "To rule out urinary tract infection, diabetes, and kidney problems."
      },
      {
        name: "Bladder Diary",
        description: "Recording fluid intake, voiding frequency, and estimated volumes helps assess bladder function."
      },
      {
        name: "Further Testing",
        description: "Ultrasound, urodynamics, or other tests are only needed if there are symptoms suggesting structural or functional abnormalities."
      }
    ],
    treatmentOverview: "Many families choose to wait for spontaneous resolution with supportive measures. For those seeking active treatment, bedwetting alarms are most effective for long-term cure, while desmopressin provides rapid but often temporary improvement.",
    treatments: [
      {
        name: "Education and Reassurance",
        description: "Understanding that bedwetting is not the child's fault, is common, and usually resolves with time. Avoiding punishment is essential."
      },
      {
        name: "Bedwetting Alarm",
        description: "The most effective long-term treatment (up to 75% success). A moisture sensor triggers an alarm that wakes the child when wetting begins, gradually conditioning the brain to respond to bladder signals."
      },
      {
        name: "Desmopressin (DDAVP)",
        description: "A synthetic antidiuretic hormone that reduces nighttime urine production. Works quickly for short-term needs (sleepovers, camps) but bedwetting often returns when stopped."
      },
      {
        name: "Combination Therapy",
        description: "Using both alarm and desmopressin together may be more effective than either alone for some children."
      },
      {
        name: "Treat Constipation",
        description: "Constipation is common in bedwetting children and treating it can improve enuresis."
      },
      {
        name: "Address Sleep Apnea",
        description: "If snoring or sleep apnea is present, treatment (often adenotonsillectomy) may resolve bedwetting."
      }
    ],
    lifestyleChanges: [
      "Maintain regular bathroom schedule during the day",
      "Encourage adequate fluid intake during the day, tapering in evening",
      "Have the child urinate before bed",
      "Protect the mattress with waterproof covers",
      "Have the child help with cleanup (not as punishment) to build responsibility",
      "Never punish or shame the child for bedwetting",
      "Treat constipation if present",
      "Consider using pull-ups if preferred, but these don't help treatment",
      "Celebrate dry nights without pressuring about wet ones",
      "Keep a calendar to track progress"
    ],
    supportResources: [
      { name: "National Association for Continence", url: "https://www.nafc.org/" }
    ],
    relatedDisorders: ["Pediatric Sleep Disorders", "Sleep Apnea", "Constipation", "Diabetes"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
