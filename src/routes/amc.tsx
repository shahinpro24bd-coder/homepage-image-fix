import { createFileRoute, Link } from "@tanstack/react-router";
import amcImg from "@/assets/service-amc.webp";
import { PageHeader, SectionTitle } from "@/components/site/Layout";
import { CtaBanner } from "@/components/site/Sections";

export const Route = createFileRoute("/amc")({
  head: () => ({
    meta: [
      { title: "AMC Packages | Annual Maintenance Contracts Dubai | QMEP" },
      { name: "description", content: "Residential, commercial and comprehensive MEP Annual Maintenance Contracts in Dubai from QMEP Electromechanical LLC." },
      { property: "og:title", content: "Annual Maintenance Contracts | QMEP" },
      { property: "og:description", content: "Planned maintenance for long-term property care." },
    ],
  }),
  component: Amc,
});

const plans = [
  { icon: "fa-home", name: "Residential AMC", for: "Villas and residential properties.", items: ["Scheduled AC maintenance", "Plumbing system checks", "Electrical inspections", "Preventive maintenance recommendations"] },
  { icon: "fa-store", name: "Commercial AMC", for: "Offices, retail spaces, and commercial properties.", items: ["Planned HVAC servicing", "Electrical system inspections", "Plumbing maintenance", "Maintenance reporting"] },
  { icon: "fa-city", name: "Comprehensive MEP AMC", for: "Properties requiring coordinated maintenance across multiple systems.", items: ["Agreed HVAC maintenance", "Electrical and plumbing inspections", "Scheduled preventive visits", "Defined reporting and service procedures"] },
];

function Amc() {
  return (
    <>
      <PageHeader title="AMC Packages" crumb="AMC Packages" image={amcImg} />
      <div className="band py-5">
        <div className="container">
          <SectionTitle kicker="Annual Maintenance Contracts" title="Planned Maintenance For Long-Term Property Care" />
          <p className="text-center mx-auto mb-5" style={{ maxWidth: 800 }}>
            A maintenance plan helps property owners organize routine inspections, schedule servicing, and address maintenance requirements in a structured way. We prepare each AMC proposal based on your property type, equipment, and service requirements.
          </p>
          <div className="row g-4 pt-4">
            {plans.map((p) => (
              <div key={p.name} className="col-lg-4" style={{ marginTop: 70 }}>
                <div className="fact-item text-center bg-light h-100 p-5 pt-0">
                  <div className="fact-icon"><i className={`fa ${p.icon} fa-3x`}></i></div>
                  <h3 className="mb-2">{p.name}</h3>
                  <p className="text-primary mb-4">Suitable for: {p.for}</p>
                  {p.items.map((it) => (
                    <p key={it} className="text-start"><i className="fa fa-check text-primary me-3"></i>{it}</p>
                  ))}
                  <Link to="/contact" className="btn btn-primary py-3 px-5 mt-3">Get an AMC Quote</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CtaBanner title="Request Your AMC Proposal" text="Every property has a different maintenance requirement. Contact our team for a proposal based on your building, equipment, and required scope." button="Get an AMC Quote" />
    </>
  );
}
