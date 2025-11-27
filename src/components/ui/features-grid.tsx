import React from 'react';
import { TrendingUp, Shield, Zap, Lock } from 'lucide-react';
import { GlareCard } from '@/components/ui/glare-card';

const features = [
    {
        icon: Shield,
        title: "No Bank Freezes",
        description: "Uses small UPI payments that never trigger bank risk checks."
    },
    {
        icon: Lock,
        title: "No Scams",
        description: "No P2P sellers. No strangers. Fully automated and trusted."
    },
    {
        icon: Zap,
        title: "Instant Settlement",
        description: "UPI → USDC on Solana in seconds."
    },
    {
        icon: TrendingUp,
        title: "Cheapest Option",
        description: "Near-zero fees compared to exchanges and P2P platforms."
    }
];

export function FeaturesGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {features.map((feature, index) => (
                <GlareCard key={index} className="flex flex-col items-center justify-center p-6 text-center bg-[#1A1A1A]">
                    <div className="w-16 h-16 rounded-xl bg-[#CCFF00] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                        <feature.icon className="w-8 h-8 text-black" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase mb-3 font-monument">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium">
                        {feature.description}
                    </p>
                </GlareCard>
            ))}
        </div>
    );
}
