import 'server-only';
import { SupabaseTables } from '@/constants/supabase_tables';
import { getPublicSupabase } from '@/lib/supabase/server';

const EXPERIENCE_COLUMNS =
  `id, company, position, location, start_date, end_date, is_current, description, sort_order, ${SupabaseTables.experienceHighlights}(description, sort_order)` as const;

export async function selectExperiences() {
  return getPublicSupabase()
    .from(SupabaseTables.experiences)
    .select(EXPERIENCE_COLUMNS)
    .order('sort_order', { ascending: true });
}

export type ExperienceRecord = NonNullable<Awaited<ReturnType<typeof selectExperiences>>['data']>[number];
