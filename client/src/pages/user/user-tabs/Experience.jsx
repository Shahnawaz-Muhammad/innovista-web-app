// Experience.js
import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdAddBox, MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
const Experience = ({ isExperienceOpen, toggleExperience }) => {
  return (
    <div className="flex flex-col justify-between cursor-pointer" onClick={toggleExperience}>
      <div className={`flex items-center justify-between ${isExperienceOpen ? "bg-orange text-white" : "bg-white text-[#f15a27]"} p-5 `}>
        <div>
          <h1 className="text-2xl ">Experience</h1>
        </div>
        <div>{isExperienceOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}</div>
      </div>

      {isExperienceOpen && (
        <div className="pt-5 pb-10 px-5 ">
              <div className="flex  justify-end ">
                <MdAddBox className="text-2xl md:text-3xl" />
              </div>
              <div className="border-b-2">
                <div className="flex justify-between  mt-10">
                  <h1 className="text-xl md:text-2xl ">MR. IT COMPANY</h1>
                  <div className="flex gap-4">
                    <TbEdit className="text-2xl md:text-3xl" />
                    <MdDeleteForever className="text-2xl md:text-3xl" />
                  </div>
                </div>

                <div className="md:flex  md:py-5 ">
                  <div className="md:flex md:w-[68%]">
                    <div className="py-5 md:py-0 md:w-1/2">
                      <h1 className="text-lg ">Total Experience</h1>
                      <h1 className="text-lg ">14 Months</h1>
                    </div>

                    <div className="md:w-1/2">
                      <h1 className="text-lg ">Designation</h1>
                      <h1 className="text-lg ">Senior Software developer</h1>
                    </div>
                  </div>
                  <div className="flex md:justify-between py-5  gap-20 md:gap-0 md:py-0 md:w-[32%]  ">
                    <div className=" md:py-0 ">
                      <h1 className="text-lg ">Start Date</h1>
                      <h1 className="text-lg ">Aug 2022</h1>
                    </div>

                    <div className=" md:py-0 ">
                      <h1 className="text-lg ">End Date</h1>
                      <h1 className="text-lg ">Oct 2023</h1>
                    </div>
                  </div>
                </div>
              </div>


            </div>
      )}
    </div>
  );
};

export default Experience;
