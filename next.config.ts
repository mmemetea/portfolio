import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ponytail: pin workspace root — stray lockfiles exist above this project
  // (/Users/package-lock.json, ~/pnpm-workspace.yaml); nub owns this one.
  turbopack: { root: __dirname },
};

export default nextConfig;
