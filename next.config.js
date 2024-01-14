/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/products', permanent: false },
    ]
  }
}

module.exports = nextConfig
