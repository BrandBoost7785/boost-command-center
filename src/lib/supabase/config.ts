/**
 * Connection config for the EXISTING Supabase project (qkejynibmcsgjvburgig).
 *
 * These are publishable values (project URL + anon/publishable key) and are
 * safe to ship in client code. The service-role key is NOT used by this app.
 */

const FALLBACK_URL = "https://qkejynibmcsgjvburgig.supabase.co";

const FALLBACK_PUBLISHABLE_KEY = "sb_publishable_e7OMob4QugI_j7yYrdPBKA_VFbFoKew";

export const SUPABASE_URL =
  (import.meta.env["VITE_SUPABASE_URL"] as string | undefined) || FALLBACK_URL;

export const SUPABASE_PUBLISHABLE_KEY =
  (import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined) ||
  FALLBACK_PUBLISHABLE_KEY;

export const isSupabaseConfigured =
  Boolean(SUPABASE_URL) && Boolean(SUPABASE_PUBLISHABLE_KEY);
