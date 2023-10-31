import React from "react";
import { GiSmartphone } from "react-icons/gi";
import { BiBuildingHouse } from "react-icons/bi";
import { BsEnvelopeAt } from "react-icons/bs";

const ContactDetail = () => {
  return (
    <div
      className={`w-full z-20 flex justify-center text-bgLight mx-auto  bg-[#5543ca]`}
    >
      <div className="max-w-screen-xl w-full ">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 justify-center">
          <div className="w-full h-full flex justify-center items-center md:border-x flex-col text-white py-14 gap-3">
            <div className="flex justify-center items-center flex-col">
              <GiSmartphone className="text-5xl" />
              <h2 className="text-xl">+3 800123 45</h2>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center  text-white py-14 gap-3">
            <div className="flex justify-center items-center flex-col">
              <BiBuildingHouse className="text-5xl" />
              <h2 className="text-xl">
                +123, New Lenox <br />
                Chicago, IL 60606
              </h2>
            </div>
          </div>
          <div className="col-span-full md:col-span-1 w-full h-full flex justify-center items-center md:border-x  text-white py-14 gap-3">
            <div className="flex justify-center items-center flex-col">
              <BsEnvelopeAt className="text-5xl" />
              <h2 className="text-xl">support@example.com</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
