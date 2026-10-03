import type { ProjectDetailRecord, ProjectSummaryRecord } from '@/repositories/project.repository';
import { mapTechnology } from '@/features/skills/skill.mapper';
import type { ProjectDetail, ProjectSummary } from '@/types/project';
import type { Technology } from '@/types/skill';

const bySortOrder = (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order;

function mapProjectTechnologies(links: ProjectSummaryRecord['project_technologies']): Technology[] {
  return [...(links ?? [])]
    .sort(bySortOrder)
    .flatMap((link) => (link.technologies && link.technologies.enabled ? [mapTechnology(link.technologies)] : []));
}

export function mapProjectSummary(row: ProjectSummaryRecord): ProjectSummary {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    projectType: row.project_type,
    status: row.status,
    featured: row.featured,
    logoUrl: row.logo_url,
    bannerUrl: row.banner_url,
    technologies: mapProjectTechnologies(row.project_technologies),
  };
}

export function mapProjectDetail(row: ProjectDetailRecord): ProjectDetail {
  return {
    ...mapProjectSummary(row),
    fullDescription: row.full_description,
    role: row.role,
    companyOrClient: row.company_or_client,
    appStoreUrl: row.app_store_url,
    playStoreUrl: row.play_store_url,
    githubUrl: row.github_url,
    websiteUrl: row.website_url,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    updatedAt: row.updated_at,
    media: [...(row.project_media ?? [])].sort(bySortOrder).map((media) => ({
      id: media.id,
      mediaType: media.media_type,
      url: media.public_url,
      alt: media.alt_text ?? row.name,
      width: media.width,
      height: media.height,
    })),
    highlights: [...(row.project_highlights ?? [])].sort(bySortOrder).map((highlight) => ({
      id: highlight.id,
      heading: highlight.heading,
      description: highlight.description,
    })),
  };
}
