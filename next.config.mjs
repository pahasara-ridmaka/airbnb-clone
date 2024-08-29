/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "fbzrqngorseearpxisup.supabase.co",
      },
    ],
  },
};

export default nextConfig;
