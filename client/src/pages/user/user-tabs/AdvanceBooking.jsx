import React from "react";

export default function AdvanceBooking() {
  return (
    <div className=" flex flex-col md:flex-row ">
      <div
        className="w-full  md:w-1/3 flex justify-center items-center py-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
<button className="p-5 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">Advance Booking</button>
      </div>
      <div className="w-full   md:w-2/3 border-2 border-orange">
        <form action="" method="POST" className="px-5 py-10">
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
                  name="fName"
                  id="fName"
                  placeholder="First Name"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
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
                  name="mobile"
                  id="mobile"
                  placeholder="XXXX-XXXXXXX"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="px-3 mb-5">
            <label
              htmlFor="guest"
              className="mb-3 block text-base font-bold "
            >
              How many guest are you bringing?
            </label>
            <input
              type="number"
              name="guest"
              id="guest"
              placeholder="5"
              min="0"
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className=" flex flex-wrap">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5 ">
                <label
                  htmlFor="date"
                  className="mb-3 block text-base font-bold "
                >
                  Date From
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5">
              <label
                  htmlFor="date"
                  className="mb-3 block text-base font-bold "
                >
                  Date To
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className=" flex flex-wrap">
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5">
              <label
                  htmlFor="time"
                  className="mb-3 block text-base font-bold "
                >
                  Time From
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full px-3 md:w-1/2">
              <div className="mb-5">
                <label
                  htmlFor="time"
                  className="mb-3 block text-base font-bold "
                >
                  Time To
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="mb-5 px-3">
            <label className="mb-3 block text-base font-bold ">
              Payment
            </label>
            <div className="flex items-center">
              
              Advance Payment
            </div>
          </div>

          <div className="flex justify-center">
            <button className="  rounded-lg bg-orange hover:bg-orangeDark hover:underline py-3 px-8 text-center text-base font-bold text-white outline-none">
              Submit
            </button>
          </div>
        </form> 
      </div>
    </div>
  );
}
