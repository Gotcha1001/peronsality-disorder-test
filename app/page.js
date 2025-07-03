// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import {
//   ChevronRight,
//   Heart,
//   Users,
//   Brain,
//   FileText,
//   Download,
//   CheckCircle,
// } from "lucide-react";
// import NavBar from "./components/Navbar";

// const PersonalityDisorderLanding = () => {
//   const conditions = [
//     {
//       name: "Borderline Personality Disorder",
//       icon: Heart,
//       description: "May experience intense emotions and unstable relationships",
//       color: "from-blue-400 to-cyan-500",
//     },
//     {
//       name: "Narcissistic Personality Disorder",
//       icon: Users,
//       description: "May show patterns of grandiosity and need for admiration",
//       color: "from-purple-400 to-violet-500",
//     },
//     {
//       name: "Antisocial Personality Disorder",
//       icon: Brain,
//       description: "May exhibit disregard for others' rights or social norms",
//       color: "from-pink-400 to-rose-500",
//     },
//     {
//       name: "Avoidant Personality Disorder",
//       icon: FileText,
//       description: "May feel socially inhibited or fear rejection",
//       color: "from-green-400 to-emerald-500",
//     },
//   ];

//   const features = [
//     {
//       icon: FileText,
//       title: "Validated Screening Questions",
//       description:
//         "Questions based on clinical tools like the McLean Screening Instrument for BPD",
//     },
//     {
//       icon: CheckCircle,
//       title: "Quick & Insightful",
//       description: "20 targeted questions taking 5-7 minutes to complete",
//     },
//     {
//       icon: Heart,
//       title: "Empathetic Insights",
//       description:
//         "Receive personalized insights into potential personality patterns",
//     },
//     {
//       icon: Download,
//       title: "Detailed Report",
//       description:
//         "Download a comprehensive PDF with results and professional resources",
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 relative overflow-hidden">
//       <NavBar />
//       <div className="absolute inset-0">
//         <motion.div
//           className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
//           animate={{
//             x: [0, 100, 0],
//             y: [0, -50, 0],
//             scale: [1, 1.2, 1],
//           }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
//           animate={{
//             x: [0, -120, 0],
//             y: [0, 80, 0],
//             scale: [1, 0.8, 1],
//           }}
//           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//         />
//         <motion.div
//           className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl"
//           animate={{
//             rotate: [0, 360],
//             scale: [1, 1.3, 1],
//           }}
//           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//         />
//       </div>

//       {[...Array(8)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-2 h-2 bg-white/20 rounded-full"
//           style={{
//             left: `${10 + i * 12}%`,
//             top: `${20 + i * 8}%`,
//           }}
//           animate={{
//             y: [-20, 20, -20],
//             opacity: [0.3, 1, 0.3],
//           }}
//           transition={{
//             duration: 3 + i * 0.5,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       ))}

//       <div className="relative z-10 px-4 py-12">
//         <div className="max-w-6xl mx-auto text-center mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="mb-8"
//           >
//             <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent leading-tight">
//               Explore Your
//               <br />
//               <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
//                 Personality Profile
//               </span>
//             </h1>
//           </motion.div>

//           <motion.p
//             className="text-xl md:text-2xl text-purple-100/90 mb-8 max-w-4xl mx-auto leading-relaxed"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             Gain insights into your personality with our research-based
//             screening tool. Learn about potential patterns like BPD, NPD, ASPD,
//             or AvPD in a supportive way. This is not a diagnosis—seek
//             professional evaluation.
//           </motion.p>

//           <motion.div
//             className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <div className="flex items-center text-purple-200">
//               <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
//               <span>Free & Confidential</span>
//             </div>
//             <div className="flex items-center text-purple-200">
//               <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
//               <span>5-7 Minutes</span>
//             </div>
//             <div className="flex items-center text-purple-200">
//               <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
//               <span>Instant Results</span>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//           >
//             <Link href="/quiz">
//               <motion.button
//                 className="group relative px-12 py-6 text-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 rounded-full border border-white/20 shadow-2xl overflow-hidden"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <span className="relative z-10 flex items-center">
//                   Start Your Screening
//                   <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </motion.button>
//             </Link>
//           </motion.div>
//         </div>

