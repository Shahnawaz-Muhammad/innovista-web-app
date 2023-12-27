import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ApplyJobModal from "../../../components/dashboard/ApplyJobModal";
import { apiUrl } from "../../../config";
import bgMain from "../../../assets/images/bg-main.png";
import { toast } from "react-toastify";


const JobAds = () => {
  const [jobAds, setJobAds] = useState(null);
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
  const [isJobDetailMobileOpen, setIsJobDetailMobileOpen] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);
  const [applied, Setapplied] = useState([]);
  const [Iserror,setIsError]=useState()

  const handleShowJobDetail = (post) => {
    // If the same item is clicked again, toggle its visibility
    if (jobDetail && jobDetail._id === post._id) {
      setIsJobDetailMobileOpen(!isJobDetailMobileOpen);
    } else {
      // Clicking on a different item, close the current item and open the new one
      setIsJobDetailOpen(true);
      setIsJobDetailMobileOpen(true);
      setJobDetail(post);
    }
  };
  // -------------------------------------//
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [pdfData, setPdfData] = useState(null);
  const [cvData, setCvData] = useState(null);
  

  const fileInputRef = useRef(null);

  const handleApplyJob = (post) => {
    setIsModalOpen(true);
    setCvData(post);
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.size <= 30 * 1024 * 1024) {
        setIsError();
        setPdfData(selectedFile);
      } else {
       setIsError("File Should not be greater then 30 MB");
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPdfData(null);
  };

  const HandlePdfFile = async (event) => {
    if (!cvData) {
      alert("no data");
      return;
    }

    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("cvFile", pdfData);
      formData.append("CompanyEmail", cvData.Email);
      formData.append("JobTitle", cvData.job_title);
      formData.append("Job_id", cvData._id);

      if (!pdfData) {
        toast.error("Please Select File ", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });
        return;
      }
   
      const response = await fetch(
        `${apiUrl}/uploadCV?userEmail=${user.email}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
     // console.log(data);
      CheckEmailIfExist(cvData._id);

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
      toast.success("CV Submitted Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
    
      // console.log(data); // You can handle the response data here
      setPdfData(null);
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false);
  };
  // -------------------------------------//

  const CheckEmailIfExist = async (jobid) => {
    try {
      const response = await fetch(
        "http://192.168.150.134:8080/api/checkEmailAndJobId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            job_id: jobid,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.emailAndJobIdExist === true) {
        Setapplied((prevApplied) => [...prevApplied, { jobid: jobid }]);
      }

      // Handle the response data as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
  };
  // const { user, pdfUrl } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/ShowJobByStatus/${1}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        } else {
          const data = await response.json();
          if (JSON.stringify(data) !== JSON.stringify(jobAds)) {
            data.forEach((item) => {
              CheckEmailIfExist(item._id);
            });
            setJobAds(data);

            if (data.length > 0) {
              setJobDetail(data[0]);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [jobAds]);

  return (
    <>
      <div className=" flex flex-col h-full ">
        <div
          className=" h-40 md:h-60 flex justify-center items-center"
          style={{
            backgroundImage: `url(${bgMain})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h1
            className="text-orange text-5xl font-bold p-5"
            style={{
              backdropFilter: "blur(1x)",
              background: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Jobs
          </h1>
        </div>
        {jobAds?.length > 0 ? (
          <div className="w-full flex gap-5 md:mt-5">
            <div className="w-full md:w-1/2 lg:w-[55%] flex flex-col gap-2 md:gap-0">
              {jobAds
                ?.slice()
                .reverse()
                .map((post) => {
                  const isSelected = jobDetail && jobDetail._id === post._id;
                  return (
                    <div
                      key={post._id}
                      className="border-gray-300 p-5 flex flex-col gap-3 hover:bg-gray-200 border md:border-0 md:border-b-2  rounded-lg md:rounded-none cursor-pointer"
                      onClick={() => handleShowJobDetail(post)}
                    >
                      <div className="flex justify-between">
                        <h2 className="text-md md:text-xl font-semibold">
                          {post.job_title}
                        </h2>
                        <div>
                          <button
                            className={`bg-orange hover:bg-orangeDark ${
                              applied.some(
                                (item) => item.jobid === jobDetail._id
                              ) && "bg-gray-400"
                            } text-sm text-white rounded-lg px-5 py-2 block md:hidden`}
                            disabled={
                              applied.some(
                                (item) => item.jobid === jobDetail._id
                              ) && "Applied"
                            }
                            onClick={() => handleApplyJob(post)} 
                          >
                            {applied.some(
                              (item) => item.jobid === jobDetail._id
                            )
                              ? "Applied" : "Apply Now"}
                          </button>
                        </div>
                      </div>
                      <div className="w-full flex gap-3 md:gap-2 items-center  ">
                        <div className="w-full flex flex-col">
                          <h2 className="text-gray-600 text-md md:text-lg font-semibold">
                            {post.company}
                          </h2>
                          <div>
                            <h1 className="text-gray-600">
                              {post.job_deadline}
                            </h1>
                          </div>
                        </div>
                        <div className="w-full flex flex-col ">
                          <h3 className=" text-gray-600 text-md">
                          {post.salaryFrom} - {post.salaryTo} Rs. per Month
                          </h3>
                          <h3 className=" text-gray-600 text-sm lg:text-md">
                            {post.job_type}
                          </h3>
                        </div>
                      </div>
                      {isSelected && (
                        <div
                          className={`block md:hidden ${
                            isJobDetailMobileOpen ? "block" : "hidden"
                          } border-t md:border-none pt-3`}
                        >
                          <p className="text-sm text-gray-500">
                            {post.description}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            <div
              className={`hidden md:block md:w-1/2 lg:w-[45%] ${
                isJobDetailOpen ? "block" : "hidden"
              } border h-full p-5 shadow-lg rounded-xl`}
            >
              {jobDetail && (
                <div className="flex flex-col gap-3">
                  <h1 className="text-xl font-semibold">
                    {jobDetail.job_title}
                  </h1>
                  <div className="flex md:flex-col md:gap-2 lg:gap-0 lg:flex-row md:justify-between border-b pb-4 text-sm">
                    <div className="flex justify-between w-full">
                      <div className="w-full">
                        <h2 className="font-semibold text-gray-600">
                          {jobDetail.company}
                        </h2>
                        <h2 className="text-sm text-gray-500">
                          {jobDetail.job_deadline}
                        </h2>
                      </div>
                      <div className="w-full">
                        <h2 className="text-gray-500">
                        {jobDetail.salaryFrom} - {jobDetail.salaryTo} Rs. per Month
                        </h2>
                        <p className="text-gray-500">{jobDetail.job_type} </p>
                      </div>
                    </div>
                    <div className="lg:w-[35%]">
                      <button
                        disabled={
                          applied.some(
                            (item) => item.jobid === jobDetail._id
                          ) && "Applied"
                        }
                        className={`bg-orange hover:bg-orangeDark ${
                          applied.some(
                            (item) => item.jobid === jobDetail._id
                          ) && "bg-gray-400"
                        } text-white rounded-lg md:px-5 md:py-2`}
                        onClick={() => handleApplyJob(jobDetail)}
                      >
                        {applied.some((item) => item.jobid === jobDetail._id)
                          ? "Applied"
                          : "Apply Now"}
                      </button>
                    </div>
                  </div>
                  <div className="py-5">
                    <p className="text-sm text-gray-500">
                      {jobDetail.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>No Jobs Available</div>
        )}
        {isModalOpen && (
          <ApplyJobModal
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            handleSelectFile={handleSelectFile}
            pdfData={pdfData}
            HandlePdfFile={HandlePdfFile}
            handleCancel={handleCancel}
            errorMessage={Iserror}
          />
        )}
      </div>
    </>
  );
};

export default JobAds;
