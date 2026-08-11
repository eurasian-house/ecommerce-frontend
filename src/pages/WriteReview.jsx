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

    // return (
    //     <div className="container py-5" style={{ maxWidth: "760px" }}>

    //         <h2 className="fw-bold mb-1">
    //             {existingReview ? "Update Review" : "Write a Review"}
    //         </h2>

    //         <p className="text-muted mb-4">
    //             Share your experience to help other customers.
    //         </p>

    //         <div className="card shadow-sm border-0 rounded-4 p-3">

    //             <div className="d-flex gap-3 align-items-center">

    //                 <img
    //                     className="rounded-3"
    //                     src={item.products.thumbnail}
    //                     alt={item.products.title}
    //                     width={90}
    //                     height={90}
    //                     style={{
    //                         width: 90,
    //                         height: 90,
    //                         objectFit: "cover"
    //                     }}
    //                 />

    //                 <div>
    //                     <h5 className="fw-semibold mb-1">
    //                         {item.products.title}
    //                     </h5>
    //                     <div className="text-muted">
    //                         Size: {item.size} | Color: {item.color}
    //                     </div>
    //                     <div className="mt-2">
    //                         <span className="badge bg-success-subtle text-success">
    //                             <i className="bi bi-patch-check-fill me-1"></i>
    //                             Verified Purchase
    //                         </span>
    //                     </div>
    //                 </div>

    //             </div>

    //         </div>
    //         <div className="card shadow-sm border-0 rounded-4 p-4 mt-4">

    //             <h5 className="mb-4">Your Review</h5>

    //             <div className="mb-4">
    //                 <label className="form-label">Rating</label>

    //                 <div>
    //                     {[1, 2, 3, 4, 5].map((star) => (
    //                         <i
    //                             key={star}
    //                             className={`bi ${rating >= star
    //                                 ? "bi-star-fill review-star active"
    //                                 : "bi-star review-star"
    //                                 } fs-2 me-2`}
    //                             onClick={() => setRating(star)}
    //                         />
    //                     ))}
    //                 </div>
    //             </div>

    //             <div className="mb-4">
    //                 <label className="form-label">
    //                     Title
    //                 </label>

    //                 <input
    //                     className="form-control rounded-3 py-2"
    //                     maxLength={80}
    //                     value={title}
    //                     placeholder="Summarize your experience"
    //                     onChange={(e) => setTitle(e.target.value)}
    //                 />
    //             </div>

    //             <div className="mb-4">
    //                 <label className="form-label">
    //                     Review
    //                 </label>

    //                 <textarea
    //                     rows={5}
    //                     maxLength={1000}
    //                     className="form-control rounded-3"
    //                     placeholder="What did you like or dislike about this product?"
    //                     value={review}
    //                     onChange={(e) => setReview(e.target.value)}
    //                 />

    //                 <div className="d-flex justify-content-between small mt-2">

    //                     <span className="text-muted">
    //                         Be honest and descriptive.
    //                     </span>

    //                     <span className="text-muted">
    //                         {review.length}/1000
    //                     </span>

    //                 </div>
    //             </div>

    //             <div className="mb-4">

    //                 {!previewImage ? (

    //                     <label
    //                         className={`upload-box ${dragging ? "dragging" : ""}`}

    //                         onDragOver={(e) => {
    //                             e.preventDefault();
    //                             setDragging(true);
    //                         }}

    //                         onDragLeave={() => setDragging(false)}

    //                         onDrop={(e) => {
    //                             e.preventDefault();
    //                             setDragging(false);

    //                             handleImage(e.dataTransfer.files[0]);
    //                         }}
    //                     >

    //                         <i className="bi bi-cloud-arrow-up fs-1 mb-3"></i>

    //                         <h6 className="mb-1">
    //                             Drag & Drop your photo
    //                         </h6>

    //                         <small className="text-muted">
    //                             or click to browse
    //                         </small>

    //                         <input
    //                             hidden
    //                             type="file"
    //                             accept="image/*"
    //                             onChange={(e) => handleImage(e.target.files[0])}
    //                         />

    //                     </label>

    //                 ) : (

    //                     <div className="text-center">

    //                         <img
    //                             src={previewImage}
    //                             className="rounded-4 shadow-sm"
    //                             style={{
    //                                 width: 180,
    //                                 height: 180,
    //                                 objectFit: "cover"
    //                             }}
    //                         />

    //                         <div className="mt-3">

    //                             <label className="btn btn-outline-dark rounded-pill">

    //                                 Change Photo

    //                                 <input
    //                                     hidden
    //                                     type="file"
    //                                     accept="image/*"
    //                                     onChange={(e) => handleImage(e.target.files[0])}
    //                                 />

    //                             </label>

    //                         </div>

    //                     </div>

    //                 )}

    //             </div>

    //             <div className="text-center mt-4">
    //                 <button
    //                     className="btn btn-dark rounded-pill px-5 py-2"
    //                     onClick={handleSubmit}
    //                     disabled={saving}
    //                 >
    //                     {saving
    //                         ? "Submitting..."
    //                         : existingReview
    //                             ? "Update Review"
    //                             : "Submit Review"}
    //                 </button>
    //             </div>

    //         </div>

    //     </div>
    // );


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