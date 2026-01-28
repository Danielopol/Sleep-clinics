import { SleepDisorderContent } from '../sleep-disorders-content'

export const circadianDisorders: SleepDisorderContent[] = [
  {
    slug: "circadian-rhythm-disorders",
    name: "Circadian Rhythm Disorders",
    category: "Circadian Rhythm Disorders",
    description: "A group of sleep disorders that occur when the body's internal clock is misaligned with the external environment, disrupting the normal sleep-wake cycle.",
    overview: "Circadian rhythm sleep disorders occur when there is a mismatch between a person's internal biological clock and the external environment's light-dark cycle. The circadian rhythm is an approximately 24-hour internal clock that regulates the timing of sleep, wakefulness, hormone release, body temperature, and other physiological processes. When this internal timing system is disrupted or misaligned with desired or required sleep times, it leads to difficulty sleeping at conventional times, excessive sleepiness, and impaired daytime functioning.",
    prevalence: "Circadian rhythm disorders collectively affect an estimated 3% of the adult population. Specific types vary in prevalence: delayed sleep phase disorder is most common in adolescents (7-16%), shift work disorder affects 10-40% of shift workers, and jet lag is experienced by most long-distance travelers. Non-24-hour sleep-wake disorder is rare in sighted individuals but very common in totally blind people (50-70%).",
    causes: "Circadian rhythm disorders result from: genetic factors affecting the molecular clock, environmental influences (light exposure patterns, work schedules), behavioral factors (lifestyle choices affecting light exposure), aging (changes in circadian timing with age), medical conditions affecting the brain's circadian center (suprachiasmatic nucleus), blindness (lack of light input to the circadian system), and lifestyle factors conflicting with the internal clock.",
    types: [
      {
        name: "Delayed Sleep Phase Disorder",
        description: "Sleep and wake times are significantly later than desired or socially acceptable, typically falling asleep after 2 AM and waking in late morning or afternoon."
      },
      {
        name: "Advanced Sleep Phase Disorder",
        description: "Sleep and wake times are significantly earlier than desired, typically falling asleep in early evening and waking very early in the morning."
      },
      {
        name: "Shift Work Disorder",
        description: "Insomnia and/or excessive sleepiness related to work schedules that overlap with normal sleep times."
      },
      {
        name: "Jet Lag Disorder",
        description: "Temporary mismatch between internal clock and local time zone after rapid travel across time zones."
      },
      {
        name: "Non-24-Hour Sleep-Wake Disorder",
        description: "The internal clock runs longer than 24 hours, causing sleep times to progressively shift later each day."
      },
      {
        name: "Irregular Sleep-Wake Rhythm",
        description: "No clear circadian pattern, with sleep occurring in multiple short bouts across the 24-hour day."
      }
    ],
    symptoms: [
      {
        name: "Difficulty sleeping at desired times",
        description: "Inability to fall asleep or wake up at times required for work, school, or social obligations."
      },
      {
        name: "Excessive sleepiness",
        description: "Sleepiness during times when wakefulness is required, due to sleeping at biologically inappropriate times."
      },
      {
        name: "Insomnia symptoms",
        description: "Difficulty initiating or maintaining sleep when attempting to sleep at times that conflict with the internal clock."
      },
      {
        name: "Impaired daytime functioning",
        description: "Difficulty with concentration, memory, mood, and performance due to chronic circadian misalignment."
      },
      {
        name: "Mood disturbances",
        description: "Depression, irritability, and anxiety are common, as circadian rhythms also regulate mood."
      },
      {
        name: "Gastrointestinal symptoms",
        description: "Appetite changes, nausea, and digestive issues may occur when eating at times misaligned with the internal clock."
      }
    ],
    selfTestQuestions: [
      "Do you have difficulty falling asleep and waking up at the times you need to?",
      "If allowed to sleep on your own schedule, would your sleep times be very different from societal norms?",
      "Do you work night shifts or rotating shifts and struggle with sleep?",
      "Have you recently traveled across multiple time zones?",
      "Does your natural sleep schedule seem to shift later each day?",
      "Do you feel unable to maintain a consistent sleep schedule?"
    ],
    diagnosisOverview: "Diagnosis involves documenting the sleep-wake pattern over time, typically with sleep diaries and actigraphy, and establishing that the pattern is stable (in the case of phase disorders) or progressively shifting (in the case of non-24-hour disorder).",
    diagnosticTests: [
      {
        name: "Sleep Diary",
        description: "A 2-4 week log of sleep times, wake times, and symptoms documents the circadian pattern and its relationship to symptoms."
      },
      {
        name: "Actigraphy",
        description: "A wrist-worn device tracking movement over 1-2 weeks provides objective data on sleep-wake timing and variability."
      },
      {
        name: "Chronotype Questionnaires",
        description: "Standardized questionnaires (like the MEQ) assess whether a person is a natural 'morning type' or 'evening type.'"
      },
      {
        name: "Dim Light Melatonin Onset (DLMO)",
        description: "Measuring when melatonin begins to rise in dim light conditions provides a marker of circadian timing. Available at some specialized centers."
      },
      {
        name: "Core Body Temperature Rhythm",
        description: "The timing of the body temperature minimum provides another circadian marker, used primarily in research settings."
      }
    ],
    treatmentOverview: "Treatment aims to realign the internal clock with desired sleep times using light therapy, melatonin, behavioral changes, and sometimes medications. The specific approach depends on the type of circadian disorder.",
    treatments: [
      {
        name: "Light Therapy",
        description: "Timed bright light exposure (using a light box or natural sunlight) can shift the circadian clock earlier (morning light) or later (evening light)."
      },
      {
        name: "Melatonin",
        description: "Appropriately timed low-dose melatonin can help shift the circadian clock. Morning melatonin delays the clock; evening melatonin advances it."
      },
      {
        name: "Chronotherapy",
        description: "Progressively shifting sleep times around the clock until reaching the desired schedule. Effective but impractical for many people."
      },
      {
        name: "Sleep Schedule Adjustment",
        description: "Gradually shifting bedtime and wake time in small increments (15-30 minutes) toward the desired schedule."
      },
      {
        name: "Strategic Light Avoidance",
        description: "Avoiding bright light at times that would shift the clock in the wrong direction (e.g., avoiding morning light in delayed sleep phase)."
      }
    ],
    lifestyleChanges: [
      "Maintain consistent sleep and wake times, even on weekends",
      "Get bright light exposure at strategic times based on your specific disorder",
      "Avoid bright light (especially blue light) at times that worsen your circadian misalignment",
      "Use blue light blocking glasses in the evening if you have delayed sleep phase",
      "Keep a regular meal schedule aligned with desired sleep times",
      "Exercise at appropriate times (generally helpful in the morning)",
      "Create a dark, quiet sleep environment",
      "Limit caffeine, especially in the hours before desired sleep time"
    ],
    relatedDisorders: ["Delayed Sleep Phase Disorder", "Advanced Sleep Phase Disorder", "Shift Work Disorder", "Jet Lag", "Insomnia"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "delayed-sleep-phase-disorder",
    name: "Delayed Sleep Phase Disorder",
    category: "Circadian Rhythm Disorders",
    description: "A circadian rhythm disorder where the sleep-wake cycle is delayed by two or more hours beyond conventional times, causing difficulty falling asleep and waking at required times.",
    overview: "Delayed Sleep Phase Disorder (DSPD) is a circadian rhythm sleep disorder in which a person's internal clock is set significantly later than is socially acceptable or personally desired. Individuals with DSPD have great difficulty falling asleep before 2-6 AM and, if undisturbed, would naturally sleep until late morning or afternoon. When forced to wake early for work or school, they experience severe sleep deprivation. Importantly, when allowed to sleep on their natural schedule, their sleep is normal in quality and duration. DSPD is not simply being a 'night owl' by choice—it reflects a genuine misalignment of the biological clock.",
    prevalence: "DSPD is most common in adolescents and young adults, affecting an estimated 7-16% of teenagers. Among adults, prevalence is approximately 0.2-10% depending on the population studied. There is a strong genetic component, with the disorder running in families. DSPD is more common in individuals with depression, ADHD, and OCD. Many cases that begin in adolescence resolve by early adulthood, but some persist lifelong.",
    causes: "DSPD results from a combination of factors: genetic variants affecting circadian clock genes (particularly PER3, CLOCK, CRY1), an intrinsically longer circadian period (internal day longer than 24 hours), reduced sensitivity to morning light, increased sensitivity to evening light exposure, and behavioral factors (late-night screen use, irregular schedules) that reinforce the delay. The disorder often emerges during puberty when circadian timing naturally shifts later.",
    symptoms: [
      {
        name: "Inability to fall asleep at conventional times",
        description: "Lying awake for hours despite attempting to sleep at normal bedtimes (10-11 PM). Sleep onset typically doesn't occur until 2-6 AM."
      },
      {
        name: "Extreme difficulty waking in the morning",
        description: "Feeling unable to wake up at required times, often sleeping through multiple alarms. Morning awakening feels extremely difficult and unnatural."
      },
      {
        name: "Daytime sleepiness when sleep-deprived",
        description: "When forced to wake early, severe sleepiness, cognitive impairment, and fatigue occur due to truncated sleep."
      },
      {
        name: "Normal sleep on own schedule",
        description: "When allowed to sleep and wake naturally (e.g., weekends, vacations), sleep is normal in quality and duration, typically 7-9 hours."
      },
      {
        name: "Academic or occupational impairment",
        description: "Chronic sleep deprivation from early obligations leads to poor performance, absenteeism, and difficulty functioning."
      },
      {
        name: "Weekend 'sleep rebound'",
        description: "Sleeping much later on weekends (until noon or later) to make up for workweek sleep deprivation."
      },
      {
        name: "Depression and anxiety",
        description: "Mood disorders are common, partly due to chronic sleep deprivation and partly sharing underlying mechanisms with DSPD."
      }
    ],
    selfTestQuestions: [
      "Do you have difficulty falling asleep before 2 AM most nights?",
      "When you don't have to wake up for obligations, do you naturally sleep until late morning or afternoon?",
      "Is your sleep normal in quality and duration when you can sleep on your own schedule?",
      "Have you struggled with this pattern for months or years?",
      "Do you feel most alert and productive late in the evening?",
      "Do you sleep significantly later on weekends than weekdays?"
    ],
    diagnosisOverview: "Diagnosis requires documenting a stable pattern of delayed sleep timing over at least one month, with normal sleep when allowed to follow the delayed schedule. Sleep diaries and actigraphy are essential diagnostic tools.",
    diagnosticTests: [
      {
        name: "Sleep Diary (2+ weeks)",
        description: "Documenting sleep and wake times, showing a consistent pattern of late sleep onset and late waking when unconstrained."
      },
      {
        name: "Actigraphy (1-2 weeks)",
        description: "Objective confirmation of delayed sleep-wake timing patterns and the difference between workdays and free days."
      },
      {
        name: "Chronotype Questionnaire (MEQ)",
        description: "Assessing morningness-eveningness preference to characterize circadian tendency."
      },
      {
        name: "Dim Light Melatonin Onset (DLMO)",
        description: "If available, this test confirms that melatonin secretion begins much later than normal (typically after midnight in DSPD)."
      },
      {
        name: "Polysomnography",
        description: "Not routinely needed for DSPD but may be performed to rule out other sleep disorders if there are additional symptoms."
      }
    ],
    treatmentOverview: "Treatment aims to gradually advance (shift earlier) the circadian clock using light therapy, melatonin, and behavioral changes. Treatment requires ongoing maintenance as the natural tendency is to shift later again.",
    treatments: [
      {
        name: "Morning Bright Light Therapy",
        description: "Exposure to bright light (2,500-10,000 lux) for 30-60 minutes immediately upon waking helps advance the circadian clock. A light box or natural sunlight can be used."
      },
      {
        name: "Evening Light Avoidance",
        description: "Reducing light exposure, especially blue light from screens, in the 2-3 hours before desired bedtime helps prevent further circadian delays."
      },
      {
        name: "Melatonin (Low Dose, Timed)",
        description: "Low-dose melatonin (0.5-3 mg) taken 4-6 hours before desired bedtime can help advance the clock. Timing is more important than dose."
      },
      {
        name: "Gradual Schedule Advancement",
        description: "Shifting bedtime and wake time 15-30 minutes earlier every few days until reaching the target schedule."
      },
      {
        name: "Chronotherapy",
        description: "Delaying sleep progressively (by 2-3 hours each day) around the clock until reaching desired timing. Effective but disruptive and requires several days of schedule freedom."
      },
      {
        name: "Lifestyle Alignment",
        description: "When possible, choosing work/school schedules that accommodate later natural sleep timing can dramatically improve quality of life."
      }
    ],
    lifestyleChanges: [
      "Use a bright light box or get outdoor light immediately upon waking",
      "Wear blue light blocking glasses 2-3 hours before desired bedtime",
      "Avoid screens (phone, computer, TV) in the hour before bed",
      "Maintain the same wake time 7 days a week (this is crucial)",
      "Exercise in the morning, which helps advance circadian timing",
      "Take melatonin 4-6 hours before desired sleep time",
      "Create darkness in the bedroom and use blackout curtains",
      "Consider careers or schedules that allow later start times",
      "Be patient - shifting the clock takes weeks and requires ongoing maintenance"
    ],
    relatedDisorders: ["Circadian Rhythm Disorders", "Insomnia", "Non-24-Hour Sleep-Wake Disorder", "Excessive Daytime Sleepiness"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "advanced-sleep-phase-disorder",
    name: "Advanced Sleep Phase Disorder",
    category: "Circadian Rhythm Disorders",
    description: "A circadian rhythm disorder where the sleep-wake cycle is advanced by several hours, causing early evening sleepiness and very early morning awakening.",
    overview: "Advanced Sleep Phase Disorder (ASPD) is a circadian rhythm sleep disorder in which a person's internal clock is set significantly earlier than desired or socially practical. Individuals with ASPD feel compelled to sleep in the early evening (6-9 PM) and wake very early in the morning (2-5 AM). While their sleep is normal in quality and duration, the timing conflicts with work, social activities, and family life. ASPD is the opposite of delayed sleep phase disorder and is more common in older adults.",
    prevalence: "ASPD is relatively rare, affecting approximately 1% of middle-aged adults. It is more common with advancing age, as circadian timing tends to shift earlier with aging. The disorder can run in families, with some cases linked to specific genetic mutations. Unlike the natural tendency toward 'morning type' that develops with aging, ASPD involves pathologically early sleep timing that causes significant impairment.",
    causes: "ASPD results from an abnormally short intrinsic circadian period (internal day shorter than 24 hours), genetic mutations in clock genes (particularly PER2 and CRY2), and altered sensitivity to light timing cues. A familial form (FASPS - Familial Advanced Sleep Phase Syndrome) has been identified with autosomal dominant inheritance. Age-related changes in circadian timing may also contribute, as older adults naturally tend toward earlier schedules.",
    symptoms: [
      {
        name: "Early evening sleepiness",
        description: "Overwhelming sleepiness in the early evening (6-8 PM), making it difficult to stay awake for evening activities, social events, or family time."
      },
      {
        name: "Early morning awakening",
        description: "Waking very early (2-5 AM) and being unable to return to sleep, despite desiring more sleep."
      },
      {
        name: "Normal sleep when following natural schedule",
        description: "If allowed to sleep from early evening to early morning, sleep quality and duration are normal."
      },
      {
        name: "Difficulty with evening social activities",
        description: "Missing evening social events, dinner parties, and family activities due to irresistible sleepiness."
      },
      {
        name: "Early morning loneliness",
        description: "Waking hours before others in the household, potentially leading to isolation during early morning hours."
      },
      {
        name: "Sleep deprivation if fighting the schedule",
        description: "Forcing oneself to stay up late leads to sleep deprivation since early awakening persists regardless."
      }
    ],
    selfTestQuestions: [
      "Do you feel very sleepy in the early evening and struggle to stay awake past 8 PM?",
      "Do you wake up very early (before 5 AM) and find it impossible to go back to sleep?",
      "Has this pattern persisted for months or years?",
      "Is your sleep normal and refreshing when you follow your natural early schedule?",
      "Does this pattern cause problems with evening work, social life, or family time?",
      "Do you have family members with similar extremely early sleep patterns?"
    ],
    diagnosisOverview: "Diagnosis involves documenting persistently early sleep and wake times through sleep diaries and actigraphy, confirming normal sleep when following the advanced schedule, and ruling out other causes of early awakening such as depression.",
    diagnosticTests: [
      {
        name: "Sleep Diary",
        description: "A 2+ week log showing consistent early evening sleep onset (typically before 8-9 PM) and early morning awakening (before 5 AM)."
      },
      {
        name: "Actigraphy",
        description: "Wrist-worn monitoring for 1-2 weeks objectively confirms early and stable sleep-wake timing."
      },
      {
        name: "DLMO (Dim Light Melatonin Onset)",
        description: "When available, confirms abnormally early timing of melatonin secretion, consistent with the advanced circadian phase."
      },
      {
        name: "Polysomnography",
        description: "Not typically needed unless there's concern for sleep apnea or other disorders. Would show early sleep onset and normal sleep architecture."
      },
      {
        name: "Depression Screening",
        description: "Depression can cause early morning awakening and should be ruled out, though it typically differs from ASPD in presentation."
      }
    ],
    treatmentOverview: "Treatment aims to delay (shift later) the circadian clock using evening light therapy, avoiding morning light, and sometimes low-dose melatonin in the morning. Maintaining the shift requires ongoing intervention.",
    treatments: [
      {
        name: "Evening Bright Light Therapy",
        description: "Exposure to bright light (2,500-10,000 lux) in the evening, typically 2-3 hours before the undesired early sleep time, helps delay the circadian clock."
      },
      {
        name: "Morning Light Avoidance",
        description: "Avoiding bright light in the early morning (using dark glasses or staying indoors) prevents further circadian advance."
      },
      {
        name: "Morning Melatonin",
        description: "Low-dose melatonin taken in the morning (upon awakening) may help delay the clock, though this use is less well-studied than evening melatonin for DSPD."
      },
      {
        name: "Gradual Schedule Delay",
        description: "Slowly pushing bedtime later by 15-30 minutes while using evening light and morning light avoidance."
      },
      {
        name: "Lifestyle Accommodation",
        description: "When treatment is insufficient, adjusting work and social schedules to accommodate early timing may be the most practical approach."
      }
    ],
    lifestyleChanges: [
      "Use bright light (light box or outdoor light) in the late afternoon/early evening",
      "Wear dark sunglasses or blue-light blocking glasses in the early morning",
      "Stay active in the evening with stimulating activities to resist sleepiness",
      "Maintain a consistent schedule even on weekends",
      "Exercise in the late afternoon or early evening",
      "Avoid morning bright light exposure when possible",
      "Consider scheduling important social activities earlier in the evening",
      "Communicate with family and friends about your sleep needs"
    ],
    relatedDisorders: ["Circadian Rhythm Disorders", "Insomnia", "Depression", "Delayed Sleep Phase Disorder"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "shift-work-disorder",
    name: "Shift Work Disorder",
    category: "Circadian Rhythm Disorders",
    description: "A circadian rhythm disorder occurring in people who work non-traditional hours, causing insomnia and excessive sleepiness that interfere with work and daily life.",
    overview: "Shift Work Disorder (SWD) is a circadian rhythm sleep disorder affecting people who work during times that overlap with the body's natural sleep period, typically night shifts, early morning shifts, or rotating shifts. The disorder occurs because the internal circadian clock remains aligned with the day-night cycle even when work requires wakefulness at night. This leads to difficulty sleeping when time is available (during the day) and difficulty staying awake and alert during night work. Not everyone who works shifts develops SWD, but those who do experience significant impairment.",
    prevalence: "Approximately 20% of the workforce in developed countries performs shift work. Of these, an estimated 10-40% meet criteria for shift work disorder. The risk increases with rotating schedules, night shifts, and number of years of shift work. SWD is particularly common in healthcare workers, transportation workers, factory workers, and emergency responders.",
    causes: "SWD results from the conflict between work schedules and the circadian system. The internal clock is regulated by light exposure, and trying to sleep during daylight hours and work during the night runs counter to evolved biology. Factors increasing risk include: irregular or rotating schedules (worse than fixed night shifts), lack of control over schedule, long shifts, age (older workers adapt less well), individual circadian tendencies, family obligations limiting daytime sleep, and exposure to morning light after night shifts.",
    symptoms: [
      {
        name: "Insomnia during daytime sleep periods",
        description: "Difficulty falling asleep, staying asleep, or sleeping long enough when trying to sleep during daylight hours. Daytime sleep is typically shorter and less restorative."
      },
      {
        name: "Excessive sleepiness during work",
        description: "Difficulty staying awake and alert during night shifts, particularly during the circadian low point (2-6 AM)."
      },
      {
        name: "Reduced total sleep time",
        description: "Shift workers often get 1-4 hours less sleep than day workers, leading to chronic sleep debt."
      },
      {
        name: "Impaired concentration and performance",
        description: "Difficulty focusing, slowed reaction times, increased errors, and reduced productivity, especially during night shifts."
      },
      {
        name: "Mood disturbances",
        description: "Increased irritability, depression, and anxiety associated with chronic sleep deprivation and circadian disruption."
      },
      {
        name: "Physical health problems",
        description: "Shift workers have increased rates of obesity, cardiovascular disease, gastrointestinal problems, and possibly cancer."
      },
      {
        name: "Social and family difficulties",
        description: "Working while others are sleeping and sleeping while others are awake strains relationships and limits social participation."
      }
    ],
    selfTestQuestions: [
      "Do you work night shifts, early morning shifts, or rotating shifts?",
      "Do you have difficulty sleeping during the day when you need to?",
      "Do you feel excessively sleepy or struggle to stay awake during your work shift?",
      "Is your total daily sleep less than when you worked a traditional schedule?",
      "Has shift work affected your mood, health, or relationships?",
      "Have these symptoms persisted for at least one month during shift work?"
    ],
    diagnosisOverview: "Diagnosis is based on the temporal relationship between shift work schedule and symptoms of insomnia and/or excessive sleepiness, with symptoms persisting for at least one month. Sleep logs and actigraphy help document the pattern.",
    diagnosticTests: [
      {
        name: "Sleep Diary",
        description: "A 2-week diary documenting sleep times, work schedule, and symptoms shows the relationship between work schedule and sleep problems."
      },
      {
        name: "Actigraphy",
        description: "Objective measurement of sleep-wake patterns over 1-2 weeks, ideally including both work days and days off."
      },
      {
        name: "Polysomnography",
        description: "Not routinely required but may be performed to rule out other sleep disorders like sleep apnea that can worsen shift work-related symptoms."
      },
      {
        name: "MSLT",
        description: "The Multiple Sleep Latency Test may be used to document objective sleepiness in uncertain cases."
      },
      {
        name: "Epworth Sleepiness Scale",
        description: "Questionnaire to quantify subjective sleepiness levels."
      }
    ],
    treatmentOverview: "Treatment focuses on maximizing sleep opportunity, optimizing the sleep environment for daytime sleep, using light strategically, and sometimes using medications to promote sleep or wakefulness at appropriate times.",
    treatments: [
      {
        name: "Strategic Light Exposure",
        description: "Bright light during the first half of the night shift helps promote alertness and adjust the circadian clock. Avoiding bright light (wearing dark glasses) on the commute home prevents morning light from counteracting adaptation."
      },
      {
        name: "Sleep Environment Optimization",
        description: "Creating ideal conditions for daytime sleep: blackout curtains, white noise machine, cool temperature, phone silenced, and family members informed."
      },
      {
        name: "Planned Napping",
        description: "A short nap (15-30 minutes) before the shift or during a break can reduce sleepiness. Longer naps may cause grogginess."
      },
      {
        name: "Sleep-Promoting Medications",
        description: "Melatonin before daytime sleep may improve sleep. Prescription sleep aids (like zolpidem) may be used short-term for daytime sleep when other measures are insufficient."
      },
      {
        name: "Wake-Promoting Medications",
        description: "Modafinil and armodafinil are FDA-approved for excessive sleepiness in shift work disorder. Caffeine can also help but should be avoided late in the shift."
      },
      {
        name: "Schedule Optimization",
        description: "When possible, switching to a fixed schedule (rather than rotating), requesting forward-rotating shifts (day→evening→night), or limiting consecutive night shifts can help."
      }
    ],
    lifestyleChanges: [
      "Create the darkest possible sleep environment for daytime sleep",
      "Use earplugs and white noise to block daytime noise",
      "Keep a consistent sleep schedule even on days off when possible",
      "Wear dark glasses on the way home from night shifts to block morning light",
      "Use caffeine strategically (early in shift only, avoid 4-6 hours before sleep)",
      "Take a short nap before your shift when possible",
      "Eat regular, healthy meals and avoid heavy meals during the shift",
      "Exercise regularly but not too close to sleep time",
      "Communicate with family about your sleep needs and create a quiet home environment",
      "Consider the long-term health effects when making career decisions"
    ],
    supportResources: [
      { name: "National Sleep Foundation - Shift Work Resources", url: "https://www.thensf.org/" }
    ],
    relatedDisorders: ["Circadian Rhythm Disorders", "Insomnia", "Excessive Daytime Sleepiness"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "jet-lag",
    name: "Jet Lag",
    category: "Circadian Rhythm Disorders",
    description: "A temporary sleep disorder that occurs when traveling rapidly across multiple time zones, causing a mismatch between the internal body clock and local time.",
    overview: "Jet Lag Disorder (also called jet lag syndrome or time zone change syndrome) is a temporary circadian rhythm sleep disorder that occurs when rapid travel across multiple time zones causes a mismatch between the internal circadian clock and the local environment. The body's clock remains synchronized to the departure time zone while the traveler must function on destination time. This mismatch causes sleep disturbance, daytime fatigue, and other symptoms until the internal clock adjusts to the new time zone. Eastward travel (which requires advancing sleep) is typically more difficult than westward travel.",
    prevalence: "Jet lag is nearly universal among travelers who cross multiple time zones rapidly. The severity depends on the number of time zones crossed (more zones = worse jet lag), direction of travel (eastward is harder), individual factors (age, circadian tendency), and previous adaptation. Symptoms typically require crossing at least 2-3 time zones to manifest significantly. Frequent travelers such as flight crews, business travelers, and athletes are particularly affected.",
    causes: "Jet lag occurs because the circadian clock can only shift by about 1-2 hours per day. When travel moves a person instantly across multiple time zones, the internal clock remains on home time while the environment is on destination time. Light exposure at the destination provides signals to reset the clock, but full adaptation takes approximately one day per time zone crossed. The hormone melatonin, body temperature rhythm, and other physiological processes remain temporarily out of sync with the environment.",
    symptoms: [
      {
        name: "Difficulty sleeping at local nighttime",
        description: "Insomnia at the destination because the body still feels awake (home time is earlier or later)."
      },
      {
        name: "Daytime sleepiness and fatigue",
        description: "Feeling very tired during local daytime because the internal clock says it should be nighttime."
      },
      {
        name: "Difficulty concentrating",
        description: "Cognitive impairment, memory problems, and difficulty focusing during the period of adjustment."
      },
      {
        name: "Malaise and irritability",
        description: "General feeling of unwellness, mood changes, and decreased sense of well-being."
      },
      {
        name: "Gastrointestinal symptoms",
        description: "Digestive upset, changes in appetite, and altered bowel habits as the digestive clock adjusts."
      },
      {
        name: "Reduced physical performance",
        description: "Athletes may experience decreased strength, reaction time, and coordination until adaptation occurs."
      },
      {
        name: "Disorientation",
        description: "Feeling foggy-headed and slightly disoriented, particularly severe in older travelers or after crossing many time zones."
      }
    ],
    selfTestQuestions: [
      "Have you traveled across 2 or more time zones in the past few days?",
      "Are you having difficulty sleeping at local nighttime at your destination?",
      "Do you feel unusually sleepy during local daytime?",
      "Are you experiencing digestive upset or changes in appetite?",
      "Do you feel mentally foggy or have difficulty concentrating?",
      "Are these symptoms temporary and related to your recent travel?"
    ],
    diagnosisOverview: "Jet lag is typically self-diagnosed based on the temporal relationship between trans-meridian travel and symptoms. No formal testing is needed. Symptoms should begin within 1-2 days of travel and resolve as adaptation occurs.",
    diagnosticTests: [
      {
        name: "Clinical History",
        description: "Documentation of recent travel across time zones and typical jet lag symptoms is sufficient for diagnosis."
      },
      {
        name: "Travel History Review",
        description: "Assessing number of time zones crossed, direction of travel, and time since arrival helps predict expected duration."
      }
    ],
    treatmentOverview: "Management focuses on accelerating adaptation to the new time zone using strategic light exposure, melatonin, and behavioral strategies. For short trips (2-3 days), it may be preferable to remain on home time if possible.",
    treatments: [
      {
        name: "Strategic Light Exposure",
        description: "Seeking bright light at specific times accelerates adaptation. For eastward travel, get morning light and avoid evening light. For westward travel, get evening light and avoid morning light."
      },
      {
        name: "Melatonin",
        description: "Taking 0.5-5 mg of melatonin at the target bedtime at the destination can help promote sleep and shift the clock. Begin on the first night at the destination."
      },
      {
        name: "Pre-Adaptation",
        description: "Gradually shifting sleep and wake times toward the destination time zone in the days before travel can reduce jet lag upon arrival."
      },
      {
        name: "Short-Term Sleep Aids",
        description: "Prescription or over-the-counter sleep aids may help with initial adjustment but should not be used long-term."
      },
      {
        name: "Caffeine",
        description: "Strategic caffeine use can help maintain alertness during local daytime, but should be avoided close to desired sleep time."
      },
      {
        name: "Jet Lag Calculators",
        description: "Online tools and apps can provide personalized light and melatonin timing recommendations based on travel details."
      }
    ],
    lifestyleChanges: [
      "Shift toward destination time before departure if possible (1 hour/day)",
      "Stay well-hydrated during the flight and avoid excess alcohol",
      "Get sunlight or bright light at appropriate times at destination",
      "Avoid bright light at times that would worsen jet lag",
      "Set watch to destination time at the start of the trip",
      "Eat meals on destination schedule to help reset rhythms",
      "Exercise lightly after arrival to promote adjustment",
      "Take short naps (20-30 min) if severely sleepy, but avoid long naps",
      "For short trips (2-3 days), consider staying on home time if schedule allows",
      "Be patient - full adjustment takes about one day per time zone crossed"
    ],
    relatedDisorders: ["Circadian Rhythm Disorders", "Shift Work Disorder", "Insomnia"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "non-24-hour-sleep-wake-disorder",
    name: "Non-24-Hour Sleep-Wake Disorder",
    category: "Circadian Rhythm Disorders",
    description: "A chronic circadian rhythm disorder where the internal body clock runs longer than 24 hours, causing sleep times to progressively shift later each day.",
    overview: "Non-24-Hour Sleep-Wake Disorder (N24SWD) is a chronic circadian rhythm disorder in which the internal body clock operates on a cycle longer than 24 hours, typically 24.5-25.5 hours. Because the clock doesn't reset properly to the 24-hour day, sleep times progressively drift later each day. Over weeks, the person cycles between periods when their rhythm aligns with the environment (feeling normal) and periods when it's completely opposite (sleeping during the day, awake at night). This disorder is very common in totally blind individuals who lack light input to the circadian system, but rare in sighted people.",
    prevalence: "N24SWD affects 50-70% of totally blind individuals, making it one of the most common sleep disorders in this population. In sighted individuals, the disorder is very rare (prevalence unknown but likely less than 0.03%) and often occurs following delayed sleep phase disorder. When it occurs in sighted people, it is more common in males and may be associated with developmental or psychiatric conditions.",
    causes: "The circadian clock naturally runs slightly longer than 24 hours. In sighted individuals, light exposure resets the clock daily to stay aligned with the 24-hour day. In totally blind people, absence of light input means the clock cannot reset, causing it to 'free-run' on its natural longer cycle. In the rare sighted individuals with N24SWD, possible causes include: weakened circadian pacemaker, reduced sensitivity to light, abnormally long intrinsic period, and certain psychiatric or developmental conditions. It may also develop from severe untreated delayed sleep phase disorder.",
    symptoms: [
      {
        name: "Progressively shifting sleep times",
        description: "Sleep onset and wake times shift later by 30-60+ minutes each day, gradually rotating around the clock over weeks to months."
      },
      {
        name: "Alternating good and bad periods",
        description: "Periods when the internal rhythm aligns with society (normal sleep timing) alternate with periods of complete misalignment (sleeping during day, awake at night)."
      },
      {
        name: "Inability to sleep at required times",
        description: "When misaligned, the person cannot fall asleep at night or wake up in the morning despite trying."
      },
      {
        name: "Severe daytime sleepiness (when misaligned)",
        description: "During periods of misalignment, overwhelming sleepiness occurs during required daytime activities."
      },
      {
        name: "Normal sleep when following natural rhythm",
        description: "When allowed to sleep and wake whenever the body wants, sleep quality and duration are normal."
      },
      {
        name: "Social and occupational impairment",
        description: "Maintaining work, school, or relationships is extremely difficult when sleep times are constantly shifting."
      }
    ],
    selfTestQuestions: [
      "Does your sleep time shift later every day, even when you try to maintain a schedule?",
      "Do you alternate between periods when you can sleep normally at night and periods when you're sleeping during the day?",
      "Does your sleep schedule seem to rotate completely around the clock over weeks or months?",
      "Are you totally blind or have significant vision impairment?",
      "Is your sleep normal in quality and duration when you follow your body's natural timing?",
      "Have you previously been diagnosed with delayed sleep phase disorder that became worse?"
    ],
    diagnosisOverview: "Diagnosis requires documentation of progressively shifting sleep times over at least several weeks, typically using sleep diaries and actigraphy. In blind individuals with typical symptoms, the diagnosis may be clinical.",
    diagnosticTests: [
      {
        name: "Extended Sleep Diary (4+ weeks)",
        description: "Documentation of sleep and wake times over at least one month shows the characteristic progressive delay pattern."
      },
      {
        name: "Actigraphy (3-4 weeks)",
        description: "Continuous wrist actigraphy over several weeks provides objective evidence of the free-running sleep-wake pattern."
      },
      {
        name: "Serial Melatonin Measurements",
        description: "If available, measuring melatonin timing on multiple occasions shows progressive shifting of the melatonin rhythm."
      },
      {
        name: "Ophthalmologic Evaluation",
        description: "Assessment of vision to determine if the person is totally blind (lacking light perception) helps identify the underlying mechanism."
      }
    ],
    treatmentOverview: "Treatment aims to entrain (synchronize) the circadian rhythm to a 24-hour schedule. In blind individuals, melatonin or the melatonin agonist tasimelteon can be effective. In sighted individuals, light therapy combined with melatonin may help.",
    treatments: [
      {
        name: "Tasimelteon (Hetlioz)",
        description: "FDA-approved specifically for N24SWD in blind adults. This melatonin receptor agonist taken before bedtime can help entrain the circadian rhythm to a 24-hour cycle."
      },
      {
        name: "Melatonin",
        description: "Low-dose melatonin (0.5-3 mg) taken at a consistent time each evening can help entrain the rhythm in blind individuals. Must be taken at the same time daily."
      },
      {
        name: "Light Therapy (Sighted Individuals)",
        description: "If the person has functional vision, properly timed bright light exposure may help anchor the circadian rhythm."
      },
      {
        name: "Strict Schedule Maintenance",
        description: "Keeping very consistent sleep, wake, meal, and activity times may provide non-photic cues to help stabilize the rhythm."
      },
      {
        name: "Combined Approach",
        description: "In sighted individuals, combining light therapy, melatonin, and behavioral strategies may be most effective."
      }
    ],
    lifestyleChanges: [
      "Take melatonin or prescribed medication at the exact same time every day",
      "Maintain very consistent daily routines (meals, exercise, activities)",
      "For sighted individuals, get bright light exposure at a consistent morning time",
      "Keep regular meal times to provide additional circadian cues",
      "Work with employers/schools to accommodate periods of misalignment when possible",
      "Consider flexible work arrangements or disability accommodations",
      "Connect with support organizations for blind individuals if applicable",
      "Track sleep patterns to identify when alignment is best"
    ],
    supportResources: [
      { name: "American Foundation for the Blind", url: "https://www.afb.org/" },
      { name: "Circadian Sleep Disorders Network", url: "https://www.circadiansleepdisorders.org/" }
    ],
    relatedDisorders: ["Delayed Sleep Phase Disorder", "Circadian Rhythm Disorders", "Irregular Sleep-Wake Rhythm"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "irregular-sleep-wake-rhythm",
    name: "Irregular Sleep-Wake Rhythm",
    category: "Circadian Rhythm Disorders",
    description: "A circadian rhythm disorder characterized by the absence of a clear sleep-wake pattern, with sleep occurring in multiple fragmented periods across the 24-hour day.",
    overview: "Irregular Sleep-Wake Rhythm Disorder (ISWRD) is a circadian rhythm disorder characterized by the lack of a clearly defined circadian sleep-wake pattern. Instead of one main sleep period at night and one main wake period during the day, sleep and wake episodes are scattered across the 24-hour period in multiple short bouts. While total sleep time in 24 hours may be normal, the sleep is fragmented into at least three sleep periods per day. This disorder is most commonly seen in individuals with neurological conditions affecting the brain's circadian center, particularly dementia and developmental disabilities.",
    prevalence: "ISWRD is relatively rare in the general population but common in specific groups. It affects an estimated 25-35% of patients with dementia, particularly Alzheimer's disease. It is also seen in children with developmental disabilities, brain injuries affecting the hypothalamus, and occasionally in healthy elderly individuals. The disorder significantly impacts caregivers of affected individuals.",
    causes: "ISWRD typically results from dysfunction of the brain's central circadian pacemaker (suprachiasmatic nucleus) or disruption of the signals between this pacemaker and sleep-wake regulatory centers. Common causes include: neurodegenerative diseases (Alzheimer's, Parkinson's, Huntington's), developmental brain disorders, traumatic brain injury affecting the hypothalamus, lack of exposure to environmental time cues (light, social activity), and severe institutional environments lacking normal day-night variation. In some cases, the cause is unclear.",
    symptoms: [
      {
        name: "Multiple sleep periods throughout the day and night",
        description: "Sleep occurs in at least three separate periods across each 24-hour period, rather than one consolidated nighttime sleep episode."
      },
      {
        name: "Nighttime insomnia",
        description: "Difficulty sleeping through the night, with prolonged awakenings and inability to maintain consolidated sleep."
      },
      {
        name: "Daytime sleepiness and napping",
        description: "Excessive sleepiness during the day with frequent naps, as sleep is distributed across the 24-hour period."
      },
      {
        name: "No clear circadian pattern",
        description: "The timing and duration of sleep episodes is variable and unpredictable, without a consistent schedule."
      },
      {
        name: "Normal total sleep time",
        description: "When all sleep periods are added together, total sleep in 24 hours may be normal, though it's fragmented."
      },
      {
        name: "Behavioral changes in dementia patients",
        description: "Nighttime wandering, confusion, and agitation ('sundowning') may occur when the disorder affects dementia patients."
      }
    ],
    selfTestQuestions: [
      "Does the affected person sleep in multiple short periods throughout both day and night?",
      "Is there no clear distinction between a main nighttime sleep and daytime wakefulness?",
      "Does the person have difficulty staying asleep at night and staying awake during the day?",
      "Is there an underlying neurological condition such as dementia or developmental disability?",
      "Is the person exposed to regular light and dark cycles and social activities?",
      "Has this pattern persisted for at least three months?"
    ],
    diagnosisOverview: "Diagnosis requires documentation of an irregular sleep-wake pattern over at least one week, typically using actigraphy and sleep diaries. The underlying cause (often a neurological condition) should be identified.",
    diagnosticTests: [
      {
        name: "Actigraphy (1-2 weeks)",
        description: "Wrist-worn movement monitoring shows the characteristic pattern of multiple sleep and wake bouts with no circadian organization."
      },
      {
        name: "Sleep Diary (Caregiver-Completed)",
        description: "When the patient cannot self-report, caregivers document sleep and wake periods showing the irregular pattern."
      },
      {
        name: "Polysomnography",
        description: "Not typically required for diagnosis but may identify other contributing sleep disorders."
      },
      {
        name: "Neurological Evaluation",
        description: "Assessment for underlying neurological conditions that may be causing the circadian dysregulation."
      }
    ],
    treatmentOverview: "Treatment focuses on strengthening circadian cues through structured light exposure, social activities, and maintaining consistent daily routines. Melatonin may help consolidate sleep. Treatment of underlying conditions when possible is important.",
    treatments: [
      {
        name: "Structured Light Exposure",
        description: "Bright light therapy during the day (especially morning) helps reinforce circadian rhythms. This may involve 30-60 minutes of bright light box use or increased environmental lighting."
      },
      {
        name: "Increased Daytime Activity",
        description: "Structured social activities, physical activity, and mental stimulation during the day help promote daytime wakefulness and nighttime sleep."
      },
      {
        name: "Melatonin",
        description: "Low-dose melatonin (0.5-3 mg) at a consistent evening time may help consolidate nighttime sleep and reinforce circadian rhythms."
      },
      {
        name: "Environmental Modifications",
        description: "Ensuring bright light during the day, darkness at night, and reducing nighttime noise and disruption helps establish day-night differentiation."
      },
      {
        name: "Reducing Daytime Napping",
        description: "Limiting or eliminating daytime naps can help increase sleep pressure for nighttime, though this must be balanced with safety concerns."
      },
      {
        name: "Treating Underlying Conditions",
        description: "Optimal management of dementia, pain, depression, and other conditions that fragment sleep can improve the sleep-wake pattern."
      }
    ],
    lifestyleChanges: [
      "Establish consistent wake time, meal times, and activity times",
      "Maximize bright light exposure during daytime hours",
      "Dim lights in the evening and keep the environment dark at night",
      "Encourage physical and social activity during the day",
      "Limit daytime napping when safe to do so",
      "Create a clear difference between day (active, bright) and night (calm, dark)",
      "For caregivers: establish regular routines and maintain consistency",
      "Consider environmental modifications like programmable lighting systems",
      "Ensure adequate nighttime staffing and safety measures in care facilities"
    ],
    relatedDisorders: ["Non-24-Hour Sleep-Wake Disorder", "Circadian Rhythm Disorders", "Dementia-Related Sleep Problems"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
