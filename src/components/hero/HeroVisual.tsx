import Image from 'next/image';
import { ArtDirectedImage } from '@/components/common/ArtDirectedImage';
import { AppStrings } from '@/constants/app_strings';
import { AssetPaths, assetUrl } from '@/constants/asset_links';
import { ImageSizes } from '@/constants/app_constants';
import type { Profile } from '@/types/profile';
import type { Technology } from '@/types/skill';

type HeroVisualProps = { profile: Profile; platforms: Technology[] };

/** Portrait with the decorative notes, brand card and platform card. */
export function HeroVisual({ profile, platforms }: HeroVisualProps) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
      {/* CSS arc behind the portrait */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] bottom-0 top-[14%] rounded-t-full bg-gradient-to-b from-accent-soft via-accent-soft/70 to-transparent lg:inset-x-[14%]"
      />

      <ArtDirectedImage
        desktopSrc={profile.heroDesktopImageUrl}
        mobileSrc={profile.heroMobileImageUrl}
        alt={AppStrings.hero.portraitAlt(profile.fullName)}
        width={1122}
        height={1402}
        sizes={ImageSizes.heroPortrait}
        priority
        className="relative z-10 h-auto w-full mix-blend-multiply [mask-image:linear-gradient(to_bottom,black_84%,transparent)]"
      />

      {/* Handwritten notes — desktop only, they crowd the portrait on small screens */}
      <Image
        src={assetUrl(AssetPaths.heroNoteIdeas)}
        alt=""
        width={1448}
        height={1086}
        sizes={ImageSizes.decoration}
        className="pointer-events-none absolute top-[3%] -left-[6%] z-20 hidden w-[34%] lg:block"
      />
      <Image
        src={assetUrl(AssetPaths.heroNoteCleanCode)}
        alt=""
        width={1448}
        height={1086}
        sizes={ImageSizes.decoration}
        className="pointer-events-none absolute top-[42%] -left-[13%] z-20 hidden w-[32%] lg:block"
      />
      <Image
        src={assetUrl(AssetPaths.heroBuildCard)}
        alt=""
        width={1448}
        height={1086}
        sizes={ImageSizes.decoration}
        className="pointer-events-none absolute -right-[6%] bottom-[2%] z-20 w-[36%] drop-shadow-sm sm:w-[34%] lg:-right-[10%]"
      />

      {/* Brand card */}
      <div className="absolute top-[6%] right-0 z-20 hidden rounded-2xl border border-line bg-surface p-2 shadow-card sm:block lg:-right-[4%]">
        <Image
          src={assetUrl(AssetPaths.brandLogo)}
          alt=""
          width={64}
          height={64}
          sizes={ImageSizes.logo}
          className="size-14 object-contain lg:size-16"
        />
      </div>

      {/* Platform card */}
      {platforms.length > 0 ? (
        <ul
          aria-label={AppStrings.hero.platformCardLabel}
          className="absolute top-[24%] right-[1%] z-20 flex flex-col gap-3 rounded-2xl border border-line bg-surface px-2.5 py-3 shadow-card lg:-right-[1%]"
        >
          {platforms.map((platform) =>
            platform.iconUrl ? (
              <li key={platform.id}>
                <Image
                  src={platform.iconUrl}
                  alt={platform.name}
                  width={28}
                  height={28}
                  sizes={ImageSizes.icon}
                  className="size-6 object-contain sm:size-7"
                />
              </li>
            ) : null,
          )}
        </ul>
      ) : null}
    </div>
  );
}
