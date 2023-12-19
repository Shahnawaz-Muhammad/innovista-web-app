import express from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import bcrypt from "bcrypt";
const router = express.Router();

// route for Job post data
router.post("/checkEmail", async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the email exists in the User collection
      const user = await User.findOne({ emailAddress:email });
  
      // If the email exists, return true; otherwise, return false
      const emailExists = Boolean(user);
  
      res.json({ emailExists });
    } catch (error) {
      console.error("Error checking email:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  router.post("/updatePassword", async (req, res) => {
    const { emailAddress } = req.query;
    const {  newPassword } = req.body;
  
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