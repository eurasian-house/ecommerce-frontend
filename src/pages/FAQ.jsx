import SEO from "../components/SEO";
import { getFAQSchema } from "../seo/schemas";
import { Link } from "react-router-dom";


export default function FAQ() {
  const faqs = [
    {
      question: "What types of rugs do you sell?",
      answer: "We offer a vast variety of handmade rugs including Persian, Kilim, Tibetan, Dhurrie, Jute, Shag, Leather, and contemporary rugs etc etc..."
    },
    {
      question: "Are your rugs handmade?",
      answer: "Yes, our rugs are beautifully handcrafted by skilled artisans, using bio-degradable materials."
    },
    {
      question: "How do I choose the right rug size?",
      answer: "Measure your space carefully before ordering. Each product page lists all available sizes to help you choose the perfect fit. If still your size doesnot fit, you can contact us for your own size. We can do that too without any extra cost."
    },
    {
      question: "Will the rug look exactly like the photos?",
      answer: "We strive for accurate product photography, but slight color variations may occur due to lighting and different screen settings."
    },
    {
      question: "Do you deliver internationally or just USA?",
      answer: "Yes. We ship to most locations across the whole world using trusted logistics partners, and yes offcourse all over USA"
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, for almost all countries. International shipping charges and customs duties may apply (if free shipping offer is not applied )."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery timelines for your order vary based on your selected product and shipping destination. Because our items are meticulously handcrafted to order, production and transit times range from 3 to 30 days. Your exact, location-specific estimated delivery dates are clearly displayed at checkout."
    },
    {
      question: "Can I cancel my order?",
      answer: "Orders can usually be cancelled before they are processed or before 48 hours of placing the order. Please contact us as soon as possible."
    },
    {
      question: "Can I return my rug?",
      answer: "Eligible products can be returned according to our Refund & Return Policy. Customized products may not be eligible."
    },
    {
      question: "Which payment methods do you accept?",
      answer: "We accept a wide range of payment methods depending on location. We accept secure online payments through trusted payment gateways. Available options are displayed during checkout."
    },
    {
      question: "Is my payment secure?",
      answer: "Yes. All online payments are processed through secure encrypted payment gateways."
    },
    {
      question: "How can I track my order?",
      answer: "We will keep you updated while the product is being prepared via email or WhatsApp if provided. Once your order is shipped, we'll share the tracking details via email or other available communication methods."
    },
    {
      question: "How should I clean my rug?",
      answer: "Vacuum regularly and clean spills immediately by blotting gently. Professional cleaning is recommended for handmade rugs."
    },
    {
      question: "Do wool rugs shed?",
      answer: "Yes, natural wool rugs may shed slightly during the initial months. This is completely normal."
    },
    {
      question: "Can I contact Eurasian House for assistance?",
      answer: "Absolutely. Visit our Contact page and our team will be happy to help you with product selection, orders, or after-sales support. Even we have a dedicated team for customer assistance and support. You can reach us via email, phone, or WhatsApp chat floating on the right bottom corner."
    }
  ];

  return (
    <>
      <SEO
        title="FAQ | Eurasian House"
        description="Find answers to frequently asked questions about our products, ordering process, and customer support."
        canonical="https://www.eurasianrugs.com/faq"
        schema={getFAQSchema(faqs)}
      />
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        <div className="text-center mb-5">
          <h1 className="fw-bold">Frequently Asked Questions</h1>

          <p className="text-muted">
            Find quick answers to the questions our customers ask most often.
          </p>
        </div>

        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${index !== 0 ? "collapsed" : ""
                    }`}
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
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""
                  }`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="alert alert-light border rounded-4 mt-5 text-center">
          <h4 className="fw-bold text-primary mb-3">
            Still Have Questions?
          </h4>

          <p className="text-muted mb-4">
            If your question isn't answered here, our team will be happy to assist you.
          </p>

          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}