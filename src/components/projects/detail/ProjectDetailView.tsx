import { CheckCircle2 } from 'lucide-react';
import { TechIcon } from '@/components/common/TechIcon';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AppStrings } from '@/constants/app_strings';
import { ProjectMediaTypes } from '@/constants/supabase_tables';
import type { ProjectDetail, ProjectNeighbours, ProjectSummary } from '@/types/project';
import { toParagraphs } from '@/utils/format';
import { ProjectCard } from '../ProjectCard';
import { ProjectGallery } from './ProjectGallery';
import { ProjectHero } from './ProjectHero';
import { ProjectNav } from './ProjectNav';

type ProjectDetailViewProps = {
  project: ProjectDetail;
  neighbours: ProjectNeighbours;
  related: ProjectSummary[];
};

function SubHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="mb-4 flex items-center gap-2.5 font-display text-xl font-bold">
      <span aria-hidden="true" className="h-5 w-[3px] rounded-full bg-accent" />
      {children}
    </h2>
  );
}

export function ProjectDetailView({ project, neighbours, related }: ProjectDetailViewProps) {
  const screenshots = project.media.filter((media) => media.mediaType === ProjectMediaTypes.screenshot);
  const candidateFacts: Array<{ label: string; value: string | null }> = [
    { label: AppStrings.projectDetail.status, value: project.status },
    { label: AppStrings.projectDetail.projectType, value: project.projectType },
    { label: AppStrings.projectDetail.client, value: project.companyOrClient },
  ];
  const facts = candidateFacts.filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return (
    <article>
      <ProjectHero project={project} />

      <Container className="grid gap-10 py-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        <div className="space-y-10">
          {project.fullDescription ? (
            <section aria-labelledby="overview-heading">
              <SubHeading id="overview-heading">{AppStrings.projectDetail.overview}</SubHeading>
              <div className="space-y-4 text-[0.95rem] leading-relaxed text-ink-muted">
                {toParagraphs(project.fullDescription).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ) : null}

          {project.highlights.length > 0 ? (
            <section aria-labelledby="highlights-heading">
              <SubHeading id="highlights-heading">{AppStrings.projectDetail.highlights}</SubHeading>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight.id}
                    className="flex gap-3 rounded-2xl border border-line bg-surface p-4 shadow-soft"
                  >
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                    <div>
                      {highlight.heading ? (
                        <h3 className="font-display text-sm font-semibold">{highlight.heading}</h3>
                      ) : null}
                      <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{highlight.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="gallery-heading">
            <SubHeading id="gallery-heading">{AppStrings.projectDetail.gallery}</SubHeading>
            {screenshots.length > 0 ? (
              <ProjectGallery media={screenshots} />
            ) : (
              <p className="text-sm text-ink-muted">{AppStrings.projectDetail.noGallery}</p>
            )}
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
          {project.role ? (
            <Card as="section" aria-labelledby="role-heading" className="p-5">
              <h2 id="role-heading" className="font-display text-base font-bold">
                {AppStrings.projectDetail.myRole}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.role}</p>
            </Card>
          ) : null}

          {facts.length > 0 ? (
            <Card as="section" aria-labelledby="details-heading" className="p-5">
              <h2 id="details-heading" className="font-display text-base font-bold">
                {AppStrings.projectDetail.details}
              </h2>
              <dl className="mt-3 divide-y divide-line text-sm">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-ink-faint">{fact.label}</dt>
                    <dd className="text-right font-medium text-ink-soft">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          ) : null}

          {project.technologies.length > 0 ? (
            <Card as="section" aria-labelledby="stack-heading" className="p-5">
              <h2 id="stack-heading" className="font-display text-base font-bold">
                {AppStrings.projectDetail.techStack}
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {project.technologies.map((technology) => (
                  <li
                    key={technology.id}
                    className="flex items-center gap-2 rounded-xl bg-surface-soft px-3 py-2 text-sm text-ink-soft"
                  >
                    <TechIcon technology={technology} fallback="dot" className="size-5" />
                    {technology.name}
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </aside>
      </Container>

      <Container className="space-y-10 pb-4">
        <ProjectNav neighbours={neighbours} />

        {related.length > 0 ? (
          <section aria-labelledby="related-heading">
            <SectionHeading id="related-heading" bar lead={AppStrings.projectDetail.related} className="mb-6" />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="flex">
                  <ProjectCard project={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </article>
  );
}
