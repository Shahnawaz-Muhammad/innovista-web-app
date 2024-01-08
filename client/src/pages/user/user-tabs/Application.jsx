import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { apiUrl } from "../../../config";
import { useLocation } from "react-router-dom";
import ApplicantList from "../../../components/dashboard/ApplicantList";

const Application = () => {
  const [candidateList, setCandidateList] = useState(null);
  const { user } = useContext(AuthContext);

  const location = useLocation();

  // Extract 'id' from state
  const { id } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/getAllByJobId?companyEmail=${user.email}&job_id=${id}`
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
  }, [user.email, candidateList, id]);
  return (
    <div className=" flex flex-col h-full  ">
      <div className="w-full flex justify-center items-center gap-3">
        <div className="mt-5  w-full flex flex-col  max-h-full ">
          <ApplicantList candidateList={candidateList} />
        </div>
      </div>
    </div>
  );
};

export default Application;
