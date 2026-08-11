import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { lookupAddress } from "../lib/addressLookup";
import { countries } from "../lib/countries";
import { toast } from "react-toastify";
import FormInput from "../components/forms/FormInput";
import FormField from "../components/forms/FormField";
import FormSelect from "../components/forms/FormSelect";
import { compressImage, IMAGE_RULES } from "../utils/imageCompression";
import { uploadCustomerImage } from "../lib/customerCloudinary";
import UserAvatar from "../components/common/UserAvatar";
import { getAvatar } from "../utils/getAvatar";
import "../styles/pages/Account.css";
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
  const [originalProfile, setOriginalProfile] = useState(null);
  const navigate = useNavigate();
  const [visibleOrders, setVisibleOrders] = useState(10);
  const [saving, setSaving] = useState(false);

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
    setSaving(true);
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

      // Update reviewer name in all previous reviews
      const { error: reviewNameError } = await supabase
        .from("product_reviews")
        .update({
          reviewer_name: profile.full_name,
        })
        .eq("user_id", profile.id);

      if (reviewNameError) {
        console.error("Review name update failed:", reviewNameError);
      }

      // Update QnA name in all previous questions
      const { error: questionNameError } = await supabase
        .from("product_questions")
        .update({
          customer_name: profile.full_name,
        })
        .eq("user_id", profile.id);

      if (questionNameError) {
        console.error("Question name update failed:", questionNameError);
      }


      setEditMode(false);
      toast.success("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Unable to update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };


  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, IMAGE_RULES.avatar);

      const avatarUrl = await uploadCustomerImage(
        compressed,
        "avatars"
      );

      const { data, error } = await supabase
        .from("profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", profile.id)
        .select();

      if (error) throw error;

      // Keep all previous reviews in sync
      const { error: reviewAvatarError } = await supabase
        .from("product_reviews")
        .update({
          reviewer_avatar: avatarUrl,
        })
        .eq("user_id", profile.id);

      if (reviewAvatarError) {
        console.error("Review avatar update failed:", reviewAvatarError);
      }

      // Keep all previous questions in sync
      const { error: questionAvatarError } = await supabase
        .from("product_questions")
        .update({
          customer_avatar: avatarUrl,
        })
        .eq("user_id", profile.id);

      if (questionAvatarError) {
        console.error("Question avatar update failed:", questionAvatarError);
      }

      setProfile((prev) => ({
        ...prev,
        avatar_url: avatarUrl,
      }));



      toast.success("Avatar updated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload avatar.");
    }
  };



  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="account-page">

      <div className="container">

        <div className="row g-3">

          {/* LEFT PROFILE */}

          <div className="col-xl-4 col-lg-5 m-0">

            <div className="account-card account-profile-card">

              <div className="account-profile-header">

                <div className="account-profile-actions">

                  {!editMode ? (

                    <button
                      className="app-btn-secondary account-edit-btn"
                      onClick={() => {
                        setOriginalProfile({ ...profile });
                        setEditMode(true);
                      }}
                    >
                      <i className="bi bi-pencil me-2"></i>
                      Edit Profile
                    </button>

                  ) : (

                    <div className="account-edit-actions">

                      <button
                        className="app-btn-primary"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-lg me-2"></i>
                            Save
                          </>
                        )}
                      </button>

                      <button
                        className="app-btn-secondary"
                        onClick={() => {
                          setProfile(originalProfile);
                          setEditMode(false);
                        }}
                      >
                        <i className="bi bi-x-lg me-2"></i>
                        Cancel
                      </button>

                    </div>

                  )}

                </div>

                <div className="account-avatar-wrapper">

                  <div className="account-avatar-circle">

                    <UserAvatar
                      src={getAvatar(profile)}
                      alt={profile.full_name}
                      size={64}
                    />

                  </div>

                  <h4 className="account-name">

                    {profile.full_name || "Your Name"}

                  </h4>

                  <p className="account-subtitle">

                    Manage your account information

                  </p>

                  <label className="account-photo-btn">

                    <i className="bi bi-camera me-2"></i>

                    Change Photo

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleAvatarUpload}
                    />

                  </label>

                </div>

                <div className="account-divider"></div>

              </div>

              <div className="row g-2">

                <div className="col-12">

                  <FormInput
                    label="Name"
                    id="full_name"
                    value={profile?.full_name || ""}
                    disabled={!editMode}
                    error={errors.full_name}
                    onChange={(e) =>
                      handleChange("full_name", e.target.value)
                    }
                  />

                </div>

                <div className="col-12">

                  <FormField
                    label="Email"
                    htmlFor="email"
                  >

                    <div className="account-email-display">

                      <i className="bi bi-envelope me-2"></i>

                      {userEmail}

                    </div>

                  </FormField>

                </div>

                <div className="col-md-6">

                  <FormInput
                    label="Phone"
                    id="phone"
                    value={profile?.phone || ""}
                    disabled={!editMode}
                    error={errors.phone}
                    onChange={(e) =>
                      handleChange("phone", e.target.value)
                    }
                  />

                </div>

                <div className="col-md-6">

                  <FormSelect
                    label="Country"
                    id="country"
                    value={profile?.country || ""}
                    disabled={!editMode}
                    error={errors.country}
                    onChange={(e) =>
                      handleChange("country", e.target.value)
                    }
                  >

                    <option value="">
                      Select Country
                    </option>

                    {countries.map((country, index) =>
                      country.value === "" ? (
                        <option
                          key={`divider-${index}`}
                          disabled
                        >
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

                </div>

                <div className="col-md-6">

                  <FormInput
                    label="Pincode"
                    id="pincode"
                    value={profile?.pincode || ""}
                    disabled={!editMode}
                    error={errors.pincode}
                    onChange={(e) =>
                      handleChange("pincode", e.target.value)
                    }
                    onBlur={handlePostalLookup}
                  />

                </div>

                <div className="col-md-6">

                  <FormInput
                    label="State"
                    id="state"
                    value={profile?.state || ""}
                    disabled={!editMode}
                    error={errors.state}
                    onChange={(e) =>
                      handleChange("state", e.target.value)
                    }
                  />

                </div>

                <div className="col-md-6">

                  <FormInput
                    label="City"
                    id="city"
                    value={profile?.city || ""}
                    disabled={!editMode}
                    error={errors.city}
                    onChange={(e) =>
                      handleChange("city", e.target.value)
                    }
                  />

                </div>

                <div className="col-12">

                  <FormInput
                    label="Address"
                    id="address"
                    value={profile?.address || ""}
                    disabled={!editMode}
                    error={errors.address}
                    onChange={(e) =>
                      handleChange("address", e.target.value)
                    }
                  />

                </div>

              </div>

            </div>

          </div>




          {/* RIGHT ORDERS */}

          <div className="col-xl-8 col-lg-7 mt-4 mt-lg-0">

            <div className="account-orders-card">

              <div className="account-orders-header">

                <div>

                  <span className="account-section-subtitle">
                    Order History
                  </span>

                  <h2 className="account-section-title">
                    My Orders
                  </h2>

                </div>

                <div className="account-order-count">
                  {orders.length} Orders
                </div>

              </div>

              {orders.length === 0 ? (

                <div className="account-empty-orders">

                  <i className="bi bi-bag"></i>

                  <h4>No Orders Yet</h4>

                  <p>
                    Once you place your first order, it will appear here.
                  </p>

                </div>

              ) : (

                <div className="account-orders-list">

                  {orders.slice(0, visibleOrders).map((order) => {

                    const maxProductionDays = Math.max(
                      ...(order.order_items?.map(
                        item => item.production_days || 0
                      ) || [0])
                    );

                    const expectedDelivery = new Date(order.created_at);

                    expectedDelivery.setDate(
                      expectedDelivery.getDate() +
                      maxProductionDays +
                      7
                    );

                    return (

                      <div
                        key={order.id}
                        className="account-order-card"
                        onClick={() =>
                          navigate(`/account/orders/${order.id}`)
                        }
                      >

                        <div className="account-order-top">

                          <div>

                            <div className="account-order-title-row">

                              <h6 className="account-order-id">
                                Order #{order.id.slice(0, 8)}
                              </h6>

                              <span
                                className={`account-status-badge status-${order.status}`}
                              >
                                {order.status || "pending"}
                              </span>

                            </div>

                            <div className="account-order-meta">

                              <div>

                                <i className="bi bi-calendar3"></i>

                                <span>Ordered On</span>

                                <strong>
                                  {new Date(
                                    order.created_at
                                  ).toLocaleDateString()}
                                </strong>

                              </div>

                              <div>

                                <i className="bi bi-truck"></i>

                                <span>
                                  Expected Delivery
                                </span>

                                <strong>
                                  {expectedDelivery.toLocaleDateString()}
                                </strong>

                              </div>

                            </div>
                            <div className="account-order-summary">

                              <div>

                                <i className="bi bi-credit-card"></i>

                                <span>Payment</span>

                                <strong>
                                  {order.razorpay_payment_id
                                    ? "Razorpay"
                                    : order.paypal_payment_id
                                      ? "PayPal"
                                      : "Pending"}
                                </strong>

                              </div>

                              <div>

                                <i className="bi bi-box-seam"></i>

                                <span>Items</span>

                                <strong>
                                  {order.order_items?.length || 0}
                                </strong>

                              </div>

                            </div>

                          </div>

                          <div className="account-order-right">

                            <div className="account-order-price">

                              ${order.total_amount}

                            </div>

                            <div className="account-order-arrow">

                              <i className="bi bi-chevron-right"></i>

                            </div>

                          </div>

                        </div>

                      </div>

                    );

                  })}

                  {visibleOrders < orders.length && (

                    <div className="text-center mt-3">

                      <button
                        className="app-btn-secondary"
                        onClick={() =>
                          setVisibleOrders(prev => prev + 10)
                        }
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

      </div>
    </div>
  );

}
