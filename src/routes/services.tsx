import { createFileRoute, Link } from "@tanstack/react-router";
import hero2 from "@/assets/hero-2.webp";
import { services } from "@/lib/site";
import { PageHeader, SectionTitle } from "@/components/site/Layout";
import { CtaBanner, Process, ServicesGrid } from "@/components/site/Sections";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "MEP & Electromechanical Services | QMEP Dubai" },
      { name: "description", content: "HVAC, electrical, plumbing, MEP maintenance, AMC and VRF/VRV services in Dubai by QMEP Electromechanical LLC." },
      { property: "og:title", content: "Our MEP & Electromechanical Services" },
      { property: "og:description", content: "Solutions for your property's essential systems." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHeader title="Services" crumb="Services" image={hero2} />
      <ServicesGrid />
      <div className="band py-5">
        <div className="container">
          <SectionTitle kicker="Service Details" title="Solutions For Your Property's Essential Systems" />
          {services.map((s, n) => (
            <div key={s.slug} id={s.slug} className="row g-5 align-items-center mb-5">
              <div className={`col-lg-5 ${n % 2 ? "order-lg-2" : ""}`}>
                <img className="img-fluid w-100" src={s.image} alt={s.title} style={{ height: 420, objectFit: "cover" }} />
              </div>
              <div className="col-lg-7">
                <h4 className="section-title">0{n + 1}</h4>
                <h1 className="display-6 mb-3">{s.title}</h1>
                <p className="mb-4">{s.summary}</p>
                <div className="row">
                  {s.items.map((it) => (
                    <div key={it} className="col-sm-6"><p><i className="fa fa-check text-primary me-3"></i>{it}</p></div>
                  ))}
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="btn btn-primary py-3 px-5">View Service Details</Link>
                  <Link to="/contact" className="btn btn-outline-primary py-3 px-4">{s.cta}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Process />
      <CtaBanner title="Need a Specific Service?" text="Tell us what you need, where the property is located, and whether the work involves maintenance, repair, installation, or a new project." button="Request a Service Quote" />
    </>
  );
}
