import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logos.skyscnr.com',
        port: '',
        pathname: '/images/airlines/favicon/**',
      },

      { 
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
  
};

export default nextConfig;
