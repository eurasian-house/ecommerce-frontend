import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { createOrder } from "../utils/createOrder";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { loadRazorpay } from "../utils/loadRazorpay";
import { trackBeginCheckout, trackPurchase } from "../lib/analytics";

export default function Checkout() {
  console.log("NEW BUILD LOADED");
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("paypal");


  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login", { state: { from: "/checkout" } });
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, city, pincode, phone, address, state, country")
        .eq("id", user.id)
        .single();

      if (data) {

        setForm({
          name: data.full_name || "",
          email: user.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          pincode: data.pincode || "",
        });
      }
    };

    loadUserData();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + (item.price || item.selling_price) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>Your cart is empty</h4>
      </div>
    );
  }

  const handleRazorpay = async (orderId) => {
    // ✅ Step 2: create Razorpay order
    const res = await fetch(`${import.meta.env.VITE_API_URL}/create-razorpay-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(total),
        orderId,
      }),
    });

    if (!res.ok) {
      alert("Backend error (Razorpay order failed)");
      setLoading(false);
      return;
    }

    const razorpayOrder = await res.json();

    if (!razorpayOrder.id) {
      alert("Invalid Razorpay order");
      setLoading(false);
      return;
    }

    // ✅ Step 3: open Razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: razorpayOrder.amount,
      currency: "USD",
      order_id: razorpayOrder.id,

      handler: async function (response) {
        try {
          const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: razorpayOrder.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok || !verifyData.success) {
            alert("Payment verification failed");
            setLoading(false);
            return;
          }

          // Send GA4 purchase event BEFORE clearing the cart
          trackPurchase(orderId, cart);

          clearCart();

          navigate("/order-success", {
            state: { orderId },
          });

        } catch (err) {
          alert("Payment verification error");
          setLoading(false);
        }
      },

      prefill: {
        name: form.name,
        contact: form.phone,
        email: form.email,
      },

      theme: {
        color: "#000000",
      },
    };

    // ✅ Load Razorpay SDK only when needed
    const razorpayLoaded = await loadRazorpay();

    if (!razorpayLoaded) {
      alert("Failed to load Razorpay. Please try again.");
      setLoading(false);
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function () {
      setLoading(false);
    });
    rzp.open();

  };


  const handlePlaceOrder = async () => {
    trackBeginCheckout(cart);
    // console.log("Payment Method:", paymentMethod);
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.country ||
      !form.pincode
    ) {
      alert("Please fill all details");
      return;
    }

    setLoading(true);

    try {
      // Create DB order
      const orderRes = await createOrder(cart, form);

      if (!orderRes.success) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const orderId = orderRes.orderId;

      if (paymentMethod === "razorpay") {
        await handleRazorpay(orderId);
      } else {
        navigate("/checkout/paypal", {
          state: {
            orderId,
            amount: total,
            form,
          },
        });
      }

    } catch (err) {
      console.error(err);
      alert("Error processing payment");
      setLoading(false);
    }
  };
  return (
    <div className="container py-5">
      <div
        className="mx-auto shadow-sm"
        style={{
          maxWidth: "720px",
          background: "#fff",
          borderRadius: "24px",
          padding: "2rem",
          border: "1px solid #ece8e2",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <span
            className="text-uppercase"
            style={{
              fontSize: ".75rem",
              letterSpacing: "2px",
              color: "#8b7355",
              fontWeight: 600,
            }}
          >
            Secure Checkout
          </span>

          <h2 className="fw-bold mt-2 mb-2">
            Complete Your Order
          </h2>

          <p className="text-muted mb-0">
            You're just one step away from bringing handcrafted luxury into your home.
          </p>
        </div>

        {/* Shipping */}
        <div
          className="mb-4"
          style={{
            background: "#faf8f5",
            borderRadius: "18px",
            padding: "20px",
          }}
        >
          <h5 className="fw-semibold mb-3">
            Shipping Information
          </h5>

          <p className="text-muted small mb-0">
            Save time on future purchases by completing your{" "}
            <Link
              to="/account"
              className="fw-semibold text-decoration-none"
            >
              account profile
            </Link>
            . Your contact and shipping information will be filled in
            automatically during checkout.
          </p>
        </div>

        {/* Form */}
        <div className="row g-3">

          <div className="col-12">
            <input
              className="form-control"
              placeholder="Full Name"
              id="full_name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Email Address"
              id="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Phone Number"
              id="phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <input
              className="form-control"
              placeholder="Street Address"
              id="address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="City"
              id="city"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="State / Province"
              id="state"
              value={form.state}
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Country"
              id="country"
              value={form.country}
              onChange={(e) =>
                setForm({ ...form, country: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Postal / ZIP Code"
              id="pincode"
              value={form.pincode}
              onChange={(e) =>
                setForm({ ...form, pincode: e.target.value })
              }
            />
          </div>

        </div>

        {/* Payment Method */}
        <div
          className="mt-4"
          style={{
            background: "#faf8f5",
            borderRadius: "18px",
            padding: "20px",
          }}
        >
          <h5 className="fw-semibold mb-3">
            Payment Method
          </h5>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
            />

            <label
              className="form-check-label"
              htmlFor="paypal"
            >
              PayPal
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              id="razorpay"
              checked={paymentMethod === "razorpay"}
              onChange={() => setPaymentMethod("razorpay")}
            />

            <label
              className="form-check-label"
              htmlFor="razorpay"
            >
              Razorpay (Cards, UPI, Net Banking)
            </label>
          </div>

        </div>

        {/* Order Summary */}
        <div
          className="mt-4"
          style={{
            background: "#faf8f5",
            borderRadius: "18px",
            padding: "20px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold">
              Order Total
            </span>

            <h4 className="fw-bold mb-0">
              ${total}
            </h4>
          </div>

          <p className="text-muted small mb-0">
            Payments are securely processed. Opening the payment gateway may
            take up to one minute. Please do not refresh or close your browser
            while your secure payment session is being prepared.
          </p>
        </div>

        {/* Button */}
        <button
          className="btn btn-dark w-100 mt-4 py-3 fw-semibold"
          style={{
            borderRadius: "999px",
            fontSize: "1.05rem",
            letterSpacing: ".5px",
          }}
          onClick={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? "Processing Secure Payment..." : "Proceed to Secure Payment"}
        </button>
      </div>
    </div>
  );
}