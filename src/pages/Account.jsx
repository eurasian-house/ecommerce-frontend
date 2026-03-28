// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../lib/supabase";

// export default function Account() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [success, setSuccess] = useState("");

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   useEffect(() => {
//     const getUser = async () => {
//       const { data } = await supabase.auth.getUser();

//       if (!data?.user) {
//         navigate("/login");
//         return;
//       }

//       setUser(data.user);
//       setForm((prev) => ({ ...prev, email: data.user.email }));

//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", data.user.id)
//         .single();

//       if (profile) {
//         setForm({
//           full_name: profile.full_name || "",
//           email: data.user.email,
//           phone: profile.phone || "",
//           address: profile.address || "",
//           city: profile.city || "",
//           state: profile.state || "",
//           pincode: profile.pincode || "",
//         });
//       }

//       setLoading(false);
//     };

//     getUser();
//   }, [navigate]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     setSuccess("");

//     const { error } = await supabase.from("profiles").upsert({
//       id: user.id,
//       full_name: form.full_name,
//       phone: form.phone,
//       address: form.address,
//       city: form.city,
//       state: form.state,
//       pincode: form.pincode,
//     });

//     if (!error) {
//       setSuccess("Profile updated successfully");
//     }

//     setSaving(false);
//   };

//   if (loading) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }

//   return (
//     <div className="container mt-5" style={{ maxWidth: "600px" }}>
//       <h3 className="mb-4">Account Profile</h3>

//       <div className="mb-3">
//         <label className="form-label">Full Name</label>
//         <input
//           type="text"
//           className="form-control"
//           name="full_name"
//           value={form.full_name}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Email</label>
//         <input
//           type="email"
//           className="form-control"
//           value={form.email}
//           disabled
//         />
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Phone</label>
//         <input
//           type="text"
//           className="form-control"
//           name="phone"
//           value={form.phone}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Address</label>
//         <textarea
//           className="form-control"
//           name="address"
//           value={form.address}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="row">
//         <div className="col-md-6 mb-3">
//           <label className="form-label">City</label>
//           <input
//             type="text"
//             className="form-control"
//             name="city"
//             value={form.city}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="col-md-6 mb-3">
//           <label className="form-label">State</label>
//           <input
//             type="text"
//             className="form-control"
//             name="state"
//             value={form.state}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Pincode</label>
//         <input
//           type="text"
//           className="form-control"
//           name="pincode"
//           value={form.pincode}
//           onChange={handleChange}
//         />
//       </div>

//       <button
//         className="btn btn-primary w-100"
//         onClick={handleSave}
//         disabled={saving}
//       >
//         {saving ? "Saving..." : "Save Changes"}
//       </button>

//       {success && (
//         <div className="alert alert-success mt-3">{success}</div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Account() {
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserEmail(user.email);

        if (!user) return;

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(profileData);

        const { data: orderData, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setOrders(orderData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          city: profile.city,
          pincode: profile.pincode,
        })
        .eq("id", profile.id);

      if (error) throw error;

      setEditMode(false);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">

        {/* LEFT PROFILE */}
        <div className="col-md-4">
          <div
            className="card p-3 shadow-sm"
            style={{ position: "sticky", top: "100px" }}
          >
            <div className="d-flex justify-content-between mb-3">
              <h5>Account Profile</h5>

              {!editMode ? (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleSave}
                >
                  Save
                </button>
              )}
            </div>

            <label>Name</label>
            <input
              className="form-control mb-2"
              value={profile?.full_name || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("full_name", e.target.value)}
            />

            <label>Email</label>
            <input
              className="form-control mb-2"
              value={userEmail}
              disabled
            />

            <label>Phone</label>
            <input
              className="form-control mb-2"
              value={profile?.phone || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("phone", e.target.value)}
            />

            <label>City</label>
            <input
              className="form-control mb-2"
              value={profile?.city || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("city", e.target.value)}
            />

            <label>Pincode</label>
            <input
              className="form-control"
              value={profile?.pincode || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("pincode", e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT ORDERS */}
        <div className="col-md-8">
          <h4 className="mb-3">My Orders</h4>

          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {orders.map((order) => (
                <div key={order.id} className="card p-3 shadow-sm">

                  <div className="d-flex justify-content-between">
                    <strong>Order ID: {order.id}</strong>

                    <span
                      className="badge"
                      style={{
                        backgroundColor:
                          order.status === "paid" ? "green" : "orange",
                      }}
                    >
                      {order.status || "pending"}
                    </span>
                  </div>

                  <p className="mb-1">
                    <strong>Payment ID:</strong> {order.payment_id || "N/A"}
                  </p>

                  <p className="mb-1">
                    <strong>Amount:</strong> ₹{order.total_amount}
                  </p>

                  <p className="mb-0">
                    <strong>Date:</strong>{" "}
                    {new Date(order.created_at).toLocaleString()}
                  </p>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}