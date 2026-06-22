import { useState } from "react";
import { signUp } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

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

    } catch (err) {
      console.error(err); // 👈 IMPORTANT

      alert(
        err?.message || err?.error_description || JSON.stringify(err)
      );
    }
  }

  return (
    <><SEO
      title="Create an Account | Eurasian House"
      description="Create your Eurasian House account for faster checkout, order tracking and personalized shopping."
      canonical="https://eurasianrugs.com/signup"
    />
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3">Sign Up</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) =>
              setForm({ ...form, full_name: e.target.value })
            }
          />

          <input
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="form-control mb-3"
            id="password"
            name="password"
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
    </>
  );
}