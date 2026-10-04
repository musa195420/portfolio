import { AboutSection } from '@/components/about/AboutSection';
import { ContactCta } from '@/components/contact/ContactCta';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { HomeHero } from '@/components/hero/HomeHero';
import { FeaturedProjects } from '@/components/projects/FeaturedProjects';
import { TechStrip } from '@/components/skills/TechStrip';

// Must be a literal for static analysis; keep in sync with AppConfig.revalidateSeconds.
export const revalidate = 300;

/**
 * Content is served from the ISR cache, so the full page HTML is sent at once
 * (no route-level loading.tsx, which would ship a skeleton first). Remote
 * images show their own shimmer placeholders while they load.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TechStrip />
      <FeaturedProjects />
      <AboutSection />
      <ExperienceSection />
      <ContactCta />
    </>
  );
}
