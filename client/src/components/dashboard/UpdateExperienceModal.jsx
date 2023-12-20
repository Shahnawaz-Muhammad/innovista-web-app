import React, { useState } from "react";
import { apiUrl } from "../../config";
// import { AuthContext } from "../../context/AuthContext";

const UpdateExperienceModal = ({
  toggleModal,
  setModalOpen,
  selectedItemData,
}) => {
  const [experienceData, setExperienceData] = useState({
    companyName: selectedItemData.companyName,
    designation: selectedItemData.designation,
    startDate: selectedItemData.startDate,
    endDate: selectedItemData.endDate,
  });

  const [errors, setErrors] = useState({
    companyName: "",
    designation: "",
    startDate: "",
    endDate: "",
  });
  // const { user } = useContext(AuthContext);

  function handleChange(evt) {
    const value = evt.target.value;
    setExperienceData({
      ...experienceData,
      [evt.target.name]: value,
    });
  }

  const validateDate = (date) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    return dateRegex.test(date);
  };

  const handleDateChange = (evt) => {
    const { name, value } = evt.target;
    if (validateDate(value)) {
      setExperienceData({
        ...experienceData,
        [name]: value,
      });
    } else {
      // Handle invalid date format here (e.g., show error message)
      console.error("Invalid date format");
      // You can set an error state or display a message to the user
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let validForm = true;
      const newErrors = { ...errors };

      // Validate each field
      for (const field in experienceData) {
        if (!experienceData[field]) {
          newErrors[field] = `This Field is Required`;
          validForm = false;
        } else {
          newErrors[field] = "";
        }
      }

      // Update the errors state with newErrors
      setErrors(newErrors);

      if (validForm) {
        // Make an update API call using fetch
        const response = await fetch(
          `${apiUrl}/updateExperience/${selectedItemData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(experienceData),
          }
        );

        // Handle the response accordingly
        if (response.ok) {
          // const data = await response.json();
          // console.log(data)

          // Close the modal
          toggleModal();
        } else {
          // Handle errors (you may show an error message)
          const errorData = await response.json();
          console.error("Error updating education:", errorData);
        }
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
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
                Update Experience
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
                    htmlFor="companyName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your degree"
                    value={experienceData.companyName}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, companyName: "" })}
                  />
                  {errors.companyName && (
                    <p className="text-red-500">{errors.companyName}</p>
                  )}
                </div>
                <div className="col-span-2">
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
                    value={experienceData.designation}
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
                    Starting Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={
                      experienceData.startDate
                        ? new Date(experienceData.startDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    } // Set the initial value to the existing date or an empty string
                    onChange={handleDateChange}
                    onFocus={() => setErrors({ ...errors, startDate: "" })}
                  />
                  {errors.startDate && (
                    <p className="text-red-500">{errors.startDate}</p>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="endDate"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={
                      experienceData.endDate
                        ? new Date(experienceData.endDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    } // Set the initial value to the existing date or an empty string
                    onChange={handleDateChange}
                    onFocus={() => setErrors({ ...errors, endDate: "" })}
                  />
                  {errors.endDate && (
                    <p className="text-red-500">{errors.endDate}</p>
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

export default UpdateExperienceModal;
