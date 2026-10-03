import { BriefcaseBusiness, Layers, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AppStrings } from '@/constants/app_strings';
import type { Profile } from '@/types/profile';
import { formatStat } from '@/utils/format';

type Stat = { value: string; label: string; Icon: LucideIcon };

export function HeroStats({ profile }: { profile: Profile }) {
  const candidates: Array<{ value: string | null; label: string; Icon: LucideIcon }> = [
    { value: formatStat(profile.yearsExperience), label: AppStrings.hero.statExperience, Icon: BriefcaseBusiness },
    { value: formatStat(profile.projectsCompleted), label: AppStrings.hero.statProjects, Icon: Layers },
    { value: formatStat(profile.usersReached), label: AppStrings.hero.statUsers, Icon: UsersRound },
  ];
  const stats = candidates.filter((stat): stat is Stat => stat.value !== null);

  if (stats.length === 0) return null;

  return (
    <ul className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {stats.map(({ value, label, Icon }) => (
        <li
          key={label}
          className="flex flex-col items-start gap-2 rounded-2xl border border-line bg-surface/90 p-3 shadow-soft sm:flex-row sm:items-center sm:gap-3 sm:p-4"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-wash text-accent sm:size-11">
            <Icon aria-hidden="true" className="size-[18px] sm:size-5" />
          </span>
          <p className="flex flex-col">
            <span className="font-display text-lg leading-tight font-bold text-ink sm:text-2xl">{value}</span>
            <span className="text-[0.7rem] leading-tight text-ink-muted sm:text-xs">{label}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
