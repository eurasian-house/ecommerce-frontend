import { useNavigate } from "react-router-dom";
import "../styles/components/Discount.css";


const OFFERS = [
  {
    discount: 20,
    tag: "Modern Persian Collection",
    icon: "bi-heart",
    accent: "crimson",
  },
  {
    discount: 50,
    tag: "Ultra Premium Selection",
    icon: "bi-gem",
    accent: "pink",
  },
  {
    discount: 70,
    tag: "Premium Selection",
    icon: "bi-stars",
    accent: "emerald",
  },
  {
    discount: 75,
    tag: "Luxury Line",
    icon: "bi-flower1",
    accent: "royal",
  },
  {
    discount: 80,
    tag: "Standard Range",
    icon: "bi-brightness-high",
    accent: "gold",
  },
];

export default function Discount() {
  const navigate = useNavigate();

  return (
    <section className="discount-section">

      {/* ---------- Section Heading ----------  */}

      <div className="discount-header">

        <div className="discount-ornament">

          <span className="ornament-line"></span>

          <span className="ornament-text">
            Exclusive Offers
          </span>

          <span className="ornament-line"></span>

        </div>

        <h2 className="discount-title">
          Luxury, Now Within Reach
        </h2>

        <p className="discount-subtitle">
          Discover exceptional savings on our handcrafted rug collection,
          featuring limited-time offers without compromising on quality,
          craftsmanship, or timeless elegance.
        </p>

      </div>

      {/* ---------- Cards ---------- */}

      <div className="discount-grid">

        {OFFERS.map((offer) => {

          return (
            <div
              key={offer.discount}
              className={`offer-card ${offer.accent}`}
              onClick={() =>
                navigate(`/products?discount=${offer.discount}`)
              }
            >

              {/* Decorative Overlay */}

              <div className="offer-overlay"></div>

              {/* Icon */}

              <div className="offer-icon">

                <i className={`bi ${offer.icon}`}></i>

              </div>

              {/* Discount */}

              <div className="offer-percent">

                <span className="number">
                  {offer.discount}
                </span>

                <span className="percent">
                  %
                </span>

              </div>

              <div className="offer-off">
                OFF
              </div>

              {/* Decorative Divider */}

              <div className="offer-divider">

                <span></span>

              </div>

              {/* Title */}

              <h3 className="offer-title">

                {offer.tag}

              </h3>

              {/* CTA */}

              <button
                className="offer-button"
                type="button"
              >
                Explore Collection

                <i className="bi bi-arrow-right"></i>

              </button>

            </div>
          );
        })}

      </div>

    </section>
  );
}