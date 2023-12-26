import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import bgMain from "../../../assets/images/bg-main.png";

import { apiUrl } from "../../../config";
import QrCode from "../../../components/dashboard/QrCode";

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

  console.log(BookingData);

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
          <div className="w-full bg-white md:w-2/3 flex flex-col  shadow-sm shadow-orange max-h-[26rem] overflow-y-auto">
            {BookingData.length > 0 ? (
              BookingData?.slice()
                .reverse()
                .map((booking, index) => (
                  <div
                    key={index}
                    className={`flex flex-col justify-between items-center  hover:bg-gray-100 w-full pt-5 shadow-sm shadow-orange `}
                  >
                    {expandedIndex !== index ? (
                      <div className="w-full flex flex-col md:flex-row justify-around items-center ">
                        <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                          <h1 className="text-xl font-bold text-center md:text-left">
                            Members/Guests
                          </h1>
                          <h1 className="text-lg  text-center md:text-left">
                            {booking?.Member}
                          </h1>
                        </div>

                        <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                          <h1 className="text-xl font-bold text-center ">
                            Station
                          </h1>
                          <h2 className="text-lg  text-center ">
                            {booking?.BookingStation}
                          </h2>
                        </div>
                        <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                          <h1 className="text-xl font-bold text-center ">
                            Booking Date
                          </h1>
                          <p className="text-lg  text-center ">
                            {booking?.BookingDate
                              ? new Date(
                                  booking.BookingDate
                                ).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                              : "Not available"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col  items-center md:items-stretch md:gap-5">
                        <div className="flex flex-col md:flex-row justify-center md:justify-around">
                          <div className="flex flex-col w-40 border-b-2 border-orange md:border-b-0 ">
                            <h1 className="text-xl font-bold text-center md:text-left">
                              Members/Guests
                            </h1>
                            <h1 className="text-lg  text-center md:text-left">
                              {booking?.Member}
                            </h1>
                          </div>
                          <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                            <h1 className="text-xl font-bold text-center md:text-left">
                              Station
                            </h1>
                            <h2 className="text-lg  text-center md:text-left">
                              {booking?.BookingStation}
                            </h2>
                          </div>
                          <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                            <h1 className="text-xl font-bold text-center md:text-left">
                              Booking Date
                            </h1>
                            <p className="text-lg  text-center md:text-left">
                              {booking?.BookingDate &&
                                new Date(
                                  booking.BookingDate
                                ).toLocaleDateString("en-US")}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-around">
                          <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                            <h1 className="text-xl font-bold text-center md:text-left">
                              Expiry Date
                            </h1>
                            <p className="text-lg  text-center md:text-left">
                              {booking?.ExpiryDate &&
                                new Date(booking.ExpiryDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                            </p>
                          </div>
                          <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                            <h1 className="text-xl font-bold text-center md:text-left">
                              Booking Time
                            </h1>
                            <h1 className="text-lg  text-center md:text-left">
                              {booking?.BookingTime
                                ? new Date(
                                    `2023-12-21T${booking.BookingTime}:00.000+05:00`
                                  ).toLocaleTimeString("en-PK", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                : "Not available"}
                            </h1>
                          </div>
                          <div className="flex flex-col w-40 h-14 border-b-2 border-orange md:border-b-0">
                            <h1 className="text-xl font-bold text-center md:text-left">
                              Expiry Time
                            </h1>
                            <h1 className="text-lg  text-center md:text-left">
                              {booking?.ExpiryTime
                                ? new Date(
                                    `2023-12-21T${booking.ExpiryTime}:00.000+05:00`
                                  ).toLocaleTimeString("en-PK", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                : "Not available"}
                            </h1>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="w-full flex gap-3 mt-3">
                      <button
                        className=" bg-orange hover:bg-orangeDark text-white font-bold p-2 w-full text-center"
                        onClick={() => handleToggleDetails(index)}
                      >
                        {expandedIndex === index
                          ? "Less Details"
                          : "View Details"}
                      </button>
                      <button
                        className={`${
                          booking.status === 1 ? "block" : "hidden"
                        } bg-green-500 hover:bg-green-600 text-white font-bold p-2 w-full text-center`}
                        onClick={() => setShowQr(true)}
                      >
                        QR Code
                      </button>
                    </div>
                    {showQr && booking.status === 1 && (
                      <QrCode
                        booking={booking}
                        showQr={showQr}
                        setShowQr={setShowQr}
                      />
                    )}
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
