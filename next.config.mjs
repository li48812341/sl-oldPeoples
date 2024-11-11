/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/', // 当访问根路径 `/`
        destination: '/login', // 自动重定向到 `/login`
        permanent: true, // 设置为永久重定向 (301)，如果是临时重定向可以设为 false
      },
    ];
  },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            // destination: 'http://223.85.235.33:8080/:path*', // 目标后端 API
            // destination: 'http://36.170.63.134:30081/:path*', // 目标后端 API
            destination: 'http://36.170.63.134:30080/:path*', // 本地后端 API
          },
        //    {
        //     source: '/api/converter/stream',
        //     destination: 'http://36.133.62.220:30080/:path*', // 目标后端 API
        //   }
        {
          source: '/http/v1/:path*',
          // destination: 'http://223.85.235.33:8080/:path*', // 目标后端 API
          // destination: 'http://36.170.63.134:30081/:path*', // 目标后端 API
          // destination: 'http://223.85.237.4:80/http/v1/:path*', // 本地后端 API
          destination: 'http://36.170.63.134:30080/http/v1/:path*', // 本地后端 API
        }
        ]
      },
      typescript: {
        // 忽略 TypeScript 构建错误
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds: true, // 忽略 eslint 检查
      },
      reactStrictMode: false,
      output: 'standalone', // 独立打包
};

export default nextConfig;
