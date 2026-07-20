import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const CATEGORIES = [
  "All", "Hand Knotted", "Jute", "Tufted", "Persian", "Tibetan",
  "Kilim", "Dhurry", "Leather", "Shag", "Irregular",
];

export default function Category() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (category) => {
    if (category === "All") navigate("/products");
    else navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="position-relative">
      <button
        className="category-arrow category-arrow-left d-none d-md-flex"
        onClick={scrollLeft}
        type="button"
      >
        ‹
      </button>
      <div
        ref={scrollRef}
        className="d-flex overflow-auto gap-3 pb-2 category-scroll"
      >
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
      <button
        className="category-arrow category-arrow-right d-none d-md-flex"
        onClick={scrollRight}
        type="button"
      >
        ›
      </button>

      <style>{`
.category-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-arrow {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
}

.category-arrow:hover {
  background: #fff;
  transform: translateY(-50%) scale(1.08);
}

.category-arrow-left {
  left: 0px;
}

.category-arrow-right {
  right: 0px;
}
`}</style>
    </div>
  );
}