/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config;
  },
  images: {
    domains: [
      "localhost",
      "randomuser.me",
      "earnindollars.s3.eu-north-1.amazonaws.com",
    ],
  },
  typescript: {
    // ⚠️ Dangerously skip type checking during build
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
