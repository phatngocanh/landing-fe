import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["*.replit.dev", "*.worf.replit.dev", "*.repl.co"],
  async redirects() {
    return [
      {
        source: "/zifat999/products",
        destination: "/products?brand=ZIFAT999",
        permanent: true,
      },
      {
        source: "/sifa999/products",
        destination: "/products?brand=SIFA999",
        permanent: true,
      },
      {
        source: "/zifat999/contact",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/sifa999/contact",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/zifat999/about",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/sifa999/about",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
