import 'server-only';
import type { ContentResult } from '@/types/result';

type QueryResponse<Row> = { data: Row | null; error: { message: string } | null };

/**
 * Runs a Supabase query and maps it into a ContentResult, converting thrown
 * network/config errors into a failed result instead of crashing the page.
 */
export async function runQuery<Row, Mapped>(
  label: string,
  query: () => PromiseLike<QueryResponse<Row>>,
  map: (data: Row | null) => Mapped,
): Promise<ContentResult<Mapped>> {
  try {
    const { data, error } = await query();
    if (error) {
      console.error(`[supabase] ${label} failed: ${error.message}`);
      return { data: null, error: error.message };
    }
    return { data: map(data), error: null };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    console.error(`[supabase] ${label} threw: ${message}`);
    return { data: null, error: message };
  }
}
