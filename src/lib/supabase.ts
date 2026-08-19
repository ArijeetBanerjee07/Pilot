import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

// Browser-safe client (uses publishable/anon key) — lazy singleton
export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _supabase;
}

// Server-only admin client (uses secret/service_role key) — lazy singleton
export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  }
  return _supabaseAdmin;
}

// Keep named exports for backwards compatibility
export const supabase = { from: (...args: Parameters<SupabaseClient["from"]>) => getSupabase().from(...args) };
export const supabaseAdmin = { from: (...args: Parameters<SupabaseClient["from"]>) => getSupabaseAdmin().from(...args) };
