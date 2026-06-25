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
      <div className="text-center mb-4">
        <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary section-title">
          Choose by Offers!
        </span>
      </div>
      <div className="d-flex overflow-auto gap-3 pb-2">
        {OFFERS.map((offer) => (
          <div
            key={offer.discount}
            style={{ minWidth: "200px", cursor: "pointer" }}
            onClick={() => navigate(`/products?discount=${offer.discount}`)}
          >
            <div className="card glass-card">
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