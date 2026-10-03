import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline-light' | 'light';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex shrink-0 items-center justify-center gap-2.5 rounded-xl font-display font-semibold whitespace-nowrap transition duration-200 disabled:pointer-events-none disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-b from-accent-light/90 via-accent to-accent-strong text-white shadow-button hover:brightness-110 active:brightness-95',
  secondary:
    'border border-line bg-surface text-ink shadow-soft hover:border-line-strong hover:shadow-card active:bg-surface-soft',
  'outline-light': 'border border-white/70 text-white hover:bg-white/10',
  light: 'bg-surface text-ink shadow-soft hover:bg-surface-soft',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
};

export function buttonStyles(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize; icon?: ReactNode; trailingIcon?: ReactNode };

export function Button({
  variant,
  size,
  icon,
  trailingIcon,
  className,
  children,
  type = 'button',
  ...props
}: StyleProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button type={type} className={buttonStyles(variant, size, className)} {...props}>
      {icon}
      {children}
      {trailingIcon}
    </button>
  );
}

type ButtonLinkProps = StyleProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
    href: string;
    /** Opens in a new tab with safe rel attributes. */
    external?: boolean;
  };

/**
 * Link styled as a button. Uses next/link for internal routes and a plain
 * anchor for external, mailto: and tel: links.
 */
export function ButtonLink({
  variant,
  size,
  icon,
  trailingIcon,
  className,
  children,
  href,
  external,
  ...props
}: ButtonLinkProps) {
  const classes = buttonStyles(variant, size, className);
  const content = (
    <>
      {icon}
      {children}
      {trailingIcon}
    </>
  );
  const isInternal = href.startsWith('/') || href.startsWith('#');
  if (!isInternal || external || props.download !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
