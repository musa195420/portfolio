import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export function HeroSkeleton() {
  return (
    <Container className="grid items-center gap-10 py-8 lg:grid-cols-[1.08fr_1fr]">
      <div className="space-y-6">
        <Skeleton className="h-8 w-60 rounded-full" />
        <Skeleton className="h-16 w-full max-w-xl" />
        <Skeleton className="h-16 w-2/3" />
        <Skeleton className="h-20 w-full max-w-lg" />
        <div className="flex gap-4">
          <Skeleton className="h-14 w-48" />
          <Skeleton className="h-14 w-40" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>
      <Skeleton className="mx-auto aspect-[4/5] w-full max-w-md rounded-t-full" />
    </Container>
  );
}
