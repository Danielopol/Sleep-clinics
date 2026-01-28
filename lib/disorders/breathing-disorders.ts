import { SleepDisorderContent } from '../sleep-disorders-content'

export const breathingDisorders: SleepDisorderContent[] = [
  {
    slug: "obstructive-sleep-apnea",
    name: "Obstructive Sleep Apnea (OSA)",
    category: "Sleep-Related Breathing Disorders",
    description: "A serious sleep disorder where breathing repeatedly stops and starts due to blocked upper airways during sleep.",
    overview: "Obstructive Sleep Apnea (OSA) is the most common type of sleep apnea, occurring when the muscles in the back of your throat relax too much during sleep. This relaxation causes the airway to narrow or close as you breathe in, which can lower the oxygen level in your blood. Your brain senses this inability to breathe and briefly rouses you from sleep so you can reopen your airway. This awakening is usually so brief that you don't remember it. You might snort, choke, or gasp. This pattern can repeat itself 5 to 30 times or more each hour, all night long, impairing your ability to reach the deep, restful phases of sleep.",
    prevalence: "OSA affects approximately 2-9% of adults in the general population, though many cases remain undiagnosed. It is more common in men, older adults, and those who are overweight. An estimated 80-90% of adults with OSA remain undiagnosed.",
    causes: "The primary cause is the relaxation of throat muscles during sleep, but several factors increase risk: excess weight (fat deposits around the upper airway can obstruct breathing), neck circumference (thicker necks may have narrower airways), a narrowed airway (inherited or from enlarged tonsils/adenoids), being male, older age, family history, use of alcohol or sedatives, smoking, nasal congestion, and medical conditions such as congestive heart failure, high blood pressure, type 2 diabetes, and Parkinson's disease.",
    types: [
      {
        name: "Mild OSA",
        description: "5-15 apnea events per hour of sleep. May cause mild daytime sleepiness."
      },
      {
        name: "Moderate OSA",
        description: "15-30 apnea events per hour of sleep. Notable impact on sleep quality and daytime function."
      },
      {
        name: "Severe OSA",
        description: "More than 30 apnea events per hour. Significant health risks and marked daytime impairment."
      }
    ],
    symptoms: [
      {
        name: "Loud snoring",
        description: "Loud, chronic snoring is one of the most common signs of OSA. Snoring is caused by air squeezing through the narrowed or blocked airway."
      },
      {
        name: "Episodes of stopped breathing",
        description: "Your bed partner may notice periods where you stop breathing during sleep, often followed by gasping or choking sounds."
      },
      {
        name: "Gasping for air during sleep",
        description: "You may awaken abruptly with shortness of breath or a choking sensation as your body reacts to blocked airways."
      },
      {
        name: "Morning headache",
        description: "Frequent morning headaches result from lower oxygen levels and disrupted sleep patterns during the night."
      },
      {
        name: "Excessive daytime sleepiness",
        description: "Despite spending adequate time in bed, you feel excessively tired during the day due to fragmented, poor-quality sleep."
      },
      {
        name: "Difficulty concentrating",
        description: "Sleep deprivation from OSA can impair cognitive function, making it hard to focus, remember things, or make decisions."
      },
      {
        name: "Mood changes",
        description: "Irritability, depression, or mood swings are common due to chronic sleep disruption affecting emotional regulation."
      },
      {
        name: "Dry mouth upon awakening",
        description: "Breathing through the mouth during sleep (common with blocked nasal passages) leads to a dry mouth in the morning."
      }
    ],
    selfTestQuestions: [
      "Do you snore loudly enough to disturb your partner or others nearby?",
      "Has anyone observed you stop breathing, gasp, or choke during sleep?",
      "Do you wake up feeling unrefreshed despite getting enough hours of sleep?",
      "Do you experience excessive daytime sleepiness or fall asleep unintentionally during the day?",
      "Do you have high blood pressure or are you being treated for it?"
    ],
    diagnosisOverview: "Diagnosing OSA typically involves a comprehensive sleep evaluation. Your doctor will review your symptoms, medical history, and may have you complete a sleep questionnaire. The gold standard for diagnosis is a sleep study.",
    diagnosticTests: [
      {
        name: "Polysomnography (Sleep Study)",
        description: "An overnight sleep study conducted at a sleep center where you're hooked up to equipment that monitors your heart, lung, and brain activity, breathing patterns, arm and leg movements, and blood oxygen levels while you sleep."
      },
      {
        name: "Home Sleep Apnea Test (HSAT)",
        description: "A simplified version of polysomnography that can be done at home. It typically measures airflow, breathing effort, blood oxygen levels, and sometimes heart rate or snoring."
      },
      {
        name: "Apnea-Hypopnea Index (AHI)",
        description: "The key measurement from sleep studies that counts the number of apneas (complete breathing cessation) and hypopneas (partial breathing reduction) per hour of sleep."
      }
    ],
    treatmentOverview: "Treatment for OSA aims to normalize breathing during sleep and eliminate snoring and daytime sleepiness. The approach depends on severity and may involve lifestyle changes, devices, or surgery.",
    treatments: [
      {
        name: "Continuous Positive Airway Pressure (CPAP)",
        description: "The most common and reliable treatment. A machine delivers air pressure through a mask while you sleep, keeping your upper airway passages open to prevent apnea and snoring."
      },
      {
        name: "Bilevel Positive Airway Pressure (BiPAP)",
        description: "Similar to CPAP but provides different pressure levels for inhalation and exhalation. Often used for patients who have difficulty with CPAP or have central sleep apnea."
      },
      {
        name: "Oral Appliances",
        description: "Custom-fitted dental devices that reposition the lower jaw and tongue to keep the airway open. Best for mild to moderate OSA or those who cannot tolerate CPAP."
      },
      {
        name: "Upper Airway Surgery",
        description: "Various surgical procedures can remove or shrink tissue, reposition the jaw, or implant devices to prevent airway collapse. Options include UPPP, maxillomandibular advancement, and hypoglossal nerve stimulation."
      },
      {
        name: "Hypoglossal Nerve Stimulation (Inspire)",
        description: "An implanted device that stimulates the nerve controlling tongue movement, keeping the airway open during sleep. Approved for moderate to severe OSA in patients who cannot use CPAP."
      }
    ],
    lifestyleChanges: [
      "Lose excess weight - even a 10% weight loss can significantly reduce OSA severity",
      "Exercise regularly - aim for at least 30 minutes of moderate activity most days",
      "Avoid alcohol and sedatives, especially before bedtime",
      "Sleep on your side rather than your back to prevent tongue and soft tissues from blocking the airway",
      "Quit smoking - smoking increases inflammation and fluid retention in the upper airway",
      "Treat nasal allergies to improve airflow through the nose",
      "Maintain a regular sleep schedule"
    ],
    supportResources: [
      { name: "American Sleep Apnea Association", url: "https://www.sleepapnea.org/" },
      { name: "AWAKE Support Groups", url: "https://www.sleepapnea.org/community/awake-support-groups/" }
    ],
    relatedDisorders: ["Central Sleep Apnea", "Complex/Mixed Sleep Apnea", "Snoring", "Hypoventilation Syndromes"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "central-sleep-apnea",
    name: "Central Sleep Apnea (CSA)",
    category: "Sleep-Related Breathing Disorders",
    description: "A disorder where breathing repeatedly stops during sleep because the brain doesn't send proper signals to the breathing muscles.",
    overview: "Central Sleep Apnea (CSA) is a less common form of sleep apnea that occurs when your brain doesn't send proper signals to the muscles that control breathing. Unlike obstructive sleep apnea, where there is a physical blockage of the airway, in central sleep apnea the airway is not blocked but the brain fails to signal the muscles to breathe. This results in no breathing effort for brief periods during sleep. CSA can occur on its own or be associated with other conditions, particularly heart failure, stroke, or opioid use.",
    prevalence: "CSA is less common than obstructive sleep apnea, affecting less than 1% of the general population. However, it is much more prevalent in certain groups: up to 30-50% of patients with heart failure have CSA, and it frequently occurs in patients using long-term opioid medications.",
    causes: "CSA occurs when the brain fails to transmit signals to breathing muscles. Common causes include heart failure (Cheyne-Stokes respiration), stroke or brain injury affecting the brainstem, high altitude exposure, opioid medication use, and idiopathic (unknown) causes. Medical conditions that affect the brainstem, such as Parkinson's disease or multiple system atrophy, can also cause CSA.",
    types: [
      {
        name: "Primary Central Sleep Apnea",
        description: "Occurs without any identifiable cause (idiopathic). The brain intermittently fails to signal breathing during sleep."
      },
      {
        name: "Cheyne-Stokes Respiration",
        description: "A pattern of gradually increasing then decreasing breathing effort, followed by a central apnea. Common in heart failure and stroke patients."
      },
      {
        name: "Treatment-Emergent Central Sleep Apnea",
        description: "Central apneas that develop or persist when obstructive events are treated with CPAP. Previously called complex sleep apnea."
      },
      {
        name: "High-Altitude Periodic Breathing",
        description: "Central apneas occurring at high altitudes due to changes in oxygen and carbon dioxide levels affecting breathing control."
      },
      {
        name: "Opioid-Induced Central Sleep Apnea",
        description: "CSA caused by chronic use of opioid medications, which depress the respiratory centers in the brain."
      }
    ],
    symptoms: [
      {
        name: "Observed episodes of stopped breathing",
        description: "Unlike OSA, these pauses may not be accompanied by snoring or gasping. A bed partner may notice periods where breathing simply stops."
      },
      {
        name: "Shortness of breath awakening you from sleep",
        description: "You may wake up suddenly feeling short of breath or with a sensation that you need to catch your breath."
      },
      {
        name: "Chronic fatigue and daytime sleepiness",
        description: "Repeated awakenings throughout the night prevent restful sleep, leading to excessive tiredness during the day."
      },
      {
        name: "Morning headaches",
        description: "Low oxygen levels during sleep can cause headaches upon waking."
      },
      {
        name: "Difficulty concentrating",
        description: "Sleep fragmentation impairs cognitive function, affecting memory, attention, and decision-making."
      },
      {
        name: "Mood changes",
        description: "Poor sleep quality can lead to irritability, depression, or anxiety."
      },
      {
        name: "Insomnia",
        description: "Difficulty staying asleep due to repeated arousals from apnea events."
      }
    ],
    selfTestQuestions: [
      "Has anyone observed that you stop breathing during sleep without snoring or choking?",
      "Do you have heart failure, have had a stroke, or take opioid medications?",
      "Do you frequently wake up feeling short of breath?",
      "Do you experience excessive daytime sleepiness despite adequate time in bed?",
      "Have you developed sleep apnea symptoms while using CPAP therapy?"
    ],
    diagnosisOverview: "Diagnosis requires an overnight sleep study (polysomnography) to distinguish CSA from obstructive sleep apnea. The study measures brain activity, eye movements, muscle activity, heart rate, breathing effort, airflow, and blood oxygen levels.",
    diagnosticTests: [
      {
        name: "Polysomnography",
        description: "The definitive test for CSA. It shows apnea events occurring without any breathing effort, distinguishing CSA from OSA where effort is present but airflow is blocked."
      },
      {
        name: "Blood Tests",
        description: "May be performed to check for underlying conditions such as heart failure, kidney function, or thyroid disorders that can contribute to CSA."
      },
      {
        name: "Cardiac Evaluation",
        description: "Echocardiogram and other heart tests may be done to assess for heart failure, a common cause of Cheyne-Stokes respiration pattern CSA."
      },
      {
        name: "Brain Imaging",
        description: "MRI or CT scans may be ordered if a brain lesion or stroke is suspected as the cause of CSA."
      }
    ],
    treatmentOverview: "Treatment focuses on addressing the underlying cause when possible and normalizing breathing during sleep. Options vary based on the specific type and cause of CSA.",
    treatments: [
      {
        name: "Treatment of Underlying Conditions",
        description: "Optimizing treatment for heart failure, reducing opioid dosages when possible, or addressing other underlying causes can significantly improve or resolve CSA."
      },
      {
        name: "Adaptive Servo-Ventilation (ASV)",
        description: "A specialized device that monitors breathing and delivers variable pressure to normalize breathing patterns. Highly effective for many forms of CSA but contraindicated in patients with symptomatic heart failure with reduced ejection fraction."
      },
      {
        name: "CPAP Therapy",
        description: "Continuous positive airway pressure can be effective for some patients with CSA, particularly those with treatment-emergent CSA."
      },
      {
        name: "BiPAP with Backup Rate",
        description: "Bilevel positive airway pressure with a backup respiratory rate ensures minimum breaths per minute, useful when the brain fails to initiate breathing."
      },
      {
        name: "Supplemental Oxygen",
        description: "Nocturnal oxygen therapy can help maintain blood oxygen levels and may reduce the frequency of central apneas in some patients."
      },
      {
        name: "Phrenic Nerve Stimulation",
        description: "An implanted device (Remede System) that stimulates the phrenic nerve to contract the diaphragm, causing the patient to breathe. Approved for moderate to severe CSA."
      }
    ],
    lifestyleChanges: [
      "Avoid alcohol and sedative medications that can worsen central apneas",
      "Maintain a healthy weight",
      "Sleep with head elevated to reduce fluid redistribution to the chest",
      "Follow heart-healthy lifestyle if cardiac disease is present",
      "Avoid sleeping at high altitudes if altitude-induced CSA is an issue",
      "Work with your doctor to minimize opioid medications when safely possible"
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "Complex/Mixed Sleep Apnea", "Cheyne-Stokes Respiration"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "complex-mixed-sleep-apnea",
    name: "Complex/Mixed Sleep Apnea",
    category: "Sleep-Related Breathing Disorders",
    description: "A combination of obstructive and central sleep apnea, where patients have both airway obstruction and brain signaling issues affecting breathing during sleep.",
    overview: "Complex sleep apnea, also known as treatment-emergent central sleep apnea, is a form of sleep-disordered breathing that combines features of both obstructive sleep apnea (OSA) and central sleep apnea (CSA). In this condition, patients initially present with obstructive sleep apnea, but when treated with CPAP therapy, central apneas emerge or persist even after the obstructive events are resolved. Mixed sleep apnea refers to single apnea events that begin as central apneas but end with an obstructive component. Both conditions require specialized treatment approaches.",
    prevalence: "Complex sleep apnea affects approximately 5-15% of patients with obstructive sleep apnea who are started on CPAP therapy. The condition is more common in men, patients with coronary artery disease, and those with more severe OSA.",
    causes: "The exact mechanism is not fully understood. In complex sleep apnea, it appears that treating the obstructive component unmasks an underlying central breathing instability. Contributing factors may include unstable ventilatory control, heart failure, opioid use, and individual variation in how the brain responds to changes in carbon dioxide levels during sleep.",
    symptoms: [
      {
        name: "Persistent symptoms despite CPAP use",
        description: "Patients may continue to experience poor sleep, fatigue, and daytime sleepiness even with consistent CPAP use that appears to be eliminating obstructive events."
      },
      {
        name: "Observed breathing pauses",
        description: "Bed partners may notice that breathing pauses continue even while the patient is using their CPAP machine."
      },
      {
        name: "CPAP intolerance",
        description: "Patients may report that CPAP feels uncomfortable or that they feel like they're fighting against the machine, possibly due to central apneas."
      },
      {
        name: "Excessive daytime sleepiness",
        description: "Despite adequate CPAP pressure and usage, patients remain excessively tired during the day."
      },
      {
        name: "Morning headaches",
        description: "Headaches upon waking may persist due to continued oxygen desaturation from central apneas."
      },
      {
        name: "Fragmented sleep",
        description: "Frequent awakenings throughout the night as the brain responds to repeated apnea events."
      }
    ],
    selfTestQuestions: [
      "Have you been using CPAP for OSA but still feel unrefreshed and tired?",
      "Does your CPAP data show that you still have apnea events despite using the device?",
      "Have you been told your breathing pauses look different from typical snoring-related apneas?",
      "Do you have heart disease or use opioid medications?",
      "Do you feel like you're fighting against your CPAP when trying to breathe?"
    ],
    diagnosisOverview: "Diagnosis typically occurs during CPAP titration studies when central apneas are observed to emerge or persist despite elimination of obstructive events. A comprehensive polysomnography is essential for accurate diagnosis.",
    diagnosticTests: [
      {
        name: "Polysomnography with CPAP Titration",
        description: "An overnight sleep study where CPAP pressure is adjusted while monitoring reveals the emergence of central apneas as obstructive events are resolved."
      },
      {
        name: "CPAP Download Analysis",
        description: "Reviewing data from the patient's CPAP machine can show persistent apnea events with patterns suggestive of central rather than obstructive apneas."
      },
      {
        name: "Cardiac Evaluation",
        description: "Assessment for underlying heart conditions that may contribute to central apneas, including echocardiogram and possibly cardiac catheterization."
      }
    ],
    treatmentOverview: "Treatment aims to address both the obstructive and central components of the disorder. Often, a trial period with CPAP is recommended first, as some central apneas resolve spontaneously within weeks to months.",
    treatments: [
      {
        name: "Continued CPAP Trial",
        description: "In many patients, treatment-emergent central apneas resolve within 1-3 months of continued CPAP use. Patience and monitoring are recommended before switching therapies."
      },
      {
        name: "Adaptive Servo-Ventilation (ASV)",
        description: "The preferred treatment for complex sleep apnea when central apneas persist. ASV dynamically adjusts pressure support breath-by-breath to stabilize breathing. Note: ASV is contraindicated in heart failure patients with reduced ejection fraction."
      },
      {
        name: "BiPAP with Backup Rate",
        description: "Bilevel positive airway pressure with a set backup respiratory rate can ensure minimum breathing is maintained during central apnea events."
      },
      {
        name: "CPAP Pressure Adjustment",
        description: "Sometimes lowering CPAP pressure can reduce central apneas while still treating obstructive events, though this requires careful balance."
      },
      {
        name: "Treat Underlying Conditions",
        description: "Managing heart failure, adjusting opioid medications, or treating other contributing conditions can help resolve central apneas."
      }
    ],
    lifestyleChanges: [
      "Maintain consistent use of prescribed therapy even if initial response seems poor",
      "Avoid alcohol and sedative medications",
      "Maintain a healthy weight",
      "Follow heart-healthy lifestyle practices",
      "Keep regular follow-up appointments to monitor therapy response",
      "Report any medication changes to your sleep specialist"
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "Central Sleep Apnea", "Cheyne-Stokes Respiration"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "sleep-apnea",
    name: "Sleep Apnea (General)",
    category: "Sleep-Related Breathing Disorders",
    description: "A serious sleep disorder characterized by repeated interruptions in breathing during sleep, affecting oxygen levels and sleep quality.",
    overview: "Sleep apnea is a common and potentially serious sleep disorder in which breathing repeatedly stops and starts during sleep. These breathing pauses, called apneas, can last from a few seconds to more than a minute and may occur 30 times or more per hour. Sleep apnea disrupts the sleep cycle, prevents restorative deep sleep, and can lead to serious health complications if left untreated. There are three main types: obstructive (most common), central, and complex/mixed sleep apnea.",
    prevalence: "Sleep apnea affects an estimated 22 million Americans, with up to 80% of moderate to severe cases going undiagnosed. It can occur at any age, including in infants and children, but is most common in adults over 40. Pediatric sleep apnea affects 1-5% of children and is often related to enlarged tonsils and adenoids.",
    causes: "Causes vary by type. Obstructive sleep apnea is caused by physical blockage of the airway, often from relaxed throat muscles, excess tissue, or structural abnormalities. Central sleep apnea results from the brain failing to signal breathing muscles. Risk factors include obesity, large neck circumference, family history, male sex, older age, smoking, alcohol use, nasal congestion, and certain medical conditions including heart disorders and diabetes.",
    types: [
      {
        name: "Obstructive Sleep Apnea (OSA)",
        description: "The most common form, caused by physical obstruction of the airway when throat muscles relax during sleep."
      },
      {
        name: "Central Sleep Apnea (CSA)",
        description: "Less common, occurs when the brain fails to send signals to the muscles that control breathing."
      },
      {
        name: "Complex Sleep Apnea",
        description: "A combination of obstructive and central sleep apnea, often discovered when central apneas emerge during CPAP treatment."
      },
      {
        name: "Pediatric Sleep Apnea",
        description: "Sleep apnea in children, most commonly caused by enlarged tonsils and adenoids but can also be related to obesity or neuromuscular disorders."
      }
    ],
    symptoms: [
      {
        name: "Loud snoring",
        description: "While not everyone who snores has sleep apnea, loud and chronic snoring is one of the most common warning signs, especially when accompanied by silent pauses in breathing."
      },
      {
        name: "Witnessed breathing pauses",
        description: "Bed partners often observe episodes where breathing stops, followed by gasping, choking, or snorting sounds as breathing resumes."
      },
      {
        name: "Excessive daytime sleepiness",
        description: "Even after a full night in bed, people with sleep apnea feel unrefreshed and excessively tired during the day, often falling asleep during quiet activities."
      },
      {
        name: "Morning headaches",
        description: "Headaches upon waking are common due to low oxygen levels and increased carbon dioxide during sleep."
      },
      {
        name: "Difficulty concentrating",
        description: "Cognitive impairment including trouble with memory, focus, and decision-making results from fragmented sleep."
      },
      {
        name: "Irritability and mood changes",
        description: "Chronic sleep deprivation affects emotional regulation, leading to irritability, depression, or anxiety."
      },
      {
        name: "Nighttime symptoms",
        description: "Frequent urination at night, night sweats, dry mouth, and restless sleep are common nighttime symptoms."
      }
    ],
    selfTestQuestions: [
      "Do you snore loudly or has your snoring ever disturbed others?",
      "Has anyone observed you stop breathing, choke, or gasp during sleep?",
      "Do you feel excessively sleepy during the day or fall asleep during routine activities?",
      "Do you wake up with headaches, dry mouth, or a sore throat?",
      "Do you have high blood pressure, diabetes, or heart disease?",
      "Has your bed partner complained about your snoring or had to sleep elsewhere?"
    ],
    diagnosisOverview: "Diagnosis involves evaluation of symptoms, physical examination, and sleep testing. A thorough history from both the patient and bed partner is important. Sleep studies are the definitive diagnostic tool.",
    diagnosticTests: [
      {
        name: "Polysomnography",
        description: "An overnight sleep study at a sleep center that monitors brain waves, eye movements, heart rate, breathing patterns, blood oxygen, and body movements. This is the gold standard for diagnosis."
      },
      {
        name: "Home Sleep Apnea Test",
        description: "A simplified portable test done at home that measures breathing, oxygen levels, and sometimes heart rate. Useful for diagnosing obstructive sleep apnea in patients with high pre-test probability."
      },
      {
        name: "STOP-BANG Questionnaire",
        description: "A screening tool that assesses risk based on Snoring, Tiredness, Observed apneas, blood Pressure, BMI, Age, Neck circumference, and Gender."
      },
      {
        name: "Epworth Sleepiness Scale",
        description: "A questionnaire measuring daytime sleepiness that helps quantify the impact of sleep apnea on daily functioning."
      }
    ],
    treatmentOverview: "Treatment depends on the type and severity of sleep apnea. The goals are to normalize breathing during sleep, eliminate symptoms, and reduce health risks. Treatment may include devices, behavioral changes, or surgery.",
    treatments: [
      {
        name: "CPAP (Continuous Positive Airway Pressure)",
        description: "The first-line treatment for moderate to severe obstructive sleep apnea. A machine delivers constant air pressure through a mask to keep airways open during sleep."
      },
      {
        name: "Oral Appliances",
        description: "Custom dental devices that reposition the jaw and tongue can be effective for mild to moderate OSA and for patients who cannot tolerate CPAP."
      },
      {
        name: "Positional Therapy",
        description: "For patients whose apnea is significantly worse when sleeping on their back, devices or techniques to encourage side sleeping can help."
      },
      {
        name: "Surgery",
        description: "Various surgical options exist including tonsillectomy, adenoidectomy (especially for children), UPPP, jaw advancement, and hypoglossal nerve stimulation for selected patients."
      },
      {
        name: "Weight Loss",
        description: "For overweight patients, weight loss can significantly reduce or even eliminate sleep apnea. Bariatric surgery may be considered for severe obesity."
      }
    ],
    lifestyleChanges: [
      "Lose weight if overweight or obese",
      "Exercise regularly",
      "Avoid alcohol, especially before bedtime",
      "Quit smoking",
      "Sleep on your side rather than your back",
      "Avoid sedative medications when possible",
      "Maintain a regular sleep schedule",
      "Treat nasal allergies and congestion"
    ],
    supportResources: [
      { name: "American Sleep Apnea Association", url: "https://www.sleepapnea.org/" },
      { name: "National Sleep Foundation", url: "https://www.thensf.org/" }
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "Central Sleep Apnea", "Snoring", "Pediatric Sleep Disorders"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "sleep-disordered-breathing",
    name: "Sleep-Disordered Breathing",
    category: "Sleep-Related Breathing Disorders",
    description: "An umbrella term for breathing abnormalities during sleep, ranging from simple snoring to severe obstructive sleep apnea.",
    overview: "Sleep-disordered breathing (SDB) is a general term encompassing a spectrum of breathing problems that occur during sleep. This spectrum ranges from primary snoring (snoring without other abnormalities) through upper airway resistance syndrome to obstructive sleep apnea. All forms of SDB involve some degree of upper airway narrowing or collapse during sleep, resulting in increased breathing effort, reduced airflow, or complete breathing cessation. The severity and health implications vary widely across this spectrum.",
    prevalence: "Sleep-disordered breathing in some form affects up to 50% of the adult population when including habitual snoring. More significant SDB (OSA with AHI ≥5) affects approximately 10-17% of men and 3-9% of women. Prevalence increases significantly with age and obesity.",
    causes: "SDB results from narrowing or collapse of the upper airway during sleep. Contributing factors include anatomical features (small jaw, large tongue, enlarged tonsils), excess soft tissue from obesity, loss of muscle tone during sleep, nasal obstruction, and neuromuscular factors affecting airway patency. Genetic factors, alcohol, sedatives, and sleeping position also play roles.",
    types: [
      {
        name: "Primary Snoring",
        description: "Snoring without apneas, hypopneas, or arousals. Generally considered benign but may progress to more severe SDB over time."
      },
      {
        name: "Upper Airway Resistance Syndrome (UARS)",
        description: "Characterized by increased breathing effort and arousals without meeting criteria for apnea or hypopnea. Causes similar daytime symptoms as OSA."
      },
      {
        name: "Obstructive Sleep Apnea Hypopnea Syndrome",
        description: "The most recognized form of SDB, characterized by repeated episodes of complete or partial airway obstruction during sleep."
      }
    ],
    symptoms: [
      {
        name: "Snoring",
        description: "The hallmark of SDB, caused by vibration of soft tissues as air flows through a narrowed airway. May range from quiet to extremely loud."
      },
      {
        name: "Witnessed apneas",
        description: "Breathing pauses observed by bed partners, typically followed by gasping, choking, or snorting sounds."
      },
      {
        name: "Daytime sleepiness",
        description: "Excessive tiredness during the day despite apparently adequate time in bed, resulting from fragmented sleep."
      },
      {
        name: "Non-restorative sleep",
        description: "Waking feeling unrefreshed even after sleeping for normal duration, indicating poor sleep quality."
      },
      {
        name: "Morning headaches",
        description: "Headaches upon waking related to low oxygen levels and elevated carbon dioxide during sleep."
      },
      {
        name: "Cognitive impairment",
        description: "Difficulty with concentration, memory, and executive function due to sleep fragmentation."
      }
    ],
    selfTestQuestions: [
      "Do you snore regularly?",
      "Has your snoring gotten worse over time?",
      "Do you feel tired during the day despite sleeping enough hours?",
      "Have you gained weight and noticed your sleep has worsened?",
      "Do you wake up with headaches or a dry mouth?",
      "Has anyone observed pauses in your breathing during sleep?"
    ],
    diagnosisOverview: "Evaluation involves a detailed sleep history, physical examination of the upper airway, and sleep testing. The severity of SDB is determined by sleep studies measuring respiratory events and their impact on sleep and oxygen levels.",
    diagnosticTests: [
      {
        name: "Polysomnography",
        description: "Comprehensive overnight sleep study that measures all parameters needed to diagnose and classify SDB severity, including respiratory events, oxygen desaturation, arousals, and sleep stages."
      },
      {
        name: "Home Sleep Testing",
        description: "Portable monitoring for patients with high likelihood of moderate to severe OSA. Measures breathing, effort, and oxygen but not sleep stages."
      },
      {
        name: "Upper Airway Evaluation",
        description: "Physical examination and sometimes endoscopy to identify anatomical factors contributing to airway narrowing."
      },
      {
        name: "Drug-Induced Sleep Endoscopy (DISE)",
        description: "Examination of the upper airway during sedation to identify sites of collapse, useful for surgical planning."
      }
    ],
    treatmentOverview: "Treatment is tailored to the severity of SDB and individual patient factors. Options range from conservative measures for mild cases to PAP therapy or surgery for more severe disease.",
    treatments: [
      {
        name: "Lifestyle Modifications",
        description: "Weight loss, avoiding alcohol before bed, and positional therapy are first-line approaches for mild SDB and adjuncts for more severe disease."
      },
      {
        name: "Positive Airway Pressure Therapy",
        description: "CPAP, BiPAP, or APAP devices deliver pressurized air to maintain airway patency. The gold standard treatment for moderate to severe SDB."
      },
      {
        name: "Oral Appliances",
        description: "Mandibular advancement devices or tongue-retaining devices can be effective for mild to moderate SDB or when PAP is not tolerated."
      },
      {
        name: "Surgical Interventions",
        description: "Various procedures to address specific sites of obstruction, from nasal surgery to multilevel pharyngeal procedures or skeletal advancement."
      }
    ],
    lifestyleChanges: [
      "Achieve and maintain a healthy weight",
      "Avoid alcohol, especially within 3 hours of bedtime",
      "Sleep on your side rather than your back",
      "Quit smoking",
      "Treat nasal congestion and allergies",
      "Maintain regular sleep hours",
      "Elevate the head of the bed if reflux is present"
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "Snoring", "Upper Airway Resistance Syndrome"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "upper-airway-resistance-syndrome",
    name: "Upper Airway Resistance Syndrome",
    category: "Sleep-Related Breathing Disorders",
    description: "A form of sleep-disordered breathing where increased breathing effort causes arousals and fragmented sleep, without meeting criteria for sleep apnea.",
    overview: "Upper Airway Resistance Syndrome (UARS) is a form of sleep-disordered breathing characterized by repetitive increases in upper airway resistance during sleep that lead to brief arousals, but without the apneas or hypopneas that define obstructive sleep apnea. Despite not meeting OSA criteria, patients with UARS experience significant symptoms including excessive daytime sleepiness and fatigue. UARS represents a middle ground on the spectrum between primary snoring and obstructive sleep apnea.",
    prevalence: "UARS is less well-studied than OSA, and prevalence estimates vary widely. It appears to be more common in younger patients and women compared to OSA. Some studies suggest it may affect up to 10-15% of patients evaluated for sleep-disordered breathing. UARS is often underdiagnosed because standard sleep study scoring may miss it.",
    causes: "UARS is caused by partial upper airway narrowing during sleep that increases the effort required to breathe. The airway doesn't fully collapse (as in OSA), but the increased resistance triggers arousals that fragment sleep. Contributing factors include subtle anatomical abnormalities, low arousal threshold (waking easily to breathing difficulty), chronic nasal congestion, and genetic factors. UARS may be a precursor to OSA in some patients.",
    symptoms: [
      {
        name: "Excessive daytime sleepiness",
        description: "Despite the absence of significant apneas, sleep fragmentation from repeated arousals causes pronounced daytime fatigue and sleepiness."
      },
      {
        name: "Unrefreshing sleep",
        description: "Patients wake feeling unrefreshed regardless of sleep duration due to frequent brief arousals disrupting sleep architecture."
      },
      {
        name: "Mild or no snoring",
        description: "Unlike OSA, patients with UARS may have minimal or no snoring, which can lead to delayed diagnosis."
      },
      {
        name: "Chronic fatigue",
        description: "Persistent fatigue that doesn't improve with more sleep time, often misdiagnosed as chronic fatigue syndrome."
      },
      {
        name: "Insomnia symptoms",
        description: "Difficulty maintaining sleep, with frequent awakenings throughout the night."
      },
      {
        name: "Morning headaches",
        description: "Headaches upon waking, though often less severe than those associated with OSA."
      },
      {
        name: "Functional somatic syndromes",
        description: "UARS has been associated with conditions like fibromyalgia, irritable bowel syndrome, and chronic pain syndromes."
      }
    ],
    selfTestQuestions: [
      "Do you feel excessively tired during the day despite sleeping enough hours?",
      "Do you wake frequently during the night for no apparent reason?",
      "Do you have symptoms of fatigue that haven't been explained by other conditions?",
      "Have you been told you snore only lightly or not at all, yet feel unrefreshed?",
      "Do you have chronic pain, headaches, or symptoms of fibromyalgia or irritable bowel syndrome?"
    ],
    diagnosisOverview: "Diagnosis of UARS requires careful attention during polysomnography to detect respiratory effort-related arousals (RERAs) that may be missed by standard scoring. Esophageal pressure monitoring or pneumotachography may be needed for definitive diagnosis.",
    diagnosticTests: [
      {
        name: "Polysomnography with RERA Scoring",
        description: "A sleep study that specifically looks for respiratory effort-related arousals (RERAs), not just apneas and hypopneas. This may require more sensitive analysis than routine studies."
      },
      {
        name: "Esophageal Pressure Monitoring",
        description: "A catheter measuring pressure changes in the esophagus can detect increased respiratory effort that triggers arousals. This is the gold standard but is invasive and not routinely used."
      },
      {
        name: "Nasal Pressure Transducer",
        description: "High-sensitivity measurement of nasal airflow can detect flow limitation (flattening of the inspiratory waveform) that indicates increased airway resistance."
      },
      {
        name: "Cyclic Alternating Pattern (CAP) Analysis",
        description: "Specialized EEG analysis that may reveal sleep instability and microarousals not captured by standard sleep staging."
      }
    ],
    treatmentOverview: "Treatment for UARS is similar to OSA treatment but may be effective at lower intensities. Many patients respond to conservative measures, though some require PAP therapy or other interventions.",
    treatments: [
      {
        name: "Nasal CPAP or BiPAP",
        description: "Positive airway pressure therapy is effective for UARS, often at lower pressures than required for OSA. It prevents airway narrowing and eliminates arousals."
      },
      {
        name: "Oral Appliances",
        description: "Mandibular advancement devices may be particularly effective for UARS, advancing the jaw to open the airway without requiring PAP therapy."
      },
      {
        name: "Nasal Surgery",
        description: "If chronic nasal obstruction contributes to UARS, surgical correction (septoplasty, turbinate reduction) may provide relief."
      },
      {
        name: "Palatal Procedures",
        description: "Radiofrequency ablation or other procedures to stiffen the soft palate may reduce airway resistance in selected patients."
      },
      {
        name: "Myofunctional Therapy",
        description: "Exercises to strengthen the tongue and throat muscles may help maintain airway patency during sleep."
      }
    ],
    lifestyleChanges: [
      "Maintain a healthy weight (though UARS patients are often normal weight)",
      "Avoid alcohol and sedatives before bed",
      "Treat allergies and nasal congestion aggressively",
      "Sleep on your side",
      "Practice good sleep hygiene",
      "Avoid sleeping pills that may deepen sleep and worsen arousals",
      "Consider nasal strips or nasal dilators"
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "Snoring", "Sleep-Disordered Breathing", "Insomnia"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "hypoventilation-syndromes",
    name: "Hypoventilation Syndromes",
    category: "Sleep-Related Breathing Disorders",
    description: "Conditions characterized by abnormally slow or shallow breathing during sleep, leading to elevated carbon dioxide and reduced oxygen levels.",
    overview: "Sleep-related hypoventilation syndromes are disorders in which breathing is insufficient to maintain normal oxygen and carbon dioxide levels during sleep. Unlike sleep apnea where breathing repeatedly stops, hypoventilation involves continuous but inadequate breathing. The result is a rise in blood carbon dioxide (hypercapnia) and fall in oxygen (hypoxemia) during sleep. Hypoventilation can occur due to obesity (obesity hypoventilation syndrome), lung disease, neuromuscular disorders, chest wall abnormalities, or brainstem dysfunction.",
    prevalence: "Obesity Hypoventilation Syndrome (OHS), the most common form, affects approximately 10-20% of obese patients with obstructive sleep apnea and up to 0.4% of the general adult population. The prevalence of all hypoventilation syndromes is increasing with rising obesity rates. Other forms are rarer and associated with specific underlying conditions.",
    causes: "Hypoventilation during sleep occurs when the respiratory system cannot maintain adequate gas exchange. In obesity hypoventilation syndrome, excess weight restricts chest wall movement and diaphragm function. Other causes include COPD and other lung diseases, neuromuscular diseases (muscular dystrophy, ALS, myasthenia gravis), chest wall disorders (kyphoscoliosis), brainstem lesions, congenital central hypoventilation syndrome (Ondine's curse), and medication effects (opioids, sedatives).",
    types: [
      {
        name: "Obesity Hypoventilation Syndrome (OHS)",
        description: "Defined by obesity (BMI ≥30), daytime hypercapnia (PaCO2 >45 mmHg), and sleep-disordered breathing, without other causes of hypoventilation. Often coexists with OSA."
      },
      {
        name: "COPD-Related Hypoventilation",
        description: "Patients with chronic obstructive pulmonary disease may hypoventilate during sleep, particularly during REM sleep, leading to nocturnal hypoxemia."
      },
      {
        name: "Neuromuscular Disease Hypoventilation",
        description: "Weakness of respiratory muscles leads to inability to maintain adequate ventilation, particularly during sleep when muscle tone naturally decreases."
      },
      {
        name: "Congenital Central Hypoventilation Syndrome",
        description: "A rare genetic disorder (Ondine's curse) where the automatic control of breathing is impaired, particularly during sleep."
      }
    ],
    symptoms: [
      {
        name: "Morning headaches",
        description: "Headaches upon waking are common due to elevated carbon dioxide levels during sleep causing cerebral vasodilation."
      },
      {
        name: "Excessive daytime sleepiness",
        description: "Poor sleep quality and nocturnal hypoxemia lead to significant daytime fatigue and sleepiness."
      },
      {
        name: "Shortness of breath",
        description: "Dyspnea, particularly with exertion, may occur as the condition progresses and daytime gas exchange becomes affected."
      },
      {
        name: "Fatigue and low energy",
        description: "Chronic hypoxemia and sleep disruption cause persistent fatigue and reduced exercise tolerance."
      },
      {
        name: "Peripheral edema",
        description: "Swelling in the legs may occur as chronic hypoxemia leads to pulmonary hypertension and right heart strain (cor pulmonale)."
      },
      {
        name: "Cognitive impairment",
        description: "Memory problems, difficulty concentrating, and confusion can result from chronic hypercapnia and sleep disruption."
      },
      {
        name: "Cyanosis",
        description: "Bluish discoloration of lips and fingertips may be visible due to low blood oxygen levels."
      }
    ],
    selfTestQuestions: [
      "Do you have significant obesity (BMI over 30) and feel excessively sleepy during the day?",
      "Do you wake up with headaches most mornings?",
      "Have you noticed shortness of breath that has worsened over time?",
      "Do you have swelling in your ankles or legs?",
      "Do you have a lung disease, neuromuscular condition, or chest wall abnormality?",
      "Has a doctor ever told you that your carbon dioxide level was high?"
    ],
    diagnosisOverview: "Diagnosis requires demonstration of hypoventilation during sleep, typically showing elevated CO2 and reduced oxygen. Arterial blood gas analysis, overnight oximetry, and polysomnography with CO2 monitoring are key diagnostic tools.",
    diagnosticTests: [
      {
        name: "Arterial Blood Gas (ABG)",
        description: "Measurement of oxygen and carbon dioxide in arterial blood. Daytime hypercapnia (PaCO2 >45 mmHg) is required for diagnosis of obesity hypoventilation syndrome."
      },
      {
        name: "Polysomnography with Capnography",
        description: "Sleep study that includes continuous monitoring of end-tidal or transcutaneous CO2 to document elevated carbon dioxide during sleep."
      },
      {
        name: "Overnight Pulse Oximetry",
        description: "Continuous oxygen monitoring during sleep can show sustained desaturation patterns typical of hypoventilation (prolonged low oxygen rather than repetitive dips seen in OSA)."
      },
      {
        name: "Pulmonary Function Tests",
        description: "Spirometry and lung volume measurements help identify underlying lung disease or restrictive defects contributing to hypoventilation."
      },
      {
        name: "Serum Bicarbonate",
        description: "Elevated bicarbonate level suggests chronic CO2 retention as the body compensates for respiratory acidosis."
      }
    ],
    treatmentOverview: "Treatment aims to normalize gas exchange during sleep and prevent complications. The approach depends on the underlying cause and severity of hypoventilation.",
    treatments: [
      {
        name: "Noninvasive Ventilation (NIV)",
        description: "BiPAP with a backup rate or average volume-assured pressure support (AVAPS) provides ventilatory support during sleep, treating both obstructive events and hypoventilation."
      },
      {
        name: "CPAP Therapy",
        description: "For patients with OHS and concurrent OSA, CPAP alone may be sufficient if it normalizes daytime CO2. However, many patients require BiPAP."
      },
      {
        name: "Supplemental Oxygen",
        description: "May be needed in addition to ventilatory support, but oxygen alone without ventilation can worsen hypercapnia in some patients."
      },
      {
        name: "Weight Loss",
        description: "For OHS, weight loss (including bariatric surgery in appropriate candidates) can dramatically improve or resolve hypoventilation."
      },
      {
        name: "Tracheostomy",
        description: "In severe cases unresponsive to noninvasive ventilation, tracheostomy with nocturnal ventilation may be necessary."
      },
      {
        name: "Diaphragm Pacing",
        description: "For congenital central hypoventilation syndrome and some neuromuscular conditions, phrenic nerve pacing can support breathing."
      }
    ],
    lifestyleChanges: [
      "Achieve significant weight loss if obese (goal is often >10% body weight)",
      "Avoid alcohol and sedative medications that depress breathing",
      "Quit smoking to preserve lung function",
      "Use prescribed ventilation therapy every night",
      "Monitor oxygen saturation at home if recommended",
      "Maintain upright sleeping position if this improves breathing",
      "Stay current with vaccinations (flu, pneumonia) to prevent respiratory infections"
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "Central Sleep Apnea", "COPD"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "snoring",
    name: "Snoring",
    category: "Sleep-Related Breathing Disorders",
    description: "The hoarse or harsh sound that occurs when air flows past relaxed tissues in the throat, causing the tissues to vibrate during breathing.",
    overview: "Snoring is the sound produced by vibration of the soft tissues of the upper airway during sleep. While snoring itself is common and often harmless (primary snoring), it can also be a sign of a more serious condition called obstructive sleep apnea. Snoring occurs when the flow of air through the mouth and nose is partially obstructed. Almost everyone snores occasionally, but for some people it can be a chronic problem. It can also be a nuisance to bed partners and family members.",
    prevalence: "Snoring is extremely common, affecting approximately 40% of adult men and 24% of adult women on a regular basis. The prevalence increases with age and weight. Habitual snoring occurs in about 24% of the adult population. While snoring itself is not always harmful, about 50% of loud snorers have some degree of obstructive sleep apnea.",
    causes: "Snoring occurs when airflow causes tissues in the back of the throat to vibrate. Factors that promote snoring include: anatomy (thick soft palate, elongated uvula, enlarged tonsils or adenoids, deviated septum), obesity (excess tissue in the throat), alcohol consumption (relaxes throat muscles), nasal problems (chronic congestion, deviated septum), sleep deprivation (leads to deeper sleep with more muscle relaxation), sleep position (supine position worsens snoring), and aging (natural loss of muscle tone).",
    symptoms: [
      {
        name: "Noise during sleep",
        description: "The primary symptom is the noise itself, which can range from soft sounds to loud, harsh rattling that can be heard through walls."
      },
      {
        name: "Dry mouth or sore throat upon waking",
        description: "Mouth breathing during snoring leads to dryness of the oral tissues, causing dry mouth or sore throat in the morning."
      },
      {
        name: "Daytime sleepiness",
        description: "While mild snoring may not affect sleep quality, louder snoring associated with resistance or apnea can fragment sleep."
      },
      {
        name: "Morning headaches",
        description: "When snoring is associated with sleep apnea or significant oxygen desaturation, morning headaches may occur."
      },
      {
        name: "Restless sleep",
        description: "The effort required to breathe through a narrowed airway can cause restless, disrupted sleep."
      },
      {
        name: "Relationship strain",
        description: "Loud snoring can significantly impact bed partners' sleep, leading to relationship tension and separate sleeping arrangements."
      }
    ],
    selfTestQuestions: [
      "Have others complained about your snoring?",
      "Is your snoring loud enough to disturb your partner's sleep?",
      "Do you ever wake yourself up with your snoring?",
      "Have you noticed your snoring is worse when you sleep on your back?",
      "Do you feel tired during the day despite sleeping enough hours?",
      "Has anyone observed you stop breathing or gasp during sleep?"
    ],
    diagnosisOverview: "Evaluation begins with a thorough history and physical examination. The key is determining whether snoring is simple (primary snoring) or associated with sleep apnea, which changes the management approach significantly.",
    diagnosticTests: [
      {
        name: "Physical Examination",
        description: "Examination of the nose, mouth, throat, and neck to identify anatomical factors contributing to snoring, such as enlarged tonsils, deviated septum, or elongated uvula."
      },
      {
        name: "Sleep Study (Polysomnography)",
        description: "If sleep apnea is suspected, an overnight sleep study can determine whether snoring is associated with apneas, hypopneas, or oxygen desaturation."
      },
      {
        name: "Home Sleep Testing",
        description: "For patients with high likelihood of OSA, a simplified home test can screen for significant sleep-disordered breathing."
      },
      {
        name: "Drug-Induced Sleep Endoscopy",
        description: "Examination of the upper airway during sedated sleep to identify the exact site(s) of vibration and obstruction, useful for surgical planning."
      }
    ],
    treatmentOverview: "Treatment depends on whether snoring is primary or associated with sleep apnea. For simple snoring, conservative measures and lifestyle changes are often effective. More severe cases may require devices or surgery.",
    treatments: [
      {
        name: "Lifestyle Modifications",
        description: "Weight loss, avoiding alcohol before bed, treating nasal congestion, and changing sleep position are first-line treatments for simple snoring."
      },
      {
        name: "Positional Therapy",
        description: "Devices or techniques to prevent sleeping on the back, where snoring is typically worst due to gravity's effect on the airway."
      },
      {
        name: "Oral Appliances",
        description: "Mandibular advancement devices worn at night can reposition the jaw and tongue to open the airway and reduce snoring."
      },
      {
        name: "Nasal Devices",
        description: "Nasal strips, nasal dilators, and nasal expiratory resistance devices (Provent) can improve nasal airflow and reduce snoring."
      },
      {
        name: "Palatal Procedures",
        description: "Surgical or nonsurgical procedures to stiffen or reduce the soft palate tissue, including radiofrequency ablation, palatal implants (Pillar procedure), and uvulopalatopharyngoplasty (UPPP)."
      },
      {
        name: "CPAP Therapy",
        description: "When snoring is associated with sleep apnea, CPAP eliminates snoring by keeping the airway open with pressurized air."
      }
    ],
    lifestyleChanges: [
      "Lose weight if overweight or obese",
      "Avoid alcohol within 3-4 hours of bedtime",
      "Treat nasal congestion and allergies",
      "Sleep on your side rather than your back",
      "Establish regular sleep patterns and get adequate sleep",
      "Quit smoking",
      "Stay well hydrated",
      "Elevate the head of the bed slightly"
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "Upper Airway Resistance Syndrome", "Sleep-Disordered Breathing"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
