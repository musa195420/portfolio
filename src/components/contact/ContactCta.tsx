import { Download, Lightbulb, Mail } from 'lucide-react';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AppRoutes, SectionIds } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { AssetPaths, assetUrl } from '@/constants/asset_links';
import { getProfile } from '@/services/profile.service';
import { cn } from '@/utils/cn';

type ContactCtaProps = {
  /** Anchor id; only the homepage instance should own the #contact anchor. */
  anchor?: boolean;
  /** Path recorded as the inquiry's source page. */
  source?: string;
  className?: string;
};

export async function ContactCta({ anchor = true, source = AppRoutes.home, className }: ContactCtaProps) {
  const { data: profile } = await getProfile();

  return (
    <section
      id={anchor ? SectionIds.contact : undefined}
      aria-labelledby="cta-heading"
      className={cn('py-8 sm:py-10', className)}
    >
      <Container>
        <div className="relative isolate overflow-hidden rounded-panel bg-accent-strong shadow-lift">
          <Image
            src={assetUrl(AssetPaths.contactCtaBackground)}
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="-z-10 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/95 via-umber/85 to-accent-strong/55"
          />

          <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:px-12 xl:grid-cols-[minmax(0,1fr)_auto_auto]">
            <div className="space-y-3 text-white">
              <p className="text-xs font-semibold tracking-[0.14em] text-white/75 uppercase">{AppStrings.cta.eyebrow}</p>
              <h2 id="cta-heading" className="font-display text-3xl font-bold text-white sm:text-4xl">
                {AppStrings.cta.heading}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">{AppStrings.cta.description}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:w-[25rem]">
              <ButtonLink
                href={AppRoutes.inquiry(source)}
                variant="light"
                size="lg"
                className="sm:col-span-2"
                icon={<Lightbulb aria-hidden="true" className="size-5 text-accent" />}
              >
                {AppStrings.cta.tellIdea}
              </ButtonLink>
              {profile?.email ? (
                <ButtonLink
                  href={`mailto:${profile.email}`}
                  variant="outline-light"
                  size="lg"
                  icon={<Mail aria-hidden="true" className="size-5" />}
                >
                  {AppStrings.cta.contactMe}
                </ButtonLink>
              ) : null}
              {profile?.resumeUrl ? (
                <ButtonLink
                  href={profile.resumeUrl}
                  external
                  variant="outline-light"
                  size="lg"
                  icon={<Download aria-hidden="true" className="size-5" />}
                >
                  {AppStrings.cta.downloadCv}
                </ButtonLink>
              ) : null}
            </div>

            <p
              aria-hidden="true"
              className="hidden -rotate-12 font-hand text-[1.7rem] leading-tight text-white/85 xl:block"
            >
              {AppStrings.cta.handwritten.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
