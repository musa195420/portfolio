import { ArtDirectedImage } from '@/components/common/ArtDirectedImage';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
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
    <section id={SectionIds.about} aria-labelledby="about-heading" className="py-5 sm:py-6">
      <Container size="wide" className="grid items-center gap-8 lg:grid-cols-[0.6fr_1fr_1.15fr] lg:gap-8">
        <div className="relative mx-auto w-full max-w-[17rem] pt-2">
          {/* Organic blob that clips the portrait at the shoulders */}
          <div className="relative aspect-[272/252] w-full overflow-hidden rounded-[46%_54%_42%_58%/52%_44%_56%_48%] bg-gradient-to-br from-peach to-cream-deep">
            <ArtDirectedImage
              desktopSrc={profile.aboutDesktopImageUrl}
              mobileSrc={profile.aboutMobileImageUrl}
              alt={AppStrings.about.portraitAlt(profile.fullName)}
              width={1122}
              height={1402}
              sizes={ImageSizes.aboutPortrait}
              className="absolute top-[4%] left-[8%] w-[84%]"
              imgClassName="object-contain object-top mix-blend-multiply"
            />
          </div>
          <SmartImage
            src={assetUrl(AssetPaths.aboutPassionateNote)}
            alt=""
            width={1448}
            height={1086}
            sizes={ImageSizes.decoration}
        placeholder={false}
            className="pointer-events-none absolute -top-[9%] -left-[22%] z-20 hidden w-[55%] rounded-2xl xl:block"
            imgClassName="object-contain"
          />
        </div>

        <div className="space-y-3">
          <Eyebrow marker>{AppStrings.about.eyebrow}</Eyebrow>
          <h2 id="about-heading" className="font-display text-[1.65rem] leading-tight font-bold sm:text-[1.95rem]">
            {headingLines.join(' ')}
            {accentLine ? (
              <>
                <br />
                <span className="text-gradient-accent">{accentLine}</span>
              </>
            ) : null}
          </h2>
          {toParagraphs(profile.aboutDescription).map((paragraph, index) => (
            <p key={index} className="text-[0.92rem] leading-relaxed text-ink-muted">
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
