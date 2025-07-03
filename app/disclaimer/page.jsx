// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import NavBar from "../components/Navbar";

// export default function DisclaimerPage() {
//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 p-4"
//         >
//             <NavBar />
//             <div className="max-w-4xl mx-auto text-white">
//                 <h1 className="text-3xl font-bold text-center mb-6">Disclaimer</h1>
//                 <p className="text-purple-200 mb-8 leading-relaxed">
//                     This Personality Disorder Screening Tool is designed for informational purposes only and is not a substitute for a professional diagnosis. The results provided are based on validated screening questions but do not constitute a clinical evaluation. For an accurate diagnosis and treatment plan, please consult a licensed mental health professional, such as a psychologist or psychiatrist. If you are in crisis, contact a local crisis hotline or emergency services immediately.
//                 </p>
//                 <div className="text-center">
//                     <Link href="/resources">
//                         <motion.button
//                             className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Find Resources
//                         </motion.button>
//                     </Link>
//                 </div>
//             </div>
//         </motion.div>
//     );
// }



"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "../components/Navbar";
import { Info } from "lucide-react";

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden">
            <NavBar />
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Disclaimer
                    </h1>
                    <div className="card">
                        <div className="flex items-center space-x-2 mb-4">
                            <Info className="w-5 h-5 text-purple-400" />
                            <h2 className="text-xl font-semibold text-purple-400">Important Information</h2>
                        </div>
                        <p className="text-purple-200 leading-relaxed mb-6">
                            MindScreen Pro is an informational tool designed to provide insights into personality patterns based on DSM-5 criteria. It is not a diagnostic tool and does not replace professional evaluation. Results are for educational purposes only. For an accurate diagnosis and personalized treatment plan, consult a licensed mental health professional, such as a psychologist or psychiatrist. If you are in crisis, contact a local crisis hotline or emergency services immediately (e.g., 988 in the US).
                        </p>
                        <div className="text-center">
                            <Link href="/resources">
                                <motion.button
                                    className="btn-primary"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Find Professional Resources
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}