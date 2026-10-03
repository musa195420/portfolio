import 'server-only';
import { cache } from 'react';
import { AppConfig } from '@/constants/app_constants';
import { mapProjectDetail, mapProjectSummary } from '@/features/projects/project.mapper';
import { selectProjectBySlug, selectProjectSummaries } from '@/repositories/project.repository';
import type { ProjectNeighbours, ProjectSummary } from '@/types/project';
import { runQuery } from './service-result';

export const getAllProjects = cache(() =>
  runQuery('projects', () => selectProjectSummaries(), (rows) => (rows ?? []).map(mapProjectSummary)),
);

export const getFeaturedProjects = cache(() =>
  runQuery(
    'featured projects',
    () => selectProjectSummaries({ featuredOnly: true, limit: AppConfig.featuredProjectsLimit }),
    (rows) => (rows ?? []).map(mapProjectSummary),
  ),
);

export const getProjectBySlug = cache((slug: string) =>
  runQuery(`project ${slug}`, () => selectProjectBySlug(slug), (row) => (row ? mapProjectDetail(row) : null)),
);

/** Previous/next projects in display order, wrapping around the ends. */
export function findNeighbours(projects: ProjectSummary[], slug: string): ProjectNeighbours {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return { previous: null, next: null };
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

/** Projects sharing the most technologies with the current one. */
export function findRelated(projects: ProjectSummary[], current: ProjectSummary): ProjectSummary[] {
  const currentTech = new Set(current.technologies.map((tech) => tech.slug));
  return projects
    .filter((project) => project.slug !== current.slug)
    .map((project, order) => ({
      project,
      order,
      score: project.technologies.filter((tech) => currentTech.has(tech.slug)).length,
    }))
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, AppConfig.relatedProjectsLimit)
    .map(({ project }) => project);
}
