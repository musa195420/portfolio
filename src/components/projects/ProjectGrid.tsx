import { StateMessage } from '@/components/common/StateMessage';
import { AppStrings } from '@/constants/app_strings';
import type { ProjectSummary } from '@/types/project';
import { ProjectCard } from './ProjectCard';

const gridClasses = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3';

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
          <ProjectCard project={project} preload={index < 3} headingAs={cardHeadingAs} />
        </li>
      ))}
    </ul>
  );
}
