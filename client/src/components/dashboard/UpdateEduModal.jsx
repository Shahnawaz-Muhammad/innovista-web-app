import React, { useState } from "react";
import { apiUrl } from "../../config";
import clsx from "clsx";

const UpdateEduModal = ({ toggleModal, setModalOpen, selectedItemData }) => {
  const [educationalData, setEducationalData] = useState({
    degree: selectedItemData.degree,
    subject: selectedItemData.subject,
    year: selectedItemData.year,
  });

  const [errors, setErrors] = useState({
    degree: "",
    subject: "",
    year: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setEducationalData({
      ...educationalData,
      [evt.target.name]: value,
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const isValid = validateForm(); // Function to validate the form

      if (isValid) {
        // Make an update API call using fetch
        const response = await fetch(
          `${apiUrl}/updateEducation/${selectedItemData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(educationalData),
          }
        );

        // Handle the response accordingly
        if (response.ok) {
          const data = await response.json();
          console.log(data);
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

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate each field
    for (const field in educationalData) {
      if (!educationalData[field]) {
        newErrors[field] = `Please enter your Updated ${field}`;
        valid = false;
      } else {
        newErrors[field] = "";

        // Validate year range
        if (field === "year") {
          const enteredYear = educationalData.year;
          const isNumeric = /^\d+$/.test(enteredYear); // Check if the year consists of only digits

          if (
            !isNumeric ||
            enteredYear < 1900 ||
            enteredYear > new Date().getFullYear()
          ) {
            newErrors[field] = "Please enter a valid year";
            valid = false;
          }
        }
      }
    }

    setErrors(newErrors);
    return valid;
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
                Add Education
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
                {/* <div className="col-span-2">
                  <label
                    htmlFor="degree"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Degree
                  </label>
                  <input
                    type="text"
                    name="degree"
                    id="degree"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your degree"
                    value={educationalData.degree}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, degree: "" })}
                  />
                  {errors.degree && (
                    <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
                  )}
                </div> */}
                <div className="col-span-2 relative  h-[4.3rem] flex flex-col gap-1">
                  <div className="absolute top-0 left-0 w-full">
                    {/* <div className="w-full inline-flex justify-between"> */}
                    <div className="mb-1">
                      <label
                        htmlFor="degree"
                        className="block text-sm font-medium text-gray-900 "
                      >
                        Degree
                      </label>

                      <select
                        id="degree"
                        name="degree"
                        value={educationalData.degree}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        onChange={handleChange}
                        onFocus={() => setErrors({ ...errors, degree: "" })}
                      >
                        <option value="" selected>
                          Select Your Degree
                        </option>
                        <option value="matric">Matric</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="bachelors">Bachelors</option>
                        <option value="masters">Masters</option>
                        <option value="phd">PhD</option>
                      </select>
                    </div>
                    {errors.degree && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.degree}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your subject"
                    value={educationalData.subject}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, subject: "" })}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your year"
                    value={educationalData.year}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, year: "" })}
                    min="1900"
                    max={new Date().getFullYear()} // Restrict to the current year
                  />
                  {errors.year && (
                    <p className="text-red-500 text-xs mt-1">{errors.year}</p>
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

export default UpdateEduModal;
