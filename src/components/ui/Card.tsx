import type { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/utils/cn';

type CardProps<T extends ElementType> = {
  as?: T;
  interactive?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export function Card<T extends ElementType = 'div'>({ as, interactive, className, ...props }: CardProps<T>) {
  const Component: ElementType = as ?? 'div';
  return (
    <Component
      className={cn(
        'rounded-card border border-line bg-surface shadow-card',
        interactive && 'transition duration-300 hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
      {...props}
    />
  );
}
