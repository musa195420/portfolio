import { Mail, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AppRoutes } from '@/constants/app_routes';
import { AppStrings } from '@/constants/app_strings';
import { getProfile } from '@/services/profile.service';

export const metadata: Metadata = {
  title: AppStrings.meta.contactTitle,
  description: AppStrings.meta.contactDescription,
  alternates: { canonical: AppRoutes.contact },
  openGraph: { title: AppStrings.meta.contactTitle, description: AppStrings.meta.contactDescription, url: AppRoutes.contact },
};

// Must be a literal for static analysis; keep in sync with AppConfig.revalidateSeconds.
export const revalidate = 300;

export default async function ContactPage() {
  const { data: profile } = await getProfile();

  return (
    <section aria-labelledby="inquiry-heading" className="hero-backdrop py-10 sm:py-14">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-14">
        <div className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading
            as="h1"
            id="inquiry-heading"
            bar
            eyebrow={AppStrings.inquiry.eyebrow}
            lead={AppStrings.inquiry.headingLead}
            accent={AppStrings.inquiry.headingAccent}
          />
          <p className="text-ink-muted">{AppStrings.inquiry.description}</p>
          {profile?.email || profile?.phone ? (
            <div className="space-y-3 rounded-card border border-line bg-surface p-5 shadow-soft">
              <p className="text-sm font-semibold text-ink-soft">{AppStrings.inquiry.directContact}</p>
              {profile.email ? (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm text-ink-muted hover:text-accent">
                  <Mail aria-hidden="true" className="size-4 text-accent" />
                  {profile.email}
                </a>
              ) : null}
              {profile.phone ? (
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-ink-muted hover:text-accent">
                  <Phone aria-hidden="true" className="size-4 text-accent" />
                  {profile.phone}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        <InquiryForm />
      </Container>
    </section>
  );
}
