'use client';

import { getImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';
import { useCallback, useState } from 'react';
import { isPositioned, previewUrl } from '@/components/ui/SmartImage';
import { AppStrings } from '@/constants/app_strings';
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
  preload?: boolean;
  /** Box classes (size, position, radius). */
  className?: string;
  /** Classes for the <img> (blend mode, mask…). */
  imgClassName?: string;
};

/**
 * Serves a different crop on small screens (e.g. hero-mobile.png) with a
 * <picture> element, keeping next/image optimisation for both sources and
 * the same shimmer → fade-in loading state as SmartImage.
 */
export function ArtDirectedImage({
  desktopSrc,
  mobileSrc,
  alt,
  width,
  height,
  sizes,
  breakpoint = 1024,
  preload,
  className,
  imgClassName,
}: ArtDirectedImageProps) {
  const fallback = desktopSrc ?? mobileSrc;
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Catch images that finished loading before hydration.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    // Failures are reported by onError; zero width here can mean "not started".
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  const box = cn('overflow-hidden', !isPositioned(className) && 'relative', className);
  const style = { aspectRatio: `${width} / ${height}` };

  if (!fallback || failed) {
    return (
      <div role="img" aria-label={alt || AppStrings.states.imageUnavailable} className={box} style={style}>
        <div className="absolute inset-0 flex items-center justify-center bg-cream-deep text-ink-faint">
          <ImageOff aria-hidden="true" className="size-6" />
        </div>
      </div>
    );
  }

  const common = { alt, width, height, sizes, preload };
  const {
    props: { srcSet: desktopSet, ...rest },
  } = getImageProps({ ...common, src: fallback });
  const mobileSet =
    mobileSrc && mobileSrc !== fallback ? getImageProps({ ...common, src: mobileSrc }).props.srcSet : null;

  return (
    <div className={box} style={style}>
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-500',
          loaded ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div
          className="absolute inset-0 scale-110 bg-cover bg-top blur-xl"
          style={{ backgroundImage: `url("${previewUrl(fallback, width, height)}")` }}
        />
        <div className="skeleton absolute inset-0 rounded-none opacity-70" />
      </div>
      <picture>
        {mobileSet ? <source media={`(max-width: ${breakpoint - 1}px)`} srcSet={mobileSet} /> : null}
        <source media={`(min-width: ${breakpoint}px)`} srcSet={desktopSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is spread from getImageProps */}
        <img
          {...rest}
          ref={imgRef}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'img-fade absolute inset-0 h-full w-full transition-opacity duration-500 ease-out',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName ?? 'object-cover',
          )}
        />
      </picture>
    </div>
  );
}
