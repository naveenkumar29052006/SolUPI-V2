"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    // Progress simulation
    useEffect(() => {
        // Wake up the backend on load
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://solupi-backend.onrender.com';
        fetch(backendUrl, { mode: 'no-cors' }).catch(() => {
            // Ignore errors, just want to trigger wake-up
        });

        let currentProgress = 0;

        // Fast start
        const interval = setInterval(() => {
            currentProgress += Math.random() * 3.5;
            if (currentProgress >= 90) {
                currentProgress = 90;
                clearInterval(interval);
            }
            setProgress(Math.floor(currentProgress));
        }, 60);

        const handleLoad = () => {
            // Finish sequence
            const finish = setInterval(() => {
                currentProgress += 5;
                if (currentProgress >= 100) {
                    setProgress(100);
                    clearInterval(finish);
                    setTimeout(() => setLoading(false), 800);
                } else {
                    setProgress(Math.floor(currentProgress));
                }
            }, 30);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-[#0F0F0F] flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Top Marquee */}
                    <div className="absolute top-8 left-0 w-full overflow-hidden text-white font-monument text-xs tracking-[0.3em] font-bold z-20 opacity-40 mix-blend-difference">
                        <motion.div
                            className="whitespace-nowrap"
                            animate={{ x: [0, -1000] }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        >
                            LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING //
                        </motion.div>
                    </div>

                    {/* Center Liquid Counter */}
                    <div
                        className="relative z-30 font-monument font-extrabold flex items-end text-liquid-fill leading-none tracking-tighter"
                        style={{
                            backgroundPosition: `0% ${progress}%`
                        }}
                    >
                        <span className="text-[12rem] md:text-[22rem]">
                            {progress}
                        </span>
                        <span className="text-4xl md:text-6xl mb-8 md:mb-16 ml-4">
                            %
                        </span>
                    </div>

                    {/* Bottom Marquee (Reverse) */}
                    <div className="absolute bottom-8 left-0 w-full overflow-hidden text-white font-monument text-xs tracking-[0.3em] font-bold z-20 opacity-40 mix-blend-difference">
                        <motion.div
                            className="whitespace-nowrap"
                            animate={{ x: [-1000, 0] }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        >
                            LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING // LOADING //
                        </motion.div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
