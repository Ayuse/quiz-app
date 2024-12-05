import type { NextConfig } from "next";
import build from "next/dist/build";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: "build",
};

export default nextConfig;
