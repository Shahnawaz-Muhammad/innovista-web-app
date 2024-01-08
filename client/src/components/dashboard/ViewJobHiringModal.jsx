import React from "react";

const ViewJobHiringModal = ({ toggleModal, jobDetail }) => {
  console.log(jobDetail);
  return (
    <>
      <div
        className="w-full z-50 h-screen fixed top-0 left-0 bg-gray-900 backdrop-blur-sm bg-opacity-50 overflow-y-hidden max-h-screen"
        onClick={toggleModal}
      ></div>
      <div className="flex  overflow-x-hidden fixed top-0 my-5 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-3rem)] max-h-full">
        <div className="relative w-full max-w-3xl  max-h-full overflow-y-auto">
          <div className="relative bg-white  p-5 shadow   h-full">
            <div className="flex items-center justify-between pb-3 border-b rounded-t ">
              <h3 className="text-lg font-semibold text-gray-900 ">
                Job Details
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
            <div className="w-full">
              <div className="mt-3 w-full flex flex-col gap-3">
                <h2 className="text-xl font-semibold">{jobDetail.job_title}</h2>
                <div className="border-b pb-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <h2>
                      <span className="font-semibold">Salary:</span> PKR {jobDetail.salaryFrom} - PKR
                      {jobDetail.salaryTo}
                    </h2>
                    <h2>
                      <span className="font-semibold">Job Type:</span> {jobDetail.job_experience}
                    </h2>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between">
                    <h2>
                      <span className="font-semibold">Job Type:</span> {jobDetail.job_type}
                    </h2>

                    <h2>
                      <span className="font-semibold">Vacancy:</span> {jobDetail.job_vacancy}
                    </h2>
                    <h2>
                      <span className="font-semibold">Deadline:</span> {jobDetail.job_deadline}
                    </h2>
                  </div>
                </div>

                <div>
                  <h2 className="font-bold text-lg">Job Description:</h2>
                  <p className="text-gray-600 text-justify">
                    {jobDetail.description}
                  </p>
                </div>

                <div className="flex justify-end mt-5">
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="flex items-center justify-center gap-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2  focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewJobHiringModal;
