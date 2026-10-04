import { ChevronDown } from 'lucide-react';
import { StateMessage } from '@/components/common/StateMessage';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionIds } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { getExperiences } from '@/services/experience.service';
import { getSkills } from '@/services/skill.service';
import type { Experience } from '@/types/experience';
import { formatMonthYear } from '@/utils/format';

function period(experience: Experience) {
  const start = formatMonthYear(experience.startDate);
  const end = experience.isCurrent ? AppStrings.experience.present : formatMonthYear(experience.endDate);
  return [start, end].filter(Boolean).join(' – ');
}

/** Compact one-row timeline in the same card language as the About section. */
export async function ExperienceSection() {
  const [{ data: experiences, error }, { data: skills }] = await Promise.all([getExperiences(), getSkills()]);
  const toolbox = (skills ?? []).filter((skill) => skill.featured);

  return (
    <section id={SectionIds.experience} aria-labelledby="experience-heading" className="py-5 sm:py-6">
      <Container size="wide" className="space-y-4">
        <SectionHeading
          id="experience-heading"
          bar
          eyebrow={AppStrings.experience.eyebrow}
          lead={AppStrings.experience.headingLead}
          accent={AppStrings.experience.headingAccent}
        />

        {error || !experiences ? (
          <StateMessage tone="error" title={AppStrings.states.unavailableTitle} />
        ) : experiences.length === 0 ? (
          <StateMessage title={AppStrings.experience.empty} />
        ) : (
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((experience) => (
              <li key={experience.id} className="flex">
                <Card as="article" className="flex w-full flex-col gap-2 p-4 shadow-soft">
                  <p className="flex items-center gap-2 text-xs font-medium text-ink-faint">
                    <span
                      aria-hidden="true"
                      className={experience.isCurrent ? 'size-2 rounded-full bg-accent-light' : 'size-2 rounded-full bg-line-strong'}
                    />
                    {period(experience)}
                  </p>
                  <h3 className="font-display text-[0.95rem] leading-snug font-semibold">
                    {experience.position}
                    <span className="block text-accent">{experience.company}</span>
                  </h3>
                  {experience.description ? (
                    <p className="text-[0.8rem] leading-relaxed text-ink-muted">{experience.description}</p>
                  ) : null}
                  {experience.highlights.length > 0 ? (
                    <details className="group mt-auto pt-1">
                      <summary className="flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-accent [&::-webkit-details-marker]:hidden">
                        {AppStrings.experience.highlights}
                        <ChevronDown aria-hidden="true" className="size-3.5 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="mt-2 space-y-1.5 text-[0.78rem] leading-relaxed text-ink-muted">
                        {experience.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2">
                            <span aria-hidden="true" className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-accent-light" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : null}
                </Card>
              </li>
            ))}
          </ol>
        )}

        {toolbox.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold tracking-wide text-ink-faint uppercase">
              {AppStrings.experience.toolbox}
            </span>
            <ul className="contents">
              {toolbox.map((skill) => (
                <li key={skill.id} className="rounded-md bg-accent-wash px-2.5 py-1 text-xs font-medium text-accent">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
