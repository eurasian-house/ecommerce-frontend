import React from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";


const Blogs = () => {

  const navigate = useNavigate();

  const blogPosts = [
    { id: 1, title: 'Beyond Flat Floors: Why 3D Textured Rugs are Dominating 2026 Interior Design', excerpt: 'Tactile luxury trends, high-low carving depths.' },
    { id: 2, title: 'From Bhadohi with Love: Why Smart Homeowners are Choosing Artisanal Rugs Over Factory Mass-Production', excerpt: 'Heritage storytelling, sustainable luxury vs synthetic.' },
    { id: 3, title: 'The New Neutral: How Earthy 3D Rugs Can Instantly Warm Up a Cold, Minimalist Room', excerpt: 'Room-warming styling tips, earthy palettes.' }
  ];

  return (
    <>
      <SEO
        title="Rug Buying Guides & Articles | Eurasian House"
        description="Expert articles on choosing, maintaining and decorating with handmade rugs and carpets."
        canonical="https://www.eurasianrugs.com/blogs"
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
          <section
            className="text-center rounded-4 shadow-sm overflow-hidden mb-5"
            style={{
              background:
                "linear-gradient(135deg,#2F241F 0%,#6B5748 100%)",
              color: "#fff",
              padding: "5rem 1.5rem",
            }}
          >
            <small
              className="text-uppercase"
              style={{
                letterSpacing: "4px",
                opacity: ".8",
              }}
            >
              Eurasian House Journal
            </small>

            <h1
              className="fw-bold mt-3 mb-3"
              style={{
                fontSize: "clamp(2.2rem,5vw,4.2rem)",
                lineHeight: 1.15,
              }}
            >
              Stories Behind Every
              <br />
              Handmade Rug
            </h1>

            <p
              className="mx-auto"
              style={{
                maxWidth: "760px",
                fontSize: "1.1rem",
                opacity: ".9",
                lineHeight: 1.8,
              }}
            >
              Discover buying guides, interior inspiration, weaving traditions,
              craftsmanship from Bhadohi, and expert advice to help you choose a
              rug that becomes part of your family's story.
            </p>

            <button
              className="btn btn-light rounded-pill px-5 py-3 mt-3 fw-semibold"
              onClick={() => navigate("/contact")}
            >
              Speak With Our Experts
            </button>
          </section>

          {/* Section Heading */}
          <div className="text-center mb-5">
            <h2
              className="fw-bold"
              style={{
                fontSize: "clamp(1.8rem,4vw,3rem)",
                color: "#2F241F",
              }}
            >
              Latest Articles
            </h2>

            <div
              className="mx-auto mt-3"
              style={{
                width: "80px",
                height: "3px",
                background: "#B68D40",
                borderRadius: "50px",
              }}
            ></div>

            <p
              className="text-muted mt-3"
              style={{
                maxWidth: "650px",
                margin: "auto",
              }}
            >
              Carefully written guides to help you understand handmade rugs,
              timeless interiors and artisan craftsmanship.
            </p>
          </div>

          {/* Blog Cards */}
          <div className="row g-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="col-md-6 col-lg-4"
              >
                <div
                  className="h-100 border-0 rounded-4 shadow-sm"
                  style={{
                    background: "#fff",
                    transition: ".35s",
                    overflow: "hidden",
                  }}
                >
                  <div className="p-4 d-flex flex-column h-100">

                    <span
                      className="mb-3"
                      style={{
                        color: "#B68D40",
                        fontWeight: 600,
                        letterSpacing: "2px",
                        fontSize: ".78rem",
                      }}
                    >
                      EURASIAN HOUSE
                    </span>

                    <h3
                      className="fw-bold mb-3"
                      style={{
                        color: "#2F241F",
                        fontSize: "1.45rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {post.title}
                    </h3>

                    <p
                      className="text-muted flex-grow-1"
                      style={{
                        lineHeight: 1.8,
                      }}
                    >
                      {post.excerpt}
                    </p>

                    <button
                      className="btn btn-outline-dark rounded-pill px-4 mt-3 align-self-start"
                      onClick={() => navigate(`/blogs/${post.id}`)}
                    >
                      Read Article →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <section
            className="text-center rounded-4 mt-5"
            style={{
              background: "#fff",
              padding: "4rem 2rem",
              border: "1px solid rgba(0,0,0,.06)",
            }}
          >
            <h2
              className="fw-bold mb-3"
              style={{
                color: "#2F241F",
              }}
            >
              Looking for the Perfect Handmade Rug?
            </h2>

            <p
              className="text-muted mx-auto mb-4"
              style={{
                maxWidth: "700px",
              }}
            >
              Our specialists can help you choose the ideal rug based on your
              interior, lifestyle, colour palette and budget.
            </p>

            <button
              className="btn btn-dark rounded-pill px-5 py-3"
              onClick={() => navigate("/contact")}
            >
              Contact Our Team
            </button>
          </section>

          {/* Footer */}
          <footer className="text-center pt-5 text-muted">
            <small>© 2026 Eurasian House • Handmade Rugs from Bhadohi, India</small>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Blogs;
