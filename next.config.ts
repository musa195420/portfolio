import type { NextConfig } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL) : null;
const supabaseHost = supabaseUrl?.hostname ?? '*.supabase.co';
const supabaseProtocol = supabaseUrl?.protocol === 'http:' ? 'http' : 'https';
// A local Supabase stack (`supabase start`) serves storage from 127.0.0.1.
const isLocalSupabase = supabaseHost === '127.0.0.1' || supabaseHost === 'localhost';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: {
    // Portfolio media lives in the public `portfolio-assets` Supabase bucket.
    remotePatterns: [
      {
        protocol: supabaseProtocol,
        hostname: supabaseHost,
        port: supabaseUrl?.port || undefined,
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    dangerouslyAllowLocalIP: isLocalSupabase,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
