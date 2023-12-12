// Dashboard.js
import React from "react";
import UserHeader from "../../components/dashboard/user-header";
import { Outlet } from "react-router-dom";

const UserDashboard = ({ user }) => {
  return (
    <div>
      <div>
        <UserHeader user={user} />

        <div className="w-full flex justify-center mx-auto px-5 lg:px-10 xl:px-0 transition-all duration-500 relative ">
          <div className=" max-w-7xl w-full flex flex-col gap-2 ">
            <div className="flex  flex-row md:flex-col gap-1 ">
              <div className="w-full md:py-5">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-5  bg-lightGray flex justify-center fixed bottom-0">
          <div>&copy; 2023 D-Labs. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
