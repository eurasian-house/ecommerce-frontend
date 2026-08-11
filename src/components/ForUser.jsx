import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/SmallComponent.css";

const ForUser = () => {
  const navigate = useNavigate();

  return (
    <div className="for-user-section d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10">

            {/* Badge */}
            <div className="mb-4">

              <div className="discount-ornament">

                <span className="ornament-line"></span>

                <span className="ornament-text">
                  Our Commitment
                </span>

                <span className="ornament-line"></span>

              </div>

              <h2 className="mt-3 fw-semibold for-user-heading">
                Crafted with Integrity
              </h2>

              <p className="mx-auto mt-3 for-user-subheading">
                Every rug reflects our dedication to exceptional craftsmanship,
                premium materials, ethical sourcing, and lasting quality that
                transforms houses into timeless homes.
              </p>

            </div>

            {/* Main Heading */}
            <h1 className="for-user-title fw-bold mb-4">
              We really <span className="stronger">care</span> for our customer.
            </h1>

            {/* Supporting Text */}
            <p className="for-user-description mb-5 mx-auto">
              From the initial spark of an idea to the final delivery,
              your satisfaction is the heartbeat of our process.
              We don't just build products; we build relationships.
            </p>

            {/* Features */}
            <div className="row g-4 mt-5 pt-4 for-user-features">

              <div className="col-md-4">
                <h4 className="fw-bold">24/7 Support</h4>
                <p>Always here when you need us most.</p>
              </div>

              <div className="col-md-4">
                <h4 className="fw-bold">Global Quality</h4>
                <p>Crafted to meet international standards.</p>
              </div>

              <div className="col-md-4">
                <h4 className="fw-bold">Human First</h4>
                <p>Real people, real conversations.</p>
              </div>

            </div>

            {/* CTA  */}
            <div className="mt-5 pt-3">

              <button
                className="btn app-btn-primary btn-lg px-5 py-3 rounded-pill FU-btn"
                onClick={() => navigate("/products")}
              >
                Experience the Difference
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForUser;