/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ['example.com', 'localhost'],
  },
};

export default nextConfig;
