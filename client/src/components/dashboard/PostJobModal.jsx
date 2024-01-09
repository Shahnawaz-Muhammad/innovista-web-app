import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiUrl } from "../../config";
import { toast } from "react-toastify";
import Spinner from "../../Loader/Spinner";
import { useNavigate } from "react-router-dom";

const PostJobModal = ({ toggleModal, setPostJobModalOpen,fetchHiring }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job_title: "",
    salaryFrom: "",
    salaryTo: "",
    company: "",
    description: "",
    job_type: "",
    job_experience: "",
    job_vacancy: "",
    job_deadline: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    job_title: "",
    salaryFrom: "",
    salaryTo: "",
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

  // function handleChange(evt) {
  //   const { name, value } = evt.target;
  
  //   // Update form data with the new value
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  
  //   // Clear the associated error message when the value changes
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: '', // Clear the error for the current field
  //   }));
  // }


  const { user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const newErrors = {};
      let hasErrors = false;

      const requiredFields = [
        "job_title",
        "salaryFrom",
        "salaryTo",
        "company",
        "description",
        "job_type",
        "job_experience",
        "job_vacancy",
        "job_deadline",
        "status",
      ];

      requiredFields.forEach((field) => {
        if (!formData[field]) {
          newErrors[field] = "This Field is Required";
          hasErrors = true;
        }
      });
  
      if (hasErrors) {
        setErrors(newErrors);
        console.log("Form has errors:", newErrors);
        return;
      }


      // Make an API call to authenticate the user and fetch user data
      setLoading(true);
      const response = await fetch(
        `${apiUrl}/PostJob?userEmail=${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_title: formData.job_title,
            salaryFrom: formData.salaryFrom,
            salaryTo: formData.salaryTo,
            company: formData.company,
            description: formData.description,
            job_type: formData.job_type,
            job_experience: formData.job_experience,
            job_vacancy: formData.job_vacancy,
            status: formData.status,
            job_deadline: formData.job_deadline,
          }),
        }
      );

      if (!response.ok) {
        // throw new Error("Failed to post a job");
        const errorData = await response.json();
        console.log(errorData)
        toast.error("Failed to post a job", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
        setLoading(false);
        return;
      }
      toast.success("Job Posted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
      setLoading(false);
      setPostJobModalOpen(false);

      setFormData({
        job_title: "",
        salaryFrom: "",
        salaryTo: "",
        company: "",
        description: "",
        job_type: "",
        job_experience: "",
        job_vacancy: "",
        job_deadline: "",
        status: "",
      });
      fetchHiring()
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const options = [
    { value: "", label: "Enter Job Type" },
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Internship", label: "Internship" },
    { value: "Contract", label: "Contract" },
  ];
  return (
    <>
      <div
        className="w-full z-50 h-screen fixed top-0 left-0 bg-gray-600 backdrop-blur-sm bg-opacity-50"
        onClick={() => setPostJobModalOpen(false)}
      ></div>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-3xl max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">Post Job</h3>
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
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-x-5 mb-4 grid-cols-2">
                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col ">
                  <label
                    htmlFor="title"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                    placeholder="Enter Title of Job"
                    onFocus={() => setErrors({ ...errors, job_title: "" })}
                  />
                  {errors.job_title && (
                    <p className="text-[#fa0505]  text-sm pl-2">
                      {errors.job_title}
                    </p>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="company"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                    placeholder="Enter Company Name"
                    onFocus={() => setErrors({ ...errors, company: "" })}
                  />
                  {errors.company && (
                    <p className="text-[#fa0505]  text-sm pl-2">
                      {errors.company}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="job_type"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Job Type
                  </label>
                  <select
                    placeholder="Please Select Job type"
                    name="job_type"
                    onChange={handleChange}
                    value={formData.job_type}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    onFocus={() => setErrors({ ...errors, job_type: "" })}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.job_type && (
                    <p className="text-[#fa0505]  text-sm pl-2">
                      {errors.job_type}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="job_deadline"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Job Deadline
                  </label>
                  <input
                    type="date"
                    id="job_deadline"
                    name="job_deadline"
                    value={formData.job_deadline}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                    placeholder="Enter Deadline of job"
                    onFocus={() => setErrors({ ...errors, job_deadline: "" })}
                    min={currentDate}
                  />
                  {errors.job_deadline && (
                    <p className="text-[#fa0505]  text-sm pl-2">
                      {errors.job_deadline}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="jobExperience"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Job Experience
                  </label>
                  <input
                    type="number"
                    id="jobExperience"
                    name="job_experience"
                    value={formData.job_experience}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                    placeholder="Enter Experience Required for this Job"
                    onFocus={() => setErrors({ ...errors, job_experience: "" })}
                    min={0}
                  />
                  {errors.job_experience && (
                    <p className="text-[#fa0505]  text-sm pl-2">
                      {errors.job_experience}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <div className="h-[5.5rem] w-full flex flex-col items-start ">
                    <label
                      htmlFor="jobSalary"
                      className="block  text-sm font-medium text-gray-900 "
                    >
                      Salary Range
                    </label>
                    <div className="flex gap-2 w-full">
                      <div className="flex flex-col w-full">
                        <input
                          type="number"
                          id="jobSalary"
                          name="salaryFrom"
                          value={formData.salaryFrom}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                          placeholder="Salary From"
                          onFocus={() =>
                            setErrors({ ...errors, salaryFrom: "" })
                          }
                          min={0}
                        />
                        {errors.salaryFrom && (
                          <p className="text-[#fa0505]  text-sm pl-2">
                            {errors.salaryFrom}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <input
                          type="number"
                          id="jobSalary"
                          name="salaryTo"
                          value={formData.salaryTo}
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                          placeholder="Salary To"
                          onFocus={() => setErrors({ ...errors, salaryTo: "" })}
                          min={0}
                        />
                        {errors.salaryTo && (
                          <p className="text-[#fa0505]  text-sm pl-2">
                            {errors.salaryTo}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="job_vacancy"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Job Vacancy
                  </label>
                  <input
                    type="number"
                    id="job_vacancy"
                    name="job_vacancy"
                    value={formData.job_vacancy}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                    placeholder="Number of Vacancies"
                    onFocus={() => setErrors({ ...errors, job_vacancy: "" })}
                    min={1}
                  />
                  {errors.job_vacancy && (
                    <p className="text-[#fa0505]  text-sm pl-2">
                      {errors.job_vacancy}
                    </p>
                  )}
                </div>

                <div className="col-span-2 md:col-span-1  h-[5.5rem] flex flex-col">
                  <label
                    htmlFor="status"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Status
                  </label>
                  <select
                    placeholder="Please Select an Option"
                    name="status"
                    onChange={handleChange}
                    value={formData.status}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    onFocus={() => setErrors({ ...errors, status: "" })}
                  >
                    <option value="">Select an option</option>
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                  {errors.status && (
                    <p className="text-[#fa0505]  text-sm pl-2">
                      {errors.status}
                    </p>
                  )}
                </div>

                <div className="col-span-full md:col-span-full  h-[5.5rem] flex flex-col">
                 <div>
                 <label
                    htmlFor="description"
                    className="block  text-sm font-medium text-gray-900 "
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2 "
                    placeholder="Enter description of job"
                    onFocus={() => setErrors({ ...errors, description: "" })}
                  />
                 </div>
                  {errors.description && (
                    <p className="text-[#fa0505]  text-sm pl-2">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">

              <button
                type="submit"
                className="mt-7 px-5 py-2 rounded bg-orange text-white font-semibold "
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

export default PostJobModal;
