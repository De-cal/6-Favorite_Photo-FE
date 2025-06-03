/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["example.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5050",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "six-favorite-photo-team1-server.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
