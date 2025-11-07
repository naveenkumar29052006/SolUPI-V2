"use client"
import { motion } from "framer-motion" // Corrected import
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import type { JSX } from "react/jsx-runtime" // Declared JSX variable

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true)
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])
  return (
    <motion.div
      initial={{
        opacity: 1,
        y: -100,
      }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={cn(
        "flex w-96 md:w-[500px] lg:w-[600px] fixed top-6 inset-x-0 mx-auto border border-neutral-700 rounded-full bg-neutral-950 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-6 pl-12 py-4 items-center justify-between space-x-8 transition-all hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]",
        className,
      )}
    >
      <div className="flex items-center space-x-8">
        {navItems.map((navItem: any, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn("relative text-neutral-200 items-center flex space-x-2 hover:text-cyan-400 transition-colors")}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="text-base font-medium">{navItem.name}</span>
          </a>
        ))}
      </div>
      <button className="border border-neutral-600 text-base font-medium relative text-neutral-100 px-6 py-3 rounded-full bg-neutral-900 hover:border-cyan-500/70 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:bg-neutral-800 transition-all">
        <span>Login</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px" />
      </button>
    </motion.div>
  )
}
