import { Briefcase, Layers, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AppStrings } from '@/constants/app_strings';
import type { Profile } from '@/types/profile';
import { formatStat } from '@/utils/format';

type Stat = { value: string; label: string; Icon: LucideIcon };

export function HeroStats({ profile }: { profile: Profile }) {
  const candidates: Array<{ value: string | null; label: string; Icon: LucideIcon }> = [
    { value: formatStat(profile.yearsExperience), label: AppStrings.hero.statExperience, Icon: Briefcase },
    { value: formatStat(profile.projectsCompleted), label: AppStrings.hero.statProjects, Icon: Layers },
    { value: formatStat(profile.usersReached), label: AppStrings.hero.statUsers, Icon: Users },
  ];
  const stats = candidates.filter((stat): stat is Stat => stat.value !== null);
  if (stats.length === 0) return null;

  return (
    <ul className="grid max-w-[41rem] grid-cols-3 gap-2.5 sm:gap-4">
      {stats.map(({ value, label, Icon }) => (
        <li
          key={label}
          className="flex flex-col items-start gap-2 rounded-xl border border-line bg-surface/90 p-3 shadow-soft sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3.5"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-wash sm:size-11">
            <Icon aria-hidden="true" strokeWidth={1.75} className="size-5 fill-accent-light text-accent sm:size-[22px]" />
          </span>
          <p className="flex flex-col">
            <span className="font-display text-lg leading-tight font-bold text-ink sm:text-[1.6rem]">{value}</span>
            <span className="text-[0.7rem] leading-tight text-ink-muted sm:text-[0.8rem] lg:whitespace-nowrap">{label}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
