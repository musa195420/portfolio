/** Non-copy configuration values shared across the app. */
export const AppConfig = {
  /** ISR window for public portfolio content, in seconds. */
  revalidateSeconds: 300,
  /** Cache tag applied to every public Supabase read. */
  contentCacheTag: 'portfolio-content',
  featuredProjectsLimit: 6,
  relatedProjectsLimit: 3,
  locale: 'en-US',
} as const;

export const InquiryLimits = {
  nameMax: 120,
  emailMax: 254,
  phoneMax: 40,
  companyMax: 160,
  projectTitleMax: 160,
  ideaMin: 20,
  ideaMax: 4000,
  /** Max submissions accepted per email or IP within the window below. */
  maxPerWindow: 3,
  windowMinutes: 60,
  /** Submissions faster than this after page load are treated as bots. */
  minFillMs: 3000,
} as const;

/** Breakpoint-aware `sizes` hints for next/image. */
export const ImageSizes = {
  projectCard: '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  heroPortrait: '(min-width: 1024px) 45vw, 90vw',
  aboutPortrait: '(min-width: 1024px) 22vw, 70vw',
  gallery: '(min-width: 1024px) 50vw, 100vw',
  detailBanner: '(min-width: 1280px) 1200px, 100vw',
  icon: '48px',
  logo: '64px',
  decoration: '(min-width: 1024px) 180px, 120px',
} as const;
