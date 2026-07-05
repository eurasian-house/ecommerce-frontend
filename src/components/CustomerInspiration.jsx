import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../components/common/UserAvatar";
import { getAvatar } from "../utils/getAvatar";

export default function CustomerInspiration() {
    const [reviews, setReviews] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);

    const navigate = useNavigate();
    const isMobile = window.innerWidth < 576;

    useEffect(() => {
        fetchReviews();
    }, []);

    async function fetchReviews() {
        const { data, error } = await supabase
            .from("product_reviews")
            .select(`
        id,
        rating,
        review,
        image_url,
        reviewer_name,
        reviewer_avatar,
        products (
            slug,
            title
        )
    `)
            .eq("status", "approved")
            .not("image_url", "is", null)
            .order("created_at", { ascending: false });

        console.log(data);
        console.log(error);

        setReviews(data || []);
    }

    return (
        <div className="container mt-5">

            <div className="text-center mb-4">

                <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary section-title">
                    Styled by Our Customers
                </span>

                <h2 className="fw-bold mt-3">
                    Real Homes. Real Stories.
                </h2>

                <p className="text-muted">
                    See how our handcrafted rugs look in homes around the world.
                </p>

            </div>

            <div
                style={{
                    columns: "220px",
                    columnGap: "16px",
                }}
            >

                {reviews.slice(0, visibleCount).map((r) => (

                    <div
                        key={r.id}
                        style={{
                            breakInside: "avoid",
                            marginBottom: isMobile ? 12 : 16,
                            cursor: "pointer",
                        }}
                        onClick={() =>
                            navigate(`/products/${r.products.slug}`)
                        }
                    >

                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden customer-gallery-card">

                            <img
                                src={r.image_url}
                                alt={r.products.title}
                                style={{
                                    width: "100%",
                                    display: "block",
                                }}
                            />

                            <div className="p-3">

                                <div className="d-flex align-items-center mb-2">

                                    <UserAvatar
                                        src={getAvatar({
                                            avatar_url: r.reviewer_avatar,
                                        })}
                                        alt={r.reviewer_name}
                                        size={38}
                                        className="me-2"
                                    />

                                    <div>

                                        <div className="fw-semibold small">
                                            {r.reviewer_name}
                                        </div>

                                        <div
                                            className="text-warning small"
                                            style={{ letterSpacing: 1 }}
                                        >
                                            {"★".repeat(r.rating)}
                                        </div>

                                    </div>

                                </div>

                                <div
                                    className="text-muted small mb-2"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    "{r.review}"
                                </div>

                                <div className="small fw-semibold">
                                    {r.products.title}
                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {visibleCount < reviews.length && (

                <div className="text-center mt-4">

                    <button
                        className="btn btn-dark rounded-pill px-4"
                        onClick={() => setVisibleCount((v) => v + 10)}
                    >
                        Show More
                    </button>

                </div>

            )}

        </div>
    );
}