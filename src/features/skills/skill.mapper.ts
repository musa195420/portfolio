import type { SkillRow, TechnologyRow } from '@/types/database';
import type { Skill, SkillGroup, Technology } from '@/types/skill';

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

/** Groups skills by category, preserving the database sort order. */
export function groupSkills(skills: Skill[], fallbackCategory: string): SkillGroup[] {
  const groups = new Map<string, Skill[]>();
  for (const skill of skills) {
    const category = skill.category ?? fallbackCategory;
    groups.set(category, [...(groups.get(category) ?? []), skill]);
  }
  return Array.from(groups, ([category, items]) => ({ category, skills: items }));
}
