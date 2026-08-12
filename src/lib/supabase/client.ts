import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import {
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
  isSupabaseConfigured,
} from "./config";

/**
 * Browser Supabase client for the existing BOOST backend.
 * RLS is the enforcement layer for every query made through this client.
 */
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  // An empty key would throw at module load; keep construction safe and let
  // `isSupabaseConfigured` drive the UI-level "not configured" state.
  SUPABASE_PUBLISHABLE_KEY || "missing-publishable-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "boost-ai-auth",
    },
  },
);

export { isSupabaseConfigured };
