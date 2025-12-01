'use client'

import React from 'react'
import { motion } from 'framer-motion'

const transactions = [
    { user: "Alex_99", action: "bought", amount: "500 USDC" },
    { user: "CryptoKing", action: "sold", amount: "1,200 USDC" },
    { user: "Sarah.sol", action: "bought", amount: "50 USDC" },
    { user: "Whale_007", action: "bought", amount: "5,000 USDC" },
    { user: "TraderJoe", action: "sold", amount: "300 USDC" },
    { user: "MoonBoi", action: "bought", amount: "1,000 USDC" },
    { user: "SolanaFan", action: "sold", amount: "150 USDC" },
    { user: "Degenerate", action: "bought", amount: "420 USDC" },
    { user: "Nakamoto", action: "bought", amount: "2,500 USDC" },
    { user: "PepeLover", action: "sold", amount: "800 USDC" },
]

export function TransactionTicker() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-[#CCFF00]/20 py-2 overflow-hidden z-40 pointer-events-none select-none">
            <div className="flex whitespace-nowrap mask-linear-fade">
                <motion.div
                    className="flex gap-16 px-8"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                >
                    {/* Duplicate list 4 times to ensure smooth infinite scroll on large screens */}
                    {[...transactions, ...transactions, ...transactions, ...transactions].map((tx, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-rajdhani font-medium tracking-wide">
                            <span className="text-gray-500">@{tx.user}</span>
                            <span className={tx.action === 'bought' ? 'text-[#CCFF00]' : 'text-red-500'}>
                                {tx.action.toUpperCase()}
                            </span>
                            <span className="text-white font-bold">{tx.amount}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
