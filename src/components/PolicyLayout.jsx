import { Link } from "react-router-dom";
import SEO from "./SEO";

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

      <div className="container py-5">

        {/* Breadcrumb */}
        <nav className="mb-4 small">
          <Link
            to="/"
            className="text-decoration-none text-secondary"
          >
            Home
          </Link>

          <span className="mx-2 text-secondary">›</span>

          <span className="text-dark fw-semibold">
            {title}
          </span>
        </nav>

        <div
          className="mx-auto"
          style={{ maxWidth: "900px" }}
        >

          {/* Hero Section */}
          <div className="text-center mb-5">

            <h1 className="fw-bold display-6 mb-3">
              {title}
            </h1>

            <p
              className="text-secondary mx-auto"
              style={{ maxWidth: "650px" }}
            >
              {description}
            </p>

            <div
              className="mt-4 mx-auto"
              style={{
                width: "80px",
                height: "3px",
                backgroundColor: "#0d6efd",
                borderRadius: "20px",
              }}
            />

            <p className="small text-muted mt-4 mb-0">
              Last Updated: June 2026
            </p>
          </div>

          {/* Main Content */}
          <div
            className="bg-white rounded-4 p-md-5 p-4 shadow-sm"
          >
            {children}
          </div>

               <div className="alert alert-light border rounded-4 mt-5 text-center">
        <h4 className="fw-bold text-primary mb-3">
          Still Have Questions?
        </h4>

        <p className="text-muted mb-4">
          If you need clarification regarding our policies, shipping, returns, or
          your order, our team is happy to help.
        </p>

        <Link to="/contact" className="btn btn-primary">
          Contact Us
        </Link>
      </div>

          {/* Contact Card */}
          <div
            className="mt-5 border rounded-4 p-4 bg-light"
          >
            <h2 className="h5 fw-bold mb-3">
              Contact Eurasian House
            </h2>

            <p className="text-secondary mb-4">
              Need help or have questions?
              Our team is happy to assist you.
            </p>

            <div className="row g-3">

              <div className="col-md-6">
                <strong>Email</strong>
                <div className="text-secondary">
                  contact@eurasianrugs.com, contacteurasianhouse@gmail.com
                </div>
              </div>

              <div className="col-md-6">
                <strong>Phone</strong>
                <div className="text-secondary">
                  +91 70800 12972
                </div>
              </div>

              <div className="col-md-6">
                <strong>Business</strong>
                <div className="text-secondary">
                  Eurasian House
                </div>
              </div>

              <div className="col-md-6">
                <strong>Location</strong>
                <div className="text-secondary">
                  Bhadohi 221401, Uttar Pradesh, India
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}