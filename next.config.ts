/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  experimental: {
    scrollRestoration: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security + SEO trust signals
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },

          // Performance hints
          { key: 'Accept-CH', value: 'DPR, Viewport-Width, Width' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      // Future SEO-friendly URLs support
      {
        source: '/tools/:category',
        destination: '/tool?category=:category',
      },
    ];
  },
};

module.exports = nextConfig;
