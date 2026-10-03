/**
 * Hand-maintained Supabase schema types. Mirrors supabase/migrations.
 * Regenerate with `supabase gen types typescript` if the CLI is available.
 */
type Timestamp = string;

type Table<Row, Required extends keyof Row, Relationships extends unknown[] = []> = {
  Row: Row;
  Insert: Pick<Row, Required> & Partial<Omit<Row, Required>>;
  Update: Partial<Row>;
  Relationships: Relationships;
};

export type SiteProfileRow = {
  id: string;
  full_name: string;
  professional_title: string;
  availability_text: string | null;
  hero_heading_line_1: string | null;
  hero_heading_line_2: string | null;
  hero_description: string | null;
  about_heading: string | null;
  about_description: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  years_experience: number | null;
  projects_completed: number | null;
  users_reached: number | null;
  github_url: string | null;
  linkedin_url: string | null;
  resume_url: string | null;
  hero_desktop_image_url: string | null;
  hero_mobile_image_url: string | null;
  about_desktop_image_url: string | null;
  about_mobile_image_url: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  full_description: string | null;
  role: string | null;
  company_or_client: string | null;
  project_type: string | null;
  status: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  logo_url: string | null;
  banner_url: string | null;
  app_store_url: string | null;
  play_store_url: string | null;
  github_url: string | null;
  website_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type ProjectMediaRow = {
  id: string;
  project_id: string;
  media_type: string;
  storage_path: string | null;
  public_url: string;
  alt_text: string | null;
  width: number | null;
  height: number | null;
  sort_order: number;
  created_at: Timestamp;
};

export type TechnologyRow = {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  category: string | null;
  sort_order: number;
  enabled: boolean;
  show_in_strip: boolean;
  created_at: Timestamp;
};

export type ProjectTechnologyRow = {
  project_id: string;
  technology_id: string;
  sort_order: number;
};

export type ProjectHighlightRow = {
  id: string;
  project_id: string;
  heading: string | null;
  description: string;
  sort_order: number;
  created_at: Timestamp;
};

export type SkillRow = {
  id: string;
  name: string;
  category: string | null;
  icon_url: string | null;
  proficiency: number | null;
  featured: boolean;
  sort_order: number;
  created_at: Timestamp;
};

export type ExperienceRow = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  sort_order: number;
  created_at: Timestamp;
};

export type ExperienceHighlightRow = {
  id: string;
  experience_id: string;
  description: string;
  sort_order: number;
};

export type SocialLinkRow = {
  id: string;
  platform: string;
  url: string;
  icon_key: string | null;
  sort_order: number;
  enabled: boolean;
  created_at: Timestamp;
};

export type ServiceFeatureRow = {
  id: string;
  title: string;
  description: string;
  icon_url: string | null;
  sort_order: number;
  enabled: boolean;
};

export type SiteSettingRow = {
  id: string;
  key: string;
  value: string | null;
  json_value: unknown;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type ProjectInquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_title: string | null;
  project_type: string | null;
  budget_range: string | null;
  timeline: string | null;
  idea_summary: string;
  required_services: string[] | null;
  preferred_contact_method: string | null;
  source_page: string | null;
  status: string;
  admin_notes: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

type FK<Name extends string, Column extends string, Ref extends string> = {
  foreignKeyName: Name;
  columns: [Column];
  isOneToOne: false;
  referencedRelation: Ref;
  referencedColumns: ['id'];
};

export type Database = {
  public: {
    Tables: {
      site_profile: Table<SiteProfileRow, 'full_name' | 'professional_title'>;
      projects: Table<ProjectRow, 'slug' | 'name' | 'short_description'>;
      project_media: Table<
        ProjectMediaRow,
        'project_id' | 'media_type' | 'public_url',
        [FK<'project_media_project_id_fkey', 'project_id', 'projects'>]
      >;
      technologies: Table<TechnologyRow, 'name' | 'slug'>;
      project_technologies: Table<
        ProjectTechnologyRow,
        'project_id' | 'technology_id',
        [
          FK<'project_technologies_project_id_fkey', 'project_id', 'projects'>,
          FK<'project_technologies_technology_id_fkey', 'technology_id', 'technologies'>,
        ]
      >;
      project_highlights: Table<
        ProjectHighlightRow,
        'project_id' | 'description',
        [FK<'project_highlights_project_id_fkey', 'project_id', 'projects'>]
      >;
      skills: Table<SkillRow, 'name'>;
      experiences: Table<ExperienceRow, 'company' | 'position'>;
      experience_highlights: Table<
        ExperienceHighlightRow,
        'experience_id' | 'description',
        [FK<'experience_highlights_experience_id_fkey', 'experience_id', 'experiences'>]
      >;
      social_links: Table<SocialLinkRow, 'platform' | 'url'>;
      service_features: Table<ServiceFeatureRow, 'title' | 'description'>;
      site_settings: Table<SiteSettingRow, 'key'>;
      project_inquiries: Table<ProjectInquiryRow, 'name' | 'email' | 'idea_summary'>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
