import React from "react";

const CheckoutModal = ({ open, onClose, BookingData }) => {
  //   const { user } = useContext(AuthContext);
  //   const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
  };

  return (
    <>
      <div className="w-full z-50 h-screen fixed top-0 left-0 bg-gray-600 backdrop-blur-sm bg-opacity-50"></div>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">Checkout</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={onClose}
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
            <div className="p-4 bg-gray-50 font-roboto">
              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between">
                  <h3>Station</h3>
                  <h3>{BookingData?.Station}</h3>
                </div>
                <div className="flex justify-between">
                  <h3>Reservation Type</h3>
                  <h3>{BookingData?.ReservationType}</h3>
                </div>
                <div className="flex justify-between">
                  <h3>Booking Date</h3>
                  <h3>
                    {BookingData?.BookingDate &&
                      new Date(BookingData.BookingDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <h3>Expiry Date</h3>
                  <h3>
                    {BookingData?.ExpiryDate &&
                      new Date(BookingData.ExpiryDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <h3>Booking Time</h3>
                  <h3>
                    {BookingData?.BookingTime &&
                      new Date(
                        `2023-12-21T${BookingData.BookingTime}:00.000+05:00`
                      ).toLocaleTimeString("en-PK", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <h3>Expiry Time</h3>
                  <h3>
                    {BookingData?.ExpiryTime &&
                      new Date(
                        `2023-12-21T${BookingData.ExpiryTime}:00.000+05:00`
                      ).toLocaleTimeString("en-PK", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </h3>
                </div>

                <div className="flex justify-between border-y py-2">
                  <h3 className="text-lg font-semibold">Total</h3>
                  <h3 className="text-lg font-semibold">$300</h3>
                </div>

                <div className="w-full flex justify-between mt-3">
                  <button
                    className="bg-gray-700 px-6 text-white py-2 rounded-lg"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="bg-orange px-6 text-white py-2 rounded-lg"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
