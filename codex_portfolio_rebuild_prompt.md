# Codex Prompt — Rebuild Muhammad Musa Portfolio in Next.js + Supabase

You are rebuilding my portfolio website **from scratch** in **Next.js**. The attached portfolio reference image is the visual target. I want the final website to match the reference design as closely as practical in layout, spacing, proportions, typography hierarchy, rounded cards, cream/orange/brown palette, project grid, hero composition, technology strip, about section, and CTA section.

Do **not** redesign the concept into something else. Do **not** simplify the page into a generic developer portfolio. Recreate the same visual structure and quality from the supplied reference image, while keeping the implementation clean, responsive, accessible, maintainable, and data-driven.

---

## Non-Negotiable Requirements

1. Build the site in **Next.js App Router + TypeScript**.
2. Use **Tailwind CSS** for styling.
3. Use **Supabase** for all editable content and media references.
4. Do **not** hardcode portfolio data inside page/components.
5. Do **not** store portfolio content in JSON files, localStorage, static arrays, or component-level constants.
6. Do **not** keep project/media content in the local `public/` directory when it already exists in Supabase Storage.
7. Use the existing uploaded Supabase Storage bucket:
   - `portfolio-assets`
8. Use the generated asset URL manifest if available:
   - `portfolio-assets-urls.json`
9. Use **clean architecture / feature-based architecture**.
10. Put all static UI strings in a central `AppStrings` file.
11. Put all route names, Supabase table names, storage bucket names, reusable values, and non-copy constants in dedicated constants files.
12. Put all Supabase asset URL keys / asset mapping helpers in dedicated asset constants/helper files.
13. No raw strings repeated throughout components.
14. No Supabase secret key in client components.
15. Use `NEXT_SUPABASE_URL` and `NEXT_SUPABASE_ANON_KEY` on the client only where needed.
16. Use `SUPABASE_SECRET_KEY` server-side only.
17. Every project must have its own project detail page.
18. Add a service/contact form where visitors can submit their project idea.
19. Store submitted leads/project ideas in Supabase.
20. The site must be fully responsive for desktop, tablet, and mobile.
21. Use optimized images, loading states, skeletons/shimmers, error states, and empty states.
22. The final UI should feel polished and production-ready.

---

# Environment Variables

Use the existing environment variables:

```env
NEXT_SUPABASE_URL=
NEXT_SUPABASE_ANON_KEY=
SUPABASE_SECRET_KEY=
```

Never expose `SUPABASE_SECRET_KEY` in browser code.

---

# Existing Supabase Storage Structure

The images have already been uploaded to Supabase Storage inside the public bucket:

```text
portfolio-assets/
├── decorations/
├── icons/
├── lincsell/
├── my-images/
├── petadoptionapp/
├── plate_spot/
├── project-logos/
├── qmusic/
├── saasypos/
└── shama/
```

The local source structure was:

```text
portfolio/
├── decorations/
│   ├── about-passionate-note.png
│   ├── hero-build-card.png
│   ├── hero-note-clean-code.png
│   └── hero-note-ideas.png
├── icons/
│   ├── ai-ml.png
│   ├── android.png
│   ├── app-store.png
│   ├── apple.png
│   ├── brand-logo.png
│   ├── cicd.png
│   ├── clean-architecture.png
│   ├── dart.png
│   ├── firebase.png
│   ├── flutter.png
│   ├── performance.png
│   └── production-ready.png
├── my-images/
│   ├── backgrounds/
│   │   └── contact-cta.webp
│   ├── cv/
│   │   └── Muhammad Musa Mobile App Developer.pdf
│   └── portrait/
│       ├── about-desktop.png
│       ├── about-mobile.png
│       ├── hero-desktop.png
│       └── hero-mobile.png
├── project-logos/
│   ├── lincsell-logo.png
│   ├── petadopt-logo.png
│   ├── plate-spot-logo.png
│   ├── qmusic-logo.png
│   ├── saasypos-logo.png
│   └── shama-logo.png
├── lincsell/
├── petadoptionapp/
├── plate_spot/
├── qmusic/
├── saasypos/
└── shama/
```

Do not create duplicate local images. Use Supabase Storage URLs.

---

# Required Architecture

