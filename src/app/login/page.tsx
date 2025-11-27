'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/forms/button'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedCheckbox } from '@/components/ui/animations/animated-checkbox'
import { GlowingEffect } from '@/components/ui/effects/glowing-effect'
import { useToast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    // Check if form is complete
    const isFormComplete = email && password

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api/auth/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            if (data.success) {
                if (data.token) {
                    localStorage.setItem("auth-token", data.token)
                    // Dispatch event to update Navbar immediately
                    window.dispatchEvent(new Event('auth-change'))
                }
                toast({
                    type: 'success',
                    title: 'Login Successful',
                    message: 'Welcome back! Redirecting you to the dashboard...'
                })
                setTimeout(() => router.push('/swap'), 1500)
            } else {
                toast({
                    type: 'error',
                    title: 'Login Failed',
                    message: data.error || "Please check your credentials and try again."
                })
            }
        } catch (err) {
            console.error("Login error:", err)
            toast({
                type: 'error',
                title: 'Error',
                message: "Something went wrong. Please try again later."
            })
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative pointer-events-auto overflow-hidden bg-[#0a0a0a]">
            <div className="w-full max-w-sm space-y-6 relative z-10">
                {/* Cyberpunk Login Form */}
                <div className="relative group filter drop-shadow-[0_0_10px_rgba(204,255,0,0.1)]">

                    {/* Border/Background Layer */}
                    <div
                        className="absolute inset-0 bg-[#CCFF00]/30"
                        style={{
                            clipPath: "polygon(0 0, 180px 0, 210px 40px, 100% 40px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)"
                        }}
                    />

                    {/* Inner Content Layer */}
                    <div
                        className="relative bg-[#0F0F0F]"
                        style={{
                            clipPath: "polygon(1px 1px, 179px 1px, 209px 41px, calc(100% - 1px) 41px, calc(100% - 1px) calc(100% - 31px), calc(100% - 31px) calc(100% - 1px), 1px calc(100% - 1px))",
                            marginTop: "1px",
                            marginLeft: "1px",
                            marginRight: "1px",
                            marginBottom: "1px",
                            padding: "2rem",
                            paddingTop: "4rem" // Extra padding for the tab
                        }}
                    >


                        <GlowingEffect
                            proximity={100}
                            spread={30}
                            blur={2}
                            borderWidth={2}
                            movementDuration={1.5}
                        />
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                            <p className="mt-2 text-sm text-gray-300">Sign in to your account to continue</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me and Forgot password */}
                            <div className="flex items-center justify-between">
                                <AnimatedCheckbox
                                    id="remember-me"
                                    name="remember-me"
                                    checked={rememberMe}
                                    onChange={setRememberMe}
                                    label="Remember me"
                                />

                                <Link
                                    href="/forgot-password"
                                    className="text-sm transition-colors"
                                    style={{ color: '#CCFF00' }}
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                className={`relative w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden ${!isFormComplete ? 'auth-button-text transparent' : ''}`}
                                style={{
                                    border: !isFormComplete ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                                    background: !isFormComplete ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                    color: isFormComplete ? '#000000' : '#FFFFFF'
                                }}
                                whileHover={{ scale: !isLoading ? 1.02 : 1 }}
                                whileTap={{ scale: !isLoading ? 0.98 : 1 }}
                            >
                                {/* Animated gradient background */}
                                <AnimatePresence>
                                    {isFormComplete && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-[#CCFF00] to-[#D4FF00] rounded-xl"
                                            initial={{
                                                x: "-100%",
                                                opacity: 0
                                            }}
                                            animate={{
                                                x: "0%",
                                                opacity: 1
                                            }}
                                            exit={{
                                                x: "100%",
                                                opacity: 0
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                ease: [0.4, 0.0, 0.2, 1]
                                            }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Button content */}
                                <div
                                    className="relative z-10 flex items-center justify-center"
                                    style={{
                                        color: isFormComplete ? '#000000' : '#FFFFFF',
                                        textShadow: isFormComplete ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                                    }}
                                >
                                    {isLoading ? (
                                        <>
                                            <div
                                                className="w-5 h-5 rounded-full animate-spin mr-2"
                                                style={{
                                                    border: '2px solid',
                                                    borderColor: isFormComplete
                                                        ? 'rgba(0,0,0,0.2)'
                                                        : 'rgba(255,255,255,0.2)',
                                                    borderTopColor: isFormComplete ? '#000000' : '#FFFFFF'
                                                }}
                                            />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign in
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </div>
                            </motion.button>
                        </form>
                    </div>
                </div>

                {/* Sign up link */}
                <div className="text-center">
                    <p className="text-gray-300">
                        Don't have an account?{' '}
                        <Link
                            href="/signup"
                            className="font-medium transition-colors"
                            style={{ color: '#CCFF00' }}
                        >
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}