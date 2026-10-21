import { createFileRoute, Link } from "@tanstack/react-router";
import hero1 from "@/assets/hero-1.webp";
import about1 from "@/assets/about-1.webp";
import about2 from "@/assets/about-2.webp";
import buildings from "@/assets/buildings.webp";
import hvacImg from "@/assets/service-hvac.webp";
import elecImg from "@/assets/service-electrical.webp";
import plumbImg from "@/assets/service-plumbing.webp";
import { PageHeader } from "@/components/site/Layout";
import { services } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | QMEP Electromechanical LLC" },
      { name: "description", content: "Learn about QMEP Electromechanical LLC, our mission, vision and core values in MEP services in Dubai." },
      { property: "og:title", content: "About QMEP Electromechanical LLC" },
      { property: "og:description", content: "Supporting better-performing buildings through MEP solutions." },
    ],
  }),
  component: About,
});

const pillars = [
  { letter: "M", word: "Mechanical", img: hvacImg, text: "Air conditioning, ventilation and VRF/VRV systems that keep spaces comfortable all year.", items: ["AC & HVAC", "VRF/VRV", "Ventilation"] },
  { letter: "E", word: "Electrical", img: elecImg, text: "Installation, upgrades and fault-finding for safe, dependable power and lighting.", items: ["Power & DB", "Lighting", "Inspections"] },
  { letter: "P", word: "Plumbing", img: plumbImg, text: "Water supply, drainage and leak repairs that protect your property from damage.", items: ["Water supply", "Drainage", "Leak repair"] },
];

const approach = [
  { icon: "fa-comments", title: "Listen First", text: "We start by understanding your property, your systems and what you actually need." },
  { icon: "fa-search", title: "Assess Honestly", text: "We inspect, explain what we find, and recommend only the work that makes sense." },
  { icon: "fa-file-signature", title: "Agree the Scope", text: "Clear scope, timeline and pricing in writing before any work begins." },
  { icon: "fa-tools", title: "Deliver With Care", text: "Clean, careful workmanship with respect for your property and occupants." },
  { icon: "fa-handshake", title: "Stay in Touch", text: "Follow-up, records and maintenance advice to keep systems running well." },
];

const clients = ["Villa Owners", "Apartment Residents", "Landlords", "Property Managers", "Facility Managers", "Offices", "Retail Spaces", "Fit-Out Contractors", "Main Contractors"];

const values = [
  { icon: "fa-award", title: "Quality", text: "Focus on workmanship and applicable technical requirements." },
  { icon: "fa-balance-scale", title: "Integrity", text: "Communicate honestly about services, pricing, and project scope." },
  { icon: "fa-hard-hat", title: "Responsibility", text: "Approach each assignment with care and professionalism." },
  { icon: "fa-user-check", title: "Customer Focus", text: "Understand client requirements before recommending solutions." },
  { icon: "fa-chart-line", title: "Continuous Improvement", text: "Seek better ways to deliver effective and efficient services." },
];

