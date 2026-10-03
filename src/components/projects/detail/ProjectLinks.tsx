import { Globe } from 'lucide-react';
import type { ReactNode } from 'react';
import { ButtonLink, type ButtonVariant } from '@/components/ui/Button';
import { AppleIcon, GithubIcon, GooglePlayIcon } from '@/components/ui/BrandIcons';
import { AppStrings } from '@/constants/app_strings';
import type { ProjectDetail } from '@/types/project';

type LinkSpec = { href: string | null; label: string; icon: ReactNode; variant: ButtonVariant };

/** Platform/store/source links. Missing links are not rendered. */
export function ProjectLinks({ project }: { project: ProjectDetail }) {
  const links: LinkSpec[] = [
    {
      href: project.appStoreUrl,
      label: AppStrings.projectDetail.appStore,
      icon: <AppleIcon className="size-5" />,
      variant: 'primary',
    },
    {
      href: project.playStoreUrl,
      label: AppStrings.projectDetail.playStore,
      icon: <GooglePlayIcon className="size-4" />,
      variant: 'primary',
    },
    {
      href: project.githubUrl,
      label: AppStrings.projectDetail.github,
      icon: <GithubIcon className="size-5" />,
      variant: 'secondary',
    },
    {
      href: project.websiteUrl,
      label: AppStrings.projectDetail.website,
      icon: <Globe aria-hidden="true" className="size-5" />,
      variant: 'secondary',
    },
  ];
  const available = links.filter((link): link is LinkSpec & { href: string } => Boolean(link.href));
  if (available.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {available.map((link) => (
        <ButtonLink key={link.label} href={link.href} external variant={link.variant} icon={link.icon}>
          {link.label}
        </ButtonLink>
      ))}
    </div>
  );
}
