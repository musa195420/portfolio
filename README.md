# Muhammad Musa — Portfolio

Personal portfolio for Muhammad Musa, Mobile Application Developer. Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4** and **Supabase**.

All portfolio content — profile, projects, screenshots, technologies, skills, experience, social links and settings — lives in Supabase. Images are served from the public `portfolio-assets` Storage bucket. Adding or editing a row in Supabase updates the site (within the 5-minute ISR window) with no code changes.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Supabase values
npm run dev
```

### Supabase setup (once per project)

Run these files **in order** in the Supabase SQL Editor (or `supabase db reset` with the Supabase CLI):

1. `supabase/migrations/20261004000100_portfolio_schema.sql` — tables, constraints, indexes, triggers
2. `supabase/migrations/20261004000200_row_level_security.sql` — RLS policies and grants
3. `supabase/seed.sql` — portfolio content (idempotent; safe to re-run)

Images were uploaded to the `portfolio-assets` bucket with `upload_to_supabase.py`; `portfolio-assets-urls.json` is the generated URL manifest (reference only — runtime content comes from the database).

## Scripts

| Script              | Purpose                              |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Development server                   |
| `npm run build`     | Production build                     |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | Generate route types + `tsc --noEmit` |

## Environment variables

| Variable                        | Where used                      |
| ------------------------------- | ------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Server reads, image config      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Server reads + inquiry insert (RLS enforced) |
| `SUPABASE_SECRET_KEY`           | **Server only** — inquiry rate limiting and IP hashing (`server-only` guarded) |
| `NEXT_PUBLIC_SITE_URL`          | Optional canonical URL for metadata/sitemap |

## Routes

| Route                       | Description                                   |
| --------------------------- | --------------------------------------------- |
| `/`                         | Homepage (hero, technologies, featured projects, about, experience, CTA) |
| `/projects`                 | All published projects                        |
| `/projects/[slug]`          | Project detail — one dynamic route for every project |
| `/contact`                  | "Tell Me Your Idea" project inquiry form      |
| `POST /api/project-inquiries` | Validated, rate-limited inquiry submission  |
| `/sitemap.xml`, `/robots.txt` | SEO                                         |

## Architecture

```text
src/
├── app/            Routes, layouts, loading/error/not-found states, API route
├── components/     Presentation (ui primitives, layout, hero, skills, projects, about, experience, contact, inquiry)
├── constants/      AppStrings, routes, navigation, table names, storage buckets, asset paths, config
├── features/       Row → domain mappers and the shared inquiry Zod schema
├── repositories/   Raw Supabase queries
├── services/       Cached, error-safe data access used by pages
├── lib/            Env validation and Supabase clients (public server, anon write, admin)
├── types/          Database row types and domain types
├── hooks/          Client hooks (active nav section)
└── utils/          Formatting helpers
supabase/
├── migrations/     Schema + RLS
└── seed.sql        Idempotent content seed
```

Data flows **Supabase → repository → service → server component → presentation component**. Static UI copy lives in `src/constants/app_strings.ts`; no portfolio data is hardcoded in components.

## Security

- `SUPABASE_SECRET_KEY` is only read in `lib/env.server.ts` / `lib/supabase/admin.ts`, both marked `server-only`.
- RLS: content tables are read-only for the public (unpublished projects and their media are hidden). `project_inquiries` is **insert-only** for anonymous users — no select, update or delete — and new rows must have `status = 'new'` and no admin notes.
- The inquiry API validates with Zod server-side, checks the request origin, caps body size, uses a honeypot and minimum fill time, rate-limits by email and hashed IP (3 per hour), and stores only an HMAC of the IP.
- Read inquiries in the Supabase dashboard (Table Editor → `project_inquiries`).
