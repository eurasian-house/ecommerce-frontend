import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import confetti from "canvas-confetti";

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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-5">
        <h4>No order found</h4>
        <button
          className="btn btn-primary mt-3"
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
    <div
      className="d-flex align-items-center justify-content-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #faf8f5 0%, #ffffff 100%)",
        padding: "20px",
      }}
    >
      <div
        className="text-center shadow-sm"
        style={{
          maxWidth: "650px",
          width: "100%",
          background: "#fff",
          borderRadius: "28px",
          padding: "48px 36px",
          border: "1px solid #ece8e2",
        }}
      >
        {/* Success Icon */}
        <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#eef9f1",
            color: "#2e7d32",
            fontSize: "2.8rem",
          }}
        >
          ✓
        </div>

        {/* Heading */}
        <span
          className="text-uppercase"
          style={{
            fontSize: ".75rem",
            letterSpacing: "2px",
            color: "#8b7355",
            fontWeight: 600,
          }}
        >
          Order Confirmed
        </span>

        <h2 className="fw-bold mt-2 mb-3">
          Thank You for Your Purchase
        </h2>

        <p
          className="text-muted mx-auto mb-4"
          style={{ maxWidth: "480px" }}
        >
          Your payment has been successfully received. Our artisans will begin
          preparing your handcrafted rug shortly. You'll receive email updates as
          your order progresses.
        </p>

        {/* Order Details */}
        <div
          className="text-start"
          style={{
            background: "#faf8f5",
            borderRadius: "20px",
            padding: "24px",
          }}
        >
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Order ID</span>
            <strong>{order.id}</strong>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Payment Method</span>
            <strong>{paymentMethod}</strong>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Payment Reference</span>
            <strong title={paymentReference}>
              {paymentReference
                ? `${paymentReference.slice(0, 12)}...`
                : "-"}
            </strong>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted">Total Paid</span>
            <strong>${order.total_amount}</strong>
          </div>

          <div className="d-flex justify-content-between">
            <span className="text-muted">Order Date</span>
            <strong>
              {new Date(order.created_at).toLocaleString()}
            </strong>
          </div>
        </div>

        {/* Information */}
        <div
          className="mt-4 p-3"
          style={{
            background: "#fffaf2",
            border: "1px solid #f0e4c3",
            borderRadius: "16px",
          }}
        >
          <small className="text-muted">
            We will send you email notifications or whatsapp updates as your order moves through
            processing, manufacturing, shipping, and delivery. You can also track
            your order anytime from your account.
          </small>
        </div>

        {/* Buttons */}
        <div className="row g-3 mt-4">
          <div className="col-md-6">
            <button
              className="btn btn-outline-dark w-100 py-3"
              style={{
                borderRadius: "999px",
                fontWeight: 600,
              }}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>

          <div className="col-md-6">
            <button
              className="btn btn-dark w-100 py-3"
              style={{
                borderRadius: "999px",
                fontWeight: 600,
              }}
              onClick={() => navigate("/account")}
            >
              Track My Order
            </button>
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-muted small mt-4 mb-0"
          style={{ lineHeight: 1.7 }}
        >
          Thank you for choosing <strong>Eurasian House</strong>. Every rug is
          handcrafted with care, preserving generations of artisanal excellence
          from Bhadohi, India.
        </p>
      </div>
    </div>
  );
}