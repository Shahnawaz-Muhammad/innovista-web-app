import express from "express";

import User from "../models/User.js";
const router = express.Router();

router.get('/RegisterRecords', async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 }); // Assuming _id represents the registration date
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  });


export default router;
