import express from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

const router = express.Router();

router.post('/bookings', async (req, res) => {
    try {
  
      const { userEmail } = req.query;
  
      // Find the user by email
      const user = await User.findOne({ emailAddress: userEmail });
      
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const newBooking = new Booking({
        FullName: req.body.FullName,
        ContactNo: req.body.ContactNo,
        Member: req.body.Member,
        BookingStation: req.body.BookingStation,
        BookingDate: req.body.BookingDate,
        ExpiryDate: req.body.ExpiryDate,
        BookingTime: req.body.BookingTime,
        ExpiryTime: req.body.ExpiryTime,
        Email: user.emailAddress,
      });
  
      // Save the booking to the database
      await newBooking.save();
  
      
      res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
   
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/BookingHistory", async (req, res) => {
    try {
      const { userEmail } = req.query;
  
      // Find the user by email
      const user = await Booking.find({ Email: userEmail });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

export default router;
