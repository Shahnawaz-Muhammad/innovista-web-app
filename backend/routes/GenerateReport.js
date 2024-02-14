import express from "express";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

const router = express.Router();
router.get("/GetReport", async (req, res) => {
  try {
    const { startDate, endDate, All, AllUsers, AllBooking, Freelancers, Groups, Company,ActiveBookings,InActiveBooking } = req.query;

    // Check if both startDate and endDate are provided
    if (!startDate || !endDate) {
      return res.status(400).json({
        error: "Both startDate and endDate are required query parameters.",
      });
    }

    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    let UsersReport, BookingReport;

    if (All === "true") {
      UsersReport = await User.find({
        registrationDate: {
          $gte: start,
          $lte: end,
        },
      });
      BookingReport = await Booking.find({
        registrationDate: {
          $gte: start,
          $lte: end,
        },
      });
    } else {
      if (AllUsers === "true") {
        UsersReport = await User.find({
          registrationDate: {
            $gte: start,
            $lte: end,
          },
        });
      } else {
        // Initialize UsersReport as an empty array if none of the above conditions are met
        UsersReport = [];
        
        if (Freelancers === "true") {
          const freelancers = await User.find({
            registrationDate: {
              $gte: start,
              $lte: end,
            },
            category: "Freelancer",
          });
          UsersReport = UsersReport.concat(freelancers);
        }
        if (Groups === "true") {
          const groups = await User.find({
            registrationDate: {
              $gte: start,
              $lte: end,
            },
            category: "Group",
          });
          UsersReport = UsersReport.concat(groups);
        }
        if (Company === "true") {
          const companies = await User.find({
            registrationDate: {
              $gte: start,
              $lte: end,
            },
            category: "Company",
          });
          UsersReport = UsersReport.concat(companies);
        }
      }
      if(AllBooking === "true"){
        BookingReport = await Booking.find({
          registrationDate: {
            $gte: start,
            $lte: end,
          },
        });
      }else{
        BookingReport = [];
       if(ActiveBookings === "true"){

        const bookings = await Booking.find({
          registrationDate: {
            $gte: start,
            $lte: end,
          },
        });

        //Filter Active Users

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
    
         
          if (pstTime >= activeBooking && pstTime <= expiryBooking) {
           
           BookingReport.push({ ...freelancer.toObject()});
          } else {
          
          }
    
          
         // statusUser.push({ ...freelancer.toObject(), status });
        });
        


      //Finish here  
       }

       if(InActiveBooking === "true"){


        const bookings = await Booking.find({
          registrationDate: {
            $gte: start,
            $lte: end,
          },
        });

        //Filter Active Users

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
    
         
          if (pstTime >= activeBooking && pstTime <= expiryBooking) {
           
          
          } else {
            BookingReport.push({ ...freelancer.toObject()});
          }
        });
       }

      }
    }

    res.json({ UsersReport, BookingReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/GetReportByStation", async (req, res) => {
 
  try {
    const { startDate, endDate,station } = req.query;

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
