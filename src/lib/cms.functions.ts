import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { SiteContent } from "@/lib/cms";

// Public fallback credentials so the site works on hosts (e.g. Vercel) with no
// environment variables configured. The publishable key is public by design.
const FALLBACK_SUPABASE_URL = "https://bvmlqwnncwiwzweedmdg.supabase.co";
const FALLBACK_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_68Zljiov2o_S8wcgxPunWA_qNbuXlYG";

export const getSiteContent = createServerFn({ method: "GET" }).handler(async (): Promise<SiteContent> => {
  try {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || FALLBACK_SUPABASE_PUBLISHABLE_KEY;
    const url = process.env["SUPABASE_URL"] || FALLBACK_SUPABASE_URL;
    const sb = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { data } = await sb.from("site_content").select("key, value");
    const out: Record<string, unknown> = {};
    for (const r of data ?? []) out[r.key] = r.value;
    return out as SiteContent;
  } catch {
    return {};
  }
});

// Creates the default admin account once, only while no admin exists yet.
export const ensureAdminAccount = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count } = await supabaseAdmin.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin");
  if ((count ?? 0) > 0) return { created: false };
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: "admin@qmep-app.com",
    password: "admin123",
    email_confirm: true,
  });
  let userId = data.user?.id;
  if (error || !userId) {
    const list = await supabaseAdmin.auth.admin.listUsers();
    userId = list.data.users.find((u) => u.email === "admin@qmep-app.com")?.id;
  }
  if (!userId) return { created: false };
  await supabaseAdmin.from("user_roles").insert({ user_id: userId, role: "admin" });
  return { created: true };
  } catch {
    // Service key unavailable (e.g. static hosting without env vars) — the
    // admin account already exists, so there is nothing to create.
    return { created: false };
  }
});
