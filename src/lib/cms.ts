import { company, services, faqs } from "@/lib/site";
import { setPageTexts } from "@/lib/editable";

export type CmsCompany = typeof company;
export type CmsService = { slug: string; title: string; summary: string; items: string[]; cta: string; image: string };
export type CmsFaq = { q: string; a: string };
export type SiteContent = { company?: Partial<CmsCompany>; services?: CmsService[]; faqs?: CmsFaq[]; texts?: Record<string, string> };

// Snapshot of the bundled content: used as fallback and as the admin's starting point.
export const defaults = {
  company: { ...company },
  services: services.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary, items: [...s.items], cta: s.cta, image: s.image })),
  faqs: faqs.map((f) => ({ ...f })),
};

// Merges saved content into the shared site data in place, so every page picks it up.
export function applyContent(c: SiteContent | null | undefined) {
  Object.assign(company, defaults.company, c?.company ?? {});
  for (const s of services) {
    const base = defaults.services.find((d) => d.slug === s.slug)!;
    const saved = c?.services?.find((d) => d.slug === s.slug);
    Object.assign(s, base, saved ? { ...saved, image: saved.image || base.image, items: saved.items?.length ? saved.items : base.items } : {});
  }
  faqs.splice(0, faqs.length, ...(c?.faqs?.length ? c.faqs : defaults.faqs));
  setPageTexts(c?.texts);
}

export const ADMIN_EMAIL = "admin@qmep-app.com";
export const usernameToEmail = (u: string) => (u.includes("@") ? u.trim() : `${u.trim().toLowerCase()}@qmep-app.com`);
