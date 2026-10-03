/** Outcome of a public content read: data, or an error message when the source failed. */
export type ContentResult<T> = { data: T; error: null } | { data: null; error: string };
