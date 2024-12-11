import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:5000/login", { email, password });
      navigate("/TaskManager");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/forgot-password")}>Forgot Password?</p>
      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")}>Create an Account</span>
      </p>
    </div>
  );
}

export default LoginPage;