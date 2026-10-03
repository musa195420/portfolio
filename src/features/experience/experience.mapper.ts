import type { ExperienceRecord } from '@/repositories/experience.repository';
import type { Experience } from '@/types/experience';

export function mapExperience(row: ExperienceRecord): Experience {
  return {
    id: row.id,
    company: row.company,
    position: row.position,
    location: row.location,
    startDate: row.start_date,
    endDate: row.end_date,
    isCurrent: row.is_current,
    description: row.description,
    highlights: [...(row.experience_highlights ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((highlight) => highlight.description),
  };
}
