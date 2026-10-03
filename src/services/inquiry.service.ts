import 'server-only';
import { createHmac } from 'node:crypto';
import { InquiryLimits } from '@/constants/app_constants';
import { AppStrings } from '@/constants/app_strings';
import { inquirySchema, toFieldErrors } from '@/features/inquiries/inquiry.schema';
import { getServerEnv } from '@/lib/env.server';
import { countRecentInquiries, insertInquiry } from '@/repositories/inquiry.repository';
import type { InquirySubmissionResult } from '@/types/inquiry';

export type InquiryOutcome = InquirySubmissionResult & { status: number };

type RequestMeta = { ip: string | null; userAgent: string | null };

const windowMs = InquiryLimits.windowMinutes * 60_000;

/** Per-instance first line of defence; the database check below is authoritative. */
const recentByKey = new Map<string, number[]>();

function hitLocalLimit(key: string, now: number): boolean {
  const hits = (recentByKey.get(key) ?? []).filter((time) => now - time < windowMs);
  hits.push(now);
  recentByKey.set(key, hits);
  if (recentByKey.size > 5_000) recentByKey.clear();
  return hits.length > InquiryLimits.maxPerWindow;
}

/** Keyed hash so raw IP addresses are never stored. */
function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHmac('sha256', getServerEnv().SUPABASE_SECRET_KEY).update(ip).digest('hex');
}

export async function submitInquiry(payload: unknown, meta: RequestMeta): Promise<InquiryOutcome> {
  const errors = AppStrings.inquiry.errors;
  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, status: 400, error: errors.invalid, fieldErrors: toFieldErrors(parsed.error) };
  }
  const input = parsed.data;
  const now = Date.now();

  // Bots: honeypot filled or form submitted implausibly fast. Pretend success.
  const tooFast = input.startedAt !== undefined && now - input.startedAt < InquiryLimits.minFillMs;
  if (input.website || tooFast) return { ok: true, status: 200 };

  const ipHash = hashIp(meta.ip);
  const email = input.email.toLowerCase();
  if (hitLocalLimit(ipHash ?? email, now)) {
    return { ok: false, status: 429, error: errors.rateLimited };
  }

  try {
    const { count, error: countError } = await countRecentInquiries({
      email,
      ipHash,
      since: new Date(now - windowMs),
    });
    if (countError) throw new Error(countError.message);
    if ((count ?? 0) >= InquiryLimits.maxPerWindow) {
      return { ok: false, status: 429, error: errors.rateLimited };
    }

    const { error } = await insertInquiry({
      name: input.name,
      email,
      phone: input.phone,
      company: input.company,
      project_title: input.projectTitle,
      project_type: input.projectType,
      budget_range: input.budgetRange,
      timeline: input.timeline,
      idea_summary: input.ideaSummary,
      required_services: input.requiredServices,
      preferred_contact_method: input.preferredContactMethod,
      source_page: input.sourcePage,
      ip_hash: ipHash,
      user_agent: meta.userAgent?.slice(0, 400) ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true, status: 201 };
  } catch (cause) {
    console.error('[inquiry] submission failed:', cause instanceof Error ? cause.message : cause);
    return { ok: false, status: 503, error: errors.unavailable };
  }
}
