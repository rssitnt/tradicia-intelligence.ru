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
        destination: 'https://www.client-simulator.ru/',
        permanent: false,
      },
      {
        source: '/scouts',
        destination: 'https://www.tradicia-scouts.ru/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 