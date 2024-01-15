import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiUrl } from "../../config";
import { toast } from "react-toastify";
import Spinner from "../../Loader/Spinner";
import { useNavigate } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";

const NewBooking = ({ toggleModal, setNewBookingModalOpen, fetchData }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showReceipt, setShowReceipt] = useState(false);
  const [stations, setStations] = useState([])
  const [BookingData, setBookingData] = useState({
    // Name: userData?.firstName,
    // ContactNo: userData?.mobileNo,
    ReservationType: "",
    BookingDate: "",
    ExpiryDate: "",
    BookingTime: "",
    ExpiryTime: "",
    Station: "",
  });

  const currentDate = new Date().toISOString().split("T")[0];

 

  const workspaces = [
    "Conference Room",
    "Dedicated Desk",
    "Hot Desk",
    "Meeting Room",
    "Private Office",
  ];

  const [errors, setErrors] = useState({
    // Name: "",
    // ContactNo: "",
    ReservationType: "",
    BookingDate: "",
    ExpiryDate: "",
    BookingTime: "",
    ExpiryTime: "",
    Station: "",
  });
  const [loading, setLoading] = useState(false);

  // const nameRegex = /^[a-zA-Z\s]+$/;
  // const contactNoRegex = /^03\d{2}-\d{7}$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const stationRegex = /^[a-zA-Z\s]+$/;

  // Validation function
  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      // case "Name":
      //   return nameRegex.test(value.trim());
      // case "ContactNo":
      //   return contactNoRegex.test(value);
      case "BookingDate":
      case "ExpiryDate":
        return dateRegex.test(value);
      case "BookingTime":
      case "ExpiryTime":
        return timeRegex.test(value);
      case "Station":
        return stationRegex.test(value.trim());
      case "ReservationType":
        return stationRegex.test(value.trim());
      default:
        return true;
    }
  };

  const handleValidation = () => {
    let isValid = true;
    const newErrors = { ...errors };

    for (const field in BookingData) {
      if (!validateInput(field, BookingData[field])) {
        newErrors[field] = "This Field is Required";
        isValid = false;
      } else {
        newErrors[field] = "";
      }
    
      // Custom validation logic for ExpiryTime based on BookingDate and ExpiryDate
      if (field === "ExpiryTime" && BookingData.BookingDate === BookingData.ExpiryDate) {
        const bookingTimeParts = BookingData.BookingTime.split(":");
        const expiryTimeParts = BookingData.ExpiryTime.split(":");
        
        const bookingTime = parseInt(bookingTimeParts[0]) * 60 + parseInt(bookingTimeParts[1]);
        const expiryTime = parseInt(expiryTimeParts[0]) * 60 + parseInt(expiryTimeParts[1]);
    
        if (expiryTime <= bookingTime + 59) {
          newErrors[field] = "Minimun Booking is 1 Hour";
          isValid = false;
        }
      }
    }
    

    setErrors(newErrors);
    return isValid;
  };

  function handleChange(evt) {
    const { name, value } = evt.target;

    setBookingData({
      ...BookingData,
      [name]: value,
    });
  }

  const [userData, setUserData] = useState();

  const fetchBioData = async (userEmail, bioData) => {
    try {
      const response = await fetch(`${apiUrl}/bio?email=${userEmail}`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(bioData)) {
        setUserData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchStation = async ( bioData) => {
    try {
      const response = await fetch(`${apiUrl}/GetStations`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(bioData)) {
        setStations(data);
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchBioData(user.email, userData);
    fetchStation()
  }, [user.email, userData]);

  const handleCheckoutModal = () => {
    setShowReceipt(!showReceipt);
  };

  const SubmitBookingData = async (e) => {
    e.preventDefault();

    const isFormValid = handleValidation();

    if (isFormValid) {
      console.log(userData);

      try {
        setLoading(true);
        const response = await fetch(
          `${apiUrl}/bookings?userEmail=${user.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // Name: BookingData.Name,
              // ContactNo: BookingData.ContactNo,
              ReservationType: BookingData.ReservationType,
              BookingDate: BookingData.BookingDate,
              ExpiryDate: BookingData.ExpiryDate,
              BookingTime: BookingData.BookingTime,
              ExpiryTime: BookingData.ExpiryTime,
              BookingStation: BookingData.Station,
            }),
          }
        );
        fetchData();
        if (response.ok) {
          toast.success("Slot Booked Successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "light",
          });
          setLoading(false);
          setNewBookingModalOpen(false);

          setBookingData({
            // Name: "",
            // ContactNo: "",
            ReservationType: "",
            BookingDate: "",
            ExpiryDate: "",
            BookingTime: "",
            ExpiryTime: "",
            Station: "",
          });
          navigate("/dashboard/booking-history");
        }
      } catch (error) {
        toast.error(error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
        setLoading(false);
      }
    }
  };
  return (
    <>
      <div
        className="w-full z-50 h-screen fixed top-0 left-0 bg-gray-600 backdrop-blur-sm bg-opacity-50"
        onClick={() => setNewBookingModalOpen(false)}
      ></div>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                New Booking
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={SubmitBookingData}>
              <div className="grid gap-x-5 mb-4 grid-cols-2">
                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col ">
                  <label
                    htmlFor="Name"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    value={userData?.firstName || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="mobileNo"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Contact No
                  </label>
                  <input
                    type="text"
                    name="mobileNo"
                    id="mobileNo"
                    readOnly
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    value={userData?.mobileNo || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="reservationType"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Reservation Type
                  </label>
                  <select
                    name="ReservationType"
                    id="reservationType"
                    value={BookingData.ReservationType}
                    onChange={handleChange}
                    onFocus={() =>
                      setErrors({ ...errors, ReservationType: "" })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                  >
                    <option value="">Select Your Reservation Type</option>
                    {workspaces.map((space, index) => (
                      <option key={index} value={space}>
                        {space}
                      </option>
                    ))}
                  </select>
                  {errors.ReservationType && (
                    <p className="text-[#fa0505] text-sm pl-2">
                      {errors.ReservationType}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="station"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Chapter
                  </label>
                  <select
                    name="Station"
                    id="station"
                    value={BookingData.Station}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, Station: "" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                  >
                    <option value="">Select Your Chapter</option>
                    {stations?.map((station, index) => (
                      <option key={index} value={station.Chapter}>
                        {station.Chapter}
                      </option>
                    ))}
                  </select>
                  {errors.Station && (
                    <p className="text-[#fa0505] text-sm pl-2">
                      {errors.Station}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="dateFrom"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Date From
                  </label>
                  <input
                    type="date"
                    name="BookingDate"
                    value={BookingData.BookingDate}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, BookingDate: "" })}
                    id="dateFrom"
                    min={currentDate}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                  />
                  {errors.BookingDate && (
                    <p className="text-[#fa0505] text-sm pl-2">
                      {errors.BookingDate}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="dateTo"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Date To
                  </label>
                  <input
                    type="date"
                    name="ExpiryDate"
                    id="dateTo"
                    min={BookingData.BookingDate}
                    value={BookingData.ExpiryDate}
                    onChange={handleChange}
                    disabled={!BookingData.BookingDate}
                    onFocus={() => setErrors({ ...errors, ExpiryDate: "" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                  />
                  {errors.ExpiryDate && (
                    <p className="text-[#fa0505] text-sm pl-2">
                      {errors.ExpiryDate}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="timeFrom"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Time From
                  </label>
                  <input
                    type="time"
                    name="BookingTime"
                    id="timeFrom"
                    value={BookingData.BookingTime}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, BookingTime: "" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                  />
                  {errors.BookingTime && (
                    <p className="text-[#fa0505] text-sm pl-2">
                      {errors.BookingTime}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <div>
                    <label
                      htmlFor="timeTo"
                      className="block  text-sm font-medium text-gray-900 "
                    >
                      Time To
                    </label>
                    <input
                      type="time"
                      name="ExpiryTime"
                      id="timeTo"
                      value={BookingData.ExpiryTime}
                      onChange={handleChange}
                      disabled={!BookingData.BookingTime}
                      onFocus={() => setErrors({ ...errors, ExpiryTime: "" })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                    />
                  </div>
                  {errors.ExpiryTime && (
                    <p className="text-[#fa0505] text-sm pl-2">
                      {errors.ExpiryTime}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-between">
                <button
                  className="rounded-lg bg-green-500 hover:bg-green-700 hover:underline py-3 px-8 text-center text-base font-bold text-white outline-none focus:shadow-lg shadow-sm shadow-orange"
                  type="button"
                  disabled={Object.values(BookingData).some((value) => !value)}
                  onClick={() => setShowReceipt(!showReceipt)}
                >
                  Payment
                </button>
                <button
                  className="rounded-lg bg-orange hover:bg-orangeDark hover:underline py-3 px-8 text-center text-base font-bold text-white outline-none focus:shadow-lg shadow-sm shadow-orange"
                  type="submit"
                >
                  {loading ? <Spinner size={30} /> : "Submit"}
                </button>
              </div>
              {showReceipt && (
                <CheckoutModal
                  toggleModal={handleCheckoutModal}
                  setShowReceipt={setShowReceipt}
                  BookingData={BookingData}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBooking;
