import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import hero3 from "@/assets/hero-3.webp";
import { services } from "@/lib/site";
import { PageHeader, SectionTitle } from "@/components/site/Layout";
import { CtaBanner } from "@/components/site/Sections";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Our Projects | QMEP Electromechanical LLC" },
      { name: "description", content: "Explore HVAC, electrical, plumbing and MEP maintenance work by QMEP Electromechanical LLC in Dubai." },
      { property: "og:title", content: "Our Projects | QMEP Electromechanical" },
      { property: "og:description", content: "Real work. Practical solutions." },
    ],
  }),
  component: Projects,
});

// Category showcase until verified project details are supplied.
const categories = services.map((s, n) => ({
  ...s,
  property: ["Villa / Residential", "Office / Commercial", "Residential Building", "Commercial Property", "Mixed-Use Building", "Commercial Tower"][n] ?? "Property",
  sector: n % 2 === 0 ? "Residential" : "Commercial",
}));
const filters = ["All", "Residential", "Commercial"] as const;

function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = filter === "All" ? categories : categories.filter((c) => c.sector === filter);
  return (
    <>
      <PageHeader title="Projects" crumb="Projects" image={hero3} />
      <div className="band py-5">
        <div className="container">
          <SectionTitle kicker="Our Projects" title="Demonstrating Our Work Through Real Projects" />
          <p className="text-center mx-auto mb-5" style={{ maxWidth: 800 }}>
            Our project portfolio gives clients a clearer understanding of the work undertaken by QMEP Electromechanical LLC, including maintenance, HVAC, electrical, plumbing and other electromechanical work.
          </p>
          <div className="pj-filters" role="tablist">
            {filters.map((f) => (
              <button key={f} type="button" role="tab" aria-selected={filter === f}
                className={`pj-filter ${filter === f ? "is-active" : ""}`} onClick={() => setFilter(f)}>
                {f}<span>{f === "All" ? categories.length : categories.filter((c) => c.sector === f).length}</span>
              </button>
            ))}
          </div>
          <div className="pj-grid">
            {shown.map((c, i) => (
              <article key={c.slug} className="pj-card">
                <div className="pj-media">
                  <img src={c.image} alt={c.title} />
                  <span className="pj-shade" aria-hidden="true" />
                  <span className="pj-chip"><i className={`fa ${c.icon}`}></i>{c.sector}</span>
                  <span className="pj-num">{String(i + 1).padStart(2, "0")}</span>
                  <Link to="/services/$slug" params={{ slug: c.slug }} className="pj-zoom" aria-label={`View ${c.title}`}>
                    <i className="fa fa-arrow-right"></i>
                  </Link>
                  <div className="pj-overlay-title">
                    <span>{c.property}</span>
                    <h3>{c.title} Project</h3>
                  </div>
                </div>
                <div className="pj-body">
                  <div className="pj-meta">
                    <div><small>Property</small><strong>{c.property}</strong></div>
                    <div><small>Location</small><strong>Dubai, UAE</strong></div>
                  </div>
                  <div className="pj-scope">
                    {c.items.slice(0, 3).map((it) => <span key={it}>{it}</span>)}
                  </div>
                  <Link to="/services/$slug" params={{ slug: c.slug }} className="pj-link">
                    View Service <i className="fa fa-long-arrow-alt-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <CtaBanner title="Discuss Your Project" text="Tell us about your property or project, and let us help you identify the next steps." button="Discuss Your Project" />
    </>
  );
}
