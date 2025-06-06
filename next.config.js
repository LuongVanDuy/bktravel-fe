/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Static Export
  // output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
