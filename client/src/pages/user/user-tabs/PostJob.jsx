import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import bgMain from "../../../assets/images/bg-main.png";
import { apiUrl } from "../../../config";

export default function PostJob() {
  const currentDate = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
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

  const { user } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const newErrors = {};
      let hasErrors = false;

      if (!formData.job_title) {
        newErrors.job_title = "Please Enter Job Title";
        hasErrors = true;
      }

      if (!formData.salary) {
        newErrors.salary = "Please Enter Job Salary";
        hasErrors = true;
      }

      if (!formData.company) {
        newErrors.company = "Please Enter Company Name";
        hasErrors = true;
      }
      if (!formData.description) {
        newErrors.description = "Please Enter Job Description";
        hasErrors = true;
      }
      if (!formData.job_type) {
        newErrors.job_type = "Please Enter Job Type";
        hasErrors = true;
      }
      if (!formData.job_experience) {
        newErrors.job_experience = "Please Enter Job Experience";
        hasErrors = true;
      }
      if (!formData.job_vacancy) {
        newErrors.job_vacancy = "Please Enter Job Vacancies";
        hasErrors = true;
      }
      if (!formData.job_deadline) {
        newErrors.job_deadline = "Please Enter Deadline";
        hasErrors = true;
      }
      if (!formData.status) {
        newErrors.status = "Please Enter Job Status";
        hasErrors = true;
      }

      if (hasErrors) {
        setErrors(newErrors);
        console.log("Form has errors:", hasErrors);
        return;
      }
      // Make an API call to authenticate the user and fetch user data
      const response = await fetch(
        `${apiUrl}/PostJob?userEmail=${user.email}`,
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
            job_type: formData.job_type,
            job_experience: formData.job_experience,
            job_vacancy: formData.job_vacancy,
            status: formData.status,
            job_deadline: formData.job_deadline,
          }),
        }
      );
      console.log("Response status:", response.status);
      console.log(formData);

      setFormData({
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
      <div
        className=" flex flex-col absolute left-0 top-0 w-full "
        style={{
          backgroundImage: `url(${bgMain})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "-1",
        }}
      >
        <div className="flex flex-col py-12 justify-center items-center">
          <h1
            className="font-extrabold text-orange text-5xl p-5 "
            // style={{ backdropFilter: 'blur(1x)', background: 'rgba(255, 255, 255, 0.8)' }}
          >
            Job Details
          </h1>
          <form
            className=" w-full md:w-2/3 my-10 p-5 rounded-lg"
            style={{
              backdropFilter: "blur(5x)",
              background: "rgba(255, 255, 255, 0.4)",
            }}
            onSubmit={handleSubmit}
          >
            <div className="flex  flex-wrap justify-center">
              <div className="h-[5.5rem] w-full px-3 md:w-1/2  flex flex-col items-start ">
                <label
                  htmlFor="title"
                  className="pl-3  text-base font-semibold"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-indigo-600 rounded "
                  placeholder="Enter title of job"
                  onFocus={() => setErrors({ ...errors, job_title: "" })}
                />
                {errors.job_title && (
                  <p className="text-[#fa0505] font-semibold text-sm pl-3">
                    {errors.job_title}
                  </p>
                )}
              </div>
              <div className="h-[5.5rem] w-full px-3 md:w-1/2   flex flex-col items-start ">
                <label
                  htmlFor="company"
                  className="pl-3 text-base font-semibold"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-indigo-600 rounded"
                  placeholder="Enter Company Name"
                  onFocus={() => setErrors({ ...errors, company: "" })}
                />
                {errors.company && (
                  <p className="text-[#fa0505] font-semibold text-sm pl-3">
                    {errors.company}
                  </p>
                )}
              </div>
              <div className="h-[5.5rem] w-full px-3 md:w-1/2   flex flex-col items-start ">
                <label
                  htmlFor="job_type"
                  className="pl-3 text-base font-semibold"
                >
                  Job Type
                </label>
                <select
                  placeholder="Please Select Job type"
                  name="job_type"
                  onChange={handleChange}
                  value={formData.job_type}
                  className="w-full py-2.5 px-3 border border-indigo-600 rounded"
                  onFocus={() => setErrors({ ...errors, job_type: "" })}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.job_type && (
                  <p className="text-[#fa0505] font-semibold text-sm pl-3">
                    {errors.job_type}
                  </p>
                )}
              </div>

              <div className="h-[5.5rem] w-full px-3 md:w-1/2   flex flex-col items-start ">
                <label
                  htmlFor="job_deadline"
                  className="pl-3  text-base font-semibold"
                >
                  Job Deadline
                </label>
                <input
                  type="date"
                  id="job_deadline"
                  name="job_deadline"
                  value={formData.job_deadline}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-indigo-600 rounded"
                  placeholder="Enter Deadline of job"
                  onFocus={() => setErrors({ ...errors, job_deadline: "" })}
                  min={currentDate}
                />
                {errors.job_deadline && (
                  <p className="text-[#fa0505] font-semibold text-sm pl-3">
                    {errors.job_deadline}
                  </p>
                )}
              </div>

              <div className="h-[5.5rem] w-full px-3 lg:w-1/3   flex flex-col items-start ">
                <label
                  htmlFor="jobExperience"
                  className="pl-3  text-base font-semibold"
                >
                  Job Experience
                </label>
                <input
                  type="number"
                  id="jobExperience"
                  name="job_experience"
                  value={formData.job_experience}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-indigo-600 rounded"
                  placeholder="Enter Experience Required for this job"
                  onFocus={() => setErrors({ ...errors, job_experience: "" })}
                  min={0}
                />
                {errors.job_experience && (
                  <p className="text-[#fa0505] font-semibold text-sm pl-3">
                    {errors.job_experience}
                  </p>
                )}
              </div>
              <div className="h-[5.5rem] w-full px-3 md:w-1/2 lg:w-1/3   flex flex-col items-start ">
                <label
                  htmlFor="job_vacancy"
                  className="pl-3  text-base font-semibold"
                >
                  Job Vacancy
                </label>
                <input
                  type="number"
                  id="job_vacancy"
                  name="job_vacancy"
                  value={formData.job_vacancy}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-indigo-600 rounded"
                  placeholder="Number of Vacancies"
                  onFocus={() => setErrors({ ...errors, job_vacancy: "" })}
                  min={1}
                />
                {errors.job_vacancy && (
                  <p className="text-[#fa0505] font-semibold text-sm pl-3">
                    {errors.job_vacancy}
                  </p>
                )}
              </div>

              <div className="h-[5.5rem] w-full px-3 md:w-1/2 lg:w-1/3   flex flex-col items-start ">
                <label
                  htmlFor="status"
                  className="pl-3  text-base font-semibold"
                >
                  Status
                </label>
                <select
                  placeholder="Please Select an Option"
                  name="status"
                  onChange={handleChange}
                  value={formData.status}
                  className="w-full py-2.5 px-3 border border-indigo-600 rounded"
                  onFocus={() => setErrors({ ...errors, status: "" })}
                >
                  <option value="">Select an option</option>
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-[#fa0505] font-semibold text-sm pl-3">
                    {errors.status}
                  </p>
                )}
              </div>
              <div className="h-32 w-full px-3  flex flex-col items-start ">
                <label
                  htmlFor="description"
                  className="pl-3  text-base font-semibold"
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
                  <p className="text-[#fa0505] font-semibold text-sm pl-3">
                    {errors.description}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-5 p-2 rounded bg-indigo-600 text-white font-semibold "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
