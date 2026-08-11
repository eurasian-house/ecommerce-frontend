import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "../styles/components/Category.css";

const CATEGORIES = [
  "All",
  "Hand Knotted",
  "Jute",
  "Tufted",
  "Persian",
  "Tibetan",
  "Kilim",
  "Dhurry",
  "Leather",
  "Shag",
  "Irregular",
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
    if (category === "All") {
      navigate("/products");
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <section className="position-relative">

      <button
        type="button"
        className="category-arrow category-arrow-left d-none d-md-flex"
        onClick={scrollLeft}
        aria-label="Scroll categories left"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      <div
        ref={scrollRef}
        className="category-scroll"
      >
        {CATEGORIES.map((category) => (
          <div
            key={category}
            className="category-wrapper"
            onClick={() => handleCategoryClick(category)}
          >
            <article className="category-card">

              <img
                src={`/category/${category
                  .toLowerCase()
                  .replace(/\s/g, "")}.jpg`}
                alt={`${category} Rugs`}
                className="category-image"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />

              <div className="category-card-body">
                <h6 className="category-title">
                  {category}
                </h6>
              </div>

            </article>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="category-arrow category-arrow-right d-none d-md-flex"
        onClick={scrollRight}
        aria-label="Scroll categories right"
      >
        <i className="bi bi-chevron-right"></i>
      </button>

    </section>
  );
}