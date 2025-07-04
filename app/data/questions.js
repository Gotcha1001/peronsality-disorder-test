// export const questions = [
//   // BPD (5 questions, based on McLean Screening Instrument)
//   {
//     id: 1,
//     text: "Have you experienced intense fear of abandonment or rejection?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "BPD",
//   },
//   {
//     id: 2,
//     text: "Do you have unstable or intense relationships that alternate between idealization and devaluation?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "BPD",
//   },
//   {
//     id: 3,
//     text: "Do you experience rapid mood swings that last hours or days?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "BPD",
//   },
//   {
//     id: 4,
//     text: "Do you engage in impulsive behaviors, such as spending or substance use?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "BPD",
//   },
//   {
//     id: 5,
//     text: "Do you feel chronic emptiness or lack a stable sense of self?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "BPD",
//   },
//   // NPD (5 questions, based on Narcissistic Personality Inventory)
//   {
//     id: 6,
//     text: "Do you often feel you deserve special treatment or admiration?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "NPD",
//   },
//   {
//     id: 7,
//     text: "Do you fantasize about unlimited success, power, or beauty?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "NPD",
//   },
//   {
//     id: 8,
//     text: "Do you believe you are more special or unique than others?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "NPD",
//   },
//   {
//     id: 9,
//     text: "Do you often require excessive attention or validation?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "NPD",
//   },
//   {
//     id: 10,
//     text: "Do you lack empathy for others' feelings or needs?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "NPD",
//   },
//   // ASPD (5 questions, based on DSM-5 criteria)
//   {
//     id: 11,
//     text: "Do you often disregard rules or social norms?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "ASPD",
//   },
//   {
//     id: 12,
//     text: "Do you frequently lie or manipulate others for personal gain?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "ASPD",
//   },
//   {
//     id: 13,
//     text: "Do you act impulsively without considering consequences?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "ASPD",
//   },
//   {
//     id: 14,
//     text: "Do you show little remorse for harming others?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "ASPD",
//   },
//   {
//     id: 15,
//     text: "Do you often engage in aggressive or risky behaviors?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "ASPD",
//   },
//   // AvPD (5 questions, based on DSM-5 criteria)
//   {
//     id: 16,
//     text: "Do you avoid social situations due to fear of rejection?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "AvPD",
//   },
//   {
//     id: 17,
//     text: "Do you feel inadequate or inferior to others?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "AvPD",
//   },
//   {
//     id: 18,
//     text: "Are you overly sensitive to criticism or disapproval?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "AvPD",
//   },
//   {
//     id: 19,
//     text: "Do you avoid close relationships due to fear of being hurt?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "AvPD",
//   },
//   {
//     id: 20,
//     text: "Do you feel socially awkward or inhibited in new situations?",
//     options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
//     type: "AvPD",
//   },
// ];

