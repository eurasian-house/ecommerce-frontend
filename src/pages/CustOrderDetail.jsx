import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import { getReviewByOrderItem } from "../services/reviewService";
import "../styles/pages/CustOrderDetail.css";

const STATUS_FLOW = [
    "pending",
    "paid",
    "processed",
    "manufacturing",
    "manufactured",
    "shipped",
    "delivered",
];

const STATUS_LABELS = {
    pending: "Pending",
    paid: "Paid",
    processed: "Processed",
    manufacturing: "Manufacturing Started",
    manufactured: "Ready for Dispatch",
    shipped: "Shipped(Tracking Detail is shared with you)",
    delivered: "Delivered",
};

export default function CustOrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [animatedStep, setAnimatedStep] = useState(-1);
    const [lineProgress, setLineProgress] = useState({});
    const [reviews, setReviews] = useState({});


    useEffect(() => {
        fetchOrder();
    }, [id]);

    useEffect(() => {
        if (!order) return;

        const current = STATUS_FLOW.indexOf(order.status);

        let step = -1;

        const timer = setInterval(() => {
            step++;

            setAnimatedStep(step);

            if (step > 0) {
                // mark the connecting line for previous step as completed
                setLineProgress(prev => ({
                    ...prev,
                    [step - 1]: true,
                }));
            }

            if (step >= current) {
                clearInterval(timer);
            }
        }, 300); // shorter step with smoother CSS transition on the lines

        return () => clearInterval(timer);
    }, [order]);

    async function handleCompletePayment() {
        // Use the same Razorpay/payment function that your Checkout page uses.
    }

    async function fetchOrder() {
        try {
            setLoading(true);

            const data = await getOrderById(id);
            setOrder(data);

            const reviewMap = {};

            await Promise.all(
                (data.order_items || []).map(async (item) => {
                    const review = await getReviewByOrderItem(item.id);

                    if (review) {
                        reviewMap[item.id] = review;
                    }
                })
            );

            setReviews(reviewMap);

        } catch (err) {
            console.error("fetchOrder error:", err);
        } finally {
            setLoading(false);
        }
    }


    if (loading)
        return (
            <div className="container py-5 text-center">
                Loading...
            </div>
        );

    const currentIndex = STATUS_FLOW.indexOf(order.status); if (!order) {
        return (
            <div className="container py-5 text-center">
                Loading...
            </div>
        );
    }







    const shipping = order.order_items?.[0];


    

    const latestExpectedDelivery = order.order_items?.reduce((latest, item) => {
        const deliveryDate = new Date(order.created_at);

        deliveryDate.setDate(
            deliveryDate.getDate() + (item.production_days || 0) + 7
        );

        return deliveryDate > latest ? deliveryDate : latest;
    }, new Date(order.created_at));


    // return (
    //     <div className="container py-5">

    //         {/* Back */}

    //         <button
    //             className="btn btn-link text-decoration-none px-0 mb-4"
    //             onClick={() => navigate("/account")}
    //         >
    //             ← Back to My Orders
    //         </button>

    //         {/* Header */}

    //         <div className="card shadow border-0 rounded-4 mb-4">

    //             <div className="card-body p-4">

    //                 <div className="d-flex justify-content-between align-items-center flex-wrap">

    //                     <div>

    //                         <div className="d-flex align-items-center gap-2 mb-2">

    //                             <h3 className="fw-bold mb-0">
    //                                 Order #{order.id.slice(0, 8)}
    //                             </h3>

    //                             <span className={`order-status-badge status-${order.status}`}>
    //                                 {STATUS_LABELS[order.status]}
    //                             </span>

    //                         </div>

    //                         <div className="text-muted small">
    //                             Placed on {new Date(order.created_at).toLocaleDateString()}
    //                         </div>

    //                         <div className="text-muted small">Expected Delivery</div>
    //                         <div className="fw-semibold">
    //                             {latestExpectedDelivery.toLocaleDateString("en-US", {
    //                                 day: "numeric",
    //                                 month: "short",
    //                                 year: "numeric",
    //                             })}
    //                         </div>

    //                     </div>

    //                     <h5 className="text-success fw-bold">

    //                         ${order.total_amount}

    //                     </h5>

    //                 </div>

    //             </div>

    //         </div>

    //         <div className="row g-4">

    //             {/* Timeline */}

    //             <div className="col-lg-4">

    //                 <div className="card shadow border-0 rounded-4">

    //                     <div className="card-body">

    //                         <h5 className="fw-bold mb-4">
    //                             Order Status
    //                         </h5>

    //                         {STATUS_FLOW.map((status, index) => {

    //                             const isDelivered = order.status === "delivered";

    //                             const completed =
    //                                 index < animatedStep || (isDelivered && index === animatedStep);

    //                             const current =
    //                                 index === animatedStep && !isDelivered;


    //                             return (

    //                                 <div
    //                                     key={status}
    //                                     className="d-flex mb-3"
    //                                 >

    //                                     <div className="me-3 text-center">

    //                                         <div
    //                                             className={`status-dot ${completed
    //                                                 ? "completed"
    //                                                 : current
    //                                                     ? "current"
    //                                                     : "upcoming"
    //                                                 }`}
    //                                         >
    //                                             {completed ? "✓" : ""}
    //                                         </div>

    //                                         {index !== STATUS_FLOW.length - 1 && (
    //                                             <div
    //                                                 className={`status-line ${lineProgress[index] ? "completed" : ""
    //                                                     }`}
    //                                             />
    //                                         )}

    //                                     </div>

    //                                     <div
    //                                         className={
    //                                             completed
    //                                                 ? "timeline-completed"
    //                                                 : current
    //                                                     ? "timeline-active"
    //                                                     : "timeline-upcoming"
    //                                         }
    //                                     >

    //                                         <div className="timeline-title">

    //                                             {STATUS_LABELS[status]}

    //                                         </div>

    //                                         {current && (
    //                                             <small className="timeline-sub">
    //                                                 Current Status
    //                                             </small>
    //                                         )}

    //                                     </div>

    //                                 </div>

    //                             );

    //                         })}

    //                     </div>

    //                 </div>

    //             </div>

    //             {/* Products */}

    //             <div className="col-lg-8">

    //                 <div className="card shadow border-0 rounded-4">

    //                     <div className="card-body">

    //                         <h5 className="fw-bold mb-4">
    //                             Products
    //                         </h5>

    //                         {order.order_items?.map((item) => (

    //                             <div
    //                                 key={item.id}
    //                                 className="order-card d-flex gap-3 p-3 mb-3"
    //                             >

    //                                 <img
    //                                     src={item.products?.thumbnail}
    //                                     alt=""
    //                                     width={90}
    //                                     height={90}
    //                                     className="order-image"
    //                                     style={{
    //                                         objectFit: "cover",
    //                                     }}
    //                                 />

    //                                 <div className="flex-grow-1">

    //                                     <h6

    //                                         className="order-title"
    //                                         style={{ cursor: "pointer" }}
    //                                         onClick={() =>
    //                                             navigate(`/products/${item.products.slug}`, {
    //                                                 state: {
    //                                                     selectedColorId: item.color_id,
    //                                                     selectedSizeId: item.size_id,
    //                                                 },
    //                                             })
    //                                         }
    //                                     >
    //                                         {item.products?.title}
    //                                     </h6>

    //                                     <div className="mb-2">
    //                                         <span className="order-badge">Size: {item.size}</span>
    //                                         <span className="order-badge">Color: {item.color}</span>
    //                                         <span className="order-badge">Qty: {item.quantity}</span>
    //                                     </div>

    //                                     <div className="order-price">
    //                                         ${Math.round(Number(item.price))}
    //                                     </div>

    //                                     <div className="text-muted small mb-1">
    //                                         <i className="bi bi-truck me-1"></i>
    //                                         Expected delivery:{" "}
    //                                         {new Date(
    //                                             new Date(order.created_at).setDate(
    //                                                 new Date(order.created_at).getDate() +
    //                                                 (item.production_days || 0) +
    //                                                 7
    //                                             )
    //                                         ).toLocaleDateString("en-US", {
    //                                             day: "numeric",
    //                                             month: "short",
    //                                             year: "numeric",
    //                                         })}

    //                                         {order.status === "delivered" && (
    //                                             <div className="mt-3">

    //                                                 {reviews[item.id] ? (

    //                                                     <Link
    //                                                         to={`/write-review/${item.id}`}
    //                                                         className="btn btn-outline-dark btn-sm rounded-pill"
    //                                                     >
    //                                                         <i className="bi bi-pencil-square me-2"></i>
    //                                                         Edit Review
    //                                                     </Link>

    //                                                 ) : (

    //                                                     <Link
    //                                                         to={`/write-review/${item.id}`}
    //                                                         className="btn btn-dark btn-sm rounded-pill"
    //                                                     >
    //                                                         <i className="bi bi-star-fill me-2"></i>
    //                                                         Write Review
    //                                                     </Link>

    //                                                 )}

    //                                             </div>
    //                                         )}
    //                                     </div>

    //                                 </div>


    //                             </div>

    //                         ))}

    //                     </div>

    //                 </div>

    //                 {/* Shipping */}

    //                 <div className="card shadow border-0 rounded-4 mt-4">

    //                     <div className="card-body">

    //                         <h5 className="fw-bold mb-3">
    //                             Shipping Address
    //                         </h5>

    //                         <div className="address-item">
    //                             <i className="bi bi-person-fill me-2"></i>
    //                             {order.profiles?.full_name}
    //                         </div>

    //                         <div className="address-item">
    //                             <i className="bi bi-telephone-fill me-2"></i>
    //                             {order.profiles?.phone}
    //                         </div>

    //                         <div className="address-item">
    //                             <i className="bi bi-geo-alt-fill me-2"></i>

    //                             <div>
    //                                 <div>{order.profiles?.address}</div>

    //                                 <div>
    //                                     {order.profiles?.city}, {order.profiles?.state}
    //                                 </div>

    //                                 <div>{order.profiles?.pincode}</div>

    //                                 <div>{order.profiles?.country}</div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>

    //         </div>

    //         {/* Order Summary */}

    //         <div className="card shadow border-0 rounded-4 mt-4">
    //             <div className="card-body">

    //                 <h5 className="fw-bold mb-3">
    //                     Order Summary
    //                 </h5>

    //                 <div className="summary-row">
    //                     <span>Subtotal</span>
    //                     <span>${order.total_amount}</span>
    //                 </div>

    //                 <div className="summary-row">
    //                     <span>Shipping</span>
    //                     <span className="text-success">
    //                         Free
    //                     </span>
    //                 </div>

    //                 <div className="summary-divider" />

    //                 <div className="summary-total">
    //                     <span>Total</span>
    //                     <span>${order.total_amount}</span>
    //                 </div>

    //                 {order.status === "pending" && (
    //                     <div className="d-flex gap-2 mt-4">

    //                         <button
    //                             className="btn btn-outline-dark flex-fill"
    //                             onClick={() => navigate(`/checkout?order=${order.id}`)}
    //                         >
    //                             Edit Order
    //                         </button>

    //                         <button
    //                             className="btn btn-success flex-fill"
    //                             onClick={handleCompletePayment}
    //                         >
    //                             Complete Payment
    //                         </button>

    //                     </div>
    //                 )}

    //             </div>
    //         </div>

    //     </div>
    // );

    return (

        <div className="customer-order-page">

            <div className="container">

                {/* Back */}

                <button
                    className="customer-back-btn"
                    onClick={() => navigate("/account")}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to My Orders
                </button>

                {/* Header */}

                <section className="customer-order-header">

                    <div className="customer-order-header-content">

                        <div>

                            <div className="customer-order-title-row">

                                <h1 className="customer-order-title">

                                    Order #{order.id.slice(0, 8)}

                                </h1>

                                <span
                                    className={`customer-order-status status-${order.status}`}
                                >
                                    {STATUS_LABELS[order.status]}
                                </span>

                            </div>

                            <div className="customer-order-meta">

                                <div>

                                    <i className="bi bi-calendar3"></i>

                                    <span>

                                        Ordered on{" "}

                                        <strong>

                                            {new Date(order.created_at).toLocaleDateString()}

                                        </strong>

                                    </span>

                                </div>

                                <div>

                                    <i className="bi bi-truck"></i>

                                    <span>

                                        Expected Delivery{" "}

                                        <strong>

                                            {latestExpectedDelivery.toLocaleDateString(
                                                "en-US",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}

                                        </strong>

                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="customer-order-total">

                            ${order.total_amount}

                        </div>

                    </div>

                </section>

                <div className="row g-4">

                    {/* Timeline */}

                    <div className="col-lg-4">

                        <section className="customer-card">

                            <h3 className="customer-card-title">

                                Order Status

                            </h3>

                            <div className="customer-timeline" style={{position: 'relative'}}>
                                <div
                                    className="customer-timeline-track"
                                    style={{
                                        // progress is based on animatedStep so animation fills step by step
                                        "--progress": `${Math.max(0, Math.min(animatedStep, currentIndex)) / (STATUS_FLOW.length - 1) * 100}%`,
                                    }}
                                />

                                {STATUS_FLOW.map((status, index) => {

                                const isDelivered =
                                    order.status === "delivered";

                                const completed =
                                    index < animatedStep ||
                                    (isDelivered &&
                                        index === animatedStep);

                                const current =
                                    index === animatedStep &&
                                    !isDelivered;

                                return (

                                    <div
                                        key={status}
                                        className="customer-timeline-item"
                                    >

                                        <div className="customer-timeline-left">

                                            <div
                                                className={`customer-status-dot ${completed
                                                        ? "completed"
                                                        : current
                                                            ? "current"
                                                            : "upcoming"
                                                    }`}
                                            >

                                                {completed ? (
                                                    <i className="bi bi-check"></i>
                                                ) : null}

                                            </div>

                                            {index !==
                                                STATUS_FLOW.length - 1 && (

                                                    <div
                                                        className={`customer-status-line ${lineProgress[index]
                                                                ? "completed"
                                                                : ""
                                                            }`}
                                                    />

                                                )}

                                        </div>

                                        <div
                                            className={`customer-timeline-content ${completed
                                                    ? "completed"
                                                    : current
                                                        ? "current"
                                                        : ""
                                                }`}
                                        >

                                            <div className="customer-timeline-title">

                                                {STATUS_LABELS[status]}

                                            </div>

                                            {current && (

                                                <small>

                                                    Current Status

                                                </small>

                                            )}

                                        </div>

                                    </div>

                                );

                            })}

                            </div>

                        </section>

                    </div>

                    {/* Products */}

                    <div className="col-lg-8">

                        <section className="customer-card">

                            <h3 className="customer-card-title">

                                Products

                            </h3>
                            {order.order_items?.map((item) => (

                                <article
                                    key={item.id}
                                    className="customer-product-card"
                                >

                                    <img
                                        src={item.products?.thumbnail}
                                        alt={item.products?.title}
                                        className="customer-product-image"
                                    />

                                    <div className="customer-product-content">

                                        <h4
                                            className="customer-product-title"
                                            onClick={() =>
                                                navigate(
                                                    `/products/${item.products.slug}`,
                                                    {
                                                        state: {
                                                            selectedColorId:
                                                                item.color_id,
                                                            selectedSizeId:
                                                                item.size_id,
                                                        },
                                                    }
                                                )
                                            }
                                        >
                                            {item.products?.title}
                                        </h4>

                                        <div className="customer-product-badges">

                                            <span className="customer-badge">

                                                Size: {item.size}

                                            </span>

                                            <span className="customer-badge">

                                                Color: {item.color}

                                            </span>

                                            <span className="customer-badge">

                                                Qty: {item.quantity}

                                            </span>

                                        </div>

                                        <div className="customer-product-bottom">

                                            <div className="customer-product-price">

                                                ${Math.round(Number(item.price))}

                                            </div>

                                            <div className="customer-product-delivery">

                                                <i className="bi bi-truck me-1"></i>

                                                Expected delivery:

                                                <strong>

                                                    {new Date(
                                                        new Date(
                                                            order.created_at
                                                        ).setDate(
                                                            new Date(
                                                                order.created_at
                                                            ).getDate() +
                                                            (item.production_days ||
                                                                0) +
                                                            7
                                                        )
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}

                                                </strong>

                                            </div>

                                        </div>

                                        {order.status === "delivered" && (

                                            <div className="customer-review-action">

                                                {reviews[item.id] ? (

                                                    <Link
                                                        to={`/write-review/${item.id}`}
                                                        className="customer-badge"
                                                    >

                                                        <i className="bi bi-pencil-square me-2"></i>

                                                        Edit Review

                                                    </Link>

                                                ) : (

                                                    <Link
                                                        to={`/write-review/${item.id}`}
                                                        className="customer-badge"
                                                    >

                                                        <i className="bi bi-star-fill me-2"></i>

                                                        Write Review

                                                    </Link>

                                                )}

                                            </div>

                                        )}

                                    </div>

                                </article>

                            ))}

                        </section>

                        {/* Shipping */}

                        <section className="customer-card mt-4">

                            <h3 className="customer-card-title">

                                Shipping Address

                            </h3>

                            <div className="customer-address-list">

                                <div className="customer-address-item">

                                    <i className="bi bi-person-fill"></i>

                                    <span>

                                        {shipping?.customer_name}

                                    </span>

                                </div>

                                <div className="customer-address-item">

                                    <i className="bi bi-telephone-fill"></i>

                                    <span>

                                        {shipping?.phone}

                                    </span>

                                </div>

                                <div className="customer-address-item address-block">

                                    <i className="bi bi-geo-alt-fill"></i>

                                    <div>

                                        <div>

                                            {shipping?.address}

                                        </div>

                                        <div>

                                            {shipping?.city},{" "}

                                            {shipping?.state}

                                        </div>

                                        <div>

                                            {shipping?.pincode}

                                        </div>

                                        <div>

                                            {shipping?.country}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </section>

                    </div>

                </div>
                {/* Order Summary */}

                <section className="customer-card customer-summary-card mt-4">

                    <h3 className="customer-card-title">

                        Order Summary

                    </h3>

                    <div className="customer-summary-row">

                        <span>

                            Subtotal

                        </span>

                        <strong>

                            ${order.total_amount}

                        </strong>

                    </div>

                    <div className="customer-summary-row">

                        <span>

                            Shipping

                        </span>

                        <strong className="text-success">

                            Free

                        </strong>

                    </div>

                    <div className="customer-summary-divider"></div>

                    <div className="customer-summary-total">

                        <span>

                            Total

                        </span>

                        <strong>

                            ${order.total_amount}

                        </strong>

                    </div>

                    {order.status === "pending" && (

                        <div className="customer-summary-actions">

                            <button
                                className="app-btn-secondary"
                                onClick={() =>
                                    navigate(`/checkout?order=${order.id}`)
                                }
                            >

                                Edit Order

                            </button>

                            <button
                                className="app-btn-primary"
                                onClick={handleCompletePayment}
                            >

                                Complete Payment

                            </button>

                        </div>

                    )}

                </section>

            </div>

        </div>

    );
}
