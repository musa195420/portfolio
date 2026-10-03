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

/** Builds the public URL for an object in a public Supabase Storage bucket. */
export function storagePublicUrl(
  path: string,
  bucket: string = StorageBuckets.portfolioAssets,
): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '') ?? '';
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  return `${base}/storage/v1/object/public/${bucket}/${encodedPath}`;
}

export const assetUrl = (path: AssetPath) => storagePublicUrl(path);
