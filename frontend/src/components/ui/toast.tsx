'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
    id: string
    type: ToastType
    title: string
    message: string
}

interface ToastContextType {
    toast: (props: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const toast = useCallback(({ type, title, message }: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts((prev) => [...prev, { id, type, title, message }])

        // Auto dismiss after 5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 5000)
    }, [])

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map((t) => (
                        <ToastItem key={t.id} toast={t} onRemove={removeToast} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
    const isSuccess = toast.type === 'success'
    const isError = toast.type === 'error'
    const accentColor = isSuccess ? '#CCFF00' : isError ? '#FF3333' : '#3399FF'

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="pointer-events-auto w-80 relative group"
        >
            {/* Cyberpunk Border Effect */}
            <div className="relative filter drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                {/* Border Layer */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: `${accentColor}40`,
                        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)"
                    }}
                />

                {/* Content Layer */}
                <div
                    className="relative bg-[#0F0F0F] p-4 pr-10"
                    style={{
                        clipPath: "polygon(1px 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - 16px), calc(100% - 16px) calc(100% - 1px), 1px calc(100% - 1px))",
                        marginTop: "1px",
                        marginLeft: "1px",
                        marginRight: "1px",
                        marginBottom: "1px",
                    }}
                >
                    <button
                        onClick={() => onRemove(toast.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-start gap-3">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                            style={{
                                backgroundColor: `${accentColor}15`,
                                border: `1px solid ${accentColor}`
                            }}
                        >
                            {isSuccess ? (
                                <CheckCircle className="w-4 h-4" style={{ color: accentColor }} />
                            ) : isError ? (
                                <XCircle className="w-4 h-4" style={{ color: accentColor }} />
                            ) : (
                                <Info className="w-4 h-4" style={{ color: accentColor }} />
                            )}
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white leading-none mb-1">{toast.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{toast.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
