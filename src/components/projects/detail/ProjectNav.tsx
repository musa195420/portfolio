import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AppRoutes } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import type { ProjectNeighbours } from '@/types/project';
import { cn } from '@/utils/cn';

export function ProjectNav({ neighbours }: { neighbours: ProjectNeighbours }) {
  const items = [
    { project: neighbours.previous, label: AppStrings.projectDetail.previous, direction: 'prev' as const },
    { project: neighbours.next, label: AppStrings.projectDetail.next, direction: 'next' as const },
  ];
  if (!neighbours.previous && !neighbours.next) return null;

  return (
    <nav aria-label={AppStrings.a11y.projectNav} className="grid gap-4 sm:grid-cols-2">
      {items.map(({ project, label, direction }) =>
        project ? (
          <Link
            key={direction}
            href={AppRoutes.project(project.slug)}
            rel={direction}
            className={cn(
              'group flex items-center gap-4 rounded-card border border-line bg-surface p-5 shadow-soft transition hover:shadow-card',
              direction === 'next' && 'sm:flex-row-reverse sm:text-right',
            )}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              {direction === 'prev' ? (
                <ArrowLeft aria-hidden="true" className="size-4" />
              ) : (
                <ArrowRight aria-hidden="true" className="size-4" />
              )}
            </span>
            <span>
              <span className="block text-xs text-ink-faint">{label}</span>
              <span className="font-display font-semibold text-ink">{project.name}</span>
            </span>
          </Link>
        ) : (
          <span key={direction} aria-hidden="true" />
        ),
      )}
    </nav>
  );
}
