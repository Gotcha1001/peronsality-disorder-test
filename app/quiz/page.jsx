// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { questions } from "../../app/data/questions";
// import NavBar from "../components/Navbar";


// export const dynamic = "force-dynamic";

// const shuffleArray = (array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffled[i], shuffled[j]] = [shuffled[i], shuffled[j]];
//     }
//     return shuffled;
// };

// export default function QuizPage() {
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
//     const [answeredQuestions, setAnsweredQuestions] = useState([]);
//     const [shuffledQuestions, setShuffledQuestions] = useState([]);
//     const [testCompleted, setTestCompleted] = useState(false);
//     const [shouldNavigate, setShouldNavigate] = useState(false);

//     const isLastQuestion = currentQuestionIndex + 1 === shuffledQuestions.length;

//     useEffect(() => {
//         localStorage.removeItem("answeredQuestions");
//         const shuffled = shuffleArray(questions);
//         setShuffledQuestions(shuffled);
//     }, []);

//     useEffect(() => {
//         if (testCompleted && shouldNavigate) {
//             localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions));
//             window.location.href = "/results";
//         }
//     }, [testCompleted, shouldNavigate, answeredQuestions]);

//     const handleAnswer = () => {
//         const confirmSubmit = isLastQuestion
//             ? window.confirm("Are you ready to see your screening results?")
//             : true;
//         if (!confirmSubmit) return;

//         const currentQuestion = shuffledQuestions[currentQuestionIndex];
//         const newAnsweredQuestions = [
//             ...answeredQuestions,
//             {
//                 id: currentQuestion.id,
//                 type: currentQuestion.type,
//                 selectedOptionIndex: selectedOptionIndex ?? -1,
//             },
//         ];
//         setAnsweredQuestions(newAnsweredQuestions);

//         if (isLastQuestion) {
//             setTestCompleted(true);
//             setShouldNavigate(true);
//         } else {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             setSelectedOptionIndex(null);
//         }
//     };

//     if (shuffledQuestions.length === 0) {
//         return <div className="text-white">Loading questions...</div>;
//     }

//     const currentQuestion = shuffledQuestions[currentQuestionIndex];
//     const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 p-4"
//         >
//             <NavBar />
//             <div className="max-w-4xl mx-auto">
//                 <div className="flex justify-between items-center mb-8 text-white">
//                     <span className="text-xl font-semibold">Personality Disorder Screening</span>
//                     <div>
//                         <div className="text-sm text-purple-200">Question</div>
//                         <div className="font-semibold">
//                             {currentQuestionIndex + 1} of {shuffledQuestions.length}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mb-8">
//                     <div className="bg-gray-700 rounded-full h-2">
//                         <div
//                             className="bg-gradient-to-r from-purple-400 to-indigo-400 h-2 rounded-full"
//                             style={{ width: `${progress}%` }}
//                         />
//                     </div>
//                 </div>
//                 <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
//                     <h2 className="text-2xl text-white mb-6">
//                         {currentQuestion.text}
//                     </h2>
//                     <div className="grid gap-4 mb-8">
//                         {currentQuestion.options.map((option, index) => (
//                             <button
//                                 key={index}
//                                 onClick={() => setSelectedOptionIndex(index)}
//                                 className={`p-4 rounded-xl text-left ${selectedOptionIndex === index
//                                     ? "bg-purple-600/30 border-purple-400 text-white"
//                                     : "bg-white/5 text-purple-200 hover:bg-white/10"
//                                     } border-2 border-transparent`}
//                             >
//                                 {option}
//                             </button>
//                         ))}
//                     </div>
//                     <div className="flex justify-end">
//                         <motion.button
//                             onClick={handleAnswer}
//                             disabled={selectedOptionIndex === null}
//                             className={`px-10 py-4 rounded-full font-semibold ${selectedOptionIndex !== null
//                                 ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white"
//                                 : "bg-purple-900 text-purple-400 cursor-not-allowed"
//                                 }`}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             {isLastQuestion ? "See Results" : "Next"}
//                         </motion.button>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// }


"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "../../app/data/questions";
import { conditions } from "../../app/data/conditions";
import NavBar from "../../app/components/Navbar";
import { ArrowLeft, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[i], shuffled[j]];
    }
    return shuffled;
};

export default function QuizPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    useEffect(() => {
        localStorage.removeItem("answers");
        setShuffledQuestions(shuffleArray(questions));
    }, []);

    const currentQuestion = shuffledQuestions[currentIndex] || {};
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleNext = () => {
        if (selectedOption !== null) {
            const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
            setAnswers(newAnswers);
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedOption(answers[questions[currentIndex + 1]?.id] || null);
            } else {
                localStorage.setItem("answers", JSON.stringify(newAnswers));
                window.location.href = "/results";
            }
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedOption(answers[shuffledQuestions[currentIndex - 1]?.id] || null);
        }
    };

    if (shuffledQuestions.length === 0) {
        return <div className="text-white">Loading questions...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
            <NavBar />
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <motion.button
                            onClick={() => window.location.href = "/"}
                            className="flex items-center space-x-2 text-purple-200 hover:text-white transition-colors"
                            whileHover={{ x: -5 }}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Home</span>
                        </motion.button>
                        <div className="text-white text-right">
                            <div className="text-sm text-purple-200">Question</div>
                            <div className="text-xl font-semibold">{currentIndex + 1} of {questions.length}</div>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 rounded-full shadow-lg"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </motion.div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="card"
                    >
                        <div className="mb-6">
                            <div className="text-sm text-purple-300 mb-2">
                                Category: {conditions[currentQuestion.type]?.name}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-semibold text-white leading-relaxed">
                                {currentQuestion.text}
                            </h2>
                        </div>
                        <div className="space-y-4 mb-8">
                            {currentQuestion.options?.map((option, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setSelectedOption(index)}
                                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${selectedOption === index
                                        ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400 text-white shadow-lg"
                                        : "bg-white/5 border-white/20 text-purple-200 hover:bg-white/10 hover:border-white/30"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg">{option}</span>
                                        {selectedOption === index && <CheckCircle className="w-5 h-5 text-purple-300" />}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <motion.button
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${currentIndex === 0 ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-white/10 text-white hover:bg-white/20"
                                    }`}
                                whileHover={currentIndex > 0 ? { scale: 1.05 } : {}}
                                whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
                            >
                                Previous
                            </motion.button>
                            <motion.button
                                onClick={handleNext}
                                disabled={selectedOption === null}
                                className={`btn-primary ${selectedOption === null ? "bg-gray-600 text-gray-400 cursor-not-allowed" : ""}`}
                                whileHover={selectedOption !== null ? { scale: 1.05 } : {}}
                                whileTap={selectedOption !== null ? { scale: 0.95 } : {}}
                            >
                                {currentIndex === questions.length - 1 ? "Complete Assessment" : "Next Question"}
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}