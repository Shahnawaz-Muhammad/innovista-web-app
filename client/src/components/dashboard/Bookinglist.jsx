import React, { useState } from "react";
import { GoDotFill } from "react-icons/go";
import NewBooking from "./NewBooking";
import { GoPlus } from "react-icons/go";

const Bookinglist = ({ BookingData, fetchData }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleNewBookingModal = () => {
    setNewBookingModalOpen(!newBookingModalOpen);
  };

  const itemsPerPage = 10;

  const handleOptionsToggle = (index) => {
    setShowMoreOptions((prevShowOptions) =>
      prevShowOptions === index ? null : index
    );
  };

  const filteredData = BookingData.filter((booking) =>
    Object.values(booking).some((field) =>
      String(field).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  return (
    <section className="  p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="">
            <h1 className="text-orange text-3xl  font-bold p-5">
              Booking History
            </h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 ">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange focus:border-orange block w-full pl-10 p-2  "
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required=""
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                onClick={() => setNewBookingModalOpen(!newBookingModalOpen)}
                type="button"
                className="flex items-center justify-center gap-2 text-white bg-orange hover:bg-orangeDark focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none"
              >
                <GoPlus className="text-xl" />
                New Booking
              </button>
              <div className="flex items-center space-x-3 w-full md:w-auto relative">
                <button
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700  "
                  type="button"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-4 w-4 mr-2 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Filter
                  <svg
                    className="-mr-1 ml-1.5 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </button>
                {showFilter && (
                  <div className="absolute top-10 right-0 z-50 w-48 p-3 bg-white rounded-lg shadow ">
                    <h6 className="mb-3 text-sm font-medium text-gray-900 ">
                      Choose brand
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="filterDropdownButton"
                    >
                      <li className="flex items-center">
                        <input
                          id="apple"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                        />
                        <label
                          htmlFor="apple"
                          className="ml-2 text-sm font-medium text-gray-900 "
                        >
                          Apple (56)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="fitbit"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                        />
                        <label
                          htmlFor="fitbit"
                          className="ml-2 text-sm font-medium text-gray-900 "
                        >
                          Microsoft (16)
                        </label>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto  h-[calc(100vh-400px)]">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Chapter
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Reservation Type
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Booking Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Expiry Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Booking Time
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Expiry Time
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    ?.map((booking, index) => {
                      return (
                        <tr key={index} className="border-b ">
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {booking?.BookingStation}
                          </th>

                          <td className="px-4 py-3">
                            {booking?.ReservationType}
                          </td>

                          <td className="px-4 py-3">
                            {booking?.BookingDate &&
                              new Date(booking.BookingDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                          </td>
                          <td className="px-4 py-3">
                            {booking?.ExpiryDate &&
                              new Date(booking.ExpiryDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                }
                              )}
                          </td>
                          <td className="px-4 py-3">
                            {booking?.BookingTime &&
                              new Date(
                                `2023-12-21T${booking.BookingTime}:00.000+05:00`
                              ).toLocaleTimeString("en-PK", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                          </td>
                          <td className="px-4 py-3">
                            {" "}
                            {booking?.ExpiryTime &&
                              new Date(
                                `2023-12-21T${booking.ExpiryTime}:00.000+05:00`
                              ).toLocaleTimeString("en-PK", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                          </td>
                          <td className=" px-4 py-3">
                            <div className="flex items-center gap-3 ">
                              <GoDotFill className="text-green-500" />
                              Paid
                            </div>
                          </td>
                          <td className="px-4 py-3 flex items-center justify-end">
                            {/* <div className="relative"> */}
                              <button
                                onClick={() => handleOptionsToggle(index)}
                                className="relative inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none  dark:hover:text-gray-100"
                                type="button"
                              >
                                <svg
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                              {showMoreOptions === index && (
                                <div
                                  className={`absolute top-5 right-3 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow  dark:divide-gray-600`}
                                >
                                  <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 cursor-pointer   "
                                    aria-labelledby="apple-imac-27-dropdown-button"
                                  >
                                    <li>
                                      <button className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        Edit
                                      </button>
                                    </li>
                                  </ul>
                                  <div className="py-1 hover:bg-gray-100 cursor-pointer ">
                                    <button className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                              </button>
                            {/* </div> */}
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <div className="border-b ">
                    <h2 className="px-4 py-3 text-lg font-semibold">
                      No Bookings found
                    </h2>
                  </div>
                )}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500  flex gap-2">
              Showing
              <span className="font-semibold text-gray-900 ">1-10</span>
              of
              <span className="font-semibold text-gray-900 ">
                {BookingData?.length}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-gray-500 hover:text-gray-700"
                >
                  Previous
                </button>
              </li>
              <li>
                {[...Array(Math.ceil(BookingData.length / itemsPerPage))].map(
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`mx-2 px-3 py-1 text-gray-500 hover:text-gray-700 ${
                        currentPage === i + 1 ? "font-bold" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </li>

              <li>
                <button
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      Math.min(
                        prevPage + 1,
                        Math.ceil(BookingData.length / itemsPerPage)
                      )
                    )
                  }
                  disabled={
                    currentPage === Math.ceil(BookingData.length / itemsPerPage)
                  }
                  className="px-3 py-1 text-gray-500 hover:text-gray-700"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {newBookingModalOpen && (
        <NewBooking
          fetchData={fetchData}
          toggleModal={toggleNewBookingModal}
          setNewBookingModalOpen={setNewBookingModalOpen}
        />
      )}
    </section>
  );
};

export default Bookinglist;
