import { createClient } from "@supabase/supabase-js";

// Cookie-free Supabase client for use inside unstable_cache.
// cookies() cannot be called inside a cached function, so this client
// skips cookie-based session management. Safe for this app since there is no auth.
export function createCacheClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
