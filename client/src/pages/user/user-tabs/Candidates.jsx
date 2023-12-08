import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { VscFilePdf } from "react-icons/vsc";


const Candidates = () => {
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
      <div className="w-full flex  gap-5 items-center">
        {!candidateList?.allCvs?.length < 1 ? (
          candidateList?.allCvs?.map((candidate) => (
            <div
              key={candidate.id} // Make sure to use a unique key for each item
              className="w-full flex flex-col md:flex-row gap-3 md:gap-2 items-center shadow-[2px_1px_10px_5px_rgba(0,0,0,0.1)] rounded-xl p-5"
            >
              <div className="w-full md:w-[30%] flex flex-col items-center gap-2">
                <h3 className="text-gray-600 font-semibold">Candidate</h3>
                <h1 className="text-black text-xl p-2">{candidate.Email}</h1>
              </div>

              <div className="w-[55%] flex flex-col items-center">
                <h3 className="text-gray-600 font-semibold">Job Title</h3>
                <h3 className="text-gray-600 font-bold">
                  {candidate.JobTitle}
                </h3>
              </div>
              <div className="w-[20%] flex flex-col items-center">
                <a
                  href={`http://localhost:8080/api/${candidate.cvFile}`}
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-600  p-1"
                >
                  <VscFilePdf className="text-3xl"/>
                  <h1 className="text-md">Open CV</h1>

                </a>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="text-black  w-full">
              <h2 className="font-semibold text-xl">No CV for this job</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Candidates;
