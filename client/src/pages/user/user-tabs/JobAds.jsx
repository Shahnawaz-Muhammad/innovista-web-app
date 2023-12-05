import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import emailjs from "emailjs-com";

const JobAds = () => {
  const [jobAds, setJobAds] = useState(null);

  const { user, pdfUrl } = useContext(AuthContext);
  console.log("pdfUrl",pdfUrl)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/ShowJobByStatus/${1}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setJobAds(data); // setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [jobAds]);

  const handleApply = async (receiverEmail) => {
    try {
      const templateParams = {
        to_email: receiverEmail,
        from_name: user.email,
        cvLink: pdfUrl,
      };

      const file = await fetch(pdfUrl).then((res) => res.blob());



      const response = await emailjs.send(
        "service_xvm6qji", // replace with your serviceID
        "template_1q4scwi", // replace with your templateID
        templateParams,
        "iXLqSwaAmmr_ku5qW", // replace with your userID
        { attachments: [{ file: file, name: "cv.pdf" }] }
        );

      console.log(response);

      // Handle success or show a notification to the user
    } catch (error) {
      console.error(error);
      // Handle error or show an error notification to the user
    }
  };

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
                    onClick={() => handleApply(post.Email)}
                    className="w-full bg-orange hover:bg-orangeDark text-white px-10 py-2 text-md"
                  >
                    Apply Now
                  </button>
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
