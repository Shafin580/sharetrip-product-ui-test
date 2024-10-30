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
        hostname: "https://dummyjson.com",
        port: "",
        pathname: "/cache/**",
        // search: "",
      },
    ],
  },
}

export default nextConfig