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
  // Configure build output
  output: 'standalone',
  // Enable source maps in production
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig 