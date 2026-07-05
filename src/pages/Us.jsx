import React from 'react';
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";

const Us = () => {

  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="About Eurasian House"
        description="Learn about Eurasian House, our passion for handcrafted rugs, and our commitment to quality and craftsmanship."
        canonical="https://www.eurasianrugs.com/us"
      />

      <div
        className="py-5"
        style={{
          background: "#FAF8F5",
          minHeight: "100vh",
        }}
      >
        <div className="container">

          {/* Hero */}
          <section className="row align-items-center g-5 mb-5">

            <div className="col-lg-6 order-lg-2">
              <div className="story-image">
                <img
                  src="/us.jpg"
                  alt="Artisan weaving a handmade rug"
                  className="img-fluid rounded-4"
                />
              </div>
            </div>

            <div className="col-lg-6">

              <small
                className="text-uppercase"
                style={{
                  letterSpacing: "4px",
                  color: "#B68D40",
                  fontWeight: 600,
                }}
              >
                Since 2025
              </small>

              <h1
                className="fw-bold mt-3 mb-4"
                style={{
                  color: "#2F241F",
                  fontSize: "clamp(2.3rem,5vw,4.2rem)",
                  lineHeight: 1.15,
                }}
              >
                Handmade Rugs,
                <br />
                Woven With Heritage.
              </h1>

              <p
                className="text-muted"
                style={{
                  lineHeight: 1.9,
                  fontSize: "1.08rem",
                }}
              >
                Eurasian House was founded with a simple vision—to bring the rich
                weaving heritage of Bhadohi to homes around the world. Every rug
                is handcrafted by skilled artisans whose techniques have been
                refined through generations.
              </p>

              <p
                className="text-muted"
                style={{
                  lineHeight: 1.9,
                  fontSize: "1.08rem",
                }}
              >
                We don't simply manufacture rugs. We create timeless pieces of
                art that blend traditional craftsmanship with contemporary design,
                offering warmth, comfort and lasting elegance for every interior.
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <button
                  className="btn btn-dark rounded-pill px-5 py-3"
                  onClick={() => navigate("/products")}
                >
                  Explore Collection
                </button>

                <button
                  className="btn btn-outline-dark rounded-pill px-5 py-3"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us
                </button>
              </div>

            </div>

          </section>

          {/* Divider */}
          <div className="text-center my-5">
            <div
              className="mx-auto"
              style={{
                width: "90px",
                height: "3px",
                background: "#B68D40",
              }}
            ></div>
          </div>

          {/* Values */}

          <section className="mb-5">

            <div className="text-center mb-5">
              <small
                className="text-uppercase"
                style={{
                  letterSpacing: "4px",
                  color: "#B68D40",
                  fontWeight: 600,
                }}
              >
                Our Values
              </small>

              <h2
                className="fw-bold mt-3"
                style={{
                  color: "#2F241F",
                  fontSize: "clamp(2rem,4vw,3rem)",
                }}
              >
                Built On Craftsmanship
              </h2>
            </div>

            <div className="row g-4">

              <div className="col-lg-4">
                <div
                  className="h-100 bg-white rounded-4 shadow-sm p-5"
                  style={{
                    border: "1px solid rgba(0,0,0,.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.3rem",
                    }}
                  >
                    🧵
                  </div>

                  <h3
                    className="fw-bold mt-4 mb-3"
                    style={{ color: "#2F241F" }}
                  >
                    Craftsmanship
                  </h3>

                  <p className="text-muted" style={{ lineHeight: 1.8 }}>
                    Every rug is handcrafted by experienced artisans using
                    traditional weaving techniques passed down through
                    generations, ensuring remarkable quality and timeless beauty.
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <div
                  className="h-100 bg-white rounded-4 shadow-sm p-5"
                  style={{
                    border: "1px solid rgba(0,0,0,.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.3rem",
                    }}
                  >
                    ✨
                  </div>

                  <h3
                    className="fw-bold mt-4 mb-3"
                    style={{ color: "#2F241F" }}
                  >
                    Precision
                  </h3>

                  <p className="text-muted" style={{ lineHeight: 1.8 }}>
                    From the first sketch to the final wash, every knot, colour
                    and texture is inspected with exceptional attention to detail
                    to achieve a flawless finish.
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <div
                  className="h-100 bg-white rounded-4 shadow-sm p-5"
                  style={{
                    border: "1px solid rgba(0,0,0,.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.3rem",
                    }}
                  >
                    🤝
                  </div>

                  <h3
                    className="fw-bold mt-4 mb-3"
                    style={{ color: "#2F241F" }}
                  >
                    Partnership
                  </h3>

                  <p className="text-muted" style={{ lineHeight: 1.8 }}>
                    We work closely with homeowners, architects and interior
                    designers to create bespoke rugs tailored to each unique
                    vision and space.
                  </p>
                </div>
              </div>

            </div>

          </section>

          {/* Mission */}

          <section
            className="rounded-4 overflow-hidden shadow-sm my-5"
            style={{
              background:
                "linear-gradient(135deg,#2F241F,#6A5648)",
              color: "#fff",
              padding: "5rem 2rem",
            }}
          >
            <div
              className="mx-auto text-center"
              style={{
                maxWidth: "900px",
              }}
            >
              <small
                className="text-uppercase"
                style={{
                  letterSpacing: "4px",
                  opacity: ".8",
                }}
              >
                Our Mission
              </small>

              <h2
                className="fw-light my-4"
                style={{
                  fontSize: "clamp(2rem,4vw,3.2rem)",
                  lineHeight: 1.5,
                }}
              >
                "To preserve the heritage of handmade weaving while creating
                luxury rugs that enrich modern living spaces around the world."
              </h2>

              <p
                style={{
                  opacity: ".85",
                  fontSize: "1.05rem",
                }}
              >
                Crafted in Bhadohi • Appreciated Worldwide
              </p>
            </div>
          </section>

          {/* CTA */}

          <section
            className="bg-white rounded-4 shadow-sm text-center"
            style={{
              padding: "4rem 2rem",
              border: "1px solid rgba(0,0,0,.06)",
            }}
          >
            <small
              className="text-uppercase"
              style={{
                letterSpacing: "4px",
                color: "#B68D40",
                fontWeight: 600,
              }}
            >
              Explore
            </small>

            <h2
              className="fw-bold mt-3"
              style={{
                color: "#2F241F",
              }}
            >
              Find the Perfect Handmade Rug
            </h2>

            <p
              className="text-muted mx-auto mt-3"
              style={{
                maxWidth: "700px",
                lineHeight: 1.8,
              }}
            >
              Browse our collection of Persian, Modern, Kilim, Tibetan, Jute and
              custom handmade rugs, each crafted to bring elegance, warmth and
              timeless character to your home.
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
              <Link
                to="/products"
                className="btn btn-dark rounded-pill px-5 py-3"
              >
                Explore Collection
              </Link>

              <Link
                to="/contact"
                className="btn btn-outline-dark rounded-pill px-5 py-3"
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