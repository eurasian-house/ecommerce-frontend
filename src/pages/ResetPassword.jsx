import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password updated");
    navigate("/login");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3>Reset Password</h3>

      <input
        type="password"
        id="password"
        name="password"
        className="form-control mb-3"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-dark w-100"
        onClick={updatePassword}
      >
        Update Password
      </button>
    </div>
  );
}