const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const firebaseAdmin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase
const serviceAccount = require('./firebase-service-account.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// MongoDB 
mongoose.connect('mongodb://localhost:27017/auth-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = mongoose.model('User', new mongoose.Schema({ email: String, password: String }));

// Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Signup Route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.json({ success: true, message: 'Account created successfully!' });
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Forgot Password (Send OTP)
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
  // Use Nodemailer to send email
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'your-email@gmail.com', pass: 'your-password' } });
  await transporter.sendMail({ to: email, subject: 'Password Reset OTP', text: `Your OTP is ${otp}` });
  res.json({ success: true, otp });
});

// Reset Password
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { password: hashedPassword });
  res.json({ success: true, message: 'Password reset successful!' });
});

// Start Server
app.listen(5000, () => {
  console.log('Server is running ');
});
