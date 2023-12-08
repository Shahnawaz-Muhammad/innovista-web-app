// Dashboard.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserHeader from "../../components/dashboard/user-header";
import { IoLocationOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const UserDashboard = ({ user }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      
      formData.append("profilePicture", file);
  
      try {
        const response = await fetch(`http://localhost:8080/api/uploadProfilePicture?userEmail=${user.email}`, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          console.log("Image uploaded successfully");
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const location = useLocation();

  const [activeTab, setActiveTab] = useState(location.pathname);
  const [showTabs, setShowTabs] = useState(false);

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
      title: "Advance Booking",
      url: "advance-booking",
    },
    {
      id: 5,
      title: "Booking History",
      url: "booking-history",
    },
    {
      id: 6,
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
    
    {
      id: 5,
      title: "Jobs",
      url: "job-advertisements",
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
      id: 5,
      title: "Hirings",
      url: "hirings",
    },
    {
      id: 6,
      title: "Post a Job",
      url: "post-job",
    },
    {
      id: 7,
      title: "Candidates",
      url: "candidates",
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
  const navigate = useNavigate()

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleChangeTab = (url) => {
    navigate(`/dashboard/${url}`)
    setShowTabs(false)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/bio?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setUserInfo(data); // setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/getProfilePicture?userEmail=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setSelectedFile(data); // setUserInfo(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfilePicture();
  }, [user.email, selectedFile]);


  return (
    <div>
      {/* {isAuthenticated ? ( */}
      <div>
        {/* Header */}
        <UserHeader user={user} />
        <div className="w-full bg-coverImage h-60 object-cover bg-center relative flex justify-center mx-auto px-5 lg:px-10 xl:px-0 transition-all duration-500">
          <div className=" max-w-7xl w-full ">
          <div
              className={`absolute z-50 -bottom-16 md:-bottom-20 flex flex-col items-center w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-white shadow-lg overflow-hidden transition-transform `}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={`http://localhost:8080/api${selectedFile?.imageURL}`}
                alt=""
                className={`w-full h-full rounded-full object-cover ${
                  isHovered ? 'scale-105 duration-300' : 'scale-100 duration-300'
                }`}
              />
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-full">
                  <label htmlFor="fileInput" className="cursor-pointer text-white w-full h-full rounded-full flex items-center justify-center">
                    Change Image
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={handleFileChange} // Handle the file change as needed
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full pt-20  flex justify-center mx-auto px-5 lg:px-10 xl:px-0 transition-all duration-500 relative ">
          <div className=" max-w-7xl w-full flex flex-col gap-2 ">
            
            <div className="w-40 flex flex-col items-center">
              <h2 className="text-xl font-semibold">{userInfo?.firstName} {userInfo?.lastName}</h2>
            </div>
            <h2 className="text-textGray px-3">
            {userInfo?.designation}
            </h2>
            <div className="flex gap-10 items-center text-textGray">
              <div className="flex items-center gap-1 px-2">
                <IoLocationOutline />
                {userInfo?.city}, {userInfo?.country}
              </div>
              <div className="flex items-center gap-1">
                <BsEnvelope />
                {userInfo?.emailAddress}
              </div>
            </div>

            <div className="block md:hidden">
              <RxHamburgerMenu
                className="text-2xl"
                onClick={() => setShowTabs(!showTabs)}
              />
            </div>

            <div className="flex  flex-row md:flex-col gap-1 ">
              {showTabs ? (
                <div className="absolute left-0 flex  w-full  flex-col  border-b ">
                  {userData?.map((item) => (
                    <button
                      key={item.id}
                      className={`px-2 md:px-6 py-1 bg-gray-300 hover:bg-gray-400 transition-all duration-300 relative group cursor-pointer ${
                        activeTab === `/dashboard/${item.url}`
                          ? "border-b-2 border-orange"
                          : ""
                      } `}
                      onClick={()=>handleChangeTab(item.url)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="hidden  md:flex  w-full  flex-col md:flex-row border-b ">
                  {userData?.map((item) => (
                    <NavLink
                      key={item.id}
                      className={`px-2 md:px-6 py-1 bg-gray-300 hover:bg-gray-400 transition-all duration-300 relative group cursor-pointer ${
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
              <div className="w-full md:py-10">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="w-full py-5  bg-lightGray flex justify-center">
          <div>&copy; 2023 D-Labs. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
