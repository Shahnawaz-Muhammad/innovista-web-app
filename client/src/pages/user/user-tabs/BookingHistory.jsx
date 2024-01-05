import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import bgMain from "../../../assets/images/bg-main.png";

import { apiUrl } from "../../../config";
import QrCode from "../../../components/dashboard/QrCode";
import Bookinglist from "../../../components/dashboard/Bookinglist";

const BookingHistory = () => {
  const [BookingData, setBookingData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showQr, setShowQr] = useState(false);

  const handleToggleDetails = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/BookingHistory?userEmail=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (JSON.stringify(data) !== JSON.stringify(BookingData)) {
          setBookingData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email, BookingData]);

  return (
    <>
      <div className=" flex flex-col h-full  ">
        <div className="w-full flex justify-center items-center gap-3">
          <div className="mt-5  w-full flex flex-col  max-h-full ">
            <Bookinglist BookingData={BookingData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistory;
