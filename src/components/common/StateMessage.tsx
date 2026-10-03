import { AlertTriangle, Inbox } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type StateMessageProps = {
  tone?: 'empty' | 'error';
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  /** Heading level for the title; use 'h1' when the message is the whole page. */
  titleAs?: 'h1' | 'h2' | 'h3';
};

/** Shared empty / error state panel. */
export function StateMessage({
  tone = 'empty',
  title,
  description,
  action,
  className,
  titleAs: Title = 'h3',
}: StateMessageProps) {
  const Icon = tone === 'error' ? AlertTriangle : Inbox;
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex flex-col items-center gap-3 rounded-card border border-dashed border-line-strong bg-surface/70 px-6 py-12 text-center',
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-accent-wash text-accent">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <Title className="text-lg font-semibold">{title}</Title>
      {description ? <p className="max-w-md text-sm text-ink-muted">{description}</p> : null}
      {action}
    </div>
  );
}
