import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during build to allow deployment
    // We'll fix the errors separately
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Don't fail on type errors during build
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;
