import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "../styles/components/Category.css";

const CATEGORIES = [
  { label: "All" },
  { label: "Hand Knotted", mainCategory: "Hand Knotted Rugs" },
  { label: "Jute", mainCategory: "Jute Rugs" },
  { label: "Tufted", mainCategory: "Hand Tufted Rugs" },
  { label: "Persian", mainCategory: "Persian Rugs" },
  { label: "Tibetan", mainCategory: "Tibetan Weave Rugs" },
  { label: "Kilim", subCategory: "Kilim" },
  { label: "Dhurry", subCategory: "Dhurrie" },
  { label: "Leather", mainCategory: "Leather Rugs/Pouffe" },
  { label: "Shag", search: "Shag" },
  { label: "Irregular", shape: "Irregular" },
  { label: "Round", shape: "Round" },
  { label: "Runner", shape: "Runner" },
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

  const handleCategoryClick = ({ label, ...filters }) => {
    if (label === "All") {
      navigate("/products");
    } else {
      navigate(`/products?${new URLSearchParams(filters).toString()}`);
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
            key={category.label}
            className="category-wrapper"
            onClick={() => handleCategoryClick(category)}
          >
            <article className="category-card">

              <img
                src={`/category/${category.label
                  .toLowerCase()
                  .replace(/\s/g, "")}.jpg`}
                alt={`${category.label} Rugs`}
                className="category-image"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />

              <div className="category-card-body">
                <h6 className="category-title">
                  {category.label}
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
