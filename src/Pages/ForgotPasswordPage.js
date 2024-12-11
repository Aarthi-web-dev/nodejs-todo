import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email,
      });
      setReceivedOtp(response.data.otp);
      alert("OTP sent to your email!");
      setStep(2);
    } catch (error) {
      alert("Error sending OTP");
    }
  };

  const verifyOtp = () => {
    if (otp === receivedOtp.toString()) {
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:5000/reset-password", {
        email,
        newPassword,
      });
      alert("Password reset successfully");
      navigate("/");
    } catch (error) {
      alert("Error resetting password");
    }
  };

  return (
    <div>
      {step === 1 && (
        <>
          <h1>Forgot Password</h1>
          <input
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <h1>Verify OTP</h1>
          <input
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify</button>
        </>
      )}
      {step === 3 && (
        <>
          <h1>Create a New Password</h1>
          <input
            placeholder="Enter new password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={resetPassword}>Submit</button>
        </>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
