import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function PostJob() {
  const currentDate = new Date().toISOString().split("T")[0];

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

  const [errors, setErrors] = useState({
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
    
    try {
      event.preventDefault();

      const newErrors = {};
      let hasErrors = false;

      if (!formData.job_title) {
        newErrors.job_title = "Please enter Job Title";
        hasErrors = true;
      }

      if (!formData.salary) {
        newErrors.salary = "Please enter Job Salary";
        hasErrors = true;
      }

      if (!formData.company) {
        newErrors.company = "Please enter Company Name";
        hasErrors = true;
      }
      if (!formData.description) {
        newErrors.description = "Please enter Job Description";
        hasErrors = true;
      }
      if (!formData.job_category) {
        newErrors.job_category = "Please enter Job Category";
        hasErrors = true;
      }
      if (!formData.job_type) {
        newErrors.job_type = "Please enter Job Type";
        hasErrors = true;
      }
      if (!formData.job_experience) {
        newErrors.job_experience = "Please enter Job Experience";
        hasErrors = true;
      }
      if (!formData.job_vacancy) {
        newErrors.job_vacancy = "Please enter Job Vacancy";
        hasErrors = true;
      }
      if (!formData.job_deadline) {
        newErrors.job_deadline = "Please enter Applying Deadline";
        hasErrors = true;
      }
      if (!formData.status) {
        newErrors.status = "Please enter Job Status";
        hasErrors = true;
      }
      

      if (hasErrors) {
        setErrors(newErrors);
        console.log(hasErrors)
        return;
      }
      // Make an API call to authenticate the user and fetch user data
      const response = await fetch(
        `http://192.168.150.134:8080/api/PostJob?userEmail=${user.email}`,
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
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
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
              Title
            </label>
            <input
              type="text"
              id="title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter title of job"
              onFocus={() => setErrors({ ...errors, job_title: "" })}
            />
            {errors.job_title && (
              <p className="text-red-500 text-xs mt-1">{errors.job_title}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="salary" className="mb-1 text-base font-semibold">
              Salary
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Salary for this job"
              onFocus={() => setErrors({ ...errors, salary: "" })}
            />
            {errors.salary && (
              <p className="text-red-500 text-xs mt-1">{errors.salary}</p>
            )}
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label htmlFor="company" className="mb-1 text-base font-semibold">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Company of job"
              onFocus={() => setErrors({ ...errors, company: "" })}
            />
            {errors.company && (
              <p className="text-red-500 text-xs mt-1">{errors.company}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
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
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter description of job"
              onFocus={() => setErrors({ ...errors, description: "" })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="jobCategory"
              className="mb-1 text-base font-semibold"
            >
              Job Category
            </label>
            <input
              type="text"
              id="jobCategory"
              name="job_category"
              value={formData.job_category}
              onChange={handleChange}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Category of job"
              onFocus={() => setErrors({ ...errors, job_category: "" })}
            />
            {errors.job_category && (
              <p className="text-red-500 text-xs mt-1">{errors.job_category}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
            <label
              htmlFor="jobCategory"
              className="mb-1 text-base font-semibold"
            >
              Job Type
            </label>
            <select
              placeholder="Please Select Job type"
              name="job_type"
              onChange={handleChange}
              value={formData.job_type}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              onFocus={() => setErrors({ ...errors, job_type: "" })}
            >
              {errors.job_type && (
              <p className="text-red-500 text-xs mt-1">{errors.job_type}</p>
            )}
              {/* Populate options here */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
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
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Experience Required for this job"
              onFocus={() => setErrors({ ...errors, job_experience: "" })}
              min={0}
            />
            {errors.job_experience && (
              <p className="text-red-500 text-xs mt-1">{errors.job_experience}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
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
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Number  of Vacancies"
              onFocus={() => setErrors({ ...errors, job_vacancy: "" })}
              min={1}
            />
            {errors.job_vacancy && (
              <p className="text-red-500 text-xs mt-1">{errors.job_vacancy}</p>
            )}
          </div>
          <div className="w-full mb-4  flex flex-col items-start justify-center">
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
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Deadline of job"
              onFocus={() => setErrors({ ...errors, job_deadline: "" })}
              min={currentDate}
            />
            {errors.job_deadline && (
              <p className="text-red-500 text-xs mt-1">{errors.job_deadline}</p>
            )}
          </div>

          <div className="w-full mb-4  flex flex-col items-start justify-center">
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
              value={formData.status}
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
            >              
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
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
