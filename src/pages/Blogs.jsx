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

    <><SEO
  title="Rug Buying Guides & Articles | Eurasian House"
  description="Expert articles on choosing, maintaining and decorating with handmade rugs and carpets."
  canonical="https://eurasianrugs.com/blogs"
/>


    <div className="container py-5">
      {/* Header Section */}
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="fw-bold text-dark display-6 display-md-4" style={{ fontSize: "clamp(1.8rem,5vw,3.2rem)" }}>
          Welcome to the <span className="text-primary italic">EurasianHouse</span> Blogs
        </h1>
      </header>

      {/* Hero Section */}
      <div className="p-3 p-md-5 mb-4 bg-primary text-white rounded-3 shadow">
        <div className="container-fluid py-5">
          <h2 className="fw-bold" style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)" }}>Welcome to the Loom</h2>
          <p
            className="col-12 col-md-8"
            style={{ fontSize: "clamp(0.95rem,2vw,1.5rem)" }}
          >
            Browse through our latest design trends and artisanal heritage insights.<br />
            Everything here is woven with generations of Bhadohi craftsmanship.
          </p>
          <button
            className="btn btn-outline-light px-4 py-2"
            type="button"
            onClick={() => navigate("/contact")}
          >
            Visit or Contact Us
          </button>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="row align-items-md-stretch">
        {blogPosts.map((post) => (
          <div key={post.id} className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="h-100 p-3 p-md-4 bg-light border rounded-3 shadow-sm">
              <h3 style={{ fontSize: "clamp(1.1rem,2vw,1.5rem)" }}>{post.title}</h3>
              <p className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>{post.excerpt}</p>
              <button
                className="btn btn-sm btn-outline-secondary"
                type="button"
                onClick={() => navigate(`/blogs/${post.id}`)}
              >
                View details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer-style section */}
      <footer className="pt-3 mt-4 text-muted border-top text-center">
        &copy; 2026 Eurasin House
      </footer>
    </div>
    </>
  );
};

export default Blogs;
