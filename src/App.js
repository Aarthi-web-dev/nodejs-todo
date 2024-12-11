import logo from './logo.svg';
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.js";
import SignupPage from "./Pages/SignupPage.js"
import ForgotPasswordPage from './Pages/ForgotPasswordPage.js';
// import HomePage from './Pages/HomePage.js';
import OTPPage from "./OTPPage.js";
import TaskManager from "./TaskManager.js";
import ResetPasswordPage from "./ResetPasswordPage.js";
import React from 'react';
import SignUp from './SignUp.js';
function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Clean up listener on unmount
  }, []);
  return (
    <>
    <Router>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/TaskManager" element={user ? <TaskManager/> : <LoginPage/>} />
        <Route path="/signup" element={<SignUp />} /> */}
                 <Route path="/" element={<LoginPage />} />
                 <Route path="/signup" element={<SignupPage />} />
                 <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                 <Route path="/TaskManager" element={<TaskManager />} />
        
      </Routes>
    </Router>
    </>
   );
}

export default App;
