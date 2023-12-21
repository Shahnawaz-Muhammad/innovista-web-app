import React, { useContext, useState } from "react";
import { apiUrl } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const UpdateBioModal = ({
  toggleModal,
  setModalOpen,
  selectedItemData,
  userEmail,
  fetchBio,
}) => {
  console.log(selectedItemData);
  const [bioData, setBioData] = useState({
    firstName: selectedItemData.firstName,
    lastName: selectedItemData.lastName,
    email: selectedItemData.emailAddress,
    address: selectedItemData.address,
    phone: selectedItemData.mobileNo,
    dob: selectedItemData.dob,
  });

  const { user } = useContext(AuthContext);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    dob: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setBioData({
      ...bioData,
      [evt.target.name]: value,
    });
  }

  const handleUpdateBio = async (event) => {
    event.preventDefault();

    try {
      const isValid = validateForm(); // Function to validate the form

      if (isValid) {
        // Make an update API call using fetch
        const response = await fetch(
          `${apiUrl}/UpdateBio?email=${user.email}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bioData),
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

        toast.success("Bio Updated Successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });

        fetchBio(userEmail, bioData);
        toggleModal();
      }
    } catch (error) {
      console.error("Error updating Bio", error);
      toast.error("Error updating Bio", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate each field
    for (const field in bioData) {
      if (!bioData[field]) {
        newErrors[field] = `Please enter your Updated ${field}`;
        valid = false;
      } else {
        newErrors[field] = "";
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
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Bio
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
            <form className="p-4 md:p-5" onSubmit={handleUpdateBio}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-1">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your degree"
                    value={bioData.firstName}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, firstName: "" })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your Last Name"
                    value={bioData.lastName}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, lastName: "" })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your year"
                    value={bioData.email}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, email: "" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your address"
                    value={bioData.address}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, address: "" })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your phone"
                    value={bioData.phone}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, phone: "" })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="dob"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter your dob"
                    value={
                      bioData.dob
                        ? new Date(bioData.dob).toISOString().split("T")[0]
                        : ""
                    } // Set the initial value to the existing date or an empty string
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, dob: "" })}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
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

export default UpdateBioModal;
