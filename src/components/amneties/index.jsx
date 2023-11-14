import React from "react";

import modernDesign from "../../assets/icons/work-table.png";
import fastInternet from "../../assets/icons/router.png";
import groupEvents from "../../assets/icons/inspiration.png";
import officeSupplies from "../../assets/icons/printer.png";
import freeParking from "../../assets/icons/parking.png";
import coffeeShop from "../../assets/icons/coffee-shop.png";
import conferenceRoom from "../../assets/icons/conference.png";
import relaxRoom from "../../assets/icons/gaming.png";

export default function Amenities() {
  return (
    <div className="w-full flex justify-center bg-[#f2f3f7] pb-10">
      <div className="max-w-screen-xl w-full pt-10 px-4 sm:px-8 xl:px-0">
        {/* <div className="flex justify-between">
          <h1>02 WHY CHOOSE US</h1>
          <button>FOLLOW US</button>
        </div> */}
        <div className="flex flex-col items-center text-center pt-10 lg:pt-20 gap-8">
          <h2 className="text-orange font-bold uppercase text-lg">
            LEARN AND GROW
          </h2>
          <h1 className="text-4xl font-bold lg:text-6xl text-darkGray">
            Our Amenities
          </h1>
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2bg-orange rounded-full"></div>
            <div className="w-2 h-2bg-orange rounded-full"></div>
            <div className="w-2 h-2bg-orange rounded-full"></div>
          </div>
          <p className=" text-textGray max-w-lg">
          Remote work definitely offers flexibility, but it can also bring about side effects, including feelings of isolation and a reduced level of in-person social interaction.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 mt-10">
          <div className="bg-[#ffffff] flex flex-col items-center justify-center py-12">
            <img src={modernDesign} alt="modern design" className="w-14 md:w-20" />
            <h1 className="text-center pt-4 font-semibold">MODERN DESIGN</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center py-12">
            <img src={fastInternet} alt="modern design" className="w-14 md:w-20" />
            <h1 className="text-center pt-4 font-semibold">FREE FAST INTERNET</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center py-12">
            <img src={groupEvents} alt="modern design" className="w-14 md:w-20" />
            <h1 className="text-center pt-4 font-semibold">GROUP EVENTS</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center py-12">
            <img src={officeSupplies} alt="modern design" className="w-14 md:w-20" />
            <h1 className="text-center pt-4 font-semibold">OFFICE SUPPLIES</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center py-12">
            <img src={freeParking} alt="modern design" className="w-14 md:w-20" />
            <h1 className="text-center pt-4 font-semibold">FREE PARKING</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center py-12">
            <img src={coffeeShop} alt="modern design" className="w-14 md:w-20" />
            <h1 className="text-center pt-4 font-semibold">COFFEE SHOP</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center py-12">
            <img src={conferenceRoom} alt="modern design" className="w-14 md:w-20" />
            <h1 className="text-center pt-4 font-semibold">CONFERENCE ROOMS</h1>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-center justify-center py-12">
            <img src={relaxRoom} alt="modern design" className="w-14 md:w-20" />
            <h1 className="text-center pt-4 font-semibold">RELAX ROOM</h1>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="px-10 py-4 bg-orange hover:bg-orangeDark mt-10 text-white lg:mt-14 lg:text-white">
            More About Us
          </button>
        </div>
      </div>
    </div>
  );
}
