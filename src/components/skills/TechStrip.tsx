import { StateMessage } from '@/components/common/StateMessage';
import { TechIcon } from '@/components/common/TechIcon';
import { Container } from '@/components/ui/Container';
import { SectionIds } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { getSiteSettings } from '@/services/profile.service';
import { getStripTechnologies } from '@/services/skill.service';

export async function TechStrip() {
  const [{ data: technologies, error }, settings] = await Promise.all([getStripTechnologies(), getSiteSettings()]);

  return (
    <section id={SectionIds.skills} aria-labelledby="skills-heading" className="relative z-10 -mt-3 pb-2 lg:-mt-6">
      <Container size="wide">
        <div className="grid gap-5 rounded-[1.25rem] border border-line bg-surface px-5 py-6 shadow-card sm:px-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-10 lg:py-4 xl:grid-cols-[auto_minmax(0,1fr)_auto]">
          <div>
            <span aria-hidden="true" className="mb-2 block h-[3px] w-8 rounded-full bg-accent-light" />
            <h2 id="skills-heading" className="font-display text-xl leading-snug font-semibold lg:pr-6">
              {AppStrings.skills.eyebrowLine1}
              <br />
              <span className="font-bold">{AppStrings.skills.eyebrowLine2}</span>
            </h2>
          </div>

          {error || !technologies ? (
            <StateMessage tone="error" title={AppStrings.states.unavailableTitle} className="py-6" />
          ) : technologies.length === 0 ? (
            <p className="text-sm text-ink-muted">{AppStrings.skills.emptyTechnologies}</p>
          ) : (
            <ul className="scrollbar-none -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 xl:justify-center xl:overflow-visible">
              {technologies.map((technology) => (
                <li
                  key={technology.id}
                  className="flex h-[6.1rem] w-[5.6rem] shrink-0 snap-start flex-col items-center justify-center gap-2.5 rounded-xl border border-line/80 bg-surface-soft/50 px-2 text-center shadow-soft transition duration-200 hover:-translate-y-0.5 hover:shadow-card"
                >
                  <TechIcon technology={technology} className="size-9" />
                  <span className="text-[0.74rem] leading-tight font-medium text-ink-soft">{technology.name}</span>
                </li>
              ))}
            </ul>
          )}

          {settings.technologiesTagline.length > 0 ? (
            <div className="hidden border-l border-line pl-8 xl:block">
              <ul className="space-y-1 text-[0.92rem] text-ink-muted">
                {settings.technologiesTagline.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <span aria-hidden="true" className="mt-2 block h-[3px] w-8 rounded-full bg-accent-light" />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
