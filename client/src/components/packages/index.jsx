import React from "react";

export default function Packages() {
  return (
    <div className="w-full flex justify-center bg-bgGray font-roboto">
      <div className="max-w-screen-xl">
        <div className="flex flex-col items-center text-center pt-10 lg:pt-20 gap-8">
          <h1 className="text-4xl font-bold lg:text-6xl text-darkGray">
            Pricing Table
          </h1>
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-orange rounded-full"></div>
            <div className="w-2 h-2 bg-orange rounded-full"></div>
            <div className="w-2 h-2 bg-orange rounded-full"></div>
          </div>
        </div>

        <div className="my-10 px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-8 justify-center items-start ">
          <div className=" rounded-lg bg-white shadow-sm shadow-orange">
            <div className="py-8 text-2xl font-bold leading-tight text-center uppercase text-white bg-slate-700">
              Standard
            </div>
            <div className="pt-3 px-5 font-bold leading-tight text-center  ">
              <h1 className="text-4xl   text-orange">Rs 2,000</h1>
              <p className="text-xl py-3 border-b-2 text-darkGray"> per Day</p>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">1</span>
                <span className="pl-4 text-lg md:text-xl">24/7 Access (Unlimited)</span>
              </h1>
            </div>

            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">2</span>
                <span className="pl-4 text-lg md:text-xl">Meeting Room Time</span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">3</span>
                <span className="pl-4 text-lg md:text-xl">Limited Amenities</span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">4</span>
                <span className="pl-4 text-lg md:text-xl">Seats</span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">5</span>
                <span className="pl-4 text-lg md:text-xl">9 AM - 5 PM </span>
              </h1>
            </div>
            <div className="py-8 text-md font-semibold leading-tight text-center uppercase">
              <button className="py-4 px-8 text-white bg-orange hover:bg-orangeDark">
                Reserve Now
              </button>
            </div>
          </div>

          <div className=" rounded-lg shadow-sm shadow-orange bg-white">
            <div className="py-8 text-2xl font-bold leading-tight text-center uppercase text-white bg-slate-700">
              plus
            </div>
            <div className="pt-3 px-5 font-bold leading-tight text-center  ">
              <h1 className="text-4xl text-orange">Rs 20,000</h1>
              <p className="text-xl py-3 border-b-2 text-darkGray">
                {" "}
                per Month
              </p>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">1</span>
                <span className="pl-4 text-lg md:text-xl">24/7 Access (Unlimited)</span>
              </h1>
            </div>

            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">2</span>
                <span className="pl-4 text-lg md:text-xl"> Specific Meeting Room </span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">3</span>
                <span className="pl-4 text-lg md:text-xl">All Amenities</span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">4</span>
                <span className="pl-4 text-lg md:text-xl">
                  Coffee <span className="font-bold text-2xl">&</span> Tea{" "}
                </span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">5</span>
                <span className="pl-4 text-lg md:text-xl">
                  9 AM - 2 AM
                </span>
              </h1>
            </div>
            <div className="py-8 text-md font-semibold leading-tight text-center uppercase">
              <button className="py-4 px-8 text-white bg-orange hover:bg-orangeDark">
                Reserve Now
              </button>
            </div>
          </div>

          <div className=" rounded-lg shadow-sm shadow-orange bg-white">
            <div className="py-8 text-2xl font-bold leading-tight text-center uppercase text-white bg-slate-700">
              premium
            </div>
            <div className="pt-3 px-5 font-bold leading-tight text-center  ">
              <h1 className="text-4xl text-orange">Rs 30,000</h1>
              <p className="text-xl py-3 border-b-2 text-darkGray">
                {" "}
                per Month
              </p>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">1</span>
                <span className="pl-4 text-lg md:text-xl">24/7 Access (Unlimited)</span>
              </h1>
            </div>

            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">2</span>
                <span className="pl-4 text-lg md:text-xl"> Work Stations </span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">3</span>
                <span className="pl-4 text-lg md:text-xl">All Amenities</span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">4</span>
                <span className="pl-4 text-lg md:text-xl">
                  Coffee <span className="font-bold text-2xl">&</span> Tea{" "}
                </span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">5</span>
                <span className="pl-4 text-lg md:text-xl">9 AM - 2 AM </span>
              </h1>
            </div>
            <div className="pt-2 px-5 md:px-10 ">
              <h1 className=" pl-5 pb-2 border-b-2 flex items-center">
                <span className="font-bold text-2xl md:text-3xl text-darkGray">6</span>
                <span className="pl-4  text-lg md:text-xl">
                  Conference Room
                </span>
              </h1>
            </div>
            <div className="py-8 text-md font-semibold leading-tight text-center uppercase">
              <button className="py-4 px-8 text-white bg-orange hover:bg-orangeDark">
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
