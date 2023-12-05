import express from "express";

import Booking from "../models/Booking.js";
const router = express.Router();

router.get('/BookingRecords', async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ _id: -1 });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


export default router;
