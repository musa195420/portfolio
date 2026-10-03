import 'server-only';
import { cache } from 'react';
import {
  emptySiteSettings,
  mapProfile,
  mapServiceFeature,
  mapSiteSettings,
} from '@/features/profile/profile.mapper';
import {
  selectServiceFeatures,
  selectSiteProfile,
  selectSiteSettings,
} from '@/repositories/profile.repository';
import { runQuery } from './service-result';

export const getProfile = cache(() =>
  runQuery('site_profile', selectSiteProfile, (row) => (row ? mapProfile(row) : null)),
);

export const getServiceFeatures = cache(() =>
  runQuery('service_features', selectServiceFeatures, (rows) => (rows ?? []).map(mapServiceFeature)),
);

export const getSiteSettings = cache(async () => {
  const result = await runQuery('site_settings', selectSiteSettings, (rows) => mapSiteSettings(rows ?? []));
  return result.data ?? emptySiteSettings;
});
