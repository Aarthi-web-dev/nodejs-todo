import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sendOTP } from "./firebase";

function OTPPage() {
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  const [email, setEmail] = useState(emailFromState);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    const result = await sendOTP(email);
    setMessage(result.message);
    if (result.success) {
      navigate("/reset-password", { state: { email } });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Forgot Password</h1>
      <p>Enter your email to receive an OTP for password reset.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default OTPPage;