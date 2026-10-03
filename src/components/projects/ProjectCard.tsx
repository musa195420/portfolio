import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { RemoteImage } from '@/components/ui/RemoteImage';
import { Chip } from '@/components/ui/Chip';
import { ImageSizes } from '@/constants/app_constants';
import { AppRoutes } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import type { ProjectSummary } from '@/types/project';

const MAX_CHIPS = 4;

type ProjectCardProps = {
  project: ProjectSummary;
  priority?: boolean;
  /** Card title level; h3 under a section h2, h2 directly under a page h1. */
  headingAs?: 'h2' | 'h3';
};

export function ProjectCard({ project, priority, headingAs: Heading = 'h3' }: ProjectCardProps) {
  const href = AppRoutes.project(project.slug);
  return (
    <Card as="article" interactive className="group relative flex flex-col overflow-hidden">
      <div className="relative aspect-[12/5] overflow-hidden bg-cream-deep">
        <RemoteImage
          src={project.bannerUrl}
          alt=""
          fill
          sizes={ImageSizes.projectCard}
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="relative size-11 shrink-0 overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
            <RemoteImage
              src={project.logoUrl}
              alt={AppStrings.a11y.projectLogo(project.name)}
              fill
              sizes={ImageSizes.logo}
              className="object-cover"
            />
          </span>
          <div className="min-w-0 flex-1">
            <Heading className="font-display text-base leading-snug font-semibold">
              <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
                {project.name}
              </Link>
            </Heading>
            <p className="mt-0.5 line-clamp-2 text-[0.8rem] leading-relaxed text-ink-muted">
              {project.shortDescription}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent transition-colors group-hover:bg-accent group-hover:text-white"
          >
            <ArrowRight className="size-4" />
          </span>
        </div>

        {project.technologies.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-1.5" aria-label={AppStrings.projectDetail.techStack}>
            {project.technologies.slice(0, MAX_CHIPS).map((technology) => (
              <li key={technology.id}>
                <Chip label={technology.name} iconUrl={technology.iconUrl} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {/* Keyboard focus ring for the stretched link */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card ring-accent ring-offset-2 group-has-[a:focus-visible]:ring-2"
      />
    </Card>
  );
}
