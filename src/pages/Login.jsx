import { useState } from "react";
import { login } from "../lib/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";
import "../styles/pages/Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {

      await login(form);

      toast.success("Welcome back!");

      navigate(from, { replace: true });

    } catch (err) {

      toast.error(err.message);

    } finally {

      setLoading(false);

    }

  };

  const handleOAuthLogin = async (provider) => {

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
        title="Login | Eurasian House"
        description="Log in to your Eurasian House account to manage your orders, wishlist and profile."
        canonical="https://www.eurasianrugs.com/login"
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
                  alt="Luxury Handmade Rugs"
                  className="auth-image"
                />

                <div className="auth-overlay">

                  <div className="auth-overlay-content">

                    <span className="auth-tag">

                      <i className="bi bi-stars"></i>

                      Welcome Back

                    </span>

                    <h1 className="auth-overlay-title">

                      Crafted
                      <br />
                      With Heritage

                    </h1>

                    <p className="auth-overlay-text">

                      Access your account to track
                      orders, save your favourite rugs,
                      manage your profile and continue
                      your journey with Eurasian House.

                    </p>

                    <div className="auth-feature-list">

                      <div className="auth-feature">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                          View your orders anytime
                        </span>

                      </div>

                      <div className="auth-feature">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                          Secure encrypted account
                        </span>

                      </div>

                      <div className="auth-feature">

                        <i className="bi bi-check-circle-fill"></i>

                        <span>
                          Fast worldwide support
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

                      Welcome Back

                    </h2>

                    <p className="auth-subtitle">

                      Sign in to manage your orders,
                      wishlist and account securely.

                    </p>

                  </div>

                  {/* OAuth Buttons */}

                  <div className="auth-social">

                    <button
                      type="button"
                      className="auth-social-btn"
                      onClick={() =>
                        handleOAuthLogin("google")
                      }
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
                      onClick={() =>
                        handleOAuthLogin("facebook")
                      }
                    >

                      <i
                        className="bi bi-facebook"
                        style={{
                          color: "#1877F2",
                        }}
                      ></i>

                      Continue with Facebook

                    </button>

                  </div>

                  <div className="auth-divider">

                    <span>
                      or continue with email
                    </span>

                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="auth-form">

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
                          />

                        </div>

                      </div>

                      <div className="mb-3">

                        <label className="form-label">
                          Password
                        </label>

                        <div className="auth-input-group auth-password-group">

                          <i className="bi bi-lock"></i>

                          <input
                            type={
                              showPassword
                                ? "text"
                                : "password"
                            }
                            className="form-control auth-input auth-password-input"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                password:
                                  e.target.value,
                              })
                            }
                          />

                          <button
                            type="button"
                            className="auth-password-toggle"
                            onClick={() =>
                              setShowPassword(
                                !showPassword
                              )
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

                      <div className="d-flex justify-content-end mb-4">

                        <Link
                          to="/forgot-password"
                          className="auth-link small"
                        >
                          Forgot Password?
                        </Link>

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

                            Signing In...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-box-arrow-in-right me-2"></i>

                            Sign In
                          </>
                        )}
                      </button>

                    </div>

                  </form>

                  <div className="auth-divider">

                    <span>
                      New to Eurasian House?
                    </span>

                  </div>

                  <div className="auth-footer">

                    <span>
                      Don't have an account?
                    </span>

                    <Link
                      to="/signup"
                      className="auth-link"
                    >
                      Create an Account
                    </Link>

                  </div>

                  <div className="auth-bottom-features">

                    <button
                      type="button"
                      className="auth-bottom-item"
                      onClick={() =>
                        navigate("/contact")
                      }
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

