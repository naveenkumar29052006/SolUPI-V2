'use client';

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function SmoothScroll() {
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.75, // Significantly faster duration (was 1.5)
            // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing is usually fine, but let's keep it if we want that specific curve
            smoothWheel: true,
            wheelMultiplier: 1.2, // Slightly increase wheel speed
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle route changes
        const handleRouteChange = () => {
            lenis.scrollTo(0, { immediate: true });
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                lenis.resize();
            }, 100);
        };

        handleRouteChange();

        return () => {
            lenis.destroy();
        };
    }, [pathname]); // Re-initialize or handle change when pathname changes

    return null;
}
