import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiUrl } from "../../config";
import { toast } from "react-toastify";
import Spinner from "../../Loader/Spinner";
const EducationModal = ({
  toggleModal,
  setModalOpen,
  userEmail,
  fetchEducation,
}) => {
  const [educationData, setEducationData] = useState({
    degree: "",
    subject: "",
    year: "",
  });

  const [errors, setErrors] = useState({
    degree: "",
    subject: "",
    year: "",
  });
  const [loading, setLoading] = useState(false);

  // Validation function
  const validateInput = (fieldName, value) => {
    switch (fieldName) {
      case "degree":
        return value.trim() !== "";
      case "subject":
        return value.trim() !== "";
      case "year":
        return /^\d{4}$/.test(value.trim());
      default:
        return true;
    }
  };

  // Validation handler for form submission
  const handleValidation = () => {
    let isValid = true;
    const newErrors = { ...errors };
    for (const field in educationData) {
      if (!validateInput(field, educationData[field])) {
        newErrors[field] = `This Field is Required`;
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
    setEducationData({
      ...educationData,
      [evt.target.name]: value,
    });
  }

  const handleAddEducation = async (event) => {
    try {
      event.preventDefault();
      const isFormValid = handleValidation();

      if (!isFormValid) {
        console.error("Form validation failed");
        return;
      }

      // Make an API call to authenticate the user and fetch user data
      setLoading(true);
      const response = await fetch(
        `${apiUrl}/educations?userEmail=${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            degree: educationData.degree,
            subject: educationData.subject,
            year: educationData.year,
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
        setLoading(false);
        return;
      }
      fetchEducation(userEmail, educationData);

      toast.success("Education added Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
      setLoading(false);
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
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleAddEducation}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 relative  h-[5.5rem] flex flex-col gap-1">
                  <div className="absolute top-0 left-0 w-full">
                    {/* <div className="w-full inline-flex justify-between"> */}
                    <div className="mb-1">
                      <label
                        htmlFor="degree"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Degree
                      </label>

                      <select
                        id="degree"
                        name="degree"
                        value={educationData.degree}
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
                      <p className="text-red-500 text-sm mt-1">
                        {errors.degree}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your subject"
                    value={educationData.subject}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, subject: "" })}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Year
                  </label>
                  <input
                    type="number"
                    name="year"
                    id="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter your year"
                    value={educationData.year}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, year: "" })}
                    min="1900"
                    max={new Date().getFullYear()} // Restrict to the current year
                  />
                  {errors.year && (
                    <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-orange hover:bg-orangeDark focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  {loading ? <Spinner size={30} /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationModal;
