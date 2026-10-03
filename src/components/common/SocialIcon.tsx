import { Globe, Mail, MessageCircle, Phone } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

/** Maps social_links.icon_key values to icon components. */
const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
};

export function SocialIcon({ iconKey, className }: { iconKey: string | null; className?: string }) {
  const Icon = (iconKey && icons[iconKey]) || Globe;
  return <Icon aria-hidden="true" className={className} />;
}
