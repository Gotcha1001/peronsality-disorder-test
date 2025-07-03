// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import NavBar from "../components/Navbar";

// export default function ResourcesPage() {
//     const resources = [
//         {
//             title: "Find a Therapist",
//             description: "Locate licensed mental health professionals specializing in personality disorders.",
//             link: "https://www.psychologytoday.com/us/therapists",
//         },
//         {
//             title: "National Alliance on Mental Illness (NAMI)",
//             description: "Access support groups and educational resources for mental health.",
//             link: "https://www.nami.org",
//         },
//         {
//             title: "Crisis Text Line",
//             description: "Text HOME to 741741 for free, 24/7 crisis support.",
//             link: "https://www.crisistextline.org",
//         },
//     ];

//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 p-4"
//         >
//             <NavBar />
//             <div className="max-w-4xl mx-auto text-white">
//                 <h1 className="text-3xl font-bold text-center mb-6">Resources for Support</h1>
//                 <p className="text-purple-200 mb-8 text-center">
//                     Explore these trusted resources to learn more about personality disorders and connect with professional support.
//                 </p>
//                 <div className="grid gap-6">
//                     {resources.map((resource, index) => (
//                         <motion.div
//                             key={index}
//                             className="bg-white/10 rounded-2xl p-6"
//                             whileHover={{ scale: 1.02 }}
//                         >
//                             <h2 className="text-xl font-semibold text-purple-400">{resource.title}</h2>
//                             <p className="text-purple-200 mb-4">{resource.description}</p>
//                             <Link href={resource.link} className="text-indigo-400 hover:underline">
//                                 Visit Resource
//                             </Link>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </motion.div>
//     );
// }



"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "../../app/components/Navbar";

export default function ResourcesPage() {
    const resources = [
        {
            title: "Find a Therapist",
            description: "Locate licensed mental health professionals specializing in personality disorders.",
            link: "https://www.psychologytoday.com/us/therapists",
        },
        {
            title: "National Alliance on Mental Illness (NAMI)",
            description: "Access support groups and educational resources for mental health.",
            link: "https://www.nami.org",
        },
        {
            title: "Crisis Text Line",
            description: "Text HOME to 741741 for free, 24/7 crisis support in the US.",
            link: "https://www.crisistextline.org",
        },
        {
            title: "Mental Health America",
            description: "Find tools, screenings, and support for mental health conditions.",
            link: "https://www.mhanational.org",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 relative overflow-hidden">
            <NavBar />
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        Resources for Support
                    </h1>
                    <p className="text-purple-200 mb-8 text-center max-w-2xl mx-auto">
                        Connect with trusted organizations and professionals to learn more about personality disorders and find support.
                    </p>
                    <div className="grid gap-6">
                        {resources.map((resource, index) => (
                            <motion.div key={index} className="card" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                <h2 className="text-xl font-semibold text-purple-400">{resource.title}</h2>
                                <p className="text-purple-200 mb-4">{resource.description}</p>
                                <Link href={resource.link} className="text-indigo-400 hover:underline">
                                    Visit Resource
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}