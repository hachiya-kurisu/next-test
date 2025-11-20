import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd8cip8330xdjp.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
