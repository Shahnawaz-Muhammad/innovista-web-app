import express from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

const router = express.Router();

router.post("/bookings", async (req, res) => {
  try {
    const { userEmail } = req.query;

    // Find the user by email
    const user = await User.findOne({ emailAddress: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const RegistrationDate = new Date().toISOString().split("T")[0];
    const fullname = user.firstName + " " + user.lastName;
    const newBooking = new Booking({
      FullName: fullname,
      ContactNo: req.body.ContactNo,
      ReservationType: req.body.ReservationType,
      BookingStation: req.body.BookingStation,
      BookingDate: req.body.BookingDate,
      ExpiryDate: req.body.ExpiryDate,
      BookingTime: req.body.BookingTime,
      ExpiryTime: req.body.ExpiryTime,
      Email: user.emailAddress,
      category: user.category,
      registrationDate: RegistrationDate,
    });

    // Save the booking to the database
    await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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

    const statusUser = [];
    user.forEach((freelancer) => {
      const bookingDate = freelancer.BookingDate.toISOString().split("T")[0];
      const expiryDate = freelancer.ExpiryDate.toISOString().split("T")[0];
      const bookingTime = freelancer.BookingTime;
      const expiryTime = freelancer.ExpiryTime;

      function convertTo24Hour(time12hour) {
        const [time, period] = time12hour.split(" ");
        let [hours, minutes] = time.split(":");
        if (period === "PM" && hours !== "12") {
          hours = String(Number(hours) + 12);
        }
        if (period === "AM" && hours === "12") {
          hours = "00";
        }
        return `${hours}:${minutes}`;
      }

      const activeBooking = new Date(
        `${bookingDate}T${convertTo24Hour(bookingTime)}:00Z`
      );
      const expiryBooking = new Date(
        `${expiryDate}T${convertTo24Hour(expiryTime)}:00Z`
      );
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
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
