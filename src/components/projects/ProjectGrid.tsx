import { StateMessage } from '@/components/common/StateMessage';
import { Skeleton } from '@/components/ui/Skeleton';
import { AppStrings } from '@/constants/app_strings';
import type { ProjectSummary } from '@/types/project';
import { ProjectCard } from './ProjectCard';

const gridClasses = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3';

type ProjectGridProps = {
  projects: ProjectSummary[] | null;
  error: string | null;
  cardHeadingAs?: 'h2' | 'h3';
};

export function ProjectGrid({ projects, error, cardHeadingAs }: ProjectGridProps) {
  if (error || !projects) {
    return (
      <StateMessage
        tone="error"
        title={AppStrings.states.unavailableTitle}
        description={AppStrings.states.unavailableBody}
      />
    );
  }
  if (projects.length === 0) {
    return <StateMessage title={AppStrings.projects.empty} description={AppStrings.projects.emptyHint} />;
  }
  return (
    <ul className={gridClasses}>
      {projects.map((project, index) => (
        <li key={project.id} className="flex">
          <ProjectCard project={project} priority={index < 3} headingAs={cardHeadingAs} />
        </li>
      ))}
    </ul>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <ul className={gridClasses} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
          <Skeleton className="aspect-[12/5] rounded-none" />
          <div className="space-y-3 p-5">
            <div className="flex gap-3">
              <Skeleton className="size-11" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-14" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
