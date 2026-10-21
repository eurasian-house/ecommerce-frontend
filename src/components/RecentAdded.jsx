
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "./ProductCard";
import "../styles/components/SmallComponent.css";

export default function RecentAdded() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchRecentAdded = async () => {
            try {
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .eq("status", "active")
                    .order("created_at", { ascending: false })
                    .limit(15);

                if (error) {
                    console.error("Error fetching recent products:", error);
                    return;
                }

                setProducts(data || []);
            } catch (error) {
                console.error("Unexpected error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentAdded();
    }, []);

    const optimizeUrl = (url) => {
        if (!url?.includes("/upload/")) return url;

        return url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,dpr_auto,c_limit,w_auto/"
        );
    };

    const scroll = (direction) => {
        scrollRef.current?.scrollBy({
            left: direction * 400,
            behavior: "smooth",
        });
    };

    if (!loading && products.length === 0) return null;

    return (
        <section className="recent-added-section">
            {/* Decorative background texture */}
            <img
                className="recent-added-texture"
                src="/category/tibetan.jpg"
                alt="Close Hand Knotted Rug"
                aria-hidden="true"
                loading="lazy"
                decoding="async"
            />

            <div className="container-fluid recent-added-container">
                <header className="recent-added-header">
                    <div className="discount-ornament">

                        <span className="ornament-line"></span>

                        <span className="ornament-text">
                            Just Arrived
                        </span>

                        <span className="ornament-line"></span>

                    </div>

                    <h2 className="recent-added-title">
                        Discover Our <em>Latest Arrivals</em>
                    </h2>

                    <p className="recent-added-description">
                        Freshly curated, beautifully handcrafted.
                        Discover the newest additions to our rug collection.
                    </p>

                    <div className="recent-added-divider">
                        <span />
                        <i className="bi bi-diamond" aria-hidden="true" />
                        <span />
                    </div>
                </header>

                <div className="recent-added-gallery">
                    <button
                        className="recent-added-arrow recent-added-arrow-left"
                        type="button"
                        onClick={() => scroll(-1)}
                        aria-label="Scroll to previous rugs"
                        disabled={loading}
                    >
                        <i className="bi bi-arrow-left" aria-hidden="true" />
                    </button>

                    <div
                        ref={scrollRef}
                        className="recent-added-track"
                        aria-label="Recently added rugs"
                    >
                        {loading
                            ? Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    className="recent-added-skeleton"
                                    key={index}
                                    aria-hidden="true"
                                >
                                    <div className="recent-added-skeleton-image" />
                                    <div className="recent-added-skeleton-line" />
                                    <div className="recent-added-skeleton-line short" />
                                </div>
                            ))
                            : products.map((product) => (
                                <div
                                    className="recent-added-item"
                                    key={product.id}
                                >
                                    <ProductCard
                                        product={{
                                            ...product,
                                            thumbnail: optimizeUrl(product.thumbnail),
                                        }}
                                        cardWidth="185px"
                                    />
                                </div>
                            ))}
                    </div>

                    <button
                        className="recent-added-arrow recent-added-arrow-right"
                        type="button"
                        onClick={() => scroll(1)}
                        aria-label="Scroll to more rugs"
                        disabled={loading}
                    >
                        <i className="bi bi-arrow-right" aria-hidden="true" />
                    </button>
                </div>

                <div className="recent-added-footer">
                    <span>
                        Crafted with care. Made to be lived with.
                    </span>
                </div>
            </div>
        </section>
    );
}
