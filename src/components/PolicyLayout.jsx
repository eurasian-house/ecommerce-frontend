import { Link } from "react-router-dom";
import SEO from "./SEO";
import "../styles/components/PolicyLayout.css";


export default function PolicyLayout({
  title,
  description,
  canonical,
  children,
}) {
  return (
    <>
      <SEO
        title={`${title} | Eurasian House`}
        description={description}
        canonical={canonical}
      />

      <section className="policy-layout py-5">
        <div className="container">

          {/* Breadcrumb */}
          <nav
            className="policy-breadcrumb small mb-4"
            aria-label="breadcrumb"
          >
            <Link to="/" className="breadcrumb-link">
              Home
            </Link>

            <span className="breadcrumb-separator">›</span>

            <span className="breadcrumb-current">
              {title}
            </span>
          </nav>

          <div className="policy-wrapper mx-auto">

            {/* Hero */}
            <header className="policy-header text-center">

              <h1 className="policy-title">
                {title}
              </h1>

              <p className="policy-description mx-auto">
                {description}
              </p>

              <div className="policy-divider" />

              <p className="policy-updated">
                Last Updated: June 2026
              </p>

            </header>

            {/* Content */}
            <article className="policy-content">
              {children}
            </article>

            {/* CTA */}
            <section className="policy-cta text-center">

              <h2 className="policy-cta-title">
                Still Have Questions?
              </h2>

              <p className="policy-cta-text">
                If you need clarification regarding our policies,
                shipping, returns, or your order, our team is
                happy to help.
              </p>

              <Link
                to="/contact"
                className="btn btn-primary rounded-pill px-4"
              >
                Contact Us
              </Link>

            </section>

            {/* Contact */}
            <section className="policy-contact">

              <h2 className="policy-contact-title">
                Contact Eurasian House
              </h2>

              <p className="policy-contact-description">
                Need help or have questions? Our team is happy to
                assist you.
              </p>

              <div className="row g-4">

                <div className="col-md-6">
                  <div className="policy-info-label">
                    Email
                  </div>

                  <div className="policy-info-value">
                    contact@eurasianrugs.com
                    <br />
                    contacteurasianhouse@gmail.com
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="policy-info-label">
                    Phone
                  </div>

                  <div className="policy-info-value">
                    +91 70800 12972
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="policy-info-label">
                    Business
                  </div>

                  <div className="policy-info-value">
                    Eurasian House
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="policy-info-label">
                    Location
                  </div>

                  <div className="policy-info-value">
                    Bhadohi 221401,
                    Uttar Pradesh,
                    India
                  </div>
                </div>

              </div>

            </section>

          </div>
        </div>
      </section>
    </>
  );
}