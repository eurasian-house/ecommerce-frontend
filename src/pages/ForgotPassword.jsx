import { useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import "../styles/pages/Auth.css";

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

        const { error } =
            await supabase.auth.resetPasswordForEmail(email, {
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

            <section className="auth-page">

                <div className="container-fluid px-0">

                    <div className="row min-vh-100 g-0">

                        {/* =====================================================
                            LEFT PANEL
                        ====================================================== */}

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

                                            <i className="bi bi-shield-lock me-2"></i>

                                            Secure Password Recovery

                                        </span>

                                        <h1 className="auth-overlay-title">
                                            Forgot
                                            <br />
                                            Your Password?
                                        </h1>

                                        <p className="auth-overlay-text">
                                            Reset your password securely in just
                                            a few steps. Your account is
                                            protected using encrypted password
                                            recovery and trusted authentication.
                                        </p>

                                        <div className="auth-feature-list">

                                            <div className="auth-feature">

                                                <i className="bi bi-check-circle-fill"></i>

                                                <span>
                                                    Secure encrypted reset link
                                                </span>

                                            </div>

                                            <div className="auth-feature">

                                                <i className="bi bi-check-circle-fill"></i>

                                                <span>
                                                    Trusted account protection
                                                </span>

                                            </div>

                                            <div className="auth-feature">

                                                <i className="bi bi-check-circle-fill"></i>

                                                <span>
                                                    Fast password recovery
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* =====================================================
                            RIGHT PANEL
                        ====================================================== */}

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
                                                alt="Eurasian House Logo"
                                                className="auth-logo"
                                            />

                                        </div>

                                        <h2 className="auth-title">
                                            Reset Password
                                        </h2>

                                        <p className="auth-subtitle">
                                            Enter the email address associated
                                            with your account and we'll send you
                                            a secure password reset link.
                                        </p>

                                    </div>

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
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />

                                            </div>

                                        </div>

                                        <button
                                            className="btn auth-btn w-100"
                                            disabled={loading}
                                            onClick={sendReset}
                                        >
                                            {loading
                                                ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>

                                                        Sending Link...
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        <i className="bi bi-send me-2"></i>

                                                        Send Reset Link
                                                    </>
                                                )}
                                        </button>

                                    </div>

                                    <div className="auth-divider">

                                        <span>
                                            Need to sign in?
                                        </span>

                                    </div>

                                    <div className="auth-footer">

                                        <span>
                                            Remember your password?
                                        </span>

                                        <Link
                                            to="/login"
                                            className="auth-link"
                                        >
                                            Back to Login
                                        </Link>

                                    </div>

                                    <div className="auth-bottom-features">

                                        <div className="auth-bottom-item">

                                            <i className="bi bi-shield-check"></i>

                                            <small>
                                                Secure
                                            </small>

                                        </div>

                                        <div className="auth-bottom-item">

                                            <i className="bi bi-lightning-charge"></i>

                                            <small>
                                                Fast
                                            </small>

                                        </div>

                                        <div className="auth-bottom-item" onClick={() => navigate("/contact")}>

                                            <i className="bi bi-headset"></i>

                                            <small>
                                                Support
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