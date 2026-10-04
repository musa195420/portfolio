import type { Metadata, Viewport } from 'next';
import { Caveat, Inter, Poppins } from 'next/font/google';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { AppStrings } from '@/constants/app_strings';
import { AssetPaths, assetUrl } from '@/constants/asset_links';
import { getSiteUrl } from '@/lib/env';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

// Handwritten accent copy (CTA). Only loaded where used via CSS variable.
const caveat = Caveat({ subsets: ['latin'], weight: ['500'], variable: '--font-caveat', display: 'swap', preload: false });

const brandIcon = assetUrl(AssetPaths.brandLogo);

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: AppStrings.meta.defaultTitle, template: AppStrings.meta.titleTemplate },
  description: AppStrings.meta.defaultDescription,
  applicationName: AppStrings.meta.siteName,
  authors: [{ name: AppStrings.meta.siteName }],
  alternates: { canonical: '/' },
  icons: { icon: brandIcon, apple: brandIcon },
  openGraph: {
    type: 'website',
    siteName: AppStrings.meta.siteName,
    title: AppStrings.meta.defaultTitle,
    description: AppStrings.meta.defaultDescription,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: AppStrings.meta.defaultTitle,
    description: AppStrings.meta.defaultDescription,
  },
};

export const viewport: Viewport = {
  themeColor: '#fcf8f2',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${caveat.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <noscript>
          <style>{'.img-fade{opacity:1!important}'}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only z-[60] rounded-xl bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {AppStrings.a11y.skipToContent}
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
