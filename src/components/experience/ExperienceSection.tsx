import { BriefcaseBusiness } from 'lucide-react';
import { StateMessage } from '@/components/common/StateMessage';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionIds } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { groupSkills } from '@/features/skills/skill.mapper';
import { getExperiences } from '@/services/experience.service';
import { getSkills } from '@/services/skill.service';
import type { Experience } from '@/types/experience';
import { formatMonthYear } from '@/utils/format';

function period(experience: Experience) {
  const start = formatMonthYear(experience.startDate);
  const end = experience.isCurrent ? AppStrings.experience.present : formatMonthYear(experience.endDate);
  return [start, end].filter(Boolean).join(' – ');
}

export async function ExperienceSection() {
  const [{ data: experiences, error }, { data: skills }] = await Promise.all([getExperiences(), getSkills()]);
  const skillGroups = groupSkills(skills ?? [], AppStrings.experience.toolbox);

  return (
    <section id={SectionIds.experience} aria-labelledby="experience-heading" className="py-10 sm:py-14">
      <Container>
        <SectionHeading
          id="experience-heading"
          bar
          eyebrow={AppStrings.experience.eyebrow}
          lead={AppStrings.experience.headingLead}
          accent={AppStrings.experience.headingAccent}
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {error || !experiences ? (
            <StateMessage tone="error" title={AppStrings.states.unavailableTitle} />
          ) : experiences.length === 0 ? (
            <StateMessage title={AppStrings.experience.empty} />
          ) : (
            <ol className="relative space-y-4 border-l-2 border-accent-soft pl-6 sm:pl-8">
              {experiences.map((experience) => (
                <li key={experience.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-5 -left-[2.05rem] flex size-6 items-center justify-center rounded-full border-2 border-accent-soft bg-surface text-accent sm:-left-[2.55rem]"
                  >
                    <BriefcaseBusiness className="size-3" />
                  </span>
                  <Card as="article" className="p-5 shadow-soft">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-base font-semibold">
                        {experience.position}
                        <span className="text-accent"> · {experience.company}</span>
                      </h3>
                      <p className="text-xs font-medium text-ink-faint">{period(experience)}</p>
                    </div>
                    {experience.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{experience.description}</p>
                    ) : null}
                    {experience.highlights.length > 0 ? (
                      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-muted">
                        {experience.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2">
                            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-light" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </Card>
                </li>
              ))}
            </ol>
          )}

          {skillGroups.length > 0 ? (
            <Card as="aside" aria-labelledby="toolbox-heading" className="h-fit p-5 shadow-soft lg:sticky lg:top-28">
              <h3 id="toolbox-heading" className="font-display text-base font-semibold">
                {AppStrings.experience.toolbox}
              </h3>
              <div className="mt-4 space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.category}>
                    <p className="mb-2 text-xs font-semibold tracking-wide text-ink-faint uppercase">{group.category}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <li
                          key={skill.id}
                          className={
                            skill.featured
                              ? 'rounded-lg bg-accent-wash px-2.5 py-1 text-xs font-medium text-accent'
                              : 'rounded-lg border border-line px-2.5 py-1 text-xs text-ink-muted'
                          }
                        >
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
