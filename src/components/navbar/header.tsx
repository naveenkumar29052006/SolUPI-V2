'use client'
import Link from 'next/link'
import { Logo } from '@/components/branding/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/forms/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
    { name: 'Features', href: '#link' },
    { name: 'Solution', href: '#link' },
    { name: 'Pricing', href: '#link' },
    { name: 'About', href: '#link' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [scrollY, setScrollY] = React.useState(0)

    React.useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setScrollY(currentScrollY);
                    setIsScrolled(currentScrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
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

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="relative text-white hover:text-white/80 block duration-150 font-medium group">
                                            <span>{item.name}</span>
                                            <div className="absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" style={{background: 'linear-gradient(90deg, #00FFA3, #03E1FF, #DC1FFF)'}}></div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <AnimatePresence>
                            <motion.div 
                                className={cn(
                                    "bg-black/90 mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/20 p-6 shadow-2xl lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none",
                                    menuState ? "block lg:flex" : "hidden lg:flex"
                                )}
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0, 
                                    scale: 1,
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    y: -20, 
                                    scale: 0.95,
                                    transition: { duration: 0.3, ease: "easeInOut" }
                                }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 300, 
                                    damping: 25,
                                    duration: 0.4
                                }}>
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="relative text-white hover:text-white/80 block duration-150 font-medium group">
                                                <span>{item.name}</span>
                                                <div className="absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" style={{background: 'linear-gradient(90deg, #00FFA3, #03E1FF, #DC1FFF)'}}></div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn("border-white/30 text-white hover:bg-white/10 hover:text-white", isScrolled && 'lg:hidden')}>
                                    <Link href="/login">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn("bg-white text-black hover:bg-white/90", isScrolled && 'lg:hidden')}>
                                    <Link href="/signup">
                                        <span>Sign Up</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn("bg-white text-black hover:bg-white/90", isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link href="/signup">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
        </motion.header>
    )
}