function About() {
  return (
    <>
      <PageHeader title="About Us" crumb="About" image={hero1} />
      <div className="band py-5 ab-section">
        <div className="ab-gridbg" aria-hidden="true" />
        <div className="container position-relative">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="ab-media">
                <span className="ab-frame" aria-hidden="true" />
                <span className="why-tick why-tick-tl" aria-hidden="true" />
                <span className="why-tick why-tick-tr" aria-hidden="true" />
                <img className="ab-img-main" src={about1} alt="MEP engineer on a Dubai project" />
                <img className="ab-img-sub" src={about2} alt="AC technician at work" />
                <span className="ab-vert" aria-hidden="true">QMEP · Dubai · UAE</span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="why-kicker"><span>About QMEP</span></div>
              <h1 className="display-5 mb-3">Supporting Better-Performing Buildings Through MEP Solutions</h1>
              <p className="ab-lead mb-4">QMEP Electromechanical LLC is an electromechanical services company focused on building systems, maintenance, and technical service requirements.</p>
              <p className="ab-text mb-3">We understand that properly functioning mechanical, electrical, and plumbing systems are essential to the comfort, safety, and day-to-day operation of a property.</p>
              <p className="ab-text mb-4">Our approach is built around understanding each client's needs, discussing practical solutions, and carrying out work according to the agreed project scope — building long-term relationships through clear communication and a commitment to quality.</p>
              <Link className="btn btn-primary py-3 px-5" to="/contact">Talk to Our Team</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="abx-marquee" aria-hidden="true">
        <div className="abx-marquee-track">
          {[...services, ...services].map((sv, i) => (
            <span key={i}><i className={`fa ${sv.icon}`}></i>{sv.title}</span>
          ))}
        </div>
      </div>

      <section className="abx-mv">
        <div className="container">
          <div className="abx-mv-grid">
            <div className="abx-mv-card abx-mv-card--dark">
              <span className="abx-mv-word" aria-hidden="true">Mission</span>
              <span className="abx-mv-icon"><i className="fa fa-bullseye"></i></span>
              <span className="ind-kicker">What drives us</span>
              <h2>Our Mission</h2>
              <p>To provide practical and dependable electromechanical solutions that help our clients maintain functional, comfortable, and well-maintained properties.</p>
            </div>
            <div className="abx-mv-img">
              <img src={buildings} alt="Dubai buildings" />
              <span className="abx-mv-tag">Dubai · UAE</span>
            </div>
            <div className="abx-mv-card">
              <span className="abx-mv-word" aria-hidden="true">Vision</span>
              <span className="abx-mv-icon"><i className="fa fa-eye"></i></span>
              <span className="ind-kicker">Where we're going</span>
              <h2>Our Vision</h2>
              <p>To build lasting client relationships and become a trusted choice for MEP and maintenance solutions through consistent service and professional development.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="abx-pillars">
        <div className="container">
          <div className="abx-head">
            <span className="ind-kicker">What We Do</span>
            <h2 className="sd-title text-white">Three Disciplines. <em>One Team.</em></h2>
          </div>
          <div className="abx-pillar-grid">
            {pillars.map((pl) => (
              <div key={pl.letter} className="abx-pillar">
                <img src={pl.img} alt={pl.word} />
                <span className="abx-pillar-shade" aria-hidden="true" />
                <span className="abx-pillar-letter">{pl.letter}</span>
                <div className="abx-pillar-body">
                  <h3>{pl.word}</h3>
                  <p>{pl.text}</p>
                  <div className="abx-pillar-tags">{pl.items.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="abx-values">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="abx-sticky">
                <span className="ind-kicker">Core Values</span>
                <h2 className="sd-title">What Guides Every Project</h2>
                <p>Five principles shape how we quote, how we work and how we treat every property we step into.</p>
                <span className="abx-values-big" aria-hidden="true">05</span>
              </div>
            </div>
            <div className="col-lg-8">
              {values.map((v, i) => (
                <div key={v.title} className="abx-value">
                  <span className="abx-value-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="abx-value-icon"><i className={`fa ${v.icon}`}></i></span>
                  <div><h3>{v.title}</h3><p className="mb-0">{v.text}</p></div>
                  <i className="fa fa-arrow-right abx-value-arrow"></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="abx-approach">
        <div className="container">
          <div className="abx-head text-center mx-auto">
            <span className="ind-kicker">Our Approach</span>
            <h2 className="sd-title">How We Work With You</h2>
          </div>
          <div className="abx-path">
            {approach.map((a, i) => (
              <div key={a.title} className="abx-step">
                <span className="abx-step-dot"><i className={`fa ${a.icon}`}></i></span>
                <span className="abx-step-num">Step {String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p className="mb-0">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="abx-clients">
        <div className="container">
          <div className="abx-clients-box">
            <div>
              <span className="ind-kicker">Who We Work With</span>
              <h2 className="sd-title mb-0">From single homes to commercial sites</h2>
            </div>
            <div className="abx-chips">
              {clients.map((c) => <span key={c}><i className="fa fa-check"></i>{c}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="abx-commit" style={{ backgroundImage: `url(${about2})` }}>
        <div className="container">
          <div className="abx-commit-inner">
            <i className="fa fa-quote-left abx-quote"></i>
            <span className="ind-kicker">Our Commitment</span>
            <p className="abx-commit-text">Every property has different requirements. We aim to understand those requirements, explain the available options, and agree on a clear scope of work before starting a project.</p>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <Link className="btn btn-primary py-3 px-5" to="/contact">Talk to Our Team</Link>
              <Link className="btn ft-ghost py-3 px-5" to="/services">Explore Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
