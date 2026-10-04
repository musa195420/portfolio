'use client';

import Image, { getImageProps, type ImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { AppStrings } from '@/constants/app_strings';
import { cn } from '@/utils/cn';

/** Width of the blurred low-quality preview (must be in images.imageSizes). */
const PREVIEW_WIDTH = 32;

type SmartImageProps = Omit<ImageProps, 'src' | 'fill' | 'width' | 'height' | 'className' | 'placeholder'> & {
  src: string | null | undefined;
  /** Intrinsic size. Sets the box aspect ratio so nothing shifts when the image arrives. */
  width?: number;
  height?: number;
  /** Fill the positioned parent instead of sizing from width/height. */
  fill?: boolean;
  /** Classes for the box: size, position, border radius, etc. The placeholder matches it. */
  className?: string;
  /** Classes for the <img> itself (object-fit, blend mode, transforms…). */
  imgClassName?: string;
  /** Show the shimmer while loading (default true). Off for transparent decorations that overlap text. */
  placeholder?: boolean;
  /** Also show a blurred low-quality preview under the shimmer (default true; off for tiny icons). */
  preview?: boolean;
};

/** True when the caller already positions the box (absolute/fixed/sticky). */
export function isPositioned(className?: string): boolean {
  return /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? '');
}

export function previewUrl(src: string, width?: number, height?: number): string {
  const previewHeight = width && height ? Math.max(1, Math.round((PREVIEW_WIDTH * height) / width)) : PREVIEW_WIDTH;
  return getImageProps({ src, alt: '', width: PREVIEW_WIDTH, height: previewHeight, quality: 75 }).props.src;
}

/**
 * Remote (Supabase Storage) image with a YouTube-style loading state: a
 * blurred low-quality preview under a shimmer, sized exactly like the final
 * image, which fades in once loaded. Falls back to a neutral tile on error.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  imgClassName,
  placeholder = true,
  preview = true,
  sizes,
  onLoad,
  onError,
  ...props
}: SmartImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const loaded = Boolean(src) && loadedSrc === src;
  const failed = !src || failedSrc === src;

  const boxStyle: CSSProperties | undefined =
    !fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined;

  return (
    <div
      className={cn('overflow-hidden', fill ? 'absolute inset-0' : !isPositioned(className) && 'relative', className)}
      style={boxStyle}
      data-loaded={loaded || undefined}
    >
      {failed ? (
        <div
          role="img"
          aria-label={alt || AppStrings.states.imageUnavailable}
          className="absolute inset-0 flex items-center justify-center bg-cream-deep text-ink-faint"
        >
          <ImageOff aria-hidden="true" className="size-[min(1.5rem,40%)]" />
        </div>
      ) : (
        <>
          {placeholder ? (
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0 transition-opacity duration-500',
                loaded ? 'opacity-0' : 'opacity-100',
              )}
            >
              {preview ? (
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
                  style={{ backgroundImage: `url("${previewUrl(src, width, height)}")` }}
                />
              ) : null}
              <div className="skeleton absolute inset-0 rounded-none opacity-80" />
            </div>
          ) : null}
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? (width ? `${width}px` : '100vw')}
            className={cn(
              'img-fade transition-opacity duration-500 ease-out',
              loaded ? 'opacity-100' : 'opacity-0',
              imgClassName ?? 'object-cover',
            )}
            onLoad={(event) => {
              setLoadedSrc(src);
              onLoad?.(event);
            }}
            onError={(event) => {
              setFailedSrc(src);
              onError?.(event);
            }}
            {...props}
          />
        </>
      )}
    </div>
  );
}
