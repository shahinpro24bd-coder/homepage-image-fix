import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import hero3 from "@/assets/hero-3.webp";
import about1 from "@/assets/about-1.webp";
import about2 from "@/assets/about-2.webp";
import buildings from "@/assets/buildings.webp";
import { company, services } from "@/lib/site";
import { SectionTitle } from "@/components/site/Layout";
import { CtaBanner, Faq, Process, QuoteSection, ServicesGrid, WhoWeServe, WhyUs } from "@/components/site/Sections";
import amcImg from "@/assets/service-amc.webp";
import maintImg from "@/assets/service-maintenance.webp";

import { T, Img, useEditable } from "@/lib/editable";

const slides = [
  { img: hero1, title: "Reliable MEP Solutions for Buildings Across Dubai", text: "Professional electromechanical, HVAC, electrical, plumbing, and maintenance solutions designed to keep your property safe, comfortable, and operating efficiently." },
  { img: hero2, title: "Electrical Works You Can Depend On", text: "Installation, inspection, troubleshooting, and maintenance for residential and commercial properties." },
  { img: hero3, title: "Planned Maintenance For Long-Term Property Care", text: "Annual Maintenance Contracts and preventive MEP maintenance tailored to your building's systems." },
];

const tabs = [
  { title: "HVAC Works", get img() { return services[0]!.image; }, s: services[0]! },
  { title: "Electrical Works", get img() { return services[1]!.image; }, s: services[1]! },
  { title: "Plumbing Works", get img() { return services[2]!.image; }, s: services[2]! },
  { title: "MEP Maintenance", get img() { return services[3]!.image; }, s: services[3]! },
];

const audiences = [
  {
    img: amcImg, icon: "fa-home", title: "Villa & Apartment Owners", sub: "Residential",
    text: "AC, electrical and plumbing care for homes — from single repairs to year-round maintenance.",
  },
  {
    img: buildings, icon: "fa-building", title: "Commercial Buildings", sub: "Offices & Retail",
    text: "Dependable MEP support for offices, shops and retail units, with minimal disruption to tenants.",
  },
  {
    img: maintImg, icon: "fa-clipboard-list", title: "Facility Management", sub: "Property Managers",
    text: "Planned AMC programs and routine visits that keep building systems running throughout the year.",
  },
  {
    img: about1, icon: "fa-hard-hat", title: "Main Contractors", sub: "Fit-Out & Projects",
    text: "A reliable MEP partner for fit-out and project works, delivered to the agreed scope and timeline.",
  },
];


