import express from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Booking from "../models/Booking.js";
const router = express.Router();


const currentDate = new Date();
currentDate.setUTCHours(0, 0, 0, 0); 
router.get('/ActiveFreelancer', async (req, res) => {
  try {
   
    const activeFreelancers = await Booking.find({
      category: 'Freelancer',
    
    });
    let activeFreelancer = 0;
    let InactiveFreelancer = 0;
    activeFreelancers.map((freelancer) => {
      const bookingDate = new Date(freelancer.BookingDate);
      const expiryDate = new Date(freelancer.ExpiryDate);

      bookingDate.setUTCHours(0, 0, 0, 0);
      expiryDate.setUTCHours(23, 59, 59, 999); 

      if (currentDate >= bookingDate && currentDate <= expiryDate) {
        console.log('Freelancer is active:', freelancer);
        activeFreelancer++;
      } else {
        console.log('Freelancer is not active:', freelancer);
        InactiveFreelancer++;
      }
    });

   
    const totalBooking = await Booking.countDocuments();

    res.status(200).json({
      totalBooking,
     // activeFreelancers,
     activeFreelancer,
     InactiveFreelancer

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
