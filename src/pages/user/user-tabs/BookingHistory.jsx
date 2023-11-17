import React from "react";

const BookingHistory = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-xl font-semibold">Recent Bookings</h1>
      <div className="w-full flex flex-col gap-3">
        <div className="border border-lightGray flex">
          <div className="w-1/3 md:w-1/5 flex flex-col gap-3 items-center justify-center bg-orange text-white">
            <h1 className="text-lg font-bold ">Jan 12</h1>
            <h1>1:20 PM</h1>
          </div>
          <div className="w-full flex flex-col px-3 lg:px-10 py-4 gap-2">
            <h2 className="text-lg font-semibold">D-LABS, Rawalpindi</h2>
            <p>Conference Room</p>
            <div className="w-full flex justify-end">
              <button className="bg-orange hover:bg-orangeDark px-3 py-1 text-white rounded-lg">
                Book Again
              </button>
            </div>
          </div>
        </div>

        <div className="border border-lightGray flex">
          <div className="w-1/3 md:w-1/5 flex flex-col gap-3 items-center justify-center bg-orange text-white">
            <h1 className="text-lg font-bold ">Jan 12</h1>
            <h1>1:20 PM</h1>
          </div>
          <div className="w-full flex flex-col px-3 lg:px-10 py-4 gap-2">
            <h2 className="text-lg font-semibold">D-LABS, Rawalpindi</h2>
            <p>Conference Room</p>
            <div className="w-full flex justify-end">
              <button className="bg-orange hover:bg-orangeDark px-3 py-1 text-white rounded-lg">
                Book Again
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default BookingHistory;
