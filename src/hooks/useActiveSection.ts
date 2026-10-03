'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppRoutes, SectionIds, type SectionId } from '@/constants/app_routes';

const sectionOrder = Object.values(SectionIds);

/**
 * Tracks which homepage section is in view. Off the homepage, derives the
 * active item from the current route instead.
 */
export function useActiveSection(): SectionId | null {
  const pathname = usePathname();
  const isHome = pathname === AppRoutes.home;
  const [active, setActive] = useState<SectionId>(SectionIds.home);

  useEffect(() => {
    if (!isHome) return;
    const elements = sectionOrder
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        const current = sectionOrder.find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);

  if (isHome) return active;
  if (pathname.startsWith(AppRoutes.projects)) return SectionIds.projects;
  if (pathname.startsWith(AppRoutes.contact)) return SectionIds.contact;
  return null;
}
