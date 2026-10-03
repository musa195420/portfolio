import { cn } from '@/utils/cn';

/** Shimmer placeholder block. Hidden from assistive technology. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('skeleton rounded-xl', className)} />;
}
