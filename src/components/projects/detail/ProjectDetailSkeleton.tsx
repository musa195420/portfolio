import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';
import { AppStrings } from '@/constants/app_strings';

export function ProjectDetailSkeleton() {
  return (
    <div aria-busy="true">
      <span className="sr-only" role="status">
        {AppStrings.states.loading}
      </span>
      <Container className="grid items-center gap-8 py-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <div className="space-y-5">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-4">
            <Skeleton className="size-20 rounded-2xl" />
            <Skeleton className="h-10 w-56" />
          </div>
          <Skeleton className="h-16 w-full max-w-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-7 w-20" />
          </div>
          <Skeleton className="h-12 w-44" />
        </div>
        <Skeleton className="aspect-[3/2] w-full rounded-panel" />
      </Container>
      <Container className="grid gap-10 pb-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-32 w-full" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="aspect-[3/2] rounded-card" />
            <Skeleton className="aspect-[3/2] rounded-card" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-32 rounded-card" />
          <Skeleton className="h-40 rounded-card" />
        </div>
      </Container>
    </div>
  );
}
