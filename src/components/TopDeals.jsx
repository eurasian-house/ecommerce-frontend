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

        console.log(data); // debug
        setProducts(data || []);
    };

    return (
        <div className="mb-4">
            <div className="text-center mb-3">
        <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-4 py-2 fw-bold text-uppercase tracking-wider">
          Today's best Deal...
        </span>
      </div>
            {/* 🔥 SAME STYLE AS COLOR FILTER */}
            <div className="d-flex overflow-auto gap-3 pb-2">
                {products.map((p) => (
                    <div
                        key={p.id}
                        style={{ width: "260px", flex: "0 0 auto", cursor: "pointer" }}
                        onClick={() => navigate(`/products/${p.slug}`)}
                    >
                        <div className="card h-100">

                            <img
                                src={p.thumbnail}
                                className="card-img-top"
                                style={{
                                    height: "220px",
                                    objectFit: "cover",
                                    width: "100%"
                                }}
                            />

                            <div className="card-body">
                                <p className="text-muted small mb-1">
                                    {p.main_category}
                                </p>

                                <h6
                                    className="mb-2"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 3,
                                        overflow: "hidden",
                                        lineHeight: "1.4",
                                        height: "4.2em",   // 3 lines × 1.4
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {p.title}
                                </h6>

                                <div className="d-flex align-items-center gap-2">
                                    <span className="fw-bold">${p.selling_price}</span>
                                    <span className="text-muted text-decoration-line-through small">
                                        ${p.mrp}
                                    </span>
                                </div>

                                <span className="badge bg-dark mt-2">
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