import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "../styles/components/Category.css";

const CATEGORIES = [
  { label: "All" },
  { label: "Hand Knotted", mainCategory: "Hand Knotted Rugs" },
  { label: "Jute", subCategory: "Braided Jute Rugs" },
  { label: "Tufted", mainCategory: "Hand Tufted Rugs" },
  { label: "Persian", mainCategory: "Hand Knotted Persian" },
  { label: "Tibetan", mainCategory: "Hand Knotted Tibetan" },
  { label: "Kilim", subCategory: "Kilim" },
  { label: "Dhurry", mainCategory: "Flatweave Rugs/Dhurries" },
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
        className="sliding-arrow sliding-arrow--left hero-arrow-left"
        onClick={scrollLeft}
        aria-label="Previous slide"
      >
        <i className="bi bi-chevron-left" />
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
        className="sliding-arrow sliding-arrow--right hero-arrow-right"
        onClick={scrollRight}
        aria-label="Next slide"
      >
        <i className="bi bi-chevron-right" />
      </button>

    </section>
  );
}
