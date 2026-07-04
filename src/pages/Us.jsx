import React from 'react';
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

const Us = () => {

  const navigate = useNavigate();

  return (
    <><SEO
      title="About Eurasian House"
      description="Learn about Eurasian House, our passion for handcrafted rugs, and our commitment to quality and craftsmanship."
      canonical="https://www.eurasianrugs.com/us"
    />
      <div className="container py-5">
        {/* Hero Section: About Me / Us */}
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5 mb-5">
          <div className="col-12 col-sm-8 col-lg-6 d-flex justify-content-center">
            {/* Placeholder for a profile or team image */}
            <div
              className=" d-flex align-items-center justify-content-center rounded-5 shadow-lg overflow-hidden"
              style={{
                width: "100%",
                maxWidth: "700px",
                aspectRatio: "16 / 9",
                margin: "0 auto",
              }}
            >
              <div className="story-image">

                <img
                  src="/us.jpg"
                  alt="Artisan weaving a handmade rug"
                  className="img-fluid rounded-4"
                />

              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold lh-1 mb-3 text-primary text-center text-lg-start">About Us</h1>
            <p className="lead text-muted text-center text-lg-start">
              We are a team of passionate artisans dedicated to weaving high-quality luxury carpets.
              Our journey started with a simple idea: bring the rich heritage of Bhadohi to life.<br />
              Every handmade piece blends timeless tradition with contemporary design to elevate your space.
              We craft more than just floor coverings; we weave stories of elegance, comfort and coziness for everyone.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2 rounded-pill shadow"
                onClick={() => navigate("/products")}
              >
                Our Products
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4 rounded-pill"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        <hr className="my-5" />

        {/* Values / Features Section */}
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col text-center">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 px-3 py-2 rounded-circle shadow-sm">
              <i className="bi bi-cpu"></i> {/* Requires Bootstrap Icons */}
              💡
            </div>
            <h3 className="fs-4 fw-bold">Craftsmanship</h3>
            <p>Constantly pushing the boundaries of what is possible with traditional weaving and 3D textures.
              Our journey merges generations of Bhadohi artistry with modern, elegant design concepts.
              We innovate every tuft and knot to create premium, cozy masterpieces for your space.</p>
          </div>
          <div className="feature col text-center">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-success bg-gradient fs-2 mb-3 px-3 py-2 rounded-circle shadow-sm">
              🎯
            </div>
            <h3 className="fs-4 fw-bold">Precision</h3>
            <p>Every single knot and every tuft of wool is crafted with extreme attention to detail.
              Our artisans meticulously carve each 3D texture to ensure an flawless, premium finish.
              From the initial design sketch to the final wash, quality is woven into every inch.</p>
          </div>
          <div className="feature col text-center">
            <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-warning bg-gradient fs-2 mb-3 px-3 py-2 rounded-circle shadow-sm">
              🤝
            </div>
            <h3 className="fs-4 fw-bold">Collaboration</h3>
            <p>We believe in working closely with our clients to turn their unique vision into a reality.
              Whether customizing a bespoke size, color, or 3D texture, your dream design guides our loom.
              From our heritage workshops in Bhadohi directly to your doorstep, we partner with you at every step.</p>
          </div>
        </div>

        {/* Quote / Mission Section */}
        <div className="p-4 p-md-5 mb-4 text-white rounded-5 bg-dark shadow-lg mt-5">
          <div className="col-md-8 px-0 mx-auto text-center">
            <h2 className="display-6 italic fw-light">"Our mission is to empower interior designers and homeowners through premium craftsmanship and timeless design."</h2>
            <p className="lead my-3 text-secondary">- Founded in 2025</p>

            <section className="container my-5">
              <div className="p-5 rounded-4 bg-light text-center border">
                <h2 className="fw-bold text-primary mb-3">
                  Discover the Perfect Rug for Your Home
                </h2>

                <p className="text-muted mb-4">
                  Browse our handcrafted collection of Persian, Kilim, Tibetan, Jute, and
                  modern rugs, carefully selected to bring elegance and comfort to your
                  living spaces.
                </p>

                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/products" className="btn btn-primary px-4">
                    Explore Collection
                  </Link>

                  <Link to="/contact" className="btn btn-outline-primary px-4">
                    Contact Our Experts
                  </Link>
                </div>
              </div>
            </section>



          </div>
        </div>
      </div>
    </>
  );
};

export default Us;