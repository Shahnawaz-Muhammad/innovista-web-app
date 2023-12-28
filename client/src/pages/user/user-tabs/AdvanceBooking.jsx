import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import bgMain from "../../../assets/images/bg-main.png";
import { apiUrl } from "../../../config";
import { toast } from "react-toastify";
import Spinner from "../../../Loader/Spinner";
import { useNavigate } from "react-router-dom";

export default function AdvanceBooking() {
  const { user } = useContext(AuthContext);
const navigate = useNavigate()
  const [BookingData, setBookingData] = useState({
    // Name: userData?.firstName,
    // ContactNo: userData?.mobileNo,
    Member: "",
    BookingDate: "",
    ExpiryDate: "",
    BookingTime: "",
    ExpiryTime: "",
    Station: "",
  });

  const currentDate = new Date().toISOString().split("T")[0];

  const stations = [
    "Rawalpindi",
    "Lahore",
    "Karachi",
    "Islamabad",
    "Faisalabad",
  ];
  const [errors, setErrors] = useState({
    // Name: "",
    // ContactNo: "",
    Member: "",
    BookingDate: "",
    ExpiryDate: "",
    BookingTime: "",
    ExpiryTime: "",
    Station: "",
  });
  const [loading,setLoading]=useState(false);

  // const nameRegex = /^[a-zA-Z\s]+$/;
  // const contactNoRegex = /^03\d{2}-\d{7}$/;
  const numberRegex = /^\d+$/;
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
      case "Member":
        return numberRegex.test(value);
      case "BookingDate":
      case "ExpiryDate":
        return dateRegex.test(value);
      case "BookingTime":
      case "ExpiryTime":
        return timeRegex.test(value);
      case "Station":
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
      if (
        field === "ExpiryTime" &&
        BookingData.BookingDate === BookingData.ExpiryDate
      ) {
        if (BookingData.ExpiryTime <= BookingData.BookingTime) {
          newErrors[field] = "Expiry time must be greater than Booking time";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/bio?email=${user.email}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (JSON.stringify(data) !== JSON.stringify(userData)) {
          setUserData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email, userData]);

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
              Member: BookingData.Member,
              BookingDate: BookingData.BookingDate,
              ExpiryDate: BookingData.ExpiryDate,
              BookingTime: BookingData.BookingTime,
              ExpiryTime: BookingData.ExpiryTime,
              BookingStation: BookingData.Station,
            }),
          }
        );
        if (response.ok) {
        toast.success("Slot Booked Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
        setLoading(false);

        setBookingData({
          // Name: "",
          // ContactNo: "",
          Member: "",
          BookingDate: "",
          ExpiryDate: "",
          BookingTime: "",
          ExpiryTime: "",
          Station: "",
        });
        navigate('/dashboard/booking-history')
      }} catch (error) {
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
    <div
      className=" flex flex-col absolute left-0 top-0 w-full "
      style={{
        backgroundImage: `url(${bgMain})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "absolute",
        top: "0",
        left: "0",
        // zIndex: "-1",
        // filter: "blur(1px)",
        // height: "100vh",
      }}
    >

      <div className="flex flex-col py-20  justify-center items-center ">
        <h1
          className="font-extrabold text-white text-3xl md:text-5xl p-5 "
          // style={{
          //   backdropFilter: "blur(1x)",
          //   background: "rgba(255, 255, 255, 0.3)",
          // }}
        >
          Advance Booking
        </h1>
        <form
          className="mb-10 w-full md:w-4/5 lg:w-2/3 p-5 rounded-lg "
          style={{
            backdropFilter: "blur(1x)",
            background: "rgba(255, 255, 255, 0.8)",
          }}
          onSubmit={SubmitBookingData}
        >
          <div className="flex  flex-wrap ">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-2 h-[5.5rem]">
                <label
                  htmlFor="Name"
                  className="pl-5 block text-base font-bold"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  readOnly
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-gray-300 py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-lg shadow-sm shadow-orange"
                  value={userData?.firstName || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-2 h-[5.5rem]">
                <label
                  htmlFor="mobileNo"
                  className="pl-5 block text-base font-bold"
                >
                  Contact No
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  id="mobileNo"
                  readOnly
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-gray-300 py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-lg shadow-sm shadow-orange"
                  value={userData?.mobileNo || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className=" flex flex-wrap">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-2 h-[5.5rem] ">
                <label
                  htmlFor="members"
                  className="pl-5 block text-base font-bold "
                >
                  Guests/Members
                </label>
                <input
                  type="number"
                  name="Member"
                  id="members"
                  placeholder="5"
                  value={BookingData.Member}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, Member: "" })}
                  min="0"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-lg shadow-sm shadow-orange"
                />
                {errors.Member && (
                  <p className="text-[#fa0505]  pl-2">{errors.Member}</p>
                )}
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-2 h-[5.5rem]">
                <label
                  htmlFor="station"
                  className="pl-5 block text-base font-bold "
                >
                  Station
                </label>
                <select
                  name="Station"
                  id="station"
                  value={BookingData.Station}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, Station: "" })}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-lg shadow-sm shadow-orange"
                >
                  <option value="">Select Your Station</option>
                  {stations.map((station, index) => (
                    <option key={index} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
                {errors.Station && (
                  <p className="text-[#fa0505]  pl-2">{errors.Station}</p>
                )}
              </div>
            </div>
          </div>

          <div className=" flex flex-wrap">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-2 h-[5.5rem] ">
                <label
                  htmlFor="dateFrom"
                  className="pl-5 block text-base font-bold "
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
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-lg shadow-sm shadow-orange"
                />
                {errors.BookingDate && (
                  <p className="text-[#fa0505]  pl-2">{errors.BookingDate}</p>
                )}
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-2 h-[5.5rem]">
                <label
                  htmlFor="dateTo"
                  className="pl-5 block text-base font-bold "
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
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-lg shadow-sm shadow-orange"
                />
                {errors.ExpiryDate && (
                  <p className="text-[#fa0505]  pl-2">{errors.ExpiryDate}</p>
                )}
              </div>
            </div>
          </div>

          <div className=" flex flex-wrap">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-2 h-[5.5rem]">
                <label
                  htmlFor="timeFrom"
                  className="pl-5 block text-base font-bold "
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
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-lg shadow-sm shadow-orange"
                />
                {errors.BookingTime && (
                  <p className="text-[#fa0505]  pl-2">{errors.BookingTime}</p>
                )}
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-2 h-[5.5rem]">
                <label
                  htmlFor="timeTo"
                  className="pl-5 block text-base font-bold"
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
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-lg shadow-sm shadow-orange"
                />
                {errors.ExpiryTime && (
                  <p className="text-[#fa0505]  pl-2">{errors.ExpiryTime}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end gap-5 mt-3 px-3">
            <button
              className="rounded-lg bg-green-500 hover:bg-green-700 hover:underline py-3 px-8 text-center text-base font-bold text-white outline-none focus:shadow-lg shadow-sm shadow-orange"
              type="button"
            >
              Payment
            </button>
            <button
              className="rounded-lg bg-orange hover:bg-orangeDark hover:underline py-3 px-8 text-center text-base font-bold text-white outline-none focus:shadow-lg shadow-sm shadow-orange"
              type="submit"
            >
              {loading ? <Spinner size={30}/> : "Submit"}
               
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
