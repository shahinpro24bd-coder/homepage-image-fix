import { createFileRoute, Link } from "@tanstack/react-router";
import buildings from "@/assets/buildings.webp";
import imgRes from "@/assets/about-1.webp";
import imgCom from "@/assets/hero-2.webp";
import imgFit from "@/assets/about-2.webp";
import imgFm from "@/assets/service-maintenance.webp";
import imgMc from "@/assets/hero-3.webp";
import { PageHeader } from "@/components/site/Layout";
import { CtaBanner } from "@/components/site/Sections";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve | QMEP Electromechanical LLC" },
      { name: "description", content: "MEP solutions for residential, commercial, fit-out, facility management and main contractor projects in Dubai." },
      { property: "og:title", content: "Industries We Serve | QMEP" },
      { property: "og:description", content: "MEP solutions for different property types." },
    ],
  }),
  component: Industries,
});

const list = [
  { img: imgRes, tag: "Villas · Apartments", icon: "fa-home", title: "Residential Properties", text: "Maintenance and repair support for villas, apartments, and residential buildings." },
  { img: imgCom, tag: "Offices · Retail", icon: "fa-building", title: "Commercial Buildings", text: "MEP services for offices, retail spaces, and commercial facilities." },
  { img: imgFit, tag: "Interiors · Coordination", icon: "fa-drafting-compass", title: "Fit-Out Projects", text: "Coordination and technical support for electromechanical requirements within fit-out projects." },
  { img: imgFm, tag: "Service Scopes · AMC", icon: "fa-clipboard-list", title: "Property & Facility Management", text: "Maintenance support aligned with agreed service scopes and property requirements." },
  { img: imgMc, tag: "Specs · Schedules", icon: "fa-hard-hat", title: "Main Contractors", text: "MEP project support based on technical specifications, project schedules, and contractual requirements." },
];

function Industries() {
  return (
    <>
      <PageHeader title="Industries" crumb="Industries We Serve" image={buildings} />
      <section className="ind-section">
        <span className="ind-grid-bg" aria-hidden="true" />
        <div className="container position-relative">
          <div className="ind-head">
            <div>
              <span className="ind-kicker">Industries We Serve</span>
              <h2 className="ind-title">MEP Solutions For Different <em>Property Types</em></h2>
            </div>
            <p className="ind-lead">From private villas to large commercial sites, we adapt our electromechanical expertise to the way each property works.</p>
          </div>
          <div className="ind-bento">
            {list.map((l, i) => (
              <article key={l.title} className={`ind-card ind-card--${i + 1}`}>
                <img src={l.img} alt={l.title} className="ind-img" />
                <span className="ind-shade" aria-hidden="true" />
                <span className="ind-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="ind-body">
                  <span className="ind-icon"><i className={`fa ${l.icon}`}></i></span>
                  <span className="ind-tag">{l.tag}</span>
                  <h3 className="ind-card-title">{l.title}</h3>
                  <p className="ind-text">{l.text}</p>
                </div>
                <span className="ind-corner" aria-hidden="true" />
              </article>
            ))}
            <Link to="/contact" className="ind-card ind-card--cta">
              <span className="ind-kicker">Not listed?</span>
              <h3 className="ind-card-title">Tell us about your property</h3>
              <span className="ind-cta-btn">Get in touch <i className="fa fa-arrow-right"></i></span>
            </Link>
          </div>
        </div>
      </section>
      <CtaBanner title="Discuss Your Requirements" text="Whatever your property type, our team is ready to understand your needs and recommend suitable MEP solutions." button="Discuss Your Requirements" />
    </>
  );
}
