import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import SEO from "../components/SEO";
import "../styles/pages/Auth.css";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updatePassword = async () => {

    if (!password) {
      toast.error("Please enter a new password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password updated successfully.");

    navigate("/login");
  };

  return (
    <>
      <SEO
        title="Reset Password | Eurasian House"
        description="Create a new secure password for your Eurasian House account."
        canonical="https://www.eurasianrugs.com/reset-password"
      />

      <section className="auth-page">

        <div className="container-fluid px-0">

          <div className="row min-vh-100 g-0">

            {/* =====================================================
                            LEFT PANEL
                        ===================================================== */}

            <div className="col-xl-5 col-lg-5 d-none d-lg-block">

              <div className="auth-image-column">

                <img
                  src="/signup.jpg"
                  alt="Secure Password Reset"
                  className="auth-image"
                />

                <div className="auth-overlay">

                  <div className="auth-overlay-content">

                    <span className="auth-tag">

                      <i className="bi bi-shield-lock"></i>

                      Secure Password Reset

                    </span>

                    <h1 className="auth-overlay-title">

                      Protect
                      <br />
                      Your Account

                    </h1>

                    <p className="auth-overlay-text">

                      Choose a strong password to keep
                      your Eurasian House account safe.
                      We recommend using a unique password
                      that you don't use elsewhere.

                    </p>

                    <div className="auth-feature-list">

                      <div className="auth-feature">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                          Encrypted account security
                        </span>

                      </div>

                      <div className="auth-feature">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                          Strong password protection
                        </span>

                      </div>

                      <div className="auth-feature">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                          Safe & secure authentication
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* =====================================================
                            RIGHT PANEL
                        ===================================================== */}

            <div className="col-xl-7 col-lg-7 auth-form-column">

              <div className="auth-card-wrapper">

                <div className="auth-card">

                  <button
                    className="auth-back"
                    onClick={() => navigate("/")}
                  >

                    <i className="bi bi-arrow-left"></i>

                    <span>
                      Back to Home
                    </span>

                  </button>

                  <div className="auth-header">

                    <div className="auth-icon">

                      <img
                        src="/logobw.png"
                        alt="Eurasian House"
                        className="auth-logo auth-logo-light"
                      />

                    </div>

                    <h2 className="auth-title">

                      Create New Password

                    </h2>

                    <p className="auth-subtitle">

                      Enter a strong password below to
                      secure your account and continue
                      shopping with confidence.

                    </p>

                  </div>

                  <div className="auth-form">

                    <div className="mb-4">

                      <label className="form-label">
                        New Password
                      </label>

                      <div className="auth-input-group auth-password-group">

                        <i className="bi bi-lock"></i>

                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control auth-input auth-password-input"
                          placeholder="Enter your new password"
                          value={password}
                          onChange={(e) =>
                            setPassword(e.target.value)
                          }
                        />

                        <button
                          type="button"
                          className="auth-password-toggle"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >

                          <i
                            className={`bi ${showPassword
                              ? "bi-eye-slash"
                              : "bi-eye"
                              }`}
                          ></i>

                        </button>

                      </div>

                    </div>
                    <div className="mb-4">

                      <label className="form-label">
                        Confirm Password
                      </label>

                      <div className="auth-input-group auth-password-group">

                        <i className="bi bi-shield-lock"></i>

                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control auth-input auth-password-input"
                          placeholder="Confirm your new password"
                          value={confirmPassword}
                          onChange={(e) =>
                            setConfirmPassword(e.target.value)
                          }
                        />

                        <button
                          type="button"
                          className="auth-password-toggle"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >

                          <i
                            className={`bi ${showPassword
                              ? "bi-eye-slash"
                              : "bi-eye"
                              }`}
                          ></i>

                        </button>

                      </div>

                    </div>

                    <button
                      type="button"
                      className="btn auth-btn w-100"
                      disabled={loading}
                      onClick={updatePassword}
                    >

                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>

                          Updating Password...

                        </>
                      ) : (
                        <>
                          <i className="bi bi-check2-circle me-2"></i>

                          Update Password
                        </>
                      )}

                    </button>

                  </div>

                  <div className="auth-divider">

                    <span>
                      Remembered your password?
                    </span>

                  </div>

                  <div className="auth-footer">

                    <span>
                      Return to your account
                    </span>

                    <Link
                      to="/login"
                      className="auth-link"
                    >
                      Back to Login
                    </Link>

                  </div>

                  <div className="auth-bottom-features">

                    <button
                      type="button"
                      className="auth-bottom-item"
                      onClick={() => navigate("/contact")}
                    >

                      <i className="bi bi-headset"></i>

                      <small>
                        Support
                      </small>

                    </button>

                    <div className="auth-bottom-item">

                      <i className="bi bi-shield-check"></i>

                      <small>
                        Secure
                      </small>

                    </div>

                    <div className="auth-bottom-item">

                      <i className="bi bi-key"></i>

                      <small>
                        Protected
                      </small>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}