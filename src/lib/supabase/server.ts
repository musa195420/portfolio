import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AppConfig } from '@/constants/app_constants';
import { getPublicEnv } from '@/lib/env';
import type { Database } from '@/types/database';

export type PublicSupabaseClient = SupabaseClient<Database>;

let publicClient: PublicSupabaseClient | null = null;

/**
 * Server-side client for public portfolio reads. Uses the publishable key, so
 * Row Level Security applies exactly as it would for an anonymous visitor.
 * Requests go through Next's data cache (ISR) and share a revalidation tag.
 */
export function getPublicSupabase(): PublicSupabaseClient {
  if (publicClient) return publicClient;
  const env = getPublicEnv();
  publicClient = createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          next: { revalidate: AppConfig.revalidateSeconds, tags: [AppConfig.contentCacheTag] },
        }),
    },
  });
  return publicClient;
}

/**
 * Uncached client with the publishable key, for anonymous writes that must
 * respect RLS (e.g. inserting a project inquiry).
 */
export function getAnonWriteSupabase(): PublicSupabaseClient {
  const env = getPublicEnv();
  return createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });
}
