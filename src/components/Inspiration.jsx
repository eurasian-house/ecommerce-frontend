import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Inspiration() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [products, activeTab]);

    const fetchProducts = async () => {
        const { data } = await supabase.from("products").select("*");
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
        navigate(`/products/${id}`);
    };

    return (
        <div className="container mt-4">

            {/* TABS */}
            <div className="d-flex gap-4 mb-4 flex-wrap">
                {subCategories.map((cat, i) => (
                    <span
                        key={i}
                        onClick={() => setActiveTab(cat)}
                        style={{
                            cursor: "pointer",
                            borderBottom:
                                activeTab === cat ? "2px solid black" : "none",
                            fontWeight: activeTab === cat ? "600" : "400",
                        }}
                    >
                        {cat}
                    </span>
                ))}
            </div>

            {/* MASONRY */}
            <div style={{ columnCount: 4, columnGap: "16px" }}>
                {filtered.slice(0, visibleCount).map((p) => (
                    <div
                        key={p.id}
                        style={{
                            breakInside: "avoid",
                            marginBottom: "16px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleClick(p.id)}
                    >
                        <img
                            src={p.thumbnail}
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