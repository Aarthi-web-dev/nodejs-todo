import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/signup", { email, password });
      alert("Account created successfully");
      navigate("/");
    } catch (error) {
      alert("Error creating account");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Submit</button>
    </div>
  );
}

export default SignupPage;