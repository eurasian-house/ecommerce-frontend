import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { createOrder } from "../utils/createOrder";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { loadRazorpay } from "../utils/loadRazorpay";

export default function Checkout() {
  console.log("NEW BUILD LOADED");
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);


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

  const handlePlaceOrder = async () => {
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
      // ✅ Step 1: create DB order
      const orderRes = await createOrder(cart, form);

      if (!orderRes.success) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const orderId = orderRes.orderId;

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
        currency: "INR",
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
              return;
            }

            clearCart();

            navigate("/order-success", {
              state: { orderId },
            });

          } catch (err) {
            alert("Payment verification error");
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
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Error processing payment");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">Checkout</h3>

      <h5>Shipping Details</h5>

      <input className="form-control mb-3" placeholder="Full Name" id="full_name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input className="form-control mb-3" placeholder="Email" id="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input className="form-control mb-3" placeholder="Phone" id="phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <input className="form-control mb-3" placeholder="Address" id="address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <input className="form-control mb-3" placeholder="City" id="city"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />

      <input className="form-control mb-3" placeholder="State" id="state"
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      />

      <input className="form-control mb-3" placeholder="Country" id="country"
        value={form.country}
        onChange={(e) => setForm({ ...form, country: e.target.value })}
      />

      <input className="form-control mb-3" placeholder="Pincode" id="pincode"
        value={form.pincode}
        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
      />

      <h5 className="mt-4">Total: ${total}</h5>

      <button
        className="btn btn-dark w-100 mt-3"
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}