-- =============================================================================
-- Row Level Security
--
-- Content tables: anyone may READ public content; nobody but the service role
-- (SUPABASE_SECRET_KEY, server-only) or the dashboard may write.
--
-- project_inquiries: anonymous visitors may INSERT a new inquiry, and nothing
-- else — no SELECT, UPDATE or DELETE. Admins read them via the dashboard or
-- the service role.
-- =============================================================================

alter table public.site_profile enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.technologies enable row level security;
alter table public.project_technologies enable row level security;
alter table public.project_highlights enable row level security;
alter table public.skills enable row level security;
alter table public.experiences enable row level security;
alter table public.experience_highlights enable row level security;
alter table public.social_links enable row level security;
alter table public.service_features enable row level security;
alter table public.site_settings enable row level security;
alter table public.project_inquiries enable row level security;

-- Defence in depth: public roles get read-only table privileges on content.
revoke insert, update, delete, truncate on
  public.site_profile, public.projects, public.project_media, public.technologies,
  public.project_technologies, public.project_highlights, public.skills, public.experiences,
  public.experience_highlights, public.social_links, public.service_features, public.site_settings
from anon, authenticated;

grant select on
  public.site_profile, public.projects, public.project_media, public.technologies,
  public.project_technologies, public.project_highlights, public.skills, public.experiences,
  public.experience_highlights, public.social_links, public.service_features, public.site_settings
to anon, authenticated;

-- -----------------------------------------------------------------------------
-- Public read policies
-- -----------------------------------------------------------------------------
drop policy if exists "Public can read profile" on public.site_profile;
create policy "Public can read profile" on public.site_profile
  for select to anon, authenticated using (true);

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects" on public.projects
  for select to anon, authenticated using (published);

drop policy if exists "Public can read media of published projects" on public.project_media;
create policy "Public can read media of published projects" on public.project_media
  for select to anon, authenticated using (
    exists (select 1 from public.projects p where p.id = project_id and p.published)
  );

drop policy if exists "Public can read enabled technologies" on public.technologies;
create policy "Public can read enabled technologies" on public.technologies
  for select to anon, authenticated using (enabled);

drop policy if exists "Public can read technologies of published projects" on public.project_technologies;
create policy "Public can read technologies of published projects" on public.project_technologies
  for select to anon, authenticated using (
    exists (select 1 from public.projects p where p.id = project_id and p.published)
  );

drop policy if exists "Public can read highlights of published projects" on public.project_highlights;
create policy "Public can read highlights of published projects" on public.project_highlights
  for select to anon, authenticated using (
    exists (select 1 from public.projects p where p.id = project_id and p.published)
  );

drop policy if exists "Public can read skills" on public.skills;
create policy "Public can read skills" on public.skills
  for select to anon, authenticated using (true);

drop policy if exists "Public can read experiences" on public.experiences;
create policy "Public can read experiences" on public.experiences
  for select to anon, authenticated using (true);

drop policy if exists "Public can read experience highlights" on public.experience_highlights;
create policy "Public can read experience highlights" on public.experience_highlights
  for select to anon, authenticated using (true);

drop policy if exists "Public can read enabled social links" on public.social_links;
create policy "Public can read enabled social links" on public.social_links
  for select to anon, authenticated using (enabled);

drop policy if exists "Public can read enabled service features" on public.service_features;
create policy "Public can read enabled service features" on public.service_features
  for select to anon, authenticated using (enabled);

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings" on public.site_settings
  for select to anon, authenticated using (true);

-- -----------------------------------------------------------------------------
-- project_inquiries: insert-only for the public
-- -----------------------------------------------------------------------------
revoke all on public.project_inquiries from anon, authenticated;
grant insert on public.project_inquiries to anon, authenticated;

drop policy if exists "Public can submit new inquiries" on public.project_inquiries;
create policy "Public can submit new inquiries" on public.project_inquiries
  for insert to anon, authenticated
  with check (status = 'new' and admin_notes is null);

-- No SELECT / UPDATE / DELETE policies exist for anon or authenticated, so
-- those operations are denied by RLS (and by the revoked privileges above).