Use a clean, scalable structure similar to:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── api/
│       └── project-inquiries/
│           └── route.ts
├── components/
│   ├── common/
│   ├── layout/
│   ├── hero/
│   ├── projects/
│   ├── skills/
│   ├── about/
│   ├── experience/
│   ├── contact/
│   └── ui/
├── features/
│   ├── profile/
│   ├── projects/
│   ├── skills/
│   ├── experience/
│   ├── contact/
│   └── inquiries/
├── services/
│   ├── profile.service.ts
│   ├── project.service.ts
│   ├── skill.service.ts
│   ├── experience.service.ts
│   ├── social.service.ts
│   └── inquiry.service.ts
├── repositories/
│   ├── profile.repository.ts
│   ├── project.repository.ts
│   └── inquiry.repository.ts
├── lib/
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── admin.ts
├── constants/
│   ├── app_strings.ts
│   ├── app_routes.ts
│   ├── app_constants.ts
│   ├── supabase_tables.ts
│   ├── storage_constants.ts
│   └── asset_links.ts
├── types/
│   ├── database.ts
│   ├── profile.ts
│   ├── project.ts
│   ├── skill.ts
│   ├── experience.ts
│   └── inquiry.ts
├── utils/
├── hooks/
└── styles/
```

You may improve the structure, but keep the separation of concerns clear.

---

# AppStrings Rule

Create:

```text
src/constants/app_strings.ts
```

All fixed UI copy should be centralized there, such as:

- navigation labels
- section headings
- button labels
- form labels
- validation messages
- empty state messages
- loading messages
- CTA copy
- footer labels

Example:

```ts
export const AppStrings = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience',
    contact: 'Contact',
  },
  hero: {
    viewProjects: 'View Projects',
    contactMe: 'Contact Me',
  },
} as const;
```

Do not place repeated string literals across components.

---

# Asset Constants Rule

Create:

```text
src/constants/asset_links.ts
```

Use this only for stable asset keys/paths or mapping helpers, not for project data.

Examples:

```ts
export const AssetFolders = {
  decorations: 'decorations',
  icons: 'icons',
  projectLogos: 'project-logos',
  portraits: 'my-images/portrait',
  backgrounds: 'my-images/backgrounds',
} as const;
```

If the generated `portfolio-assets-urls.json` is used during development or seeding, it must not become the permanent runtime source of portfolio content. Runtime content should come from Supabase tables.

---

# Supabase Database Design

Create SQL migrations for the following tables.

## 1. `site_profile`

Purpose: hero and about section content.

Fields:

```text
id uuid primary key
full_name text not null
professional_title text not null
availability_text text
hero_heading_line_1 text
hero_heading_line_2 text
hero_description text
about_heading text
about_description text
email text
phone text nullable
location text nullable
years_experience integer
projects_completed integer
users_reached integer
github_url text nullable
linkedin_url text nullable
resume_url text nullable
hero_desktop_image_url text nullable
hero_mobile_image_url text nullable
about_desktop_image_url text nullable
about_mobile_image_url text nullable
created_at timestamptz
updated_at timestamptz
```

---

## 2. `projects`

```text
id uuid primary key
slug text unique not null
name text not null
short_description text not null
full_description text
role text
company_or_client text nullable
project_type text nullable
status text
featured boolean default false
sort_order integer default 0
logo_url text nullable
banner_url text nullable
app_store_url text nullable
play_store_url text nullable
github_url text nullable
website_url text nullable
created_at timestamptz
updated_at timestamptz
```

---

## 3. `project_media`

```text
id uuid primary key
project_id uuid references projects(id) on delete cascade
media_type text
storage_path text
public_url text not null
alt_text text
sort_order integer default 0
created_at timestamptz
```

Use this for banner + screenshots.

---

## 4. `technologies`

```text
id uuid primary key
name text not null
slug text unique not null
icon_url text nullable
category text nullable
sort_order integer default 0
enabled boolean default true
created_at timestamptz
```

Seed items such as:

- Flutter
- Dart
- Firebase
- REST APIs
- iOS & Android
- AI/ML
- CI/CD
- Node.js
- Express.js
- Java
- Hive
- Rive
- Flame
- Bluetooth
- Offline Sync
- POS
- Redis
- Maps / Location

---

## 5. `project_technologies`

```text
project_id uuid references projects(id) on delete cascade
technology_id uuid references technologies(id) on delete cascade
primary key (project_id, technology_id)
```

---

## 6. `project_highlights`

Store individual project detail bullets instead of embedding a giant hardcoded block.

```text
id uuid primary key
project_id uuid references projects(id) on delete cascade
heading text nullable
description text not null
sort_order integer default 0
created_at timestamptz
```

---

## 7. `skills`

```text
id uuid primary key
name text not null
category text
icon_url text nullable
proficiency integer nullable
featured boolean default false
sort_order integer default 0
created_at timestamptz
```

---

## 8. `experiences`

```text
id uuid primary key
company text not null
position text not null
location text nullable
start_date date nullable
end_date date nullable
is_current boolean default false
description text
sort_order integer default 0
created_at timestamptz
```

---

## 9. `experience_highlights`

```text
id uuid primary key
experience_id uuid references experiences(id) on delete cascade
description text not null
sort_order integer default 0
```

---

## 10. `social_links`

```text
id uuid primary key
platform text not null
url text not null
icon_key text nullable
sort_order integer default 0
enabled boolean default true
created_at timestamptz
```

---

## 11. `service_features`

Use this for the four cards in the About section:

- Clean Architecture
- App Store Deployment
- Performance Focus
- Production Ready

```text
id uuid primary key
title text not null
description text not null
icon_url text nullable
sort_order integer default 0
enabled boolean default true
```

---

## 12. `site_settings`

```text
id uuid primary key
key text unique not null
value text nullable
json_value jsonb nullable
created_at timestamptz
updated_at timestamptz
```

Use for configurable non-relational site settings.

---

## 13. `project_inquiries`

This table stores project ideas submitted by prospective customers.

```text
id uuid primary key default gen_random_uuid()
name text not null
email text not null
phone text nullable
company text nullable
project_title text nullable
project_type text nullable
budget_range text nullable
timeline text nullable
idea_summary text not null
required_services text[] nullable
preferred_contact_method text nullable
source_page text nullable
status text default 'new'
admin_notes text nullable
created_at timestamptz default now()
updated_at timestamptz default now()
```

Recommended statuses:

```text
new
contacted
qualified
in_progress
won
lost
spam
```

Add appropriate indexes.

Implement Row Level Security so anonymous visitors can insert an inquiry but cannot read all inquiries.

Do not allow public clients to update/delete inquiries.

---

# Project Inquiry / "Tell Me Your Idea" Section

The CTA area should not only have Contact Me and Download CV.

Add a strong CTA such as:

- "Have a Project in Mind?"
- "Tell Me Your Idea"

Create a polished form/modal/page for users to submit:

- Name
- Email
- Phone (optional)
- Company (optional)
- Project title
- Project type
- Budget range
- Timeline
- Project idea / description
- Required services
- Preferred contact method

Use validation with Zod.

Submit through a server-side route or server action.

Never trust client-side validation alone.

Show:

- loading state
- success state
- validation errors
- server error state

Do not expose the secret key.

---

# Homepage Layout — Match the Reference Image

The reference screenshot is the main visual specification.

The desktop homepage should be composed in this order:

1. Header / Navbar
2. Hero
3. Hero stats
4. Core skills & technologies strip
5. Featured projects
6. About section
7. Four service/quality cards
8. Large contact CTA
9. Footer

---

# Header

Recreate the reference header closely.

Left:
- brand icon/logo
- Muhammad Musa
- Mobile Application Developer

Center/right navigation:
- Home
- About
- Projects
- Skills
- Experience
- Contact

Right CTA:
- Download CV

Requirements:
- responsive
- sticky or elegantly fixed when appropriate
- active section state
- smooth scroll
- mobile menu
- accessible focus states

---

# Hero Section

Match the reference composition closely.

Left column:

- availability badge
- very large headline:
  - `Mobile Application`
  - `Developer`
- `Developer` uses the burnt orange/brown accent
- description underneath
- CTA buttons:
  - View Projects
  - Contact Me
- stat cards:
  - 5+ Years Experience
  - 20+ Projects Completed
  - 5K+ Users Reached

All numbers and text values come from Supabase.

Right column:

- large profile portrait from Supabase
- decorative note image: `hero-note-ideas.png`
- decorative note image: `hero-note-clean-code.png`
- decorative card: `hero-build-card.png`
- floating technology/platform card with Apple, Android, Flutter

Recreate the soft abstract cream/orange background shapes with CSS where possible.

Do not create giant background PNGs if CSS can reproduce the effect more efficiently.

---

# Core Skills & Technologies Strip

Recreate the large rounded strip shown immediately below the hero.

Left:
- `My Core`
- `Skills & Technologies`

Middle:
- cards loaded from Supabase technologies table

Use icons already uploaded:
- Flutter
- Dart
- Firebase
- REST API
- Apple / Android
- AI/ML
- CI/CD

Right:
- small descriptive text similar to the reference

The full strip should use:
- warm white background
- subtle border
- subtle shadow
- rounded corners

---

# Featured Projects Section

Section eyebrow:
- Featured Projects

Heading:
- Some of My Recent Work

Add:
- View All Projects action

Desktop layout:
- 3 columns

Tablet:
- 2 columns

Mobile:
- 1 column

Each card must use Supabase data:

- banner image
- project logo
- project name
- short description
- technology chips
- circular arrow/view button

Cards should closely match the screenshot proportions and styling.

Projects should include at least:

- Plate Spot
- PetAdopt
- Q Music
- LincSell POS Pro
- SaaSyPOS
- Shama Education

Do not hardcode their content inside React components. Seed the Supabase tables instead.

---

# Project Detail Pages

Create:

```text
/projects/[slug]
```

Each project detail page must query Supabase by slug.

Required sections:

1. Project hero
2. Logo + title
3. Short summary
4. Full description
5. My role
6. Technology stack
7. Project screenshots gallery
8. Main features / highlights
9. Platform links
10. GitHub link if available
11. Next/previous project navigation
12. Related projects
13. Contact CTA

Use metadata dynamically from project data.

Generate SEO-friendly metadata per project.

If a project does not have a specific link, hide that button instead of showing an empty link.

---

# Known Project Content to Seed

Use the provided project source material to seed the database, but keep the site runtime fully Supabase-driven.

## Q Music

Summary direction:
- production-grade music application
- Android development with Java
- Node.js / Express backend exposure
- REST APIs and networking
- debugging, optimization, testing
- scalable mobile architecture

## Shama Education

Summary direction:
- education app for Grades 2–4
- Flutter
- Flame Engine
- Rive animations and state streams
- MVVM
- Hive offline-first architecture
- online progress synchronization
- offline educational videos
- custom H5P integration
- custom Flutter plugin for offline H5P

App link:
- Google Play: `https://play.google.com/store/apps/details?id=net.nrschools.shamaapp&hl=en`

