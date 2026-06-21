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
            style={{
              minWidth: window.innerWidth < 576 ? "110px" : "140px",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryClick(cat)}
          >
            <div className="card border-0 shadow-sm h-100">
              <img
                src={`/category/${cat.toLowerCase().replace(/\s/g, "")}.png`}
                className="card-img-top"
                alt={`${cat} Rugs`}
                loading="lazy"
                decoding="async"
                style={{
                  height: window.innerWidth < 576 ? "80px" : "100px", objectFit: "cover"
                }}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
              <div className="card-body text-center p-1 p-sm-2">
                <small>{cat}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}