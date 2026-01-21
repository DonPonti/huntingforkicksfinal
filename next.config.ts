import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. OBSCURE: Hide that the site is running on Next.js
  poweredByHeader: false,

  // 2. IMAGES: Whitelist Unsplash (Security practice: Don't allow "all")
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // 3. HEADERS: The Security Rules
  async headers() {
    return [
      {
        source: '/:path*', // Apply to every route
        headers: [
          {
            // PREVENT CLICKJACKING: No one can embed your site in an iframe
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // PREVENT MIME SNIFFING: Stop browser from guessing file types
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // REFERRER PRIVACY: Don't leak full URLs to other sites you link to
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // FORCE HTTPS: Tell browser "Never load this over HTTP again" (HSTS)
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // XSS PROTECTION: Legacy browser support
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            // DNS PREFETCH: Faster loading, safely
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default nextConfig;