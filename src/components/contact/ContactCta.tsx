import { ArrowRight, Download, Mail } from 'lucide-react';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SmartImage } from '@/components/ui/SmartImage';
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
  const inquiryHref = AppRoutes.inquiry(source);

  return (
    <section
      id={anchor ? SectionIds.contact : undefined}
      aria-labelledby="cta-heading"
      className={cn('py-5 sm:py-6', className)}
    >
      <Container size="wide">
        <div className="relative isolate overflow-hidden rounded-panel bg-accent-strong shadow-lift">
          <SmartImage
            src={assetUrl(AssetPaths.contactCtaBackground)}
            alt=""
            fill
            sizes="(min-width: 1416px) 1330px, 100vw"
            className="-z-10"
            imgClassName="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/85 via-umber/60 to-accent/30"
          />

          <div className="grid gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:px-16 lg:py-7 xl:grid-cols-[minmax(0,1fr)_auto_13rem]">
            <div className="space-y-2 text-white">
              <p className="text-xs font-semibold tracking-[0.14em] text-white/75 uppercase">{AppStrings.cta.eyebrow}</p>
              <h2 id="cta-heading" className="font-display text-[1.75rem] font-bold text-white sm:text-[2rem]">
                {AppStrings.cta.heading}
              </h2>
              <p className="max-w-[34rem] text-sm leading-relaxed text-white/85 sm:text-[0.95rem]">
                {AppStrings.cta.description}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap sm:gap-4">
                <ButtonLink
                  href={inquiryHref}
                  variant="light"
                  size="lg"
                  className="sm:px-9"
                  icon={<Mail aria-hidden="true" className="size-5" />}
                >
                  {AppStrings.cta.contactMe}
                </ButtonLink>
                {profile?.resumeUrl ? (
                  <ButtonLink
                    href={profile.resumeUrl}
                    external
                    variant="outline-light"
                    size="lg"
                    className="sm:px-9"
                    icon={<Download aria-hidden="true" className="size-5" />}
                  >
                    {AppStrings.cta.downloadCv}
                  </ButtonLink>
                ) : null}
              </div>
              <Link
                href={inquiryHref}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                {AppStrings.cta.tellIdea}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div aria-hidden="true" className="relative hidden xl:block">
              <p className="-rotate-[10deg] font-hand text-[1.6rem] leading-[1.15] text-white/90">
                {AppStrings.cta.handwritten.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <svg viewBox="0 0 60 30" fill="none" className="absolute -bottom-6 -left-8 w-12 text-white/85">
                <path d="M4 24 C 18 28, 40 22, 54 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M44 6 L 55 7 L 52 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
