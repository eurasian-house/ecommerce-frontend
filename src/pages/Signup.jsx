import { useState } from "react";
import { signUp } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double click

    setLoading(true);
    console.log("Submitting:", form);

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

      alert("Signup successful. Please check your email to confirm.");
      navigate("/login");
      //   } catch (err) {
      //     const msg = err?.message?.toLowerCase() || "";

      //     // 🔴 Handle specific Supabase errors
      //     if (msg.includes("already registered")) {
      //       alert("This email is already registered. Please login instead.");
      //     } else if (msg.includes("rate limit")) {
      //       alert("Too many attempts. Please wait a few seconds and try again.");
      //     } else if (msg.includes("invalid email")) {
      //       alert("Please enter a valid email address.");
      //     } else if (msg.includes("password")) {
      //       alert("Password should be at least 6 characters.");
      //     } else {
      //       alert("Something went wrong. Please try again.");
      //     }
      //   } finally {
      //     setLoading(false);
      //   }
      // };

    } catch (err) {
      console.error(err); // 👈 IMPORTANT

      alert(
        err?.message || err?.error_description || JSON.stringify(err)
      );
    }}

    return (
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3">Sign Up</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Full Name"
            required
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            required
            minLength={6}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    );
  }