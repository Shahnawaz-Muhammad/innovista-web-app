
import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdAddBox, MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
const Education = ({ isEducationOpen, toggleEducation }) => {
  return (
    <div className="flex flex-col justify-between border-b border-[#f15a27] cursor-pointer" onClick={toggleEducation}>
      <div className={`flex items-center justify-between ${isEducationOpen ? "bg-orange text-white" : "bg-white text-[#f15a27]"} p-5 `}>
        <div>
          <h1 className="text-2xl ">Education</h1>
        </div>
        <div>{isEducationOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}</div>
      </div>

      {isEducationOpen && (
        <div className=" pt-5 pb-10 px-5 ">

<div className="flex  justify-end ">
  <MdAddBox className="text-2xl md:text-3xl" />
</div>
<div className="flex justify-between border-b-2 pb-2  pt-10 md:pt-10">
  <div className="flex justify-between  w-[75%]">
    <h1 className="text-lg ">Metric</h1>
    <h1 className="text-lg ">Science</h1>
    <h1 className="text-lg ">2013</h1>
  </div>
  <div className="flex w-[25%] gap-4  justify-end">
    <TbEdit className="text-2xl md:text-3xl" />
    <MdDeleteForever className="text-2xl md:text-3xl" />
  </div>
</div>


<div className="flex justify-between border-b-2 pb-2  pt-5">
  <div className="flex justify-between  w-[75%]">
    <h1 className="text-lg ">Fsc  </h1>
    <h1 className="text-lg ">Pre-Engineering</h1>
    <h1 className="text-lg ">2015</h1>
  </div>
  <div className="flex w-[25%] gap-4 justify-end">
    <TbEdit className="text-2xl md:text-3xl" />
    <MdDeleteForever className="text-2xl md:text-3xl" />
  </div>
</div>

<div className="flex justify-between border-b-2 pb-2  pt-5">
  <div className="flex justify-between  w-[75%]">
    <h1 className="text-lg ">BS   </h1>
    <h1 className="text-lg ">Software Engineering</h1>
    <h1 className="text-lg ">2019</h1>
  </div>
  <div className="flex w-[25%] gap-4  justify-end">
    <TbEdit className="text-2xl md:text-3xl" />
    <MdDeleteForever className="text-2xl md:text-3xl" />
  </div>
</div>
<div className="flex justify-between border-b-2 pb-2  pt-5">
  <div className="flex justify-between  w-[75%]">
    <h1 className="text-lg ">MS    </h1>
    <h1 className="text-lg ">Software Engineering</h1>
    <h1 className="text-lg ">2021</h1>
  </div>
  <div className="flex w-[25%] gap-4  justify-end">
    <TbEdit className="text-2xl md:text-3xl" />
    <MdDeleteForever className="text-2xl md:text-3xl" />
  </div>
</div>


</div>
      )}
    </div>
  );
};

export default Education;
