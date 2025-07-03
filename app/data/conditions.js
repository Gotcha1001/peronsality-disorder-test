// export const conditions = {
//   BPD: [
//     { name: "Borderline Personality Disorder", questionIds: [1, 2, 3, 4, 5] },
//   ],
//   NPD: [
//     {
//       name: "Narcissistic Personality Disorder",
//       questionIds: [6, 7, 8, 9, 10],
//     },
//   ],
//   ASPD: [
//     {
//       name: "Antisocial Personality Disorder",
//       questionIds: [11, 12, 13, 14, 15],
//     },
//   ],
//   AvPD: [
//     {
//       name: "Avoidant Personality Disorder",
//       questionIds: [16, 17, 18, 19, 20],
//     },
//   ],
// };

export const conditions = {
  BPD: {
    name: "Borderline Personality Disorder",
    shortName: "BPD",
    description:
      "A mental health condition characterized by intense emotions, unstable relationships, and self-image issues.",
    category: "Cluster B",
    prevalence: "0.7-2.7%",
    questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  NPD: {
    name: "Narcissistic Personality Disorder",
    shortName: "NPD",
    description:
      "A condition involving a grandiose sense of self-importance, need for admiration, and lack of empathy.",
    category: "Cluster B",
    prevalence: "0-6.2%",
    questionIds: [10, 11, 12, 13, 14, 15, 16, 17, 18],
  },
  ASPD: {
    name: "Antisocial Personality Disorder",
    shortName: "ASPD",
    description:
      "A pattern of disregard for and violation of the rights of others.",
    category: "Cluster B",
    prevalence: "0.5-1.9%",
    questionIds: [19, 20, 21, 22, 23, 24, 25, 26, 27],
  },
  AvPD: {
    name: "Avoidant Personality Disorder",
    shortName: "AvPD",
    description:
      "A pattern of social inhibition, feelings of inadequacy, and hypersensitivity to criticism.",
    category: "Cluster C",
    prevalence: "1.2-2.4%",
    questionIds: [28, 29, 30, 31, 32, 33, 34, 35, 36],
  },
  OCPD: {
    name: "Obsessive-Compulsive Personality Disorder",
    shortName: "OCPD",
    description:
      "A pattern of preoccupation with orderliness, perfectionism, and control.",
    category: "Cluster C",
    prevalence: "2.1-7.9%",
    questionIds: [37, 38, 39, 40, 41, 42, 43, 44, 45],
  },
  PPD: {
    name: "Paranoid Personality Disorder",
    shortName: "PPD",
    description:
      "A pattern of distrust and suspiciousness where others' motives are interpreted as malevolent.",
    category: "Cluster A",
    prevalence: "0.8-2.4%",
    questionIds: [46, 47, 48, 49, 50, 51, 52, 53, 54],
  },
};
