/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "swhnoabqzwrjxdrv.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
