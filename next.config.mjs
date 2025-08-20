/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["example.com"],
    remotePatterns: [
      {
        hostname: "localhost",
        port: "5050",
      },
      {
        hostname: "favorite-photo-server.onrender.com",
      },
      {
        hostname: "six-favorite-photo-team1-server.onrender.com",
      },
    ],
  },
};

export default nextConfig;
