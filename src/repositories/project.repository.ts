import 'server-only';
import { SupabaseTables } from '@/constants/supabase_tables';
import { getPublicSupabase } from '@/lib/supabase/server';

const T = SupabaseTables;

const TECHNOLOGY_EMBED = `${T.projectTechnologies}(sort_order, ${T.technologies}(id, name, slug, icon_url, category, enabled))` as const;

const SUMMARY_COLUMNS = `id, slug, name, short_description, project_type, status, featured, logo_url, banner_url, sort_order, ${TECHNOLOGY_EMBED}` as const;

const DETAIL_COLUMNS = `*, ${TECHNOLOGY_EMBED}, ${T.projectMedia}(id, media_type, public_url, alt_text, width, height, sort_order), ${T.projectHighlights}(id, heading, description, sort_order)` as const;

export async function selectProjectSummaries(options: { featuredOnly?: boolean; limit?: number } = {}) {
  let query = getPublicSupabase()
    .from(SupabaseTables.projects)
    .select(SUMMARY_COLUMNS)
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });
  if (options.featuredOnly) query = query.eq('featured', true);
  if (options.limit) query = query.limit(options.limit);
  return query;
}

export async function selectProjectBySlug(slug: string) {
  return getPublicSupabase()
    .from(SupabaseTables.projects)
    .select(DETAIL_COLUMNS)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
}

export type ProjectSummaryRecord = NonNullable<
  Awaited<ReturnType<typeof selectProjectSummaries>>['data']
>[number];

export type ProjectDetailRecord = NonNullable<Awaited<ReturnType<typeof selectProjectBySlug>>['data']>;
