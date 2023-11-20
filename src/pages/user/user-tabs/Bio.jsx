import React from "react";

const Bio = () => {
  return (
    <div className="bg-[#fffbf5] rounded-3xl flex flex-col md:flex-row justify-center">
      <div
        className="w-full  md:w-1/3 flex justify-center items-center py-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <button className="p-3 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">
          Personal Information
        </button>
      </div>

      <div className="w-full md:w-2/3 border-2 border-orange  ">
        <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">First Name</h1>
            <h1 className="font-medium w-2/3">Charles</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Last Name</h1>
            <h1 className="font-medium w-2/3">Cater</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Address</h1>
            <h1 className="font-medium w-2/3">
              7188 E. Walnutwood St. Brooklyn, NY 11238
            </h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Date of Birth</h1>
            <h1 className="font-medium w-2/3">11/05/1997</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Email</h1>
            <h1 className="font-medium w-2/3">charlescater01@gmail.com</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Phone No</h1>
            <h1 className="font-medium w-2/3">091 25 2554 255</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">CNIC</h1>
            <h1 className="font-medium w-2/3">611101-542544-5</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
