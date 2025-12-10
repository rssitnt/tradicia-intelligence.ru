/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tradicia-intelligence.ru',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/simulator-studio',
        destination: 'https://ti-client-simulator-studio-git-main-rsstnts-projects.vercel.app/',
      },
      {
        source: '/simulator-studio/:path*',
        destination: 'https://ti-client-simulator-studio-git-main-rsstnts-projects.vercel.app/:path*',
      },
      {
        source: '/scouts',
        destination: 'https://tradicia-scouts.vercel.app/',
      },
      {
        source: '/scouts/:path*',
        destination: 'https://tradicia-scouts.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig 