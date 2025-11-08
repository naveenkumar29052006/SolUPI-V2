'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/forms/button'
import { ArrowRight, Eye, EyeOff, Check } from 'lucide-react'
import { CometCard } from '@/components/ui/cards/comet-card'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedCheckbox } from '@/components/ui/animations/animated-checkbox'

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    
    // Check if all form fields are filled (excluding terms checkbox)
    const areAllFieldsFilled = formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword
    
    // Check if form is complete (all fields + terms agreement for button activation)
    const isFormComplete = areAllFieldsFilled && agreedToTerms

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        
        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!')
            setIsLoading(false)
            return
        }
        
        if (!agreedToTerms) {
            alert('Please agree to the Terms of Service!')
            setIsLoading(false)
            return
        }

        // Simulate API call
        setTimeout(() => {
            console.log('Signup attempt:', formData)
            alert('Signup functionality will be implemented with backend!')
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 pt-20 relative pointer-events-auto">
            <div className="w-full max-w-sm space-y-6 relative z-10">
                {/* Signup Form */}
                <CometCard rotateDepth={12} translateDepth={15}>
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Create your account</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="firstName" className="block text-xs font-medium text-gray-200 mb-1">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-xs font-medium text-gray-200 mb-1">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-medium text-gray-200 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="john@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-medium text-gray-200 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 pr-10 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-200 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 pr-10 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Password Requirements */}
                        <div className="text-xs text-gray-400">
                            <p className="mb-1">Password must contain:</p>
                            <ul className="space-y-0.5">
                                <li className="flex items-center">
                                    <Check className={`h-3 w-3 mr-1.5 ${formData.password.length >= 8 ? 'text-green-400' : 'text-gray-500'}`} />
                                    At least 8 characters
                                </li>
                                <li className="flex items-center">
                                    <Check className={`h-3 w-3 mr-1.5 ${/[A-Z]/.test(formData.password) ? 'text-green-400' : 'text-gray-500'}`} />
                                    One uppercase letter
                                </li>
                                <li className="flex items-center">
                                    <Check className={`h-3 w-3 mr-1.5 ${/[0-9]/.test(formData.password) ? 'text-green-400' : 'text-gray-500'}`} />
                                    One number
                                </li>
                            </ul>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <AnimatedCheckbox
                                id="terms"
                                name="terms"
                                checked={agreedToTerms}
                                onChange={setAgreedToTerms}
                                label={
                                    <span className="text-xs">
                                        I agree to the{' '}
                                        <Link href="/terms" className="transition-colors" style={{color: '#03E1FF'}}>
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link href="/privacy" className="transition-colors" style={{color: '#03E1FF'}}>
                                            Privacy Policy
                                        </Link>
                                    </span>
                                }
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
                            className={`relative w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden ${!areAllFieldsFilled ? 'auth-button-text transparent' : ''}`}
                            style={{
                                border: !areAllFieldsFilled ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                                background: !areAllFieldsFilled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                color: areAllFieldsFilled ? '#000000' : '#FFFFFF'
                            }}
                            whileHover={{ scale: !isLoading && agreedToTerms ? 1.02 : 1 }}
                            whileTap={{ scale: !isLoading && agreedToTerms ? 0.98 : 1 }}
                        >
                            {/* Animated gradient background */}
                            <AnimatePresence>
                                {areAllFieldsFilled && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#00FFA3] to-[#03E1FF] rounded-xl"
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
                                    color: areAllFieldsFilled ? '#000000' : '#FFFFFF',
                                    textShadow: areAllFieldsFilled ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <div 
                                            className="w-5 h-5 rounded-full animate-spin mr-2"
                                            style={{
                                                border: '2px solid',
                                                borderColor: areAllFieldsFilled 
                                                    ? 'rgba(0,0,0,0.2)'
                                                    : 'rgba(255,255,255,0.2)',
                                                borderTopColor: areAllFieldsFilled ? '#000000' : '#FFFFFF'
                                            }}
                                        />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create account
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </div>
                        </motion.button>
                    </form>
                    </div>
                </CometCard>

                {/* Login link */}
                <div className="text-center">
                    <p className="text-gray-300">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-medium transition-colors"
                            style={{color: '#00FFA3'}}
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}