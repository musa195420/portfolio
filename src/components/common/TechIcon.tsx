import { Cog } from 'lucide-react';
import Image from 'next/image';
import { ImageSizes } from '@/constants/app_constants';
import type { Technology } from '@/types/skill';
import { cn } from '@/utils/cn';

type TechIconProps = {
  technology: Technology;
  className?: string;
  /** What to show when the technology has no icon: a gear glyph or a small dot. */
  fallback?: 'glyph' | 'dot';
};

/** Technology icon from Supabase, with a neutral fallback. */
export function TechIcon({ technology, className, fallback = 'glyph' }: TechIconProps) {
  if (!technology.iconUrl) {
    if (fallback === 'dot') {
      return (
        <span aria-hidden="true" className={cn('flex items-center justify-center', className)}>
          <span className="size-2 rounded-full bg-accent-light" />
        </span>
      );
    }
    return <Cog aria-hidden="true" className={cn('text-accent-light', className)} strokeWidth={2.25} />;
  }
  return (
    <Image
      src={technology.iconUrl}
      alt=""
      width={48}
      height={48}
      sizes={ImageSizes.icon}
      className={cn('object-contain', className)}
    />
  );
}
