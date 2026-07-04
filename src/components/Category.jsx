import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "All", "Hand Knotted", "Jute", "Tufted", "Persian", "Tibetan",
  "Kilim", "Dhurry", "Leather", "Shag", "Irregular",
];

export default function Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === "All") navigate("/products");
    else navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div >
      <div className="d-flex overflow-auto gap-3 pb-2">
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            className="category-wrapper"
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick(cat)}
          >
            <div className="card category-card border-0 shadow-sm h-100 overflow-hidden">
              <img
                src={`/category/${cat.toLowerCase().replace(/\s/g, "")}.jpg`}
                className="card-img-top category-image"
                alt={`${cat} Rugs`}
                loading="lazy"
                decoding="async"
                style={{
                  height: "110px", objectFit: "cover",
                }}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <div className="card-body text-center p-3">
                <h6 className="category-title mb-0">
                  {cat}
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}