'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlowingEffect } from '@/components/ui/effects/glowing-effect'
import { User, Camera, ShieldCheck, Smartphone, Mail, LogOut, ChevronLeft, Search, Filter, Calendar, ArrowUpDown, ChevronDown, X, Check } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: 'naveen_k',
        firstName: 'Naveen',
        lastName: 'Kumar',
        email: 'nn03092005@gmail.com',
        mobile: '+91 98765 43210'
    })
    const [isEditing, setIsEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        // Dispatch event to update Navbar immediately
        window.dispatchEvent(new Event('auth-change'))
        router.push('/login')
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [transactions, setTransactions] = useState<any[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    // Filter & Sort State
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('ALL')
    const [dateFilter, setDateFilter] = useState('ALL')
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('desc')
    const [showFilters, setShowFilters] = useState(false)

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1)
            fetchTransactions(1)
        }, 500)
        return () => clearTimeout(timer)
    }, [searchQuery])

    // Fetch on filter change
    useEffect(() => {
        setCurrentPage(1)
        fetchTransactions(1)
    }, [statusFilter, dateFilter, sortBy, sortOrder, itemsPerPage])

    // Fetch on page change
    useEffect(() => {
        fetchTransactions(currentPage)
    }, [currentPage])

    const fetchTransactions = async (page: number) => {
        const userId = localStorage.getItem('user-id')
        if (!userId) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        try {
            // Calculate date range based on filter
            let startDate = ''
            let endDate = ''
            const now = new Date()

            if (dateFilter === 'TODAY') {
                startDate = new Date(now.setHours(0, 0, 0, 0)).toISOString()
                endDate = new Date(now.setHours(23, 59, 59, 999)).toISOString()
            } else if (dateFilter === 'WEEK') {
                const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                startDate = lastWeek.toISOString()
            } else if (dateFilter === 'MONTH') {
                const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                startDate = lastMonth.toISOString()
            }

            const queryParams = new URLSearchParams({
                userId,
                page: page.toString(),
                limit: itemsPerPage.toString(),
                status: statusFilter,
                sortBy,
                sortOrder,
                ...(searchQuery && { search: searchQuery }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate })
            })

            const response = await fetch(`/api/orders?${queryParams}`)
            const data = await response.json()
            if (data.success) {
                setTransactions(data.data.orders)
                setTotalPages(data.data.pagination.totalPages)
                setTotalItems(data.data.pagination.total)
            }
        } catch (error) {
            console.error("Failed to fetch transactions:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchUser = async () => {
        const userId = localStorage.getItem('user-id')
        if (!userId) return

        try {
            const response = await fetch(`/api/users/${userId}`)
            const data = await response.json()
            if (data.success) {
                const user = data.data
                setFormData({
                    username: user.username || '',
                    firstName: user.firstName || user.name?.split(' ')[0] || '',
                    lastName: user.lastName || user.name?.split(' ')[1] || '',
                    email: user.email || '',
                    mobile: user.mobile || ''
                })
            }
        } catch (error) {
            console.error("Failed to fetch user:", error)
        }
    }

    const handleSave = async () => {
        const userId = localStorage.getItem('user-id')
        if (!userId) return

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    mobile: formData.mobile,
                    name: `${formData.firstName} ${formData.lastName}`.trim()
                })
            })
            const data = await response.json()
            if (data.success) {
                alert("Profile updated successfully")
                setIsEditing(false)
                // Refresh data
                fetchUser()
            } else {
                alert("Failed to update profile: " + data.message)
            }
        } catch (error) {
            console.error("Update error:", error)
            alert("Error updating profile")
        }
    }

    useEffect(() => {
        fetchUser()
        // Initial fetch handled by other effects
    }, [])

    const handleDelete = async (orderId: string) => {
        if (!confirm("Are you sure you want to delete this order?")) return;

        const userId = localStorage.getItem('user-id');
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            const data = await response.json();
            if (data.success) {
                // Refresh list
                fetchTransactions(currentPage);
            } else {
                alert("Failed to delete: " + data.message);
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting order");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-4 py-20 pt-28 relative pointer-events-auto overflow-x-hidden bg-[#0a0a0a] gap-12">

            {/* PROFILE CARD */}
            <div className="w-full max-w-4xl relative z-10">
                <div className="relative group filter drop-shadow-[0_0_10px_rgba(204,255,0,0.1)]">

                    {/* Back Button */}
                    <button
                        onClick={() => router.push('/')}
                        className="absolute -top-12 left-0 text-gray-400 hover:text-[#CCFF00] flex items-center gap-2 transition-colors z-20"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                    </button>

                    {/* Border/Background Layer */}
                    <div
                        className="absolute inset-0 bg-[#CCFF00]/30"
                        style={{
                            clipPath: "polygon(0 0, 200px 0, 230px 40px, 100% 40px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)"
                        }}
                    />

                    {/* Inner Content Layer */}
                    <div
                        className="relative bg-[#0F0F0F]"
                        style={{
                            clipPath: "polygon(1px 1px, 199px 1px, 229px 41px, calc(100% - 1px) 41px, calc(100% - 1px) calc(100% - 31px), calc(100% - 31px) calc(100% - 1px), 1px calc(100% - 1px))",
                            marginTop: "1px",
                            marginLeft: "1px",
                            marginRight: "1px",
                            marginBottom: "1px",
                            padding: "2rem",
                            paddingTop: "4rem"
                        }}
                    >
                        {/* Tab Content */}
                        <div className="absolute top-0 left-0 w-[200px] h-[40px] flex items-center justify-center">
                            <span className="text-[#CCFF00] font-bold tracking-wider text-sm">USER PROFILE</span>
                        </div>

                        <GlowingEffect
                            proximity={100}
                            spread={30}
                            blur={2}
                            borderWidth={2}
                            movementDuration={1.5}
                        />

                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left Column: Photo & KYC */}
                            <div className="w-full md:w-1/3 flex flex-col items-center space-y-6 border-b md:border-b-0 md:border-r border-[#CCFF00]/10 pb-8 md:pb-0 md:pr-8">
                                {/* Profile Photo */}
                                <div className="relative group cursor-pointer">
                                    <div className="w-32 h-32 rounded-full bg-[#141414] border-2 border-[#CCFF00] p-1 overflow-hidden relative">
                                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                                            {/* Placeholder for user image */}
                                            <User className="w-16 h-16 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-[#CCFF00] p-2 rounded-full text-black shadow-lg hover:scale-110 transition-transform">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                </div>

                                <div className="text-center space-y-3">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">{formData.firstName} {formData.lastName}</h2>
                                        <p className="text-sm text-gray-400">@{formData.username}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 mx-auto text-red-500 hover:text-red-400 text-xs font-bold tracking-wider uppercase transition-colors px-4 py-2 border border-red-500/30 hover:border-red-500 rounded-lg bg-red-500/10"
                                    >
                                        <LogOut className="w-3 h-3" /> Logout
                                    </button>
                                </div>

                                {/* KYC Status */}
                                <div className="w-full bg-[#141414] border border-[#333] rounded-xl p-4 relative overflow-hidden group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ShieldCheck className="w-5 h-5 text-gray-500" />
                                        <span className="text-gray-300 font-bold text-sm">KYC Verification</span>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-[#CCFF00]/10 text-[#CCFF00] text-[10px] font-bold px-2 py-1 rounded border border-[#CCFF00]/20">
                                        COMING SOON
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Identity verification features will be available shortly.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Details Form */}
                            <div className="w-full md:w-2/3 space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-[#CCFF00] font-bold text-lg tracking-wider">PERSONAL DETAILS</h3>
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="text-xs text-gray-400 hover:text-[#CCFF00] transition-colors"
                                    >
                                        {isEditing ? 'CANCEL' : 'EDIT DETAILS'}
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-gray-400 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                                            <User className="w-3 h-3" /> Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full bg-[#141414] border border-[#333] focus:border-[#CCFF00] rounded-lg p-3 text-white text-sm outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-gray-400 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                                            <User className="w-3 h-3" /> First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full bg-[#141414] border border-[#333] focus:border-[#CCFF00] rounded-lg p-3 text-white text-sm outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-gray-400 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                                            <User className="w-3 h-3" /> Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full bg-[#141414] border border-[#333] focus:border-[#CCFF00] rounded-lg p-3 text-white text-sm outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-gray-400 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                                            <Mail className="w-3 h-3" /> Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={true}
                                            className="w-full bg-[#141414] border border-[#333] focus:border-[#CCFF00] rounded-lg p-3 text-gray-400 text-sm outline-none transition-colors cursor-not-allowed opacity-50"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-gray-400 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                                            <Smartphone className="w-3 h-3" /> Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full bg-[#141414] border border-[#333] focus:border-[#CCFF00] rounded-lg p-3 text-white text-sm outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="pt-4 flex justify-end">
                                        <button
                                            onClick={handleSave}
                                            className="bg-[#CCFF00] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#D4FF00] transition-colors text-sm uppercase tracking-wider"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}

                                <div className="pt-8 flex justify-end border-t border-[#333] mt-8">
                                    <button
                                        onClick={async () => {
                                            if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

                                            const userId = localStorage.getItem('user-id');
                                            try {
                                                const response = await fetch(`/api/users/${userId}`, {
                                                    method: 'DELETE'
                                                });
                                                const data = await response.json();
                                                if (data.success) {
                                                    alert("Account deleted successfully");
                                                    handleLogout();
                                                } else {
                                                    alert("Failed to delete account: " + data.message);
                                                }
                                            } catch (error) {
                                                console.error("Delete account error:", error);
                                                alert("Error deleting account");
                                            }
                                        }}
                                        className="flex items-center gap-2 text-red-500 hover:text-red-400 text-xs font-bold tracking-wider uppercase transition-colors px-4 py-2 border border-red-500/30 hover:border-red-500 rounded-lg bg-red-500/10"
                                    >
                                        <LogOut className="w-3 h-3" /> Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TRANSACTIONS CARD */}
            <div className="w-full max-w-4xl relative z-10 pb-20">
                <div className="relative group filter drop-shadow-[0_0_10px_rgba(204,255,0,0.1)]">
                    {/* Border/Background Layer */}
                    <div
                        className="absolute inset-0 bg-[#CCFF00]/30"
                        style={{
                            clipPath: "polygon(0 0, 250px 0, 280px 40px, 100% 40px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)"
                        }}
                    />

                    {/* Inner Content Layer */}
                    <div
                        className="relative bg-[#0F0F0F]"
                        style={{
                            clipPath: "polygon(1px 1px, 249px 1px, 279px 41px, calc(100% - 1px) 41px, calc(100% - 1px) calc(100% - 31px), calc(100% - 31px) calc(100% - 1px), 1px calc(100% - 1px))",
                            marginTop: "1px",
                            marginLeft: "1px",
                            marginRight: "1px",
                            marginBottom: "1px",
                            padding: "2rem",
                            paddingTop: "4rem"
                        }}
                    >
                        {/* Tab Content */}
                        <div className="absolute top-0 left-0 w-[250px] h-[40px] flex items-center justify-center">
                            <span className="text-[#CCFF00] font-bold tracking-wider text-sm">TRANSACTION HISTORY</span>
                        </div>

                        {/* Controls Bar */}
                        <div className="mb-6 space-y-4">
                            <div className="flex flex-col md:flex-row gap-4 justify-between">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search by ID, UTR..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#141414] border border-[#333] focus:border-[#CCFF00] rounded-lg pl-10 pr-4 py-2 text-white text-sm outline-none transition-colors"
                                    />
                                </div>

                                {/* Filter Toggle (Mobile) */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="md:hidden flex items-center justify-center gap-2 bg-[#141414] border border-[#333] rounded-lg px-4 py-2 text-gray-400 hover:text-white"
                                >
                                    <Filter className="w-4 h-4" /> Filters
                                </button>

                                {/* Desktop Filters */}
                                <div className={`flex flex-col md:flex-row gap-4 ${showFilters ? 'flex' : 'hidden md:flex'}`}>
                                    {/* Status Filter */}
                                    <div className="relative group/select">
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="appearance-none bg-[#141414] border border-[#333] focus:border-[#CCFF00] rounded-lg pl-4 pr-10 py-2 text-white text-sm outline-none cursor-pointer hover:border-gray-500 transition-colors w-full md:w-auto"
                                        >
                                            <option value="ALL">All Status</option>
                                            <option value="PENDING">Pending</option>
                                            <option value="COMPLETED">Completed</option>
                                            <option value="FAILED">Failed</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>

                                    {/* Date Filter */}
                                    <div className="relative group/select">
                                        <select
                                            value={dateFilter}
                                            onChange={(e) => setDateFilter(e.target.value)}
                                            className="appearance-none bg-[#141414] border border-[#333] focus:border-[#CCFF00] rounded-lg pl-4 pr-10 py-2 text-white text-sm outline-none cursor-pointer hover:border-gray-500 transition-colors w-full md:w-auto"
                                        >
                                            <option value="ALL">All Time</option>
                                            <option value="TODAY">Today</option>
                                            <option value="WEEK">Last 7 Days</option>
                                            <option value="MONTH">Last 30 Days</option>
                                        </select>
                                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>

                                    {/* Sort Control */}
                                    <button
                                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                                        className="flex items-center justify-center gap-2 bg-[#141414] border border-[#333] hover:border-[#CCFF00] rounded-lg px-4 py-2 text-gray-400 hover:text-[#CCFF00] transition-colors"
                                        title={`Sort ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                                    >
                                        <ArrowUpDown className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Active Filters Summary */}
                            {(statusFilter !== 'ALL' || dateFilter !== 'ALL' || searchQuery) && (
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-xs text-gray-500">Active Filters:</span>
                                    {statusFilter !== 'ALL' && (
                                        <span className="text-xs bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-1 rounded border border-[#CCFF00]/20 flex items-center gap-1">
                                            {statusFilter}
                                            <button onClick={() => setStatusFilter('ALL')}><X className="w-3 h-3" /></button>
                                        </span>
                                    )}
                                    {dateFilter !== 'ALL' && (
                                        <span className="text-xs bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-1 rounded border border-[#CCFF00]/20 flex items-center gap-1">
                                            {dateFilter}
                                            <button onClick={() => setDateFilter('ALL')}><X className="w-3 h-3" /></button>
                                        </span>
                                    )}
                                    {searchQuery && (
                                        <span className="text-xs bg-[#CCFF00]/10 text-[#CCFF00] px-2 py-1 rounded border border-[#CCFF00]/20 flex items-center gap-1">
                                            "{searchQuery}"
                                            <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                                        </span>
                                    )}
                                    <button
                                        onClick={() => {
                                            setStatusFilter('ALL')
                                            setDateFilter('ALL')
                                            setSearchQuery('')
                                        }}
                                        className="text-xs text-gray-500 hover:text-white underline ml-2"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="text-center text-gray-500 py-8">Loading transactions...</div>
                            ) : transactions.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">No transactions found</div>
                            ) : (
                                transactions.map((tx) => (
                                    <div key={tx.id} className="bg-[#141414] border border-[#333] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-[#CCFF00]/30 transition-colors group">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#CCFF00]/10 text-[#CCFF00]`}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-white font-bold">Buy {tx.amount} INR</div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(tx.createdAt).toLocaleDateString()} • ID: #{tx.id.slice(0, 8).toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`text-sm font-bold px-3 py-1 rounded-full border ${tx.status === 'COMPLETED' ? 'border-green-500/20 bg-green-500/10 text-green-500' :
                                                tx.status === 'FAILED' ? 'border-red-500/20 bg-red-500/10 text-red-500' :
                                                    'border-yellow-500/20 bg-yellow-500/10 text-yellow-500'
                                                }`}>
                                                {tx.status}
                                            </div>
                                            {(tx.status === 'PENDING' || tx.status === 'FAILED') && (
                                                <button
                                                    onClick={() => handleDelete(tx.id)}
                                                    className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors"
                                                    title="Delete Order"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-6 border-t border-[#333] gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 text-sm">
                                    Showing <span className="text-white font-bold">{transactions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to <span className="text-white font-bold">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="text-white font-bold">{totalItems}</span>
                                </span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                    className="bg-[#141414] border border-[#333] rounded px-2 py-1 text-xs text-gray-400 focus:border-[#CCFF00] outline-none"
                                >
                                    <option value={5}>5 per page</option>
                                    <option value={10}>10 per page</option>
                                    <option value={20}>20 per page</option>
                                    <option value={50}>50 per page</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg bg-[#141414] border border-[#333] text-gray-400 hover:text-white hover:border-[#CCFF00] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-bold uppercase tracking-wider"
                                >
                                    Previous
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        // Simple pagination logic to show window around current page
                                        let pageNum = i + 1;
                                        if (totalPages > 5) {
                                            if (currentPage > 3) {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            if (pageNum > totalPages) {
                                                pageNum = totalPages - 4 + i;
                                            }
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setCurrentPage(pageNum)}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${currentPage === pageNum
                                                        ? 'bg-[#CCFF00] text-black'
                                                        : 'bg-[#141414] border border-[#333] text-gray-400 hover:border-[#CCFF00] hover:text-white'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg bg-[#141414] border border-[#333] text-gray-400 hover:text-white hover:border-[#CCFF00] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-bold uppercase tracking-wider"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
