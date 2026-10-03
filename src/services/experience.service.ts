import 'server-only';
import { cache } from 'react';
import { mapExperience } from '@/features/experience/experience.mapper';
import { selectExperiences } from '@/repositories/experience.repository';
import { runQuery } from './service-result';

export const getExperiences = cache(() =>
  runQuery('experiences', selectExperiences, (rows) => (rows ?? []).map(mapExperience)),
);
