import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SEO from "../components/SEO";

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

      <div
        className="container-fluid"
        style={{ background: "#FAF8F5", minHeight: "100vh" }}
      >
        <div className="container py-4">

          <button
            className="btn btn-link text-decoration-none p-0"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Home
          </button>

        </div>

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
                  Secure Account Protection
                </span>

                <h1>
                  Create a New Password
                </h1>

                <p>
                  Choose a strong password to keep your Eurasian House account secure.
                </p>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="col-lg-6 d-flex align-items-center justify-content-center px-5">

            <div
              className="bg-white rounded-4 p-4 p-md-5"
              style={{
                width: "100%",
                maxWidth: "520px",
                boxShadow: "0 12px 40px rgba(0,0,0,.06)",
              }}
            >

              <h2 className="fw-bold mb-2">
                Reset Password
              </h2>

              <p className="text-muted mb-4">
                Enter and confirm your new password below.
              </p>

              <label className="form-label fw-medium">
                New Password
              </label>

              <div className="input-group mb-4">

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <div className="input-group mb-4">

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
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
                className="btn btn-dark w-100"
                disabled={loading}
                onClick={updatePassword}
                style={{
                  height: "52px",
                  borderRadius: "12px",
                  fontWeight: 600,
                }}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>

              <div className="text-center mt-4">

                <span className="text-muted">
                  Back to{" "}
                </span>

                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}