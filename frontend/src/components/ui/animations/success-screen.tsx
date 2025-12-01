'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

interface SuccessScreenProps {
    isVisible: boolean
    onComplete?: () => void
    initialTimeInSeconds?: number
}

export function SuccessScreen({
    isVisible,
    onComplete,
    initialTimeInSeconds = 300 // 5 minutes default
}: SuccessScreenProps) {
    const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds)

    useEffect(() => {
        if (!isVisible) {
            setTimeLeft(initialTimeInSeconds)
            return
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    if (onComplete) {
                        onComplete()
                    }
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [isVisible, initialTimeInSeconds, onComplete])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            duration: 0.5
                        }}
                        className="relative bg-[#121212] rounded-2xl p-8 md:p-12 max-w-md w-full mx-4 border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            {/* Animated Checkmark */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.2
                                }}
                                className="relative"
                            >
                                {/* Outer ring with pulse animation */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#CCFF00] to-[#D4FF00] opacity-20"
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        filter: 'blur(10px)'
                                    }}
                                />

                                {/* Main checkmark circle */}
                                <motion.div
                                    className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#CCFF00] to-[#D4FF00] flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.5)]"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -90 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                            delay: 0.4
                                        }}
                                    >
                                        <Check className="w-12 h-12 text-black stroke-[3]" />
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Thank you message */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="space-y-2"
                            >
                                <h2 className="text-3xl font-bold text-white">
                                    Thank You!
                                </h2>
                                <p className="text-lg text-white/80">
                                    Payment Submitted Successfully
                                </p>
                            </motion.div>

                            {/* Processing message */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="space-y-3 w-full"
                            >
                                <p className="text-white/90 font-medium">
                                    Please await, we are preparing your request
                                </p>

                                {/* Timer */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="bg-white/5 border border-white/10 rounded-xl p-4"
                                >
                                    <p className="text-white/60 text-sm mb-2">Estimated processing time</p>
                                    <motion.div
                                        className="text-4xl font-mono font-bold bg-gradient-to-r from-[#CCFF00] to-[#D4FF00] bg-clip-text text-transparent"
                                        animate={{
                                            scale: timeLeft % 2 === 0 ? 1 : 1.05
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {formatTime(timeLeft)}
                                    </motion.div>
                                    <p className="text-white/40 text-xs mt-2">
                                        Your USDC will be transferred shortly
                                    </p>
                                </motion.div>
                            </motion.div>

                            {/* Progress indicator */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.5 }}
                                className="w-full space-y-2"
                            >
                                <div className="flex justify-between text-xs text-white/60">
                                    <span>Processing...</span>
                                    <span>{Math.round((1 - timeLeft / initialTimeInSeconds) * 100)}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#CCFF00] to-[#D4FF00]"
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${(1 - timeLeft / initialTimeInSeconds) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </motion.div>

                            {/* Back Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4, duration: 0.5 }}
                                onClick={onComplete}
                                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/80 hover:text-white transition-all duration-200 text-sm font-medium mt-4"
                            >
                                Back to Home
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
