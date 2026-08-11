import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import confetti from "canvas-confetti";
import "../styles/pages/OrderSuccess.css";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;

        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!order) fetchLatestOrder();
  }, []);


  useEffect(() => {
    if (!order) return;

    const duration = 2500;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [order]);

  if (loading) {
    return (
      <div className="order-loading">

        <div className="spinner-border" role="status"></div>

        <p className="mt-3">
          Loading your order...
        </p>

      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-empty">

        <div className="order-empty-icon">
          <i className="bi bi-bag-x"></i>
        </div>

        <h2>
          No Order Found
        </h2>

        <p>
          We couldn't find a recent order associated with your account.
        </p>

        <button
          className="app-btn-primary"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>

      </div>
    );
  }

  const paymentReference =
    order.razorpay_payment_id || order.paypal_payment_id;

  const paymentMethod = order.razorpay_payment_id
    ? "Razorpay"
    : order.paypal_payment_id
      ? "PayPal"
      : "-";

  return (

    <div className="order-success-page">

      <div className="container">

        <div className="order-success-card">

          {/* Success Icon */}

          <div className="order-success-icon">

            <i className="bi bi-check-lg"></i>

          </div>

          {/* Header */}

          <span className="order-success-subtitle">
            ORDER CONFIRMED
          </span>

          <h1 className="order-success-title">
            Thank You For Your Purchase
          </h1>

          <p className="order-success-description">
            Your payment has been successfully received.
            Our artisans will begin preparing your handcrafted rug shortly.
            You'll receive email and WhatsApp updates as your order progresses.
          </p>

          {/* Details */}

          <section className="order-details">

            <div className="order-detail-row">

              <span>
                Order ID
              </span>

              <strong>
                {order.id}
              </strong>

            </div>

            <div className="order-detail-row">

              <span>
                Payment Method
              </span>

              <strong>
                {paymentMethod}
              </strong>

            </div>

            <div className="order-detail-row">

              <span>
                Payment Reference
              </span>

              <strong
                className="payment-reference"
                title={paymentReference}
              >
                {paymentReference || "-"}
              </strong>

            </div>

            <div className="order-detail-row">

              <span>
                Total Paid
              </span>

              <strong>
                ${order.total_amount}
              </strong>

            </div>

            <div className="order-detail-row">

              <span>
                Order Date
              </span>

              <strong>
                {new Date(order.created_at).toLocaleString()}
              </strong>

            </div>

          </section>

          {/* Timeline */}

          <section className="order-next-steps">

            <h5>
              What Happens Next?
            </h5>

            <div className="order-step">

              <i className="bi bi-check-circle-fill"></i>

              <span>
                Order Confirmed
              </span>

            </div>

            <div className="order-step">

              <i className="bi bi-hammer"></i>

              <span>
                Manufacturing
              </span>

            </div>

            <div className="order-step">

              <i className="bi bi-box-seam"></i>

              <span>
                Shipping
              </span>

            </div>

            <div className="order-step">

              <i className="bi bi-house-check"></i>

              <span>
                Delivered
              </span>

            </div>

          </section>

          {/* Note */}

          <div className="order-note">

            <i className="bi bi-info-circle"></i>

            <p>
              We'll keep you updated by email and WhatsApp throughout every stage of your order.
              You can also monitor your order status anytime from your account.
            </p>

          </div>

          {/* Buttons */}

          <div className="order-actions">

            <button
              className="app-btn-secondary"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

            <button
              className="app-btn-primary"
              onClick={() => navigate("/account")}
            >
              Track My Order
            </button>

          </div>

          {/* Footer */}

          <p className="order-footer">

            Thank you for choosing
            <strong> Eurasian House</strong>.
            Every rug is handcrafted with care,
            preserving generations of artisanal excellence from
            Bhadohi, India.

          </p>

        </div>

      </div>

    </div>

  );
}