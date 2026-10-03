import type { MetadataRoute } from 'next';
import { AppRoutes } from '@/constants/app_routes';
import { getSiteUrl } from '@/lib/env';
import { getAllProjects } from '@/services/project.service';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const { data: projects } = await getAllProjects();
  return [
    { url: `${base}${AppRoutes.home}`, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}${AppRoutes.projects}`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}${AppRoutes.contact}`, changeFrequency: 'yearly', priority: 0.6 },
    ...(projects ?? []).map((project) => ({
      url: `${base}${AppRoutes.project(project.slug)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
