import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function AdvanceBooking() {
  const stations = [
    "Rawalpindi",
    "Lahore",
    "Karachi",
    "Islamabad",
    "Faisalabad",
  ];
  const [errors, setErrors] = useState({
    Fullname: "",
    ContactNo: "",
    Member: "",
    BookingDate: "",
    ExpiryDate: "",
    BookingTime: "",
    ExpiryTime: "",
    Station: "",
  });

  const nameRegex = /^[a-zA-Z\s]+$/;
  const contactNoRegex = /^\d{11}$/;
  const numberRegex = /^\d+$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const stationRegex = /^[a-zA-Z\s]+$/;

  // Validation function
  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "Fullname":
        return nameRegex.test(value.trim());
      case "ContactNo":
        return contactNoRegex.test(value);
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

  // Validation handler for form submission
  const handleValidation = () => {
    let isValid = true;
    const newErrors = { ...errors };
    for (const field in BookingData) {
      if (!validateInput(field, BookingData[field])) {
        newErrors[field] = `Invalid ${field}`;
        isValid = false;
      } else {
        newErrors[field] = "";
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const [BookingData, setBookingData] = useState({
    Fullname: "",
    ContactNo: "",
    Member: "",
    BookingDate: "",
    ExpiryDate: "",
    BookingTime: "",
    ExpiryTime: "",
    Station: "",
  });
  const { user } = useContext(AuthContext);

  function handleChange(evt) {
    const value = evt.target.value;
    setBookingData({
      ...BookingData,
      [evt.target.name]: value,
    });
  }
  const SubmitBookingData = async (e) => {
    e.preventDefault();

    const isFormValid = handleValidation();

    if (isFormValid) {
      console.log("Data to be sent:", BookingData);

    try {
      const response = await fetch(
        `http://192.168.100.53:8080/api/bookings?userEmail=${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FullName: BookingData.Fullname,
            ContactNo: BookingData.ContactNo,
            Member: BookingData.Member,
            BookingDate: BookingData.BookingDate,
            ExpiryDate: BookingData.ExpiryDate,
            BookingTime: BookingData.BookingTime,
            ExpiryTime: BookingData.ExpiryTime,
            BookingStation: BookingData.Station,
          }),
        }
      );

      setBookingData({
        Fullname: "",
        ContactNo: "",
        Member: "",
        BookingDate: "",
        ExpiryDate: "",
        BookingTime: "",
        ExpiryTime: "",
        Station: "",
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  }
  };

  return (
    <div className=" flex flex-col md:flex-row ">
      <div
        className="w-full  md:w-1/3 flex justify-center items-center py-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <button className="p-5 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">
          Advance Booking
        </button>
      </div>
      <div className="w-full   md:w-2/3 border-2 border-orange">
        <form className="px-5 py-10" onSubmit={SubmitBookingData}>
          <div className="flex flex-wrap">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="fName"
                  className="mb-3 block text-base font-bold "
                >
                  Name
                </label>
                <input
                  type="text"
                  name="Fullname"
                  id="fName"
                  placeholder="Name"
                  value={BookingData.Fullname}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, Fullname: '' })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.Fullname && (
                  <p className="text-red-500">{errors.Fullname}</p>
                )}
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="lName"
                  className="mb-3 block text-base font-bold "
                >
                  Contact No
                </label>
                <input
                  type="numeric"
                  name="ContactNo"
                  id="mobile"
                  value={BookingData.ContactNo}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, ContactNo: '' })}
                  placeholder="XXXXXXXXXXX"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.ContactNo && (
                  <p className="text-red-500">{errors.ContactNo}</p>
                )}
              </div>
            </div>
          </div>
          <div className=" flex flex-wrap">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5 ">
                <label
                  htmlFor="members"
                  className="mb-3 block text-base font-bold "
                >
                  How many members are you bringing?
                </label>
                <input
                  type="number"
                  name="Member"
                  id="members"
                  placeholder="5"
                  value={BookingData.Member}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, Member: '' })}
                  min="0"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.Member && (
                  <p className="text-red-500">{errors.Member}</p>
                )}
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="station"
                  className="mb-3 block text-base font-bold "
                >
                  Station
                </label>
                <select
                  name="Station"
                  id="station"
                  value={BookingData.Station}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, Station: '' })}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                  <option value="">Select Your Station</option>
                  {stations.map((station, index) => (
                    <option key={index} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
                {errors.Station && (
                  <p className="text-red-500">{errors.Station}</p>
                )}
              </div>
            </div>
          </div>

          <div className=" flex flex-wrap">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5 ">
                <label
                  htmlFor="dateFrom"
                  className="mb-3 block text-base font-bold "
                >
                  Date From
                </label>
                <input
                  type="date"
                  name="BookingDate"
                  value={BookingData.BookingDate}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, BookingDate: '' })}
                  id="dateFrom"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.BookingDate && (
                  <p className="text-red-500">{errors.BookingDate}</p>
                )}
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="dateTo"
                  className="mb-3 block text-base font-bold "
                >
                  Date To
                </label>
                <input
                  type="date"
                  name="ExpiryDate"
                  id="dateTo"
                  value={BookingData.ExpiryDate}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, ExpiryDate: '' })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.ExpiryDate && (
                  <p className="text-red-500">{errors.ExpiryDate}</p>
                )}
              </div>
            </div>
          </div>

          <div className=" flex flex-wrap">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="timeFrom"
                  className="mb-3 block text-base font-bold "
                >
                  Time From
                </label>
                <input
                  type="time"
                  name="BookingTime"
                  id="timeFrom"
                  value={BookingData.BookingTime}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, BookingTime: '' })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.BookingTime && (
                  <p className="text-red-500">{errors.BookingTime}</p>
                )}
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="timeTo"
                  className="mb-3 block text-base font-bold "
                >
                  Time To
                </label>
                <input
                  type="time"
                  name="ExpiryTime"
                  id="timeTo"
                  value={BookingData.ExpiryTime}
                  onChange={handleChange}
                  onFocus={() => setErrors({ ...errors, ExpiryTime: '' })}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
                {errors.ExpiryTime && (
                  <p className="text-red-500">{errors.ExpiryTime}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-5 px-3">
            <label className="mb-3 block text-base font-bold ">Payment</label>
            <div className="flex items-center">Advance Payment</div>
          </div>

          <div className="flex justify-center">
            <button
              className="rounded-lg bg-orange hover:bg-orangeDark hover:underline py-3 px-8 text-center text-base font-bold text-white outline-none "
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
