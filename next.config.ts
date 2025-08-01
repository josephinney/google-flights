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
    ],
  },
  
};

export default nextConfig;
