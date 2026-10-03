import 'server-only';
import { cache } from 'react';
import { mapSocialLink } from '@/features/profile/profile.mapper';
import { selectSocialLinks } from '@/repositories/profile.repository';
import { runQuery } from './service-result';

export const getSocialLinks = cache(async () => {
  const result = await runQuery('social_links', selectSocialLinks, (rows) => (rows ?? []).map(mapSocialLink));
  return result.data ?? [];
});
