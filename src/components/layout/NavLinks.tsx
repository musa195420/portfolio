'use client';

import Link from 'next/link';
import { AppStrings } from '@/constants/app_strings';
import { NavItems } from '@/constants/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/utils/cn';

export function NavLinks() {
  const active = useActiveSection();
  return (
    <nav aria-label={AppStrings.a11y.primaryNav} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NavItems.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors',
                  isActive ? 'bg-accent-wash text-accent' : 'text-ink-soft hover:text-accent',
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
