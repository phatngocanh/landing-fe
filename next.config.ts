import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["*.replit.dev", "*.worf.replit.dev", "*.repl.co"],
  images: {
    // Allow images served by landing-be (current dev) and the live origin.
    // Phase 7 will replace placeholder URLs with real CDN/object-storage hosts.
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "8080" },
      { protocol: "http", hostname: "127.0.0.1", port: "8080" },
      { protocol: "https", hostname: "phatngocanh.com" },
      // S3 default virtual-hosted style. Real bucket name is set via the BE
      // env; the FE can either use the default *.s3.<region>.amazonaws.com or
      // a custom CDN host (add it here when configured).
      { protocol: "https", hostname: "**.s3.amazonaws.com" },
      { protocol: "https", hostname: "**.s3.*.amazonaws.com" },
    ],
  },
  async redirects() {
    // Preserve SEO juice when the legacy phatngocanh.com URLs (PHP catalog) are
    // replaced by the new Next.js routes. Slugs are preserved 1:1 from the
    // scrape, so /san-pham/{id}/{slug}.html → /product/{slug} works.
    return [
      {
        source: "/san-pham/:id(\\d+)/:slug.html",
        destination: "/product/:slug",
        permanent: true,
      },
      {
        // Category landing pages on the legacy site:
        // /san-pham/{cat-slug}-{catId}.html → /products?category={cat-slug}
        // We strip the trailing -{catId}.html and treat the prefix as the slug.
        source: "/san-pham/:catSlug-:catId(\\d+).html",
        destination: "/products?category=:catSlug",
        permanent: true,
      },
      {
        source: "/san-pham.html",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