//         <motion.div
//           className="max-w-6xl mx-auto mb-20"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h2
//             className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
//             variants={itemVariants}
//           >
//             Why Take Our Screening?
//           </motion.h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="group relative"
//               >
//                 <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 group-hover:bg-white/10 group-hover:border-purple-400/30 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
//                   <div className="bg-gradient-to-r from-purple-400 to-indigo-400 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                     <feature.icon className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-4">
//                     {feature.title}
//                   </h3>
//                   <p className="text-purple-200 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           className="max-w-6xl mx-auto mb-20"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h2
//             className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
//             variants={itemVariants}
//           >
//             Understand Your Personality
//           </motion.h2>

//           <motion.p
//             className="text-xl text-purple-200 text-center mb-16 max-w-3xl mx-auto"
//             variants={itemVariants}
//           >
//             Our screening evaluates common personality disorder patterns to
//             provide insights and suggest next steps. It’s not a diagnosis but a
//             starting point for understanding yourself.
//           </motion.p>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {conditions.map((condition, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="group relative"
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-2xl">
//                   <div
//                     className={`bg-gradient-to-r ${condition.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
//                   >
//                     <condition.icon className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-4">
//                     {condition.name}
//                   </h3>
//                   <p className="text-purple-200 leading-relaxed">
//                     {condition.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           className="max-w-4xl mx-auto mb-20"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h2
//             className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
//             variants={itemVariants}
//           >
//             How It Works
//           </motion.h2>

//           <div className="space-y-8">
//             {[
//               {
//                 step: "01",
//                 title: "Answer 20 Questions",
//                 description:
//                   "Complete our research-based questionnaire about your behaviors and feelings.",
//               },
//               {
//                 step: "02",
//                 title: "Get Your Results",
//                 description:
//                   "Receive a profile showing likelihoods for BPD, NPD, ASPD, and AvPD.",
//               },
//               {
//                 step: "03",
//                 title: "Explore Insights",
//                 description:
//                   "Learn about your top condition with personalized, supportive explanations.",
//               },
//               {
//                 step: "04",
//                 title: "Download Your Report",
//                 description:
//                   "Get a detailed PDF report with your results and professional resources.",
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="flex items-start space-x-6 group"
//               >
//                 <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-xl w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
//                   {item.step}
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-2xl font-bold text-white mb-3">
//                     {item.title}
//                   </h3>
//                   <p className="text-purple-200 text-lg leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           className="max-w-4xl mx-auto text-center"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 1 }}
//         >
//           <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
//               Ready to Understand Yourself?
//             </h2>
//             <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
//               Take the first step toward understanding your personality
//               patterns. Our screening provides insights and resources to support
//               your journey.
//             </p>
//             <Link href="/quiz">
//               <motion.button
//                 className="group relative px-12 py-6 text-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 rounded-full border border-white/20 shadow-2xl overflow-hidden"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <span className="relative z-10 flex items-center">
//                   Take the Screening
//                   <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </motion.button>
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default PersonalityDisorderLanding;

"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, BarChart3, Shield, Info, ChevronRight } from "lucide-react";
import NavBar from "./components/Navbar.jsx";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * 100 + "%"],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <NavBar />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 bg-clip-text text-transparent"
          >
            MindScreen Pro
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            A comprehensive screening tool to explore personality patterns
            across six disorders, based on DSM-5 criteria. Understand yourself
            better and take the first step toward professional support.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
          >
            <div className="card">
              <Brain className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Six Disorder Categories
              </h3>
              <p className="text-purple-200">
                Screen for Cluster A, B, and C personality disorders with
                validated questions.
              </p>
            </div>
            <div className="card">
              <BarChart3 className="w-12 h-12 text-pink-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Evidence-Based
              </h3>
              <p className="text-purple-200">
                Questions aligned with DSM-5 and clinical screening tools.
              </p>
            </div>
            <div className="card">
              <Shield className="w-12 h-12 text-indigo-400 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Confidential & Secure
              </h3>
              <p className="text-purple-200">
                Responses are processed locally and not stored.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/quiz">
              <motion.button
                className="btn-primary flex items-center space-x-3 mx-auto"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Begin Assessment</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mt-8 text-sm text-purple-300 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Info className="w-4 h-4" />
              <span>Important Disclaimer</span>
            </div>
            <p>
              This tool is for informational purposes only and is not a
              substitute for professional diagnosis. Consult a qualified mental
              health professional for accurate evaluation and care.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
