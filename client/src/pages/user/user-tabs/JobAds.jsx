import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const JobAds = () => {
  const [jobAds, setJobAds] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, pdfUrl } = useContext(AuthContext);
  const [pdfData, setPdfData] = useState(null);
  const [cvData, setCvData] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = (post) => {
    setIsModalOpen(true);
    setCvData(post);
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setPdfData(selectedFile);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPdfData(null);
  };

  const HandlePdfFile = async (event) => {
    if(!cvData){
      alert("no data")
      return
    }

    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("cvFile", pdfData);
      formData.append("CompanyEmail", cvData.Email);
      formData.append("JobTitle", cvData.job_title);

      if (!pdfData) {
        alert("Please select a file.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/uploadCV?userEmail=${user.email}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data); // You can handle the response data here
      setPdfData(null);
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.150.134:8080/api/getCV/${1}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        } else {
          const data = await response.json();
          if (JSON.stringify(data) !== JSON.stringify(jobAds)) {
            setJobAds(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [jobAds]);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-3">
        {jobAds?.map((post) => {
          return (
            <div className="w-full flex  gap-5 items-center">
              <div className="w-full flex flex-col md:flex-row gap-3 md:gap-2 items-center shadow-[2px_1px_10px_5px_rgba(0,0,0,0.1)] rounded-xl p-5">
                {/* <div className="w-20 md:w-40">
                <h1>{post.location}</h1>
                </div> */}
                <div className="w-full flex flex-col items-center gap-2">
                  <h2 className="text-gray-600 text-lg font-semibold">
                    {post.job_title}
                  </h2>
                  {/* <h2>{post.job_title}</h2> */}
                  <h1>{post.description}</h1>
                </div>
                <div className="w-full flex flex-col items-center gap-2 ">
                  <h1 className="font-semibold">{post.company}</h1>
                </div>
                <div className="w-[35%] flex flex-col items-center">
                  <h3 className=" text-gray-600 ">{post.salary} </h3>
                  <h3 className="text-sm text-gray-600">per year</h3>
                </div>
                <h3 className="w-[20%] text-gray-600 text-sm">Full Time</h3>
                <div className="w-[35%] flex flex-col items-center text-center">
                  <h3 className=" text-gray-600 ">
                    No. of Positions: {post.job_vacancy}{" "}
                  </h3>

                  <h3 className="text-sm text-gray-600">
                    {post?.job_deadline &&
                      new Date(post.job_deadline).toLocaleDateString("en-US")}
                  </h3>
                </div>
                <div className="lg:w-[50%]">
                  <button
                    onClick={() => handleButtonClick(post)}
                    className="w-full bg-orange hover:bg-orangeDark text-white px-10 py-2 text-md"
                  >
                    Apply Now
                  </button>
                  {isModalOpen && (
                    <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 ">
                      <div className="flex items-center justify-center min-h-screen ">
                        <div className="bg-white p-8 rounded-lg shadow-md text-black w-[40rem] overflow-hidden">
                          <h2 className="text-2xl font-bold">Choose File</h2>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="application/pdf"
                            onChange={handleFileChange}
                          />
                          <button
                            className="text-lg mt-4 border p-1"
                            onClick={handleSelectFile}
                          >
                            {pdfData ? pdfData.name : "Select file"}
                          </button>
                          <div className="flex gap-1 mt-5">
                            <button
                              className="bg-blue-300 text-white px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring focus:border-blue-300"
                              onClick={HandlePdfFile}
                            >
                              UploadFile
                            </button>
                            <button
                              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring focus:border-blue-300"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobAds;
