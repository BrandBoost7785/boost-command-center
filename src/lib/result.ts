import type { PostgrestError } from "@supabase/supabase-js";

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code?: string };

export function toMessage(error: unknown): string {
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  const maybe = error as Partial<PostgrestError>;
  return maybe.message ?? "Unexpected error";
}

/** Wraps a Supabase call so failures surface as readable messages, never blank screens. */
export async function runQuery<T>(
  fn: () => PromiseLike<{ data: T | null; error: PostgrestError | null }>,
): Promise<Result<T>> {
  try {
    const { data, error } = await fn();
    if (error) return { ok: false, error: error.message, code: error.code };
    return { ok: true, data: (data ?? null) as T };
  } catch (err) {
    return { ok: false, error: toMessage(err) };
  }
}

/** Throwing variant for use inside TanStack Query fetchers. */
export async function queryOrThrow<T>(
  fn: () => PromiseLike<{ data: T | null; error: PostgrestError | null }>,
): Promise<T> {
  const result = await runQuery(fn);
  if (!result.ok) throw new Error(result.error);
  return result.data;
}
