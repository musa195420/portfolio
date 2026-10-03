import { AboutSection } from '@/components/about/AboutSection';
import { ContactCta } from '@/components/contact/ContactCta';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { HomeHero } from '@/components/hero/HomeHero';
import { FeaturedProjects } from '@/components/projects/FeaturedProjects';
import { TechStrip } from '@/components/skills/TechStrip';

// Must be a literal for static analysis; keep in sync with AppConfig.revalidateSeconds.
export const revalidate = 300;

/**
 * Content is served from the ISR cache, so sections render together; the
 * route-level loading.tsx shows shimmers while a cold render is in flight.
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
