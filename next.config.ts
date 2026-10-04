import type { NextConfig } from 'next';

const requiredEnvironmentVariables = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SECRET_KEY',
] as const;

const missingEnvironmentVariables = requiredEnvironmentVariables.filter((name) => !process.env[name]?.trim());
if (missingEnvironmentVariables.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvironmentVariables.join(', ')}`);
}

const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);
if (supabaseUrl.protocol !== 'https:' && supabaseUrl.protocol !== 'http:') {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL must use http or https.');
}

const supabaseHost = supabaseUrl.hostname;
const isLocalSupabase = supabaseHost === '127.0.0.1' || supabaseHost === 'localhost';
if (!isLocalSupabase && !supabaseHost.endsWith('.supabase.co')) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL must point to a Supabase project.');
}

const supabaseProtocol = supabaseUrl.protocol === 'http:' ? 'http' : 'https';
// A local Supabase stack (`supabase start`) serves storage from 127.0.0.1.

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: {
    // Portfolio media lives in the public `portfolio-assets` Supabase bucket.
    remotePatterns: [
      {
        protocol: supabaseProtocol,
        hostname: supabaseHost,
        port: supabaseUrl.port || undefined,
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
