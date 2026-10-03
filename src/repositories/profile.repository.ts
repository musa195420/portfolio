import 'server-only';
import { SupabaseTables } from '@/constants/supabase_tables';
import { getPublicSupabase } from '@/lib/supabase/server';

export async function selectSiteProfile() {
  return getPublicSupabase()
    .from(SupabaseTables.siteProfile)
    .select('*')
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();
}

export async function selectServiceFeatures() {
  return getPublicSupabase()
    .from(SupabaseTables.serviceFeatures)
    .select('id, title, description, icon_url')
    .eq('enabled', true)
    .order('sort_order', { ascending: true });
}

export async function selectSiteSettings() {
  return getPublicSupabase().from(SupabaseTables.siteSettings).select('key, value, json_value');
}

export async function selectSocialLinks() {
  return getPublicSupabase()
    .from(SupabaseTables.socialLinks)
    .select('id, platform, url, icon_key')
    .eq('enabled', true)
    .order('sort_order', { ascending: true });
}
