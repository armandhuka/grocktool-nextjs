import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable the new Next.js Dev Tools
    nextScriptWorkers: false, // safety
    serverActions: { bodySizeLimit: "2mb" }, // optional
  },
  devIndicators: false as any, // force-disable for types
};

export default nextConfig;