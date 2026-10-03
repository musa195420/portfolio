import Image from 'next/image';
import Link from 'next/link';
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
      <Image
        src={assetUrl(AssetPaths.brandLogo)}
        alt=""
        width={56}
        height={56}
        priority
        className="size-12 shrink-0 object-contain sm:size-14"
      />
      <span className="hidden h-9 w-px bg-line-strong xs:block" aria-hidden="true" />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-display text-base font-bold text-ink sm:text-lg">{name}</span>
        <span className="truncate text-xs text-ink-muted sm:text-[0.8rem]">{title}</span>
      </span>
    </Link>
  );
}
