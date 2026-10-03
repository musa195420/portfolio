import { AppConfig } from '@/constants/app_constants';

/** 5 → "5+", 5000 → "5K+", 1200000 → "1.2M+". */
export function formatStat(value: number | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const compact = new Intl.NumberFormat(AppConfig.locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
  return `${compact}+`;
}

/** "2025-10-01" → "Oct 2025". */
export function formatMonthYear(date: string | null): string | null {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat(AppConfig.locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}

/** Splits multi-paragraph text from the database into paragraphs. */
export function toParagraphs(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/** Wraps occurrences of the given phrases so they can be styled. */
export function splitHighlights(
  text: string,
  phrases: readonly string[],
): Array<{ text: string; highlighted: boolean }> {
  const terms = phrases.filter(Boolean);
  if (terms.length === 0) return [{ text, highlighted: false }];
  const escaped = terms
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  return text
    .split(pattern)
    .filter(Boolean)
    .map((part) => ({ text: part, highlighted: terms.includes(part) }));
}
