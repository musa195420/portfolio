import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StateMessage } from '@/components/common/StateMessage';
import { ContactCta } from '@/components/contact/ContactCta';
import { ProjectDetailView } from '@/components/projects/detail/ProjectDetailView';
import { Container } from '@/components/ui/Container';
import { AppRoutes } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { findNeighbours, findRelated, getAllProjects, getProjectBySlug } from '@/services/project.service';
import { getProfile } from '@/services/profile.service';
import type { ProjectDetail } from '@/types/project';

// Must be a literal for static analysis; keep in sync with AppConfig.revalidateSeconds.
export const revalidate = 300;

/** Pre-render every published project; new slugs render on demand. */
export async function generateStaticParams() {
  const { data } = await getAllProjects();
  return (data ?? []).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const { data: project } = await getProjectBySlug(slug);
  if (!project) return { title: AppStrings.states.projectNotFoundTitle };

  const title = project.seoTitle ?? project.name;
  const description = project.seoDescription ?? project.shortDescription;
  const url = AppRoutes.project(project.slug);
  const images = project.bannerUrl ? [{ url: project.bannerUrl, alt: project.name }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'article', title, description, url, images, modifiedTime: project.updatedAt },
    twitter: { card: 'summary_large_image', title, description, images: project.bannerUrl ? [project.bannerUrl] : undefined },
  };
}

function projectJsonLd(project: ProjectDetail, author: string | undefined) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.seoDescription ?? project.shortDescription,
    applicationCategory: project.projectType ?? undefined,
    operatingSystem: [project.appStoreUrl && 'iOS', project.playStoreUrl && 'Android'].filter(Boolean).join(', ') || undefined,
    image: project.bannerUrl ?? undefined,
    author: author ? { '@type': 'Person', name: author } : undefined,
    sameAs: [project.appStoreUrl, project.playStoreUrl, project.githubUrl, project.websiteUrl].filter(Boolean),
  };
  // Escape "<" so content can never close the script tag.
  return JSON.stringify(json).replace(/</g, '\\u003c');
}

export default async function ProjectPage({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params;
  const [{ data: project, error }, { data: allProjects }, { data: profile }] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects(),
    getProfile(),
  ]);

  if (error) {
    return (
      <Container className="py-16">
        <StateMessage
          tone="error"
          title={AppStrings.states.unavailableTitle}
          description={AppStrings.states.unavailableBody}
        />
      </Container>
    );
  }
  if (!project) notFound();

  const projects = allProjects ?? [];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: projectJsonLd(project, profile?.fullName) }} />
      <ProjectDetailView
        project={project}
        neighbours={findNeighbours(projects, project.slug)}
        related={findRelated(projects, project)}
      />
      <ContactCta anchor={false} source={AppRoutes.project(project.slug)} />
    </>
  );
}
