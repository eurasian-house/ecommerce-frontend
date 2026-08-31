import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderItemById } from "../services/orderService";
import { createReview, getReviewByOrderItem, updateReview, } from "../services/reviewService";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { compressCustomerImage } from "../utils/customerImage";
import { uploadCustomerImage } from "../lib/customerCloudinary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/pages/WriteReview.css";


export default function WriteReview() {
    const { orderItemId } = useParams();
    const { user } = useAuth();

    const [item, setItem] = useState(null);
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [image, setImage] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(true);
    const [existingReview, setExistingReview] = useState(null);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchItem();
    }, []);

    async function fetchItem() {
        try {
            const data = await getOrderItemById(orderItemId);
            setItem(data);
            const review = await getReviewByOrderItem(orderItemId);

            if (review) {
                setExistingReview(review);
                setRating(review.rating);
                setTitle(review.title || "");
                setReview(review.review || "");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleImage(file) {
        if (!file) return;

        setImage(file);
    }

    async function handleSubmit() {
        setSaving(true);

        try {
            if (!rating) {
                toast.error("Please select a rating.");
                return;
            }

            let imageUrl = existingReview?.image_url || null;

            if (image) {
                const compressed = await compressCustomerImage(image);
                imageUrl = await uploadCustomerImage(
                    compressed,
                    "reviews"
                );
            }

            const payload = {
                product_id: item.products.id,
                order_id: item.order_id,
                user_id: user.id,
                order_item_id: item.id,

                rating,
                title,
                review,

                image_url: imageUrl,

                is_verified_purchase: true,
            };

            if (existingReview) {
                await updateReview(existingReview.id, payload);
                toast.success("Review updated successfully.");
            } else {
                await createReview(payload);
                toast.success("Review submitted successfully.");
            }

            navigate(`/account/orders/${item.order_id}`);

        } catch (err) {
            console.error(err);
            toast.error(err.message || "Something went wrong.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="container py-5"><div className="placeholder-glow">

        <span className="placeholder col-8 mb-4"></span>

        <span className="placeholder col-12"></span>

    </div></div>;

    const previewImage = image
        ? URL.createObjectURL(image)
        : existingReview?.image_url || null;


    return (

        <div className="write-review-page">

            <div className="container">

                <div className="write-review-container">

                    <div className="write-review-header">

                        <h1 className="write-review-title">

                            {existingReview
                                ? "Update Review"
                                : "Write a Review"}

                        </h1>

                        <p className="write-review-subtitle">

                            Share your experience to help other customers make better decisions.

                        </p>

                    </div>

                    {/* Product */}

                    <section className="write-review-card">

                        <div className="review-product">

                            <img
                                src={item.products.thumbnail}
                                alt={item.products.title}
                                className="review-product-image"
                            />

                            <div className="review-product-content">

                                <h3 className="review-product-title">

                                    {item.products.title}

                                </h3>

                                <div className="review-product-meta">

                                    <span className="review-chip">

                                        Size: {item.size}

                                    </span>

                                    <span className="review-chip">

                                        Color: {item.color}

                                    </span>

                                </div>

                                <div className="review-verified">

                                    <i className="bi bi-patch-check-fill"></i>

                                    Verified Purchase

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* Review */}

                    <section className="write-review-card">

                        <h2 className="review-section-title">

                            Your Review

                        </h2>

                        {/* Rating */}

                        <div className="review-field">

                            <label className="review-label">

                                Rating

                            </label>

                            <div className="review-stars">

                                {[1, 2, 3, 4, 5].map((star) => (

                                    <i
                                        key={star}
                                        className={`bi ${rating >= star
                                            ? "bi-star-fill review-star active"
                                            : "bi-star review-star"
                                            }`}
                                        onClick={() => setRating(star)}
                                    />

                                ))}

                            </div>

                        </div>

                        {/* Title */}

                        <div className="review-field">

                            <label className="review-label">

                                Title

                            </label>

                            <input
                                className="review-input"
                                maxLength={80}
                                value={title}
                                placeholder="Summarize your experience"
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                            />

                        </div>

                        {/* Review */}

                        <div className="review-field">

                            <label className="review-label">

                                Review

                            </label>

                            <textarea
                                rows={5}
                                maxLength={1000}
                                className="review-textarea"
                                placeholder="What did you like or dislike about this product?"
                                value={review}
                                onChange={(e) =>
                                    setReview(e.target.value)
                                }
                            />

                            <div className="review-counter">

                                <span>

                                    Be honest and descriptive.

                                </span>

                                <span>

                                    {review.length}/1000

                                </span>

                            </div>

                        </div>
                        {/* Photo Upload */}
                        <div className="review-photo-upload">

                            <label className="review-label">

                                Add Photo

                            </label>

                            {!previewImage ? (

                                <label
                                    className={`review-upload-box ${dragging ? "dragging" : ""
                                        }`}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragging(true);
                                    }}
                                    onDragLeave={() =>
                                        setDragging(false)
                                    }
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDragging(false);
                                        handleImage(
                                            e.dataTransfer.files[0]
                                        );
                                    }}
                                >


                                    <i className="bi bi-cloud-arrow-up review-upload-icon"></i>

                                    <h5>

                                        Drag & Drop your photo

                                    </h5>

                                    <p>

                                        or click to browse your device

                                    </p>

                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImage(
                                                e.target.files[0]
                                            )
                                        }
                                    />

                                </label>


                            ) : (

                                <div className="review-image-preview">

                                    <img
                                        src={previewImage}
                                        alt="Review Preview"
                                        className="review-preview-image"
                                    />

                                    <label className="app-btn-secondary">

                                        <i className="bi bi-arrow-repeat me-2"></i>

                                        Change Photo

                                        <input
                                            hidden
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleImage(
                                                    e.target.files[0]
                                                )
                                            }
                                        />

                                    </label>

                                </div>


                            )}
                        </div>

                        {/* Submit */}

                        <div className="review-submit">

                            <button
                                className="app-btn-primary review-btn"
                                onClick={handleSubmit}
                                disabled={saving}
                            >

                                {saving
                                    ? "Submitting..."
                                    : existingReview
                                        ? "Update Review"
                                        : "Submit Review"}

                            </button>

                        </div>

                    </section>

                </div>

            </div>

        </div>

    );
}