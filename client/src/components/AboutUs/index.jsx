import React from "react";
import { AiFillBank, AiFillSecurityScan,AiFillSketchCircle,AiFillTrophy,AiOutlineAreaChart,AiOutlineDribbbleSquare,AiOutlineCrown,AiOutlineDeploymentUnit } from "react-icons/ai";
export default function LearnMore() {
  return (
    <div className="w-full flex justify-center bg-[#f2f3f7] pb-10">
      <div className="max-w-screen-xl w-full pt-10 px-8 xl:px-0">
        <div className="flex justify-between">
          <h1>02 WHY CHOOSE US</h1>
          <button>FOLLOW US</button>
        </div>
        <div className="flex flex-col items-center text-center pt-10 lg:pt-28 ">
          <h1 className="text-[#4e3cc8]">LEARN AND GROW</h1>
          <h1 className="pt-6 text-4xl font-bold lg:text-7xl">Our Amenities</h1>
          <div className="flex justify-center pt-10">
            <div className="w-2 h-2  rounded-full bg-[#4e3cc8]"></div>
            <div className="w-2 h-2 ml-2 rounded-full bg-[#4e3cc8]"></div>
            <div className="w-2 h-2  ml-2 rounded-full bg-[#4e3cc8]"></div>
          </div>
          <p className="pt-10 text-[#a2a3a8] max-w-lg">
            A 2007 survey showed that many employees worry about feeling
            isolated and losing human interaction if they were to telecommute.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          <div className="bg-[#ffffff] flex flex-col items-center justify-center p-12">
            <AiFillBank size={96} />
            <h1 className="pt-4">MODERN DESIGN</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center p-12">
            <AiFillSecurityScan size={96} />
            <h1 className="pt-4">FREE FAST INTERNET</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center p-12">
            <AiFillSketchCircle size={96} />
            <h1 className="pt-4">GROUP EVENTS</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center p-12">
            <AiFillTrophy size={96} />
            <h1 className="pt-4">OFFICE SUPPLIES</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center p-12">
            <AiOutlineAreaChart size={96} />
            <h1 className="pt-4">FREE PARKING</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center p-12">
            <AiOutlineDribbbleSquare size={96} />
            <h1 className="pt-4">COFFEE SHOP</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center p-12">
            <AiOutlineCrown size={96} />
            <h1 className="pt-4">CONFERENCE ROOMS</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center p-12">
            <AiOutlineDeploymentUnit size={96} />
            <h1 className="pt-4">RELAX ROOM</h1>
          </div>
        
        </div>
        <div className="flex justify-center">
        <button className="px-10 py-4 bg-[#4e3cc8] mt-10 text-white lg:mt-14 lg:text-white">
          More About Us
        </button>
        </div>
      </div>
    </div>
  );
}
