import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { defaults, type CmsCompany, type CmsFaq, type CmsService } from "@/lib/cms";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | QMEP Electromechanical LLC" },
      { name: "description", content: "Manage QMEP website content and quote requests." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Panel | QMEP" },
      { property: "og:description", content: "QMEP website admin panel." },
    ],
  }),
  component: AdminPage,
});

type Tab = "dashboard" | "company" | "services" | "faqs" | "quotes" | "account";

const sitePages = [
  { name: "Home", path: "/", icon: "fa-home", desc: "Hero slides, about, services, process, FAQ", edit: true },
  { name: "About", path: "/about", icon: "fa-info-circle", desc: "Company story and values" },
  { name: "Services", path: "/services", icon: "fa-tools", desc: "All services overview" },
  { name: "AMC", path: "/amc", icon: "fa-file-contract", desc: "Annual maintenance contracts" },
  { name: "Projects", path: "/projects", icon: "fa-project-diagram", desc: "Project showcase" },
  { name: "Industries", path: "/industries", icon: "fa-industry", desc: "Industries we serve" },
  { name: "Contact", path: "/contact", icon: "fa-envelope", desc: "Contact details and form" },
];
const companyFields: { key: keyof CmsCompany; label: string }[] = [
  { key: "name", label: "Company name" },
  { key: "phone", label: "Phone (shown)" },
  { key: "phoneHref", label: "Phone link (tel:+971...)" },
  { key: "whatsappHref", label: "WhatsApp link (https://wa.me/...)" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "hours", label: "Working hours" },
];

