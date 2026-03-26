import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["*.replit.dev", "*.worf.replit.dev", "*.repl.co"],
};

export default nextConfig;
