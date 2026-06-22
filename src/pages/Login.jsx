import { useState } from "react";
import { login } from "../lib/auth";
import { useNavigate, useLocation } from "react-router-dom";
import SEO from "../components/SEO";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // where to redirect after login
  const from = location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);

      // ✅ important: replace history (better UX)
      navigate(from, { replace: true });

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <><SEO
      title="Login | Eurasian House"
      description="Log in to your Eurasian House account to manage orders and your profile."
      canonical="https://eurasianrugs.com/login"
    />
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3">Login</h3>


        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            id="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="btn btn-dark w-100">Login</button>

          <div className="text-center mt-2">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}