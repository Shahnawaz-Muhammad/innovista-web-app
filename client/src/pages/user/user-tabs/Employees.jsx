import React from "react";
import "../user-tabs/Employees.css";

const Employees = () => {
  const employeesList = [
    {
      image:
        "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      name: "John ",
      designation: "Architect ",
      id: "001",
      contact: "123 456 789",
      email: "john@gmail.com",
      status: "Active",
    },
    {
      image:
        "https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg",
      name: "Doe ",
      designation: "Engineer",
      id: "002",
      contact: "12 34 56 789",
      email: "doe@gmail.com",
      status: "Active",
    },
    // Add more employee data here if needed
  ];

  return (
    <div>
      <div>
        <div className="bg-[#fffbf5] rounded-3xl flex flex-col md:flex-row justify-center">
          <div
            className="w-full  md:w-1/3 flex justify-center items-center py-5 "
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
            }}
          >
            <div className="flex flex-col gap-4">
              <button className="p-3 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">
                Employees Record
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/3 border-2 border-orange p-5 ">
            <div className="my-5  w-full flex justify-evenly items-center gap-4">
              {employeesList.map((employee, index) => (
                <div key={index} className="flip-card h-80 w-72">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img
                        src={employee.image}
                        alt="Avatar"
                        className="h-80 w-72"
                      />
                    </div>
                    <div className="px-5 flip-card-back font-bold  ">
                      <div className="mt-5 flex flex-row ">
                        <h1 className="  font-bold w-2/5">Name</h1>
                        <h1 className="font-medium w-3/5 text-center">{employee.name}</h1>
                      </div>
                      <div className="mt-5 flex flex-row ">
                        <h1 className="  font-bold w-2/5">ID</h1>
                        <h1 className="font-medium w-3/5 text-center">{employee.id}</h1>
                      </div>
                      <div className="mt-5 flex flex-row ">
                        <h1 className="  font-bold w-2/5">Designation</h1>
                        <h1 className="font-medium w-3/5 text-center">{employee.designation}</h1>
                      </div>
                      <div className="mt-5 flex flex-row ">
                        <h1 className="  font-bold w-2/5">Contact No</h1>
                        <h1 className="font-medium w-3/5 text-center">{employee.contact}</h1>
                      </div>
                      <div className="mt-5 flex flex-row ">
                        <h1 className="  font-bold w-2/5">Email</h1>
                        <h1 className="font-medium w-3/5 text-center">{employee.email}</h1>
                      </div>
                     <div className="mt-5 flex justify-center">

                      <button className=" p-3 rounded-md bg-orange text-center text-white hover:bg-orangeDark">
                        {employee.status}
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
