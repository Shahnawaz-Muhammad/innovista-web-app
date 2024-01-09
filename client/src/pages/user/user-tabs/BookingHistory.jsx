import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

import { apiUrl } from "../../../config";
import Bookinglist from "../../../components/dashboard/Bookinglist";

const BookingHistory = () => {
  const [BookingData, setBookingData] = useState([]);
  // const [expandedIndex, setExpandedIndex] = useState(null);
  // const [showQr, setShowQr] = useState(false);

  // const handleToggleDetails = (index) => {
  //   setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  // };

  const { user } = useContext(AuthContext);

  const fetchData = async (userEmail, bookingData) => {
    try {
      const response = await fetch(
        `${apiUrl}/BookingHistory?userEmail=${userEmail}`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(bookingData)) {
        setBookingData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(user.email, BookingData);
  }, [user.email, BookingData]);

  return (
    <>
      <div className=" flex flex-col h-full  ">
        <div className="w-full flex justify-center items-center gap-3">
          <div className="mt-5  w-full flex flex-col  max-h-full ">
            <Bookinglist BookingData={BookingData} fetchData={fetchData}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistory;
