"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Heart, BarChart3, Users, Shield } from "lucide-react";

export default function NavBar() {
    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border-b border-white/10 p-4 sticky top-0 z-50"
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                        MindScreen Pro
                    </span>
                </Link>
                <div className="flex gap-6">
                    <Link href="/" className="text-purple-200 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>Home</span>
                    </Link>
                    <Link href="/quiz" className="text-purple-200 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4" />
                        <span>Assessment</span>
                    </Link>
                    <Link href="/resources" className="text-purple-200 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Resources</span>
                    </Link>
                    <Link href="/disclaimer" className="text-purple-200 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Disclaimer</span>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}