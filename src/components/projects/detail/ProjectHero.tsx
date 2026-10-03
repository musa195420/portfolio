import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { RemoteImage } from '@/components/ui/RemoteImage';
import { Container } from '@/components/ui/Container';
import { ImageSizes } from '@/constants/app_constants';
import { AppRoutes } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { ProjectMediaTypes } from '@/constants/supabase_tables';
import type { ProjectDetail } from '@/types/project';
import { ProjectLinks } from './ProjectLinks';

export function ProjectHero({ project }: { project: ProjectDetail }) {
  const banner = project.media.find((media) => media.mediaType === ProjectMediaTypes.banner);
  const bannerUrl = project.bannerUrl ?? banner?.url ?? null;
  const width = banner?.width ?? 1536;
  const height = banner?.height ?? 1024;

  return (
    <section aria-labelledby="project-heading" className="hero-backdrop">
      <Container className="grid items-center gap-8 pt-6 pb-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:pt-8 lg:pb-14">
        <div className="space-y-5">
          <Link
            href={AppRoutes.projects}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {AppStrings.projectDetail.backToProjects}
          </Link>

          <div className="flex items-center gap-4">
            <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-line bg-surface shadow-card sm:size-20">
              <RemoteImage
                src={project.logoUrl}
                alt={AppStrings.a11y.projectLogo(project.name)}
                fill
                sizes={ImageSizes.logo}
                priority
                className="object-cover"
              />
            </span>
            <div>
              {project.projectType ? (
                <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">{project.projectType}</p>
              ) : null}
              <h1 id="project-heading" className="text-section font-bold">
                {project.name}
              </h1>
            </div>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{project.shortDescription}</p>

          {project.technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label={AppStrings.projectDetail.techStack}>
              {project.technologies.map((technology) => (
                <li
                  key={technology.id}
                  className="rounded-lg border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-soft shadow-soft"
                >
                  {technology.name}
                </li>
              ))}
            </ul>
          ) : null}

          <ProjectLinks project={project} />
        </div>

        <div className="relative overflow-hidden rounded-panel border border-line bg-cream-deep shadow-lift">
          <RemoteImage
            src={bannerUrl}
            alt={banner?.alt ?? project.name}
            width={width}
            height={height}
            sizes={ImageSizes.detailBanner}
            priority
            className="h-auto w-full"
            fallbackClassName="aspect-[3/2] w-full"
          />
        </div>
      </Container>
    </section>
  );
}
