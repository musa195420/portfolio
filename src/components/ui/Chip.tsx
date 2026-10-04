import { cn } from '@/utils/cn';
import { SmartImage } from './SmartImage';

type ChipProps = {
  label: string;
  iconUrl?: string | null;
  className?: string;
};

export function Chip({ label, iconUrl, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 text-[0.74rem] font-medium text-ink-soft',
        className,
      )}
    >
      {iconUrl ? (
        <SmartImage
          src={iconUrl}
          alt=""
          width={1254}
          height={1254}
          sizes="32px"
          preview={false}
          className="size-3.5 rounded-sm"
          imgClassName="object-contain"
        />
      ) : null}
      {label}
    </span>
  );
}