## SaaSyPOS

Summary direction:
- production POS application
- printer SDK integrations
- Bluetooth printing
- Brother label printers
- ESC/POS thermal printers
- Android POS terminal communication
- background queues/services
- offline product sync
- offline transaction handling
- Redis-based structures
- production debugging and performance work

App link:
- App Store: `https://apps.apple.com/us/app/saasypos/id1608172361`

## PlateSpot

Summary direction:
- social/community app for car enthusiasts
- car profile registration
- location-based "On Tour" feature
- 30-minute active tour sessions
- background location notifications
- AI/ML vehicle registration verification
- rewards
- real-time chat and notifications
- secure private messaging using public/private keys
- secure group chat

## LincSell

Summary direction:
- e-commerce and retail platform
- mobile customer app
- responsive storefront views
- products/categories/details
- cart and checkout
- order workflows
- real-time store synchronization
- wishlist, coupons, rewards, push notifications
- POS-related workflows
- payments, inventory, orders
- multi-channel retail platform

App link:
- App Store: `https://apps.apple.com/us/app/lincsell-pos-pro/id6476977214`

## PetAdopt

Summary direction:
- Flutter cross-platform pet adoption app
- adopter, donor, and admin roles
- nearby pets by location
- filters by species, breed, age, and city
- favourites
- Firebase Firestore chat
- secure meetup scheduling and location sharing
- adoption and health tracking
- PyTorch Lite pet species detection
- admin verification workflows
- multilingual support
- MVVM-style structure

