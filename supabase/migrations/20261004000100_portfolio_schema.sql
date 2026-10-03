-- =============================================================================
-- Portfolio schema: content tables, relations, constraints and indexes.
-- All portfolio content is read from these tables at runtime.
-- =============================================================================

-- gen_random_uuid() is built into Postgres 13+, so no extension is required.

-- Keeps updated_at current on every UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- site_profile — hero + about content (single row)
-- -----------------------------------------------------------------------------
create table if not exists public.site_profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  professional_title text not null,
  availability_text text,
  hero_heading_line_1 text,
  hero_heading_line_2 text,
  hero_description text,
  about_heading text,
  about_description text,
  email text,
  phone text,
  location text,
  years_experience integer check (years_experience is null or years_experience >= 0),
  projects_completed integer check (projects_completed is null or projects_completed >= 0),
  users_reached integer check (users_reached is null or users_reached >= 0),
  github_url text,
  linkedin_url text,
  resume_url text,
  hero_desktop_image_url text,
  hero_mobile_image_url text,
  about_desktop_image_url text,
  about_mobile_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enforce a single profile row.
create unique index if not exists site_profile_singleton_idx on public.site_profile ((true));

-- -----------------------------------------------------------------------------
-- projects
-- -----------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  short_description text not null,
  full_description text,
  role text,
  company_or_client text,
  project_type text,
  status text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  logo_url text,
  banner_url text,
  app_store_url text,
  play_store_url text,
  github_url text,
  website_url text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_listing_idx on public.projects (published, sort_order);
create index if not exists projects_featured_idx on public.projects (featured, sort_order) where published;

-- -----------------------------------------------------------------------------
-- project_media — banner + screenshots per project
-- -----------------------------------------------------------------------------
create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  media_type text not null default 'screenshot' check (media_type in ('banner', 'screenshot')),
  storage_path text,
  public_url text not null,
  alt_text text,
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint project_media_project_url_key unique (project_id, public_url)
);

create index if not exists project_media_project_idx on public.project_media (project_id, sort_order);

-- -----------------------------------------------------------------------------
-- technologies + project_technologies
-- -----------------------------------------------------------------------------
create table if not exists public.technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  icon_url text,
  category text,
  sort_order integer not null default 0,
  enabled boolean not null default true,
  -- Shown in the "My Core Skills & Technologies" strip on the homepage.
  show_in_strip boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists technologies_strip_idx on public.technologies (sort_order) where enabled and show_in_strip;

create table if not exists public.project_technologies (
  project_id uuid not null references public.projects (id) on delete cascade,
  technology_id uuid not null references public.technologies (id) on delete cascade,
  sort_order integer not null default 0,
  primary key (project_id, technology_id)
);

create index if not exists project_technologies_technology_idx on public.project_technologies (technology_id);

-- -----------------------------------------------------------------------------
-- project_highlights — feature bullets on the project detail page
-- -----------------------------------------------------------------------------
create table if not exists public.project_highlights (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  heading text,
  description text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint project_highlights_project_order_key unique (project_id, sort_order)
);

-- -----------------------------------------------------------------------------
-- skills
-- -----------------------------------------------------------------------------
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text,
  icon_url text,
  proficiency integer check (proficiency is null or proficiency between 0 and 100),
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists skills_order_idx on public.skills (sort_order);

-- -----------------------------------------------------------------------------
-- experiences + experience_highlights
-- -----------------------------------------------------------------------------
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  position text not null,
  location text,
  start_date date,
  end_date date,
  is_current boolean not null default false,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint experiences_company_position_key unique (company, position),
  constraint experiences_dates_check check (end_date is null or start_date is null or end_date >= start_date)
);

create index if not exists experiences_order_idx on public.experiences (sort_order);

create table if not exists public.experience_highlights (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences (id) on delete cascade,
  description text not null,
  sort_order integer not null default 0,
  constraint experience_highlights_order_key unique (experience_id, sort_order)
);

-- -----------------------------------------------------------------------------
-- social_links
-- -----------------------------------------------------------------------------
create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null unique,
  url text not null,
  icon_key text,
  sort_order integer not null default 0,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- service_features — four quality cards in the About section
-- -----------------------------------------------------------------------------
create table if not exists public.service_features (
  id uuid primary key default gen_random_uuid(),
  title text not null unique,
  description text not null,
  icon_url text,
  sort_order integer not null default 0,
  enabled boolean not null default true
);

-- -----------------------------------------------------------------------------
-- site_settings — configurable non-relational settings
-- -----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text,
  json_value jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- project_inquiries — "Tell Me Your Idea" submissions (private)
-- -----------------------------------------------------------------------------
create table if not exists public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 120),
  email text not null check (
    char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  ),
  phone text check (phone is null or char_length(phone) <= 40),
  company text check (company is null or char_length(company) <= 160),
  project_title text check (project_title is null or char_length(project_title) <= 160),
  project_type text check (project_type is null or char_length(project_type) <= 80),
  budget_range text check (budget_range is null or char_length(budget_range) <= 80),
  timeline text check (timeline is null or char_length(timeline) <= 80),
  idea_summary text not null check (char_length(idea_summary) between 20 and 4000),
  required_services text[] check (required_services is null or cardinality(required_services) <= 12),
  preferred_contact_method text check (
    preferred_contact_method is null or char_length(preferred_contact_method) <= 40
  ),
  source_page text check (source_page is null or char_length(source_page) <= 300),
  status text not null default 'new' check (
    status in ('new', 'contacted', 'qualified', 'in_progress', 'won', 'lost', 'spam')
  ),
  admin_notes text,
  -- SHA-256 of the submitter IP (never the raw IP), used for rate limiting.
  ip_hash text check (ip_hash is null or char_length(ip_hash) = 64),
  user_agent text check (user_agent is null or char_length(user_agent) <= 400),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists project_inquiries_created_idx on public.project_inquiries (created_at desc);
create index if not exists project_inquiries_status_idx on public.project_inquiries (status, created_at desc);
create index if not exists project_inquiries_email_idx on public.project_inquiries (lower(email), created_at desc);
create index if not exists project_inquiries_ip_idx on public.project_inquiries (ip_hash, created_at desc)
  where ip_hash is not null;

-- -----------------------------------------------------------------------------
-- updated_at triggers
-- -----------------------------------------------------------------------------
drop trigger if exists set_site_profile_updated_at on public.site_profile;
create trigger set_site_profile_updated_at before update on public.site_profile
  for each row execute function public.set_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

drop trigger if exists set_project_inquiries_updated_at on public.project_inquiries;
create trigger set_project_inquiries_updated_at before update on public.project_inquiries
  for each row execute function public.set_updated_at();
