import { HeroSkeleton } from '@/components/hero/HeroSkeleton';
import { FeaturedProjectsSkeleton } from '@/components/projects/FeaturedProjects';
import { TechStripSkeleton } from '@/components/skills/TechStrip';
import { AppStrings } from '@/constants/app_strings';

export default function Loading() {
  return (
    <div aria-busy="true">
      <span className="sr-only" role="status">
        {AppStrings.states.loading}
      </span>
      <HeroSkeleton />
      <TechStripSkeleton />
      <FeaturedProjectsSkeleton />
    </div>
  );
}
