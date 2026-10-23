import { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import "../styles/components/SmallComponent.css";

export default function RecentlyViewed() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        try {
            const stored = JSON.parse(
                localStorage.getItem("recentlyViewedProducts") || "[]"
            );

            setProducts(stored);
        } catch (error) {
            console.log("Recently viewed load error:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const optimizeUrl = (url) => {
        if (!url?.includes("/upload/")) return url;

        return url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,dpr_auto,c_limit,w_auto/"
        );
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -350,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 350,
            behavior: "smooth",
        });
    };

    return (
        <section className="top-deals-section">
            <div className="container-fluid">
                <div className="text-center top-deals-header">
                    <div className="discount-ornament mt-4">
                        <span className="ornament-line"></span>
                        <span className="ornament-text">
                            Recently Viewed
                        </span>
                        <span className="ornament-line"></span>
                    </div>

                    <h2 className="recent-added-title">
                        Pick Up <em>Where You Left Off</em>
                    </h2>

                    <p className="recent-added-description">
                        Revisit the handcrafted rugs you've recently explored.
                    </p>
                </div>

                <div className="position-relative">
                    {loading ? (
                        <div className="d-flex overflow-hidden gap-3 pb-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="recently-viewed-skeleton"
                                >
                                    <div className="recently-viewed-skeleton-image"></div>
                                    <div className="recently-viewed-skeleton-line"></div>
                                    <div className="recently-viewed-skeleton-line short"></div>
                                    <div className="recently-viewed-skeleton-price"></div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-4">
                            <p className="mb-0">No Recently Seen Item</p>
                        </div>
                    ) : (
                        <>
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
                                className="d-flex overflow-auto gap-3 pb-2 category-scroll"
                            >
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={{
                                            ...product,
                                            thumbnail: optimizeUrl(product.thumbnail),
                                        }}
                                        cardWidth="185px"
                                    />
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
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}