export function HomeContent() {
  const { edit, get, pick } = useEditable();
  const [i, setI] = useState(0);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (edit) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [edit]);
  const s = slides[i]!;
  const cur = tabs[tab]!;
  return (
    <>
      {/* Hero */}
      <section className="hero">
        {slides.map((sl, n) => (
          <img key={n} className={`hero-bg ${n === i ? "is-active" : ""}`} src={get(`home.hero.${n}.img`, sl.img)} alt="" loading="eager" decoding="async" width={1920} height={1088} />
        ))}
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="row">
            <div className="col-lg-11 col-xl-9" key={i}>
              <span className="hero-kicker animated fadeInDown"><T k="home.hero.kicker" d="QMEP Electromechanical LLC · Dubai, UAE" /></span>
              <h1 className="hero-title text-white animated fadeInUp"><T k={`home.hero.${i}.title`} d={s.title} /></h1>
              <p className="hero-text animated fadeInUp"><T k={`home.hero.${i}.text`} d={s.text} /></p>
              <div className="d-flex flex-wrap gap-3 animated fadeInUp">
                <Link to="/contact" className="btn btn-primary py-3 px-5"><T k="home.hero.btn1" d="Request a Free Quote" line /></Link>
                <Link to="/contact" className="btn hero-btn-outline py-3 px-5"><T k="home.hero.btn2" d="Contact Our Team" line /></Link>
                <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn hero-btn-wa py-3 px-4" aria-label="Chat on WhatsApp">
                  <i className="fab fa-whatsapp fs-5 me-2"></i><T k="home.hero.btn3" d="WhatsApp" line />
                </a>
              </div>
            </div>
          </div>
        </div>
        {edit && (
          <button type="button" className="cms-hero-pick" onClick={() => pick(`home.hero.${i}.img`)}><i className="fa fa-image me-2"></i>Change slide {i + 1} background</button>
        )}
        <div className="hero-nav">
          <div className="container d-flex align-items-center justify-content-between">
            <div className="d-flex gap-4">
              {slides.map((sl, n) => (
                <button key={n} type="button" onClick={() => setI(n)} className={`hero-step ${n === i ? "is-active" : ""}`}>
                  <span>0{n + 1}</span>
                  <small className="d-none d-md-block"><T k={`home.hero.${n}.step`} d={["HVAC", "Electrical", "Maintenance"][n]!} line /></small>
                </button>
              ))}
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="hero-arrow" aria-label="Previous" onClick={() => setI((i + slides.length - 1) % slides.length)}><i className="fa fa-arrow-left"></i></button>
              <button type="button" className="hero-arrow" aria-label="Next" onClick={() => setI((i + 1) % slides.length)}><i className="fa fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </section>
      <div className="pb-5"></div>


      {/* About */}
      <div className="band py-5 ab-section">
        <div className="ab-gridbg" aria-hidden="true" />
        <div className="container position-relative">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="ab-media">
                <span className="ab-frame" aria-hidden="true" />
                <span className="why-tick why-tick-tl" aria-hidden="true" />
                <span className="why-tick why-tick-tr" aria-hidden="true" />
                <Img k="home.about.img1" d={about1} className="ab-img-main" alt="MEP engineer reviewing building systems" />
                <Img k="home.about.img2" d={about2} className="ab-img-sub" alt="Technician installing an AC unit" />
                <div className="ab-badge">
                  <span className="ab-badge-num"><T k="home.about.badgeNum" d="6" line /></span>
                  <span className="ab-badge-text"><small><T k="home.about.badge1" d="Core" line /></small><strong><T k="home.about.badge2" d="MEP Services" line /></strong></span>
                </div>
                <span className="ab-vert" aria-hidden="true">QMEP · Dubai · UAE</span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="why-kicker"><span><T k="home.about.kicker" d="About Us" line /></span></div>
              <h1 className="display-5 mb-3"><T k="home.about.title" d="Your Trusted Partner For MEP Solutions" /></h1>
              <p className="ab-lead mb-4"><T k="home.about.lead" d="At QMEP Electromechanical LLC, we understand the importance of reliable building systems — air conditioning, electrical, plumbing and preventive maintenance that keep residential and commercial properties operating smoothly." /></p>
              <p className="ab-text mb-4"><T k="home.about.text" d="Whether you require routine maintenance, a technical repair, a new installation, or support for a commercial project, our team is ready to discuss your requirements." /></p>
              <div className="row g-3 mb-4">
                {[
                  { icon: "fa-fan", text: "Air Conditioning & HVAC" },
                  { icon: "fa-bolt", text: "Electrical Installations" },
                  { icon: "fa-tint", text: "Plumbing Works" },
                  { icon: "fa-tools", text: "Preventive Maintenance" },
                ].map((f, fi) => (
                  <div key={f.text} className="col-sm-6">
                    <div className="ab-check"><i className={`fa ${f.icon}`}></i><span><T k={`home.about.f${fi}`} d={f.text} /></span></div>
                  </div>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-3">
                <Link className="btn btn-primary py-3 px-5" to="/services"><T k="home.about.btn1" d="Discover Our Services" line /></Link>
                <Link className="ab-btn-ghost btn py-3 px-4" to="/about"><T k="home.about.btn2" d="More About Us" line /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServicesGrid />
      <WhyUs />

      {/* Project tabs */}
      <div className="band project py-5">
        <div className="container">
          <SectionTitle k="home.proj" kicker="Our Projects" title="Real Work. Practical Solutions." />
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="nav nav-pills d-flex justify-content-between w-100 h-100 me-4">
                {tabs.map((t, n) => (
                  <button key={t.title} type="button" onClick={() => setTab(n)}
                    className={`nav-link w-100 d-flex align-items-center text-start p-4 ${n < 3 ? "mb-4" : "mb-0"} ${tab === n ? "active" : ""}`}>
                    <h3 className="m-0">0{n + 1}. <T k={`home.proj.tab${n}`} d={t.title} line /></h3>
                  </button>
                ))}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-md-6" style={{ minHeight: 350 }}>
                  <div className="position-relative h-100">
                    <Img k={`services.${tab}.image`} d={cur.img} className="position-absolute img-fluid w-100 h-100" style={{ objectFit: "cover" }} alt={cur.title} />
                  </div>
                </div>
                <div className="col-md-6">
                  <h1 className="mb-3"><T k={`services.${tab}.title`} d={cur.s.title} /></h1>
                  <p className="mb-4"><T k={`services.${tab}.summary`} d={cur.s.summary} /></p>
                  {cur.s.items.slice(0, 3).map((it, j) => (
                    <p key={j}><i className="fa fa-check text-primary me-3"></i><T k={`services.${tab}.items.${j}`} d={it} /></p>
                  ))}
                  <Link to="/projects" className="btn btn-primary py-3 px-5 mt-3"><T k="home.proj.btn" d="View Our Projects" line /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who we serve */}
      <WhoWeServe audiences={audiences} />


      <Process />
      <CtaBanner k="home.cta" title="Plan Ahead. Maintain Your Property With Confidence." text="An Annual Maintenance Contract helps property owners and managers plan routine servicing for residential, villa, commercial, HVAC and combined MEP maintenance." button="Request an AMC Quote" />
      <QuoteSection />
      <Faq />
    </>
  );
}
