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

  router.get('/RegisterRecordsByCity/:city', async (req, res) => {
    try {
      // Extract the city parameter from the request URL
      const { city } = req.params;
  
      // Use the find method to get users with the specified city
      const users = await User.find({ city: city }).sort({ _id: -1 });
  
      // Respond with the retrieved users
      res.json(users);
    } catch (error) {
      // Handle any errors that occurred during the retrieval process
      console.error('Error retrieving users by city:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


export default router;
