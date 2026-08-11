import { useState } from "react";
import { signUp } from "../lib/auth";
import { useNavigate, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";
import "../styles/pages/Auth.css";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      await signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.full_name,
          },
        },
      });

      toast.success(
        "Account created successfully. Please check your email to verify your account."
      );

      navigate("/login");

    } catch (err) {

      console.error(err);

      toast.error(
        err?.message ||
        err?.error_description ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleOAuthSignup = async (provider) => {

    const { error } = await supabase.auth.signInWithOAuth({

      provider,

      options: {
        redirectTo: `${window.location.origin}/account`,
      },

    });

    if (error) {
      toast.error(error.message);
    }

  };

  return (
    <>
      <SEO
        title="Create an Account | Eurasian House"
        description="Create your Eurasian House account for faster checkout, order tracking and personalized shopping."
        canonical="https://www.eurasianrugs.com/signup"
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
                  alt="Handcrafted Rugs"
                  className="auth-image"
                />

                <div className="auth-overlay">

                  <div className="auth-overlay-content">

                    <span className="auth-tag">

                      <i className="bi bi-stars"></i>

                      Join Eurasian House

                    </span>

                    <h1 className="auth-overlay-title">

                      Create
                      <br />
                      Your Account

                    </h1>

                    <p className="auth-overlay-text">

                      Become part of the Eurasian House
                      family. Save your favourite rugs,
                      track every order and enjoy a faster,
                      more personalized shopping experience.

                    </p>

                    <div className="auth-feature-list">

                      <div className="auth-feature">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                          Faster checkout
                        </span>

                      </div>

                      <div className="auth-feature">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                          Order tracking & history
                        </span>

                      </div>

                      <div className="auth-feature">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                          Wishlist & exclusive updates
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

                      Create Account

                    </h2>

                    <p className="auth-subtitle">

                      Join Eurasian House to manage orders,
                      save your favourite rugs and enjoy a
                      seamless shopping experience.

                    </p>

                  </div>

                  {/* OAuth */}

                  <div className="auth-social">

                    <button
                      type="button"
                      className="auth-social-btn"
                      onClick={() => handleOAuthSignup("google")}
                    >

                      <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        width="20"
                      />

                      Continue with Google

                    </button>

                    <button
                      type="button"
                      className="auth-social-btn"
                      onClick={() => handleOAuthSignup("facebook")}
                    >

                      <i
                        className="bi bi-facebook"
                        style={{ color: "#1877F2" }}
                      ></i>

                      Continue with Facebook

                    </button>

                  </div>

                  <div className="auth-divider">

                    <span>
                      or sign up with email
                    </span>

                  </div>

                  <form onSubmit={handleSubmit}>

                    <div className="auth-form">

                      <div className="mb-4">

                        <label className="form-label">
                          Full Name
                        </label>

                        <div className="auth-input-group">

                          <i className="bi bi-person"></i>

                          <input
                            type="text"
                            className="form-control auth-input"
                            placeholder="Enter your full name"
                            value={form.full_name}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                full_name: e.target.value,
                              })
                            }
                            required
                          />

                        </div>

                      </div>

                      <div className="mb-4">

                        <label className="form-label">
                          Email Address
                        </label>

                        <div className="auth-input-group">

                          <i className="bi bi-envelope"></i>

                          <input
                            type="email"
                            className="form-control auth-input"
                            placeholder="Enter your email address"
                            value={form.email}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                email: e.target.value,
                              })
                            }
                            required
                          />

                        </div>

                      </div>
                      <div className="mb-4">

                        <label className="form-label">
                          Password
                        </label>

                        <div className="auth-input-group auth-password-group">

                          <i className="bi bi-lock"></i>

                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control auth-input auth-password-input"
                            placeholder="Create a password"
                            value={form.password}
                            minLength={6}
                            required
                            onChange={(e) =>
                              setForm({
                                ...form,
                                password: e.target.value,
                              })
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
                            placeholder="Confirm your password"
                            value={form.confirmPassword}
                            required
                            onChange={(e) =>
                              setForm({
                                ...form,
                                confirmPassword: e.target.value,
                              })
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
                        type="submit"
                        className="btn auth-btn w-100"
                        disabled={loading}
                      >

                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>

                            Creating Account...

                          </>
                        ) : (
                          <>
                            <i className="bi bi-person-plus me-2"></i>

                            Create Account
                          </>
                        )}

                      </button>

                    </div>

                  </form>

                  <div className="auth-divider">

                    <span>
                      Already have an account?
                    </span>

                  </div>

                  <div className="auth-footer">

                    <span>
                      Welcome back!
                    </span>

                    <Link
                      to="/login"
                      className="auth-link"
                    >
                      Sign In
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

                      <i className="bi bi-globe"></i>

                      <small>
                        Worldwide
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