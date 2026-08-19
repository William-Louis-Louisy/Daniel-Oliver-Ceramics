import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const backendUrl = process.env.BACKEND_URL?.replace(/\/$/, '');

if (!backendUrl) {
  throw new Error('Missing BACKEND_URL');
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.ucarecd.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.ucarecdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        pathname: '/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
