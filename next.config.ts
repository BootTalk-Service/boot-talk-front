import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["boottalk-bucket.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://43.200.67.27:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
