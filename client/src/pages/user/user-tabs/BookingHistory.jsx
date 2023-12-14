import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import bgMain from "../../../assets/images/bg-main.png";



const BookingHistory = () => {
  const [BookingData, setBookingData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleDetails = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.150.134:8080/api/BookingHistory?userEmail=${user.email}`
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
    <div className=" flex flex-col h-full ">
      <div
        className=" h-60  flex justify-center items-center"
        style={{
          backgroundImage: `url(${bgMain})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-orange text-5xl font-bold p-5" 
            style={{ backdropFilter: 'blur(1x)', background: 'rgba(255, 255, 255, 0.6)' }} 
        >
          Booking History
        </h1>
      </div>
      <div className=" -mt-10 w-full  flex  justify-center items-center gap-3">
        <div className="w-full md:w-2/3 bg-white rounded-lg flex flex-col shadow-sm shadow-orange">
          {BookingData.length > 0 ? (
            BookingData.map((booking, index) => (
              <div
                key={index}
                className={`flex flex-col justify-between items-center  pt-5 rounded-md `}
              >
                {expandedIndex !== index ? (
                  <div className="w-full flex flex-col md:flex-row justify-around items-center ">
                    <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                      <h1 className="text-xl font-bold text-center md:text-left">Name</h1>
                      <h1 className="text-lg font-semibold text-center md:text-left">
                        {booking?.Name }
                      </h1>
                    </div>
                    <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                      <h1 className="text-xl font-bold text-center md:text-left">Station</h1>
                      <h2 className="text-lg font-semibold text-center md:text-left">
                        {booking?.BookingStation}
                      </h2>
                    </div>
                    <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                      <h1 className="text-xl font-bold text-center md:text-left">Booking Date</h1>
                      <p className="text-lg font-semibold text-center md:text-left">
                        {booking?.BookingDate
                          ? new Date(booking.BookingDate).toLocaleDateString(
                              "en-US"
                            )
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col  items-center md:items-stretch md:gap-5">
                    <div className="flex flex-col md:flex-row justify-center md:justify-around">
                      <div className="flex flex-col w-40 border-b-2 border-orange md:border-b-0 ">
                        <h1 className="text-xl font-bold text-center md:text-left">Name </h1>
                        <h1 className="text-lg font-semibold text-center md:text-left">
                          {booking?.Name ? booking.Name : "Not available"}
                        </h1>
                      </div>
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center md:text-left">Station</h1>
                        <h2 className="text-lg font-semibold text-center md:text-left">
                          {booking?.BookingStation
                            ? booking.BookingStation
                            : "Not available"}
                        </h2>
                      </div>
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center md:text-left">Booking Date</h1>
                        <p className="text-lg font-semibold text-center md:text-left">
                          {booking?.BookingDate
                            ? new Date(booking.BookingDate).toLocaleDateString(
                                "en-US"
                              )
                            : "Not available"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-around">
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center md:text-left">Expiry Date</h1>
                        <p className="text-lg font-semibold text-center md:text-left">
                          {booking?.ExpiryDate
                            ? new Date(booking.ExpiryDate).toLocaleDateString(
                                "en-US"
                              )
                            : "Not available"}
                        </p>
                      </div>
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center md:text-left">Booking Time</h1>
                        <h1 className="text-lg font-semibold text-center md:text-left">
                          {booking?.BookingTime
                            ? booking.BookingTime
                            : "Not available"}
                        </h1>
                      </div>
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center md:text-left">Expiry Time</h1>
                        <h1 className="text-lg font-semibold text-center md:text-left">
                          {booking?.ExpiryTime
                            ? booking.ExpiryTime
                            : "Not available"}
                        </h1>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  className="mt-2 bg-indigo-600 rounded-b-lg text-white font-bold p-2 w-full text-center"
                  onClick={() => handleToggleDetails(index)}
                >
                  {expandedIndex === index ? "Less Details" : "View Details"}
                </button>
              </div>
            ))
          ) : (
            <div className="text-black">
              <h2 className="font-semibold text-xl">No recent bookings</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
