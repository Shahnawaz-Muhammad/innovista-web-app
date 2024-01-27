import express from "express";
import Booking from "../models/Booking.js";
const router = express.Router();

const currentDate = new Date();
currentDate.setUTCHours(0, 0, 0, 0);
router.get("/ActiveGroup", async (req, res) => {
  try {
    const ActiveGroup = await Booking.find({
      category: "Group",
    });
    let activeGroup = 0;
    let InactiveGroup = 0;
    ActiveGroup.map((Groups) => {
      const bookingDate = new Date(Groups.BookingDate);
      const expiryDate = new Date(Groups.ExpiryDate);

      bookingDate.setUTCHours(0, 0, 0, 0);
      expiryDate.setUTCHours(23, 59, 59, 999);

      if (currentDate >= bookingDate && currentDate <= expiryDate) {
        activeGroup++;
      } else {
        InactiveGroup++;
      }
    });

    const totalBooking = await Booking.countDocuments();

    res.status(200).json({
      totalBooking,
      // ActiveGroup,
      activeGroup,
      InactiveGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/StationActiveGroup/:bookingStation", async (req, res) => {
  const { bookingStation } = req.params;
  try {
    const ActiveGroup = await Booking.find({
      category: "Group",
      BookingStation: bookingStation, // Assuming bookingStation is a field in your Booking model
    });
    let activeGroup = 0;
    let inactiveGroup = 0;

    const currentDate = new Date(); // Assuming currentDate is defined somewhere in your code

    ActiveGroup.forEach((group) => {
      const bookingDate = new Date(group.BookingDate);
      const expiryDate = new Date(group.ExpiryDate);

      bookingDate.setUTCHours(0, 0, 0, 0);
      expiryDate.setUTCHours(23, 59, 59, 999);

      if (currentDate >= bookingDate && currentDate <= expiryDate) {
        activeGroup++;
      } else {
        inactiveGroup++;
      }
    });

    const totalBooking = await Booking.countDocuments({
      BookingStation: bookingStation,
    });

    res.status(200).json({
      totalBooking,
      activeGroup,
      inactiveGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
