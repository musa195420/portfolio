import Image from 'next/image';
import { ArtDirectedImage } from '@/components/common/ArtDirectedImage';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { ImageSizes } from '@/constants/app_constants';
import { SectionIds } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { AssetPaths, assetUrl } from '@/constants/asset_links';
import { getProfile, getServiceFeatures } from '@/services/profile.service';
import { splitHighlights, toParagraphs } from '@/utils/format';
import { ServiceFeatureCards } from './ServiceFeatureCards';

export async function AboutSection() {
  const [{ data: profile }, { data: features }] = await Promise.all([getProfile(), getServiceFeatures()]);
  if (!profile) return null;

  const headingLines = (profile.aboutHeading ?? '').split('\n').filter(Boolean);
  const accentLine = headingLines.length > 1 ? headingLines.pop() : null;

  return (
    <section id={SectionIds.about} aria-labelledby="about-heading" className="py-10 sm:py-14">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.35fr_1.25fr] lg:gap-10">
        <div className="relative mx-auto w-full max-w-[17rem] lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-[6%_4%_0_4%] rounded-[48%_52%_44%_56%/55%_50%_50%_45%] bg-gradient-to-br from-accent-soft to-cream-deep"
          />
          <ArtDirectedImage
            desktopSrc={profile.aboutDesktopImageUrl}
            mobileSrc={profile.aboutMobileImageUrl}
            alt={AppStrings.about.portraitAlt(profile.fullName)}
            width={1122}
            height={1402}
            sizes={ImageSizes.aboutPortrait}
            className="relative z-10 h-auto w-full mix-blend-multiply [mask-image:linear-gradient(to_bottom,black_88%,transparent)]"
          />
          <Image
            src={assetUrl(AssetPaths.aboutPassionateNote)}
            alt=""
            width={1448}
            height={1086}
            sizes={ImageSizes.decoration}
            className="pointer-events-none absolute -top-[6%] -left-[34%] z-20 hidden w-[62%] xl:block"
          />
        </div>

        <div className="space-y-4">
          <Eyebrow>
            {AppStrings.about.eyebrow}
          </Eyebrow>
          <h2 id="about-heading" className="text-section font-bold">
            {headingLines.join(' ')}
            {accentLine ? (
              <>
                <br />
                <span className="text-accent">{accentLine}</span>
              </>
            ) : null}
          </h2>
          {toParagraphs(profile.aboutDescription).map((paragraph, index) => (
            <p key={index} className="text-sm leading-relaxed text-ink-muted sm:text-[0.95rem]">
              {splitHighlights(paragraph, [profile.fullName]).map((part, partIndex) =>
                part.highlighted ? (
                  <strong key={partIndex} className="font-semibold text-ink">
                    {part.text}
                  </strong>
                ) : (
                  <span key={partIndex}>{part.text}</span>
                ),
              )}
            </p>
          ))}
        </div>

        <ServiceFeatureCards features={features ?? []} />
      </Container>
    </section>
  );
}
