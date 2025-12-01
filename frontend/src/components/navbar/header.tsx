'use client'
import Link from 'next/link'
import { Logo } from '@/components/branding/logo'
import { Menu, X, User } from 'lucide-react'
import { Button } from '@/components/ui/forms/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'COMMUNITY', href: '#community' },
    { name: 'FAQ', href: '#faq' },
    { name: 'CONTACT', href: '#contact' },
]


import { usePathname, useRouter } from 'next/navigation'

export const Navbar = () => {
    const pathname = usePathname()
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [activeSection, setActiveSection] = React.useState('')
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
        }

        // Check Auth Status
        const checkAuth = () => {
            const token = localStorage.getItem('auth-token')
            setIsLoggedIn(!!token)
        }

        checkAuth()

        // Listen for custom auth-change event (optional, but good for immediate updates)
        window.addEventListener('auth-change', checkAuth)
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('auth-change', checkAuth)
        }
    }, [pathname]) // Re-run when pathname changes

    // Active Section Detection
    React.useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        menuItems.forEach((item) => {
            if (item.href.startsWith('#')) {
                const element = document.querySelector(item.href);
                if (element) observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const router = useRouter()

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMenuState(false);

        if (pathname === '/') {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push(`/${href}`);
        }
    };

    return (
        <motion.header
            data-state={menuState && 'active'}
            className="fixed z-20 w-full px-2 pointer-events-auto"
            initial={{ y: 0, opacity: 1 }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}>
            <motion.div
                className={cn('mx-auto mt-2 max-w-6xl px-6 lg:px-12')}
                animate={{
                    backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)',
                    maxWidth: isScrolled ? '64rem' : '72rem',
                    borderRadius: isScrolled ? '16px' : '0px',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
                    border: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0)',
                    paddingLeft: isScrolled ? '20px' : '48px',
                    paddingRight: isScrolled ? '20px' : '48px',
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    duration: 0.6
                }}>
                <motion.div
                    className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4"
                    animate={{
                        paddingTop: isScrolled ? '12px' : '16px',
                        paddingBottom: isScrolled ? '12px' : '16px',
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        duration: 0.5
                    }}>
                    <div className="flex w-full justify-between lg:w-auto">
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            <Logo />
                        </Link>

                        <motion.button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                            className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                            <motion.div
                                animate={{
                                    rotate: menuState ? 180 : 0,
                                    scale: menuState ? 0 : 1,
                                    opacity: menuState ? 0 : 1
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="m-auto size-6 text-white">
                                <Menu className="size-6" />
                            </motion.div>
                            <motion.div
                                animate={{
                                    rotate: menuState ? 0 : -180,
                                    scale: menuState ? 1 : 0,
                                    opacity: menuState ? 1 : 0
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="absolute inset-0 m-auto size-6 text-white">
                                <X className="size-6" />
                            </motion.div>
                        </motion.button>
                    </div>

                    <div className="hidden lg:flex items-center gap-8">
                        <ul className="flex gap-8 text-sm font-bold tracking-widest font-rajdhani">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleScrollTo(e, item.href)}
                                        className={cn(
                                            "relative transition-colors block duration-150 group uppercase",
                                            activeSection === item.href ? "text-white" : "text-gray-300 hover:text-white"
                                        )}
                                    >
                                        <span>{item.name}</span>
                                        <div className={cn(
                                            "absolute -bottom-1 left-0 h-0.5 bg-[#CCFF00] transition-all duration-300 shadow-[0_0_10px_#CCFF00]",
                                            activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                                        )}></div>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-4">
                            {isLoggedIn ? (
                                <Link href="/profile">
                                    <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#333] hover:border-[#CCFF00] flex items-center justify-center transition-all duration-300 group">
                                        <User className="w-5 h-5 text-gray-400 group-hover:text-[#CCFF00]" />
                                    </div>
                                </Link>
                            ) : (
                                <Link href="/login">
                                    <Button variant="outline" size="sm" className="border-white/10 hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black text-gray-300 font-rajdhani font-bold tracking-wider uppercase bg-transparent backdrop-blur-sm transition-all duration-300">
                                        Login
                                    </Button>
                                </Link>
                            )}
                            <Link href="/swap">
                                <Button size="sm" className="bg-[#CCFF00] text-black hover:bg-[#D4FF00] font-bold uppercase tracking-wider border-none font-rajdhani clip-path-button shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all duration-300">
                                    Buy Now
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <AnimatePresence>
                        {menuState && (
                            <motion.div
                                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A]/95 backdrop-blur-xl lg:hidden"
                                initial={{ opacity: 0, x: '100%' }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: '100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            >
                                <div className="absolute top-6 right-6">
                                    <button
                                        onClick={() => setMenuState(false)}
                                        className="p-2 text-white hover:text-[#CCFF00] transition-colors"
                                    >
                                        <X className="w-8 h-8" />
                                    </button>
                                </div>

                                <ul className="flex flex-col items-center gap-8 text-2xl font-bold uppercase tracking-widest">
                                    {menuItems.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 + index * 0.1 }}
                                        >
                                            <a
                                                href={item.href}
                                                onClick={(e) => handleScrollTo(e, item.href)}
                                                className={cn(
                                                    "transition-colors relative group",
                                                    activeSection === item.href ? "text-white" : "text-gray-300 hover:text-[#CCFF00]"
                                                )}
                                            >
                                                {item.name}
                                                <span className={cn(
                                                    "absolute -bottom-2 left-0 h-1 bg-[#CCFF00] transition-all duration-300",
                                                    activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                                                )}></span>
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="mt-12 flex flex-col gap-4 w-64">
                                    {isLoggedIn ? (
                                        <Link href="/profile" onClick={() => setMenuState(false)}>
                                            <Button variant="outline" className="w-full border-white/20 hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all duration-300 flex items-center gap-2 justify-center">
                                                <User className="w-4 h-4" /> Profile
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href="/login" onClick={() => setMenuState(false)}>
                                            <Button variant="outline" className="w-full border-white/20 hover:border-[#CCFF00] hover:bg-[#CCFF00] hover:text-black transition-all duration-300">
                                                Login
                                            </Button>
                                        </Link>
                                    )}
                                    <Link href="/swap" onClick={() => setMenuState(false)}>
                                        <Button className="w-full bg-[#CCFF00] text-black hover:bg-[#D4FF00] font-bold">
                                            Buy Now
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.header>
    )
}
