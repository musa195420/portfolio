import { StateMessage } from '@/components/common/StateMessage';
import { Container } from '@/components/ui/Container';
import { SectionIds } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { getProfile, getSiteSettings } from '@/services/profile.service';
import { getAllTechnologies } from '@/services/skill.service';
import { HeroSection } from './HeroSection';

/** Loads hero data and renders the hero, or an unavailable state. */
export async function HomeHero() {
  const [{ data: profile, error }, settings, { data: technologies }] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getAllTechnologies(),
  ]);

  if (error || !profile) {
    return (
      <section id={SectionIds.home} className="py-12">
        <Container>
          <StateMessage
            tone="error"
            title={AppStrings.states.unavailableTitle}
            description={AppStrings.states.unavailableBody}
          />
        </Container>
      </section>
    );
  }

  return <HeroSection profile={profile} settings={settings} technologies={technologies ?? []} />;
}
