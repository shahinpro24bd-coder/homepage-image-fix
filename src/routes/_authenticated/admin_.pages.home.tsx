import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { defaults, type CmsFaq, type CmsService } from "@/lib/cms";
import { EditContext } from "@/lib/editable";
import { SiteLayout } from "@/components/site/Layout";
import { HomeContent } from "@/components/site/HomeContent";

export const Route = createFileRoute("/_authenticated/admin_/pages/home")({
  head: () => ({
    meta: [
      { title: "Edit Home Page | QMEP Admin" },
      { name: "description", content: "Edit the texts and images of the QMEP home page." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Edit Home Page | QMEP Admin" },
      { property: "og:description", content: "QMEP home page editor." },
    ],
  }),
  component: HomeEditor,
});

const svcRe = /^services\.(\d+)\.(title|summary|cta|image)$/;
const itemRe = /^services\.(\d+)\.items\.(\d+)$/;
const faqRe = /^faqs\.(\d+)\.(q|a)$/;

function HomeEditor() {
  const router = useRouter();
  const [ready, setReady] = useState<"loading" | "ok" | "denied">("loading");
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [services, setServices] = useState<CmsService[]>(defaults.services.map((s) => ({ ...s, items: [...s.items] })));
  const [faqs, setFaqs] = useState<CmsFaq[]>(defaults.faqs.map((f) => ({ ...f })));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const pickKey = useRef<string>("");

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data: ok } = await supabase.rpc("has_role", { _user_id: u.user!.id, _role: "admin" });
      if (!ok) { setReady("denied"); return; }
      const { data } = await supabase.from("site_content").select("key, value");
      for (const r of data ?? []) {
        if (r.key === "texts") setTexts((r.value ?? {}) as Record<string, string>);
        if (r.key === "services") {
          const saved = r.value as CmsService[];
          setServices(defaults.services.map((d) => {
            const sv = saved.find((s) => s.slug === d.slug);
            return { ...d, ...(sv ?? {}), image: sv?.image || d.image, items: sv?.items?.length ? [...sv.items] : [...d.items] };
          }));
        }
        if (r.key === "faqs" && Array.isArray(r.value) && r.value.length) setFaqs(r.value as CmsFaq[]);
      }
      setReady("ok");
    })();
  }, []);

  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const ctx = useMemo(() => ({
    edit: true,
    get: (k: string, d: string) => {
      let m = k.match(svcRe);
      if (m) return (services[+m[1]!]?.[m[2] as "title"] as string) ?? d;
      m = k.match(itemRe);
      if (m) return services[+m[1]!]?.items[+m[2]!] ?? d;
      m = k.match(faqRe);
      if (m) return faqs[+m[1]!]?.[m[2] as "q"] ?? d;
      return texts[k] ?? d;
    },
    set: (k: string, v: string) => {
      setDirty(true);
      let m = k.match(svcRe);
      if (m) { const i = +m[1]!, f = m[2]!; setServices((s) => s.map((x, j) => (j === i ? { ...x, [f]: v } : x))); return; }
      m = k.match(itemRe);
      if (m) { const i = +m[1]!, n = +m[2]!; setServices((s) => s.map((x, j) => (j === i ? { ...x, items: x.items.map((it, q) => (q === n ? v : it)) } : x))); return; }
      m = k.match(faqRe);
      if (m) { const i = +m[1]!, f = m[2]!; setFaqs((s) => s.map((x, j) => (j === i ? { ...x, [f]: v } : x))); return; }
      setTexts((t) => ({ ...t, [k]: v }));
    },
    pick: (k: string) => { pickKey.current = k; fileRef.current?.click(); },
  }), [texts, services, faqs]);

  const onFile = async (file: File) => {
    const k = pickKey.current;
    if (!k) return;
    setUploading(true);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const name = `${k.replace(/[^\w-]/g, "-")}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(name, file, { contentType: file.type, cacheControl: "31536000" });
    setUploading(false);
    if (error) { toast.error("Upload failed: " + error.message); return; }
    ctx.set(k, `/api/public/img/${name}`);
    toast.success("Image changed — click Save to publish.");
  };

  const save = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const clean = Object.fromEntries(Object.entries(texts).filter(([, v]) => v.trim() !== ""));
    const { error } = await supabase.from("site_content").upsert([
      { key: "texts", value: clean, updated_at: now },
      { key: "services", value: services.map((s) => ({ ...s, items: s.items.filter((x) => x.trim()) })), updated_at: now },
      { key: "faqs", value: faqs, updated_at: now },
    ] as never);
    setSaving(false);
    if (error) { toast.error("Could not save: " + error.message); return; }
    setDirty(false);
    toast.success("Saved! The home page is updated.");
    router.invalidate();
  };

  const reset = () => {
    if (!confirm("Discard all unsaved changes?")) return;
    window.location.reload();
  };

  // Keep the admin on this page: links inside the preview don't navigate while editing.
  const blockLinks = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) e.preventDefault();
  };

  if (ready === "loading") return <div className="p-5 text-center">Loading editor…</div>;
  if (ready === "denied") return <div className="p-5 text-center"><h3>No admin access</h3><Link to="/admin" className="btn btn-primary mt-3">Back</Link></div>;

  return (
    <>
      <div className="cms-toolbar">
        <Link to="/admin" className="btn btn-outline-light btn-sm"><i className="fa fa-arrow-left me-1"></i>Dashboard</Link>
        <div className="cms-toolbar-title">Editing: <strong>Home</strong>
          <small className="d-none d-md-inline">Click any text to type · click any photo to replace it</small>
        </div>
        {uploading && <span className="cms-toolbar-note">Uploading…</span>}
        <a href="/" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm">View live</a>
        <button className="btn btn-outline-light btn-sm" onClick={reset} disabled={!dirty}>Discard</button>
        <button className="btn btn-primary btn-sm px-4" onClick={save} disabled={saving || !dirty}>
          {saving ? "Saving…" : dirty ? "Save changes •" : "Saved"}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ""; if (f) onFile(f); }} />
      <div className="cms-editing" onClickCapture={blockLinks}>
        <EditContext.Provider value={ctx}>
          <SiteLayout>
            <HomeContent />
          </SiteLayout>
        </EditContext.Provider>
      </div>
    </>
  );
}
