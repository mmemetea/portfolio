import type { NextConfig } from "next";

// Deploys to mmemetea.github.io/portfolio (GitHub Pages project page).
// EXPORT_MODE=1 produces the pure static export under that basePath; the
// Keystatic admin — a localhost-only, dev-time CMS whose UI assumes no
// basePath — is set aside by scripts/export.sh and runs only in plain dev,
// where paths stay unprefixed.
const isExport = process.env.EXPORT_MODE === "1";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        basePath: "/portfolio",
        trailingSlash: true,
        env: { NEXT_PUBLIC_BASE_PATH: "/portfolio" },
      }
    : {}),
  // ponytail: pin workspace root — stray lockfiles exist above this project
  // (/Users/package-lock.json, ~/pnpm-workspace.yaml); nub owns this one.
  turbopack: { root: __dirname },
};

export default nextConfig;
