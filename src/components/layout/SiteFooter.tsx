import Link from 'next/link';
import { SocialIcon } from '@/components/common/SocialIcon';
import { Container } from '@/components/ui/Container';
import { AppStrings } from '@/constants/app_strings';
import { NavItems } from '@/constants/navigation';
import { getProfile, getSiteSettings } from '@/services/profile.service';
import { getSocialLinks } from '@/services/social.service';
import { BrandMark } from './BrandMark';

export async function SiteFooter() {
  const [{ data: profile }, settings, socialLinks] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getSocialLinks(),
  ]);
  const name = profile?.fullName ?? AppStrings.meta.siteName;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 border-t border-line bg-surface-soft/60">
      <Container className="grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div className="space-y-3">
          <BrandMark name={name} title={profile?.professionalTitle ?? ''} />
          {settings.footerTagline ? (
            <p className="max-w-sm text-sm text-ink-muted">{settings.footerTagline}</p>
          ) : null}
        </div>

        <nav aria-label={AppStrings.a11y.footerNav}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
            {NavItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="text-ink-muted transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {socialLinks.length > 0 ? (
          <ul className="flex gap-2">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={AppStrings.a11y.socialLink(link.platform)}
                  className="flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-ink-soft shadow-soft transition-colors hover:text-accent"
                >
                  <SocialIcon iconKey={link.iconKey} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-5 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {name}. {AppStrings.footer.rights}
        </p>
        <p>{AppStrings.footer.builtWith}</p>
      </Container>
    </footer>
  );
}
