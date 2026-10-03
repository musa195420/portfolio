/** Application routes and in-page section anchors. */
export const SectionIds = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  skills: 'skills',
  experience: 'experience',
  contact: 'contact',
} as const;

export type SectionId = (typeof SectionIds)[keyof typeof SectionIds];

export const AppRoutes = {
  home: '/',
  projects: '/projects',
  project: (slug: string) => `/projects/${encodeURIComponent(slug)}`,
  contact: '/contact',
  /** Inquiry form, recording which page the visitor came from. */
  inquiry: (from: string) => `/contact?from=${encodeURIComponent(from)}`,
  section: (id: SectionId) => `/#${id}`,
} as const;

export const ApiRoutes = {
  projectInquiries: '/api/project-inquiries',
} as const;
