import { useNavigate } from "react-router-dom";
import "./ShopWithConfidence.css";



const items = [
  {
    icon: "bi-globe2",
    title: "Free Worldwide Shipping",
    text: "Your rug is carefully packaged and delivered safely to your doorstep, wherever you are.",
    url: "/shipping-policy",
  },
  {
    icon: "bi-shield-check",
    title: "Secure Payments",
    text: "Trusted payment methods help ensure every transaction is safe from checkout to confirmation.",
    url: "/secure-payments",
  },
  {
    icon: "bi-box-seam",
    title: "Carefully Packed",
    text: "Every order is professionally packed to help it arrive in excellent condition.",
    url: "/packaging",
  },
  {
    icon: "bi-arrow-repeat",
    title: "Easy Returns",
    text: "If something isn't right, our return process is straightforward and designed for peace of mind.",
    url: "/refund-policy",
  },
  {
    icon: "bi-headset",
    title: "Personal Customer Support",
    text: "Whether before or after your purchase, our team is always happy to assist you.",
    url: "/contact",
  },
];

export default function ShopWithConfidence() {
  const navigate = useNavigate();

  return (
    <section className="shop-confidence">
      <div className="container">

        <div className="text-center confidence-header">
          <span className="confidence-label">
            SHOP WITH CONFIDENCE
          </span>

          <h2>Everything You Need for a Worry-Free Purchase</h2>

          <p>
            From secure payments to worldwide delivery, every order is handled
            with care so you can shop with complete peace of mind.
          </p>
        </div>

        <div className="confidence-list">

          {items.map((item, index) => (
            <div
              className="confidence-item"
              key={index}
              onClick={() => navigate(item.url)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(item.url);
                }
              }}
            >

              <div className="confidence-left">

                <div className="confidence-icon">
                  <i className={`bi ${item.icon}`}></i>
                </div>

                <div>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </div>

              </div>

              <i className="bi bi-arrow-right confidence-arrow"></i>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}