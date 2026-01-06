import "../styles/globals.css";
import { Navbar } from "@/components/navbar/header";
import type { Metadata } from "next";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "SolUPI - Buy USDC on Solana with UPI",
  description: "The fastest and most affordable way to buy USDC on Solana using UPI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
