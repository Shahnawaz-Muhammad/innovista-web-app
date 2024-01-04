import React, { useState } from "react";
import { apiUrl } from "../../config";
import { toast } from "react-toastify";

const currentDate = new Date().toISOString().split("T")[0];

const UpdateJobPostModal = ({
  toggleModal,
  setModalOpen,
  selectedItemData,
  userEmail,
  fetchHiring,
}) => {
  const [formData, setFormData] = useState({
    job_title: selectedItemData.job_title,
    salary: selectedItemData.salary,
    company: selectedItemData.company,
    description: selectedItemData.description,
    job_type: selectedItemData.job_type,
    job_experience: selectedItemData.job_experience,
    job_vacancy: selectedItemData.job_vacancy,
    job_deadline: selectedItemData.job_deadline,
    status: selectedItemData.status,
  });

  const [errors, setErrors] = useState({
    job_title: "",
    salary: "",
    company: "",
    description: "",
    job_type: "",
    job_experience: "",
    job_vacancy: "",
    job_deadline: "",
    status: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  const options = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Internship", label: "Internship" },
    { value: "Contract", label: "Contract" },
  ];

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    let hasErrors = false;

    if (!formData.job_title) {
      newErrors.job_title = "This Field is Required";
      hasErrors = true;
    }

    if (!formData.salary) {
      newErrors.salary = "This Field is Required ";
      hasErrors = true;
    }

    if (!formData.company) {
      newErrors.company = "This Field is Required";
      hasErrors = true;
    }
    if (!formData.description) {
      newErrors.description = "This Field is Required";
      hasErrors = true;
    }
    if (!formData.job_type) {
      newErrors.job_type = "This Field is Required ";
      hasErrors = true;
    }
    if (!formData.job_experience) {
      newErrors.job_experience = "This Field is Required ";
      hasErrors = true;
    }
    if (!formData.job_vacancy) {
      newErrors.job_vacancy = "This Field is Required";
      hasErrors = true;
    }
    if (!formData.job_deadline) {
      newErrors.job_deadline = "This Field is Required";
      hasErrors = true;
    }
    if (!formData.status) {
      newErrors.status = "This Field is Required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      console.log(hasErrors);
      return;
    }

    try {
      // Make an update API call using fetch
      const response = await fetch(
        `${apiUrl}/UpdateJobPost/${selectedItemData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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

      toast.success("Job Ad Updated Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });

      fetchHiring(userEmail, formData);
      toggleModal();
    } catch (error) {
      console.error("Error updating Job Ad:", error);
    }
  };

  return (
    <>
      <div
        className="w-full z-50 h-screen fixed top-0 left-0 bg-gray-900 backdrop-blur-sm bg-opacity-50 overflow-y-hidden max-h-screen"
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="flex  overflow-x-hidden fixed top-0 my-5 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-3rem)] max-h-full">
        <div className="relative w-full max-w-3xl  max-h-full overflow-y-auto">
          <div className="relative bg-white  p-5 shadow   h-full">
            <div className="flex items-center justify-between pb-3 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Update Job Post
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
            <form onSubmit={handleFormSubmit} className=" w-full  h-full py-5">
              <div className="grid gap-x-4 mb-4 grid-cols-2 ">
                <div className="col-span-1 h-24">
                  <label
                    htmlFor="title"
                    className="mb-1 text-base font-semibold"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-indigo-600 rounded"
                    placeholder="Enter title of job"
                    onFocus={() => setErrors({ ...errors, job_title: "" })}
                  />
                  {errors.job_title && (
                    <span className="text-red-500 text-sm ">
                      {errors.job_title}
                    </span>
                  )}
                </div>
                <div className="col-span-1 h-24">
                  <label
                    htmlFor="salary"
                    className="mb-1 text-base font-semibold"
                  >
                    Salary
                  </label>
                  <input
                    type="number"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full py-2 px-3  border border-indigo-600 rounded"
                    placeholder="Enter Salary for this job"
                    onFocus={() => setErrors({ ...errors, salary: "" })}
                    min={1}
                  />
                  {errors.salary && (
                    <span className="text-red-500 text-sm ">
                      {errors.salary}
                    </span>
                  )}
                </div>

                <div className="col-span-1 h-24">
                  <label
                    htmlFor="company"
                    className="mb-1 text-base font-semibold"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full py-2 px-3  border border-indigo-600 rounded"
                    placeholder="Enter Company of job"
                    onFocus={() => setErrors({ ...errors, company: "" })}
                  />
                  {errors.company && (
                    <span className="text-red-500 text-sm ">
                      {errors.company}
                    </span>
                  )}
                </div>

                <div className="col-span-1 h-24">
                  <label
                    htmlFor="jobType"
                    className="mb-1 text-base font-semibold"
                  >
                    Job Type
                  </label>
                  <select
                    name="job_type"
                    onChange={handleChange}
                    value={formData.job_type}
                    onFocus={() => setErrors({ ...errors, job_type: "" })}
                    className="w-full py-2.5 px-3 border border-indigo-600 rounded"
                  >
                    <option value="">Please Select Job type</option>{" "}
                    {/* Placeholder */}
                    {/* Populate options here */}
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {errors.job_type && (
                    <span className="text-red-500 text-sm ">
                      {errors.job_type}
                    </span>
                  )}
                </div>

                <div className="col-span-1 h-24">
                  <label
                    htmlFor="jobExperience"
                    className="mb-1 text-base font-semibold"
                  >
                    Job Experience
                  </label>
                  <input
                    type="number"
                    id="jobExperience"
                    name="job_experience"
                    value={formData.job_experience}
                    onChange={handleChange}
                    className="w-full py-2 px-3  border border-indigo-600 rounded"
                    placeholder="Enter Experience Required for this job"
                    onFocus={() => setErrors({ ...errors, job_experience: "" })}
                    min={0}
                  />
                  {errors.job_experience && (
                    <span className="text-red-500 text-sm ">
                      {errors.job_experience}
                    </span>
                  )}
                </div>
                <div className="col-span-1 h-24">
                  <label
                    htmlFor="jobvacancy"
                    className="mb-1 text-base font-semibold"
                  >
                    Job Vacancy
                  </label>
                  <input
                    type="number"
                    id="jobvacancy"
                    name="job_vacancy"
                    value={formData.job_vacancy}
                    onChange={handleChange}
                    className="w-full py-2 px-3  border border-indigo-600 rounded"
                    placeholder="Enter Number  of Vacancies"
                    onFocus={() => setErrors({ ...errors, job_vacancy: "" })}
                    min={1}
                  />
                  {errors.job_vacancy && (
                    <span className="text-red-500 text-sm ">
                      {errors.job_vacancy}
                    </span>
                  )}
                </div>
                <div className="col-span-1 h-24">
                  <label
                    htmlFor="job_deadline"
                    className="mb-1 text-base font-semibold"
                  >
                    Job Deadline
                  </label>
                  <input
                    type="date"
                    id="job_deadline"
                    name="job_deadline"
                    value={formData.job_deadline}
                    onChange={handleChange}
                    className="w-full py-2 px-3  border border-indigo-600 rounded"
                    placeholder="Enter Deadline of job"
                    onFocus={() => setErrors({ ...errors, job_deadline: "" })}
                    min={currentDate}
                  />
                  {errors.job_deadline && (
                    <span className="text-red-500 text-sm ">
                      {errors.job_deadline}
                    </span>
                  )}
                </div>

                <div className="col-span-1 h-24">
                  <label
                    htmlFor="jobCategory"
                    className="mb-1 text-base font-semibold"
                  >
                    Status
                  </label>
                  <select
                    placeholder="Please Select an Option"
                    name="status"
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, status: "" })}
                    value={formData.status}
                    className="w-full py-2.5 px-3 border border-indigo-600 rounded"
                  >
                    <option value="">Select an option</option>
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                  {errors.status && (
                    <span className="text-red-500 text-sm ">
                      {errors.status}
                    </span>
                  )}
                </div>

                <div className="col-span-2 h-32">
                  <label
                    htmlFor="description"
                    className="mb-1 text-base font-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full py-2 px-3 border border-indigo-600 rounded"
                    placeholder="Enter description of job"
                    onFocus={() => setErrors({ ...errors, description: "" })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm -mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateJobPostModal;
