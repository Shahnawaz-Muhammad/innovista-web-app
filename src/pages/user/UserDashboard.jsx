// Dashboard.js

import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserHeader from "../../components/dashboard/user-header";
import profileImage from "../../assets/images/profile-image.jpg"    


const UserDashboard = ({ userType }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [showDropDown, setShowDropDown] = useState(false)

 

  return (
    <div>
      {isAuthenticated ? (
        <div>
            {/* Header */}
          <UserHeader showDropDown={showDropDown} setShowDropDown={setShowDropDown} />
          <div className="w-full bg-coverImage h-80 object-cover bg-center relative">
            <div className="absolute w-40 h-40 rounded-full -bottom-20 left-20 p-2 bg-gray-50 shadow-lg">
                <img src={profileImage} alt="" className="w-full h-full rounded-full object-cover"/>
            </div>
          </div>
        </div>
      ) : (
        <p>You are not authenticated. Please login.</p>
      )}
    </div>
  );
};

export default UserDashboard;
