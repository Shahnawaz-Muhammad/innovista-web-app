// Dashboard.js
import React from "react";
import UserHeader from "../../components/dashboard/user-header";
import { Outlet } from "react-router-dom";

const UserDashboard = ({ user }) => {
  return (
    <div>
      <div>
        <UserHeader user={user} />

        <div className="w-full flex justify-center transition-all duration-500 relative bg-gray-50">
          <div className=" max-w-7xl w-full flex flex-col gap-2 mb-20">
            <div className="flex  flex-row md:flex-col gap-1 ">
              <div className="w-full">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        
        {/* footer */}
        <div className="w-full py-3 bg-lightGray flex justify-center fixed bottom-0">
          <div>&copy; 2023 Inovista. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
