import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["16.171.166.210"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://16.171.166.210:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
