import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function TopDeals() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTopDeals();
    }, []);

    const fetchTopDeals = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("clicks", { ascending: false })
            .limit(10);

        if (error) {
            console.log(error);
            return;
        }

        setProducts(data || []);
    };


    const optimizeUrl = (url) => {
        if (!url.includes("/upload/")) return url;

        return url.replace(
            "/upload/",
            "/upload/f_auto,q_auto,dpr_auto,c_limit,w_auto/"
        );
    };

    return (
        <div className="mb-4">
            <div className="text-center mb-3">
                <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary section-title">
                    Today's best Deal...
                </span>
            </div>
            {/* 🔥 SAME STYLE AS COLOR FILTER */}
            <div className="d-flex overflow-auto gap-3 pb-2">
                {products.map((p) => (
                    <div
                        key={p.id}
                        style={{ width: "200px", flex: "0 0 auto", cursor: "pointer" }}
                        onClick={() => navigate(`/products/${p.slug}`)}
                    >
                        <div className="card h-100">

                            <img
                                src={optimizeUrl(p.thumbnail)}
                                alt={p.title}
                                loading="lazy"
                                decoding="async"
                                className="card-img-top"
                                style={{
                                    aspectRatio: "4 / 3",
                                    height: "auto",
                                    objectFit: "cover",
                                    width: "100%"
                                }}
                            />

                            <div className="card-body p-3">
                                <p className="text-muted small mb-1">
                                    {p.main_category}
                                </p>

                                <h6
                                    className="mb-0 fw-semibold"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                        overflow: "hidden",
                                        lineHeight: "1.3",
                                        height: "2.6em", // 2 × 1.3
                                        wordBreak: "break-word",
                                        fontSize: "0.95rem",
                                    }}
                                >
                                    {p.title}
                                </h6>

                                <div className="d-flex align-items-center gap-2">
                                    <span className="fw-bold" style={{ color: "#0F5132" }}>${p.selling_price}</span>
                                    <span className="text-muted text-decoration-line-through small">
                                        ${p.mrp}
                                    </span>
                                </div>

                                <span className="badge bg-dark mt-1">
                                    {p.discount_percent}% OFF
                                </span>
                                <div className="small text-muted mt-2">
                                    {p.clicks} clicks this week
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}