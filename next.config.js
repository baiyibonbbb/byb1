/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 禁用图片优化，允许直接引用本地图片文件
    unoptimized: true,
    // 使用推荐的remotePatterns格式
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  // 确保public目录下的静态文件可以正确访问
  staticPageGenerationTimeout: 100,
};

module.exports = nextConfig;