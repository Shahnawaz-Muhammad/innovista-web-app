import React, { useContext, useEffect, useState } from "react";
// import { VscBellDot } from "react-icons/vsc";
import { FaAngleDown } from "react-icons/fa6";
// import { AiOutlineLogout } from "react-icons/ai";
import logo from "../../../assets/D-labs-logo.png";
import { IoMdClose } from "react-icons/io";

import { AuthContext } from "../../../context/AuthContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { ProfileContext } from "../../../context/ProfileContext";
import { apiUrl } from "../../../config";

const UserHeader = ({ user }) => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const { selectedFile,setSelectedFile } = useContext(ProfileContext);

  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.pathname);
  const [showTabs, setShowTabs] = useState(false);

  const [showDropDown, setShowDropDown] = useState(false);

  const handleDropDownMenu = () => {
    setShowDropDown(!showDropDown);
  };

  const freelancerData = [
    {
      id: 1,
      title: "Booking History",
      url: ".",
    },

    {
      id: 2,
      title: "Advance Booking",
      url: "advance-booking",
    },
    {
      id: 3,
      title: "Jobs",
      url: "job-advertisements",
    },
  ];

  const groupData = [
    {
      id: 1,
      title: "Booking History",
      url: "booking-history",
    },

    {
      id: 2,
      title: "Advance Booking",
      url: "advance-booking",
    },
    
    {
      id: 3,
      title: "Jobs",
      url: "job-advertisements",
    },
  ];

  const companyData = [
    {
      id: 1,
      title: "Booking History",
      url: "booking-history",
    },

    {
      id: 2,
      title: "Advance Booking",
      url: "advance-booking",
    },
    {
      id: 3,
      title: "Hirings",
      url: "hirings",
    },
    {
      id: 4,
      title: "Post a Job",
      url: "post-job",
    },
  ];

  let userData;

  if (isAuthenticated && user.category === "Freelancer") {
    userData = freelancerData;
  } else if (isAuthenticated && user.category === "Group") {
    userData = groupData;
  } else if (isAuthenticated && user.category === "Company") {
    userData = companyData;
  }
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleChangeTab = (url) => {
    navigate(`/dashboard/${url}`);
    setShowTabs(false);
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/getProfilePicture?userEmail=${user?.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (JSON.stringify(data) !== JSON.stringify(selectedFile)) {
          setSelectedFile(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfilePicture();
  }, [user.email, selectedFile, setSelectedFile]);

  const handleLogout = () => {
    // Perform logout logic (e.g., clear local storage, call API)
    // If successful, call the logout function from the context
    logout();
  };
  return (
    <div>
      <div className="w-full py-3 px-10 bg-gray-100 mx-auto shadow-md">
        <div className="max-w-screen-2xl flex justify-between items-center">
          <img src={logo} alt="" className="w-20 hidden lg:flex" />
          <div className="block lg:hidden">
            <RxHamburgerMenu
              className="text-2xl"
              onClick={() => setShowTabs(!showTabs)}
            />
          </div>
          <div>
            {showTabs ? (
              <div className="absolute lg:hidden top-0 left-0  w-full  border-b z-50 bg-gray-300 py-3 px-6">
                <div >
                  <IoMdClose
                    className="text-3xl"
                    onClick={() => setShowTabs(false)}
                  />
                </div>
                <div className="flex flex-col">
                  {userData?.map((item) => (
                    <button
                      key={item.id}
                      className={`px-2 md:px-6 py-3  hover:bg-gray-300 transition-all duration-300 relative group cursor-pointer ${
                        activeTab === `/dashboard/${item.url}`
                          ? "border-b-2 border-orange"
                          : ""
                      } `}
                      onClick={() => handleChangeTab(item.url)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="hidden  lg:flex  w-full  flex-col md:flex-row ">
                {userData?.map((item) => (
                  <NavLink
                    key={item.id}
                    className={`px-2 md:px-0 lg:px-6 py-1  hover:bg-gray-200 transition-all duration-300 relative group cursor-pointer ${
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
            )}
          </div>
          <div className="flex gap-3 items-center">
            <div
              className="flex items-center gap-3 w-full relative cursor-pointer"
              onClick={handleDropDownMenu}
            >
              <div className="w-10 h-10 rounded-full shadow-md">
                <img
                  src={`${apiUrl}${selectedFile?.imageURL}`}
                  alt=""
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <h2>Charles</h2>
              <FaAngleDown />

              {showDropDown && (
                <div className="absolute top-10 right-0 w-40 z-30 bg-gray-200 shadow-sm p-3 rounded-md flex flex-col gap-2">
                  <Link to="profile">Profile</Link>
                  <h2 onClick={handleLogout}>Logout</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
