import { SmartImage } from '@/components/ui/SmartImage';
import { ImageSizes } from '@/constants/app_constants';
import type { ServiceFeature } from '@/types/profile';

export function ServiceFeatureCards({ features }: { features: ServiceFeature[] }) {
  if (features.length === 0) return null;
  return (
    <ul className="grid gap-3 xs:grid-cols-2">
      {features.map((feature) => (
        <li
          key={feature.id}
          className="flex items-center gap-3 rounded-card border border-line bg-surface px-3.5 py-4 shadow-soft transition duration-200 hover:shadow-card"
        >
          {feature.iconUrl ? (
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-wash">
              <SmartImage
                src={feature.iconUrl}
                alt=""
                width={1254}
                height={1254}
                sizes={ImageSizes.icon}
                preview={false}
                className="size-8 rounded-md"
                imgClassName="object-contain"
              />
            </span>
          ) : null}
          <div className="min-w-0">
            <h3 className="font-display text-[0.88rem] font-semibold xl:whitespace-nowrap">{feature.title}</h3>
            <p className="mt-0.5 text-[0.78rem] leading-snug text-ink-muted">{feature.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
