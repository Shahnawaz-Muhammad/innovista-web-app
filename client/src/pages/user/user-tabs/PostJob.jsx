import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function PostJob() {
  const [formData, setFormData] = useState({
    job_title: "",
    salary: "",
    company: "",
    description: "",
    job_category: "",
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

  const { user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    console.log("formData", formData);
    try {
      event.preventDefault();
      // Make an API call to authenticate the user and fetch user data
      const response = await fetch(
        `http://localhost:8080/api/PostJob?userEmail=${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_title: formData.job_title,
            salary: formData.salary,
            company: formData.company,
            description: formData.description,
            job_category: formData.job_category,
            job_type: formData.job_type,
            job_experience: formData.job_experience,
            job_vacancy: formData.job_vacancy,
            job_deadline: formData.job_deadline,
            status: formData.status,
          }),
        }
      );
      console.log("Form submitted successfully");

      setFormData({
        job_title: "",
        salary: "",
        company: "",
        description: "",
        job_category: "",
        job_type: "",
        job_experience: "",
        job_vacancy: "",
        job_deadline: "",
        status: "",
      })
      if (!response.ok) {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const options = [
    { value: "", label: "Enter Category of job" },
    { value: "fulltime", label: "Full Time" },
    { value: "parttime", label: "Part Time" },
    { value: "internship", label: "Internship" },
    { value: "contract", label: "Contract" },
  ];

  return (
    <>
      <div className="w-full  py-20 flex items-center  justify-center flex-col">
        <h1 className="text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl">
          Enter Job Details
        </h1>
        <form
          onSubmit={handleSubmit}
          className="sm:w-1/2 w-full px-4 mx-4  h-full"
        >
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Title :
            </label>
            <input
              type="text"
              id="title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter title of job"
            />
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="salary" className="mb-1 text-base font-semibold">
              Salary :
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Salary for this job"
            />
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="company" className="mb-1 text-base font-semibold">
              Company :
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Company of job"
            />
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="description"
              className="mb-1 text-base font-semibold"
            >
              Description :
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter description of job"
            />
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="jobCategory"
              className="mb-1 text-base font-semibold"
            >
              Job Category :
            </label>
            <input
              type="text"
              id="jobCategory"
              name="job_category"
              value={formData.job_category}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Category of job"
            />
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="jobCategory"
              className="mb-1 text-base font-semibold"
            >
              Job Type :
            </label>
            <select
              placeholder="Please Select Job type"
              name="job_type"
              onChange={handleChange}
              value={formData.job_type}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            >
              {/* Populate options here */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center"></div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="jobExperience"
              className="mb-1 text-base font-semibold"
            >
              Job Experience :
            </label>
            <input
              type="text"
              id="jobExperience"
              name="job_experience"
              value={formData.job_experience}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Experience Required for this job"
            />
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="jobvacancy"
              className="mb-1 text-base font-semibold"
            >
              Job Vacancy :
            </label>
            <input
              type="number"
              id="jobvacancy"
              name="job_vacancy"
              value={formData.job_vacancy}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Number  of Vacancies"
            />
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="job_deadline"
              className="mb-1 text-base font-semibold"
            >
              Job Deadline :
            </label>
            <input
              type="date"
              id="job_deadline"
              name="job_deadline"
              value={formData.job_deadline}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Deadline of job"
            />
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="jobCategory"
              className="mb-1 text-base font-semibold"
            >
              Status :
            </label>
            <select
              placeholder="Please Select an Option"
              name="status"
              onChange={handleChange}
              value={formData.status}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            >
              <option value="">Select an option</option>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
