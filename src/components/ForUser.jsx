import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/SmallComponent.css";

const commitments = [
  {
    number: "01",
    icon: "bi-headset",
    title: "Here for You",
    description:
      "Personal support and genuine assistance whenever you need us.",
  },
  {
    number: "02",
    icon: "bi-award",
    title: "Made with Care",
    description:
      "Thoughtfully crafted rugs with quality and detail at heart.",
  },
  {
    number: "03",
    icon: "bi-globe2",
    title: "A Global Promise",
    description:
      "A commitment to quality, integrity, and lasting relationships.",
  },
];

const ForUser = () => {
  const navigate = useNavigate();

  return (
    <section className="for-user-section">
      <div className="container">
        <div className="for-user-layout">
          {/* Image */}
          <div className="for-user-visual">
            <div className="for-user-image-frame">
              <img
                src="/commitment.jpg"
                alt="Beautiful handmade rug in a thoughtfully designed living room"
                className="for-user-image"
                loading="lazy"
                decoding="async"
              />

              <div className="for-user-image-caption">
                <span className="for-user-caption-mark">EH</span>
                <div>
                  <span className="for-user-caption-label">
                    THE EURASIAN PROMISE
                  </span>
                  <p>Made to belong. Made to last.</p>
                </div>
              </div>
            </div>

            <span className="for-user-visual-decoration" aria-hidden="true">
              Crafted for living
            </span>
          </div>

          {/* Content */}
          <div className="for-user-content">
            <div className="for-user-eyebrow">
              <span />
              OUR COMMITMENT
              <span />
            </div>

            <h2 className="for-user-heading">
              More than a rug.
              <br />
              <em>A part of your story.</em>
            </h2>

            <p className="for-user-subheading">
              A rug is where life happens. Where families gather, memories
              unfold, and a house begins to feel like home. We believe every
              piece should be made with that responsibility in mind.
            </p>

            <div className="for-user-divider" />

            <div className="for-user-commitments">
              {commitments.map((item) => (
                <article className="for-user-commitment" key={item.number}>
                  <span className="for-user-commitment-number">
                    {item.number}
                  </span>

                  <div className="for-user-commitment-icon">
                    <i className={`bi ${item.icon}`} aria-hidden="true" />
                  </div>

                  <div className="for-user-commitment-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="for-user-cta"
              onClick={() => navigate("/products")}
            >
              Discover our collection
              <span className="for-user-cta-icon">
                <i className="bi bi-arrow-up-right" />
              </span>
            </button>

            <p className="for-user-footnote">
              Thoughtful craftsmanship. A more personal experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForUser;