import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { createOrder } from "../utils/createOrder";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
// console.log("API:", import.meta.env.VITE_API_URL);

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    city: "",
    pincode: "",
  });

  const [phone, setPhone] = useState("");

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
        .select("full_name, city, pincode, phone")
        .eq("id", user.id)
        .single();

      if (data) {
        setAddress({
          fullName: data.full_name || "",
          city: data.city || "",
          pincode: data.pincode || "",
        });

        setPhone(data.phone || "");
      }
    };

    loadUserData();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
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
    if (!address.fullName || !address.city || !address.pincode || !phone) {
      alert("Please fill all details");
      return;
    }

    setLoading(true);

    try {
      // ✅ Step 1: create DB order
      const orderRes = await createOrder(cart, address, phone);

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
        key: "rzp_test_SVl3kWM1svimZk",
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
          name: address.fullName,
          contact: phone,
        },

        theme: {
          color: "#000000",
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Refresh page.");
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

      <input
        className="form-control mb-3"
        placeholder="Full Name"
        value={address.fullName}
        onChange={(e) =>
          setAddress({ ...address, fullName: e.target.value })
        }
      />

      <input
        className="form-control mb-3"
        placeholder="City"
        value={address.city}
        onChange={(e) =>
          setAddress({ ...address, city: e.target.value })
        }
      />

      <input
        className="form-control mb-3"
        placeholder="Pincode"
        value={address.pincode}
        onChange={(e) =>
          setAddress({ ...address, pincode: e.target.value })
        }
      />

      <input
        className="form-control mb-3"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <h5 className="mt-4">Total: ₹{total}</h5>

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