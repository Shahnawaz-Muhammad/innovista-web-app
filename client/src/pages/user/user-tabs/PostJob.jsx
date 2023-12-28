import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import bgMain from "../../../assets/images/bg-main.png";
import { apiUrl } from "../../../config";
import { toast } from "react-toastify";
import Spinner from "../../../Loader/Spinner";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate()
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
  const [loading,setLoading]=useState(false);
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

      if (requiredFields.some((field) => !formData[field])) {
        requiredFields.forEach((field) => {
          newErrors[field] = "This field is required";
        });
        hasErrors = true;
      }

      if (hasErrors) {
        setErrors(newErrors);
        console.log("Form has errors:", errors);
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
      navigate("/dashboard/hirings")

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
        <div className="flex flex-col gap-3 py-12 justify-center items-center">
          <h1
            className="font-extrabold text-white text-3xl md:text-5xl  "
            // style={{ backdropFilter: 'blur(1x)', background: 'rgba(255, 255, 255, 0.8)' }}
          >
            Job Details
          </h1>
          <form
          className="mb-5 w-full md:w-4/5 lg:w-2/3 p-5 rounded-lg "
          style={{
              backdropFilter: "blur(5x)",
              background: "rgba(255, 255, 255, 0.8)",
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
                  className="w-full py-2 px-3 border border-orange rounded focus:outline-none "
                  placeholder="Enter title of job"
                  onFocus={() => setErrors({ ...errors, job_title: "" })}
                />
                {errors.job_title && (
                  <p className="text-[#fa0505]  text-md pl-2">
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
                  className="w-full py-2 px-3 border border-orange rounded focus:outline-none"
                  placeholder="Enter Company Name"
                  onFocus={() => setErrors({ ...errors, company: "" })}
                />
                {errors.company && (
                  <p className="text-[#fa0505]  text-md pl-2">
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
                  className="w-full py-2.5 px-3 border border-orange rounded"
                  onFocus={() => setErrors({ ...errors, job_type: "" })}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.job_type && (
                  <p className="text-[#fa0505]  text-md pl-2">
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
                  className="w-full py-2 px-3 border border-orange rounded focus:outline-none"
                  placeholder="Enter Deadline of job"
                  onFocus={() => setErrors({ ...errors, job_deadline: "" })}
                  min={currentDate}
                />
                {errors.job_deadline && (
                  <p className="text-[#fa0505]  text-md pl-2">
                    {errors.job_deadline}
                  </p>
                )}
              </div>

              <div className="h-[5.5rem] w-full px-3 md:w-1/2   flex flex-col items-start ">
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
                  className="w-full py-2 px-3 border border-orange rounded focus:outline-none"
                  placeholder="Enter Experience Required for this job"
                  onFocus={() => setErrors({ ...errors, job_experience: "" })}
                  min={0}
                />
                {errors.job_experience && (
                  <p className="text-[#fa0505]  text-md pl-2">
                    {errors.job_experience}
                  </p>
                )}
              </div>
              <div className="h-[5.5rem] w-full px-3 md:w-1/2   flex flex-col items-start ">
                <label
                  htmlFor="jobSalary"
                  className="pl-3  text-base font-semibold"
                >
                  Salary Range
                </label>
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col w-full">
                    <input
                      type="number"
                      id="jobSalary"
                      name="salaryFrom"
                      value={formData.salaryFrom}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-orange rounded focus:outline-none"
                      placeholder="Salary From"
                      onFocus={() => setErrors({ ...errors, salaryFrom: "" })}
                      min={0}
                    />
                    {errors.salaryFrom && (
                      <p className="text-[#fa0505]  text-md pl-2">
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
                      className="w-full py-2 px-3 border border-orange rounded focus:outline-none"
                      placeholder="Salary To"
                      onFocus={() => setErrors({ ...errors, salaryTo: "" })}
                      min={0}
                    />
                    {errors.salaryTo && (
                      <p className="text-[#fa0505]  text-md pl-2">
                        {errors.salaryTo}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-[5.5rem] w-full px-3 md:w-1/2 flex flex-col items-start ">
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
                  className="w-full py-2 px-3 border border-orange rounded focus:outline-none"
                  placeholder="Number of Vacancies"
                  onFocus={() => setErrors({ ...errors, job_vacancy: "" })}
                  min={1}
                />
                {errors.job_vacancy && (
                  <p className="text-[#fa0505]  text-md pl-2">
                    {errors.job_vacancy}
                  </p>
                )}
              </div>

              <div className="h-[5.5rem] w-full px-3 md:w-1/2 flex flex-col items-start ">
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
                  className="w-full py-2.5 px-3 border border-orange rounded focus:outline-none"
                  onFocus={() => setErrors({ ...errors, status: "" })}
                >
                  <option value="">Select an option</option>
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-[#fa0505]  text-md pl-2">
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
                  className="w-full py-2 px-3 border border-orange rounded focus:outline-none"
                  placeholder="Enter description of job"
                  onFocus={() => setErrors({ ...errors, description: "" })}
                />
                {errors.description && (
                  <p className="text-[#fa0505]  text-md pl-2">
                    {errors.description}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-5 px-5 py-2 rounded bg-orange text-white font-semibold "
              >
                {loading ? <Spinner size={30}/> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
