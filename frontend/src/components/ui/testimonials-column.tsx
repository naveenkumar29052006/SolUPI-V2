import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={cn("overflow-hidden h-[740px]", props.className)}>
            <div
                className="flex flex-col gap-6 pb-6 animate-scroll-vertical will-change-transform"
                style={{ "--animation-duration": `${props.duration || 10}s` } as React.CSSProperties}
            >
                {[...new Array(2)].fill(0).map((_, index) => (
                    <React.Fragment key={index}>
                        {props.testimonials.map(({ text, image, name, role }, i) => (
                            <div className="p-8 rounded-2xl border border-white/10 bg-[#1A1A1A] shadow-lg max-w-xs w-full hover:border-[#CCFF00]/30 transition-colors duration-300" key={i}>
                                <div className="text-gray-300 text-sm leading-relaxed font-medium">{text}</div>
                                <div className="flex items-center gap-3 mt-5">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                                        <Image
                                            src={image}
                                            alt={name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-white text-sm tracking-wide uppercase font-rajdhani">{name}</div>
                                        <div className="text-xs text-[#CCFF00] tracking-wider uppercase font-bold">{role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
