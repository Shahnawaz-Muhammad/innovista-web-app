import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import ProfileCard from "./ProfileCard";

function Employees({ isEmployeeOpen, toggleEmp }) {
  return (
    <div className="flex flex-col justify-between  cursor-pointer shadow-lg border border-gray-300 mt-5">
      <div
        onClick={toggleEmp}
        className={`flex items-center justify-between ${
          isEmployeeOpen
            ? "bg-orange text-white"
            : "bg-white hover:bg-slate-100 text-[#f15a27]"
        } p-5 `}
      >
        <div>
          <h1 className="text-2xl ">Employee</h1>
        </div>
        <div>
          {isEmployeeOpen ? (
            <IoIosArrowUp size={30} />
          ) : (
            <IoIosArrowDown size={30} />
          )}
        </div>
      </div>

      {isEmployeeOpen && (
        <div className="py-2 px-2 md:py-5 md:px-5">
          <div className="flex justify-end mb-2">
            <FiEdit className="text-2xl md:text-3xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mt-2 md:mt-4">
            {[...Array(8)].map((_, index) => (
              <div key={index}>
                <ProfileCard />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
