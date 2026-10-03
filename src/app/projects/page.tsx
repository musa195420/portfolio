import type { Metadata } from 'next';
import { ContactCta } from '@/components/contact/ContactCta';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AppRoutes } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { getAllProjects } from '@/services/project.service';

// Must be a literal for static analysis; keep in sync with AppConfig.revalidateSeconds.
export const revalidate = 300;

export const metadata: Metadata = {
  title: AppStrings.meta.projectsTitle,
  description: AppStrings.meta.projectsDescription,
  alternates: { canonical: AppRoutes.projects },
  openGraph: { title: AppStrings.meta.projectsTitle, description: AppStrings.meta.projectsDescription, url: AppRoutes.projects },
};

export default async function ProjectsPage() {
  const { data, error } = await getAllProjects();
  return (
    <>
      <section aria-labelledby="all-projects-heading" className="hero-backdrop py-10 sm:py-14">
        <Container>
          <SectionHeading
            as="h1"
            id="all-projects-heading"
            bar
            eyebrow={AppStrings.projects.allEyebrow}
            lead={AppStrings.projects.allHeadingLead}
            accent={AppStrings.projects.allHeadingAccent}
          />
          <p className="mt-3 mb-8 max-w-2xl text-ink-muted">{AppStrings.projects.allDescription}</p>
          <ProjectGrid projects={data} error={error} cardHeadingAs="h2" />
        </Container>
      </section>
      <ContactCta anchor={false} source={AppRoutes.projects} />
    </>
  );
}
