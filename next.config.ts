/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.myreallovedoll.com', // 替换成你真实的 WP 后台子域名
      },
    ],
  },
};

export default nextConfig;