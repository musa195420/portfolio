import { ArtDirectedImage } from '@/components/common/ArtDirectedImage';
import { SmartImage } from '@/components/ui/SmartImage';
import { ImageSizes } from '@/constants/app_constants';
import { AppStrings } from '@/constants/app_strings';
import { AssetPaths, assetUrl } from '@/constants/asset_links';
import type { Profile } from '@/types/profile';
import type { Technology } from '@/types/skill';

type HeroVisualProps = { profile: Profile; platforms: Technology[] };

/**
 * Portrait composition from the reference: peach circle, large portrait cut
 * off by the technologies strip, handwritten notes on the left, brand card,
 * platform card and "Build · Innovate" card on the right.
 * Positions are percentages of a 620×507 box so the composition scales.
 */
export function HeroVisual({ profile, platforms }: HeroVisualProps) {
  return (
    <div className="relative mx-auto aspect-[620/507] w-full max-w-[34rem] lg:max-w-none">
      {/* Clipped layer: circle + portrait are cut off at the bottom edge */}
      <div className="absolute inset-x-0 -top-4 bottom-0 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-[18%] left-[15%] aspect-square w-[75%] rounded-full bg-gradient-to-b from-peach via-peach to-peach-deep"
        />
        <ArtDirectedImage
          desktopSrc={profile.heroDesktopImageUrl}
          mobileSrc={profile.heroMobileImageUrl}
          alt={AppStrings.hero.portraitAlt(profile.fullName)}
          width={1122}
          height={1402}
          sizes={ImageSizes.heroPortrait}
          preload
          className="absolute -top-[3%] left-[7%] w-[86%]"
          imgClassName="object-contain object-top mix-blend-multiply"
        />
      </div>

      {/* Handwritten notes — desktop only */}
      <SmartImage
        src={assetUrl(AssetPaths.heroNoteIdeas)}
        alt=""
        width={1448}
        height={1086}
        sizes={ImageSizes.decoration}
        placeholder={false}
        className="pointer-events-none absolute top-[4%] -left-[4%] z-20 hidden w-[36%] rounded-2xl lg:block"
        imgClassName="object-contain"
      />
      <SmartImage
        src={assetUrl(AssetPaths.heroNoteCleanCode)}
        alt=""
        width={1448}
        height={1086}
        sizes={ImageSizes.decoration}
        placeholder={false}
        className="pointer-events-none absolute top-[46%] -left-[16%] z-20 hidden w-[36%] rounded-2xl lg:block"
        imgClassName="object-contain"
      />

      {/* Arrow from the portrait to the brand card */}
      <svg
        aria-hidden="true"
        viewBox="0 0 60 40"
        fill="none"
        className="absolute top-[4%] left-[74%] z-20 hidden w-[8%] text-accent lg:block"
      >
        <path d="M4 36 C 16 34, 34 26, 52 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 8 L 53 7 L 51 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Brand card */}
      <div className="absolute top-[-6%] left-[83%] z-20 hidden w-[17%] rounded-2xl border border-line bg-surface p-[1.5%] shadow-card sm:block">
        <SmartImage
          src={assetUrl(AssetPaths.brandLogo)}
          alt=""
          width={1254}
          height={1254}
          sizes="96px"
          preview={false}
          className="aspect-[2/1] w-full rounded-lg"
          imgClassName="object-cover scale-110"
        />
      </div>

      {/* Platform card */}
      {platforms.length > 0 ? (
        <ul
          aria-label={AppStrings.hero.platformCardLabel}
          className="absolute top-[20%] right-[-2%] z-20 flex w-[9%] min-w-11 flex-col items-center gap-[1.1rem] rounded-2xl border border-line bg-surface py-4 shadow-card lg:right-auto lg:left-[96%]"
        >
          {platforms.map((platform) =>
            platform.iconUrl ? (
              <li key={platform.id} className="w-[48%] min-w-6">
                <SmartImage
                  src={platform.iconUrl}
                  alt={platform.name}
                  width={1254}
                  height={1254}
                  sizes={ImageSizes.icon}
                  preview={false}
                  className="w-full rounded-md"
                  imgClassName="object-contain"
                />
              </li>
            ) : null,
          )}
        </ul>
      ) : null}

      {/* Build · Innovate · Deploy · Repeat card */}
      <SmartImage
        src={assetUrl(AssetPaths.heroBuildCard)}
        alt=""
        width={1448}
        height={1086}
        sizes={ImageSizes.decoration}
        placeholder={false}
        className="pointer-events-none absolute top-[60%] right-[-4%] z-20 w-[38%] rounded-2xl lg:right-auto lg:left-[71%] lg:w-[42%]"
        imgClassName="object-contain"
      />
    </div>
  );
}
