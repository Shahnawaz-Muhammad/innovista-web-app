import express from "express";
import Booking from "../models/Booking.js";
const router = express.Router();

const currentDate = new Date();
currentDate.setUTCHours(0, 0, 0, 0);
router.get("/ActiveCompany", async (req, res) => {
  try {
    const ActiveCompany = await Booking.find({
      category: "Company",
    });
    let activeCompany = 0;
    let InactiveCompany = 0;
    ActiveCompany.map((company) => {
      const bookingDate = new Date(company.BookingDate);
      const expiryDate = new Date(company.ExpiryDate);

      bookingDate.setUTCHours(0, 0, 0, 0);
      expiryDate.setUTCHours(23, 59, 59, 999);

      if (currentDate >= bookingDate && currentDate <= expiryDate) {
        //console.log('company is active:', company);
        activeCompany++;
      } else {
        //console.log('company is not active:', company);
        InactiveCompany++;
      }
    });

    const totalBooking = await Booking.countDocuments();

    res.status(200).json({
      totalBooking,
      // ActiveGroup,
      activeCompany,
      InactiveCompany,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/StationActiveCompany/:bookingStation", async (req, res) => {
  const { bookingStation } = req.params;

  try {
    const ActiveCompany = await Booking.find({
      category: "Company",
      BookingStation: bookingStation, // Assuming bookingStation is a field in your Booking model
    });
    let activeCompany = 0;
    let InactiveCompany = 0;
    ActiveCompany.map((company) => {
      const bookingDate = new Date(company.BookingDate);
      const expiryDate = new Date(company.ExpiryDate);

      bookingDate.setUTCHours(0, 0, 0, 0);
      expiryDate.setUTCHours(23, 59, 59, 999);

      if (currentDate >= bookingDate && currentDate <= expiryDate) {
        //console.log('company is active:', company);
        activeCompany++;
      } else {
        //console.log('company is not active:', company);
        InactiveCompany++;
      }
    });

    const totalBooking = await Booking.countDocuments({
      BookingStation: bookingStation,
    });

    res.status(200).json({
      totalBooking,
      // ActiveGroup,
      activeCompany,
      InactiveCompany,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
