export default function Navbar() {
  return (
    <nav className="w-full flex justify-center mt-8 pointer-events-auto">
      <div className="flex items-center justify-between px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white min-w-[60%] max-w-[800px]">
        <div className="flex items-center space-x-2">
          {/* Replace with your own logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.5c1.667 0 3 1.333 3 3S13.667 10.5 12 10.5 9 9.167 9 7.5s1.333-3 3-3zM4.5 12c0 1.667 1.333 3 3 3s3-1.333 3-3-1.333-3-3-3-3 1.333-3 3zM19.5 12c0 1.667-1.333 3-3 3s-3-1.333-3-3 1.333-3 3-3 3 1.333 3 3z"
            />
          </svg>
          <span className="font-semibold text-lg">React Bits</span>
        </div>

        <div className="flex items-center space-x-6 font-semibold">
          <a href="#" className="hover:text-gray-300 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Docs
          </a>
        </div>
      </div>
    </nav>
  );
}
