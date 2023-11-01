import React from "react";

export default function Packages() {
  return (
    <div className="w-full flex justify-center bg-bgGray">
      <div className="max-w-screen-xl">
        <div className="flex flex-col items-center text-center pt-10 lg:pt-20 gap-8">
          {/* <h2 className="text-yellow font-bold uppercase text-lg">
            LEARN AND GROW
          </h2> */}
          <h1 className="text-4xl font-bold lg:text-6xl text-darkGray">
            Pricing Table
          </h1>
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
          </div>
          {/* <p className=" text-textGray max-w-lg">
            A 2007 survey showed that many employees worry about feeling
            isolated and losing human interaction if they were to telecommute.
          </p> */}
        </div>

        <div className="my-10 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-8 justify-center items-center ">
          <div className=" rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white">
            <div className="py-8 text-2xl font-bold leading-tight text-center uppercase text-white bg-slate-700">
              Private Office
            </div>
            <div className="pt-6 px-10 font-bold leading-tight text-center  ">
              <h1 className="text-7xl pb-3 text-purple-700">$ 199</h1>
              <p className="text-xl pb-6 border-b-2 text-darkGray"> per Month</p>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">1</span>
                <span className="pl-4 text-xl">24/7 Access (Unlimited)</span>
              </h1>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">2</span>
                <span className="pl-4 text-xl">Meeting Room Time</span>
              </h1>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">3</span>
                <span className="pl-4 text-xl">Access to All Amenities</span>
              </h1>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">4</span>
                <span className="pl-4 text-xl">Print Credit</span>
              </h1>
            </div>
            <div className="py-8 text-md font-semibold leading-tight text-center uppercase">
              <button className="py-4 px-8 text-white bg-yellow hover:bg-yellowDark">
                Reserve Now
              </button>
            </div>
          </div>

          <div className=" rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white">
            <div className="py-8 text-2xl font-bold leading-tight text-center uppercase text-white bg-slate-700">
              Hot Desk
            </div>
            <div className="pt-6 px-10 font-bold leading-tight text-center  ">
              <h1 className="text-7xl pb-3 text-purple-700">$ 799</h1>
              <p className="text-xl pb-6 border-b-2 text-darkGray"> per Month</p>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">1</span>
                <span className="pl-4 text-xl">24/7 Access (Unlimited)</span>
              </h1>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">2</span>
                <span className="pl-4 text-xl">Meeting Room Time</span>
              </h1>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">3</span>
                <span className="pl-4 text-xl">Access to All Amenities</span>
              </h1>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">4</span>
                <span className="pl-4 text-xl">Print Credit</span>
              </h1>
            </div>
            <div className="py-8 text-md font-semibold leading-tight text-center uppercase">
              <button className="py-4 px-8 text-white bg-yellow hover:bg-yellowDark">
                Reserve Now
              </button>
            </div>
          </div>

          <div className=" rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-white">
            <div className="py-8 text-2xl font-bold leading-tight text-center uppercase text-white bg-slate-700">
              Conference Room
            </div>
            <div className="pt-6 px-10 font-bold leading-tight text-center  ">
              <h1 className="text-7xl pb-3 text-purple-700">$ 49</h1>
              <p className="text-xl pb-6 border-b-2 text-darkGray"> per Hour</p>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">1</span>
                <span className="pl-4 text-xl">24/7 Access (Unlimited)</span>
              </h1>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">2</span>
                <span className="pl-4 text-xl">Meeting Room Time</span>
              </h1>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">3</span>
                <span className="pl-4 text-xl">Access to All Amenities</span>
              </h1>
            </div>
            <div className="pt-4 px-10    ">
              <h1 className="text-xl pl-5 pb-5 border-b-2">
                <span className="font-bold text-3xl text-darkGray">4</span>
                <span className="pl-4 text-xl">Print Credit</span>
              </h1>
            </div>
            <div className="py-8 text-md font-semibold leading-tight text-center uppercase">
              <button className="py-4 px-8 text-white bg-yellow hover:bg-yellowDark">
                Reserve Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
