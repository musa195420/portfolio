import Image from 'next/image';
import { ImageSizes } from '@/constants/app_constants';
import type { ServiceFeature } from '@/types/profile';

export function ServiceFeatureCards({ features }: { features: ServiceFeature[] }) {
  if (features.length === 0) return null;
  return (
    <ul className="grid gap-3 xs:grid-cols-2">
      {features.map((feature) => (
        <li
          key={feature.id}
          className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-soft transition duration-200 hover:shadow-card"
        >
          {feature.iconUrl ? (
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-wash">
              <Image
                src={feature.iconUrl}
                alt=""
                width={48}
                height={48}
                sizes={ImageSizes.icon}
                className="size-8 object-contain"
              />
            </span>
          ) : null}
          <div>
            <h3 className="font-display text-sm font-semibold">{feature.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{feature.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
