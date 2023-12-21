import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiUrl } from "../../config";
import { toast } from "react-toastify";

const AddEmployeeModal = ({
  toggleModal,
  setModalOpen,
  updateEmployeeList,
}) => {
  const [employeeData, setEmployeeData] = useState({
    empName: "",
    empId: "",
    empDesignation: "",
    empEmail: "",
    empPhone: "",
  });

  const [errors, setErrors] = useState({
    empName: "",
    empId: "",
    empDesignation: "",
    empEmail: "",
    empPhone: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for basic email validation
  const contactNoRegex = /^03\d{2}-\d{7}$/;


  // Validation function
  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "empName":
        return value.trim() !== "";
      case "empId":
        return value.trim() !== "";
      case "empDesignation":
        return value.trim() !== "";
      case "empEmail":
        return emailRegex.test(value.trim()); // Check if the value matches the email regex
      case "empPhone":
        return contactNoRegex.test(value.trim());
      default:
        return true;
    }
  };


  // Validation handler for form submission
  const handleValidation = () => {
    let isValid = true;
    const newErrors = { ...errors };
    for (const field in employeeData) {
      if (field === "empEmail") {
        if (!employeeData[field].trim()) {
          newErrors[field] = "This Field is Required";
          isValid = false;
        } else if (!validateInput(field, employeeData[field])) {
          newErrors[field] = "Invalid Email";
          isValid = false;
        } else {
          newErrors[field] = "";
        }
      } else if (field === "empPhone") {
        if (!employeeData[field].trim()) {
          newErrors[field] = "This Field is Required";
          isValid = false;
        } else if (!validateInput(field, employeeData[field])) {
          newErrors[field] = "Please enter Valid Format i.e. (03xx-xxxxxxx)";
          isValid = false;
        } else {
          newErrors[field] = "";
        }
      } else if (!validateInput(field, employeeData[field])) {
        newErrors[field] = "This Field is Required";
        isValid = false;
      } else {
        newErrors[field] = "";
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const { user } = useContext(AuthContext);

  function handleChange(evt) {
    const value = evt.target.value;
    setEmployeeData({
      ...employeeData,
      [evt.target.name]: value,
    });
  }

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const isFormValid = handleValidation();

      if (!isFormValid) {
        console.error("Form validation failed");
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
            EmployeeName: employeeData.empName,
            EmpId: employeeData.empId,
            Designation: employeeData.empDesignation,
            EmployeeEmail: employeeData.empEmail,
            E_ContactNo: employeeData.empPhone,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
        return;
      }
      updateEmployeeList();

      toast.success("Employee added Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
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
        <div className="relative p-4 w-full max-w-xl max-h-full">
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
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleFormSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="empName"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your Name"
                    value={employeeData.empName}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, empName: "" })}
                  />
                  {errors.empName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.empName}
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="empId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Employee ID
                  </label>
                  <input
                    type="number"
                    name="empId"
                    id="empId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your subject"
                    value={employeeData.empId}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, empId: "" })}
                  />
                  {errors.empId && (
                    <p className="text-red-500 text-sm mt-1">{errors.empId}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="empDesignation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    name="empDesignation"
                    id="empDesignation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your subject"
                    value={employeeData.empDesignation}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, empDesignation: "" })}
                  />
                  {errors.empDesignation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.empDesignation}
                    </p>
                  )}
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="empEmail"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="empEmail"
                    id="empEmail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your subject"
                    value={employeeData.empEmail}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, empEmail: "" })}
                  />
                  {errors.empEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.empEmail}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="empPhone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact No
                  </label>
                  <input
                    type="numeric"
                    name="empPhone"
                    id="empPhone"
                    maxLength="12"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="03xx-xxxxxxx"
                    value={employeeData.empPhone}
                    onChange={handleChange}
                    // onFocus={() => setErrors({ ...errors, empPhone: "" })}
                  />
                  {errors.empPhone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.empPhone}
                    </p>
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

export default AddEmployeeModal;
