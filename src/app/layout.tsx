import "./globals.css";
import LiquidEther from "@/components/LiquidEther";
import { HeroHeader } from "@/components/header";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">

      <body className="font-sans antialiased">
        <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
          <LiquidEther
            interactive={true}
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={15}
            cursorSize={120}
            isViscous={false}
            viscous={20}
            iterationsViscous={16}
            iterationsPoisson={16}
            resolution={0.75}
            dt={0.016}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.3}
            autoIntensity={1.8}
            takeoverDuration={0.15}
            autoResumeDelay={2000}
            autoRampDuration={0.4}
          />
        </div>
        <div style={{ position: "relative", zIndex: 10, pointerEvents: "auto" }}>
          <HeroHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
