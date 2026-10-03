export type Profile = {
  fullName: string;
  professionalTitle: string;
  availabilityText: string | null;
  heroHeadingLine1: string | null;
  heroHeadingLine2: string | null;
  heroDescription: string | null;
  aboutHeading: string | null;
  aboutDescription: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  yearsExperience: number | null;
  projectsCompleted: number | null;
  usersReached: number | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  resumeUrl: string | null;
  heroDesktopImageUrl: string | null;
  heroMobileImageUrl: string | null;
  aboutDesktopImageUrl: string | null;
  aboutMobileImageUrl: string | null;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  iconKey: string | null;
};

export type ServiceFeature = {
  id: string;
  title: string;
  description: string;
  iconUrl: string | null;
};

export type SiteSettings = {
  footerTagline: string | null;
  /** Short lines shown at the right of the technologies strip. */
  technologiesTagline: string[];
  /** Phrases in the hero description to emphasise with the accent colour. */
  heroHighlights: string[];
  /** Technology slugs shown on the floating platform card in the hero. */
  heroPlatformTechnologies: string[];
};
