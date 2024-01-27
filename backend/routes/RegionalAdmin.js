// routes/regionalAdmins.js

import express from "express";
import RegionalAdmin from "../models/RegionalAdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST request to create a new RegionalAdmin
router.post("/add-admin", async (req, res) => {
  console.log(res)
  try {
    const { userName, email, password, station, role, status } = req.body;

    // Validate the request body
    if (!userName || !email || !password || !station || !role | !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if UserName or EmailAddress already exists
    const existingUser = await RegionalAdmin.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User Name or Email Address already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new RegionalAdmin with the hashed password
    const newRegionalAdmin = new RegionalAdmin({
      userName,
      email,
      password: hashedPassword,
      station,
      role,
      status,
    });

    const token = jwt.sign({ userId: newRegionalAdmin._id,role: newRegionalAdmin.role}, "innovista-secret-key", {
      expiresIn: "1h", // Set an expiration time for the token if needed
    });
    newRegionalAdmin.token = token;
    

    // Save the RegionalAdmin to the database
    const savedRegionalAdmin = await newRegionalAdmin.save();

    res.status(201).json(savedRegionalAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/regional-admins", async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await RegionalAdmin.find();

    // Send the users as a JSON response
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST request for user login
router.post("/AdminLogin", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Validate the request body
    if (!usernameOrEmail || !password) {
      return res
        .status(400)
        .json({ error: "Username/Email and password are required for login" });
    }

    // Find the user by username or email
    const user = await RegionalAdmin.findOne({
      $or: [{ userName: usernameOrEmail }, { email: usernameOrEmail }],
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid username or email" });
    }

    // Check if the provided password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // You may generate and send a token here for authentication if needed
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "innovista-secret-key",
    ); // Change 'your-secret-key' to a secure key

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        userName: user.userName,
        email: user.email,
        station: user.station,
        role: user.role,
        token: user.token
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE request to delete a RegionalAdmin by ID
router.delete("/DeleteRegional-admins/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRegionalAdmin = await RegionalAdmin.findByIdAndDelete(id);

    if (!deletedRegionalAdmin) {
      return res.status(404).json({ error: "RegionalAdmin not found" });
    }

    res.status(200).json({
      message: "RegionalAdmin deleted successfully",
      deletedRegionalAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT request to update the Status field of a RegionalAdmin by ID
router.put("/UpdateRegional-admins/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Validate the request body
    if (status === undefined) {
      return res.status(400).json({ error: "Status is required for update" });
    }

    const updatedRegionalAdmin = await RegionalAdmin.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedRegionalAdmin) {
      return res.status(404).json({ error: "RegionalAdmin not found" });
    }

    res.status(200).json(updatedRegionalAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
