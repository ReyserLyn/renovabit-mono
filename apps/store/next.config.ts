import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typedRoutes: true,
  transpilePackages: ["@renovabit/ui"],
};
export default nextConfig;
