import type { Technology } from './skill';

export type ProjectMedia = {
  id: string;
  mediaType: string;
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
};

export type ProjectHighlight = {
  id: string;
  heading: string | null;
  description: string;
};

/** Lightweight shape used by cards, navigation and listings. */
export type ProjectSummary = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  projectType: string | null;
  status: string | null;
  featured: boolean;
  logoUrl: string | null;
  bannerUrl: string | null;
  technologies: Technology[];
};

export type ProjectDetail = ProjectSummary & {
  fullDescription: string | null;
  role: string | null;
  companyOrClient: string | null;
  appStoreUrl: string | null;
  playStoreUrl: string | null;
  githubUrl: string | null;
  websiteUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  media: ProjectMedia[];
  highlights: ProjectHighlight[];
  updatedAt: string;
};

export type ProjectNeighbours = {
  previous: ProjectSummary | null;
  next: ProjectSummary | null;
};
