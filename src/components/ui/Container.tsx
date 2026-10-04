import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

type ContainerProps = ComponentPropsWithoutRef<'div'> & {
  /** `wide` runs nearly edge to edge (cards, strips, CTA); `default` is the hero/text column. */
  size?: 'default' | 'wide';
};

export function Container({ className, size = 'default', ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        size === 'wide' ? 'max-w-[1416px] xl:px-11' : 'max-w-[1240px]',
        className,
      )}
      {...props}
    />
  );
}
