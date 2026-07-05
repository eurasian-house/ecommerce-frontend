import { useNavigate } from "react-router-dom";

const OFFERS = [
  { discount: 20, tag: "Valentine Special" },
  { discount: 30, tag: "Eid Offers" },
  { discount: 40, tag: "Festive Sale" },
  { discount: 50, tag: "Summer Sale" },
];

export default function Discount() {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <div className="text-center mb-5">
        <span
          className="badge rounded-pill section-title"
          style={{
            backgroundColor: "#F3E8C8",
            color: "#8B6B2E",
          }}
        >
          Exclusive Offers
        </span>

        <h2 className="mt-3 fw-semibold display-6">
          Luxury, Now Within Reach
        </h2>

        <p
          className="mx-auto mt-3"
          style={{
            maxWidth: 620,
            color: "#777",
            lineHeight: 1.8,
          }}
        >
          Discover exceptional savings on our handcrafted rug collection,
          featuring limited-time offers without compromising on quality or
          craftsmanship.
        </p>
      </div>
      <div className="d-flex overflow-auto gap-3 pb-2 m-3 justify-content-md-center justify-content-start">
        {OFFERS.map((offer) => (
          <div
            key={offer.discount}
            style={{ minWidth: "200px", cursor: "pointer" }}
            onClick={() => navigate(`/products?discount=${offer.discount}`)}
          >
            <div className="card glass-card mb-5">
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <h3 className="fw-bold mb-1">{offer.discount}% OFF</h3>

                <p className="offer-tag mb-2">
                  {offer.tag}
                </p>

                <small className="text-muted">
                  Explore Collection →
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}