import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getPublicEnv } from '@/lib/env';
import { getServerEnv } from '@/lib/env.server';
import type { Database } from '@/types/database';

let adminClient: SupabaseClient<Database> | null = null;

/**
 * Privileged client using SUPABASE_SECRET_KEY. Bypasses RLS — use only in
 * server code for operations anonymous visitors must not perform directly
 * (e.g. counting recent inquiries for rate limiting).
 */
export function getAdminSupabase(): SupabaseClient<Database> {
  if (adminClient) return adminClient;
  const { NEXT_PUBLIC_SUPABASE_URL } = getPublicEnv();
  const { SUPABASE_SECRET_KEY } = getServerEnv();
  adminClient = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });
  return adminClient;
}
