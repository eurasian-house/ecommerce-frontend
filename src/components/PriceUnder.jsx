import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/SmallComponent.css";


const PriceUnder = () => {
  const navigate = useNavigate();

  const images = {
    leftLarge: "/priceunder/left.jpg",
    topRightAdventure: "/priceunder/tr.jpg",
    orangeWhatsNew: "/priceunder/tc.jpg",
    middleRightPlant: "/priceunder/bc.jpg",
    bottomRightRoom: "/priceunder/br.jpg",
  };

  return (
    <section className="container-fluid py-5">

      <div className="row g-3">

        {/* LEFT BIG CARD */}

        <div className="col-lg-6">

          <div
            className="premium-grid-card h-100"
            onClick={() => navigate("/products?sort=new")}
          >

            <img
              src={images.leftLarge}
              alt="New Collection"
              className="premium-grid-image"
              loading="lazy"
            />

            <div className="premium-grid-overlay">

              <span className="premium-grid-badge">
                New Collection
              </span>

              <h2 className="premium-grid-title">
                What's New
              </h2>

              <p className="premium-grid-subtitle">
                Discover our latest handcrafted arrivals.
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="col-lg-6">

          <div className="row g-3 h-100">

            {/* CARD */}

            <div className="col-6">

              <div
                className="premium-grid-card"
                onClick={() => navigate("/products?budget=1")}
              >

                <img
                  src={images.orangeWhatsNew}
                  alt="Under $299"
                  className="premium-grid-image"
                  loading="lazy"
                />

                <div className="premium-grid-overlay small">

                  <span className="premium-grid-label">
                    Budget
                  </span>

                  <h6>
                    Under $299
                  </h6>

                </div>

              </div>

            </div>

            {/* CARD */}

            <div className="col-6">

              <div
                className="premium-grid-card"
                onClick={() =>
                  navigate("/products?shape=round,oval")
                }
              >

                <img
                  src={images.topRightAdventure}
                  alt="Round Rugs"
                  className="premium-grid-image"
                  loading="lazy"
                />

                <div className="premium-grid-overlay small">

                  <span className="premium-grid-label">
                    Shape
                  </span>

                  <h6>
                    Round & Oval
                  </h6>

                </div>

              </div>

            </div>

            {/* CARD */}

            <div className="col-6">

              <div
                className="premium-grid-card"
                onClick={() =>
                  navigate("/products?shape=irregular")
                }
              >

                <img
                  src={images.middleRightPlant}
                  alt="Irregular Rugs"
                  className="premium-grid-image"
                  loading="lazy"
                />

                <div className="premium-grid-overlay small">

                  <span className="premium-grid-label">
                    Shape
                  </span>

                  <h6>
                    Irregular
                  </h6>

                </div>

              </div>

            </div>

            {/* CARD */}

            <div className="col-6">

              <div
                className="premium-grid-card"
                onClick={() =>
                  navigate("/products?quality=antique")

                }
              >

                <img
                  src={images.bottomRightRoom}
                  alt="Premium Rugs"
                  className="premium-grid-image"
                  loading="lazy"
                />

                <div className="premium-grid-overlay small">

                  <span className="premium-grid-label">
                    Quality
                  </span>

                  <h6>
                    Antique Rugs
                  </h6>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PriceUnder;