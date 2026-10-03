/** Supabase table names. Keep in sync with supabase/migrations. */
export const SupabaseTables = {
  siteProfile: 'site_profile',
  projects: 'projects',
  projectMedia: 'project_media',
  technologies: 'technologies',
  projectTechnologies: 'project_technologies',
  projectHighlights: 'project_highlights',
  skills: 'skills',
  experiences: 'experiences',
  experienceHighlights: 'experience_highlights',
  socialLinks: 'social_links',
  serviceFeatures: 'service_features',
  siteSettings: 'site_settings',
  projectInquiries: 'project_inquiries',
} as const;

/** Allowed values for project_media.media_type. */
export const ProjectMediaTypes = {
  banner: 'banner',
  screenshot: 'screenshot',
} as const;

/** Keys used in the site_settings table. */
export const SiteSettingKeys = {
  footerTagline: 'footer_tagline',
  technologiesTagline: 'technologies_tagline',
  heroHighlights: 'hero_highlights',
  heroPlatformTechnologies: 'hero_platform_technologies',
} as const;
