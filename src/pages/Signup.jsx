import { useState } from "react";
import { signUp } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { toast } from "react-toastify";
import { supabase } from "../lib/supabase";

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
    <><SEO
      title="Create an Account | Eurasian House"
      description="Create your Eurasian House account for faster checkout, order tracking and personalized shopping."
      canonical="https://www.eurasianrugs.com/signup"
    />
      <div
        className="container-fluid"
        style={{ background: "#FAF8F5", minHeight: "100vh" }}
      >
        <div className="row min-vh-100 g-0">

          {/* Left Side (Desktop Only) */}
          <div className="col-lg-6 d-none d-lg-block p-0 signup-image">
            <img
              src="/signup.jpg"
              alt="Hand Knotted Carpet"
              className="w-100 h-100 signup-img"
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
                  Experience authentic hand-knotted hand-tufted, carpets that bring warmth,
                  elegance and heritage into every space.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-5 d-flex align-items-center justify-content-center px-5">
            <div
              className="bg-white shadow-sm rounded-4 p-4 p-md-5"
              style={{ width: "100%", maxWidth: "520px" }}
            >

              {/* Your form comes here */}

              <h2 className="fw-bold mb-4">
                Welcome to Eurasian House
              </h2>


              <button
                type="button"
                className="btn btn-light border w-100 d-flex align-items-center justify-content-center py-2 mb-4 rounded-3"
                onClick={() => handleOAuthSignup("google")}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width="20"
                  className="me-3"
                />
                Continue with Google
              </button>

              <button
                type="button"
                className="btn btn-light border w-100 d-flex align-items-center justify-content-center py-2 mb-4 rounded-3"
                onClick={() => handleOAuthSignup("facebook")}
              >
                <i
                  className="bi bi-facebook me-3"
                  style={{ color: "#1877F2", fontSize: "1.2rem" }}
                ></i>
                Continue with Facebook
              </button>

              <div className="d-flex align-items-center my-4">
                <div className="flex-grow-1 border-top"></div>

                <span
                  className="px-3 text-uppercase text-muted"
                  style={{
                    letterSpacing: "1px",
                    fontSize: ".75rem"
                  }}
                >
                  Or
                </span>

                <div className="flex-grow-1 border-top"></div>
              </div>

              <form onSubmit={handleSubmit}>
                <label className="form-label fw-medium">
                  Full Name
                </label>
                <input
                  className="form-control mb-3"
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  onChange={(e) =>
                    setForm({ ...form, full_name: e.target.value })
                  }
                />

                <label className="form-label fw-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control mb-3"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  required
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <label className="form-label fw-medium">
                  Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    minLength={6}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                  <button
                    type="button"
                    className="btn"
                    style={{
                      border: "1px solid #dee2e6",
                      color: "#6c757d",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                    />
                  </button>
                </div>

                <label className="form-label fw-medium">
                  Confirm Password
                </label>

                <div className="input-group mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm your password"
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
                    className="btn"
                    style={{
                      border: "1px solid #dee2e6",
                      color: "#6c757d",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                    />
                  </button>
                </div>

                <button
                  className="btn btn-dark w-100 py-2"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
                <div className="text-center mt-4">
                  <span className="text-muted">
                    Already have an account?{" "}
                  </span>

                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
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