GitHub:
- `https://github.com/musa195420/PetAdoptionApp`

General GitHub profile:
- `https://github.com/musa195420/`

---

# Additional Portfolio Experience / Supporting Projects

The supplied source also references additional work such as:

- WowCar
- ClickMatch
- Neeat
- The Enhancers

Do not show these in the main six-card featured grid unless they have complete data/images, but design the schema so they can be added later with no code changes.

---

# About Section

Recreate the screenshot structure closely.

Left:
- portrait image
- decorative `about-passionate-note.png`

Middle:
- eyebrow `ABOUT ME`
- heading similar to:
  - Building Ideas into
  - Powerful Mobile Experiences
- Supabase-driven biography

Right:
- four small quality/service cards:
  - Clean Architecture
  - App Store Deployment
  - Performance Focus
  - Production Ready

Use the uploaded corresponding icons.

The card content must come from `service_features`.

---

# CTA Section

Use the uploaded:

```text
my-images/backgrounds/contact-cta.webp
```

Match the reference:
- rounded large card
- warm/dark brown overlay
- heading: Have a Project in Mind?
- supporting copy
- Contact Me button
- Download CV button
- decorative handwritten text on the right if suitable

Add an option/button to open the "Tell Me Your Idea" inquiry form.

---

# Styling System

