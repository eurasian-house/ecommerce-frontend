// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// export default function OrderSuccess() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [order, setOrder] = useState(location.state?.order || null);
//   const [loading, setLoading] = useState(!location.state?.order);

//   useEffect(() => {
//     // If page refreshed → fetch latest order
//     const fetchLatestOrder = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("orders")
//           .select("*")
//           .order("created_at", { ascending: false })
//           .limit(1)
//           .single();

//         if (error) throw error;

//         setOrder(data);
//       } catch (err) {
//         console.error("Error fetching order:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!order) fetchLatestOrder();
//   }, [order]);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="text-center mt-5">
//         <h4>No order found</h4>
//         <button
//           className="btn btn-primary mt-3"
//           onClick={() => navigate("/")}
//         >
//           Go Home
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div
//         className="card shadow p-4 text-center"
//         style={{ maxWidth: "450px", width: "100%", borderRadius: "16px" }}
//       >
//         <h2 className="mb-3">Payment Successful 🎉</h2>

//         <hr />

//         <p><strong>Order ID:</strong> {order.id}</p>
//         <p><strong>Payment ID:</strong> {order.payment_id}</p>
//         <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>
//         <p>
//           <strong>Date & Time:</strong>{" "}
//           {new Date(order.created_at).toLocaleString()}
//         </p>

//         <div className="d-flex justify-content-between mt-4">
//           <button
//             className="btn btn-outline-primary"
//             onClick={() => navigate("/")}
//           >
//             Continue Shopping
//           </button>

//           <button
//             className="btn btn-primary"
//             onClick={() => navigate("/account")}
//           >
//             View Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

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

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4 text-center"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "16px" }}
      >
        <h2 className="mb-3">Payment Successful 🎉</h2>

        <hr />

        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Payment ID:</strong> {order.payment_id}</p>
        <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>
        <p>
          <strong>Date & Time:</strong>{" "}
          {new Date(order.created_at).toLocaleString()}
        </p>

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/account")}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}