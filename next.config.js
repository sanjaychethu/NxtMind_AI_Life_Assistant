/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
    unoptimized: true,
  },
  // Add output configuration for static export
  output: 'standalone',
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Configure build output
  distDir: '.next',
  // Enable source maps in production
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig 