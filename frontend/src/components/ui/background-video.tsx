import React from 'react';

export const BackgroundVideo = () => {
    return (
        <div className="absolute inset-x-0 bottom-0 top-0 z-0 bg-black">
            <video
                autoPlay
                muted
                playsInline
                loop
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/generated-background.mp4" type="video/mp4" />
            </video>
            {/* Overlay to ensure text readability if needed, though the video seems dark enough based on usage */}
            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
};
