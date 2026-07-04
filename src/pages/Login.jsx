import { useState } from "react";
import { login } from "../lib/auth";
import { useNavigate, useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // where to redirect after login
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
        description="Log in to your Eurasian House account to manage orders and your profile."
        canonical="https://www.eurasianrugs.com/login"
      />

      <div
        className="container-fluid"
        style={{ background: "#FAF8F5", minHeight: "100vh" }}
      >
        <div className="row min-vh-100 g-0">

          {/* Left Side */}
          <div className="col-lg-6 d-none d-lg-block p-0 signup-image">

            <img
              src="/signup.jpg"
              alt="Hand Knotted Carpet"
              className="signup-img"
            />

            <div className="signup-overlay">
              <div className="signup-content">

                <span className="signup-tag">
                  Handcrafted Since Generations
                </span>

                <h1>
                  Timeless Rugs.<br />
                  Crafted for Modern Homes.
                </h1>

                <p>
                  Experience authentic hand-knotted carpets that bring warmth,
                  elegance and heritage into every space.
                </p>

              </div>
            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 d-flex align-items-center justify-content-center auth-form-column">

            <div
              className="bg-white rounded-4 p-4 p-md-5"
              style={{
                width: "100%",
                maxWidth: "520px",
                boxShadow: "0 12px 40px rgba(0,0,0,.06)",
              }}
            >

              <h2 className="fw-bold mb-2">
                Welcome Back
              </h2>

              <p className="text-muted mb-4">
                Sign in to manage your orders, wishlist and account.
              </p>

              {/* Google */}

              <button
                type="button"
                className="btn btn-light border w-100 d-flex align-items-center justify-content-center py-2 mb-3 rounded-3"
                onClick={() => handleOAuthLogin("google")}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width="20"
                  className="me-3"
                />

                Continue with Google
              </button>

              {/* Facebook */}

              <button
                type="button"
                className="btn btn-light border w-100 d-flex align-items-center justify-content-center py-2 mb-4 rounded-3"
                onClick={() => handleOAuthLogin("facebook")}
              >
                <i
                  className="bi bi-facebook me-3"
                  style={{
                    color: "#1877F2",
                    fontSize: "1.2rem",
                  }}
                ></i>

                Continue with Facebook
              </button>

              <div className="d-flex align-items-center my-4">
                <hr className="flex-grow-1" />
                <span className="mx-3 text-muted small">
                  OR
                </span>
                <hr className="flex-grow-1" />
              </div>

              <form onSubmit={handleSubmit}>

                <label className="form-label fw-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control mb-4"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />

                <label className="form-label fw-medium">
                  Password
                </label>

                <div className="input-group mb-3">

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    className="btn"
                    style={{
                      border: "1px solid #dee2e6",
                      color: "#6c757d",
                    }}
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    <i
                      className={`bi ${showPassword
                          ? "bi-eye-slash"
                          : "bi-eye"
                        }`}
                    />
                  </button>

                </div>

                <div className="text-end mb-4">

                  <button
                    type="button"
                    className="btn btn-link text-decoration-none p-0"
                    onClick={() =>
                      navigate("/forgot-password")
                    }
                  >
                    Forgot Password?
                  </button>

                </div>

                <button
                  className="btn btn-dark w-100"
                  disabled={loading}
                  style={{
                    height: "52px",
                    borderRadius: "12px",
                    fontWeight: 600,
                  }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>

                <div className="text-center mt-4">

                  <span className="text-muted">
                    New to Eurasian House?{" "}
                  </span>

                  <button
                    type="button"
                    className="btn btn-link text-decoration-none p-0"
                    onClick={() => navigate("/signup")}
                  >
                    Create an account
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}