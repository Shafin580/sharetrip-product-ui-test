/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/dummyjson/:path*",
        destination: "https://dummyjson.com/:path*",
      },
    ]
  },
}

export default nextConfig
