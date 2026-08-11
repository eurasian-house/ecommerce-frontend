import { useEffect, useState } from "react";
import "../styles/pages/HeroCarousel.css";

const slides = [
  {
    id: 1,
    image: "/heroimages/hero1.jpg",
    title: "Eurasian House : Free Worldwide Delivery",
    subtitle:
      "Experience uncompromising luxury with zero shipping fees on all global orders.",
  },
  {
    id: 2,
    image: "/heroimages/hero2.jpg",
    title: "Luxury Rugs for Modern Living",
    subtitle:
      "Discover handcrafted rugs that blend traditional artistry with contemporary interiors.",
  },
  {
    id: 3,
    image: "/heroimages/hero3.jpg",
    title: "Where Heritage Meets Contemporary Design",
    subtitle:
      "Every rug is woven with exceptional craftsmanship using premium natural materials.",
  },
  {
    id: 4,
    image: "/heroimages/hero4.jpg",
    title: "Crafted in Bhadohi, Admired Worldwide",
    subtitle:
      "Experience authentic Indian craftsmanship with complimentary worldwide shipping.",
  },
  {
    id: 5,
    image: "/heroimages/hero5.jpg",
    title: "Eurasian House: Scaled Pricing, Free Global Shipping",
    subtitle:
      "Premium craftsmanship that becomes more rewarding the larger the size you choose.",
  },
];

export default function HeroCarousel({ onSlideClick }) {
  const [current, setCurrent] = useState(0);

  const duration = 3500;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="hero-carousel">

      <div
        className="hero-slide"
        onClick={onSlideClick}
      >
        <img
          src={slides[current].image}
          alt={`Eurasian House ${slides[current].title}`}
          className="hero-image"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />

        <div className="hero-overlay">

          <div className="hero-glow"></div>

          <div className="hero-content">

            <span className="hero-badge">
              Crafted in India
            </span>

            <h2 className="hero-title">
              {slides[current].title}
            </h2>

            <p className="hero-subtitle">
              {slides[current].subtitle}
            </p>

            <button
              type="button"
              className="hero-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSlideClick?.();
              }}
            >
              Explore Collection
              <i className="bi bi-arrow-right ms-2"></i>
            </button>

          </div>

        </div>

      </div>

      <button
        type="button"
        className="hero-arrow hero-arrow-left"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      <button
        type="button"
        className="hero-arrow hero-arrow-right"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      <div className="hero-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`hero-dot ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}