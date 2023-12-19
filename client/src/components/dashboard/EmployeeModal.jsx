import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const ExperienceModal = ({ toggleModal, setModalOpen }) => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    designation: "",
    empID: "",
    contact: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    designation: "",
    empID: "",
    contact: "",
    email: "",
  });

  const { user } = useContext(AuthContext);

  function handleChange(evt) {
    const value = evt.target.value;
    setEmployeeData({
      ...employeeData,
      [evt.target.name]: value,
    });

     // Clear error when user starts typing in a field
     setErrors({
      ...errors,
    });
  }

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();

      // Frontend validation
      const validationErrors = {};

      if (employeeData.name.trim() === "") {
        validationErrors.name = "Name is required";
      }
      if (employeeData.designation.trim() === "") {
        validationErrors.designation = "Designation is required";
      }
      if (employeeData.empID.trim() === "") {
        validationErrors.empID = "Emp ID is required";
      }
      if (employeeData.contact.trim() === "") {
        validationErrors.contact = "Contact Number is required";
      }
      if (employeeData.email.trim() === "") {
        validationErrors.email = "Email Address is required";
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }


      
      // Make an API call to authenticate the user and fetch user data
      const response = await fetch(
        `${apiUrl}/Employees?userEmail=${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EmployeeName: employeeData.name,
            Designation: employeeData.designation,
            EmpId: employeeData.empID,
            EmployeeEmail: employeeData.email,
            E_ContactNo: employeeData.contact,
            
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Adding Employee Data failed");
      }
    } catch (error) {
      console.error("Adding Employee Data error:", error);
    }
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="w-full z-50 h-screen fixed top-0 left-0 bg-gray-600 backdrop-blur-sm bg-opacity-50"
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Employee
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={toggleModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleFormSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="companyName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter Employee Name"
                    value={employeeData.name}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, name: "" })}
                    />
                    {errors.name && (
                      <p className="text-red-500">{errors.name}</p>
                    )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="Employee ID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Emp ID
                  </label>
                  <input
                    type="text"
                    name="empID"
                    id="empID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter Employee ID"
                    value={employeeData.empID}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, empID: "" })}
                    />
                    {errors.empID && (
                      <p className="text-red-500">{errors.empID}</p>
                    )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your designation"
                    value={employeeData.designation}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, designation: "" })}
                    />
                    {errors.designation && (
                      <p className="text-red-500">{errors.designation}</p>
                    )}
                </div>
                

                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="startDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter Email Address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={employeeData.email}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, email: "" })}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact No
                  </label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    placeholder="Enter Contact No"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={employeeData.contact}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, contact: "" })}
                    />
                    {errors.contact && (
                      <p className="text-red-500">{errors.contact}</p>
                    )}
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-orange hover:bg-orangeDark focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperienceModal;
