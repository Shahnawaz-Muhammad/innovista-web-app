import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { VscFilePdf } from "react-icons/vsc";
import bgMain from "../../../assets/images/bg-main.png";

const Application = () => {
  const [candidateList, setCandidateList] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/getAllCVs?companyEmail=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        } else {
          const data = await response.json();

          if (JSON.stringify(data) !== JSON.stringify(candidateList)) {
            setCandidateList(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email, candidateList]);

  return (
    <div>
      <div className=" flex flex-col h-full ">
        <div
          className=" h-60  flex justify-center items-center"
          style={{
            backgroundImage: `url(${bgMain})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h1 className="font-extrabold text-orange text-5xl p-5 " 
              style={{ backdropFilter: 'blur(1x)', background: 'rgba(255, 255, 255, 0.6)' }} 
          >
            Applicants</h1>
        </div>
        <div className=" -mt-10 w-full  flex  justify-center items-center gap-3">
          <div className="w-full md:w-2/3 bg-white rounded-lg flex flex-col shadow-sm shadow-orange">
            {!candidateList?.allCvs?.length < 1 ? (
              candidateList?.allCvs?.map((candidate) => (
                <div
                  // key={index}
                  className={`flex flex-col  justify-between items-center  py-5 rounded-md `}
                >
                  <div className="w-full flex flex-col md:flex-row justify-around ">
                    <div className="w-full md:w-2/5 flex flex-col items-center ">
                      <h3 className=" font-semibold underline">Applicant</h3>
                      <h1 className="text-gray-600 text-xl md:mt-2 ">
                        {candidate.Email}
                      </h1>
                    </div>

                    <div className="w-full md:w-2/5 flex flex-col items-center mt-2 md:mt-0">
                      <h3 className=" font-semibold underline">Job Title</h3>
                      <h3 className="text-gray-600 text-xl  md:mt-2">
                        {candidate.JobTitle}
                      </h3>
                    </div>
                    <div className="w-full md:w-1/5 flex flex-col justify-center items-center mt-2 md:mt-0">
                      <a
                        href={`http://localhost:8080/api/${candidate.cvFile}`}
                        rel="noreferrer"
                        target="_blank"
                        className=" "
                      >
                        <VscFilePdf className="text-5xl" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-black h-20 flex justify-center items-center">
                <h2 className="font-semibold text-xl ">No Applicants</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
