import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        image: "/heroimages/hero1.jpg",
        title: "Timeless Hand-Knotted Masterpieces",
        subtitle: "Crafted by master artisans to bring warmth, elegance, and enduring beauty to every home."
    },
    {
        id: 2,
        image: "/heroimages/hero2.jpg",
        title: "Luxury Rugs for Modern Living",
        subtitle: "Discover handcrafted rugs that blend traditional artistry with contemporary interiors."
    },
    {
        id: 3,
        image: "/heroimages/hero3.jpg",
        title: "Where Heritage Meets Contemporary Design",
        subtitle: "Every rug is woven with exceptional craftsmanship using premium natural materials."
    },
    {
        id: 4,
        image: "/heroimages/hero4.jpg",
        title: "Crafted in Bhadohi, Admired Worldwide",
        subtitle: "Experience authentic Indian craftsmanship with complimentary worldwide shipping."
    },
    {
        id: 5,
        image: "/heroimages/hero5.jpg",
        title: "Designed to Last for Generations",
        subtitle: "Invest in heirloom-quality rugs that become more beautiful with time."
    },
];

export default function HeroCarousel({ onSlideClick }) {
    const [current, setCurrent] = useState(0);
    const duration = 3500;
    const isMobile = window.innerWidth < 576;

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
        <div className="hero-carousel mb-4 position-relative overflow-hidden">
            {/* SLIDE */}
            <div
                className="hero-slide"
                onClick={onSlideClick}
            >
                <img
                    src={slides[current].image}
                    alt={`Eurasian House ${slides[current].title}`}
                    fetchPriority="high"
                    loading="eager"
                    decoding="async"
                    className="hero-image"
                />

                {/* OVERLAY */}
                <div className="hero-overlay">
                    {/* Decorative Glow */}
                    <div className="hero-glow" />

                    {/* Content */}
                    <div className="hero-content">
                        <span className="hero-badge">
                            Crafted in India
                        </span>

                        <h2 className="hero-title fw-bold">
                            {slides[current].title}
                        </h2>

                        <p className="hero-subtitle">
                            {slides[current].subtitle}
                        </p>

                        <button
                            className="btn hero-btn mt-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSlideClick();
                            }}
                        >
                            Explore Collection →
                        </button>
                    </div>
                </div>
            </div>

            {/* LEFT ARROW */}
            <button
                className="hero-arrow hero-arrow-left"
                onClick={prevSlide}
                type="button"
                aria-label="Previous slide"
            >
                ‹
            </button>

            {/* RIGHT ARROW */}
            <button
                className="hero-arrow hero-arrow-right"
                onClick={nextSlide}
                type="button"
                aria-label="Next slide"
            >
                ›
            </button>

            {/* DOTS */}
            <div className="hero-dots d-flex justify-content-center gap-2">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`hero-dot ${current === i ? "active" : ""
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}