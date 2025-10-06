import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty config - most stable approach
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;