import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { applyActiveFilter } from "../utils/productQueries";
import "../styles/components/Inspiration.css";

export default function Inspiration() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [products, activeTab]);

    const fetchProducts = async () => {
        setLoading(true);

        try {
            let query = supabase
                .from("products")
                .select("*");

            query = applyActiveFilter(query);

            const { data, error } = await query;

            if (error) throw error;

            setProducts(data || []);
            setFiltered(data || []);
        } catch (error) {
            console.error("Error fetching inspiration products:", error);
            setProducts([]);
            setFiltered([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilter = () => {
        if (activeTab === "All") {
            setFiltered(products);
            setVisibleCount(6);
            return;
        }

        const tab = activeTab.toLowerCase();

        const data = products.filter((p) => {
            const qualityMatch =
                p.quality &&
                p.quality.toLowerCase() === tab;

            const patternMatch =
                p.pattern &&
                p.pattern.toLowerCase() === tab;

            return qualityMatch || patternMatch;
        });

        setFiltered(data);
        setVisibleCount(6);
    };

    const tabs = [
        "All",
        ...new Set([
            ...products.map((p) => p.quality).filter(Boolean),
            ...products.map((p) => p.pattern).filter(Boolean),
        ]),
    ];

    const handleClick = (id) => {
        const product = products.find((p) => p.id === id);

        if (product) {
            navigate(`/products/${product.slug}`);
        }
    };

    return (
        <section className="inspiration-section">
            <div className="container">

                {/* Heading */}
                <div className="text-center mb-5">
                    <div className="discount-ornament">
                        <span className="ornament-line"></span>

                        <span className="ornament-text">
                            Curated Collection
                        </span>

                        <span className="ornament-line"></span>
                    </div>

                    <h2 className="recent-added-title">
                        Shop by <em>Quality &amp; Design</em>
                    </h2>

                    <p className="recent-added-description">
                        Discover a curated selection of handcrafted carpets,
                        defined by exceptional quality and intricate, signature
                        designs that elevate any interior.
                    </p>
                </div>

                {/* Filter Chips */}
                {!loading && products.length > 0 && (
                    <div className="inspiration-chips">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`inspiration-chip ${activeTab === tab ? "active" : ""
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}

                {/* Masonry Gallery */}
                <div className="inspiration-gallery">

                    {loading &&
                        Array.from({ length: 6 }).map((_, index) => (
                            <div
                                className="inspiration-skeleton"
                                key={index}
                                aria-hidden="true"
                            >
                                <div className="inspiration-skeleton-image" />
                            </div>
                        ))}

                    {!loading &&
                        filtered.slice(0, visibleCount).map((product) => (
                            <div
                                key={product.id}
                                className="inspiration-card"
                                onClick={() => handleClick(product.id)}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" ||
                                        event.key === " "
                                    ) {
                                        event.preventDefault();
                                        handleClick(product.id);
                                    }
                                }}
                                role="link"
                                tabIndex={0}
                            >
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="inspiration-image"
                                    loading="lazy"
                                    decoding="async"
                                />

                                <div className="inspiration-overlay">
                                    <h6>{product.title}</h6>

                                    <span>
                                        View Details
                                        <i className="bi bi-arrow-right ms-2"></i>
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Load More */}
                {!loading && visibleCount < filtered.length && (
                    <div className="text-center mt-5">
                        <button
                            className="btn-secondary btn-lg"
                            onClick={() =>
                                setVisibleCount((prev) => prev + 6)
                            }
                        >
                            View More Collections
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filtered.length === 0 && (
                    <div className="text-center py-5">
                        <h5 className="text-secondary">
                            No products found.
                        </h5>
                    </div>
                )}
            </div>
        </section>
    );

}