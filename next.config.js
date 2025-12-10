/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: 'https://vercel.com/rsstnts-projects/ti-client-simulator-studio/4K3qxeBLUouhfPex8xk71V8byuf5',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig 