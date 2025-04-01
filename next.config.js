/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
    loader: "imgix",
    loderFile: "./imgix-loader.ts",
  },
};

module.exports = nextConfig;
