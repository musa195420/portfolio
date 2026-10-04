import type { SkillRow, TechnologyRow } from '@/types/database';
import type { Skill, Technology } from '@/types/skill';

export function mapTechnology(
  row: Pick<TechnologyRow, 'id' | 'name' | 'slug' | 'icon_url' | 'category'>,
): Technology {
  return { id: row.id, name: row.name, slug: row.slug, iconUrl: row.icon_url, category: row.category };
}

export function mapSkill(
  row: Pick<SkillRow, 'id' | 'name' | 'category' | 'icon_url' | 'proficiency' | 'featured'>,
): Skill {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    iconUrl: row.icon_url,
    proficiency: row.proficiency,
    featured: row.featured,
  };
}
