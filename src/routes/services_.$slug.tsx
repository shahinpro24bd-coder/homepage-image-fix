import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { company, services } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";
import { CtaBanner } from "@/components/site/Sections";
import { serviceDetails } from "@/lib/service-details";
import { useState } from "react";

export const Route = createFileRoute("/services_/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const s = services.find((x) => x.slug === loaderData?.slug);
    const title = s ? `${s.title} in Dubai | QMEP Electromechanical` : "Service | QMEP";
    const desc = s?.summary ?? "MEP services by QMEP Electromechanical LLC.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container py-5 text-center">
      <h1 className="display-5">Service not found</h1>
      <Link to="/services" className="btn btn-primary mt-3 py-3 px-5">View All Services</Link>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const idx = services.findIndex((s) => s.slug === slug);
  const s = services[idx]!;
  const others = services.filter((x) => x.slug !== slug);
  const d = serviceDetails[slug]!;
  const flip = idx % 2 === 1;
  const [openQ, setOpenQ] = useState(0);

  return (
    <>
      <PageHeader title={s.title} crumb={s.title} image={s.image} />

      <section className="sd-intro">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className={`col-lg-6 ${flip ? "order-lg-2" : ""}`}>
              <div className="sd-media">
                <img src={s.image} alt={s.title} className="sd-img" decoding="async" />
                <span className="sd-frame" aria-hidden="true" />
                <div className="sd-badge">
                  <span className="sd-badge-icon"><i className={`fa ${s.icon}`}></i></span>
                  <span><small>Service</small><strong>{String(idx + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</strong></span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <span className="ind-kicker">Service Overview</span>
              <h2 className="sd-title">{s.title}</h2>
              <p className="sd-lead">{s.summary}</p>
              <p>{d.intro}</p>
              <div className="sd-stats">
                {d.stats.map((st) => (
                  <div key={st.label} className="sd-stat"><strong>{st.value}</strong><small>{st.label}</small></div>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link to="/contact" className="btn btn-primary py-3 px-5">{s.cta}</Link>
                <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-outline-primary py-3 px-4"><i className="fab fa-whatsapp me-2"></i>WhatsApp Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sd-scope">
        <div className="container">
          <div className="sd-scope-head">
            <span className="ind-kicker">What's Included</span>
            <h2 className="sd-title text-white">Scope of Work</h2>
          </div>
          <div className={flip ? "sd-scope-list" : "sd-scope-grid"}>
            {s.items.map((it, i) => (
              <div key={it} className="sd-scope-item">
                <span className="sd-scope-num">{String(i + 1).padStart(2, "0")}</span>
                <i className="fa fa-check sd-scope-check"></i>
                <h3>{it}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sd-signs">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className={`col-lg-5 ${flip ? "" : "order-lg-2"}`}>
              <span className="ind-kicker">Good To Know</span>
              <h2 className="sd-title">{d.signsTitle}</h2>
              <p className="mb-4">If any of these sound familiar, our team can inspect and advise on the right next step.</p>
              <Link to="/contact" className="btn btn-primary py-3 px-5">Book an Inspection</Link>
            </div>
            <div className="col-lg-7">
              <ul className="sd-signs-list">
                {d.signs.map((g) => (
                  <li key={g}><i className="fa fa-exclamation"></i>{g}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sd-benefits">
        <div className="container">
          <div className="row g-0">
            {d.benefits.map((bn, i) => (
              <div key={bn.title} className="col-md-4">
                <div className="sd-benefit">
                  <span className="sd-benefit-num">{String(i + 1).padStart(2, "0")}</span>
                  <i className={`fa ${bn.icon} sd-benefit-icon`}></i>
                  <h3>{bn.title}</h3>
                  <p className="mb-0">{bn.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sd-others">
        <div className="container">
          <div className="sd-scope-head">
            <span className="ind-kicker">Explore More</span>
            <h2 className="sd-title">Other Services</h2>
          </div>
          <div className="row g-4">
            {others.map((o) => (
              <div key={o.slug} className="col-lg-4 col-md-6">
                <Link to="/services/$slug" params={{ slug: o.slug }} className="sd-other">
                  <img src={o.image} alt={o.title} />
                  <span className="sd-other-body">
                    <span className="sd-other-icon"><i className={`fa ${o.icon}`}></i></span>
                    <strong>{o.title}</strong>
                    <i className="fa fa-arrow-right sd-other-arrow"></i>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sd-faq">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <span className="ind-kicker">Questions</span>
              <h2 className="sd-title">{s.title} FAQs</h2>
              <a href={company.phoneHref} className="aud-call mt-3"><i className="fa fa-phone-alt"></i> {company.phone}</a>
            </div>
            <div className="col-lg-8">
              {d.faqs.map((f, i) => (
                <div key={f.q} className={`sd-q ${openQ === i ? "is-open" : ""}`}>
                  <button type="button" onClick={() => setOpenQ(openQ === i ? -1 : i)}>
                    <span>{f.q}</span><i className="fa fa-plus"></i>
                  </button>
                  <div className="sd-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBanner title={`Need ${s.title}?`} text="Tell us about your property and requirements. Our team will review the details and advise on the next steps." button={s.cta} />
    </>
  );
}
