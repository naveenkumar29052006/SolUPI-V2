"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";
import { motion } from "framer-motion";

const testimonials = [
    {
        text: "Finally a way to buy USDC without dealing with P2P scams. The UPI integration is seamless and super fast.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        name: "Aisha Patel",
        role: "DeFi Trader",
    },
    {
        text: "SolUPI is a game changer for Indian crypto users. Instant settlement directly to my Phantom wallet.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        name: "Rahul Sharma",
        role: "NFT Collector",
    },
    {
        text: "No more bank freezes! This is the safest on-ramp I've used. The fees are negligible compared to CEXs.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        name: "Priya Singh",
        role: "Crypto Investor",
    },
    {
        text: "The UI is incredible. Feels like I'm using a futuristic app. Transaction completed in under 10 seconds.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        name: "Arjun Mehta",
        role: "Solana Dev",
    },
    {
        text: "Transparent pricing and zero slippage. Exactly what the Solana ecosystem needed in India.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
        name: "Sneha Gupta",
        role: "Web3 Founder",
    },
    {
        text: "I love that it's non-custodial. My funds go straight to my wallet. No middleman holding my assets.",
        image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
        name: "Vikram Malhotra",
        role: "Day Trader",
    },
    {
        text: "Best rates in the market. I checked against Binance and others, SolUPI wins every time.",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        name: "Karan Verma",
        role: "HODLer",
    },
    {
        text: "Support is top notch and the process is fully automated. Highly recommend for large volume trades.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
        name: "Anjali Das",
        role: "Institutional Trader",
    },
    {
        text: "Smooth, fast, and reliable. The only way I buy USDC on Solana now.",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
        name: "Rohan Kumar",
        role: "DeFi Degen",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
    return (
        <section className="bg-[#0A0A0A] py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>

            <div className="container z-10 mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-16"
                >
                    <div className="flex justify-center mb-6">
                        <div className="border border-[#CCFF00]/30 bg-[#CCFF00]/10 text-[#CCFF00] py-1 px-4 rounded-full text-xs font-bold uppercase tracking-widest">
                            Community Trust
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-center uppercase font-monument text-white mb-6">
                        What our <span className="text-[#CCFF00]">users say</span>
                    </h2>
                    <p className="text-center text-gray-400 text-lg">
                        Join thousands of satisfied users trading on SolUPI.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
};
