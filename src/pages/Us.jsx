import React from 'react';
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import "../styles/pages/Us.css";


const Us = () => {

  const navigate = useNavigate();
  return (
    <>
      <SEO
        title="About Eurasian House"
        description="Learn about Eurasian House, our passion for handcrafted rugs, and our commitment to quality and craftsmanship."
        canonical="https://www.eurasianrugs.com/us"
      />

      <div className="about-page">

        <div className="container">

          {/* HERO */}

          <section className="about-hero row align-items-center">

            <div className="col-lg-6 order-lg-2">

              <div className="about-hero-image">

                <img
                  src="/us.jpg"
                  alt="Artisan weaving a handmade rug"
                  className="img-fluid"
                />

              </div>

            </div>

            <div className="col-lg-6">

              <span className="about-eyebrow">
                Since 2025
              </span>

              <h1 className="about-title">
                Handmade Rugs,
                <br />
                Woven With Heritage.
              </h1>

              <p className="about-description">
                Eurasian House was founded with a simple vision—to bring the rich
                weaving heritage of Bhadohi to homes around the world. Every rug
                is handcrafted by skilled artisans whose techniques have been
                refined through generations.
              </p>

              <p className="about-description">
                We don't simply manufacture rugs. We create timeless pieces of
                art that blend traditional craftsmanship with contemporary design,
                offering warmth, comfort and lasting elegance for every interior.
              </p>

              <div className="about-actions">

                <button
                  className="app-btn-primary"
                  onClick={() => navigate("/products")}
                >
                  Explore Collection
                </button>

                <button
                  className="app-btn-secondary"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </button>

              </div>

            </div>

          </section>

          {/* VALUES */}

          <section className="about-values">

            <div className="section-heading">

              <span className="about-cta-subtitle">
                OUR VALUES
              </span>

              <h2 className="section-title">
                Built On Craftsmanship
              </h2>

            </div>

            <div className="row g-4">

              <div className="col-lg-4">

                <article className="value-card">

                  <div className="value-icon">
                    🧵
                  </div>

                  <h3 className="value-title">
                    Craftsmanship
                  </h3>

                  <p className="value-description">
                    Every rug is handcrafted by experienced artisans using
                    traditional weaving techniques passed down through
                    generations, ensuring remarkable quality and timeless beauty.
                  </p>

                </article>

              </div>

              <div className="col-lg-4">

                <article className="value-card">

                  <div className="value-icon">
                    ✨
                  </div>

                  <h3 className="value-title">
                    Precision
                  </h3>

                  <p className="value-description">
                    From the first sketch to the final wash, every knot, colour
                    and texture is inspected with exceptional attention to detail
                    to achieve a flawless finish.
                  </p>

                </article>

              </div>

              <div className="col-lg-4">

                <article className="value-card">

                  <div className="value-icon">
                    🤝
                  </div>

                  <h3 className="value-title">
                    Partnership
                  </h3>

                  <p className="value-description">
                    We work closely with homeowners, architects and interior
                    designers to create bespoke rugs tailored to each unique
                    vision and space.
                  </p>

                </article>

              </div>

            </div>

          </section>

          {/* MISSION */}

          <section className="about-mission">

            <span className="about-mission-subtitle">
              Our Mission
            </span>

            <h2 className="about-mission-title">
              "To preserve the heritage of handmade weaving while creating
              luxury rugs that enrich modern living spaces around the world."
            </h2>

            <p className="about-mission-text">
              Crafted in Bhadohi • Appreciated Worldwide
            </p>

          </section>

          {/* CTA */}

          <section className="about-cta">

            <span className="about-cta-subtitle">
              Explore
            </span>

            <h2 className="about-cta-title">
              Find the Perfect Handmade Rug
            </h2>

            <p className="about-cta-description">
              Browse our collection of Persian, Modern, Kilim, Tibetan, Jute and
              custom handmade rugs, each crafted to bring elegance, warmth and
              timeless character to your home.
            </p>

            <div className="about-actions justify-content-center">

              <Link
                to="/products"
                className="app-btn-primary text-decoration-none"
              >
                Explore Collection
              </Link>

              <Link
                to="/contact"
                className="app-btn-secondary text-decoration-none"
              >
                Talk to Our Experts
              </Link>

            </div>

          </section>

        </div>

      </div>

    </>
  );
};

export default Us;