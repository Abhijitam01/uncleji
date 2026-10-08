import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@atelier/ui", "@atelier/content", "@atelier/art"],
  agentRules: false,
};

export default nextConfig;
