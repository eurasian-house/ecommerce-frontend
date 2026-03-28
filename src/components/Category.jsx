import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "All","Hand Knotted","Jute","Tufted","Persian","Tibetan",
  "Kilim","Dhurry","Leather","Shag","Irregular",
];

export default function Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === "All") navigate("/products");
    else navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="mb-4">
      <div className="d-flex overflow-auto gap-3 pb-2">
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            style={{ minWidth: "140px", cursor: "pointer" }}
            onClick={() => handleCategoryClick(cat)}
          >
            <div className="card border-0 shadow-sm h-100">
              <img
                src={`/category/${cat.toLowerCase().replace(/\s/g, "")}.png`}
                className="card-img-top"
                style={{ height: "100px", objectFit: "cover" }}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <div className="card-body text-center p-2">
                <small className="fw-semibold">{cat}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}