import { Download } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AppStrings } from '@/constants/app_strings';
import { getProfile } from '@/services/profile.service';
import { BrandMark } from './BrandMark';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';

export async function SiteHeader() {
  const { data: profile } = await getProfile();
  const name = profile?.fullName ?? AppStrings.meta.siteName;
  const title = profile?.professionalTitle ?? '';
  const resumeUrl = profile?.resumeUrl ?? null;

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-cream/85 backdrop-blur-md supports-[backdrop-filter]:bg-cream/75">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-[5.25rem]">
        <BrandMark name={name} title={title} />
        <NavLinks />
        <div className="flex items-center gap-3">
          {resumeUrl ? (
            <div className="hidden sm:block">
              <ButtonLink
                href={resumeUrl}
                external
                size="sm"
                className="h-12 rounded-xl px-7 text-base"
                icon={<Download aria-hidden="true" className="size-4" />}
              >
                {AppStrings.nav.downloadCv}
              </ButtonLink>
            </div>
          ) : null}
          <MobileMenu resumeUrl={resumeUrl} />
        </div>
      </Container>
    </header>
  );
}
