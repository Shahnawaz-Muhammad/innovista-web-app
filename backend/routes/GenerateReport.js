import express from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

const router = express.Router();
router.get("/GetReport", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    console.log(startDate, endDate);

    // Check if both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({
          error: "Both startDate and endDate are required query parameters.",
        });
    }

    // Convert startDate and endDate to Date objects
    const start = new Date(`${startDate}`);
    const end = new Date(`${endDate}`);

    // Fetch records with registrationDate falling between start and end dates
    const UsersReport = await User.find({
      registrationDate: {
        $gte: start,
        $lte: end,
      },
    });
    const BookingReport = await Booking.find({
      registrationDate: {
        $gte: start,
        $lte: end,
      },
    });

    res.json({ UsersReport, BookingReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/GetReportByStation", async (req, res) => {
 
  try {
    const { startDate, endDate,station } = req.query;
    console.log(startDate, endDate);

    // Check if both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({
          error: "Both startDate and endDate are required query parameters.",
        });
    }

    // Convert startDate and endDate to Date objects
    const start = new Date(`${startDate}`);
    const end = new Date(`${endDate}`);

    // Fetch records with registrationDate falling between start and end dates
    const UsersReport = await User.find({
      registrationDate: {
        $gte: start,
        $lte: end,
      },

      bookingStation: station,
    });
    const BookingReport = await Booking.find({
      registrationDate: {
        $gte: start,
        $lte: end,
      },
      BookingStation: station,
    });

    res.json({ UsersReport, BookingReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
