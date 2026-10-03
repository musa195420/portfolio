import 'server-only';
import { z } from 'zod';

const serverEnvSchema = z.object({
  SUPABASE_SECRET_KEY: z.string().min(1),
});

/**
 * Server-only secrets. Importing this module from a Client Component fails
 * the build thanks to `server-only`.
 */
export function getServerEnv() {
  const parsed = serverEnvSchema.safeParse({
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  });
  if (!parsed.success) {
    throw new Error('SUPABASE_SECRET_KEY is not configured on the server.');
  }
  return parsed.data;
}
