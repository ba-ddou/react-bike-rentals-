/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.shopify.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig
