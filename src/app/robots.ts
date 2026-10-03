import type { MetadataRoute } from 'next';
import { ApiRoutes } from '@/constants/app_routes';
import { getSiteUrl } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: { userAgent: '*', allow: '/', disallow: [ApiRoutes.projectInquiries] },
    sitemap: `${base}/sitemap.xml`,
  };
}
