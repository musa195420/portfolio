import { normalizeStoragePublicUrl } from '@/constants/asset_links';
import { SiteSettingKeys } from '@/constants/supabase_tables';
import type {
  ServiceFeatureRow,
  SiteProfileRow,
  SiteSettingRow,
  SocialLinkRow,
} from '@/types/database';
import type { Profile, ServiceFeature, SiteSettings, SocialLink } from '@/types/profile';

export function mapProfile(row: SiteProfileRow): Profile {
  return {
    fullName: row.full_name,
    professionalTitle: row.professional_title,
    availabilityText: row.availability_text,
    heroHeadingLine1: row.hero_heading_line_1,
    heroHeadingLine2: row.hero_heading_line_2,
    heroDescription: row.hero_description,
    aboutHeading: row.about_heading,
    aboutDescription: row.about_description,
    email: row.email,
    phone: row.phone,
    location: row.location,
    yearsExperience: row.years_experience,
    projectsCompleted: row.projects_completed,
    usersReached: row.users_reached,
    githubUrl: row.github_url,
    linkedinUrl: row.linkedin_url,
    resumeUrl: normalizeStoragePublicUrl(row.resume_url),
    heroDesktopImageUrl: normalizeStoragePublicUrl(row.hero_desktop_image_url),
    heroMobileImageUrl: normalizeStoragePublicUrl(row.hero_mobile_image_url),
    aboutDesktopImageUrl: normalizeStoragePublicUrl(row.about_desktop_image_url),
    aboutMobileImageUrl: normalizeStoragePublicUrl(row.about_mobile_image_url),
  };
}

export function mapServiceFeature(
  row: Pick<ServiceFeatureRow, 'id' | 'title' | 'description' | 'icon_url'>,
): ServiceFeature {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    iconUrl: normalizeStoragePublicUrl(row.icon_url),
  };
}

export function mapSocialLink(row: Pick<SocialLinkRow, 'id' | 'platform' | 'url' | 'icon_key'>): SocialLink {
  return { id: row.id, platform: row.platform, url: row.url, iconKey: row.icon_key };
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

export function mapSiteSettings(rows: Array<Pick<SiteSettingRow, 'key' | 'value' | 'json_value'>>): SiteSettings {
  const byKey = new Map(rows.map((row) => [row.key, row]));
  return {
    footerTagline: byKey.get(SiteSettingKeys.footerTagline)?.value ?? null,
    technologiesTagline: toStringArray(byKey.get(SiteSettingKeys.technologiesTagline)?.json_value),
    heroHighlights: toStringArray(byKey.get(SiteSettingKeys.heroHighlights)?.json_value),
    heroPlatformTechnologies: toStringArray(byKey.get(SiteSettingKeys.heroPlatformTechnologies)?.json_value),
  };
}

export const emptySiteSettings: SiteSettings = {
  footerTagline: null,
  technologiesTagline: [],
  heroHighlights: [],
  heroPlatformTechnologies: [],
};
