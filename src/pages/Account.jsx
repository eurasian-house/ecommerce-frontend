import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { lookupAddress } from "../lib/addressLookup";
import { countries } from "../lib/countries";
import { toast } from "react-toastify";
import FormInput from "../components/forms/FormInput";
import FormField from "../components/forms/FormField";
import FormSelect from "../components/forms/FormSelect";
import "../styles/account.css";
import {
  validateName,
  validatePhone,
  validateAddress,
  validateCountry,
  validatePostalCode,
  validateCity,
  validateState,
} from "../lib/validation";


export default function Account() {
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [visibleOrders, setVisibleOrders] = useState(10);

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
          .select(`
    *,
    order_items (
      production_days
    )
  `)
          .eq("user_id", user.id)
          .neq("status", "pending")
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

  const validators = {
    full_name: validateName,
    phone: validatePhone,
    address: validateAddress,
    country: validateCountry,
    pincode: validatePostalCode,
    city: validateCity,
    state: validateState,
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (validators[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validators[field](value),
      }));
    }
  };

  const handlePostalLookup = async () => {
    if (!profile?.country || !profile?.pincode) return;

    const result = await lookupAddress(
      profile.country,
      profile.pincode
    );

    if (!result) return;

    setProfile((prev) => ({
      ...prev,
      city: result.city,
      state: result.state,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      full_name: validateName(profile.full_name || ""),
      phone: validatePhone(profile.phone || ""),
      address: validateAddress(profile.address || ""),
      country: validateCountry(profile.country || ""),
      pincode: validatePostalCode(profile.pincode || ""),
      city: validateCity(profile.city || ""),
      state: validateState(profile.state || ""),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please correct the highlighted fields.");
      return;
    }
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
      toast.success("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Unable to update your profile. Please try again.");
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

            <FormInput
              label="Name"
              id="full_name"
              value={profile?.full_name || ""}
              disabled={!editMode}
              error={errors.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
            />

            <FormField label="Email" htmlFor="email">
              <input
                className="form-control"
                id="email"
                value={userEmail}
                disabled
              />
            </FormField>

            <FormInput
              label="Phone"
              id="phone"
              value={profile?.phone || ""}
              disabled={!editMode}
              error={errors.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />

            <FormSelect
              label="Country"
              id="country"
              value={profile?.country || ""}
              disabled={!editMode}
              error={errors.country}
              onChange={(e) => handleChange("country", e.target.value)}
            >
              <option value="">Select Country</option>

              {countries.map((country, index) =>
                country.value === "" ? (
                  <option key={`divider-${index}`} disabled>
                    {country.label}
                  </option>
                ) : (
                  <option
                    key={country.value}
                    value={country.label}
                  >
                    {country.label}
                  </option>
                )
              )}
            </FormSelect>

            <FormInput
              label="Pincode"
              id="pincode"
              value={profile?.pincode || ""}
              disabled={!editMode}
              error={errors.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
              onBlur={handlePostalLookup}
            />

            <FormInput
              label="Address"
              id="address"
              value={profile?.address || ""}
              disabled={!editMode}
              error={errors.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />

            <FormInput
              label="City"
              id="city"
              value={profile?.city || ""}
              disabled={!editMode}
              error={errors.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />

            <FormInput
              label="State"
              id="state"
              value={profile?.state || ""}
              disabled={!editMode}
              error={errors.state}
              onChange={(e) => handleChange("state", e.target.value)}
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

              {orders.slice(0, visibleOrders).map((order) => {

                const maxProductionDays = Math.max(
                  ...(order.order_items?.map(item => item.production_days || 0) || [0])
                );

                const expectedDelivery = new Date(order.created_at);
                expectedDelivery.setDate(
                  expectedDelivery.getDate() + maxProductionDays + 7
                );

                return (

                  <div
                    key={order.id}
                    className="card border-0 shadow-sm rounded-4 p-4 account-order-card"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/account/orders/${order.id}`)}
                  >

                    <div className="d-flex justify-content-between align-items-start">

                      <div className="flex-grow-1">

                        <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">

                          <h6 className="fw-bold mb-0">
                            Order #{order.id.slice(0, 8)}
                          </h6>

                          <span className={`order-status-badge status-${order.status}`}>
                            {order.status || "pending"}
                          </span>

                        </div>

                        <div className="text-muted small mb-1">
                          <i className="bi bi-calendar3 me-1"></i>
                          Ordered On:
                          <strong className="ms-1">
                            {new Date(order.created_at).toLocaleDateString()}
                          </strong>
                        </div>

                        <div className="text-muted small">
                          <i className="bi bi-truck me-1"></i>
                          Expected Delivery:
                          <strong className="ms-1">
                            {expectedDelivery.toLocaleDateString()}
                          </strong>
                        </div>

                      </div>

                      <div className="text-end ms-4">

                        <h5 className="fw-bold text-success mb-1">
                          ${order.total_amount}
                        </h5>

                        <i className="bi bi-chevron-right text-secondary fs-5"></i>

                      </div>

                    </div>

                  </div>

                );
              })}
              {visibleOrders < orders.length && (
                <div className="text-center mt-4">
                  <button
                    className="btn btn-outline-dark px-4 rounded-pill"
                    onClick={() => setVisibleOrders((prev) => prev + 10)}
                  >
                    Show More Orders
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}