import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Blog',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
