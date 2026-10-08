import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kiah/ui", "@kiah/content", "@kiah/art"],
  agentRules: false,
};

export default nextConfig;
