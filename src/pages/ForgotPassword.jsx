import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://www.eurasianrugs.com/reset-password",
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password reset link sent to email");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Forgot Password</h3>

      <input
        type="email"
        id="email"
        name="email"
        className="form-control mb-3"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="btn btn-dark w-100"
        onClick={sendReset}
      >
        Send Reset Link
      </button>
    </div>
  );
}