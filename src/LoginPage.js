import React, { useState } from "react";
import './App.css';

import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/TaskManager"); // Redirect to the next conversation 
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/otp", { state: { email } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        <a href="#forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </a>
      </p>
      <p>
        Don't have an account? <a href="/signup"> Create an account</a>
      </p>
    </div>
  );
}

export default LoginPage;