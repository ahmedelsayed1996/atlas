// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: false,
//   onDemandEntries: {
//     maxInactiveAge: 60 * 1000,
//     pagesBufferLength: 5,
//   },
//    images: {
//     domains: ['api.eduxa.com', 'api-stg.eduxa.com'],
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '3000',
//         pathname: '/api/v1/upload/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'api.eduxa.com',
//         pathname: '/upload/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'api-stg.eduxa.com',
//         pathname: '/api/v1/upload/*',
//       }
//     ],
//   },
// };

// export default withNextIntl(nextConfig);

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
   eslint: {
    ignoreDuringBuilds: true, // this resolve
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // 🔐 Allow embedding for agency integration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *"
          },
          // Remove X-Frame-Options to allow CSP to handle it
          {
            key: 'X-Frame-Options',
            value: ''
          }
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/v1/upload/**",
      },
      {
        protocol: "https",
        hostname: "api.eduxa.com",
        pathname: "/upload/**",
      },
      {
        protocol: "https",
        hostname: "api-stg.eduxa.com",
        pathname: "/upload/**",
      },
      {
        protocol: "https",
        hostname: "api-stg.eduxa.com",
        pathname: "//root/backend/upload/institutes_branches/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
