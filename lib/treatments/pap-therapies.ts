import { TreatmentContent } from '../treatment-options-content'

export const papTherapies: TreatmentContent[] = [
  {
    slug: "cpap-therapy",
    name: "CPAP Therapy",
    category: "PAP Therapies",
    description: "Continuous Positive Airway Pressure (CPAP) is the gold-standard treatment for obstructive sleep apnea, delivering steady air pressure to keep airways open during sleep.",
    overview: "CPAP (Continuous Positive Airway Pressure) therapy is the most widely prescribed and effective treatment for obstructive sleep apnea (OSA). It works by delivering a constant stream of pressurized air through a mask worn during sleep, preventing the airway from collapsing. CPAP therapy eliminates apneas, reduces snoring, and significantly improves sleep quality and daytime alertness when used consistently.",
    howItWorks: "A CPAP machine draws in room air, filters it, and pressurizes it to a prescribed level. This air flows through a heated tube to a mask that covers your nose, mouth, or both. The continuous positive pressure acts as a pneumatic splint, keeping your upper airway open throughout the breathing cycle, preventing the tissue collapse that causes apneas and hypopneas.",
    candidatesFor: "CPAP is recommended for patients diagnosed with moderate to severe obstructive sleep apnea (AHI ≥15 events/hour), and for mild OSA (AHI 5-14) when accompanied by symptoms like excessive daytime sleepiness, impaired cognition, or cardiovascular conditions. It may also be used for central sleep apnea and complex sleep apnea in some cases.",
    benefits: [
      {
        name: "Eliminates Breathing Interruptions",
        description: "CPAP effectively eliminates apneas and hypopneas, restoring normal oxygen levels throughout the night and preventing the dangerous drops in blood oxygen that characterize untreated sleep apnea."
      },
      {
        name: "Reduces Daytime Sleepiness",
        description: "By restoring quality sleep, CPAP significantly reduces excessive daytime sleepiness, improving alertness, concentration, and overall quality of life."
      },
      {
        name: "Lowers Cardiovascular Risk",
        description: "Consistent CPAP use reduces blood pressure, decreases risk of heart disease, stroke, and atrial fibrillation, and improves overall cardiovascular health."
      },
      {
        name: "Improves Mood and Cognition",
        description: "Many patients experience improvements in memory, mood, and cognitive function after starting CPAP therapy, as the brain receives adequate oxygen and restorative sleep."
      },
      {
        name: "Eliminates Snoring",
        description: "CPAP stops snoring by keeping the airway open, which benefits both the patient and their bed partner."
      }
    ],
    sideEffects: [
      {
        name: "Mask Discomfort",
        description: "Finding the right mask fit is crucial. Common issues include pressure marks, skin irritation, and air leaks. Working with your sleep specialist to try different mask styles usually resolves these issues."
      },
      {
        name: "Nasal Congestion or Dryness",
        description: "Air pressure can cause nasal stuffiness, dryness, or nosebleeds. Using a CPAP with heated humidification and ensuring proper mask fit typically alleviates these symptoms."
      },
      {
        name: "Aerophagia (Swallowing Air)",
        description: "Some patients swallow air, causing bloating, gas, or stomach discomfort. Pressure adjustments or using BiPAP/Auto-CPAP may help reduce this issue."
      },
      {
        name: "Claustrophobia",
        description: "Some users feel anxious wearing a mask. Starting with a minimal nasal pillow mask and gradually increasing wear time while awake can help with adaptation."
      },
      {
        name: "Noise",
        description: "Modern CPAP machines are very quiet, but some users or partners notice the airflow sound. Ensuring the machine is on a stable surface and checking for mask leaks can minimize noise."
      }
    ],
    variations: [
      {
        name: "Fixed-Pressure CPAP",
        description: "Delivers a single, constant pressure throughout the night as prescribed by your sleep physician based on your sleep study results."
      },
      {
        name: "Auto-Adjusting CPAP (APAP)",
        description: "Automatically adjusts pressure breath-by-breath within a set range, responding to apneas, hypopneas, and snoring. May improve comfort for some users."
      },
      {
        name: "CPAP with Pressure Relief (EPR/C-Flex)",
        description: "Reduces pressure slightly during exhalation, making breathing out feel more natural. Available on many modern CPAP devices."
      },
      {
        name: "Travel CPAP",
        description: "Compact, lightweight devices designed for travel. FAA-approved for airline use and often battery-compatible for camping or areas without power."
      }
    ],
    tips: [
      {
        title: "Start Slowly",
        description: "Begin by wearing your mask while awake, then during naps, before graduating to all-night use. This gradual approach helps your brain adjust to the therapy."
      },
      {
        title: "Use It Every Night",
        description: "Consistency is key. Using CPAP every night, even during naps, maximizes health benefits and helps your body adapt more quickly."
      },
      {
        title: "Keep Equipment Clean",
        description: "Wash your mask cushion and humidifier chamber weekly. Replace filters monthly (or as recommended). Clean equipment works better and lasts longer."
      },
      {
        title: "Optimize Humidity",
        description: "Use heated humidification to prevent dryness. Adjust the humidity level seasonally—higher in winter, lower in summer—for optimal comfort."
      },
      {
        title: "Address Mask Issues Promptly",
        description: "If your mask leaks, causes pressure sores, or feels uncomfortable, contact your equipment provider. A different mask style or size often solves the problem."
      },
      {
        title: "Track Your Progress",
        description: "Most modern CPAP machines have apps that track your usage and AHI. Reviewing this data helps you understand your therapy and motivates continued use."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" },
      { name: "CPAP.com Education Center", url: "https://www.cpap.com/cpap-education" }
    ],
    relatedTreatments: ["BiPAP Therapy", "Auto-CPAP (APAP)", "Oral Appliance Therapy", "Inspire Therapy"],
    treatedConditions: ["Obstructive Sleep Apnea", "Central Sleep Apnea", "Snoring", "Upper Airway Resistance Syndrome"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "bipap-therapy",
    name: "BiPAP Therapy",
    category: "PAP Therapies",
    description: "Bilevel Positive Airway Pressure (BiPAP) delivers two different pressure levels—higher for inhalation and lower for exhalation—providing more comfortable and effective treatment for certain sleep-disordered breathing conditions.",
    overview: "BiPAP (Bilevel Positive Airway Pressure), also known as BPAP, is a form of positive airway pressure therapy that delivers two distinct pressure levels: a higher pressure when you inhale (IPAP) and a lower pressure when you exhale (EPAP). This bilevel approach can be more comfortable than standard CPAP for patients who need higher pressures, and is particularly effective for patients with certain respiratory conditions, central sleep apnea, or those who struggle with exhaling against CPAP pressure.",
    howItWorks: "A BiPAP machine monitors your breathing pattern and automatically switches between two pressure settings. The higher inspiratory pressure (IPAP) helps keep your airway open and assists with inhalation, while the lower expiratory pressure (EPAP) maintains airway patency during exhalation while making it easier to breathe out. The pressure difference (pressure support) can also help ventilate the lungs more effectively.",
    candidatesFor: "BiPAP is recommended for patients who cannot tolerate CPAP due to difficulty exhaling against pressure, those requiring high CPAP pressures (typically >15 cmH2O), patients with obesity hypoventilation syndrome, COPD overlap syndrome, central sleep apnea, complex sleep apnea, or neuromuscular diseases affecting breathing. It may also benefit patients with aerophagia on CPAP.",
    benefits: [
      {
        name: "Easier Exhalation",
        description: "The lower expiratory pressure makes breathing out feel more natural, improving comfort especially for those who struggled with CPAP."
      },
      {
        name: "Effective at Higher Pressures",
        description: "For patients needing high pressure to control severe OSA, BiPAP provides the necessary inspiratory support while maintaining comfortable exhalation."
      },
      {
        name: "Ventilatory Support",
        description: "The pressure difference between IPAP and EPAP provides pressure support that can help move air in and out of the lungs, beneficial for hypoventilation syndromes."
      },
      {
        name: "Treats Complex Conditions",
        description: "BiPAP is effective for treating central sleep apnea, complex sleep apnea, and sleep-related breathing problems associated with COPD, obesity hypoventilation, and neuromuscular disease."
      },
      {
        name: "Reduces Aerophagia",
        description: "Some patients who swallowed excess air on CPAP find relief with BiPAP due to the lower expiratory pressure."
      }
    ],
    sideEffects: [
      {
        name: "Mask Discomfort",
        description: "As with CPAP, finding the right mask is important. BiPAP users may need full face masks if using higher pressures or if mouth breathing occurs."
      },
      {
        name: "Nasal or Oral Dryness",
        description: "Higher pressures and airflow can cause dryness. Heated humidification is especially important with BiPAP therapy."
      },
      {
        name: "Difficulty Synchronizing",
        description: "Some patients initially find the pressure changes distracting. Modern BiPAP machines have sophisticated algorithms that usually resolve this with continued use."
      },
      {
        name: "Air Leaks",
        description: "The higher inspiratory pressures make proper mask seal more critical. Large leaks can compromise therapy effectiveness."
      },
      {
        name: "Cost",
        description: "BiPAP machines are typically more expensive than CPAP devices, though insurance usually covers them when medically necessary."
      }
    ],
    variations: [
      {
        name: "BiPAP S (Spontaneous)",
        description: "The most common mode—the machine responds to your breathing, providing IPAP when you inhale and EPAP when you exhale."
      },
      {
        name: "BiPAP ST (Spontaneous-Timed)",
        description: "Includes a backup breathing rate. If you don't breathe within a set time, the machine initiates a breath. Used for central apnea and hypoventilation."
      },
      {
        name: "BiPAP Auto",
        description: "Automatically adjusts both IPAP and EPAP pressures based on detected events, combining bilevel therapy with auto-adjusting technology."
      },
      {
        name: "AVAPS (Average Volume-Assured Pressure Support)",
        description: "Automatically adjusts pressure support to maintain a target tidal volume, used for patients with obesity hypoventilation or neuromuscular weakness."
      }
    ],
    tips: [
      {
        title: "Give It Time",
        description: "Adjusting to bilevel pressure changes takes time. Most patients adapt within 1-2 weeks of consistent use."
      },
      {
        title: "Report Breathing Discomfort",
        description: "If the pressure changes feel jarring or out of sync with your breathing, report this to your provider. BiPAP settings can be fine-tuned for better synchronization."
      },
      {
        title: "Use Full Face Mask If Needed",
        description: "If you breathe through your mouth or have nasal obstruction, a full face mask may provide better therapy delivery and comfort."
      },
      {
        title: "Monitor for Leaks",
        description: "BiPAP is more sensitive to mask leaks than CPAP. Check your machine's leak data and ensure proper mask fit each night."
      },
      {
        title: "Keep Follow-up Appointments",
        description: "BiPAP therapy often requires more fine-tuning than CPAP. Regular follow-ups help optimize your settings for the best results."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" }
    ],
    relatedTreatments: ["CPAP Therapy", "Adaptive Servo-Ventilation (ASV)", "Non-Invasive Ventilation"],
    treatedConditions: ["Obstructive Sleep Apnea", "Central Sleep Apnea", "Complex Sleep Apnea", "Obesity Hypoventilation Syndrome", "COPD"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "auto-cpap",
    name: "Auto-CPAP (APAP)",
    category: "PAP Therapies",
    description: "Auto-adjusting CPAP automatically varies pressure throughout the night based on detected breathing events, potentially improving comfort while maintaining effective treatment.",
    overview: "Auto-CPAP (APAP or Auto-titrating PAP) is an advanced form of CPAP therapy that automatically adjusts pressure levels breath-by-breath throughout the night. Unlike fixed CPAP which delivers one constant pressure, APAP uses sensors and algorithms to detect airflow changes, snoring, apneas, and hypopneas, then adjusts pressure up or down within a prescribed range to maintain airway patency. This allows for lower average pressures while still preventing respiratory events.",
    howItWorks: "APAP machines continuously analyze your breathing patterns using sophisticated algorithms. When the device detects signs of airway obstruction (flow limitation, snoring, apneas, or hypopneas), it automatically increases pressure to resolve the event. When breathing is stable, pressure gradually decreases to improve comfort. The device operates within a minimum and maximum pressure range set by your sleep physician.",
    candidatesFor: "APAP is appropriate for most patients with uncomplicated obstructive sleep apnea. It may be particularly beneficial for patients whose pressure needs vary (due to sleep position, sleep stage, alcohol consumption, or weight fluctuations), those who need high pressure only occasionally, patients undergoing initial CPAP therapy, and those who found fixed-pressure CPAP uncomfortable.",
    benefits: [
      {
        name: "Lower Average Pressure",
        description: "Because pressure increases only when needed, most patients experience lower average pressure throughout the night, potentially improving comfort."
      },
      {
        name: "Adapts to Changing Needs",
        description: "APAP automatically compensates for factors that affect pressure requirements, such as sleep position, sleep stage, weight changes, alcohol use, or nasal congestion."
      },
      {
        name: "May Improve Compliance",
        description: "Some patients find APAP more comfortable than fixed CPAP, which can lead to more consistent use and better treatment outcomes."
      },
      {
        name: "Simplifies Titration",
        description: "APAP can be used diagnostically to determine optimal pressure settings, sometimes eliminating the need for in-lab titration studies."
      },
      {
        name: "Same Core Benefits as CPAP",
        description: "When properly set, APAP provides all the cardiovascular, cognitive, and quality-of-life benefits of standard CPAP therapy."
      }
    ],
    sideEffects: [
      {
        name: "Pressure Fluctuations",
        description: "Some users notice and are bothered by pressure changes during the night. This is usually minor but can occasionally disrupt sleep."
      },
      {
        name: "Over-response to Leaks",
        description: "APAP may incorrectly interpret mask leaks as respiratory events and increase pressure unnecessarily. Good mask fit is essential."
      },
      {
        name: "Not Suitable for All Conditions",
        description: "APAP may not be appropriate for central sleep apnea, complex sleep apnea, chronic hypoventilation, or severe COPD—conditions that require BiPAP or ASV."
      },
      {
        name: "Standard CPAP Side Effects",
        description: "All typical CPAP side effects (mask discomfort, dryness, aerophagia) can occur with APAP as well."
      }
    ],
    variations: [
      {
        name: "APAP with Expiratory Relief",
        description: "Includes pressure relief during exhalation (EPR, C-Flex, or similar) combined with auto-adjusting technology for enhanced comfort."
      },
      {
        name: "Auto-BiPAP",
        description: "Combines auto-adjusting technology with bilevel therapy, automatically adjusting both IPAP and EPAP pressures."
      },
      {
        name: "Response Algorithms",
        description: "Different manufacturers use different algorithms for detecting events and adjusting pressure. Some patients respond better to one brand's algorithm than another."
      }
    ],
    tips: [
      {
        title: "Ensure Good Mask Seal",
        description: "APAP relies on accurate airflow measurement. Even small leaks can cause incorrect pressure responses. Check and address leaks promptly."
      },
      {
        title: "Review Your Data",
        description: "Use your APAP's app or software to see your nightly pressure data. Consistent high pressures might indicate the need for a different therapy or investigation."
      },
      {
        title: "Report Awakenings",
        description: "If you're awakened by sudden pressure increases, tell your provider. The pressure range or algorithm sensitivity may need adjustment."
      },
      {
        title: "Keep the Same Good Habits",
        description: "APAP works best with the same practices as CPAP: use every night, keep equipment clean, and maintain regular follow-up with your sleep team."
      },
      {
        title: "Consider a Trial",
        description: "If you're struggling with fixed CPAP, ask about trying APAP. Many patients find the auto-adjusting feature more comfortable."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" }
    ],
    relatedTreatments: ["CPAP Therapy", "BiPAP Therapy", "Oral Appliance Therapy"],
    treatedConditions: ["Obstructive Sleep Apnea", "Snoring", "Upper Airway Resistance Syndrome"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  },
  {
    slug: "adaptive-servo-ventilation",
    name: "Adaptive Servo-Ventilation (ASV)",
    category: "PAP Therapies",
    description: "A sophisticated positive airway pressure device that automatically adjusts to treat central sleep apnea and complex sleep apnea by providing variable pressure support based on breathing patterns.",
    overview: "Adaptive Servo-Ventilation (ASV) is an advanced form of positive airway pressure therapy specifically designed to treat central sleep apnea, complex sleep apnea (treatment-emergent central apnea), and Cheyne-Stokes respiration. Unlike CPAP or BiPAP, ASV continuously monitors breathing patterns and provides variable pressure support that adapts breath-by-breath to stabilize breathing. It provides more support when breathing is weak and less when breathing normalizes, effectively smoothing out the irregular breathing patterns characteristic of central apneas.",
    howItWorks: "ASV devices use sophisticated algorithms to learn your normal breathing pattern and provide servo-controlled pressure support that varies with each breath. When the device detects weakening breaths or an impending central apnea, it increases inspiratory pressure support. When breathing normalizes, support decreases. The device also provides a backup rate to initiate breaths if breathing pauses completely. This dynamic approach stabilizes breathing throughout the night.",
    candidatesFor: "ASV is indicated for central sleep apnea, complex sleep apnea (central apneas emerging on CPAP), and Cheyne-Stokes respiration associated with heart failure. IMPORTANT: ASV is contraindicated in patients with symptomatic chronic heart failure with reduced ejection fraction (LVEF ≤45%). Your sleep physician will determine if ASV is appropriate based on sleep study results and cardiac status.",
    benefits: [
      {
        name: "Effectively Treats Central Apneas",
        description: "ASV is highly effective at eliminating central apneas and hypopneas that don't respond to CPAP or BiPAP therapy."
      },
      {
        name: "Stabilizes Breathing Patterns",
        description: "For patients with Cheyne-Stokes respiration or periodic breathing, ASV smooths out the crescendo-decrescendo breathing pattern."
      },
      {
        name: "Treats Complex Sleep Apnea",
        description: "When central apneas emerge or persist on CPAP (treatment-emergent CSA), ASV often resolves these events effectively."
      },
      {
        name: "Adaptive Support",
        description: "The breath-by-breath adjustment provides precisely the support needed at any moment, optimizing therapy while maintaining comfort."
      },
      {
        name: "Improved Sleep Quality",
        description: "By eliminating central events and stabilizing breathing, ASV can significantly improve sleep quality and reduce arousals."
      }
    ],
    sideEffects: [
      {
        name: "Complex Setup",
        description: "ASV requires careful programming by experienced clinicians. Initial settings may need adjustment based on therapy data."
      },
      {
        name: "Adjustment Period",
        description: "The variable pressure support can feel unfamiliar initially. Most patients adapt within 1-2 weeks of consistent use."
      },
      {
        name: "Standard PAP Side Effects",
        description: "Mask discomfort, aerophagia, and dryness can occur as with any PAP therapy."
      },
      {
        name: "Contraindicated in Some Heart Failure",
        description: "ASV is contraindicated in patients with symptomatic heart failure and LVEF ≤45%. A major study (SERVE-HF) found increased cardiovascular mortality in this population."
      },
      {
        name: "Higher Cost",
        description: "ASV devices are more expensive than CPAP or BiPAP. Insurance coverage requires documentation of central or complex sleep apnea."
      }
    ],
    variations: [
      {
        name: "ASV with Auto-EPAP",
        description: "Automatically adjusts the expiratory pressure to treat any coexisting obstructive events while providing servo-controlled inspiratory support."
      },
      {
        name: "Manufacturer-Specific Algorithms",
        description: "ResMed, Philips, and other manufacturers use different proprietary algorithms. Patients may respond differently to each brand."
      }
    ],
    tips: [
      {
        title: "Cardiac Evaluation First",
        description: "Before starting ASV, ensure you've had appropriate cardiac evaluation, including echocardiogram if indicated, to rule out contraindications."
      },
      {
        title: "Use Consistently",
        description: "ASV works best with consistent, all-night use. The device learns and adapts to your breathing patterns over time."
      },
      {
        title: "Regular Follow-up Is Essential",
        description: "ASV therapy requires closer monitoring than CPAP. Attend all follow-up appointments and share therapy data with your sleep team."
      },
      {
        title: "Report Symptoms",
        description: "If you experience worsening shortness of breath, chest pain, or other cardiac symptoms, contact your healthcare provider immediately."
      },
      {
        title: "Be Patient with Adaptation",
        description: "The breath-by-breath pressure changes feel different from CPAP or BiPAP. Give yourself time to adapt to this sophisticated therapy."
      }
    ],
    additionalResources: [
      { name: "American Academy of Sleep Medicine", url: "https://aasm.org/" }
    ],
    relatedTreatments: ["BiPAP Therapy", "CPAP Therapy"],
    treatedConditions: ["Central Sleep Apnea", "Complex Sleep Apnea", "Cheyne-Stokes Respiration", "Treatment-Emergent Central Apnea"],
    lastReviewed: "January 2025",
    reviewedBy: "Sleep Care Directory Medical Team"
  }
]
