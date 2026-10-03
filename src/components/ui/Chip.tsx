import Image from 'next/image';
import { cn } from '@/utils/cn';

type ChipProps = {
  label: string;
  iconUrl?: string | null;
  className?: string;
};

export function Chip({ label, iconUrl, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1 text-[0.72rem] font-medium text-ink-muted',
        className,
      )}
    >
      {iconUrl ? <Image src={iconUrl} alt="" width={14} height={14} className="size-3.5 object-contain" /> : null}
      {label}
    </span>
  );
}
