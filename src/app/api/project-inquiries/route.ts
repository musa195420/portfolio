import { NextResponse, type NextRequest } from 'next/server';
import { AppStrings } from '@/constants/app_strings';
import { submitInquiry } from '@/services/inquiry.service';

const MAX_BODY_BYTES = 16 * 1024;

function json(body: object, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function clientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || request.headers.get('x-real-ip') || null;
}

/** Only accept submissions from this site's own pages. */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const errors = AppStrings.inquiry.errors;
  if (!isSameOrigin(request)) return json({ ok: false, error: errors.generic }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ ok: false, error: errors.generic }, 415);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: errors.invalid }, 413);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: errors.invalid }, 400);
  }

  const { status, ...result } = await submitInquiry(payload, {
    ip: clientIp(request),
    userAgent: request.headers.get('user-agent'),
  });
  return json(result, status);
}
