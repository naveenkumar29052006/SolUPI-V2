import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, X } from 'lucide-react'

interface StatusModalProps {
    isOpen: boolean
    onClose: () => void
    type: 'success' | 'error'
    title: string
    message: string
}

export function StatusModal({ isOpen, onClose, type, title, message }: StatusModalProps) {
    const isSuccess = type === 'success'
    const accentColor = isSuccess ? '#CCFF00' : '#FF3333'

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md"
                    >
                        {/* Cyberpunk Border Effect */}
                        <div className="relative group filter drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            {/* Border Layer */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundColor: `${accentColor}40`, // 25% opacity
                                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)"
                                }}
                            />

                            {/* Content Layer */}
                            <div
                                className="relative bg-[#0F0F0F]"
                                style={{
                                    clipPath: "polygon(1px 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - 21px), calc(100% - 21px) calc(100% - 1px), 1px calc(100% - 1px))",
                                    marginTop: "1px",
                                    marginLeft: "1px",
                                    marginRight: "1px",
                                    marginBottom: "1px",
                                    padding: "2rem"
                                }}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex flex-col items-center text-center space-y-4">
                                    {/* Icon */}
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                                        style={{
                                            backgroundColor: `${accentColor}15`,
                                            border: `1px solid ${accentColor}`
                                        }}
                                    >
                                        {isSuccess ? (
                                            <CheckCircle className="w-8 h-8" style={{ color: accentColor }} />
                                        ) : (
                                            <XCircle className="w-8 h-8" style={{ color: accentColor }} />
                                        )}
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                                        <p className="text-gray-400 text-sm">{message}</p>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={onClose}
                                        className="w-full py-3 px-4 rounded-lg font-bold text-black mt-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        {isSuccess ? 'CONTINUE' : 'TRY AGAIN'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
