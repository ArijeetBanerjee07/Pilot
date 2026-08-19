import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pictures
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // GitHub avatars (future)
      },
    ],
  },
};

export default nextConfig;