Create CSS variables / Tailwind theme tokens for the design.

Suggested palette:

```text
background: #FFFDF8
surface: #FFFFFF
surface-soft: #FFF7EC
text-primary: #111111
text-secondary: #5B554F
accent: #9A491D
accent-light: #C96B31
accent-soft: #F6E0CF
border: #EEE5DB
```

Adjust after visually comparing against the reference image.

Important visual rules:

- premium warm cream background
- burnt orange / brown accent
- black headings
- large bold hero typography
- soft, subtle shadows
- rounded cards
- generous but compact vertical rhythm
- project cards with large image top area
- avoid excessive gradients
- avoid glassmorphism
- avoid neon colors
- avoid generic SaaS styling

---

# Responsive Behavior

Desktop should resemble the supplied reference as closely as possible.

For mobile:

- stack hero content
- use `hero-mobile.png`
- use `about-mobile.png`
- project cards become one column
- skills strip becomes horizontally scrollable or clean wrapped grid
- header becomes compact mobile nav
- handwritten decorations should be hidden/repositioned if they harm readability
- keep CTA easy to use

Tablet should preserve the premium card-based composition.

---

# Data Fetching

Use server components for read-heavy public portfolio content where appropriate.

Prefer server-side Supabase queries for:

- profile
- projects
- project details
- technologies
- skills
- experience
- service features

Only use client components where interaction is needed.

Avoid unnecessary hydration.

---

# Loading / Shimmer States

Add polished skeletons/shimmers for:

- profile/hero if data is delayed
- project grid
- project detail gallery
- technologies

Do not show a blank page during loading.

Use subtle YouTube-like shimmer placeholders.

---

# Error Handling

Create proper states for:

- Supabase unavailable
- empty projects
- project not found
- failed image
- inquiry submission failure

Project slug not found should render `notFound()`.

---

# SEO

Add:

- metadata title
- description
- OpenGraph data
- Twitter metadata
- canonical URLs where appropriate
- dynamic metadata for projects
- semantic heading structure
- alt text from database

---

# Accessibility

Ensure:

- semantic landmarks
- keyboard navigation
- visible focus states
- proper button labels
- image alt text
- good contrast
- reduced-motion consideration
- form labels
- error messages announced appropriately

---

# Performance

Use:

- Next.js Image where appropriate
- correct image sizes
- lazy loading below the fold
- server components for static content
- minimal client JS
- no unnecessary animation libraries
- no autoplay videos
- no huge local assets

Remove old unused dependencies and old website code.

---

# Do Not Hardcode Data

This requirement is critical.

Do not write code such as:

```ts
const projects = [
  { name: 'Plate Spot', ... }
]
```

Do not write project data directly in JSX.

Instead:

```text
Supabase DB
  -> repository/service
  -> page/server component
  -> presentation component
```

Seed the database with an SQL or TypeScript seed script.

---

# Supabase Seed Script

Create a seed script that inserts:

- site profile
- technologies
- service features
- projects
- project media
- project highlights
- project technology mappings
- social links
- known app/store/github links

The seed script should use uploaded Supabase Storage URLs.

Do not duplicate records when rerun.

Use upserts by unique key/slug where appropriate.

---

# Six-Phase Implementation Plan

Implement the work in exactly these six phases.

## Phase 1 — Cleanup, Foundation, Architecture

Tasks:

