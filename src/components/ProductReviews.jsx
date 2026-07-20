import { useEffect, useMemo, useState } from "react";
import { getProductReviews, markReviewHelpful } from "../services/reviewService";
import UserAvatar from "../components/common/UserAvatar";
import { getAvatar } from "../utils/getAvatar";

export default function ProductReviews({ productId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [helpfulVotes, setHelpfulVotes] = useState([]);
    const [expandedReviews, setExpandedReviews] = useState({});

    useEffect(() => {
        const votes = JSON.parse(localStorage.getItem("helpfulVotes") || "[]");
        setHelpfulVotes(votes);
        fetchReviews();
    }, [productId]);

    async function fetchReviews() {
        try {
            const data = await getProductReviews(productId);
            setReviews(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleHelpful(review) {

        if (helpfulVotes.includes(review.id)) return;

        try {

            await markReviewHelpful(
                review.id,
                review.helpful_count || 0
            );

            const updatedVotes = [...helpfulVotes, review.id];

            setHelpfulVotes(updatedVotes);

            localStorage.setItem(
                "helpfulVotes",
                JSON.stringify(updatedVotes)
            );

            fetchReviews();

        } catch (err) {
            console.error(err);
        }
    }

    const averageRating = useMemo(() => {
        if (!reviews.length) return 0;

        const total = reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        return (total / reviews.length).toFixed(1);
    }, [reviews]);

    const ratingCounts = useMemo(() => {
        const counts = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };

        reviews.forEach((review) => {
            counts[review.rating]++;
        });

        return counts;
    }, [reviews]);

    if (loading) {
        return (
            <div
                className="mx-auto mt-5 px-3"
                style={{ maxWidth: "920px" }}
            >
                <div className="card border-0 shadow-sm rounded-4 p-5">

                    <div
                        className="placeholder-glow mb-4"
                        style={{ height: 35 }}
                    >
                        <span className="placeholder col-4"></span>
                    </div>

                    {[1, 2, 3].map(i => (
                        <div key={i} className="mb-5">

                            <div className="placeholder-glow mb-3">
                                <span className="placeholder col-3"></span>
                            </div>

                            <div className="placeholder-glow">
                                <span className="placeholder col-12"></span>
                                <span className="placeholder col-10"></span>
                                <span className="placeholder col-8"></span>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        );
    }

    return (
        <div
            className="mx-auto mt-5 px-3"
            style={{ maxWidth: "920px" }}
        >
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5">

                    <div className="mb-4 mb-md-0">

                        <h3 className="fw-semibold mb-2">
                            Customer Reviews
                        </h3>

                        <p className="text-muted mb-0">
                            Real reviews from verified customers.
                        </p>

                    </div>

                    <div className="text-md-end">

                        <div
                            className="fw-bold"
                            style={{
                                fontSize: "3rem",
                                lineHeight: 1,
                                letterSpacing: "-2px"
                            }}
                        >
                            {averageRating}
                        </div>

                        <div className="mt-2 mb-2">

                            {[1, 2, 3, 4, 5].map((star) => (

                                <i
                                    key={star}
                                    className={`bi ${averageRating >= star
                                        ? "bi-star-fill text-warning"
                                        : "bi-star text-warning"
                                        } fs-5 me-1`}
                                />

                            ))}

                        </div>

                        <small className="text-secondary fw-medium">

                            {reviews.length} review{reviews.length !== 1 ? "s" : ""}

                        </small>

                    </div>

                </div>

                <hr
                    className="my-4"
                    style={{ opacity: 0.08 }}
                />

                {[5, 4, 3, 2, 1].map((star) => {

                    const count = ratingCounts[star];

                    const percent = reviews.length
                        ? (count / reviews.length) * 100
                        : 0;

                    return (

                        <div
                            key={star}
                            className="d-flex align-items-center mb-4"
                        >

                            <div
                                className="fw-medium"
                                style={{
                                    width: 60
                                }}
                            >
                                {star} ★
                            </div>

                            <div
                                className="progress flex-grow-1 bg-light"
                                style={{
                                    height: 6,
                                    borderRadius: 999
                                }}
                            >

                                <div
                                    className="progress-bar bg-warning"
                                    style={{
                                        width: `${percent}%`,
                                        borderRadius: 999
                                    }}
                                />

                            </div>

                            <div
                                className="text-muted text-end ms-3"
                                style={{
                                    width: 30
                                }}
                            >
                                {count}
                            </div>

                        </div>

                    );

                })}

                <hr
                    className="my-5"
                    style={{ opacity: 0.08 }}
                />
                <h5 className="fw-semibold mb-4">
                    {reviews.length} Customer Review{reviews.length !== 1 ? "s" : ""}
                </h5>

                {reviews.length === 0 ? (

                    <div className="text-center py-5">

                        <i
                            className="bi bi-chat-square-text"
                            style={{
                                fontSize: "3rem",
                                opacity: .25
                            }}
                        />

                        <h6 className="mt-4 fw-semibold">
                            No reviews yet
                        </h6>

                        <p className="text-muted mb-0">
                            Be the first to review this product.
                        </p>

                    </div>

                ) : (
                    <>

                        {(showAll ? reviews : reviews.slice(0, 3)).map((review) => (

                            <div
                                key={review.id}
                                className="border rounded-4 p-4 p-md-5 mb-5 bg-white shadow-sm review-card"
                            >

                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">

                                    <div className="d-flex align-items-center flex-grow-1">

                                        <UserAvatar
                                            src={getAvatar({
                                                avatar_url:
                                                    review.current_avatar ||
                                                    review.reviewer_avatar ||
                                                    review.avatar_url,
                                            })}
                                            alt={review.reviewer_name}
                                            size={48}
                                            className="me-3"
                                        />

                                        <div>

                                            <div className="fw-semibold fs-5">

                                                {review.reviewer_name || "Customer"}

                                            </div>

                                            <div className="small text-secondary mt-1">

                                                {new Date(review.created_at).toLocaleDateString()}

                                            </div>

                                        </div>

                                    </div>

                                    {review.is_verified_purchase && (

                                        <span
                                            className="rounded-pill px-3 py-2"
                                            style={{
                                                background: "#EEF8F0",
                                                color: "#198754",
                                                fontSize: ".82rem",
                                                fontWeight: 600,
                                                margin: "1rem"
                                            }}
                                        >
                                            <i className="bi bi-patch-check-fill me-1"></i>
                                            Verified Purchase
                                        </span>

                                    )}

                                </div>
                                <hr />

                                <div className="mt-3">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <i
                                            key={star}
                                            className={`bi ${review.rating >= star
                                                ? "bi-star-fill text-warning"
                                                : "bi-star text-warning"
                                                } fs-5 me-1`}
                                        />

                                    ))}

                                </div>

                                {review.title && (

                                    <h5 className="mt-3 mb-2 fw-semibold">

                                        {review.title}

                                    </h5>

                                )}

                                {review.review && (

                                    <p
                                        className="text-secondary mb-3"
                                        style={{
                                            lineHeight: 1.8
                                        }}
                                    >

                                        {expandedReviews[review.id]
                                            ? review.review
                                            : review.review.slice(0, 220)}

                                        {review.review.length > 220 && (
                                            <>
                                                {!expandedReviews[review.id] && "... "}

                                                <button
                                                    className="btn btn-link btn-sm p-0 text-decoration-none"
                                                    onClick={() =>
                                                        setExpandedReviews(prev => ({
                                                            ...prev,
                                                            [review.id]: !prev[review.id]
                                                        }))
                                                    }
                                                >
                                                    {expandedReviews[review.id]
                                                        ? "Show less"
                                                        : "Read more"}
                                                </button>
                                            </>
                                        )}
                                        <br />
                                        <button
                                            disabled={helpfulVotes.includes(review.id)}
                                            className="btn btn-sm btn-light border rounded-pill px-3 mt-2"
                                            onClick={() => handleHelpful(review)}
                                        >
                                            <i className="bi bi-hand-thumbs-up me-2"></i>

                                            {helpfulVotes.includes(review.id)
                                                ? `✓ Helpful (${review.helpful_count || 0})`
                                                : `Helpful (${review.helpful_count || 0})`}
                                        </button>

                                    </p>
                                )}

                                {review.admin_note && (
                                    <div className="mt-4 mb-4 p-4 rounded-4 seller-reply">
                                        <div className="d-flex align-items-center mb-3">

                                            <div
                                                className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center me-3"
                                                style={{
                                                    width: 38,
                                                    height: 38,
                                                    fontSize: ".9rem",
                                                    fontWeight: 600,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                EH
                                            </div>

                                            <div>

                                                <div className="fw-semibold">
                                                    Eurasian House
                                                </div>

                                                <small className="text-muted">
                                                    Seller Response
                                                </small>

                                            </div>

                                        </div>

                                        <div
                                            className="text-secondary"
                                            style={{
                                                lineHeight: 1.8
                                            }}
                                        >
                                            {review.admin_note}
                                        </div>
                                    </div>
                                )}

                                {review.image_url && (

                                    <img
                                        src={review.image_url}
                                        onClick={() => setSelectedImage(review.image_url)}
                                        alt=""
                                        className="rounded-4 border review-image"
                                        style={{
                                            width: 160,
                                            height: 160,
                                            objectFit: "cover",
                                            cursor: "pointer"
                                        }}
                                    />

                                )}

                            </div>
                        ))}

                        {reviews.length > 3 && (

                            <div className="text-center mt-4">

                                <button
                                    className="btn btn-dark rounded-pill px-5 py-2"
                                    onClick={() => setShowAll(!showAll)}
                                >
                                    {showAll
                                        ? "Show Less"
                                        : `View All Reviews (${reviews.length})`}
                                </button>

                            </div>
                        )}
                    </>
                )}

                {selectedImage && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            background: "rgba(0,0,0,.88)",
                            backdropFilter: "blur(6px)"
                        }}
                        onClick={() => setSelectedImage(null)}
                    >

                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div
                                className="modal-content border-0 bg-transparent shadow-none"
                            >

                                <img
                                    src={selectedImage}
                                    className="img-fluid rounded-4 shadow-lg"
                                    alt=""
                                />

                            </div>
                        </div>

                    </div>

                )}
            </div>

        </div>
    );
}