export const questions = [
  // BPD Questions (9, DSM-5)
  {
    id: 1,
    text: "Do you experience intense fear of abandonment, whether real or imagined?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "BPD",
  },
  {
    id: 2,
    text: "Do you have unstable relationships that alternate between idealization and devaluation?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "BPD",
  },
  {
    id: 3,
    text: "Do you have a persistently unstable self-image or sense of self?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "BPD",
  },
  {
    id: 4,
    text: "Do you engage in potentially self-damaging impulsive behaviors (spending, sex, substance abuse, reckless driving, binge eating)?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "BPD",
  },
  {
    id: 5,
    text: "Do you have recurrent suicidal behavior, gestures, or threats, or self-mutilating behavior?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "BPD",
  },
  {
    id: 6,
    text: "Do you experience rapid mood swings lasting hours to days?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "BPD",
  },
  {
    id: 7,
    text: "Do you feel chronic emptiness?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "BPD",
  },
  {
    id: 8,
    text: "Do you have inappropriate, intense anger or difficulty controlling anger?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "BPD",
  },
  {
    id: 9,
    text: "Do you have stress-related paranoid thoughts or severe dissociative symptoms?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "BPD",
  },
  // NPD Questions (9, DSM-5)
  {
    id: 10,
    text: "Do you have a grandiose sense of self-importance?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "NPD",
  },
  {
    id: 11,
    text: "Are you preoccupied with fantasies of unlimited success, power, brilliance, beauty, or ideal love?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "NPD",
  },
  {
    id: 12,
    text: "Do you believe you are 'special' and unique and can only be understood by other special people?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "NPD",
  },
  {
    id: 13,
    text: "Do you require excessive admiration from others?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "NPD",
  },
  {
    id: 14,
    text: "Do you have a sense of entitlement and expect special treatment?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "NPD",
  },
  {
    id: 15,
    text: "Are you interpersonally exploitative, taking advantage of others?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "NPD",
  },
  {
    id: 16,
    text: "Do you lack empathy and are unwilling to recognize others' feelings and needs?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "NPD",
  },
  {
    id: 17,
    text: "Are you often envious of others or believe others are envious of you?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "NPD",
  },
  {
    id: 18,
    text: "Do you show arrogant, haughty behaviors or attitudes?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "NPD",
  },
  // ASPD Questions (9, DSM-5)
  {
    id: 19,
    text: "Do you repeatedly perform acts that are grounds for arrest?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "ASPD",
  },
  {
    id: 20,
    text: "Do you deceive others through repeated lying, use of aliases, or conning others for personal profit?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "ASPD",
  },
  {
    id: 21,
    text: "Are you impulsive or do you fail to plan ahead?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "ASPD",
  },
  {
    id: 22,
    text: "Are you irritable and aggressive, with repeated physical fights or assaults?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "ASPD",
  },
  {
    id: 23,
    text: "Do you have reckless disregard for safety of self or others?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "ASPD",
  },
  {
    id: 24,
    text: "Are you consistently irresponsible in work or financial obligations?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "ASPD",
  },
  {
    id: 25,
    text: "Do you lack remorse or feel indifferent to having hurt others?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "ASPD",
  },
  {
    id: 26,
    text: "Do you rationalize having hurt, mistreated, or stolen from others?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "ASPD",
  },
  {
    id: 27,
    text: "Do you have a history of conduct disorder symptoms before age 15?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "ASPD",
  },
  // AvPD Questions (9, DSM-5)
  {
    id: 28,
    text: "Do you avoid occupational activities involving significant interpersonal contact?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "AvPD",
  },
  {
    id: 29,
    text: "Are you unwilling to get involved with people unless certain of being liked?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "AvPD",
  },
  {
    id: 30,
    text: "Do you show restraint in intimate relationships due to fear of being shamed or ridiculed?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "AvPD",
  },
  {
    id: 31,
    text: "Are you preoccupied with being criticized or rejected in social situations?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "AvPD",
  },
  {
    id: 32,
    text: "Are you inhibited in new interpersonal situations because of feelings of inadequacy?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "AvPD",
  },
  {
    id: 33,
    text: "Do you view yourself as socially inept, personally unappealing, or inferior to others?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "AvPD",
  },
  {
    id: 34,
    text: "Are you unusually reluctant to take personal risks or engage in new activities?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "AvPD",
  },
  {
    id: 35,
    text: "Do you feel extremely uncomfortable in social situations?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "AvPD",
  },
  {
    id: 36,
    text: "Do you fear being embarrassed by blushing, crying, or showing signs of anxiety?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "AvPD",
  },
  // OCPD Questions (9, DSM-5)
  {
    id: 37,
    text: "Are you preoccupied with details, rules, lists, order, organization, or schedules?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "OCPD",
  },
  {
    id: 38,
    text: "Do you show perfectionism that interferes with task completion?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "OCPD",
  },
  {
    id: 39,
    text: "Are you excessively devoted to work and productivity to the exclusion of leisure activities?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "OCPD",
  },
  {
    id: 40,
    text: "Are you over-conscientious, scrupulous, and inflexible about matters of morality, ethics, or values?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "OCPD",
  },
  {
    id: 41,
    text: "Are you unable to discard worn-out or worthless objects even when they have no sentimental value?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "OCPD",
  },
  {
    id: 42,
    text: "Are you reluctant to delegate tasks or work with others unless they do things exactly your way?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "OCPD",
  },
  {
    id: 43,
    text: "Do you adopt a miserly spending style toward yourself and others?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "OCPD",
  },
  {
    id: 44,
    text: "Do you show rigidity and stubbornness in your behavior and thinking?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "OCPD",
  },
  {
    id: 45,
    text: "Do you insist that others submit to exactly your way of doing things?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "OCPD",
  },
  // PPD Questions (9, DSM-5)
  {
    id: 46,
    text: "Do you suspect, without sufficient basis, that others are exploiting, harming, or deceiving you?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "PPD",
  },
  {
    id: 47,
    text: "Are you preoccupied with unjustified doubts about the loyalty or trustworthiness of friends or associates?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "PPD",
  },
  {
    id: 48,
    text: "Are you reluctant to confide in others because of unwarranted fear that information will be used maliciously?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "PPD",
  },
  {
    id: 49,
    text: "Do you read hidden demeaning or threatening meanings into benign remarks or events?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "PPD",
  },
  {
    id: 50,
    text: "Do you persistently bear grudges and are unforgiving of insults, injuries, or slights?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "PPD",
  },
  {
    id: 51,
    text: "Do you perceive attacks on your character or reputation that are not apparent to others?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "PPD",
  },
  {
    id: 52,
    text: "Do you have recurrent suspicions, without justification, regarding fidelity of spouse or sexual partner?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "PPD",
  },
  {
    id: 53,
    text: "Do you question the loyalty of friends and family members?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "PPD",
  },
  {
    id: 54,
    text: "Do you interpret neutral or friendly actions as hostile or contemptuous?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    type: "PPD",
  },
];
