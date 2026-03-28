import { useNavigate } from "react-router-dom";

const DISCOUNTS = [20, 30, 40, 50];

export default function Discount() {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      <div className="d-flex overflow-auto gap-3 pb-2">
        {DISCOUNTS.map((d) => (
          <div
            key={d}
            style={{ minWidth: "200px", cursor: "pointer" }}
            onClick={() => navigate(`/products?discount=${d}`)}
          >
            <div className="card border-0 shadow-sm h-100 bg-dark text-white">
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <h4 className="fw-bold">{d}% OFF</h4>
                <small>Shop Now →</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}