function AdminPage() {
  const nav = useNavigate();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [company, setCompany] = useState<CmsCompany>({ ...defaults.company });
  const [services, setServices] = useState<CmsService[]>(defaults.services.map((s) => ({ ...s })));
  const [faqs, setFaqs] = useState<CmsFaq[]>(defaults.faqs.map((f) => ({ ...f })));
  const [quotes, setQuotes] = useState<Tables<"quote_requests">[]>([]);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data: ok } = await supabase.rpc("has_role", { _user_id: u.user!.id, _role: "admin" });
      setIsAdmin(!!ok);
      if (!ok) return;
      const { data } = await supabase.from("site_content").select("key, value");
      for (const r of data ?? []) {
        if (r.key === "company") setCompany({ ...defaults.company, ...(r.value as object) });
        if (r.key === "services") {
          const saved = r.value as CmsService[];
          setServices(defaults.services.map((d) => ({ ...d, ...(saved.find((s) => s.slug === d.slug) ?? {}) })));
        }
        if (r.key === "faqs" && Array.isArray(r.value) && r.value.length) setFaqs(r.value as CmsFaq[]);
      }
      const q = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
      setQuotes(q.data ?? []);
    })();
  }, []);

  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const touch = () => setDirty(true);

  const save = async () => {
    setSaving(true);
    const now = new Date().toISOString();
    const { error } = await supabase.from("site_content").upsert([
      { key: "company", value: company, updated_at: now },
      { key: "services", value: services, updated_at: now },
      { key: "faqs", value: faqs.filter((f) => f.q.trim()), updated_at: now },
    ] as never);
    setSaving(false);
    if (error) { toast.error("Could not save: " + error.message); return; }
    setDirty(false);
    toast.success("Saved! Changes are live on the website.");
    router.invalidate();
  };

  const upload = async (idx: number, file: File) => {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const name = `${services[idx]!.slug}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(name, file, { contentType: file.type, cacheControl: "31536000" });
    if (error) { toast.error("Upload failed: " + error.message); return; }
    setServices((s) => s.map((x, i) => (i === idx ? { ...x, image: `/api/public/img/${name}` } : x)));
    touch();
    toast.success("Image uploaded — click Save to publish.");
  };

  const signOut = async () => {
    if (dirty && !confirm("You have unsaved changes. Sign out anyway?")) return;
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  };

  const setQuoteStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setQuotes((q) => q.map((x) => (x.id === id ? { ...x, status } : x)));
  };
  const deleteQuote = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    const { error } = await supabase.from("quote_requests").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setQuotes((q) => q.filter((x) => x.id !== id));
  };

  if (isAdmin === null) return <div className="p-5 text-center">Loading…</div>;
  if (!isAdmin) return (
    <div className="p-5 text-center"><h3>No admin access</h3><button className="btn btn-primary mt-3" onClick={signOut}>Sign out</button></div>
  );

  const newCount = quotes.filter((q) => q.status === "new").length;
  const tabs: [Tab, string, string][] = [
    ["dashboard", "Dashboard", "fa-th-large"],
    ["company", "Contact Info", "fa-building"],
    ["services", "Services", "fa-tools"],
    ["faqs", "FAQs", "fa-question-circle"],
    ["quotes", `Quote Requests${newCount ? ` (${newCount})` : ""}`, "fa-inbox"],
    ["account", "Account", "fa-user-cog"],
  ];

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <header className="bg-dark text-white sticky-top" style={{ zIndex: 50 }}>
        <div className="container d-flex flex-wrap align-items-center gap-3 py-3">
          <h4 className="text-white m-0 me-auto">QMEP <span className="text-primary">Admin</span></h4>
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm"><i className="fa fa-external-link-alt me-1"></i>View site</a>
          <button className="btn btn-primary btn-sm px-3" onClick={save} disabled={saving || !dirty}>
            {saving ? "Saving…" : dirty ? "Save changes •" : "Saved"}
          </button>
          <button className="btn btn-outline-light btn-sm" onClick={signOut}>Sign out</button>
        </div>
      </header>
      <div className="container py-4">
        <div className="d-flex flex-wrap gap-2 mb-4">
          {tabs.map(([k, label, icon]) => (
            <button key={k} className={`btn ${tab === k ? "btn-primary" : "btn-light border"}`} onClick={() => setTab(k)}>
              <i className={`fa ${icon} me-2`}></i>{label}
            </button>
          ))}
        </div>

        {tab === "dashboard" && <Dashboard quotes={quotes} newCount={newCount} servicesCount={services.length} faqCount={faqs.length} go={setTab} />}

        {tab === "account" && <Account />}

        {tab === "company" && (
          <div className="bg-white p-4 shadow-sm">
            <h4 className="mb-4">Contact information (shown across the website)</h4>
            <div className="row g-3">
              {companyFields.map((f) => (
                <div className="col-md-6" key={f.key}>
                  <label className="form-label">{f.label}</label>
                  <input className="form-control" value={company[f.key]} onChange={(e) => { setCompany({ ...company, [f.key]: e.target.value }); touch(); }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "services" && services.map((s, i) => (
          <div className="bg-white p-4 shadow-sm mb-4" key={s.slug}>
            <div className="row g-4">
              <div className="col-md-3">
                <img src={s.image} alt={s.title} className="w-100 mb-2" style={{ aspectRatio: "4/3", objectFit: "cover" }} />
                <label className="btn btn-outline-primary btn-sm w-100">
                  <i className="fa fa-upload me-1"></i>Change image
                  <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(i, e.target.files[0])} />
                </label>
              </div>
              <div className="col-md-9">
                <label className="form-label">Title</label>
                <input className="form-control mb-3" value={s.title} onChange={(e) => { setServices(services.map((x, j) => j === i ? { ...x, title: e.target.value } : x)); touch(); }} />
                <label className="form-label">Summary</label>
                <textarea className="form-control mb-3" rows={2} value={s.summary} onChange={(e) => { setServices(services.map((x, j) => j === i ? { ...x, summary: e.target.value } : x)); touch(); }} />
                <label className="form-label">What's included (one per line)</label>
                <textarea className="form-control mb-3" rows={5} value={s.items.join("\n")} onChange={(e) => { setServices(services.map((x, j) => j === i ? { ...x, items: e.target.value.split("\n") } : x)); touch(); }} />
                <label className="form-label">Button text</label>
                <input className="form-control" value={s.cta} onChange={(e) => { setServices(services.map((x, j) => j === i ? { ...x, cta: e.target.value } : x)); touch(); }} />
              </div>
            </div>
          </div>
        ))}

        {tab === "faqs" && (
          <div className="bg-white p-4 shadow-sm">
            {faqs.map((f, i) => (
              <div className="border-bottom pb-3 mb-3" key={i}>
                <div className="d-flex gap-2 mb-2">
                  <input className="form-control fw-bold" placeholder="Question" value={f.q} onChange={(e) => { setFaqs(faqs.map((x, j) => j === i ? { ...x, q: e.target.value } : x)); touch(); }} />
                  <button className="btn btn-outline-danger" onClick={() => { setFaqs(faqs.filter((_, j) => j !== i)); touch(); }} aria-label="Delete question"><i className="fa fa-trash"></i></button>
                </div>
                <textarea className="form-control" rows={2} placeholder="Answer" value={f.a} onChange={(e) => { setFaqs(faqs.map((x, j) => j === i ? { ...x, a: e.target.value } : x)); touch(); }} />
              </div>
            ))}
            <button className="btn btn-outline-primary" onClick={() => { setFaqs([...faqs, { q: "", a: "" }]); touch(); }}><i className="fa fa-plus me-1"></i>Add question</button>
          </div>
        )}

        {tab === "quotes" && (
          <div className="bg-white p-4 shadow-sm">
            {quotes.length === 0 && <p className="text-muted m-0">No quote requests yet.</p>}
            {quotes.map((q) => (
              <div key={q.id} className="border p-3 mb-3" style={{ borderLeft: q.status === "new" ? "4px solid var(--primary)" : undefined }}>
                <div className="d-flex flex-wrap justify-content-between gap-2">
                  <h5 className="m-0">{q.name}{q.company ? ` · ${q.company}` : ""}</h5>
                  <small className="text-muted">{new Date(q.created_at).toLocaleString()}</small>
                </div>
                <p className="mb-1 mt-2"><strong>{q.service}</strong>{q.property_type ? ` · ${q.property_type}` : ""} · {q.location}</p>
                <p className="mb-2"><a href={`tel:${q.phone}`}>{q.phone}</a>{q.email ? <> · <a href={`mailto:${q.email}`}>{q.email}</a></> : null}</p>
                <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>{q.details}</p>
                <div className="d-flex gap-2">
                  <select className="form-select form-select-sm" style={{ width: 160 }} value={q.status} onChange={(e) => setQuoteStatus(q.id, e.target.value)}>
                    <option value="new">New</option><option value="contacted">Contacted</option><option value="done">Done</option>
                  </select>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => deleteQuote(q.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({ quotes, newCount, servicesCount, faqCount, go }: {
  quotes: Tables<"quote_requests">[]; newCount: number; servicesCount: number; faqCount: number; go: (t: Tab) => void;
}) {
  const week = quotes.filter((q) => Date.now() - new Date(q.created_at).getTime() < 7 * 864e5).length;
  return (
    <>
      <div className="row g-3 mb-4">
        {[
          [newCount, "New quote requests", "quotes"],
          [week, "Requests this week", "quotes"],
          [servicesCount, "Services listed", "services"],
          [faqCount, "FAQ questions", "faqs"],
        ].map(([n, label, t]) => (
          <div className="col-6 col-lg-3" key={label as string}>
            <button className="adm-stat w-100 text-start border-0" onClick={() => go(t as Tab)}>
              <strong>{n}</strong><span>{label}</span>
            </button>
          </div>
        ))}
      </div>

      <h4 className="mb-1">Which page do you want to edit?</h4>
      <p className="text-muted mb-3">Open a page to change its texts and photos directly on the page.</p>
      <div className="row g-3 mb-5">
        {sitePages.map((p) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={p.name}>
            {p.edit ? (
              <Link to="/admin/pages/home" className="adm-page is-ready text-reset text-decoration-none">
                <span className="adm-page-icon"><i className={`fa ${p.icon}`}></i></span>
                <h5 className="m-0">{p.name}</h5>
                <small className="text-muted">{p.desc}</small>
                <span className="text-primary mt-auto fw-bold"><i className="fa fa-pen me-1"></i>Edit page</span>
              </Link>
            ) : (
              <div className="adm-page is-soon">
                <span className="adm-page-icon"><i className={`fa ${p.icon}`}></i></span>
                <h5 className="m-0">{p.name}</h5>
                <small className="text-muted">{p.desc}</small>
                <span className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="badge bg-secondary">Coming soon</span>
                  <a href={p.path} target="_blank" rel="noreferrer" className="small">View</a>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="bg-white p-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="m-0">Latest quote requests</h5>
              <button className="btn btn-link btn-sm" onClick={() => go("quotes")}>See all</button>
            </div>
            {quotes.length === 0 && <p className="text-muted m-0">No quote requests yet.</p>}
            {quotes.slice(0, 5).map((q) => (
              <div key={q.id} className="d-flex justify-content-between border-bottom py-2 gap-2">
                <span><strong>{q.name}</strong> · {q.service}</span>
                <span className="text-nowrap">
                  {q.status === "new" && <span className="badge bg-primary me-2">New</span>}
                  <small className="text-muted">{new Date(q.created_at).toLocaleDateString()}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="bg-white p-4 shadow-sm h-100">
            <h5 className="mb-3">Quick actions</h5>
            <div className="d-grid gap-2">
              <Link to="/admin/pages/home" className="btn btn-primary"><i className="fa fa-pen me-2"></i>Edit home page</Link>
              <button className="btn btn-light border" onClick={() => go("company")}><i className="fa fa-phone me-2"></i>Update contact info</button>
              <button className="btn btn-light border" onClick={() => go("services")}><i className="fa fa-tools me-2"></i>Manage services</button>
              <button className="btn btn-light border" onClick={() => go("account")}><i className="fa fa-key me-2"></i>Change password</button>
              <a href="/" target="_blank" rel="noreferrer" className="btn btn-light border"><i className="fa fa-external-link-alt me-2"></i>Open website</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Account() {
  const [cur, setCur] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (pw.length < 6) { toast.error("New password must be at least 6 characters."); return; }
    if (pw !== pw2) { toast.error("Passwords do not match."); return; }
    setBusy(true);
    const { data: u } = await supabase.auth.getUser();
    const check = await supabase.auth.signInWithPassword({ email: u.user!.email!, password: cur });
    if (check.error) { setBusy(false); toast.error("Current password is wrong."); return; }
    const { error } = await supabase.auth.updateUser({ password: pw, current_password: cur } as never);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    setCur(""); setPw(""); setPw2("");
    toast.success("Password changed.");
  };
  return (
    <form onSubmit={submit} className="bg-white p-4 shadow-sm" style={{ maxWidth: 480 }}>
      <h4 className="mb-4">Change admin password</h4>
      <label className="form-label">Current password</label>
      <input type="password" className="form-control mb-3" value={cur} onChange={(e) => setCur(e.target.value)} required autoComplete="current-password" />
      <label className="form-label">New password</label>
      <input type="password" className="form-control mb-3" value={pw} onChange={(e) => setPw(e.target.value)} required autoComplete="new-password" />
      <label className="form-label">Repeat new password</label>
      <input type="password" className="form-control mb-4" value={pw2} onChange={(e) => setPw2(e.target.value)} required autoComplete="new-password" />
      <button className="btn btn-primary px-4" disabled={busy}>{busy ? "Saving…" : "Change password"}</button>
    </form>
  );
}
