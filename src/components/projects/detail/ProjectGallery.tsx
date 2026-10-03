'use client';

import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { RemoteImage } from '@/components/ui/RemoteImage';
import { ImageSizes } from '@/constants/app_constants';
import { AppStrings } from '@/constants/app_strings';
import type { ProjectMedia } from '@/types/project';

/** Screenshot grid with an accessible <dialog> lightbox. */
export function ProjectGallery({ media }: { media: ProjectMedia[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : media[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const step = (delta: number) =>
    setIndex((value) => (value === null ? value : (value + delta + media.length) % media.length));

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2">
        {media.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-label={AppStrings.a11y.openImage(itemIndex + 1)}
              className="group relative block w-full overflow-hidden rounded-card border border-line bg-cream-deep shadow-card"
            >
              <RemoteImage
                src={item.url}
                alt={item.alt}
                width={item.width ?? 1536}
                height={item.height ?? 1024}
                sizes={ImageSizes.gallery}
                className="h-auto w-full transition duration-500 group-hover:scale-[1.02]"
                fallbackClassName="aspect-[3/2] w-full"
              />
              <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-surface/90 text-ink opacity-0 shadow-card transition group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand aria-hidden="true" className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') step(1);
          if (event.key === 'ArrowLeft') step(-1);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIndex(null);
        }}
        aria-label={current?.alt}
        className="m-auto max-h-[92dvh] w-[min(92vw,1200px)] overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <div className="relative">
            <RemoteImage
              src={current.url}
              alt={current.alt}
              width={current.width ?? 1536}
              height={current.height ?? 1024}
              sizes="92vw"
              quality={85}
              className="max-h-[86dvh] w-full rounded-card object-contain"
            />
            <p className="mt-3 text-center text-sm text-white/85">
              {current.alt} · {(index ?? 0) + 1} / {media.length}
            </p>
            <button
              type="button"
              onClick={() => setIndex(null)}
              aria-label={AppStrings.a11y.closeGallery}
              className="absolute -top-3 -right-3 flex size-10 items-center justify-center rounded-full bg-surface text-ink shadow-lift"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
            {media.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={AppStrings.a11y.previousImage}
                  className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-lift"
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={AppStrings.a11y.nextImage}
                  className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-ink shadow-lift"
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
