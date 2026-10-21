import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { SiteContent } from "@/lib/cms";

export const getSiteContent = createServerFn({ method: "GET" }).handler(async (): Promise<SiteContent> => {
  try {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const sb = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
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
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count } = await supabaseAdmin.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin");
  if ((count ?? 0) > 0) return { created: false };
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: "admin@qmep.local",
    password: "Qmep#Admin2026",
    email_confirm: true,
  });
  let userId = data.user?.id;
  if (error || !userId) {
    const list = await supabaseAdmin.auth.admin.listUsers();
    userId = list.data.users.find((u) => u.email === "admin@qmep.local")?.id;
  }
  if (!userId) return { created: false };
  await supabaseAdmin.from("user_roles").insert({ user_id: userId, role: "admin" });
  return { created: true };
});
