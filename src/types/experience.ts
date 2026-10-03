export type Experience = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  highlights: string[];
};
