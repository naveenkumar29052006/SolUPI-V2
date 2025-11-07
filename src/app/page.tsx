export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Main Hero Section */}
      <main className="flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            The web, made fluid at your fingertips.
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Experience dynamic motion powered by Three.js.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button */}
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,69,255,0.6)] hover:scale-105 min-w-[160px] pointer-events-auto">
              Get Started
            </button>
            
            {/* Secondary Button */}
            <button className="px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-full text-lg transition-all duration-300 hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 min-w-[160px] pointer-events-auto">
              Learn More
            </button>
          </div>
        </div>
      </main>

      {/* Additional content sections to make page scrollable */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/5 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">Fluid Motion</h3>
              <p className="text-white/70">Experience smooth, interactive fluid dynamics powered by WebGL shaders.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">Responsive Design</h3>
              <p className="text-white/70">Optimized for all devices with seamless mobile and desktop experiences.</p>
            </div>
            <div className="p-6 bg-white/5 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">Modern Tech</h3>
              <p className="text-white/70">Built with Next.js, TypeScript, and Three.js for cutting-edge performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            About the Technology
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            This interactive background uses WebGL fragment shaders to simulate fluid dynamics in real-time. 
            The effect responds to your mouse movements and touch gestures, creating a truly immersive experience.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-4">WebGL Shaders</h3>
              <p className="text-white/70 mb-4">
                Custom fragment and vertex shaders create the fluid simulation with advanced physics calculations 
                running directly on your GPU for smooth 60fps performance.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-4">Interactive Physics</h3>
              <p className="text-white/70 mb-4">
                Mouse and touch interactions generate forces that propagate through the fluid medium, 
                creating realistic ripples and distortions that feel natural and responsive.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/60">
            © 2025 React Bits. Powered by Next.js, Three.js, and WebGL.
          </p>
        </div>
      </footer>
    </div>
  );
}
