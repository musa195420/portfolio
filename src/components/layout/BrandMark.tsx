import Link from 'next/link';
import { SmartImage } from '@/components/ui/SmartImage';
import { AppRoutes } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { AssetPaths, assetUrl } from '@/constants/asset_links';
import { cn } from '@/utils/cn';

type BrandMarkProps = { name: string; title: string; className?: string };

export function BrandMark({ name, title, className }: BrandMarkProps) {
  return (
    <Link
      href={AppRoutes.home}
      aria-label={AppStrings.a11y.homeLink}
      className={cn('flex min-w-0 items-center gap-3', className)}
    >
      {/* The logo artwork has generous padding; crop it so the mark reads at header size. */}
      <SmartImage
        src={assetUrl(AssetPaths.brandLogo)}
        alt=""
        width={1254}
        height={1254}
        sizes="96px"
        preload
        preview={false}
        className="h-9 w-[4.5rem] shrink-0 rounded-md sm:h-10 sm:w-20"
        imgClassName="object-cover scale-110"
      />
      <span className="hidden h-9 w-px bg-line-strong xs:block" aria-hidden="true" />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-display text-base font-bold text-ink sm:text-[1.3rem]">{name}</span>
        <span className="truncate text-xs text-ink-muted sm:text-[0.85rem]">{title}</span>
      </span>
    </Link>
  );
}
