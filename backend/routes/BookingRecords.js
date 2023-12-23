import express from "express";

import Booking from "../models/Booking.js";
const router = express.Router();

router.get('/BookingRecords', async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ _id: -1 });
      const statusUser = [];
      bookings.forEach((freelancer) => {
        const bookingDate = freelancer.BookingDate.toISOString().split('T')[0];
        const expiryDate = freelancer.ExpiryDate.toISOString().split('T')[0];
        const bookingTime = freelancer.BookingTime;
        const expiryTime = freelancer.ExpiryTime;
    
        function convertTo24Hour(time12hour) {
          const [time, period] = time12hour.split(' ');
          let [hours, minutes] = time.split(':');
          if (period === 'PM' && hours !== '12') {
            hours = String(Number(hours) + 12);
          }
          if (period === 'AM' && hours === '12') {
            hours = '00';
          }
          return `${hours}:${minutes}`;
        }
    
        const activeBooking = new Date(`${bookingDate}T${convertTo24Hour(bookingTime)}:00Z`);
        const expiryBooking = new Date(`${expiryDate}T${convertTo24Hour(expiryTime)}:00Z`);
        const currentDateTime = new Date();
        const pstTime = new Date(currentDateTime.getTime() + 5 * 60 * 60 * 1000);
  
        let status = 0; 
        if (pstTime >= activeBooking && pstTime <= expiryBooking) {
          status = 1;
        } else {
          status = 0;
        }
  
        
        statusUser.push({ ...freelancer.toObject(), status });
      });
      res.status(200).json(statusUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


export default router;
