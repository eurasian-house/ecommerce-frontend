import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../components/common/UserAvatar";
import { getAvatar } from "../utils/getAvatar";
import { attachCurrentReviewerProfiles } from "../services/reviewService";
import "../styles/components/CustomerInspiration.css";


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
        user_id,
        products (
            slug,
            title
        )
    `)
            .eq("status", "approved")
            .not("image_url", "is", null)
            .order("created_at", { ascending: false });

        setReviews(await attachCurrentReviewerProfiles(data || []));
    }

    return (
        <section className="customer-inspiration">

            <div className="container">

                <div className="text-center mb-5">
                    <div className="discount-ornament">

                        <span className="ornament-line"></span>

                        <span className="ornament-text">
                            STYLED BY OUR CUSTOMERS
                        </span>

                        <span className="ornament-line"></span>

                    </div>

                    <h2 className="mt-3 fw-semibold for-user-heading">
                        Real Homes. Real Stories.
                    </h2>

                    <p className="for-user-subheading mx-auto">
                        See how our handcrafted rugs look in homes around the world.
                    </p>

                </div>

                <div className="customer-gallery">

                    {reviews.slice(0, visibleCount).map((r) => (

                        <div
                            key={r.id}
                            className="customer-gallery-item"
                            onClick={() => navigate(`/products/${r.products.slug}`)}
                        >

                            <div className="customer-gallery-card">
                                <img
                                    src={r.image_url}
                                    alt={r.products.title}
                                    className="customer-gallery-image"
                                />

                                <div className="customer-gallery-body">

                                    <div className="customer-reviewer">

                                        <UserAvatar
                                            src={getAvatar({
                                                avatar_url:
                                                    r.current_avatar ||
                                                    r.reviewer_avatar,
                                            })}
                                            alt={r.current_reviewer_name || r.reviewer_name || "Customer"}
                                            size={30}
                                            className="me-2"
                                        />

                                        <div>

                                            <div className="customer-name">
                                                {r.current_reviewer_name || r.reviewer_name || "Customer"}
                                            </div>

                                            <div className="customer-rating">
                                                {"★".repeat(r.rating)}
                                            </div>

                                        </div>

                                    </div>

                                    <div className="customer-review">
                                        "{r.review}"
                                    </div>

                                    <div className="customer-product">
                                        {r.products.title}
                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {visibleCount < reviews.length && (

                    <div className="text-center mt-5">

                        <button
                            className="app-btn-primary"
                            onClick={() => setVisibleCount(v => v + 10)}
                        >
                            Show More
                        </button>

                    </div>

                )}

            </div>

        </section>
    );
}
