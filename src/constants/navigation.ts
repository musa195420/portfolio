import { AppStrings } from './app_strings';
import { AppRoutes, SectionIds, type SectionId } from './app_routes';

export type NavItem = { id: SectionId; label: string; href: string };

/** Primary navigation, in display order. */
export const NavItems: readonly NavItem[] = [
  { id: SectionIds.home, label: AppStrings.nav.home, href: AppRoutes.home },
  { id: SectionIds.about, label: AppStrings.nav.about, href: AppRoutes.section(SectionIds.about) },
  { id: SectionIds.projects, label: AppStrings.nav.projects, href: AppRoutes.section(SectionIds.projects) },
  { id: SectionIds.skills, label: AppStrings.nav.skills, href: AppRoutes.section(SectionIds.skills) },
  { id: SectionIds.experience, label: AppStrings.nav.experience, href: AppRoutes.section(SectionIds.experience) },
  { id: SectionIds.contact, label: AppStrings.nav.contact, href: AppRoutes.section(SectionIds.contact) },
];
