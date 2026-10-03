import 'server-only';
import { SupabaseTables } from '@/constants/supabase_tables';
import { getAdminSupabase } from '@/lib/supabase/admin';
import { getAnonWriteSupabase } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

export type InquiryInsert = Database['public']['Tables']['project_inquiries']['Insert'];

/**
 * Inserts with the publishable key so the RLS insert policy is enforced.
 * No `.select()` — anonymous clients are not allowed to read inquiries back.
 */
export async function insertInquiry(row: InquiryInsert) {
  return getAnonWriteSupabase().from(SupabaseTables.projectInquiries).insert(row);
}

/**
 * Counts recent inquiries by (lower-cased) email or IP hash. Requires the
 * service role. Values are quoted so PostgREST treats them as literals.
 */
export async function countRecentInquiries(params: { email: string; ipHash: string | null; since: Date }) {
  const quote = (value: string) => `"${value.replace(/["\\]/g, '')}"`;
  const filters = [`email.eq.${quote(params.email)}`];
  if (params.ipHash) filters.push(`ip_hash.eq.${quote(params.ipHash)}`);
  return getAdminSupabase()
    .from(SupabaseTables.projectInquiries)
    .select('id', { count: 'exact', head: true })
    .gte('created_at', params.since.toISOString())
    .or(filters.join(','));
}
