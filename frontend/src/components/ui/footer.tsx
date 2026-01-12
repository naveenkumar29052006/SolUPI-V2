import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="relative w-full h-[600px] bg-[#050505] text-white overflow-hidden mt-0">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/footer.png"
                    alt="Footer Background"
                    fill
                    className="object-cover object-center"
                    priority
                    unoptimized
                />
                {/* Gradient Overlay - Temporarily removed for debugging */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div> */}
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10">

                    {/* Left Side: Logo & Copyright */}
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-lg md:text-xl font-monument uppercase mb-2 tracking-tighter text-[#cbff00]">
                            SolUpi
                        </h2>
                        <p className="text-[#cbff00] text-[8px] font-bold tracking-widest uppercase">
                            ©2024 ALL RIGHTS RESERVED
                        </p>
                    </div>

                    {/* Right Side: Links */}
                    <div className="flex flex-wrap gap-12 md:gap-20">
                        {/* Column 1: Links */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[#CCFF00] font-monument uppercase text-sm tracking-wider mb-2">LINKS</h3>
                            <Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Twitter</Link>
                            <Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Telegram</Link>
                            <Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Discord</Link>
                        </div>

                        {/* Column 2: Contact Us */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[#CCFF00] font-monument uppercase text-sm tracking-wider mb-2">CONTACT US</h3>
                            <div className="flex flex-col gap-1">
                                <span className="text-white text-sm font-bold uppercase">Email</span>
                                <a href="mailto:support@solupi.com" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">support@solupi.com</a>
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                <span className="text-white text-sm font-bold uppercase">Address</span>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-[200px]">
                                    123 Blockchain Avenue,<br />
                                    Crypto Valley, SOL 420
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
