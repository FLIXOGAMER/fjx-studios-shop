/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.tebex.io'], // Falls du Bilder von Tebex hostest
  },
}

module.exports = nextConfig
