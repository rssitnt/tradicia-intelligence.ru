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
  async redirects() {
    return [
      {
        source: '/simulator-studio',
        destination: 'https://ti-client-simulator-studio-git-main-rsstnts-projects.vercel.app/',
        permanent: false,
      },
      {
        source: '/scouts',
        destination: 'https://tradicia-scouts.vercel.app/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 