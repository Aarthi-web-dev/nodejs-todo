const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { auth } = require("./firebase-config");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// User signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    await auth.createUser({ email, password });
    res.status(200).send("Account created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.getUserByEmail(email);
    if (user.passwordHash === password) {
      res.status(200).send("Login successful");
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Send OTP for password reset
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  try {
    // Generate OTP (a simple implementation)
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Send OTP via email (use a service like Nodemailer)
    // [Email sending logic goes here]
    res.status(200).send({ otp });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Reset password
app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    await auth.updateUser(email, { password: newPassword });
    res.status(200).send("Password reset successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
