import React from "react";
import ProfileImg from '../../../assets/images/img_bnfts.jpg'
const ProfileCard = () => {
  return (
    <div className="  bg-white shadow-lg rounded-lg overflow-hidden p-5 border-t-2">
      {/* Image in a circle */}
      <div className="relative">
        <img
          className="h-40 w-40 object-cover mx-auto rounded-full"
          src={ProfileImg}
          alt="Profile"
        />
       
      </div>

      {/* Name */}
      <div className="text-center mt-4">
        <h1 className="text-xl font-semibold text-gray-800">John Doe</h1>
      </div>

      {/* Designation */}
      <div className="text-center mt-2">
        <h2 className="text-md text-gray-600">Senior Software Developer</h2>
      </div>

      {/* Additional Information */}
      <div className="text-center mt-2 px-6">
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
