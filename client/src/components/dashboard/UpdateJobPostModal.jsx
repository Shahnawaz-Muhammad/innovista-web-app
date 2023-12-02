import React, {  useState } from "react";

const UpdateJobPostModal = ({
  toggleModal,
  setModalOpen,
  selectedItemData,
}) => {

  console.log("selectedItemData", selectedItemData)
  const [formData, setFormData] = useState({
    job_title: selectedItemData.job_title,
    salary: selectedItemData.salary,
    company: selectedItemData.company,
    description: selectedItemData.description,
    job_category: selectedItemData.job_category,
    job_type: selectedItemData.job_type,
    job_experience: selectedItemData.job_experience,
    job_vacancy: selectedItemData.job_vacancy,
    job_deadline: selectedItemData.job_deadline,
    status: selectedItemData.status,
  });
  

  const options = [
    { value: "", label: "Enter Category of job" },
    { value: "fulltime", label: "Full Time" },
    { value: "parttime", label: "Part Time" },
    { value: "internship", label: "Internship" },
    { value: "contract", label: "Contract" },
  ];

  function handleChange(evt) {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an update API call using fetch
      const response = await fetch(
        `http://localhost:8080/api/UpdateJobPost/${selectedItemData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Handle the response accordingly
      if (response.ok) {
        const data = await response.json();
        console.log("Update successful:", data);

        // Close the modal
        toggleModal();
      } else {
        // Handle errors (you may show an error message)
        const errorData = await response.json();
        console.error("Error updating education:", errorData);
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  return (
    <>
      <div
        className="w-full z-50 h-screen fixed top-0 left-0 bg-gray-600 backdrop-blur-sm bg-opacity-50 overflow-y-hidden max-h-screen"
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="flex  overflow-x-hidden fixed top-0 my-5 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-3rem)] max-h-full">
        <div className="relative w-full max-w-2xl  max-h-full overflow-y-auto">
          <div className="relative bg-white  p-5 shadow dark:bg-gray-700  h-full">
            <div className="flex items-center justify-between pb-3 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form
              onSubmit={handleFormSubmit}
              className=" w-full  h-full"
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
                <label
                  htmlFor="salary"
                  className="mb-1 text-base font-semibold"
                >
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
                <label
                  htmlFor="company"
                  className="mb-1 text-base font-semibold"
                >
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
                />
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
                  Job Experience 
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
                />
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
        </div>
      </div>
    </>
  );
};

export default UpdateJobPostModal;
