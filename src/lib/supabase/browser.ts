// lib/supabase/browser.ts - Supabase client for browser-side usage
import { createClient } from "@supabase/supabase-js";

export const browserClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
