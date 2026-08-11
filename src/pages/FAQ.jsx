import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { getFAQSchema } from "../seo/schemas";
import "../styles/pages/policies.css";

export default function FAQ() {
  const faqs = [
    {
      question: "What types of rugs do you sell?",
      answer:
        "We offer a wide variety of handmade rugs including Persian, Kilim, Tibetan, Dhurrie, Jute, Shag, Leather, and contemporary rugs."
    },
    {
      question: "Are your rugs handmade?",
      answer:
        "Yes. Our rugs are handcrafted by skilled artisans using high-quality and biodegradable materials."
    },
    {
      question: "How do I choose the right rug size?",
      answer:
        "Measure your space carefully before ordering. Every product page lists all available sizes. If you need a custom size, simply contact us—we can manufacture it for you without any additional cost."
    },
    {
      question: "Will the rug look exactly like the photos?",
      answer:
        "We strive for accurate product photography. However, slight color variations may occur due to lighting conditions and different display settings."
    },
    {
      question: "Do you deliver internationally or just USA?",
      answer:
        "Yes. We ship to most countries worldwide using trusted logistics partners, including all locations across the USA."
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes. International shipping is available to almost all countries. Shipping charges and customs duties may apply unless a free shipping offer is applicable."
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery time depends on the selected product and destination. Since every rug is handcrafted to order, production and transit usually take between 3 and 30 days. Your estimated delivery date is shown during checkout."
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can usually be cancelled within 48 hours of placing the order or before production begins. Please contact us as soon as possible."
    },
    {
      question: "Can I return my rug?",
      answer:
        "Eligible products may be returned according to our Refund & Return Policy. Customized products may not be eligible."
    },
    {
      question: "Which payment methods do you accept?",
      answer:
        "We accept a wide range of secure payment methods depending on your country. Available payment options are displayed during checkout."
    },
    {
      question: "Is my payment secure?",
      answer:
        "Yes. Every payment is processed through secure encrypted payment gateways."
    },
    {
      question: "How can I track my order?",
      answer:
        "We'll keep you informed during production via email or WhatsApp. Once your order ships, tracking details will be shared with you."
    },
    {
      question: "How should I clean my rug?",
      answer:
        "Vacuum regularly and blot spills immediately. Professional cleaning is recommended for handmade rugs."
    },
    {
      question: "Do wool rugs shed?",
      answer:
        "Yes. Natural wool rugs may shed slightly during the initial months. This is completely normal."
    },
    {
      question: "Can I contact Eurasian House for assistance?",
      answer:
        "Absolutely. Our support team is available via our Contact page, email, phone, and WhatsApp to help with product selection, orders, and after-sales support."
    }
  ];

  return (
    <>
      <SEO
        title="FAQ | Eurasian House"
        description="Find answers to frequently asked questions about our products, ordering process, shipping, returns, and customer support."
        canonical="https://www.eurasianrugs.com/faq"
        schema={getFAQSchema(faqs)}
      />

      <section className="policy-layout py-5">

        <div className="container">

          <div className="policy-wrapper mx-auto">

            <header className="policy-header text-center">

              <h1 className="policy-title">
                Frequently Asked Questions
              </h1>

              <p className="policy-description">
                Find quick answers to the questions our customers ask most often.
              </p>

              <div className="policy-divider"></div>

            </header>

            <div className="policy-content">

              <div
                className="accordion faq-accordion"
                id="faqAccordion"
              >

                {faqs.map((faq, index) => (

                  <div
                    className="accordion-item"
                    key={index}
                  >

                    <h2
                      className="accordion-header"
                      id={`heading${index}`}
                    >

                      <button
                        className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded={index === 0}
                        aria-controls={`collapse${index}`}
                      >
                        {faq.question}
                      </button>

                    </h2>

                    <div
                      id={`collapse${index}`}
                      className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#faqAccordion"
                    >

                      <div className="accordion-body">
                        {faq.answer}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <section className="policy-cta text-center">

              <h2 className="policy-cta-title">
                Still Have Questions?
              </h2>

              <p className="policy-cta-text">
                If your question isn't answered here, our team will be happy to assist you.
              </p>

              <Link
                to="/contact"
                className="btn btn-primary rounded-pill px-4"
              >
                Contact Us
              </Link>

            </section>

          </div>

        </div>

      </section>
    </>
  );
}