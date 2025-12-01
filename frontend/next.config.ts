import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production'
          ? 'https://solupi-backend.onrender.com/api/:path*'
          : 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
