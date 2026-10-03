import 'server-only';
import { cache } from 'react';
import { mapSkill, mapTechnology } from '@/features/skills/skill.mapper';
import { selectSkills, selectTechnologies } from '@/repositories/skill.repository';
import { runQuery } from './service-result';

export const getStripTechnologies = cache(() =>
  runQuery('technologies', () => selectTechnologies({ stripOnly: true }), (rows) =>
    (rows ?? []).map(mapTechnology),
  ),
);

export const getAllTechnologies = cache(() =>
  runQuery('technologies', () => selectTechnologies(), (rows) => (rows ?? []).map(mapTechnology)),
);

export const getSkills = cache(() =>
  runQuery('skills', selectSkills, (rows) => (rows ?? []).map(mapSkill)),
);
