import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    approveReview,
    getReviews,
    rejectReview,
} from "../../services/reviewService";

export default function AdminReviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    async function fetchReviews() {
        try {
            const data = await getReviews();
            setReviews(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load reviews.");
        } finally {
            setLoading(false);
        }
    }

    async function handleApprove(review) {
        try {
            await approveReview(review);

            toast.success("Review approved.");

            fetchReviews();
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    }

    async function handleReject(id) {
        try {
            await rejectReview(id);

            toast.success("Review rejected.");

            fetchReviews();
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    }

    if (loading) {
        return (
            <div className="container py-5">
                Loading...
            </div>
        );
    }

    return (
        <div className="container py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">
                    Customer Reviews
                </h2>

                <span className="badge bg-dark fs-6">
                    {reviews.length}
                </span>

            </div>

            {reviews.length === 0 && (

                <div className="card border-0 shadow-sm rounded-4 p-5 text-center">

                    <i
                        className="bi bi-chat-square-text fs-1 text-muted mb-3"
                    />

                    <h5>No reviews found</h5>

                </div>

            )}

            {reviews.map((review) => (

                <div
                    key={review.id}
                    className="card border-0 shadow-sm rounded-4 mb-4"
                >

                    <div className="card-body p-4">

                        <div className="row">

                            <div className="col-md-2">

                                <img
                                    src={review.products?.thumbnail}
                                    alt=""
                                    className="rounded-3"
                                    style={{
                                        width: 100,
                                        height: 100,
                                        objectFit: "cover"
                                    }}
                                />

                            </div>

                            <div className="col-md-10">

                                <div className="d-flex justify-content-between">

                                    <div>

                                        <h5 className="mb-1">

                                            {review.products?.title}

                                        </h5>

                                        <div className="text-muted small">

                                            {review.reviewer_name}

                                        </div>

                                    </div>

                                    <span
                                        className={`badge rounded-pill ${review.status === "approved"
                                            ? "bg-success"
                                            : review.status === "rejected"
                                                ? "bg-danger"
                                                : "bg-warning text-dark"
                                            }`}
                                    >
                                        {review.status}
                                    </span>

                                </div>

                                <div className="my-3">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <i
                                            key={star}
                                            className={`bi ${review.rating >= star
                                                ? "bi-star-fill text-warning"
                                                : "bi-star text-warning"
                                                } me-1`}
                                        />

                                    ))}

                                </div>

                                {review.title && (

                                    <h6 className="fw-bold">

                                        {review.title}

                                    </h6>

                                )}

                                {review.review && (

                                    <p className="mb-3">

                                        {review.review}

                                    </p>

                                )}

                                <div className="mt-3">
                                    <label className="form-label fw-semibold">
                                        Seller Reply
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        value={review.admin_note || ""}
                                        onChange={(e) =>
                                            setReviews(prev =>
                                                prev.map(r =>
                                                    r.id === review.id
                                                        ? { ...r, admin_note: e.target.value }
                                                        : r
                                                )
                                            )
                                        }
                                    />
                                </div>

                                {review.image_url && (

                                    <img
                                        src={review.image_url}
                                        alt=""
                                        className="rounded-3 border"
                                        style={{
                                            width: 180,
                                            height: 180,
                                            objectFit: "cover"
                                        }}
                                    />

                                )}

                                <div className="mt-4 d-flex gap-2">

                                    <button
                                        className="btn btn-success rounded-pill px-4"
                                        onClick={() => handleApprove(review)}
                                    >
                                        {review.status === "approved"
                                            ? "Update Approval"
                                            : "Approve"}
                                    </button>

                                    <button
                                        className="btn btn-outline-danger rounded-pill px-4"
                                        onClick={() => handleReject(review.id)}
                                    >
                                        Reject
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
}