import express from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Booking from "../models/Booking.js";
const router = express.Router();


const currentDate = new Date();
currentDate.setUTCHours(0, 0, 0, 0); 
router.get('/ActiveGroup', async (req, res) => {
  try {
   
    const ActiveGroup = await Booking.find({
      category: 'Group',
    
    });
    let activeGroup = 0;
    let InactiveGroup = 0;
    ActiveGroup.map((Groups) => {
      const bookingDate = new Date(Groups.BookingDate);
      const expiryDate = new Date(Groups.ExpiryDate);

      bookingDate.setUTCHours(0, 0, 0, 0);
      expiryDate.setUTCHours(23, 59, 59, 999); 

      if (currentDate >= bookingDate && currentDate <= expiryDate) {
        //console.log('Freelancer is active:', Groups);
        activeGroup++;
      } else {
        //console.log('Freelancer is not active:', Groups);
        InactiveGroup++;
      }
    });

   
    const totalBooking = await Booking.countDocuments();

    res.status(200).json({
      totalBooking,
     // ActiveGroup,
     activeGroup,
     InactiveGroup

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
