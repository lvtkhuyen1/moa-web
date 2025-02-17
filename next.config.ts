/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all hostnames
      },
      {
        protocol: "http",
        hostname: "**", // Allows all hostnames (optional)
      },
    ],
  },
};

module.exports = nextConfig;
