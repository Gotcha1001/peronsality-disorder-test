// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { questions } from "../../app/data/questions";
// import jsPDF from "jspdf";
// import NavBar from "../components/Navbar";

// export const dynamic = "force-dynamic";

// const calculateScores = (answeredQuestions) => {
//     const conditionScores = {
//         BPD: 0,
//         NPD: 0,
//         ASPD: 0,
//         AvPD: 0,
//     };
//     const questionsPerCondition = questions.reduce((acc, q) => {
//         acc[q.type] = (acc[q.type] || 0) + 1;
//         return acc;
//     }, {});

//     answeredQuestions.forEach((answer) => {
//         const question = questions.find((q) => q.id === answer.id);
//         if (question) {
//             const score = answer.selectedOptionIndex + 1; // 1 to 5
//             conditionScores[question.type] += score;
//         }
//     });

//     Object.keys(conditionScores).forEach((condition) => {
//         const maxScore = questionsPerCondition[condition] * 5;
//         conditionScores[condition] = Math.round((conditionScores[condition] / maxScore) * 100);
//     });

//     const likelihoods = {};
//     Object.keys(conditionScores).forEach((condition) => {
//         const score = conditionScores[condition];
//         if (score >= 75) likelihoods[condition] = "High";
//         else if (score >= 50) likelihoods[condition] = "Moderate";
//         else likelihoods[condition] = "Low";
//     });

//     return { conditionScores, likelihoods };
// };

// const getTopCondition = (conditionScores) => {
//     return Object.entries(conditionScores)
//         .sort((a, b) => b[1] - a[1])
//         .slice(0, 1)
//         .map(([condition]) => condition)[0];
// };

// async function fetchConditionAdvice(conditionScores, likelihoods, topCondition) {
//     try {
//         const response = await fetch("/api/condition-advice", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ conditionScores, likelihoods, topCondition }),
//         });
//         if (!response.ok) {
//             throw new Error(`Failed to fetch advice: ${response.statusText}`);
//         }
//         const data = await response.json();
//         return data.advice;
//     } catch (error) {
//         throw error;
//     }
// }

// const generatePDFReport = (conditionScores, likelihoods, topCondition, advice) => {
//     const doc = new jsPDF();
//     const pageHeight = 780;
//     const margin = 20;

//     const primaryColor = "#6B46C1";
//     const textColor = "#000000";
//     const separatorColor = "#4C51BF";
//     const backgroundColor = "#F3E8FF";

//     doc.setFillColor(backgroundColor);
//     doc.rect(0, 0, 210, 297, "F");

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(20);
//     doc.setTextColor(primaryColor);
//     doc.text("Personality Disorder Screening Report", 105, margin, { align: "center" });

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(textColor);
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, margin + 10, { align: "center" });

//     let y = margin + 25;

//     const checkPage = (requiredHeight) => {
//         if (y + requiredHeight > pageHeight) {
//             doc.addPage();
//             doc.setFillColor(backgroundColor);
//             doc.rect(0, 0, 210, 297, "F");
//             y = margin;
//         }
//     };

//     checkPage(60);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(primaryColor);
//     doc.text("Your Screening Results", margin, y);
//     y += 10;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(textColor);
//     Object.entries(conditionScores).forEach(([condition, score]) => {
//         doc.text(`${condition}: ${score}% (${likelihoods[condition]})`, margin + 5, y);
//         y += 8;
//     });

//     y += 5;
//     doc.setDrawColor(separatorColor);
//     doc.setLineWidth(0.5);
//     doc.line(margin, y, 190, y);
//     y += 6;

//     doc.addPage();
//     doc.setFillColor(backgroundColor);
//     doc.rect(0, 0, 210, 297, "F");
//     y = margin;

//     const sanitizeText = (text) => {
//         return (text || "Not available.")
//             .replace(/\n+/g, " ")
//             .replace(/\s+/g, " ")
//             .replace(/\*\*/g, "")
//             .trim();
//     };

//     const topConditionText = sanitizeText(advice.topConditionExplanation);
//     const topConditionLines = doc.splitTextToSize(topConditionText, 170);
//     const topConditionHeight = topConditionLines.length * 7 + 20;
//     checkPage(topConditionHeight);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(primaryColor);
//     doc.text(`About ${topCondition}`, margin, y);
//     y += 10;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(textColor);
//     topConditionLines.forEach((line) => {
//         doc.text(line, margin + 5, y);
//         y += 7;
//     });

//     y += 5;
//     doc.setDrawColor(separatorColor);
//     doc.setLineWidth(0.5);
//     doc.line(margin, y, 190, y);
//     y += 6;

//     const adviceText = sanitizeText(advice.conditionAdvice);
//     const adviceLines = doc.splitTextToSize(adviceText, 170);
//     const adviceHeight = adviceLines.length * 7 + 20;
//     checkPage(adviceHeight);
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor(primaryColor);
//     doc.text("Support and Next Steps", margin, y);
//     y += 10;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor(textColor);
//     adviceLines.forEach((line) => {
//         doc.text(line, margin + 5, y);
//         y += 7;
//     });

