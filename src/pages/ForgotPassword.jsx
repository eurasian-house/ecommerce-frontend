import { useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const sendReset = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.eurasianrugs.com/reset-password",
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent. Please check your email.");
    }
  };

  return (
    <>
      <SEO
        title="Forgot Password | Eurasian House"
        description="Reset your Eurasian House account password securely."
        canonical="https://www.eurasianrugs.com/forgot-password"
      />
      <div className="container py-4">
        <button
          className="btn btn-link text-decoration-none p-0"
          onClick={() => navigate("/")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Home
        </button>
      </div>

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
                  Secure Password Recovery
                </span>

                <h1>
                  Reset Your Password
                </h1>

                <p>
                  Enter your registered email address and we'll send you a secure link to reset your password.
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
                Forgot Password?
              </h2>

              <p className="text-muted mb-4">
                No worries. Enter your email and we'll send you a password reset link.
              </p>

              <label className="form-label fw-medium">
                Email Address
              </label>

              <input
                type="email"
                className="form-control mb-4"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="btn btn-dark w-100"
                onClick={sendReset}
                disabled={loading}
                style={{
                  height: "52px",
                  borderRadius: "12px",
                  fontWeight: 600,
                }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="text-center mt-4">

                <span className="text-muted">
                  Remember your password?{" "}
                </span>

                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0"
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}