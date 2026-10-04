import { ArrowRight, Mail, Play } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AppRoutes, SectionIds } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import type { Profile, SiteSettings } from '@/types/profile';
import type { Technology } from '@/types/skill';
import { splitHighlights } from '@/utils/format';
import { HeroStats } from './HeroStats';
import { HeroVisual } from './HeroVisual';

type HeroSectionProps = {
  profile: Profile;
  settings: SiteSettings;
  technologies: Technology[];
};

export function HeroSection({ profile, settings, technologies }: HeroSectionProps) {
  const platforms = settings.heroPlatformTechnologies
    .map((slug) => technologies.find((tech) => tech.slug === slug))
    .filter((tech): tech is Technology => Boolean(tech));

  return (
    <section id={SectionIds.home} aria-labelledby="hero-heading" className="hero-backdrop relative overflow-x-clip">
      <Container className="grid items-end gap-8 pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-2 lg:pt-0">
        <div className="space-y-5 self-start lg:pt-7 lg:pb-8">
          {profile.availabilityText ? (
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-ink-soft shadow-soft">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-light/60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-light" />
              </span>
              {profile.availabilityText}
            </p>
          ) : null}

          <h1 id="hero-heading" className="text-hero font-bold">
            <span className="xl:whitespace-nowrap">{profile.heroHeadingLine1}</span>
            {profile.heroHeadingLine2 ? (
              <>
                <br />
                <span className="text-gradient-accent">{profile.heroHeadingLine2}</span>
              </>
            ) : null}
          </h1>

          {profile.heroDescription ? (
            <p className="max-w-[38rem] text-base leading-relaxed text-ink-muted sm:text-[1.15rem]">
              {splitHighlights(profile.heroDescription, settings.heroHighlights).map((part, index) =>
                part.highlighted ? (
                  <strong key={index} className="font-semibold text-accent">
                    {part.text}
                  </strong>
                ) : (
                  <span key={index}>{part.text}</span>
                ),
              )}
            </p>
          ) : null}

          <div className="grid gap-3 pt-1 xs:flex xs:flex-wrap sm:gap-5">
            <ButtonLink
              href={AppRoutes.section(SectionIds.projects)}
              size="lg"
              className="sm:h-[3.75rem] sm:px-8 sm:text-lg"
              icon={
                <span className="flex size-7 items-center justify-center rounded-full bg-white text-accent">
                  <Play aria-hidden="true" className="size-3.5 translate-x-px fill-current" />
                </span>
              }
              trailingIcon={<ArrowRight aria-hidden="true" className="size-4" />}
            >
              {AppStrings.hero.viewProjects}
            </ButtonLink>
            <ButtonLink
              href={AppRoutes.section(SectionIds.contact)}
              variant="secondary"
              size="lg"
              className="sm:h-[3.75rem] sm:px-11 sm:text-lg"
              icon={<Mail aria-hidden="true" className="size-5" />}
            >
              {AppStrings.hero.contactMe}
            </ButtonLink>
          </div>

          <HeroStats profile={profile} />
        </div>

        <HeroVisual profile={profile} platforms={platforms} />
      </Container>
    </section>
  );
}
