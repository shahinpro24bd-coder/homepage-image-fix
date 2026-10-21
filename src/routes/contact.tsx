import { createFileRoute } from "@tanstack/react-router";
import hero1 from "@/assets/hero-1.webp";
import { company } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";
import { ContactLine, QuoteForm } from "@/components/site/Sections";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Request a Quote | QMEP Electromechanical LLC" },
      { name: "description", content: "Contact QMEP Electromechanical LLC in Dubai for HVAC, electrical, plumbing and MEP maintenance quotations." },
      { property: "og:title", content: "Contact QMEP Electromechanical LLC" },
      { property: "og:description", content: "Let's discuss your MEP requirements." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader title="Contact" crumb="Contact" image={hero1} />
      <div className="band py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <h4 className="section-title">Contact Us</h4>
              <h1 className="display-5 mb-4">Let's Discuss Your MEP Requirements</h1>
              <p className="mb-4">Looking for HVAC maintenance, electrical work, plumbing services, or an electromechanical solution for your property? Contact our team to discuss the scope of work and request a quotation.</p>
              <div className="row g-4">
                <ContactLine icon="fa-map-marker-alt" label="Our Office" value={company.address} />
                <ContactLine icon="fa-phone-alt" label="Call Us Now" value={company.phone} href={company.phoneHref} />
                <ContactLine icon="fa-whatsapp" brand label="WhatsApp" value="Chat With Us" href={company.whatsappHref} />
                <ContactLine icon="fa-envelope-open" label="Mail Us Now" value={company.email} href={`mailto:${company.email}`} />
                <ContactLine icon="fa-clock" label="Working Hours" value={company.hours} />
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="mb-4">Request a Quote</h3>
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5 px-0">
        <iframe title="QMEP location map" className="w-100" style={{ height: 450, border: 0 }}
          src="https://www.google.com/maps?q=Dubai,United+Arab+Emirates&output=embed"></iframe>
      </div>
    </>
  );
}
