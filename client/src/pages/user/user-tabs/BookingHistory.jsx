import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import bgMain from "../../../assets/images/bg-main.png";


import { apiUrl } from "../../../config";

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
        <h1
          className="text-orange text-5xl font-bold p-5"
          style={{
            backdropFilter: "blur(1x)",
            background: "rgba(255, 255, 255, 0.6)",
          }}
        >
          Booking History
        </h1>
      </div>
      <div className=" mt-5 md:-mt-10 w-full flex justify-center items-center gap-3">
        <div className="w-full bg-white md:w-4/5 lg:w-2/3 flex flex-col  shadow-sm shadow-orange max-h-[26rem] overflow-y-auto">
          {BookingData.length > 0 ? (
            BookingData.map((booking, index) => (
              <div
                key={index}
                className={`flex flex-col justify-between items-center  hover:bg-gray-100 w-full pt-5 shadow-sm shadow-orange `}
              >
                {expandedIndex !== index ? (
                  <div className="w-full flex flex-col md:flex-row justify-around items-center ">
                    <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                      <h1 className="text-xl font-bold text-center ">
                        Members/Guests
                      </h1>
                      <h1 className="text-lg font-semibold text-center ">
                        {booking?.Member}
                      </h1>
                    </div>
                    <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                      <h1 className="text-xl font-bold text-center ">
                        Station
                      </h1>
                      <h2 className="text-lg font-semibold text-center ">
                        {booking?.BookingStation}
                      </h2>
                    </div>
                    <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                      <h1 className="text-xl font-bold text-center ">
                        Booking Date
                      </h1>
                      <p className="text-lg font-semibold text-center ">
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
                        <h1 className="text-xl font-bold text-center ">
                          Members/Guests
                        </h1>
                        <h1 className="text-lg font-semibold text-center ">
                        {booking?.Member}
                        </h1>
                      </div>
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center ">
                          Station
                        </h1>
                        <h2 className="text-lg font-semibold text-center ">
                          {booking?.BookingStation}
                        </h2>
                      </div>
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center ">
                          Booking Date
                        </h1>
                        <p className="text-lg font-semibold text-center ">
                          {booking?.BookingDate
                             && new Date(booking.BookingDate).toLocaleDateString(
                                "en-US"
                              )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-around">
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center ">
                          Expiry Date
                        </h1>
                        <p className="text-lg font-semibold text-center ">
                          {booking?.ExpiryDate
                          &&  new Date(booking.ExpiryDate).toLocaleDateString(
                                "en-US"
                              )}
                        </p>
                      </div>
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center ">
                          Booking Time
                        </h1>
                        <h1 className="text-lg font-semibold text-center ">
                          {booking?.BookingTime}
                        </h1>
                      </div>
                      <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                        <h1 className="text-xl font-bold text-center ">
                          Expiry Time
                        </h1>
                        <h1 className="text-lg font-semibold text-center ">
                          {booking?.ExpiryTime}
                        </h1>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  className="mt-2 bg-orange hover:bg-orangeDark text-white font-bold p-2 w-full text-center"
                  onClick={() => handleToggleDetails(index)}
                >
                  {expandedIndex === index ? "Less Details" : "View Details"}
                </button>
              </div>
            ))
          ) : (
            <div className="text-black h-20 flex justify-center items-center">
              <h2 className="font-bold text-2xl">No Recent Booking</h2>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default BookingHistory;
