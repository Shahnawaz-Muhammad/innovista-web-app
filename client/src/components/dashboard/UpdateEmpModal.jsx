import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiUrl } from "../../config";
import { toast } from "react-toastify";
import Spinner from "../../Loader/Spinner";
const UpdateEmpModal = ({
  toggleModal,
  setModalOpen,
  selectedItemData, 
  fetchEmployees,
  userEmail,
}) => {
  const [employeeData, setEmployeeData] = useState({
    name: selectedItemData.EmployeeName,
    designation: selectedItemData.Designation,
    empID: selectedItemData.EmpId,
    contact: selectedItemData.E_ContactNo,
    email: selectedItemData.EmployeeEmail,
  });

  const [errors, setErrors] = useState({
    name: "",
    designation: "",
    empID: "",
    contact: "",
    email: "",
  });
  const [loading,setLoading]=useState(false);

  
  const { user } = useContext(AuthContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for basic email validation
  const contactNoRegex = /^03\d{2}-\d{7}$/;

  const validateInput = (fieldName, value) => {
    const trimmedValue = (value || '').toString().trim(); // Ensure value is a string and then trim
  
    switch (fieldName) {
      case "name":
      case "empID":
      case "designation":
        return trimmedValue !== "";
      case "email":
        return emailRegex.test(trimmedValue); // Check if the trimmed value matches the email regex
      case "contact":
        return contactNoRegex.test(trimmedValue);
      default:
        return true;
    }
  };
  


  
  // Validation handler for form submission
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    for (const field in employeeData) {
      if (field === "email") {
        if (!employeeData[field].trim()) {
          newErrors[field] = "This Field is Required";
          isValid = false;
        } else if (!validateInput(field, employeeData[field])) {
          newErrors[field] = "Invalid Email";
          isValid = false;
        } else {
          newErrors[field] = "";
        }
      } else if (field === "contact") {
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
  

  function handleChange(evt) {
    const value = evt.target.value;
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [evt.target.name]: value,
    }));
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const isValid = validateForm(); // Function to validate the form

      if (isValid) {
        // Make an update API call using fetch

        setLoading(true);
        const response = await fetch(
          `${apiUrl}/updateEmployee/${selectedItemData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              EmployeeName: employeeData.name,
              EmpId: employeeData.empID,
              Designation: employeeData.designation,
              EmployeeEmail: employeeData.email,
              E_ContactNo: employeeData.contact,
            }),
          }
        );

        // Handle the response accordingly
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "light",
          });
          setLoading(false)
          return;
        }
        fetchEmployees(userEmail, employeeData);

        toast.success("Employee Updated Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
        setLoading(false)
        toggleModal();
      }
    } catch (error) {
      console.error("Error updating Employee:", error);
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
    }
  };


 
  

  return (
    <>
      <div
        className="w-full z-50 h-screen fixed top-0 left-0 bg-gray-600 backdrop-blur-sm bg-opacity-50"
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Update {user.category === "Group" ? "Member" : "Employee"}
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter Name"
                    value={employeeData.name}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, name: "" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="empID"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    {user.category === "Group" ? "Member" : "Employee"} ID
                  </label>
                  <input
                    type="number"
                    name="empID"
                    id="empID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter ID"
                    value={employeeData.empID}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, empID: "" })}
                  />
                  {errors.empID && (
                    <p className="text-red-500 text-xs mt-1">{errors.empID}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="designation"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter Designation"
                    value={employeeData.designation}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, designation: "" })}
                  />
                  {errors.designation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.designation}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Contact No
                  </label>
                  <input
                    type="numeric"
                    name="contact"
                    id="contact"
                    maxLength={12}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter Contact No"
                    value={employeeData.contact}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, contact: "" })}
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contact}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email 
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter Email "
                    value={employeeData.email}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, email: "" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-orange hover:bg-orangeDark focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                   {loading ? <Spinner size={30}/> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmpModal;
