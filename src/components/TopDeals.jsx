import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "./ProductCard";
import "../styles/components/SmallComponent.css";

export default function TopDeals() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetchTopDeals();
    }, []);

    const fetchTopDeals = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("status", "active")
            .order("clicks", { ascending: false })
            .limit(20);

        if (error) {
            console.log(error);
            setLoading(false);
            return;
        }

        setProducts(data || []);
        setLoading(false);
    };

    const optimizeUrl = (url) => {
        if (!url || !url.includes("/upload/")) return url;

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
                        <span className="ornament-text">Featured Deal</span>
                        <span className="ornament-line"></span>
                    </div>

                    <h2 className="recent-added-title">
                        Exceptional Finds. <em>Exceptional Value.</em>
                    </h2>

                    <p className="recent-added-description">
                        Discover our <span className="top-10">Top</span> handcrafted rugs loved by
                        customers worldwide.
                    </p>
                </div>

                <div className="position-relative">

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
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="top-deals-skeleton"
                                >
                                    <div className="top-deals-skeleton-image"></div>
                                    <div className="top-deals-skeleton-line"></div>
                                    <div className="top-deals-skeleton-line short"></div>
                                    <div className="top-deals-skeleton-price"></div>
                                </div>
                            ))
                        ) : (
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={{
                                        ...product,
                                        thumbnail: optimizeUrl(product.thumbnail),
                                    }}
                                    cardWidth="185px"
                                />
                            ))
                        )}
                    </div>

                    <button
                        type="button"
                        className="sliding-arrow sliding-arrow--right hero-arrow-right"
                        onClick={scrollRight}
                        aria-label="Next slide"
                    >
                        <i className="bi bi-chevron-right" />
                    </button>
                </div>
            </div>
        </section>
    );
}
