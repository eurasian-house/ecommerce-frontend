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
          address: profile.address,
          state: profile.state,
          country: profile.country,
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

            <label>Address</label>
            <input
              className="form-control mb-2"
              value={profile?.address || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <label>City</label>
            <input
              className="form-control mb-2"
              value={profile?.city || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            <label>State</label>
            <input
              className="form-control mb-2"
              value={profile?.state || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("state", e.target.value)}
            />
            <label>Country</label>
            <input
              className="form-control mb-2"
              value={profile?.country || ""}
              disabled={!editMode}
              onChange={(e) => handleChange("country", e.target.value)}
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
                    <small className="text-muted">
                      Order #{order.id.slice(0, 8)}
                    </small>

                    <span
                      className="badge"
                      style={{
                        backgroundColor:
                          order.status === "paid"
                            ? "#198754"
                            : order.status === "shipped"
                              ? "#ffc107"
                              : order.status === "delivered"
                                ? "#198754"
                                : "#dc3545",

                        color:
                          order.status === "shipped"
                            ? "#000"
                            : "#fff",

                        border:
                          order.status === "delivered"
                            ? "2px solid #0f5132"
                            : "none",
                      }}
                    >
                      {order.status || "pending"}
                    </span>
                  </div>

                  <p className="mb-1">
                    <strong>Payment ID:</strong> {order.payment_id || "N/A"}
                  </p>

                  <p className="mb-1">
                    <strong>Amount:</strong> ${order.total_amount}
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