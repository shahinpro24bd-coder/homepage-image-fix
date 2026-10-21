// Supabase client with built-in fallback credentials.
// The publishable key is public by design (safe to ship in the bundle), so the
// site works on any static host (Vercel, Netlify, ...) with ZERO environment
// variables. If VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY are set,
// they take precedence.
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { brokeredPreviewStorage } from '@/integrations/supabase/previewAuthStorage';

const FALLBACK_SUPABASE_URL = 'https://bvmlqwnncwiwzweedmdg.supabase.co';
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_68Zljiov2o_S8wcgxPunWA_qNbuXlYG';

const SUPABASE_URL =
  (import.meta.env['VITE_SUPABASE_URL'] as string | undefined) || FALLBACK_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  (import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] as string | undefined) ||
  FALLBACK_SUPABASE_PUBLISHABLE_KEY;

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

// New Supabase API keys are opaque strings, not bearer JWTs: strip the
// Authorization header the JS client adds and send the key as `apikey` only.
function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }
    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }
    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  global: {
    fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
  },
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  },
});
