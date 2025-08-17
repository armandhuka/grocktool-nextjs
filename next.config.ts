import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    nextScriptWorkers: false, // safety
    serverActions: { bodySizeLimit: "2mb" }, // optional
  },
  devIndicators: false as any, // force-disable for types
  eslint: {
    ignoreDuringBuilds: true, // ✅ This ignores ESLint errors in production build
  },
};

export default nextConfig;