- inspect the current repo
- remove obsolete website code
- remove unused components/assets/videos/dependencies
- preserve `.git`, environment files, and required config
- initialize/refactor Next.js App Router structure
- configure Tailwind
- create clean architecture folders
- create `AppStrings`
- create route/constants files
- create Supabase client/server/admin helpers
- create TypeScript domain types
- create base design tokens
- create reusable Button/Card/Container components

Acceptance criteria:

- project builds successfully
- old portfolio implementation is gone
- architecture is clean
- no Supabase secret leaked client-side
- homepage may still be skeletal at this phase

---

## Phase 2 — Supabase Schema, Storage Integration, Seed Data

Tasks:

- create SQL migrations
- create all tables listed above
- add indexes and constraints
- configure RLS
- configure anonymous inquiry insert policy
- implement repositories/services
- map `portfolio-assets` storage URLs
- create idempotent seed script
- seed profile/projects/skills/services/social links
- populate project media from uploaded assets

Acceptance criteria:

- Supabase is the source of truth
- no project array in frontend code
- data can be fetched successfully
- media URLs come from Supabase
- inquiry data policy is secure

---

## Phase 3 — Homepage Pixel-Accurate Recreation

Tasks:

- implement header
- implement hero
- use responsive portrait assets
- implement decorative hero assets
- implement stat cards
- implement skills/technology strip
- implement featured projects grid
- implement about section
- implement service feature cards
- implement bottom CTA
- implement footer
- tune typography, spacing, color, border radius, and shadows against the screenshot

Acceptance criteria:

- desktop homepage visually matches the supplied reference closely
- no generic redesign
- responsive tablet/mobile layouts work
- all visible content is Supabase-driven except fixed UI labels from AppStrings

---

## Phase 4 — Project Detail Pages + Complete Portfolio Navigation

Tasks:

- implement `/projects/[slug]`
- implement project media gallery
- project highlights
- technology list
- app/store/github links
- related projects
- previous/next project navigation
- dynamic metadata
- `View All Projects` page if needed
- hide missing links gracefully

Acceptance criteria:

- every seeded project has a working detail page
- project pages require no manual hardcoded JSX changes to add a new project
- adding a row in Supabase is sufficient to surface new content

---

## Phase 5 — Project Inquiry / Service Lead Flow

Tasks:

- implement polished `Tell Me Your Idea` form
- Zod validation
- server-side submission
- store records in `project_inquiries`
- loading/success/error UX
- anti-spam basic protection
- optional honeypot field
- optional rate limiting strategy
- CTA integration across homepage/project detail pages

Acceptance criteria:

- anonymous visitors can submit safely
- anonymous visitors cannot read inquiries
- submission never exposes secret credentials
- records appear in Supabase

---

## Phase 6 — QA, Performance, Responsive Polish, Final Cleanup

Tasks:

- compare against reference screenshot
- fix spacing, typography, card sizing, image cropping
- test desktop/tablet/mobile
- test all navigation
- test all project links
- test inquiry flow
- run lint
- run TypeScript checks
- run production build
- remove unused code/dependencies
- validate accessibility
- add loading/error states
- validate image optimization
- confirm no hardcoded portfolio data remains

Acceptance criteria:

```bash
npm run lint
npm run build
```

must pass.

Final repo should be production-ready.

---

# Required Final Deliverables

When finished, provide:

1. final folder structure
2. list of Supabase tables created
3. migration file locations
4. seed file location
5. list of environment variables used
6. list of routes created
7. explanation of inquiry security/RLS
8. confirmation that `SUPABASE_SECRET_KEY` is server-only
9. confirmation that portfolio content is not hardcoded
10. confirmation that project images come from Supabase Storage
11. build/lint results
12. any remaining manual Supabase dashboard actions

---

# Execution Rules for Codex

Do not only explain what should be done.

Actually modify the codebase phase by phase.

Before each phase:
- inspect relevant existing files
- state a short implementation plan

After each phase:
- run appropriate checks
- summarize files added/changed
- mention any issue that blocks the next phase

Do not stop after generating architecture or SQL only.

Do not ask me to manually recreate code that you can implement.

Do not introduce placeholder project data into components.

Do not remove working environment configuration.

Do not expose Supabase secrets.

The supplied reference image is the visual source of truth. The Supabase database is the content source of truth.
