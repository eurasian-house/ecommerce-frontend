import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { applyActiveFilter } from '../utils/productQueries'
import "./Inspiration.css";

export default function Inspiration() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);

    const navigate = useNavigate();
    const isMobile = window.innerWidth < 576;

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [products, activeTab]);

    const fetchProducts = async () => {
        let query = supabase
            .from("products")
            .select("*");

        // ✅ ADD THIS
        query = applyActiveFilter(query);

        const { data } = await query;

        setProducts(data || []);
        setFiltered(data || []);
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
            ...products.map(p => p.quality).filter(Boolean),
            ...products.map(p => p.pattern).filter(Boolean),
        ]),
    ];

    const handleClick = (id) => {
        const product = products.find((p) => p.id === id);
        if (product) {
            navigate(`/products/${product.slug}`);
        }
    };

    return (
        <section className="container py-5">

            {/* Heading */}
            <div className="text-center mb-5">

                <span className="premium-badge">
                    Curated Collection
                </span>

                <h2 className="mt-3 fw-semibold display-6">
                    Shop by Quality & Design
                </h2>

                <p
                    className="mx-auto mt-3"
                    style={{
                        maxWidth: 620,
                        color: "#777",
                        lineHeight: 1.8
                    }}
                >
                    Discover a curated selection of handcrafted carpets, defined by exceptional quality and intricate, signature designs that elevate any interior.
                </p>

            </div>

            {/* Category Chips */}

            <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">

                {tabs.map((qlt, i) => (

                    <button
                        key={i}
                        onClick={() => setActiveTab(qlt)}
                        className={`premium-chip ${activeTab === qlt ? "active" : ""
                            }`}
                    >
                        {qlt}
                    </button>

                ))}

            </div>

            {/* Masonry */}

            <div
                style={{
                    columns: isMobile ? "1" : "260px",
                    columnGap: "22px"
                }}
            >
                {filtered.slice(0, visibleCount).map((p) => (

                    <div
                        key={p.id}
                        className="premium-masonry-card"
                        onClick={() => handleClick(p.id)}
                    >

                        <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="premium-masonry-image"
                        />

                        <div className="premium-overlay">

                            <h6 className="fw-semibold mb-1">
                                {p.title}
                            </h6>

                            <small>
                                View Collection →
                            </small>

                        </div>

                    </div>

                ))}
            </div>

            {/* Load More */}

            {visibleCount < filtered.length && (

                <div className="text-center mt-5">

                    <button
                        className="btn premium-load-btn px-4 py-2 rounded-pill shadow-sm d-inline-flex align-items-center gap-2"
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                    >
                        View More Collections
                        <i className="bi bi-grid"></i>
                    </button>

                </div>

            )}

            {filtered.length === 0 && (

                <div className="text-center py-5">

                    <h5>No products found.</h5>

                </div>

            )}

        </section>
    );
}