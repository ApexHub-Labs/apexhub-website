/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Pin the workspace root so Next doesn't pick up an unrelated lockfile in the
  // parent/home directory when inferring the project root.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Allowlist required in Next 16; covers (90) and lightbox (95) need these.
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
