import { AssetFolders, StorageBuckets } from './storage_constants';

/**
 * Stable storage paths for site-chrome assets (decorations, brand mark, CTA
 * background). Portfolio content media (portraits, project images, logos,
 * technology icons) is referenced from Supabase tables instead.
 */
export const AssetPaths = {
  brandLogo: `${AssetFolders.icons}/brand-logo.png`,
  heroNoteIdeas: `${AssetFolders.decorations}/hero-note-ideas.png`,
  heroNoteCleanCode: `${AssetFolders.decorations}/hero-note-clean-code.png`,
  heroBuildCard: `${AssetFolders.decorations}/hero-build-card.png`,
  aboutPassionateNote: `${AssetFolders.decorations}/about-passionate-note.png`,
  contactCtaBackground: `${AssetFolders.backgrounds}/contact-cta.webp`,
} as const;

export type AssetPath = (typeof AssetPaths)[keyof typeof AssetPaths];

function supabaseProjectUrl(): URL {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!value) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL is required to build Supabase Storage asset URLs.',
    );
  }

  const url = new URL(value);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL must use http or https.');
  }
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (!isLocal && !url.hostname.endsWith('.supabase.co')) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL must point to a Supabase project.');
  }

  return url;
}

/** Builds the public URL for an object in a public Supabase Storage bucket. */
export function storagePublicUrl(
  path: string,
  bucket: string = StorageBuckets.portfolioAssets,
): string {
  const base = supabaseProjectUrl();
  const normalizedPath = path.replace(/^\/+/, '');
  const encodedPath = normalizedPath
    .split('/')
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join('/');
  return new URL(`/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodedPath}`, base).href;
}

/**
 * Normalizes a database storage value to this project's absolute Supabase URL.
 * Absolute values are reduced to their object path, so a stale/site origin can
 * never leak into rendered asset URLs.
 */
export function normalizeStoragePublicUrl(value: string | null | undefined): string | null {
  if (!value) return null;

  const marker = '/storage/v1/object/public/';
  const markerIndex = value.indexOf(marker);
  if (/^https?:\/\//i.test(value) && markerIndex < 0) {
    throw new Error(`Expected a Supabase Storage URL: ${value}`);
  }

  const storagePath = value.replace(/^\/+/, '');
  const bucketPrefix = `${StorageBuckets.portfolioAssets}/`;
  const pathWithBucket =
    markerIndex >= 0
      ? value.slice(markerIndex + marker.length)
      : storagePath.startsWith(bucketPrefix)
        ? storagePath
        : `${bucketPrefix}${storagePath}`;
  const [bucket, ...pathParts] = pathWithBucket.split('/');

  if (!bucket || pathParts.length === 0) {
    throw new Error(`Invalid Supabase Storage asset path: ${value}`);
  }

  return storagePublicUrl(pathParts.join('/'), bucket);
}

export const assetUrl = (path: AssetPath) => storagePublicUrl(path);
