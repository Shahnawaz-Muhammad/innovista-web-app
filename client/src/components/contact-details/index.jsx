import React from "react";
import { GiSmartphone } from "react-icons/gi";
import { BiBuildingHouse } from "react-icons/bi";
import { BsEnvelopeAt } from "react-icons/bs";

const ContactDetail = () => {
  return (
    <div
      className={`w-full z-20 flex justify-center text-bgLight mx-auto  bg-orange`}
    >
      <div className="max-w-screen-xl w-full ">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-center">
          <div className="w-full h-full flex justify-center items-center border-b md:border-b-0 md:border-x flex-col text-white py-14 gap-3">
            <div className="flex justify-center items-center flex-col">
              <GiSmartphone className="text-5xl" />
              <h2 className="text-xl">+92 123 12 34 567</h2>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center border-b md:border-b-0 text-white py-14 gap-3">
            <div className="flex justify-center items-center flex-col">
              <BiBuildingHouse className="text-5xl" />
              <h2 className="text-xl">
              Pakistan
              </h2>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center md:border-x  text-white py-14 gap-3">
            <div className="flex justify-center items-center flex-col">
              <BsEnvelopeAt className="text-5xl" />
              <h2 className="text-xl">innovista@support.com</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
