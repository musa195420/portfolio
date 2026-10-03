'use client';

import { Download, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { buttonStyles } from '@/components/ui/Button';
import { AppStrings } from '@/constants/app_strings';
import { NavItems } from '@/constants/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/utils/cn';

export function MobileMenu({ resumeUrl }: { resumeUrl: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const active = useActiveSection();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close when the route changes.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? AppStrings.a11y.closeMenu : AppStrings.a11y.openMenu}
        onClick={() => setOpen((value) => !value)}
        className="flex size-11 items-center justify-center rounded-xl border border-line bg-surface text-ink shadow-soft"
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 bg-ink/20 backdrop-blur-[2px]"
        onClick={close}
      >
        <nav
          aria-label={AppStrings.a11y.mobileNav}
          className="mx-4 mt-2 rounded-panel border border-line bg-surface p-3 shadow-lift"
          onClick={(event) => event.stopPropagation()}
        >
          <ul className="flex flex-col">
            {NavItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={item.id === active ? 'page' : undefined}
                  className={cn(
                    'block rounded-xl px-4 py-3 font-display text-base font-medium',
                    item.id === active ? 'bg-accent-wash text-accent' : 'text-ink-soft',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className={buttonStyles('primary', 'md', 'mt-3 w-full')}
            >
              <Download aria-hidden="true" className="size-4" />
              {AppStrings.nav.downloadCv}
            </a>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
