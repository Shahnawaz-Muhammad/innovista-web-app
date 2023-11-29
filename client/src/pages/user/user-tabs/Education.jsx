import React from "react";

const Education = () => {
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
        Education
        </button>
      </div>

      <div className="py-10 w-full md:w-2/3 border-2 border-orange  ">
      <div className="px-10 grid grid-cols-1  gap-10 justify-center items-center">
          
          
          <div className="flex flex-col sm:flex-row border-b border-orange items-center text-center sm:text-start">
            <h1 className="font-bold w-full sm:w-1/3 sm:pl-10">Matric </h1>
            <h2 className="font-bold w-full sm:w-1/3 ">Science </h2>
            <h3 className="font-medium w-full sm:w-1/3 sm:text-center">2013</h3>
          </div>
          <div className="flex flex-col sm:flex-row border-b border-orange items-center text-center sm:text-start">
            <h1 className="font-bold w-full sm:w-1/3 sm:pl-10">FSC </h1>
            <h2 className="font-bold w-full sm:w-1/3">Pre Engineering </h2>
            <h3 className="font-medium w-full sm:w-1/3 text-center">2015</h3>
          </div>
          <div className="flex flex-col sm:flex-row border-b border-orange items-center text-center sm:text-start">
            <h1 className="font-bold w-full sm:w-1/3 sm:pl-10">BS </h1>
            <h2 className="font-bold w-full sm:w-1/3">Software Engineering</h2>
            <h3 className="font-medium w-full sm:w-1/3 text-center">2019</h3>
          </div>
          <div className="flex flex-col sm:flex-row border-b border-orange items-center text-center sm:text-start">
            <h1 className="font-bold w-full sm:w-1/3 sm:pl-10">MS </h1>
            <h2 className="font-bold w-full sm:w-1/3">Software Engineering</h2>
            <h3 className="font-medium w-full sm:w-1/3 text-center">2021</h3>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Education;
