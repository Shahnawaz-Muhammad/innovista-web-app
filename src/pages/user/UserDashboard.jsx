// Dashboard.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserHeader from "../../components/dashboard/user-header";
import profileImage from "../../assets/images/profile-image.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { TbUserEdit } from "react-icons/tb";
import {  NavLink, Outlet, useLocation } from "react-router-dom";

const UserDashboard = ({ userType }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation(); // Get the current location from React Router

  const [activeTab, setActiveTab] = useState(location.pathname);

  const freelancerData = [
    {
      id: 1,
      title: "Bio",
      url: "",
    },
    {
      id: 2,
      title: "Education",
      url: "education",
    },
    {
      id: 3,
      title: "Experience",
      url: "experience",
    },
    {
      id: 4,
      title: "Cv",
      url: "cv",
    },
    {
      id: 5,
      title: "Advance Booking",
      url: "advance-booking",
    },
    {
      id: 6,
      title: "Booking History",
      url: "booking-history",
    },
    {
      id: 7,
      title: "Jobs",
      url: "job-advertisements",
    },
  ];

  const groupData = [
    {
      id: 1,
      title: "Bio",
      url: "",
    },
    {
      id: 2,
      title: "Members",
      url: "members",
    },
    {
      id: 3,
      title: "Advance Booking",
      url: "advance-booking",
    },
    {
      id: 4,
      title: "Booking History",
      url: "booking-history",
    },
  ];

  const companyData = [
    {
      id: 1,
      title: "Bio",
      url: "",
    },
    {
      id: 2,
      title: "Employees",
      url: "employees",
    },
    
    {
      id: 3,
      title: "Advance Booking",
      url: "advance-booking",
    },
    {
      id: 4,
      title: "Booking History",
      url: "booking-history",
    },
    {
      id:5,
      title: "Hirings",
      url: "hirings"
    },
  ];

  let userData;

if (userType === "freelancer") {
  userData = freelancerData;
} else if (userType === "group") {
  userData = groupData;
} else if (userType === "company") {
  userData = companyData;
}

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          {/* Header */}
          <UserHeader />
          <div className="w-full bg-coverImage h-60 object-cover bg-center relative flex justify-center mx-auto px-5 lg:px-10 xl:px-0 transition-all duration-500">
            <div className=" max-w-7xl w-full ">
              <div className="absolute -bottom-16 md:-bottom-20  flex flex-col items-center w-32 h-32 md:w-40 md:h-40 rounded-full  p-1 bg-white shadow-lg">
                <img
                  src={profileImage}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-20  flex justify-center mx-auto px-5 lg:px-10 xl:px-0 transition-all duration-500 relative ">
            <div className=" max-w-7xl w-full flex flex-col gap-2 ">
              <div className="absolute top-5 right-10 lg:right-20">
                <div className="w-full h-full p-2 bg-gray-300 shadow-lg rounded-lg cursor-pointer hover:bg-gray-400 transition-colors duration-300">
                  <TbUserEdit className="text-xl" />
                </div>
              </div>
              <div className="w-40 flex flex-col items-center">
                <h2 className="text-xl font-semibold">Charles Carter </h2>
              </div>
              <h2 className="text-textGray px-3">
                Project Manager and Team Lead at ClayStone
              </h2>
              <div className="flex gap-10 items-center text-textGray">
                <div className="flex items-center gap-1 px-2">
                  <IoLocationOutline />
                  Baku
                </div>
                <div className="flex items-center gap-1">
                  <BsEnvelope />
                  charles@gmail.com
                </div>
              </div>

              <div className="w-full flex border-b">
                {userData.map((item) => (
                  <NavLink
                    key={item.id}
                    className={`px-6 py-1 bg-gray-300 hover:bg-gray-400 transition-all duration-300 relative group cursor-pointer ${
                      activeTab === `/dashboard/${item.url}`
                        ? "border-b-2 border-orange"
                        : ""
                    } `}
                    to={`/dashboard/${item.url}`}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>
              <div className="w-full py-10">
                <Outlet />
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="w-full py-5  bg-lightGray flex justify-center">
            <div>&copy; 2023 D-Labs. All rights reserved.</div>
          </div>
        </div>
      ) : (
        <p>You are not authenticated. Please login.</p>
      )}
    </div>
  );
};

export default UserDashboard;
