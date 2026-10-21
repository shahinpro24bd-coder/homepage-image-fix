import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { company, faqs, processSteps, services, whyUs } from "@/lib/site";
import { SectionTitle } from "./Layout";
import about1 from "@/assets/about-1.webp";
import about2 from "@/assets/about-2.webp";
import { T, Img } from "@/lib/editable";

export function ServicesGrid() {
  return (
    <div className="band py-5">
      <div className="container">
        <SectionTitle k="svcgrid" kicker="Our Core Services" title="Complete MEP Solutions For Your Property" />
        <div className="row g-4">
          {services.map((s, i) => (
            <div key={s.slug} className="col-lg-4 col-md-6">
              <Link to="/services/$slug" params={{ slug: s.slug }} className="svc-card">
                <Img k={`services.${i}.image`} d={s.image} className="svc-bg" alt={s.title} />
                <span className="svc-shade" aria-hidden="true" />
                <span className="svc-grid" aria-hidden="true" />
                <div className="svc-body">
                  <div className="svc-top">
                    <span className="svc-icon"><i className={`fa ${s.icon}`}></i></span>
                    <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="svc-title"><T k={`services.${i}.title`} d={s.title} /></h3>
                  <p className="svc-text"><T k={`services.${i}.summary`} d={s.summary} /></p>
                  <span className="svc-more">
                    <span className="svc-more-btn"><i className="fa fa-plus"></i><em><T k="svcgrid.more" d="Read More" line /></em></span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhyUs() {
  return (
    <div className="band py-5 why-section">
      <div className="why-gridbg" aria-hidden="true" />
      <div className="container position-relative">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="why-kicker"><span><T k="why.kicker" d="Why Choose Us" line /></span></div>
            <h1 className="display-5 mb-3"><T k="why.title" d="Practical Solutions. Professional Service. Reliable Support." /></h1>
            <p className="why-lead mb-4"><T k="why.lead" d="We focus on practical solutions, professional service, and clear communication throughout every stage of a project." /></p>
            <div className="row g-3">
              {whyUs.slice(0, 4).map((w, i) => (
                <div key={w.title} className="col-sm-6">
                  <div className="why-card">
                    <span className="why-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="why-icon"><i className={`fa ${w.icon}`}></i></span>
                    <h3 className="why-title"><T k={`why.${i}.title`} d={w.title} /></h3>
                    <p className="why-text"><T k={`why.${i}.text`} d={w.text} /></p>
                    <span className="why-corner" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/about" className="btn btn-primary py-3 px-5"><T k="why.btn" d="More About Our Company" line /></Link>
              <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="why-btn-ghost btn py-3 px-4">
                <i className="fab fa-whatsapp me-2"></i><T k="why.wa" d="Chat on WhatsApp" line />
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="why-media">
              <span className="why-tick why-tick-tl" aria-hidden="true" />
              <span className="why-tick why-tick-tr" aria-hidden="true" />
              <span className="why-tick why-tick-bl" aria-hidden="true" />
              <span className="why-tick why-tick-br" aria-hidden="true" />
              <Img k="why.img1" d={about1} className="why-img-main" alt="MEP engineer on site in Dubai" />
              <Img k="why.img2" d={about2} className="why-img-sub" alt="VRF indoor unit installation" />
              <a className="why-badge" href={company.phoneHref}>
                <span className="why-badge-icon"><i className="fa fa-phone-alt"></i></span>
                <span className="why-badge-text">
                  <small>Call Our Team</small>
                  <strong>{company.phone}</strong>
                </span>
              </a>
              <span className="why-vert" aria-hidden="true">QMEP &mdash; MEP Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhoWeServe({ audiences }: {
  audiences: { img: string; title: string; sub: string; icon: string; text: string }[];
}) {
  return (
    <div className="band py-5 aud-section">
      <div className="aud-gridbg" aria-hidden="true" />
      <div className="container position-relative">
        <div className="row g-4 align-items-end">
          <div className="col-lg-7">
            <div className="why-kicker"><span><T k="aud.kicker" d="Who We Serve" line /></span></div>
            <h1 className="display-5 mb-3"><T k="aud.title" d="Supporting Property Owners, Managers & Contractors" /></h1>
            <p className="why-lead mb-0"><T k="aud.lead" d="From single villas to commercial facilities, we adapt our MEP services to the property you manage and the way you work." /></p>
          </div>
          <div className="col-lg-5">
            <div className="d-flex justify-content-lg-end">
              <a className="aud-call" href={company.phoneHref}>
                <span className="aud-call-icon"><i className="fa fa-phone-alt"></i></span>
                <span className="aud-call-text">
                  <small>Call Our Team</small>
                  <strong>{company.phone}</strong>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="row g-4 pt-4">
          {audiences.map((a, i) => (
            <div key={a.title} className="col-lg-3 col-md-6">
              <div className="aud-card">
                <div className="aud-media">
                  <Img k={`aud.${i}.img`} d={a.img} alt={a.title} />
                  <span className="aud-shade" aria-hidden="true" />
                  <span className="aud-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="aud-corner" aria-hidden="true" />
                </div>
                <div className="aud-body">
                  <span className="aud-icon"><i className={`fa ${a.icon}`}></i></span>
                  <h3 className="aud-title"><T k={`aud.${i}.title`} d={a.title} /></h3>
                  <span className="aud-sub"><T k={`aud.${i}.sub`} d={a.sub} line /></span>
                  <p className="aud-text"><T k={`aud.${i}.text`} d={a.text} /></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const processIcons = ["fa-comments", "fa-search", "fa-file-invoice", "fa-tools", "fa-check-circle"];

export function Process() {
  return (
    <div className="band py-5 prc-section">
      <div className="prc-gridbg" aria-hidden="true" />
      <div className="container position-relative py-4">
        <div className="row g-4 align-items-end mb-5">
          <div className="col-lg-7">
            <div className="why-kicker"><span><T k="prc.kicker" d="Our Work Process" line /></span></div>
            <h1 className="display-5 mb-0 prc-heading"><T k="prc.title" d="A Clear And Straightforward Approach" /></h1>
          </div>
          <div className="col-lg-5">
            <p className="prc-lead mb-0"><T k="prc.lead" d="Five simple steps from your first message to a completed job — transparent, scheduled and fully communicated." /></p>
          </div>
        </div>
        <div className="prc-track">
          <span className="prc-line" aria-hidden="true" />
          {processSteps.map((p, i) => (
            <div key={p.title} className="prc-step">
              <div className="prc-node">
                <span className="prc-node-ring" aria-hidden="true" />
                <i className={`fa ${processIcons[i] ?? "fa-check"}`}></i>
              </div>
              <div className="prc-card">
                <span className="prc-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="prc-label">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="prc-title"><T k={`prc.${i}.title`} d={p.title} /></h3>
                <p className="prc-text"><T k={`prc.${i}.text`} d={p.text} /></p>
                <span className="why-corner" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="band py-5 faq-section">
      <div className="container py-4">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="faq-side">
              <div className="why-kicker"><span><T k="faq.kicker" d="FAQ" line /></span></div>
              <h1 className="display-5 mb-3"><T k="faq.title" d="Frequently Asked Questions" /></h1>
              <p className="why-lead mb-4"><T k="faq.lead" d="Quick answers about our services, maintenance contracts and how to get a quotation." /></p>
              <a className="faq-help" href={company.whatsappHref} target="_blank" rel="noreferrer">
                <span className="faq-help-icon"><i className="fab fa-whatsapp"></i></span>
                <span><small>Still have questions?</small><strong>Ask our team</strong></span>
                <i className="fa fa-arrow-right ms-auto"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-8">
            {faqs.map((f, i) => {
              const on = open === i;
              return (
                <div key={i} className={`faq-item${on ? " is-open" : ""}`}>
                  <button type="button" className="faq-q" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}>
                    <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-title"><T k={`faqs.${i}.q`} d={f.q} /></span>
                    <span className="faq-toggle"><i className="fa fa-plus"></i></span>
                  </button>
                  <div className="faq-a"><div><p><T k={`faqs.${i}.a`} d={f.a} /></p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    setBusy(true); setErr("");
    const { supabase } = await import("@/lib/supabase");
    const { error } = await supabase.from("quote_requests").insert({
      name: v("name"), company: v("company") || null, phone: v("phone"), email: v("email") || null,
      location: v("location"), service: v("service"), property_type: v("property_type") || null, details: v("details"),
    });
    setBusy(false);
    if (error) setErr("Sorry, we couldn't send your request. Please try again or call us.");
    else setSent(true);
  };
  if (sent)
    return (
      <div className="qt-form qt-thanks text-center h-100 d-flex flex-column justify-content-center">
        <i className="fa fa-check-circle fa-4x text-primary mb-4"></i>
        <h3>Thank You!</h3>
        <p className="mb-0">Thank you for contacting QMEP Electromechanical LLC. Your inquiry has been received. Our team will review the information and contact you regarding the next steps.</p>
      </div>
    );
  const h = { height: 55 };
  return (
    <form onSubmit={submit} className="qt-form row g-3 mx-0">
      <div className="col-12 qt-form-head"><span className="qt-form-tag">Free Quotation</span><h3 className="mb-1">Tell Us About Your Project</h3><p className="mb-0">We usually respond within one working day.</p></div>
      <div className="col-12 col-sm-6"><input name="name" required maxLength={120} className="form-control" placeholder="Full Name" style={h} /></div>
      <div className="col-12 col-sm-6"><input name="company" maxLength={120} className="form-control" placeholder="Company Name (Optional)" style={h} /></div>
      <div className="col-12 col-sm-6"><input name="phone" required maxLength={40} type="tel" className="form-control" placeholder="Phone Number" style={h} /></div>
      <div className="col-12 col-sm-6"><input name="email" maxLength={200} type="email" className="form-control" placeholder="Email Address (Optional)" style={h} /></div>
      <div className="col-12 col-sm-6"><input name="location" required maxLength={200} className="form-control" placeholder="Property Location" style={h} /></div>
      <div className="col-12 col-sm-6">
        <select name="service" required className="form-select" style={h} defaultValue="">
          <option value="" disabled>Service Required</option>
          {services.map((s) => <option key={s.slug}>{s.title}</option>)}
          <option>Other</option>
        </select>
      </div>
      <div className="col-12">
        <select name="property_type" className="form-select" style={h} defaultValue="">
          <option value="" disabled>Property Type</option>
          <option>Villa</option><option>Apartment</option><option>Residential Building</option>
          <option>Office</option><option>Retail / Commercial</option><option>Other</option>
        </select>
      </div>
      <div className="col-12"><textarea name="details" required maxLength={3000} className="form-control" rows={5} placeholder="Project Details"></textarea></div>
      {err && <div className="col-12 text-danger">{err}</div>}
      <div className="col-12"><button className="btn btn-primary w-100 py-3" type="submit" disabled={busy}>{busy ? "Sending…" : "Request My Quote"}</button></div>
    </form>
  );
}

export function QuoteSection() {
  return (
    <div className="band py-5 qt-section">
      <div className="container py-4">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <div className="why-kicker"><span><T k="qt.kicker" d="Request a Quote" line /></span></div>
            <h1 className="display-5 mb-4"><T k="qt.title" d="Need Professional MEP Support?" /></h1>
            <p className="why-lead mb-4"><T k="qt.lead" d="From air conditioning and electrical work to plumbing and planned maintenance, QMEP Electromechanical LLC is ready to discuss your requirements. Tell us about your property or project, and let us help you identify the next steps." /></p>
            <div className="row g-3">
              <ContactLine icon="fa-phone-alt" label="Call Our Team" value={company.phone} href={company.phoneHref} />
              <ContactLine icon="fa-whatsapp" brand label="Chat on WhatsApp" value="Message Us Now" href={company.whatsappHref} />
              <ContactLine icon="fa-envelope-open" label="Mail Us Now" value={company.email} href={`mailto:${company.email}`} />
            </div>
          </div>
          <div className="col-lg-7"><QuoteForm /></div>
        </div>
      </div>
    </div>
  );
}

export function ContactLine({ icon, label, value, href, brand }: { icon: string; label: string; value: string; href?: string; brand?: boolean }) {
  return (
    <div className="col-12">
      <a className="qt-line" href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        <span className="qt-line-icon"><i className={`${brand ? "fab" : "fa"} ${icon}`}></i></span>
        <span className="qt-line-text"><small>{label}</small><strong>{value}</strong></span>
        <i className="fa fa-arrow-right qt-line-arrow"></i>
      </a>
    </div>
  );
}

export function CtaBanner({ title, text, button, k }: { title: string; text: string; button: string; k?: string | undefined }) {
  return (
    <div className="band py-5">
      <div className="container">
        <div className="cta-box">
          <span className="cta-grid" aria-hidden="true" />
          <span className="why-tick why-tick-tl" aria-hidden="true" />
          <span className="why-tick why-tick-br" aria-hidden="true" />
          <div className="row g-4 align-items-center position-relative">
            <div className="col-lg-7 text-center text-lg-start">
              <div className="why-kicker justify-content-center justify-content-lg-start"><span><T k={k && `${k}.kicker`} d="Annual Maintenance" line /></span></div>
              <h1 className="display-6 mb-3"><T k={k && `${k}.title`} d={title} /></h1>
              <p className="mb-0 why-lead"><T k={k && `${k}.text`} d={text} /></p>
            </div>
            <div className="col-lg-5">
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-primary py-3 px-4"><T k={k && `${k}.button`} d={button} line /><i className="fa fa-arrow-right ms-2"></i></Link>
                <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-dark py-3 px-4">
                  <i className="fab fa-whatsapp me-2"></i>Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
