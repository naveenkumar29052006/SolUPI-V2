'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

interface AnimatedCheckboxProps {
  id: string
  name: string
  checked: boolean
  onChange: (checked: boolean) => void
  label: string | React.ReactNode
  disabled?: boolean
}

export function AnimatedCheckbox({
  id,
  name,
  checked,
  onChange,
  label,
  disabled = false
}: AnimatedCheckboxProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <div className="flex items-center">
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={handleChange}
      >
        {/* Hidden native checkbox for accessibility */}
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
        />

        {/* Custom checkbox */}
        <motion.div
          className="h-4 w-4 rounded border-2 flex items-center justify-center"
          animate={{
            backgroundColor: checked ? '#CCFF00' : 'rgba(255, 255, 255, 0.1)',
            borderColor: checked ? '#CCFF00' : 'rgba(255, 255, 255, 0.3)',
            scale: checked ? 1.1 : 1
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.2
          }}
        >
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{
                  scale: 0,
                  rotate: -90,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  opacity: 1
                }}
                exit={{
                  scale: 0,
                  rotate: 90,
                  opacity: 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.2
                }}
              >
                <Check className="h-2.5 w-2.5 text-black stroke-[3]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Label */}
      <label
        htmlFor={id}
        className="ml-2 text-sm text-gray-300 cursor-pointer select-none"
        onClick={handleChange}
      >
        {label}
      </label>
    </div>
  )
}