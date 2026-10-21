import { T } from "@/lib/editable";
import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { company, services } from "@/lib/site";


export function Topbar() {
  return (
    <div className="container-fluid bg-dark p-0">
      <div className="row gx-0 d-none d-lg-flex">
        <div className="col-lg-7 px-5 text-start">
          <div className="h-100 d-inline-flex align-items-center py-3 me-3">
            <a className="text-body px-2" href={company.phoneHref}>
              <i className="fa fa-phone-alt text-primary me-2"></i>
              {company.phone}
            </a>
            <a className="text-body px-2" href={`mailto:${company.email}`}>
              <i className="fa fa-envelope-open text-primary me-2"></i>
              {company.email}
            </a>
          </div>
        </div>
        <div className="col-lg-5 px-5 text-end">
          <div className="h-100 d-inline-flex align-items-center py-3 me-2">
            <span className="text-body px-2">
              <i className="fa fa-clock text-primary me-2"></i>
              {company.hours}
            </span>
          </div>
          <div className="h-100 d-inline-flex align-items-center">
            <a className="btn btn-sm-square btn-outline-body me-1" href={company.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a className="btn btn-sm-square btn-outline-body me-1" href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a className="btn btn-sm-square btn-outline-body me-1" href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a className="btn btn-sm-square btn-outline-body me-0" href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}

const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
] as const;

const moreLinks = [
  { to: "/amc", label: "AMC Packages", desc: "Annual maintenance plans", icon: "fa-file-contract" },
  { to: "/industries", label: "Industries We Serve", desc: "Residential, commercial & more", icon: "fa-industry" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`qn ${scrolled ? "qn--scrolled" : ""}`}>
        <div className="qn-inner">
          <Link to="/" className="qn-brand" onClick={close} aria-label="QMEP home">
            <span className="qn-mark"><i className="fa fa-cogs"></i></span>
            <span className="qn-brand-text">
              <strong>QMEP</strong>
              <small>Electromechanical</small>
            </span>
          </Link>

          <nav className="qn-links" aria-label="Main">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} className="qn-link" activeProps={{ className: "qn-link is-active" }}
                activeOptions={{ exact: "exact" in l }}>
                <span>{l.label}</span>
              </Link>
            ))}
            <div className="qn-more">
              <button type="button" className="qn-link qn-more-btn" aria-haspopup="true">
                <span>More</span><i className="fa fa-chevron-down"></i>
              </button>
              <div className="qn-panel">
                {moreLinks.map((m) => (
                  <Link key={m.to} to={m.to} className="qn-panel-item" activeProps={{ className: "qn-panel-item is-active" }}>
                    <span className="qn-panel-icon"><i className={`fa ${m.icon}`}></i></span>
                    <span className="qn-panel-text"><strong>{m.label}</strong><small>{m.desc}</small></span>
                    <i className="fa fa-arrow-right qn-panel-arrow"></i>
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/contact" className="qn-link" activeProps={{ className: "qn-link is-active" }}><span>Contact</span></Link>
          </nav>

          <div className="qn-actions">
            <a href={company.phoneHref} className="qn-call">
              <span className="qn-call-icon"><i className="fa fa-phone-alt"></i></span>
              <span className="qn-call-text"><small>Call 24/7</small><strong>{company.phone}</strong></span>
            </a>
            <Link to="/contact" className="qn-cta">
              <span>Free Quote</span><i className="fa fa-arrow-right"></i>
            </Link>
            <button type="button" className={`qn-burger ${open ? "is-open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <span className="qn-progress" aria-hidden="true" />
      </header>

      <div className={`qn-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="qn-drawer-backdrop" onClick={close} />
        <aside className="qn-drawer-panel">
          <div className="qn-drawer-kicker">Navigation</div>
          {[...navLinks, ...moreLinks, { to: "/contact", label: "Contact" } as const].map((l, i) => (
            <Link key={l.to} to={l.to} className="qn-drawer-link" activeProps={{ className: "qn-drawer-link is-active" }}
              activeOptions={{ exact: l.to === "/" }} onClick={close} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}>
              <em>{String(i + 1).padStart(2, "0")}</em>{l.label}<i className="fa fa-arrow-right"></i>
            </Link>
          ))}
          <div className="qn-drawer-foot">
            <a href={company.phoneHref} className="qn-cta w-100 justify-content-center"><i className="fa fa-phone-alt"></i><span>{company.phone}</span></a>
            <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="qn-drawer-wa"><i className="fab fa-whatsapp"></i> Chat on WhatsApp</a>
          </div>
        </aside>
      </div>
    </>
  );
}

export function PageHeader({ title, crumb, image }: { title: string; crumb: string; image: string }) {
  return (
    <div
      className="container-fluid page-header py-5 mb-5"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${image})`, backgroundPosition: "center" }}
    >
      <div className="container py-5">
        <h1 className="display-1 text-white animated slideInDown">{title}</h1>
        <nav aria-label="breadcrumb" className="animated slideInDown">
          <ol className="breadcrumb text-uppercase mb-0">
            <li className="breadcrumb-item"><Link className="text-white" to="/">Home</Link></li>
            <li className="breadcrumb-item text-primary active" aria-current="page">{crumb}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

export function SectionTitle({ kicker, title, k }: { kicker: string; title: string; k?: string | undefined }) {
  return (
    <div className="text-center mx-auto mb-5" style={{ maxWidth: 650 }}>
      <h4 className="section-title"><T k={k && `${k}.kicker`} d={kicker} line /></h4>
      <h1 className="display-5 mb-4"><T k={k && `${k}.title`} d={title} /></h1>
    </div>
  );
}

export function Footer() {
  return (
    <div className="container-fluid bg-dark text-body footer ft-pro mt-5 pt-5 px-0">
      <span className="ft-glow" aria-hidden="true" />
      <div className="container ft-top">
        <div className="ft-cta">
          <div><span className="ft-cta-kicker">Get In Touch</span><h2 className="mb-0">Ready to discuss your MEP requirements?</h2></div>
          <div className="d-flex flex-wrap gap-2">
            <a href={company.phoneHref} className="btn btn-primary py-3 px-4"><i className="fa fa-phone-alt me-2"></i>{company.phone}</a>
            <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="btn ft-ghost py-3 px-4"><i className="fab fa-whatsapp me-2"></i>WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h3 className="text-light mb-4 ft-h">QMEP Electromechanical</h3>
            <p>Professional MEP, HVAC, electrical, plumbing, and maintenance solutions for residential and commercial projects.</p>
            <div className="d-flex pt-2">
              <a className="btn btn-square btn-outline-body me-1" href={company.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
              <a className="btn btn-square btn-outline-body me-1" href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-square btn-outline-body me-1" href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a className="btn btn-square btn-outline-body me-0" href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3 className="text-light mb-4 ft-h">Our Services</h3>
            {services.map((s) => (
              <Link key={s.slug} className="btn btn-link" to="/services/$slug" params={{ slug: s.slug }}>{s.title}</Link>
            ))}
          </div>
          <div className="col-lg-3 col-md-6">
            <h3 className="text-light mb-4 ft-h">Quick Links</h3>
            <Link className="btn btn-link" to="/">Home</Link>
            <Link className="btn btn-link" to="/about">About Us</Link>
            <Link className="btn btn-link" to="/services">Services</Link>
            <Link className="btn btn-link" to="/projects">Projects</Link>
            <Link className="btn btn-link" to="/amc">AMC Packages</Link>
            <Link className="btn btn-link" to="/contact">Contact Us</Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3 className="text-light mb-4 ft-h">Contact</h3>
            <p className="mb-2"><i className="fa fa-map-marker-alt text-primary me-3"></i>{company.address}</p>
            <p className="mb-2"><i className="fa fa-phone-alt text-primary me-3"></i>{company.phone}</p>
            <p className="mb-2"><i className="fab fa-whatsapp text-primary me-3"></i>WhatsApp Us</p>
            <p className="mb-2"><i className="fa fa-envelope text-primary me-3"></i>{company.email}</p>
          </div>
        </div>
      </div>
      <div className="container-fluid copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              &copy; {new Date().getFullYear()} <Link to="/">QMEP Electromechanical LLC</Link>. All Rights Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">Dubai, United Arab Emirates</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <a href={company.whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="btn btn-lg btn-primary btn-lg-square back-to-top" style={{ display: "flex", bottom: show ? 90 : 30 }}>
        <i className="fab fa-whatsapp fs-4"></i>
      </a>
      {show && (
        <button className="btn btn-lg btn-dark btn-lg-square back-to-top" style={{ display: "flex" }} aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
}
