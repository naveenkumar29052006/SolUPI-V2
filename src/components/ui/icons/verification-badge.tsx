export function VerificationBadge({ className = "w-16 h-16" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Badge shape with wavy edges */}
            <path
                d="M100 10 
           C110 10, 115 5, 120 10
           C125 15, 130 15, 135 20
           C140 25, 145 25, 150 30
           C155 35, 160 35, 165 40
           C170 45, 175 50, 175 60
           C175 70, 180 75, 180 85
           C180 95, 185 100, 185 110
           C185 120, 180 125, 180 135
           C180 145, 175 150, 175 160
           C175 170, 170 175, 165 180
           C160 185, 155 185, 150 190
           C145 195, 140 195, 135 195
           C130 195, 125 200, 120 195
           C115 190, 110 190, 100 190
           C90 190, 85 190, 80 195
           C75 200, 70 195, 65 195
           C60 195, 55 195, 50 190
           C45 185, 40 185, 35 180
           C30 175, 25 170, 25 160
           C25 150, 20 145, 20 135
           C20 125, 15 120, 15 110
           C15 100, 20 95, 20 85
           C20 75, 25 70, 25 60
           C25 50, 30 45, 35 40
           C40 35, 45 35, 50 30
           C55 25, 60 25, 65 20
           C70 15, 75 15, 80 10
           C85 5, 90 10, 100 10 Z"
                fill="url(#neonGradient)"
            />

            {/* Gradient definition */}
            <defs>
                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#CCFF00" />
                    <stop offset="100%" stopColor="#D4FF00" />
                </linearGradient>
            </defs>

            {/* Checkmark */}
            <path
                d="M60 100 L85 125 L140 70"
                stroke="white"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}
