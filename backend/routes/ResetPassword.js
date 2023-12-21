import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const router = express.Router();

const otp = generateOTP();

// Function to generate OTP (you can replace it with your implementation)
function generateOTP() {
  // Generate a random 6-digit number as OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
}

router.post("/checkEmail", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the User collection
    const user = await User.findOne({ emailAddress: email });

    // If the email exists, generate and send OTP
    if (user) {
      // You need to implement or use a function to generate OTP
      await sendOTPEmail(email, otp);

      res.json({
        emailExists: true,
        message: "OTP send successfully to your Email",
        UserEmail: email,
      });
    } else {
      res.json({ emailExists: false, message: "You are Not registered" });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to send OTP email using nodemailer with SMTP
async function sendOTPEmail(email, otp) {
  console.log("email-------", email);
  console.log("otp-------", otp);

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "claystonepvt@gmail.com",
      pass: "vbpmfkkceqoopdpz",
    },
  });

  // Email content
  const mailOptions = {
    from: "claystonepvt@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for email verification is: ${otp}`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
}

router.post("/verify-otp", (req, res) => {
  const { enteredOTP } = req.body;

  // Check if entered OTP matches the current OTP
  const isOTPVerified = enteredOTP === otp;

  res.json({ isOTPVerified });
});

router.post("/updatePassword", async (req, res) => {
  const { emailAddress } = req.query;
  const { newPassword } = req.body;

  try {
    // Find the user by email address
    const user = await User.findOne({ emailAddress });

    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user object
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
