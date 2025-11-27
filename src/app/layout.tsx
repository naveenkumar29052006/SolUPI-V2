'use client'

import "../styles/globals.css";
import dynamic from 'next/dynamic';
import { Navbar } from "@/components/navbar/header";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ToastProvider } from "@/components/ui/toast";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="en">
      <body className="font-sans antialiased overflow-x-hidden bg-[#0a0a0a]" suppressHydrationWarning={true}>
        <SmoothScroll />

        <div style={{ position: "relative", zIndex: 10, pointerEvents: "auto" }}>
          <ToastProvider>
            <Navbar />
            {children}
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
