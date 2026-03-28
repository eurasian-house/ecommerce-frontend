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
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .gte("created_at", oneWeekAgo.toISOString())
            .order("clicks", { ascending: false })
            .limit(10);

        if (error) return;

        setProducts(data);
    };

    return (
        <div className="mb-4">
            <h4 className="fw-bold mb-3">Today's best deals</h4>

            {/* 🔥 SAME STYLE AS COLOR FILTER */}
            <div className="d-flex overflow-auto gap-3 pb-2">
                {products.map((p) => (
                    <div
                        key={p.id}
                        style={{ width: "260px", flex: "0 0 auto", cursor: "pointer" }}
                        onClick={() => navigate(`/products/${p.id}`)}
                    >
                        <div className="card h-100">

                            <img
                                src={p.thumbnail}
                                className="card-img-top"
                                style={{ height: "180px", objectFit: "contain" }}
                            />

                            <div className="card-body">
                                <p className="text-muted small mb-1">
                                    {p.main_category}
                                </p>

                                <h6 className="mb-2">{p.title}</h6>

                                <div className="d-flex align-items-center gap-2">
                                    <span className="fw-bold">₹{p.selling_price}</span>
                                    <span className="text-muted text-decoration-line-through small">
                                        ₹{p.mrp}
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