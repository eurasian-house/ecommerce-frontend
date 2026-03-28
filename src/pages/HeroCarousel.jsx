import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        image: "/heroimages/hero1.png",
        title: "Flat 20% OFF",
        subtitle: "On Premium Carpets",
        discount: 20,
    },
    {
        id: 2,
        image: "/heroimages/hero2.png",
        title: "Flat 30% OFF",
        subtitle: "Limited Time Offer",
        discount: 30,
    },
    {
        id: 3,
        image: "/heroimages/hero3.png",
        title: "Flat 40% OFF",
        subtitle: "Best Sellers",
        discount: 40,
    },
    {
        id: 4,
        image: "/heroimages/hero4.png",
        title: "Flat 55% OFF",
        subtitle: "Best Sellers",
        discount: 55,
    },
    {
        id: 5,
        image: "/heroimages/hero5.png",
        title: "Flat 75% OFF",
        subtitle: "Best Sellers",
        discount: 75,
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
        <div className="mb-4 position-relative overflow-hidden">

            {/* SLIDE */}
            <div
                style={{
                    height: "600px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative"
                }}
                onClick={() => onSlideClick(slides[current].discount)}
            >
                <img
                    src={slides[current].image}
                    alt=""
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />

                {/* OVERLAY */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center"
                    style={{
                        background: "rgba(0,0,0,0.4)",
                        color: "white",
                        paddingLeft: "60px",
                    }}
                >
                    <h2 className="fw-bold">{slides[current].title}</h2>
                    <p>{slides[current].subtitle}</p>

                    <button
                        className="btn btn-light btn-sm mt-2"
                        style={{ width: "140px" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSlideClick(slides[current].discount);
                        }}
                    >
                        Shop Now
                    </button>
                </div>
            </div>

            {/* ARROWS */}
            <button
                className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
                onClick={prevSlide}
            >
                ‹
            </button>

            <button
                className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
                onClick={nextSlide}
            >
                ›
            </button>

            {/* DOTS WITH PROGRESS */}
            <div
                className="d-flex justify-content-center gap-3"
                style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2
                }}
            >
                {slides.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setCurrent(i)}
                        style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            position: "relative",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {/* inner dot */}
                        <div
                            style={{
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                background: "white",
                            }}
                        />

                        {/* animated ring */}
                        {current === i && (
                            <svg
                                width="24"
                                height="24"
                                style={{
                                    position: "absolute",
                                    top: "-3px",
                                    left: "-3px",
                                    transform: "rotate(-90deg)",
                                }}
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="white"
                                    strokeWidth="1"
                                    fill="none"
                                    strokeDasharray={63}
                                    strokeDashoffset={63}
                                >
                                    <animate
                                        attributeName="stroke-dashoffset"
                                        from="63"
                                        to="0"
                                        dur={`${duration}ms`}
                                        fill="freeze"
                                    />
                                </circle>
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}