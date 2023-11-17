import React from "react";

const Experience = () => {
  return (
    <div>
      <div className="flex lg:w-[30%] justify-between px-2">
        <h1 className="mt-3 font-bold">Total Experience Of Field</h1>
        <h1 className="text-4xl text-[#f99904]">
          12<span className="text-sm">years</span>
        </h1>
      </div>
      <div className="lg:w-[30%] h-0.5 mt-2 bg-[#e2e2e2]"></div>

      <h1 className="py-6 px-2 text-[#f99904] font-semibold">Mistry IT Company</h1>

    
      <div className="lg:grid grid-cols-3 px-2">
      
        <div className="flex col-span-1">
          <div className=" ">
            <p className="text-[#adadad] text-sm">Total Experience</p>
          </div>
          <div className=" px-10 lg:px-8 ">
            <h1 className="font-semibold">14 Month</h1>
            <p className="text-[#adadad] text-sm ">At Mistry IT</p>
          </div>
        </div>

        <div className="flex col-span-2">
          <div className=" ">
            <p className="text-[#adadad] text-sm">Start Date</p>
          </div>
          <div className=" px-20 lg:px-8  ">
            <h1 className="font-semibold">Start October 2022</h1>
            <p className="text-[#adadad] text-sm ">At Mistry IT</p>
          </div>
        </div>

        <div className="flex col-span-1 pt-8">
          <div className=" ">
            <p className="text-[#adadad] text-sm">Positions</p>
          </div>
          <div className="  px-20 lg:px-20 ">
            <h1 className="font-semibold">Senior Software Developer</h1>
            <p className="text-[#adadad] text-sm ">At Mistry IT</p>
          </div>
        </div>
        <div className="flex col-span-2 pt-8">
          <div className=" ">
            <p className="text-[#adadad] text-sm">End Date</p>
          </div>
          <div className="  px-20 lg:px-8  ">
            <h1 className="font-semibold">Continue</h1>
            <p className="text-[#adadad] text-sm ">At Mistry IT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
