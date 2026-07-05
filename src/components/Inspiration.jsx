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
        } else {
            const data = products.filter((p) => {
                if (!p.sub_category) return false;

                const subs = p.sub_category
                    .split(",")
                    .map((s) => s.trim().toLowerCase());

                return subs.includes(activeTab.toLowerCase());
            });

            setFiltered(data);
        }

        setVisibleCount(6);
    };

    const subCategories = [
        "All",
        "Bedroom",
        "Living room",
        "Kitchen",
        "Workspace",
        "Outdoor",
        "Bathroom",
        "Baby & children room",
        "Dining",
        "Hallway",
        "Laundry",
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
                    Shop by Space
                </h2>

                <p
                    className="mx-auto mt-3"
                    style={{
                        maxWidth: 620,
                        color: "#777",
                        lineHeight: 1.8
                    }}
                >
                    Discover handcrafted rugs selected for every interior,
                    from cozy living spaces to luxurious master suites.
                </p>

            </div>

            {/* Category Chips */}

            <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">

                {subCategories.map((cat, i) => (

                    <button
                        key={i}
                        onClick={() => setActiveTab(cat)}
                        className={`premium-chip ${activeTab === cat ? "active" : ""
                            }`}
                    >
                        {cat}
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
                        className="btn premium-load-btn"
                        onClick={() =>
                            setVisibleCount((prev) => prev + 6)
                        }
                    >
                        Explore More
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