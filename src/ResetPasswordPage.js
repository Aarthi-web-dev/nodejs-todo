import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPasswordPage() {
  const location = useLocation();
  const email = location.state?.email || "";
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      // Simulate OTP verification and password reset
      setMessage("Password reset successful!");
      navigate("/"); // Redirect to login page
    } catch (error) {
      setMessage("Password reset failed.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Reset Password</h1>
      <p>Email: {email}</p>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPasswordPage;