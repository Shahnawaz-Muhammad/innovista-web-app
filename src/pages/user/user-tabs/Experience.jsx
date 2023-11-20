import React from "react";

const Experience = () => {
  return (
    <div>
      <div className="bg-[#fffbf5] rounded-3xl flex flex-col md:flex-row justify-center">
      <div
        className="w-full  md:w-1/3 flex justify-center items-center py-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="flex flex-col gap-4">

        <button className="p-3 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">
        Work Experience
        </button>
        <button className="p-3 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">
        12 Years
        </button>
        </div>
      </div>

      <div className="w-full md:w-2/3 border-2 border-orange py-5 ">
      <h1 className="text-3xl text-center text-orange font-bold underline decoration-slate-900">Mr. IT Company</h1>
        <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Total Experience</h1>
            <h1 className="font-medium w-2/3">14 Months</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Designation</h1>
            <h1 className="font-medium w-2/3">Senior Software Developer</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Start Date</h1>
            <h1 className="font-medium w-2/3">
            Aug 2022
            </h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">End Date</h1>
            <h1 className="font-medium w-2/3">Oct 2023</h1>
          </div>
          
        </div>
      </div>
    </div>

    </div>
  );
};

export default Experience;
