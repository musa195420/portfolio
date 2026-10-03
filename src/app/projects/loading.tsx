import { ProjectGridSkeleton } from '@/components/projects/ProjectGrid';
import { Container } from '@/components/ui/Container';
import { Skeleton } from '@/components/ui/Skeleton';
import { AppStrings } from '@/constants/app_strings';

export default function Loading() {
  return (
    <Container className="space-y-6 py-14" aria-busy="true">
      <span className="sr-only" role="status">
        {AppStrings.states.loading}
      </span>
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-10 w-72" />
      <ProjectGridSkeleton />
    </Container>
  );
}
