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
  output: "standalone",

  allowedDevOrigins: ["10.10.10.100"],
};
export default nextConfig;
