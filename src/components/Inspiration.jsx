import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { applyActiveFilter } from '../utils/productQueries'

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
        navigate(`/products/${p.slug}`)
    };

    return (
        <div className="container mt-4">
            <div className="text-center mb-3">
                <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary section-title">
                    Choose by Amenities
                </span>
            </div>

            {/* TABS */}
            <div className="d-flex gap-1 mb-4 flex-wrap justify-content-center">
                {subCategories.map((cat, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTab(cat)}
                        className={`amenity-chip ${activeTab === cat ? "active" : ""
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* MASONRY */}
            <div
                style={{
                    columns: "220px",
                    columnGap: "16px",
                }}
            >
                {filtered.slice(0, visibleCount).map((p) => (
                    <div
                        key={p.id}
                        style={{
                            breakInside: "avoid",
                            marginBottom: isMobile ? "12px" : "16px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleClick(p.id)}
                    >
                        <img
                            src={p.thumbnail}
                            alt={p.title}
                            style={{
                                width: "100%",
                                borderRadius: "12px",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* SHOW MORE */}
            {visibleCount < filtered.length && (
                <div className="text-center mt-4">
                    <button
                        className="btn btn-dark"
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                    >
                        Show more 6
                    </button>
                </div>
            )}

            {/* EMPTY */}
            {filtered.length === 0 && (
                <div className="text-center mt-5">
                    <h5>No products in this category</h5>
                </div>
            )}
        </div>
    );
}