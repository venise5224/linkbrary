import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // 외부 이미지 도메인 추가
  images: {
    domains: ["codeit-static.codeit.com"],
  },
};

export default nextConfig;
