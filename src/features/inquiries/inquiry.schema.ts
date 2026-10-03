import { z } from 'zod';
import { InquiryLimits } from '@/constants/app_constants';
import { AppStrings } from '@/constants/app_strings';

const messages = AppStrings.inquiry.validation;
const options = AppStrings.inquiry.options;

/** Optional free text: trimmed, length-limited, empty → null. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, messages.textTooLong)
    .optional()
    .transform((value) => value || null);

/** Optional select: one of the allowed options, or empty → null. */
const optionalChoice = <const T extends readonly [string, ...string[]]>(values: T) =>
  z
    .union([z.enum(values), z.literal('')], { error: messages.invalidOption })
    .optional()
    .transform((value) => value || null);

/**
 * Shared by the client form (instant feedback) and the API route (the
 * authoritative check — client validation is never trusted on its own).
 */
export const inquirySchema = z.object({
  name: z.string().trim().min(1, messages.nameRequired).max(InquiryLimits.nameMax, messages.nameTooLong),
  email: z
    .string()
    .trim()
    .max(InquiryLimits.emailMax, messages.emailInvalid)
    .pipe(z.email(messages.emailInvalid)),
  phone: z
    .string()
    .trim()
    .max(InquiryLimits.phoneMax, messages.phoneInvalid)
    .refine((value) => value === '' || /^[+()\d\s.-]{6,}$/.test(value), messages.phoneInvalid)
    .optional()
    .transform((value) => value || null),
  company: optionalText(InquiryLimits.companyMax),
  projectTitle: optionalText(InquiryLimits.projectTitleMax),
  projectType: optionalChoice(options.projectType),
  budgetRange: optionalChoice(options.budgetRange),
  timeline: optionalChoice(options.timeline),
  ideaSummary: z
    .string()
    .trim()
    .min(InquiryLimits.ideaMin, messages.ideaTooShort)
    .max(InquiryLimits.ideaMax, messages.ideaTooLong),
  requiredServices: z
    .array(z.enum(options.requiredServices, { error: messages.invalidOption }))
    .max(options.requiredServices.length)
    .optional()
    .transform((value) => (value && value.length > 0 ? Array.from(new Set(value)) : null)),
  preferredContactMethod: optionalChoice(options.preferredContactMethod),
  sourcePage: z.string().trim().max(300).optional().transform((value) => value || null),
  // Anti-spam signals (not stored).
  website: z.string().max(200).optional(),
  startedAt: z.number().int().nonnegative().optional(),
});

export type InquiryFormValues = z.input<typeof inquirySchema>;

/** Maps Zod issues to the first message per field. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    fieldErrors[key] ??= issue.message;
  }
  return fieldErrors;
}
