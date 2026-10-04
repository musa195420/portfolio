export type Technology = {
  id: string;
  name: string;
  slug: string;
  iconUrl: string | null;
  category: string | null;
};

export type Skill = {
  id: string;
  name: string;
  category: string | null;
  iconUrl: string | null;
  proficiency: number | null;
  featured: boolean;
};
