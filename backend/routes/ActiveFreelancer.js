import express from "express";
import Booking from "../models/Booking.js";
const router = express.Router();

const currentDate = new Date();
currentDate.setUTCHours(0, 0, 0, 0);
router.get("/ActiveFreelancer", async (req, res) => {
  try {
    const activeFreelancers = await Booking.find({
      category: "Freelancer",
    });
    let activeFreelancer = 0;
    let InactiveFreelancer = 0;
    activeFreelancers.map((freelancer) => {
      const bookingDate = new Date(freelancer.BookingDate);
      const expiryDate = new Date(freelancer.ExpiryDate);

      bookingDate.setUTCHours(0, 0, 0, 0);
      expiryDate.setUTCHours(23, 59, 59, 999);

      if (currentDate >= bookingDate && currentDate <= expiryDate) {
        activeFreelancer++;
      } else {
        InactiveFreelancer++;
      }
    });

    const totalBooking = await Booking.countDocuments();

    res.status(200).json({
      totalBooking,
      // activeFreelancers,
      activeFreelancer,
      InactiveFreelancer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/StationActiveFreelancer/:bookingStation", async (req, res) => {
  const { bookingStation } = req.params;

  try {
    const activeFreelancers = await Booking.find({
      category: "Freelancer",
      BookingStation: bookingStation, // Assuming bookingStation is a field in your Booking model
    });
    let activeFreelancer = 0;
    let InactiveFreelancer = 0;
    activeFreelancers.map((freelancer) => {
      const bookingDate = new Date(freelancer.BookingDate);
      const expiryDate = new Date(freelancer.ExpiryDate);

      bookingDate.setUTCHours(0, 0, 0, 0);
      expiryDate.setUTCHours(23, 59, 59, 999);

      if (currentDate >= bookingDate && currentDate <= expiryDate) {
        activeFreelancer++;
      } else {
        InactiveFreelancer++;
      }
    });

    const totalBooking = await Booking.countDocuments({
      BookingStation: bookingStation, // Assuming bookingStation is a field in your Booking model
    });

    res.status(200).json({
      totalBooking,
      // activeFreelancers,
      activeFreelancer,
      InactiveFreelancer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
