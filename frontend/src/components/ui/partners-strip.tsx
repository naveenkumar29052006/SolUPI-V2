import React from 'react';
import { ArrowRight } from 'lucide-react';

export function PartnersStrip() {
    const partners = [
        { name: 'Bloomberg' },
        { name: 'WIRED' },
        { name: 'The Guardian' },
        { name: 'TechCrunch' },
    ];

    return (
        <div className="w-full bg-[#181818] py-8 relative overflow-hidden">
            <div className="max-w-[95%] mx-auto px-6 relative z-10">
                <div className="border border-white/10 bg-[#0F0F0F] rounded-2xl rounded-bl-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    {/* Corner Accent */}
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#CCFF00] rounded-bl-[2rem]"></div>

                    <div className="flex items-center gap-6 shrink-0">
                        <div className="flex flex-col leading-none">
                            <span className="text-[#CCFF00] font-bold tracking-widest text-sm uppercase">OUR</span>
                            <span className="text-[#CCFF00] font-bold tracking-widest text-lg uppercase">PARTNERS</span>
                        </div>
                        <ArrowRight className="w-6 h-6 text-[#CCFF00]" />
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-12 items-center flex-1">
                        {partners.map((partner) => (
                            <div key={partner.name} className="text-white font-rajdhani font-bold text-2xl uppercase tracking-wider hover:text-[#CCFF00] transition-colors cursor-pointer">
                                {partner.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
