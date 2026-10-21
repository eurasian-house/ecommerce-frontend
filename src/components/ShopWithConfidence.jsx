import { useNavigate } from "react-router-dom";
import "../styles/components/ShopWithConfidence.css";

const items = [
  {
    number: "01",
    icon: "bi-globe2",
    title: "Free Worldwide Shipping",
    text: "Your rug is carefully packaged and delivered to your doorstep, wherever you call home.",
    url: "/shipping-policy",
  },
  {
    number: "02",
    icon: "bi-shield-lock",
    title: "Secure Payments",
    text: "Shop confidently with trusted payment methods and a secure checkout experience.",
    url: "/payment-policy",
  },
  {
    number: "03",
    icon: "bi-box-seam",
    title: "Carefully Packed",
    text: "Every order receives careful packaging to help your rug arrive in excellent condition.",
    url: "/packaging-policy",
  },
  {
    number: "04",
    icon: "bi-arrow-repeat",
    title: "Easy Returns",
    text: "Our return policy explains the process clearly, so you know what to expect.",
    url: "/refund-policy",
  },
  {
    number: "05",
    icon: "bi-headset",
    title: "Personal Customer Support",
    text: "Need help before or after ordering? Our team is here to assist you.",
    url: "/contact",
  },
];

export default function ShopWithConfidence() {
  const navigate = useNavigate();

  return (
    <section className="shop-confidence">
      <div className="container">
        {/* ========== SHOP CONFIDENCE HEADER: START ========== */}
        <div className="confidence-header">
          <div className="discount-ornament mt-4">
            <span className="ornament-line"></span>
            <span className="ornament-text">
              YOUR PEACE OF MIND
            </span>
            <span className="ornament-line"></span>
          </div>

          <h2>
            A Better Way
            <br />
            <em>to Shop for Rugs.</em>
          </h2>

          <p>
            From the moment you order to the day your rug arrives,
            every detail matters. Shop with confidence, knowing we're
            here to help.
          </p>
        </div>
        {/* ========== SHOP CONFIDENCE HEADER: END ========== */}

        {/* ========== CONFIDENCE FEATURES: START ========== */}
        <div className="confidence-panel">
          <div className="confidence-panel-heading">
            <div>
              <span className="confidence-panel-label">THE DETAILS THAT MATTER</span>
              <h3>Your comfort comes first.</h3>
            </div>

            <span className="confidence-panel-mark">
              <i className="bi bi-patch-check" />
            </span>
          </div>

          <div className="confidence-list">
            {items.map((item) => (
              <button
                className="confidence-item"
                key={item.number}
                type="button"
                onClick={() => navigate(item.url)}
                aria-label={`Learn more about ${item.title}`}
              >
                <span className="confidence-number">{item.number}</span>

                <span className="confidence-icon">
                  <i className={`bi ${item.icon}`} />
                </span>

                <span className="confidence-item-content">
                  <span className="confidence-item-title">
                    {item.title}
                  </span>
                  <span className="confidence-item-text">
                    {item.text}
                  </span>
                </span>

                <span className="confidence-arrow">
                  <i className="bi bi-arrow-up-right" />
                </span>
              </button>
            ))}
          </div>

          <div className="confidence-panel-footer">
            <i className="bi bi-heart" />
            <span>Thoughtfully made. Carefully delivered. Here for you.</span>
          </div>
        </div>
        {/* ========== CONFIDENCE FEATURES: END ========== */}
      </div>
    </section>
  );
}