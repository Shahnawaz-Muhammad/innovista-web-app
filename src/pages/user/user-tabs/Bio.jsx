import React from "react";

const Bio = () => {
  return (
    <div className="bg-[#fffbf5] rounded-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div className="py-3 lg:py-10 px-5 lg:px-20">
          <div className="grid grid-cols-1 space-y-4">
            <div className="flex space-x-20 lg:space-x-40">
              <h1>First Name</h1>
              <h1>Charles</h1>
            </div>
            <div className="flex space-x-20 lg:space-x-40">
              <h1>Last Name</h1>
              <h1>Cater</h1>
            </div>
            <div className="flex space-x-24 lg:space-x-44">
              <h1>Address</h1>
              <h1>7188 E. Walnutwood St. Brooklyn, NY 11238</h1>
            </div>
            <div className="flex space-x-16 lg:space-x-36">
              <h1>Date of Birth</h1>
              <h1>11/05/1997</h1>
            </div>
          </div>
        </div>
        <div className="py-2 lg:py-10 px-5 lg:px-20">
          <div className="grid grid-cols-1 space-y-4">
            <div className="flex space-x-28 lg:space-x-40 ">
              <h1>Email</h1>
              <h1>CharlesCater01@gmail.com</h1>
            </div>
            <div className="flex space-x-20 lg:space-x-32">
              <h1>Phone No</h1>
              <h1>091 25 2554 255</h1>
            </div>
            <div className="flex space-x-28 lg:space-x-40">
              <h1>CNIC</h1>
              <h1>611101-542544-5</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
