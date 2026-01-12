'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [

    {
        question: "How fast are the transactions?",
        answer: "Transactions on SolUpi are near-instant. Once your UPI payment is verified, the USDC is sent to your Solana wallet within seconds, thanks to the high speed of the Solana blockchain."
    },
    {
        question: "Is KYC required?",
        answer: "Currently, we offer a streamlined process for small transactions. However, for larger volumes and to comply with regulations, a simple KYC verification process will be introduced soon."
    },
    {
        question: "What are the fees?",
        answer: "We pride ourselves on having some of the lowest fees in the industry. You only pay a small processing fee for the UPI transaction and the standard (negligible) Solana network gas fee."
    },
    {
        question: "Is it secure?",
        answer: "Yes, security is our top priority. We use smart contracts to ensure safe escrow of funds and advanced encryption to protect your data. We do not store your private keys."
    }
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="faq" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold uppercase mb-4 font-monument">
                        FREQUENTLY ASKED <span className="text-[#CCFF00]">QUESTIONS</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Everything you need to know about SolUpi and how it works.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Border Gradient */}
                            <div className={cn(
                                "absolute -inset-0.5 bg-gradient-to-r from-[#CCFF00]/20 to-[#CCFF00]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm",
                                openIndex === index && "opacity-100 from-[#CCFF00]/40"
                            )} />

                            <div className="relative bg-[#141414] border border-[#333] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#CCFF00]/50">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className={cn(
                                        "text-lg font-bold transition-colors duration-300",
                                        openIndex === index ? "text-[#CCFF00]" : "text-white group-hover:text-[#CCFF00]"
                                    )}>
                                        {faq.question}
                                    </span>
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300",
                                        openIndex === index
                                            ? "bg-[#CCFF00] border-[#CCFF00] text-black rotate-180"
                                            : "border-[#333] text-gray-400 group-hover:border-[#CCFF00] group-hover:text-[#CCFF00]"
                                    )}>
                                        {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-[#333]/50 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
