import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const BookingHistory = () => {
  
  const [BookingData, setBookingData] = useState([]);


  const { user} =
  useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/BookingHistory?userEmail=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
       setBookingData(data); // setUserData(data);
      console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email]);
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-xl font-semibold">Recent Bookings</h1>

      <div className="w-1/2 flex flex-col justify-center  gap-3">
        {BookingData.map((booking, index) => (
          <div key={index} className="border border-lightGray flex">
            <div className="py-3 w-1/2 md:w-1/3 flex flex-col gap-3 items-center justify-center bg-orange text-white">
              <h1 className="text-lg font-bold">{" "}
                {booking?.BookingDate
                  ? new Date(booking.BookingDate).toLocaleDateString("en-US")
                  : "Not available"}</h1>
              <h1>{booking.BookingTime}</h1>
            </div>
            <div className="w-full flex flex-col px-3 lg:px-10 py-4 gap-2">
              <h2 className="text-lg font-semibold">{booking.BookingStation}</h2>
              {/* <p>{booking.room}</p> */}
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
