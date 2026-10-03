import { getImageProps } from 'next/image';
import { cn } from '@/utils/cn';

type ArtDirectedImageProps = {
  desktopSrc: string | null;
  mobileSrc: string | null;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  /** Viewport width (px) at which the desktop source takes over. */
  breakpoint?: number;
  priority?: boolean;
  className?: string;
};

/**
 * Serves a different crop on small screens (e.g. hero-mobile.png) using a
 * <picture> element while keeping next/image optimisation for both sources.
 */
export function ArtDirectedImage({
  desktopSrc,
  mobileSrc,
  alt,
  width,
  height,
  sizes,
  breakpoint = 1024,
  priority,
  className,
}: ArtDirectedImageProps) {
  const fallback = desktopSrc ?? mobileSrc;
  if (!fallback) return null;
  const common = { alt, width, height, sizes, priority };
  const {
    props: { srcSet: desktopSet, ...rest },
  } = getImageProps({ ...common, src: fallback });
  const mobileSet = mobileSrc && mobileSrc !== fallback ? getImageProps({ ...common, src: mobileSrc }).props.srcSet : null;

  return (
    <picture>
      {mobileSet ? <source media={`(max-width: ${breakpoint - 1}px)`} srcSet={mobileSet} /> : null}
      <source media={`(min-width: ${breakpoint}px)`} srcSet={desktopSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is spread from getImageProps */}
      <img {...rest} className={cn(className)} />
    </picture>
  );
}
