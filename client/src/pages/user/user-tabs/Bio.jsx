// Bio.js
import React from "react";
import { IoIosArrowUp, IoIosArrowDown,  } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
const Bio = ({ isBioOpen, toggleBio }) => {
  return (
    <div className="flex flex-col justify-between border-b border-[#f15a27] cursor-pointer" onClick={toggleBio}>
      <div className={`flex items-center justify-between ${isBioOpen ? "bg-orange text-white" : "bg-white text-[#f15a27]"} p-5 `}>
        <div>
          <h1 className="text-2xl ">Bio</h1>
        </div>
        <div>{isBioOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}</div>
      </div>

      {isBioOpen && (
        <div className="py-2 px-2 md:py-5 md:px-5 ">
              <div className="flex  justify-end ">
                <FiEdit className="text-2xl md:text-3xl" />
              </div>
              <div className="md:flex md:justify-between py-5">
                <div className="px-5 md:px-0  md:w-1/2">
                  <h1 className="text-lg ">First Name</h1>

                  <h1 className="text-lg ">Charles</h1>
                </div>

                <div className="py-5 px-5 md:py-0 md:w-1/2">
                  <h1 className="text-lg ">Last Name</h1>
                  <h1 className="text-lg ">Cater</h1>
                </div>

                <div className="px-5 md:w-1/2">
                  <h1 className="text-lg ">Address</h1>
                  <h1 className="text-lg ">7188 E. WalnutWood St. Brooklyn,NY 11238</h1>
                </div>

              </div>

              <div className=" md:flex md:justify-between py-2 md:py-5">
                <div className="px-5 md:px-0 md:w-1/2">
                  <h1 className="text-lg ">Date of Birth</h1>
                  <h1 className="text-lg ">11/05/1997</h1>
                </div>

                <div className="px-5 py-5 md:py-0 md:w-1/2">
                  <h1 className="text-lg ">Email</h1>
                  <h1 className="text-lg ">CharlesCater01@gmail</h1>
                </div>

                <div className="px-5 pb-5 md:w-1/2">
                  <h1 className="text-lg ">Phone No</h1>
                  <h1 className="text-lg ">09125 2554255</h1>
                </div>

              </div>
            </div>
      )}
    </div>
  );
};

export default Bio;
