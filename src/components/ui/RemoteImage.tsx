'use client';

import Image, { type ImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';
import { useState } from 'react';
import { AppStrings } from '@/constants/app_strings';
import { cn } from '@/utils/cn';

type RemoteImageProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
  fallbackClassName?: string;
};

/**
 * next/image wrapper for Supabase Storage media that shows a graceful
 * placeholder when the URL is missing or fails to load.
 */
export function RemoteImage({ src, alt, className, fallbackClassName, onError, ...props }: RemoteImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt || AppStrings.states.imageUnavailable}
        className={cn(
          'flex items-center justify-center bg-cream-deep text-ink-faint',
          props.fill && 'absolute inset-0',
          fallbackClassName ?? className,
        )}
      >
        <ImageOff aria-hidden="true" className="size-6" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        setFailedSrc(src);
        onError?.(event);
      }}
      {...props}
    />
  );
}
