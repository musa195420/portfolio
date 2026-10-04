import type { ElementType } from 'react';
import { cn } from '@/utils/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  lead: string;
  accent?: string;
  /** Render accent on its own line (e.g. About section). */
  stacked?: boolean;
  as?: ElementType;
  id?: string;
  className?: string;
  bar?: boolean;
};

export function Eyebrow({ children, className, marker }: { children: string; className?: string; marker?: boolean }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 font-display text-xs font-semibold tracking-[0.14em] text-accent uppercase',
        className,
      )}
    >
      {marker ? <span aria-hidden="true" className="size-1.5 rotate-45 rounded-[1px] bg-accent-light" /> : null}
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  lead,
  accent,
  stacked,
  as: Heading = 'h2',
  id,
  className,
  bar,
}: SectionHeadingProps) {
  return (
    <div className={cn(bar && 'border-l-[3px] border-accent pl-4 sm:ml-4', className)}>
      {eyebrow ? <Eyebrow className="mb-2">{eyebrow}</Eyebrow> : null}
      <Heading id={id} className="text-section font-bold">
        {lead}
        {accent ? (
          <>
            {stacked ? <br /> : ' '}
            <span className="text-accent">{accent}</span>
          </>
        ) : null}
      </Heading>
    </div>
  );
}
