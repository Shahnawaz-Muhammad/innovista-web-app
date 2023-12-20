import React from "react";
import ProfileImg from "../../../assets/images/img_bnfts.jpg";
const ProfileCard = ({ data }) => {
  return (
    <div className=" flex flex-col gap-3 bg-white shadow-lg rounded-lg overflow-hidden px-5 py-8 border-t-2 h-full">
      {/* Image in a circle */}
      <div className="flex flex-col gap-1">
      <div className="relative">
        <img
          className="h-32 w-32 object-cover mx-auto rounded-full"
          src={ProfileImg}
          alt="Profile"
        />
      </div>

      {/* Name */}
      <div className="text-center mt-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {data.EmployeeName}
        </h1>
      </div>

      {/* Designation */}
      <div className="flex flex-col justify-center items-center gap-1 mt-2">
        <h2 className="text-md text-gray-600">{data.Designation}</h2>
        <h2 className="text-md text-gray-600">{data.Email}</h2>
        <h2 className="text-md text-gray-600">{data.E_ContactNo}</h2>
      </div>
      </div>

      <div className="w-full flex justify-center gap-1">
        <button className="bg-black text-white px-3 py-1">edit</button>
        <button className="bg-black text-white px-3 py-1">Delete</button>
      </div>
    </div>
  );
};

export default ProfileCard;