//     y += 5;
//     doc.setDrawColor(separatorColor);
//     doc.setLineWidth(0.5);
//     doc.line(margin, y, 190, y);
//     y += 6;

//     checkPage(30);
//     doc.setFont("helvetica", "italic");
//     doc.setFontSize(10);
//     doc.setTextColor("#666666");
//     doc.text(
//         "Disclaimer: This screening is for informational purposes only and does not provide a clinical diagnosis. Consult a licensed mental health professional for an accurate evaluation.",
//         margin,
//         y,
//         { maxWidth: 170 }
//     );

//     doc.save("Personality_Disorder_Screening_Report.pdf");
// };

// export default function ResultsPage() {
//     const [answeredQuestions, setAnsweredQuestions] = useState([]);
//     const [advice, setAdvice] = useState({
//         topConditionExplanation: "",
//         conditionAdvice: "",
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [retryCount, setRetryCount] = useState(0);
//     const [dataLoading, setDataLoading] = useState(true);

//     useEffect(() => {
//         const storedAnswers = JSON.parse(localStorage.getItem("answeredQuestions") || "[]");
//         const storedAdvice = JSON.parse(localStorage.getItem("conditionAdvice") || "{}");
//         setAnsweredQuestions(storedAnswers);
//         setAdvice(storedAdvice);
//         setDataLoading(false);
//         if (storedAdvice.topConditionExplanation && storedAdvice.conditionAdvice) {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         if (!dataLoading && answeredQuestions.length && !advice.topConditionExplanation && !advice.conditionAdvice) {
//             const { conditionScores, likelihoods } = calculateScores(answeredQuestions);
//             const topCondition = getTopCondition(conditionScores);
//             setIsLoading(true);
//             fetchConditionAdvice(conditionScores, likelihoods, topCondition)
//                 .then((fetchedAdvice) => {
//                     setAdvice(fetchedAdvice);
//                     localStorage.setItem("conditionAdvice", JSON.stringify(fetchedAdvice));
//                     setIsLoading(false);
//                     setError(null);
//                 })
//                 .catch((err) => {
//                     setError(err.message);
//                     setIsLoading(false);
//                 });
//         } else if (!dataLoading && !answeredQuestions.length) {
//             setIsLoading(false);
//         }
//     }, [answeredQuestions, retryCount, dataLoading]);

//     const handleRetry = () => {
//         setRetryCount((prev) => prev + 1);
//         setError(null);
//         setIsLoading(true);
//         localStorage.clear();
//     };

//     const handleDownloadPDF = () => {
//         const { conditionScores, likelihoods } = calculateScores(answeredQuestions);
//         const topCondition = getTopCondition(conditionScores);
//         generatePDFReport(conditionScores, likelihoods, topCondition, advice);
//     };

//     if (dataLoading) {
//         return (
//             <div className="min-h-screen bg-purple-950 flex items-center justify-center text-white">
//                 <div className="text-center">
//                     <p className="text-purple-200 mb-4">Loading...</p>
//                     <motion.div
//                         className="inline-block w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     />
//                 </div>
//             </div>
//         );
//     }

//     if (!answeredQuestions.length) {
//         return (
//             <div className="min-h-screen bg-purple-950 flex items-center justify-center text-white">
//                 <div className="text-center">
//                     <p className="text-pink-400 mb-4">No results available. Please take the screening first.</p>
//                     <Link href="/" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
//                         Take Screening
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     const { conditionScores, likelihoods } = calculateScores(answeredQuestions);
//     const topCondition = getTopCondition(conditionScores);

