import 'server-only';
import { SupabaseTables } from '@/constants/supabase_tables';
import { getPublicSupabase } from '@/lib/supabase/server';

export async function selectTechnologies(options: { stripOnly?: boolean } = {}) {
  let query = getPublicSupabase()
    .from(SupabaseTables.technologies)
    .select('id, name, slug, icon_url, category')
    .eq('enabled', true)
    .order('sort_order', { ascending: true });
  if (options.stripOnly) query = query.eq('show_in_strip', true);
  return query;
}

export async function selectSkills() {
  return getPublicSupabase()
    .from(SupabaseTables.skills)
    .select('id, name, category, icon_url, proficiency, featured')
    .order('sort_order', { ascending: true });
}
