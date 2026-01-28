import { SleepDisorderContent } from '../sleep-disorders-content'

export const hypersomniaDisorders: SleepDisorderContent[] = [
  {
    slug: "narcolepsy",
    name: "Narcolepsy",
    category: "Hypersomnias",
    description: "A chronic neurological disorder affecting the brain's ability to control sleep-wake cycles, causing excessive daytime sleepiness and sudden sleep attacks.",
    overview: "Narcolepsy is a lifelong neurologic disorder characterized by the brain's inability to regulate sleep-wake cycles normally. Individuals with narcolepsy experience overwhelming daytime drowsiness and may have sudden, uncontrollable episodes of falling asleep during any type of activity. Some people with narcolepsy also experience sudden loss of muscle tone (cataplexy) triggered by strong emotions. Narcolepsy can significantly impact daily activities including work, school, social relationships, and safety, particularly when driving or operating machinery.",
    prevalence: "Narcolepsy affects approximately 1 in 2,000 people, though up to 50% of cases may be undiagnosed. It affects men and women equally. Symptoms typically begin between ages 15-25, but can occur at any age. The average delay from symptom onset to diagnosis is 8-10 years. While narcolepsy can run in families, most cases are not inherited.",
    causes: "Narcolepsy Type 1 is caused by loss of brain cells that produce hypocretin (also called orexin), a neurotransmitter that regulates wakefulness and REM sleep. This loss is thought to be autoimmune in nature, possibly triggered by infections (such as H1N1 flu) in genetically susceptible individuals. The cause of Narcolepsy Type 2 is less clear but may involve less severe hypocretin deficiency. Risk factors include family history (having a first-degree relative with narcolepsy increases risk 10-40 fold), certain infections, and brain injuries affecting the hypothalamus.",
    types: [
      {
        name: "Narcolepsy Type 1 (with cataplexy)",
        description: "Characterized by excessive daytime sleepiness plus cataplexy (sudden muscle weakness triggered by emotions), or by low cerebrospinal fluid hypocretin-1 levels."
      },
      {
        name: "Narcolepsy Type 2 (without cataplexy)",
        description: "Features excessive daytime sleepiness without cataplexy and with normal or near-normal hypocretin levels. May be a precursor to Type 1 in some cases."
      }
    ],
    symptoms: [
      {
        name: "Excessive daytime sleepiness (EDS)",
        description: "The primary symptom is persistent sleepiness regardless of how much nighttime sleep you get. This overwhelming urge to sleep can occur at any time and is difficult to prevent. Brief naps may provide temporary relief."
      },
      {
        name: "Cataplexy",
        description: "Sudden loss of muscle tone while awake, triggered by strong emotions like laughter, surprise, or anger. Ranges from mild weakness (drooping eyelids, slurred speech) to complete body collapse. Only occurs in Type 1 narcolepsy."
      },
      {
        name: "Sleep paralysis",
        description: "Temporary inability to move or speak while falling asleep or waking up, lasting seconds to minutes. Can be frightening but is not dangerous."
      },
      {
        name: "Hallucinations",
        description: "Vivid, dream-like experiences occurring when falling asleep (hypnagogic) or waking up (hypnopompic). Often visual but can involve any sense. Can be frightening and feel very real."
      },
      {
        name: "Disrupted nighttime sleep",
        description: "Despite excessive daytime sleepiness, many people with narcolepsy have fragmented nighttime sleep with frequent awakenings."
      },
      {
        name: "Automatic behaviors",
        description: "Continuing routine tasks (writing, driving, eating) during brief sleep episodes without awareness or memory of the activity."
      },
      {
        name: "Memory and concentration problems",
        description: "Difficulty focusing, memory lapses, and cognitive fog due to intrusion of sleep into wakefulness."
      }
    ],
    selfTestQuestions: [
      "Do you experience an irresistible urge to sleep during the day, even after adequate nighttime sleep?",
      "Have you ever experienced sudden muscle weakness or collapse triggered by laughter, surprise, or other emotions?",
      "Do you have vivid dreams or hallucinations as you fall asleep or wake up?",
      "Have you ever been unable to move or speak for seconds to minutes when falling asleep or waking?",
      "Do brief naps refresh you, but only temporarily?",
      "Do you have difficulty sleeping through the night despite being very sleepy during the day?"
    ],
    diagnosisOverview: "Diagnosis requires demonstration of excessive sleepiness and assessment for cataplexy and other symptoms. Sleep studies are essential for confirming the diagnosis and ruling out other causes of sleepiness.",
    diagnosticTests: [
      {
        name: "Polysomnography (Sleep Study)",
        description: "An overnight sleep study rules out other sleep disorders (especially sleep apnea) and documents sleep patterns. People with narcolepsy often enter REM sleep abnormally quickly."
      },
      {
        name: "Multiple Sleep Latency Test (MSLT)",
        description: "Conducted the day after polysomnography, the MSLT involves 4-5 scheduled nap opportunities. Narcolepsy is indicated by falling asleep in less than 8 minutes on average and entering REM sleep during 2 or more naps."
      },
      {
        name: "Cerebrospinal Fluid Hypocretin-1 Level",
        description: "A spinal tap to measure hypocretin levels can confirm Type 1 narcolepsy. Very low or absent levels are diagnostic, even without cataplexy."
      },
      {
        name: "HLA Typing",
        description: "Testing for HLA-DQB1*06:02, a genetic marker present in most people with Type 1 narcolepsy. However, this marker is also present in 25% of the general population, so it's not diagnostic alone."
      }
    ],
    treatmentOverview: "While there is no cure for narcolepsy, symptoms can be managed with medications and lifestyle modifications. Treatment is tailored to address the specific symptoms each person experiences.",
    treatments: [
      {
        name: "Stimulants and Wake-Promoting Medications",
        description: "Modafinil (Provigil) and armodafinil (Nuvigil) are first-line treatments for daytime sleepiness. Other options include solriamfetol (Sunosi), pitolisant (Wakix), and traditional stimulants like methylphenidate and amphetamines."
      },
      {
        name: "Sodium Oxybate (Xyrem, Xywav)",
        description: "Taken at night, sodium oxybate improves nighttime sleep and reduces both daytime sleepiness and cataplexy. It's one of the most effective treatments for narcolepsy but requires careful monitoring."
      },
      {
        name: "Antidepressants for Cataplexy",
        description: "SSRIs, SNRIs, and tricyclic antidepressants can suppress REM sleep and reduce cataplexy, sleep paralysis, and hallucinations. Common options include venlafaxine, fluoxetine, and clomipramine."
      },
      {
        name: "Scheduled Naps",
        description: "Planned short naps (15-20 minutes) at strategic times during the day can help manage sleepiness and reduce the need for higher medication doses."
      },
      {
        name: "Emerging Therapies",
        description: "Research continues on orexin replacement therapy and other novel approaches that may offer new treatment options in the future."
      }
    ],
    lifestyleChanges: [
      "Maintain a consistent sleep schedule, going to bed and waking at the same times daily",
      "Schedule short naps (15-20 minutes) during the day, especially before important activities",
      "Avoid alcohol, which can worsen symptoms",
      "Avoid caffeine close to bedtime",
      "Exercise regularly, but not too close to bedtime",
      "Inform teachers, employers, and others about your condition",
      "Be cautious with activities requiring alertness, especially driving",
      "Seek accommodations at work or school as needed under the ADA or IDEA",
      "Join a support group to connect with others who have narcolepsy"
    ],
    supportResources: [
      { name: "Narcolepsy Network", url: "https://narcolepsynetwork.org/" },
      { name: "Wake Up Narcolepsy", url: "https://www.wakeupnarcolepsy.org/" },
      { name: "Project Sleep", url: "https://project-sleep.com/" },
      { name: "Hypersomnia Foundation", url: "https://www.hypersomniafoundation.org/" }
    ],
    relatedDisorders: ["Idiopathic Hypersomnia", "Excessive Daytime Sleepiness", "Sleep Paralysis", "Kleine-Levin Syndrome"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "idiopathic-hypersomnia",
    name: "Idiopathic Hypersomnia",
    category: "Hypersomnias",
    description: "A chronic neurological sleep disorder characterized by excessive daytime sleepiness that is not explained by other conditions and not relieved by any amount of sleep.",
    overview: "Idiopathic Hypersomnia (IH) is a central disorder of hypersomnolence characterized by excessive daytime sleepiness despite getting adequate or even prolonged nighttime sleep. Unlike narcolepsy, people with IH do not have cataplexy and typically do not feel refreshed after naps. The term 'idiopathic' means the cause is unknown. A hallmark feature is severe difficulty waking up (sleep inertia or sleep drunkenness), with prolonged confusion and grogginess that can last hours after awakening.",
    prevalence: "Idiopathic hypersomnia is rare, affecting an estimated 20-50 per million people. It is less common than narcolepsy. Symptoms typically begin in adolescence or early adulthood (ages 15-25). It appears to affect men and women equally, though some studies suggest a slight female predominance.",
    causes: "The exact cause of idiopathic hypersomnia is unknown, hence the name 'idiopathic.' Current research suggests possible mechanisms including: abnormalities in the brain systems that regulate wakefulness, increased sensitivity to GABA (a neurotransmitter that promotes sleep), subtle abnormalities in circadian rhythm regulation, and possible genetic factors (IH can run in families). Unlike narcolepsy Type 1, hypocretin levels are typically normal.",
    symptoms: [
      {
        name: "Excessive daytime sleepiness",
        description: "Persistent, overwhelming sleepiness throughout the day despite adequate nighttime sleep. Unlike narcolepsy, the sleepiness is more constant rather than occurring in attacks."
      },
      {
        name: "Prolonged nighttime sleep",
        description: "Many people with IH sleep 10 or more hours per night without alarm clocks, yet still feel unrefreshed and excessively sleepy during the day."
      },
      {
        name: "Severe sleep inertia (sleep drunkenness)",
        description: "Extreme difficulty waking up, with prolonged confusion, grogginess, and impaired cognition lasting 30 minutes to several hours after awakening. Multiple alarm clocks are often needed."
      },
      {
        name: "Unrefreshing naps",
        description: "Unlike narcolepsy where naps are refreshing, naps in IH tend to be long (over an hour) and do not relieve sleepiness, often making the person feel worse."
      },
      {
        name: "Cognitive difficulties",
        description: "Brain fog, memory problems, difficulty concentrating, and slowed thinking due to chronic excessive sleepiness."
      },
      {
        name: "Automatic behaviors",
        description: "Performing routine tasks without full awareness or memory, similar to narcolepsy."
      },
      {
        name: "Other symptoms",
        description: "Headaches, dizziness, temperature regulation problems, and Raynaud-like symptoms have been reported in some patients."
      }
    ],
    selfTestQuestions: [
      "Do you feel excessively sleepy during the day despite sleeping 8 or more hours at night?",
      "Do you have extreme difficulty waking up, feeling confused or groggy for a long time after your alarm goes off?",
      "When you take naps, do they last a long time and fail to make you feel refreshed?",
      "Could you sleep for 10+ hours if you didn't set an alarm?",
      "Do you experience 'brain fog' or difficulty concentrating during the day?",
      "Have you been evaluated for other causes of sleepiness (sleep apnea, insufficient sleep) that have been ruled out?"
    ],
    diagnosisOverview: "Diagnosis requires ruling out other causes of excessive sleepiness and demonstrating hypersomnolence through sleep studies. The diagnosis is made when sleepiness is present but narcolepsy criteria are not met.",
    diagnosticTests: [
      {
        name: "Polysomnography",
        description: "An overnight sleep study to document sleep patterns and rule out other disorders like sleep apnea. People with IH typically have normal sleep architecture but may have prolonged total sleep time."
      },
      {
        name: "Multiple Sleep Latency Test (MSLT)",
        description: "Shows short sleep latency (falling asleep quickly) but unlike narcolepsy, there are fewer than 2 sleep-onset REM periods (SOREMPs). Mean sleep latency is typically 8 minutes or less."
      },
      {
        name: "Actigraphy and Sleep Logs",
        description: "Extended monitoring of sleep-wake patterns over 1-2 weeks helps document habitual sleep duration and timing."
      },
      {
        name: "Extended Sleep Monitoring",
        description: "Some centers use 24-hour or longer polysomnography to document prolonged total sleep time (over 11 hours in 24 hours)."
      }
    ],
    treatmentOverview: "Treatment is challenging as IH often responds less well to medications than narcolepsy. The FDA recently approved the first medication specifically for IH. Treatment focuses on improving alertness and managing sleep inertia.",
    treatments: [
      {
        name: "Modafinil and Armodafinil",
        description: "Wake-promoting agents often used as first-line treatment, though response is variable. May help reduce daytime sleepiness but often less effective than in narcolepsy."
      },
      {
        name: "Lower Sodium Oxybate (Xywav)",
        description: "FDA-approved specifically for idiopathic hypersomnia in 2021. Taken at night, it can improve daytime sleepiness and sleep inertia."
      },
      {
        name: "Traditional Stimulants",
        description: "Methylphenidate and amphetamines may be tried when other medications are insufficient. Higher doses may be needed than for narcolepsy."
      },
      {
        name: "Solriamfetol and Pitolisant",
        description: "Newer wake-promoting agents approved for narcolepsy that are sometimes used off-label for IH."
      },
      {
        name: "Flumazenil and Clarithromycin",
        description: "These medications, which may counteract GABA-related hypersomnia, have shown benefit in some research studies but are not FDA-approved for IH."
      }
    ],
    lifestyleChanges: [
      "Maintain very consistent sleep and wake times",
      "Use multiple alarms, including ones that require getting out of bed",
      "Consider light therapy in the morning to help with waking",
      "Have accountability partners help with waking up",
      "Be cautious with driving, especially in the morning or when sleepy",
      "Communicate with employers about your condition and need for accommodations",
      "Avoid jobs requiring early morning starts or safety-critical alertness",
      "Connect with others who have IH through support groups"
    ],
    supportResources: [
      { name: "Hypersomnia Foundation", url: "https://www.hypersomniafoundation.org/" },
      { name: "Project Sleep", url: "https://project-sleep.com/" }
    ],
    relatedDisorders: ["Narcolepsy", "Excessive Daytime Sleepiness", "Insufficient Sleep Syndrome"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "excessive-daytime-sleepiness",
    name: "Excessive Daytime Sleepiness",
    category: "Hypersomnias",
    description: "A persistent feeling of drowsiness during the day that interferes with alertness and daily activities, which can be a symptom of various underlying conditions.",
    overview: "Excessive Daytime Sleepiness (EDS) is not a disorder itself but a symptom characterized by persistent drowsiness and a tendency to fall asleep during the day, even after apparently adequate nighttime sleep. EDS can result from many underlying causes including insufficient sleep, sleep disorders (sleep apnea, narcolepsy), medications, medical conditions, and psychiatric disorders. It significantly impacts quality of life, safety, and performance. Identifying and treating the underlying cause is essential for effective management.",
    prevalence: "Excessive daytime sleepiness is very common, affecting approximately 10-25% of the general population depending on the definition used. It is a leading cause of motor vehicle accidents and workplace injuries. EDS increases with age and is more common in people who are overweight, have chronic medical conditions, or work shifts.",
    causes: "EDS has many potential causes: insufficient sleep (the most common cause), sleep disorders (obstructive sleep apnea, narcolepsy, idiopathic hypersomnia, restless legs syndrome), circadian rhythm disorders, medications (antihistamines, antidepressants, antipsychotics, pain medications, muscle relaxants), medical conditions (hypothyroidism, anemia, heart failure, kidney disease, chronic pain), neurological conditions (Parkinson's disease, multiple sclerosis, traumatic brain injury), and psychiatric conditions (depression, anxiety). Multiple factors often contribute.",
    symptoms: [
      {
        name: "Difficulty staying awake",
        description: "Struggling to maintain alertness during sedentary activities like reading, watching TV, or sitting in meetings."
      },
      {
        name: "Falling asleep at inappropriate times",
        description: "Dozing off during activities that normally require attention, such as conversations, meals, or even driving."
      },
      {
        name: "Difficulty waking up",
        description: "Struggling to get out of bed in the morning despite adequate sleep time, requiring multiple alarms."
      },
      {
        name: "Mental cloudiness",
        description: "Feeling foggy-headed, having difficulty concentrating, and experiencing slowed thinking."
      },
      {
        name: "Memory problems",
        description: "Difficulty retaining new information and recalling learned material."
      },
      {
        name: "Irritability and mood changes",
        description: "Sleepiness can manifest as irritability, low motivation, or depressed mood."
      },
      {
        name: "Reduced motivation and energy",
        description: "Lack of drive to engage in usual activities, feeling tired and low on energy throughout the day."
      }
    ],
    selfTestQuestions: [
      "Do you feel sleepy or struggle to stay awake during the day, even after sleeping enough at night?",
      "Do you fall asleep or fight drowsiness during passive activities like reading or watching TV?",
      "Have you ever nodded off while driving or doing other activities requiring attention?",
      "Do you need caffeine or naps to get through the day?",
      "Does your sleepiness interfere with work, social activities, or quality of life?",
      "Do you snore loudly or has anyone observed you stop breathing during sleep?"
    ],
    diagnosisOverview: "Evaluation of EDS requires a thorough assessment to identify underlying causes. This includes detailed history, physical examination, and often sleep testing to evaluate for disorders like sleep apnea or narcolepsy.",
    diagnosticTests: [
      {
        name: "Sleep History and Diary",
        description: "Detailed assessment of sleep habits, sleep duration, timing, quality, and daytime symptoms helps identify insufficient sleep or poor sleep hygiene."
      },
      {
        name: "Epworth Sleepiness Scale",
        description: "A validated questionnaire that quantifies subjective sleepiness by asking about the likelihood of dozing in various situations. Scores above 10 indicate significant sleepiness."
      },
      {
        name: "Polysomnography",
        description: "An overnight sleep study evaluates for sleep apnea, periodic limb movements, and other sleep disorders that may cause EDS."
      },
      {
        name: "Multiple Sleep Latency Test (MSLT)",
        description: "If narcolepsy or idiopathic hypersomnia is suspected, the MSLT measures how quickly you fall asleep and whether you enter REM sleep abnormally."
      },
      {
        name: "Blood Tests",
        description: "Testing for thyroid function, iron/ferritin, vitamin levels, and other labs helps identify medical causes of fatigue and sleepiness."
      },
      {
        name: "Actigraphy",
        description: "A wrist-worn device tracks sleep-wake patterns over days to weeks, objectively documenting sleep duration and timing."
      }
    ],
    treatmentOverview: "Treatment targets the underlying cause. This may involve treating a sleep disorder, adjusting medications, addressing medical conditions, or improving sleep habits. When the cause is unclear or untreatable, symptomatic treatment may be used.",
    treatments: [
      {
        name: "Treat Underlying Sleep Disorders",
        description: "If sleep apnea is present, CPAP therapy often dramatically improves sleepiness. Other sleep disorders require their specific treatments."
      },
      {
        name: "Extend Sleep Time",
        description: "For insufficient sleep, the most effective treatment is simply getting more sleep by prioritizing sleep time and improving sleep efficiency."
      },
      {
        name: "Medication Review",
        description: "Adjusting or substituting sedating medications when possible, timing doses appropriately, or using less sedating alternatives."
      },
      {
        name: "Treat Medical Conditions",
        description: "Managing conditions like hypothyroidism, anemia, depression, or chronic pain that contribute to sleepiness."
      },
      {
        name: "Wake-Promoting Medications",
        description: "When the cause cannot be fully addressed, modafinil, armodafinil, solriamfetol, or stimulants may be prescribed to improve alertness."
      },
      {
        name: "Strategic Caffeine Use",
        description: "Moderate caffeine use timed appropriately (not late in the day) can help manage mild sleepiness."
      }
    ],
    lifestyleChanges: [
      "Prioritize sleep by allocating 7-9 hours for adults, 8-10 for teenagers",
      "Maintain consistent sleep and wake times",
      "Create an optimal sleep environment (dark, quiet, cool)",
      "Limit caffeine to morning hours and moderate amounts",
      "Avoid alcohol, which disrupts sleep quality",
      "Exercise regularly, which improves sleep and alertness",
      "Take brief scheduled naps if needed (15-20 minutes)",
      "Get bright light exposure, especially in the morning",
      "Evaluate and reduce sedating medications when possible",
      "Be cautious with driving or operating machinery when sleepy"
    ],
    relatedDisorders: ["Obstructive Sleep Apnea", "Narcolepsy", "Idiopathic Hypersomnia", "Insufficient Sleep Syndrome", "Depression"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "kleine-levin-syndrome",
    name: "Kleine-Levin Syndrome",
    category: "Hypersomnias",
    description: "A rare disorder characterized by recurring episodes of excessive sleep, altered behavior, and a reduced understanding of the world, interspersed with periods of normal function.",
    overview: "Kleine-Levin Syndrome (KLS) is a rare and complex neurological disorder characterized by recurring episodes of excessive sleep (hypersomnia), cognitive disturbances, and behavioral changes. During episodes, patients may sleep up to 20 hours per day and experience altered perception of reality, compulsive eating, and disinhibited behavior. Episodes typically last days to weeks and recur over years. Between episodes, patients are completely normal with no residual symptoms. The disorder most commonly begins in adolescence and often improves or resolves in adulthood.",
    prevalence: "KLS is very rare, affecting approximately 1-5 per million people. It is about 2-3 times more common in males than females. Onset is typically in adolescence (median age 15), though it can occur at any age. Jewish individuals appear to have higher prevalence, suggesting possible genetic factors. Episodes typically decrease in frequency and severity over 8-14 years, with many patients eventually experiencing complete resolution.",
    causes: "The exact cause of KLS is unknown. Current theories include: autoimmune or post-infectious inflammation affecting the hypothalamus and thalamus, genetic predisposition (HLA-DQB1*02 association), dysfunction of the brain's arousal and regulatory centers, and possible viral triggers (about 70% of patients report infection before first episode). The hypothalamus, which regulates sleep, appetite, and behavior, appears to be a key area of dysfunction.",
    symptoms: [
      {
        name: "Prolonged sleep (hypersomnia)",
        description: "During episodes, patients sleep 15-21 hours per day, waking only to eat and use the bathroom. They are difficult to arouse and quickly fall back asleep."
      },
      {
        name: "Cognitive dysfunction",
        description: "Confusion, feeling as if in a dream, difficulty with attention, memory impairment, and slowed thinking characterize episodes. Patients may have difficulty with speech."
      },
      {
        name: "Derealization",
        description: "The world feels unreal or dreamlike. Patients describe feeling detached from themselves and their environment."
      },
      {
        name: "Compulsive eating (hyperphagia)",
        description: "About 75% of patients experience excessive eating, particularly craving sweets, during episodes. They may eat everything available without satiation."
      },
      {
        name: "Hypersexuality",
        description: "Inappropriate sexual behaviors or disinhibition occur in about 50% of patients during episodes, more commonly in males."
      },
      {
        name: "Mood changes",
        description: "Apathy, depression, childish behavior, and irritability are common during episodes. Some patients become aggressive."
      },
      {
        name: "Complete normalcy between episodes",
        description: "Between episodes, patients have no symptoms and function completely normally. This periodicity is a hallmark of the disorder."
      }
    ],
    selfTestQuestions: [
      "Have you experienced distinct episodes where you sleep 15+ hours per day for days or weeks, then return to completely normal?",
      "During these episodes, do you feel confused, dreamlike, or disconnected from reality?",
      "Do you have uncontrollable urges to eat during episodes?",
      "Did your first episode occur in your teenage years, possibly after an illness?",
      "Between episodes, do you feel and function completely normally?",
      "Have episodes recurred multiple times over months or years?"
    ],
    diagnosisOverview: "Diagnosis is clinical, based on the characteristic pattern of recurring episodes with hypersomnia and cognitive/behavioral changes, with complete normalcy between episodes. Other causes must be excluded.",
    diagnosticTests: [
      {
        name: "Clinical History",
        description: "Detailed documentation of episode characteristics, duration, frequency, and symptoms is the primary diagnostic tool. The pattern of complete normalcy between episodes is key."
      },
      {
        name: "Brain Imaging (MRI)",
        description: "MRI is typically normal in KLS but is performed to rule out other causes such as tumors, encephalitis, or stroke."
      },
      {
        name: "EEG",
        description: "Electroencephalogram may show generalized slowing during episodes but is typically normal between episodes. Helps rule out epilepsy."
      },
      {
        name: "Lumbar Puncture",
        description: "Cerebrospinal fluid analysis may be performed to rule out infectious or inflammatory causes, particularly during first episode."
      },
      {
        name: "Toxicology Screen",
        description: "Drug testing helps exclude substance-induced states that can mimic KLS symptoms."
      },
      {
        name: "SPECT/PET Imaging",
        description: "Research studies show decreased blood flow/metabolism in thalamus and hypothalamus during episodes, but these tests are not routinely available."
      }
    ],
    treatmentOverview: "There is no proven treatment to prevent or shorten KLS episodes. Management is supportive during episodes, with some medications tried to prevent recurrences. The prognosis is generally favorable as most cases eventually resolve.",
    treatments: [
      {
        name: "Supportive Care During Episodes",
        description: "Patients need supervision and support during episodes. They should not drive, attend school, or work. Safety monitoring is important given altered judgment."
      },
      {
        name: "Lithium",
        description: "The most commonly used preventive treatment, lithium may reduce episode frequency and duration in some patients, though evidence is limited."
      },
      {
        name: "Antiepileptic Medications",
        description: "Valproate and carbamazepine have been tried for prevention with variable success."
      },
      {
        name: "Stimulants",
        description: "Amphetamines or modafinil during episodes may help with wakefulness but typically don't affect cognitive symptoms. They don't prevent episodes."
      },
      {
        name: "Amantadine",
        description: "Some reports suggest amantadine may help during acute episodes or as preventive therapy."
      }
    ],
    lifestyleChanges: [
      "Learn to recognize prodromal symptoms that may signal an upcoming episode",
      "Create a safe environment for episodes (someone to supervise, no driving)",
      "Inform school or work about the condition and need for absences during episodes",
      "Avoid triggers when possible (some patients identify specific triggers)",
      "Maintain good general health to potentially reduce episode frequency",
      "Keep a diary of episodes to track patterns",
      "Connect with KLS support organizations and other families"
    ],
    supportResources: [
      { name: "KLS Foundation", url: "https://klsfoundation.org/" },
      { name: "Kleine-Levin Syndrome Support UK", url: "https://www.kls-support.org.uk/" }
    ],
    relatedDisorders: ["Narcolepsy", "Idiopathic Hypersomnia", "Recurrent Hypersomnia"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "insufficient-sleep-syndrome",
    name: "Insufficient Sleep Syndrome",
    category: "Hypersomnias",
    description: "A disorder resulting from chronically failing to obtain enough sleep, leading to excessive daytime sleepiness despite having the ability to sleep more.",
    overview: "Insufficient Sleep Syndrome (ISS), also called behaviorally induced insufficient sleep syndrome, occurs when a person regularly fails to get enough sleep to maintain normal levels of alertness during the day. Unlike insomnia, people with ISS have the ability to sleep more but choose not to due to lifestyle factors, work demands, social activities, or misunderstanding of sleep needs. This chronic voluntary sleep restriction leads to a 'sleep debt' and significant daytime consequences. ISS is extremely common in modern society, particularly among adolescents, shift workers, and high-demand professionals.",
    prevalence: "Insufficient sleep is epidemic in modern society. The CDC reports that 1 in 3 American adults don't get enough sleep. Among adolescents, over 70% get less than the recommended 8-10 hours. ISS is the most common cause of excessive daytime sleepiness seen in sleep clinics. It affects people of all ages but is particularly prevalent in teenagers, young adults, and those with demanding work schedules.",
    causes: "ISS is caused by voluntary sleep curtailment due to: work demands (long hours, multiple jobs), academic pressures, social and leisure activities extending into sleep time, use of electronic devices at night, poor understanding of sleep needs, cultural attitudes that undervalue sleep, caregiving responsibilities, and prioritizing other activities over sleep. It is particularly common in societies that view less sleep as a sign of productivity or success.",
    symptoms: [
      {
        name: "Excessive daytime sleepiness",
        description: "Persistent drowsiness and difficulty staying awake during the day, particularly during sedentary activities. May need caffeine or naps to function."
      },
      {
        name: "Difficulty waking in the morning",
        description: "Needing multiple alarms, hitting snooze repeatedly, and feeling groggy upon awakening (sleep inertia)."
      },
      {
        name: "Sleeping much longer on weekends/days off",
        description: "Sleeping 2 or more hours longer when given the opportunity, attempting to 'catch up' on missed sleep."
      },
      {
        name: "Cognitive impairment",
        description: "Difficulty concentrating, memory problems, poor decision-making, and reduced reaction times due to chronic sleep deprivation."
      },
      {
        name: "Mood disturbances",
        description: "Irritability, mood swings, increased anxiety, and depressive symptoms commonly accompany chronic sleep insufficiency."
      },
      {
        name: "Reduced performance",
        description: "Decreased productivity, more errors, and impaired performance at work or school."
      },
      {
        name: "Physical symptoms",
        description: "Increased appetite (especially for high-calorie foods), weight gain, and increased susceptibility to illness."
      }
    ],
    selfTestQuestions: [
      "Do you regularly sleep less than 7 hours per night (for adults) or less than 8-10 hours (for teens)?",
      "Do you sleep significantly longer on weekends or days off compared to workdays?",
      "Do you rely on alarm clocks to wake up rather than waking naturally?",
      "Do you feel you could fall asleep quickly if given the opportunity during the day?",
      "Do you rely on caffeine to maintain alertness?",
      "Has increasing your sleep time improved your daytime alertness?"
    ],
    diagnosisOverview: "Diagnosis requires documenting that the person is not obtaining their biological sleep need, that they have the ability to sleep more, and that extending sleep time improves symptoms. Other sleep disorders must be excluded.",
    diagnosticTests: [
      {
        name: "Sleep History and Diary",
        description: "Detailed assessment of typical sleep schedule on work days versus days off, revealing the discrepancy between habitual and needed sleep."
      },
      {
        name: "Actigraphy",
        description: "Wrist-worn activity monitoring over 1-2 weeks objectively documents sleep patterns and duration."
      },
      {
        name: "Sleep Extension Trial",
        description: "The diagnostic 'test' - extending sleep time for 1-2 weeks and documenting improvement in daytime symptoms confirms ISS."
      },
      {
        name: "Epworth Sleepiness Scale",
        description: "Questionnaire documenting the degree of daytime sleepiness before and after sleep extension."
      },
      {
        name: "Polysomnography and MSLT",
        description: "If another sleep disorder is suspected (especially sleep apnea or narcolepsy), sleep studies may be performed to rule these out."
      }
    ],
    treatmentOverview: "The treatment is straightforward but often challenging to implement: obtain adequate sleep. This requires understanding sleep needs, prioritizing sleep, and making lifestyle changes to allow sufficient time for sleep.",
    treatments: [
      {
        name: "Sleep Extension",
        description: "Gradually increasing sleep time by 15-30 minutes until reaching the biological sleep need (typically 7-9 hours for adults). Improvement confirms the diagnosis and is the treatment."
      },
      {
        name: "Sleep Prioritization",
        description: "Recognizing sleep as essential rather than optional, and scheduling adequate sleep time as non-negotiable."
      },
      {
        name: "Lifestyle Restructuring",
        description: "Identifying and modifying activities that encroach on sleep time, such as limiting evening screen time, reducing evening commitments, or adjusting work schedules."
      },
      {
        name: "Education",
        description: "Understanding the serious health and safety consequences of chronic sleep insufficiency often motivates change."
      },
      {
        name: "Caffeine Management",
        description: "While caffeine provides temporary alertness, it doesn't replace sleep. Caffeine use should be limited, especially in the afternoon."
      }
    ],
    lifestyleChanges: [
      "Calculate your sleep need (most adults need 7-9 hours; teens need 8-10)",
      "Set a consistent bedtime that allows for adequate sleep",
      "Create a wind-down routine 30-60 minutes before bed",
      "Limit evening activities and social media use",
      "Make sleep a priority equal to work, exercise, and social commitments",
      "Gradually shift bedtime earlier if needed",
      "Avoid 'catching up' on sleep only on weekends - consistent sleep is better",
      "Track your sleep and energy levels to find your optimal sleep duration",
      "Educate family, employers, and yourself about sleep importance"
    ],
    relatedDisorders: ["Excessive Daytime Sleepiness", "Poor Sleep Hygiene", "Shift Work Disorder"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
