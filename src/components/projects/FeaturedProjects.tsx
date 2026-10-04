import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AppRoutes, SectionIds } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { getFeaturedProjects } from '@/services/project.service';
import { ProjectGrid } from './ProjectGrid';

function FeaturedProjectsShell({ children }: { children: React.ReactNode }) {
  return (
    <section id={SectionIds.projects} aria-labelledby="projects-heading" className="pt-5 pb-3 sm:pt-6">
      <Container size="wide">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4 sm:mb-5">
          <SectionHeading
            id="projects-heading"
            bar
            eyebrow={AppStrings.projects.eyebrow}
            lead={AppStrings.projects.headingLead}
            accent={AppStrings.projects.headingAccent}
          />
          <Link
            href={AppRoutes.projects}
            className="group inline-flex items-center gap-2 border-b border-ink/70 pb-0.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {AppStrings.projects.viewAll}
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        {children}
      </Container>
    </section>
  );
}

export async function FeaturedProjects() {
  const { data, error } = await getFeaturedProjects();
  return (
    <FeaturedProjectsShell>
      <ProjectGrid projects={data} error={error} />
    </FeaturedProjectsShell>
  );
}
