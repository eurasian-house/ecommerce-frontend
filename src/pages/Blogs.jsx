import React from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import "../styles/pages/Blogs.css";



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

      <div className="blogs-page">

        <div className="container">

          {/* HERO */}

          <section className="blogs-hero">

            <span className="blogs-eyebrow">
              Eurasian House Journal
            </span>

            <h1 className="blogs-title">
              Stories Behind Every
              <br />
              Handmade Rug
            </h1>

            <p className="blogs-description">
              Discover buying guides, timeless interiors, weaving traditions,
              craftsmanship from Bhadohi, and practical advice that helps you
              choose a rug your family will treasure for generations.
            </p>

            <button
              className="app-btn-luxury mt-4"
              onClick={() => navigate("/contact")}
            >
              Speak With Our Experts
            </button>

          </section>

          {/* SECTION */}

          <section className="blogs-section">

            <div className="section-heading">

              <span className="section-subtitle">
                INSIGHTS
              </span>

              <h2 className="section-title">
                Latest Articles
              </h2>

              <p className="section-description">
                Carefully written guides to help you understand handmade rugs,
                timeless interiors, artisan craftsmanship and buying decisions.
              </p>

            </div>

            <div className="row g-4">

              {blogPosts.map((post) => (

                <div
                  key={post.id}
                  className="col-md-6 col-lg-4"
                >

                  <article className="blog-card">

                    <div className="blog-card-content">

                      <span className="blog-tag">
                        EURASIAN HOUSE
                      </span>

                      <h3 className="blog-card-title">
                        {post.title}
                      </h3>

                      <p className="blog-card-excerpt">
                        {post.excerpt}
                      </p>

                      <button
                        className="blog-read-btn"
                        onClick={() => navigate(`/blogs/${post.id}`)}
                      >
                        Read Article
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>

                    </div>

                  </article>

                </div>

              ))}

            </div>

          </section>

          {/* CTA */}

          <section className="blogs-cta">

            <span className="blogs-cta-subtitle">
              Need Personal Guidance?
            </span>

            <h2 className="blogs-cta-title">
              Looking for the Perfect Handmade Rug?
            </h2>

            <p className="blogs-cta-description">
              Our specialists can recommend the perfect rug according to your
              space, colours, lifestyle and budget.
            </p>

            <button
              className="app-btn-luxury"
              onClick={() => navigate("/contact")}
            >
              Contact Our Team
            </button>

          </section>

          <footer className="blogs-footer">

            © 2026 Eurasian House • Handmade Rugs from Bhadohi, India

          </footer>

        </div>

      </div>

    </>
  );
};

export default Blogs;
