import React from 'react';

interface CircularTimerProps {
    timeLeft: number;
    totalTime: number;
    size?: number;
    strokeWidth?: number;
}

export const CircularTimer: React.FC<CircularTimerProps> = ({
    timeLeft,
    totalTime,
    size = 200,
    strokeWidth = 12
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = timeLeft / totalTime;
    const dashOffset = circumference - progress * circumference;

    // Format time as MM:SS
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Background Circle */}
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-gray-800"
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    className="text-[#CCFF00] transition-all duration-1000 ease-linear"
                />
            </svg>
            {/* Time Text */}
            <div className="absolute text-4xl font-bold text-white font-mono">
                {timeString}
            </div>

            {/* Optional: Knob/Indicator at the end of the progress */}
            {/* Calculating position for a knob would require trigonometry based on the angle */}
        </div>
    );
};
