/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