//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 p-4"
//         >
//             <NavBar />
//             <div className="max-w-4xl mx-auto text-white">
//                 <h1 className="text-3xl font-bold text-center mb-6">Your Screening Results</h1>
//                 {isLoading && (
//                     <div className="text-center text-purple-200 mb-6">
//                         Loading your personalized advice...
//                         <motion.div
//                             className="inline-block w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin ml-2"
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         />
//                     </div>
//                 )}
//                 {error && (
//                     <div className="text-center text-pink-400 mb-6">
//                         {error.includes("429") || error.includes("quota")
//                             ? "We've hit a temporary limit. Please try again in a moment."
//                             : error}
//                         <motion.button
//                             onClick={handleRetry}
//                             className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-3 rounded"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Retry
//                         </motion.button>
//                     </div>
//                 )}
//                 <div className="bg-white/10 rounded-2xl p-6 mb-6">
//                     <h2 className="text-xl font-semibold mb-4 text-purple-400">
//                         Your Screening Results
//                     </h2>
//                     <div className="grid md:grid-cols-2 gap-4">
//                         {Object.entries(conditionScores).map(([condition, score]) => (
//                             <div key={condition} className="bg-white/5 rounded-lg p-3">
//                                 <h3 className="text-lg font-medium capitalize text-indigo-200">
//                                     {condition}
//                                 </h3>
//                                 <p className="text-sm text-purple-200">
//                                     Score: {score}% ({likelihoods[condition]})
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {advice.topConditionExplanation && (
//                     <div className="bg-white/10 rounded-2xl p-6 mb-6">
//                         <h2 className="text-xl font-semibold mb-4 text-purple-400">
//                             About {topCondition}
//                         </h2>
//                         <p className="text-purple-200 leading-relaxed">{advice.topConditionExplanation}</p>
//                     </div>
//                 )}
//                 {advice.conditionAdvice && (
//                     <div className="bg-white/10 rounded-2xl p-6 mb-6">
//                         <h2 className="text-xl font-semibold mb-4 text-purple-400">
//                             Support and Next Steps
//                         </h2>
//                         <p className="text-purple-200 leading-relaxed">{advice.conditionAdvice}</p>
//                     </div>
//                 )}
//                 <div className="bg-white/10 rounded-2xl p-6 mb-6 text-sm text-purple-300 italic">
//                     Disclaimer: This screening is for informational purposes only and does not provide a clinical diagnosis. Consult a licensed mental health professional for an accurate evaluation.
//                 </div>
//                 <div className="flex justify-center gap-4">
//                     <motion.button
//                         onClick={handleDownloadPDF}
//                         className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full font-medium"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         Download Report
//                     </motion.button>
//                     <Link href="/">
//                         <motion.div
//                             className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-full"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Retake Screening
//                         </motion.div>
//                     </Link>
//                 </div>
//             </div>
//         </motion.div>
//     );
// }

///////////////THIS ONE WORKS WITH THE API
// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { conditions } from "../data/conditions";
// import jsPDF from "jspdf";
// import NavBar from "../components/NavBar";
// import { Info, Download } from "lucide-react";

// export const dynamic = "force-dynamic";

// const calculateScores = (answers) => {
//     const scores = {};
//     Object.keys(conditions).forEach((conditionKey) => {
//         const condition = conditions[conditionKey];
//         const conditionAnswers = condition.questionIds.map((id) => answers[id] || 0);
//         const totalPossible = condition.questionIds.length * 4;
//         const actualScore = conditionAnswers.reduce((sum, answer) => sum + answer, 0);
//         const percentage = Math.round((actualScore / totalPossible) * 100);
//         scores[conditionKey] = {
//             percentage,
//             rawScore: actualScore,
//             maxScore: totalPossible,
//             likelihood: percentage < 25 ? "Low" : percentage < 50 ? "Moderate" : percentage < 75 ? "High" : "Very High",
//         };
//     });
//     return scores;
// };

// async function fetchConditionAdvice(highLikelihoodConditions) {
//     console.log("Fetching advice for conditions:", highLikelihoodConditions);
//     try {
//         const response = await fetch("/api/condition-advice", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ highLikelihoodConditions }),
//         });
//         if (!response.ok) throw new Error(`Failed to fetch advice: ${response.statusText}`);
//         const data = await response.json();
//         console.log("API response:", data);
//         return data;
//     } catch (error) {
//         console.error("Fetch error:", error);
//         throw error;
//     }
// }

// const generatePDFReport = (scores, advice) => {
//     const doc = new jsPDF();
//     const margin = 20;
//     let y = margin;

//     doc.setFillColor("#F3E8FF");
//     doc.rect(0, 0, 210, 297, "F");
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(20);
//     doc.setTextColor("#6B46C1");
//     doc.text("MindScreen Pro Report", 105, y, { align: "center" });
//     y += 10;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     doc.setTextColor("#000000");
//     doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, y, { align: "center" });
//     y += 15;

//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.text("Screening Results", margin, y);
//     y += 10;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(12);
//     Object.entries(scores).forEach(([key, { percentage, likelihood }]) => {
//         doc.text(`${conditions[key].name}: ${percentage}% (${likelihood})`, margin + 5, y);
//         y += 8;
//     });

//     y += 10;
//     advice.forEach(({ condition, explanation, advice: conditionAdvice }) => {
//         doc.addPage();
//         doc.setFillColor("#F3E8FF");
//         doc.rect(0, 0, 210, 297, "F");
//         y = margin;
//         doc.setFont("helvetica", "bold");
//         doc.setFontSize(16);
//         doc.text(`About ${condition}`, margin, y);
//         y += 10;
//         doc.setFont("helvetica", "normal");
//         doc.setFontSize(12);
//         doc.text(doc.splitTextToSize(explanation, 170), margin + 5, y);
//         y += explanation.split("\n").length * 7 + 10;
//         doc.setFont("helvetica", "bold");
//         doc.text("Support and Next Steps", margin, y);
//         y += 10;
//         doc.setFont("helvetica", "normal");
//         doc.text(doc.splitTextToSize(conditionAdvice, 170), margin + 5, y);
//         y += conditionAdvice.split("\n").length * 7 + 10;
//     });

//     y += 10;
//     doc.setFont("helvetica", "italic");
//     doc.setFontSize(10);
//     doc.setTextColor("#666666");
//     doc.text(
//         "Disclaimer: This screening is for informational purposes only and does not provide a clinical diagnosis. Consult a licensed mental health professional for an accurate evaluation.",
//         margin, y, { maxWidth: 170 }
//     );

//     doc.save("MindScreen_Pro_Report.pdf");
// };

// export default function ResultsPage() {
//     const [answers, setAnswers] = useState({});
//     const [advice, setAdvice] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const storedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");
//         setAnswers(storedAnswers);
//         setIsLoading(false);
//     }, []);

//     useEffect(() => {
//         if (Object.keys(answers).length && !isLoading) {
//             const scores = calculateScores(answers);
//             const highLikelihoodConditions = Object.entries(scores)
//                 .filter(([_, { likelihood }]) => ["High", "Very High"].includes(likelihood))
//                 .map(([key]) => conditions[key].name);

//             if (highLikelihoodConditions.length === 0) {
//                 setAdvice([{ condition: "None", explanation: "No high-likelihood conditions identified.", advice: "Consider discussing general mental health with a professional." }]);
//                 setIsLoading(false);
//             } else {
//                 fetchConditionAdvice(highLikelihoodConditions)
//                     .then(({ advice }) => {
//                         setAdvice(advice);
//                         setIsLoading(false);
//                     })
//                     .catch((err) => {
//                         console.error("Fetch error:", err);
//                         setError(err.message);
//                         const topCondition = highLikelihoodConditions[0] || "Unknown";
//                         setAdvice([{
//                             condition: topCondition,
//                             explanation: `This screening suggests traits associated with ${topCondition} may be present. This is not a diagnosis; please consult a licensed mental health professional for a thorough evaluation.`,
//                             advice: `To address traits related to ${topCondition}, consider seeking professional support from a psychologist or therapist. Therapy options like cognitive-behavioral therapy or support groups can help. Contact a mental health professional for personalized guidance.`
//                         }]);
//                         setIsLoading(false);
//                     });
//             }
//         }
//     }, [answers]); // Only depend on answers

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
//                 <motion.div className="text-purple-200 text-center">
//                     Loading...
//                     <motion.div
//                         className="inline-block w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin ml-2"
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                     />
//                 </motion.div>
//             </div>
//         );
//     }

//     if (!Object.keys(answers).length) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-pink-400 mb-4">No results available. Please complete the assessment.</p>
//                     <Link href="/quiz" className="btn-primary">Take Assessment</Link>
//                 </div>
//             </div>
//         );
//     }

//     const scores = calculateScores(answers);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden">
//             <NavBar />
//             <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
//                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//                     <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
//                         Your Screening Results
//                     </h1>
//                     {error && (
//                         <div className="text-center text-pink-400 mb-6">
//                             {error.includes("429") ? "Temporary API limit reached. Displaying fallback information for primary condition." : `Error: ${error}. Displaying fallback information.`}
//                             <motion.button
//                                 onClick={() => window.location.reload()}
//                                 className="ml-4 btn-primary"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                             >
//                                 Retry
//                             </motion.button>
//                         </div>
//                     )}
//                     <div className="card mb-6">
//                         <h2 className="text-xl font-semibold text-purple-400 mb-4">Results Overview</h2>
//                         <div className="grid md:grid-cols-2 gap-4">
//                             {Object.entries(scores).map(([key, { percentage, likelihood }]) => (
//                                 <div key={key} className="bg-white/5 rounded-lg p-4">
//                                     <h3 className="text-lg font-medium text-white">{conditions[key].name}</h3>
//                                     <p className="text-sm text-purple-200">Score: {percentage}% ({likelihood})</p>
//                                     <p className="text-sm text-purple-300">Category: {conditions[key].category}</p>
//                                     <p className="text-sm text-purple-300">Prevalence: {conditions[key].prevalence}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     {advice.map(({ condition, explanation, advice: conditionAdvice }, index) => (
//                         <div key={index} className="card mb-6">
//                             <h2 className="text-xl font-semibold text-purple-400 mb-4">{condition}</h2>
//                             <p className="text-purple-200 mb-4">{explanation}</p>
//                             <h3 className="text-lg font-semibold text-purple-400 mb-2">Support and Next Steps</h3>
//                             <p className="text-purple-200">{conditionAdvice}</p>
//                         </div>
//                     ))}
//                     <div className="card mb-6 text-sm text-purple-300 italic">
//                         <div className="flex items-center space-x-2 mb-2">
//                             <Info className="w-4 h-4" />
//                             <span>Disclaimer</span>
//                         </div>
//                         <p>
//                             This screening is for informational purposes only and does not provide a clinical diagnosis. Consult a licensed mental health professional for an accurate evaluation.
//                         </p>
//                     </div>
//                     <div className="flex justify-center gap-4">
//                         <motion.button
//                             onClick={() => generatePDFReport(scores, advice)}
//                             className="btn-primary flex items-center space-x-2"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <Download className="w-5 h-5" />
//                             <span>Download Report</span>
//                         </motion.button>
//                         <Link href="/quiz">
//                             <motion.div className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                                 Retake Assessment
//                             </motion.div>
//                         </Link>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// }



"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { conditions } from "../data/conditions";
import jsPDF from "jspdf";
import NavBar from "../components/NavBar";
import { Info, Download } from "lucide-react";

export const dynamic = "force-dynamic";

const calculateScores = (answers) => {
    const scores = {};
    Object.keys(conditions).forEach((conditionKey) => {
        const condition = conditions[conditionKey];
        const conditionAnswers = condition.questionIds.map((id) => answers[id] || 0);
        const totalPossible = condition.questionIds.length * 4;
        const actualScore = conditionAnswers.reduce((sum, answer) => sum + answer, 0);
        const percentage = Math.round((actualScore / totalPossible) * 100);
        scores[conditionKey] = {
            percentage,
            rawScore: actualScore,
            maxScore: totalPossible,
            likelihood: percentage < 25 ? "Low" : percentage < 50 ? "Moderate" : percentage < 75 ? "High" : "Very High",
        };
    });
    return scores;
};

async function fetchConditionAdvice(highLikelihoodConditions) {
    console.log("Fetching advice for conditions:", highLikelihoodConditions);
    try {
        const response = await fetch("/api/condition-advice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ highLikelihoodConditions }),
        });
        if (!response.ok) throw new Error(`Failed to fetch advice: ${response.statusText}`);
        const data = await response.json();
        console.log("API response:", data);
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

// const generatePDFReport = (scores, advice) => {
//     const doc = new jsPDF();
//     const margin = 20;
//     const pageHeight = 297; // A4 height in mm
//     const maxContentHeight = pageHeight - margin * 2; // Usable height per page
//     let y = margin;

//     // Helper function to check for page breaks
//     const checkPageBreak = (requiredHeight) => {
//         if (y + requiredHeight > maxContentHeight) {
//             doc.addPage();
//             doc.setFillColor("#F3E8FF");
//             doc.rect(0, 0, 210, 297, "F");
//             y = margin;
//         }
//     };

//     // Title Page
//     doc.setFillColor("#F3E8FF");
//     doc.rect(0, 0, 210, 297, "F");
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor("#6B46C1");
//     doc.text("MindScreen Pro Report", 105, y, { align: "center" });
//     y += 15;
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(14);
//     doc.setTextColor("#000000");
//     doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, y, { align: "center" });
//     y += 15;
//     doc.setFontSize(12);
//     doc.setTextColor("#666666");
//     const disclaimerLines = doc.splitTextToSize(
//         "This report provides screening results for informational purposes only. Consult a licensed mental health professional for a clinical evaluation.",
//         170
//     );
//     checkPageBreak(disclaimerLines.length * 6);
//     doc.text(disclaimerLines, 105, y, { align: "center" });
//     y += disclaimerLines.length * 6 + 10;

//     // Results Overview Page
//     doc.addPage();
//     doc.setFillColor("#F3E8FF");
//     doc.rect(0, 0, 210, 297, "F");
//     y = margin;
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(20);
//     doc.setTextColor("#6B46C1");
//     doc.text("Your Screening Results", 105, y, { align: "center" });
//     y += 15;
//     doc.setFontSize(16);
//     doc.setTextColor("#000000");
//     doc.text("Results Overview", margin, y);
//     y += 10;

//     Object.entries(scores).forEach(([key, { percentage, likelihood }]) => {
//         checkPageBreak(24); // Space for name, score, category, prevalence
//         doc.setFont("helvetica", "bold");
//         doc.setFontSize(12);
//         doc.text(conditions[key].name, margin + 5, y);
//         y += 6;
//         doc.setFont("helvetica", "normal");
//         doc.text(`Score: ${percentage}% (${likelihood})`, margin + 10, y);
//         y += 6;
//         doc.text(`Category: ${conditions[key].category}`, margin + 10, y);
//         y += 6;
//         doc.text(`Prevalence: ${conditions[key].prevalence}`, margin + 10, y);
//         y += 6;
//     });

//     // Advice Pages
//     advice.forEach(({ condition, explanation, advice: conditionAdvice }) => {
//         doc.addPage();
//         doc.setFillColor("#F3E8FF");
//         doc.rect(0, 0, 210, 297, "F");
//         y = margin;
//         doc.setFont("helvetica", "bold");
//         doc.setFontSize(16);
//         doc.setTextColor("#6B46C1");
//         doc.text(condition, margin, y);
//         y += 10;

//         doc.setFont("helvetica", "normal");
//         doc.setFontSize(12);
//         doc.setTextColor("#000000");
//         const explanationLines = doc.splitTextToSize(explanation, 170);
//         checkPageBreak(explanationLines.length * 6);
//         doc.text(explanationLines, margin + 5, y);
//         y += explanationLines.length * 6 + 10;

//         doc.setFont("helvetica", "bold");
//         doc.text("Support and Next Steps", margin, y);
//         y += 10;
//         doc.setFont("helvetica", "normal");
//         const adviceLines = doc.splitTextToSize(conditionAdvice, 170);
//         checkPageBreak(adviceLines.length * 6);
//         doc.text(adviceLines, margin + 5, y);
//         y += adviceLines.length * 6 + 10;
//     });

//     // Disclaimer Page
//     doc.addPage();
//     doc.setFillColor("#F3E8FF");
//     doc.rect(0, 0, 210, 297, "F");
//     y = margin;
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(16);
//     doc.setTextColor("#6B46C1");
//     doc.text("Disclaimer", margin, y);
//     y += 10;
//     doc.setFont("helvetica", "italic");
//     doc.setFontSize(12);
//     doc.setTextColor("#666666");
//     const finalDisclaimerLines = doc.splitTextToSize(
//         "This screening is for informational purposes only and does not provide a clinical diagnosis. Consult a licensed mental health professional for an accurate evaluation.",
//         170
//     );
//     checkPageBreak(finalDisclaimerLines.length * 6);
//     doc.text(finalDisclaimerLines, margin + 5, y);

//     doc.save("MindScreen_Pro_Report.pdf");
// };

const generatePDFReport = (scores, advice) => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = 210;
    const pageHeight = 297;
    const maxContentHeight = pageHeight - margin * 2;
    let y = margin;

    // Color palette
    const colors = {
        primary: '#6B46C1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        background: '#F8FAFC',
        cardBg: '#FFFFFF',
        text: '#1F2937',
        textLight: '#6B7280',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444'
    };

    // Helper functions
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const setColor = (color) => {
        const rgb = hexToRgb(color);
        if (rgb) doc.setTextColor(rgb.r, rgb.g, rgb.b);
    };

    const setFillColor = (color) => {
        const rgb = hexToRgb(color);
        if (rgb) doc.setFillColor(rgb.r, rgb.g, rgb.b);
    };

    const checkPageBreak = (requiredHeight) => {
        if (y + requiredHeight > maxContentHeight) {
            doc.addPage();
            addPageBackground();
            y = margin;
        }
    };

    const addPageBackground = () => {
        // Gradient-like background with rectangles
        setFillColor('#F8FAFC');
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // Decorative elements
        setFillColor('#E0E7FF');
        doc.ellipse(pageWidth - 30, 30, 40, 20, 'F');
        doc.ellipse(30, pageHeight - 30, 35, 18, 'F');

        setFillColor('#F3E8FF');
        doc.ellipse(pageWidth - 50, pageHeight - 50, 25, 15, 'F');
        doc.ellipse(50, 50, 30, 12, 'F');
    };

    const addHeader = (title, subtitle = null) => {
        // Header background
        setFillColor(colors.primary);
        doc.rect(0, 0, pageWidth, 50, 'F');

        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.text(title, pageWidth / 2, 25, { align: 'center' });

        if (subtitle) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.text(subtitle, pageWidth / 2, 35, { align: 'center' });
        }

        y = 60;
    };

    const addCard = (content, cardY = null, cardHeight = 60) => {
        const cardX = margin;
        const cardWidth = pageWidth - (margin * 2);

        if (cardY === null) cardY = y;

        // Card shadow
        setFillColor('#E5E7EB');
        doc.rect(cardX + 2, cardY + 2, cardWidth, cardHeight, 'F');

        // Card background
        setFillColor(colors.cardBg);
        doc.rect(cardX, cardY, cardWidth, cardHeight, 'F');

        // Card border
        setColor(colors.primary);
        doc.setLineWidth(0.5);
        doc.rect(cardX, cardY, cardWidth, cardHeight, 'S');

        return { x: cardX + 10, y: cardY + 10, width: cardWidth - 20, height: cardHeight - 20 };
    };

    const addScoreBar = (percentage, x, y, width = 100) => {
        const barHeight = 8;

        // Background bar
        setFillColor('#E5E7EB');
        doc.rect(x, y, width, barHeight, 'F');

        // Progress bar
        const progressWidth = (percentage / 100) * width;
        let barColor = colors.success;
        if (percentage >= 50) barColor = colors.warning;
        if (percentage >= 75) barColor = colors.danger;

        setFillColor(barColor);
        doc.rect(x, y, progressWidth, barHeight, 'F');

        // Border
        setColor('#D1D5DB');
        doc.setLineWidth(0.3);
        doc.rect(x, y, width, barHeight, 'S');
    };

    const getLikelihoodColor = (likelihood) => {
        switch (likelihood) {
            case 'Low': return colors.success;
            case 'Moderate': return colors.warning;
            case 'High': return colors.danger;
            case 'Very High': return colors.danger;
            default: return colors.textLight;
        }
    };

    // === TITLE PAGE ===
    addPageBackground();

    // Logo/Icon area
    setFillColor(colors.primary);
    doc.circle(pageWidth / 2, 80, 25, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text('MS', pageWidth / 2, 85, { align: 'center' });

    // Main title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    setColor(colors.primary);
    doc.text('MindScreen Pro', pageWidth / 2, 130, { align: 'center' });

    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);
    setColor(colors.secondary);
    doc.text('Mental Health Screening Report', pageWidth / 2, 145, { align: 'center' });

    // Date and time
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    setColor(colors.textLight);
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    doc.text(`Generated on ${dateStr} at ${timeStr}`, pageWidth / 2, 165, { align: 'center' });

    // Disclaimer box
    const disclaimerY = 190;
    setFillColor('#FEF3C7');
    doc.rect(margin, disclaimerY, pageWidth - (margin * 2), 70, 'F');
    setColor('#D97706');
    doc.setLineWidth(1);
    doc.rect(margin, disclaimerY, pageWidth - (margin * 2), 70, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    setColor('#92400E');
    doc.text('Important Disclaimer', pageWidth / 2, disclaimerY + 15, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    setColor('#78350F');
    const disclaimerText = doc.splitTextToSize(
        'This report provides screening results for informational purposes only and does not constitute a clinical diagnosis. The results are based on self-reported responses and should be interpreted by a licensed mental health professional. Please consult with a qualified healthcare provider for proper evaluation and treatment recommendations.',
        pageWidth - (margin * 2) - 20
    );
    doc.text(disclaimerText, pageWidth / 2, disclaimerY + 30, { align: 'center' });

    // === RESULTS OVERVIEW PAGE ===
    doc.addPage();
    addPageBackground();
    addHeader('Screening Results Overview', `Assessment completed on ${dateStr}`);

    // Summary statistics
    const totalConditions = Object.keys(scores).length;
    const highRiskCount = Object.values(scores).filter(s => ['High', 'Very High'].includes(s.likelihood)).length;
    const avgScore = Math.round(Object.values(scores).reduce((sum, s) => sum + s.percentage, 0) / totalConditions);

    // Summary cards
    const summaryCards = [
        { label: 'Conditions Assessed', value: totalConditions, color: colors.primary },
        { label: 'High Risk Areas', value: highRiskCount, color: colors.danger },
        { label: 'Average Score', value: `${avgScore}%`, color: colors.secondary }
    ];

    let cardX = margin;
    summaryCards.forEach((card, index) => {
        const cardWidth = (pageWidth - (margin * 2) - 20) / 3;

        // Card background
        setFillColor(card.color);
        doc.rect(cardX, y, cardWidth, 40, 'F');

        // Card content
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.text(card.value.toString(), cardX + cardWidth / 2, y + 18, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(card.label, cardX + cardWidth / 2, y + 30, { align: 'center' });

        cardX += cardWidth + 10;
    });

    y += 60;

    // Detailed results
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    setColor(colors.primary);
    doc.text('Detailed Results', margin, y);
    y += 15;

    Object.entries(scores).forEach(([key, { percentage, likelihood }]) => {
        checkPageBreak(80);

        const cardArea = addCard(null, y, 70);

        // Condition name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        setColor(colors.text);
        doc.text(conditions[key].name, cardArea.x, cardArea.y + 8);

        // Score and likelihood
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        setColor(getLikelihoodColor(likelihood));
        doc.text(`${percentage}% - ${likelihood} Likelihood`, cardArea.x, cardArea.y + 20);

        // Score bar
        addScoreBar(percentage, cardArea.x, cardArea.y + 28, 120);

        // Additional info - ensure it fits within card bounds
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        setColor(colors.textLight);

        // Truncate text if too long to fit in card
        const categoryText = `Category: ${conditions[key].category}`;
        const prevalenceText = `Prevalence: ${conditions[key].prevalence}`;

        const maxTextWidth = cardArea.width - 10;
        const categoryLines = doc.splitTextToSize(categoryText, maxTextWidth);
        const prevalenceLines = doc.splitTextToSize(prevalenceText, maxTextWidth);

        doc.text(categoryLines[0], cardArea.x, cardArea.y + 43);
        doc.text(prevalenceLines[0], cardArea.x, cardArea.y + 53);

        y += 80;
    });

    // === ADVICE PAGES ===
    advice.forEach(({ condition, explanation, advice: conditionAdvice }, index) => {
        doc.addPage();
        addPageBackground();
        addHeader(`${condition} - Guidance & Support`);

        // What this means section
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        setColor(colors.primary);
        doc.text('What This Means', margin, y);
        y += 10;

        // Calculate required height for explanation
        const explanationLines = doc.splitTextToSize(explanation, pageWidth - (margin * 2) - 20);
        const explanationHeight = Math.max(60, explanationLines.length * 5 + 20);

        const explanationCard = addCard(null, y, explanationHeight);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        setColor(colors.text);
        doc.text(explanationLines, explanationCard.x, explanationCard.y + 5);
        y += explanationHeight + 10;

        checkPageBreak(80);

        // Support and next steps section
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        setColor(colors.primary);
        doc.text('Support & Next Steps', margin, y);
        y += 10;

        // Calculate required height for advice
        const adviceLines = doc.splitTextToSize(conditionAdvice, pageWidth - (margin * 2) - 20);
        const adviceHeight = Math.max(60, adviceLines.length * 5 + 20);

        const adviceCard = addCard(null, y, adviceHeight);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        setColor(colors.text);
        doc.text(adviceLines, adviceCard.x, adviceCard.y + 5);
        y += adviceHeight + 10;

        checkPageBreak(60);

        // Resources section
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        setColor(colors.secondary);
        doc.text('Helpful Resources', margin, y);
        y += 10;

        const resources = [
            '• National Suicide Prevention Lifeline: 988',
            '• Crisis Text Line: Text HOME to 741741',
            '• Mental Health America: mhanational.org',
            '• Psychology Today: psychologytoday.com'
        ];

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        setColor(colors.textLight);
        resources.forEach(resource => {
            doc.text(resource, margin + 10, y);
            y += 6;
        });
    });

    // === FINAL DISCLAIMER PAGE ===
    doc.addPage();
    addPageBackground();
    addHeader('Important Information & Next Steps');

    // Professional consultation reminder
    setFillColor('#DBEAFE');
    doc.rect(margin, y, pageWidth - (margin * 2), 80, 'F');
    setColor('#1D4ED8');
    doc.setLineWidth(1);
    doc.rect(margin, y, pageWidth - (margin * 2), 80, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    setColor('#1E40AF');
    doc.text('Professional Consultation Recommended', pageWidth / 2, y + 15, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    setColor('#1E3A8A');
    const consultationText = doc.splitTextToSize(
        'These results are screening tools only and should not replace professional medical advice. We strongly recommend discussing these results with a licensed mental health professional who can provide proper evaluation, diagnosis, and treatment recommendations based on your individual circumstances.',
        pageWidth - (margin * 2) - 20
    );
    doc.text(consultationText, pageWidth / 2, y + 35, { align: 'center' });

    y += 100;

    // Footer
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    setColor(colors.textLight);
    doc.text('MindScreen Pro - Mental Health Screening Tool', pageWidth / 2, pageHeight - 20, { align: 'center' });
    doc.text(`Report generated on ${dateStr}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Save the PDF
    doc.save('MindScreen_Pro_Report.pdf');
};



export default function ResultsPage() {
    const [answers, setAnswers] = useState({});
    const [advice, setAdvice] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedAnswers = JSON.parse(localStorage.getItem("answers") || "{}");
        setAnswers(storedAnswers);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (Object.keys(answers).length && !isLoading) {
            const scores = calculateScores(answers);
            const highLikelihoodConditions = Object.entries(scores)
                .filter(([_, { likelihood }]) => ["High", "Very High"].includes(likelihood))
                .map(([key]) => conditions[key].name);

            if (highLikelihoodConditions.length === 0) {
                setAdvice([{ condition: "None", explanation: "No high-likelihood conditions identified.", advice: "Consider discussing general mental health with a professional." }]);
                setIsLoading(false);
            } else {
                fetchConditionAdvice(highLikelihoodConditions)
                    .then(({ advice }) => {
                        setAdvice(advice);
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        console.error("Fetch error:", err);
                        setError(err.message);
                        setAdvice(highLikelihoodConditions.map((condition) => ({
                            condition,
                            explanation: `This screening suggests traits associated with ${condition} may be present. This is not a diagnosis; please consult a licensed mental health professional for a thorough evaluation.`,
                            advice: `To address traits related to ${condition}, consider seeking professional support from a psychologist or therapist. Therapy options like cognitive-behavioral therapy or support groups can help. Contact a mental health professional for personalized guidance.`
                        })));
                        setIsLoading(false);
                    });
            }
        }
    }, [answers]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
                <motion.div className="text-purple-200 text-center">
                    Loading...
                    <motion.div
                        className="inline-block w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin ml-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </div>
        );
    }

    if (!Object.keys(answers).length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-pink-400 mb-4">No results available. Please complete the assessment.</p>
                    <Link href="/quiz" className="btn-primary">Take Assessment</Link>
                </div>
            </div>
        );
    }

    const scores = calculateScores(answers);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden">
            <NavBar />
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Your Screening Results
                    </h1>
                    {error && (
                        <div className="text-center text-pink-400 mb-6">
                            {error.includes("429") ? "Temporary API limit reached. Displaying fallback information for high-likelihood conditions." : `Error: ${error}. Displaying fallback information.`}
                            <motion.button
                                onClick={() => window.location.reload()}
                                className="ml-4 btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Retry
                            </motion.button>
                        </div>
                    )}
                    <div className="card mb-6">
                        <h2 className="text-xl font-semibold text-purple-400 mb-4">Results Overview</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {Object.entries(scores).map(([key, { percentage, likelihood }]) => (
                                <div key={key} className="bg-white/5 rounded-lg p-4">
                                    <h3 className="text-lg font-medium text-white">{conditions[key].name}</h3>
                                    <p className="text-sm text-purple-200">Score: ${percentage}% (${likelihood})</p>
                                    <p className="text-sm text-purple-300">Category: ${conditions[key].category}</p>
                                    <p className="text-sm text-purple-300">Prevalence: ${conditions[key].prevalence}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {advice.map(({ condition, explanation, advice: conditionAdvice }, index) => (
                        <div key={index} className="card mb-6">
                            <h2 className="text-xl font-semibold text-purple-400 mb-4">{condition}</h2>
                            <p className="text-purple-200 mb-4">{explanation}</p>
                            <h3 className="text-lg font-semibold text-purple-400 mb-2">Support and Next Steps</h3>
                            <p className="text-purple-200">{conditionAdvice}</p>
                        </div>
                    ))}
                    <div className="card mb-6 text-sm text-purple-300 italic">
                        <div className="flex items-center space-x-2 mb-2">
                            <Info className="w-4 h-4" />
                            <span>Disclaimer</span>
                        </div>
                        <p>
                            This screening is for informational purposes only and does not provide a clinical diagnosis. Consult a licensed mental health professional for an accurate evaluation.
                        </p>
                    </div>
                    <div className="flex justify-center gap-4">
                        <motion.button
                            onClick={() => generatePDFReport(scores, advice)}
                            className="btn-primary flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download className="w-5 h-5" />
                            <span>Download Report</span>
                        </motion.button>
                        <Link href="/quiz">
                            <motion.div className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                Retake Assessment
                            </motion.div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}