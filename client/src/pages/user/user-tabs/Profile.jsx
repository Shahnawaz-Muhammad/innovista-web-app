import React, { useState } from "react";
import ProfileHero from "../../../components/dashboard/ProfileHero";
import Bio from "./Bio";

import Education from "./Education";
import Experience from "./Experience";
import Employees from "./Employees";
const Profile = () => {
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isEmployeesOpen,setIsEmployeesOpen]=useState(false);



  const toggleBio = () => {
    setIsBioOpen(!isBioOpen);
  };
  const toggleEducation = () => {
    setIsEducationOpen(!isEducationOpen);
  };
  const toggleExperience = () => {
    setIsExperienceOpen(!isExperienceOpen);
  };
  const toggleEmployee = () => {
    setIsEmployeesOpen(!isEmployeesOpen);
  };

  
  return (
    <div className="pb-20">
      <ProfileHero />
      <div className="w-full mt-10 ">Profile</div>

      <div className=" bg-white mt-6  shadow-lg border-t border-[#dbdbdb]">

        <Bio isBioOpen={isBioOpen} toggleBio={toggleBio} />

        {/* Education Card */}
       
        {/* <Education isEducationOpen={isEducationOpen} toggleEducation={toggleEducation} /> */}


        {/* Experience Card */}
        {/* <Experience isExperienceOpen={isExperienceOpen} toggleExperience={toggleExperience} /> */}


        <Employees isEmployeeOpen={isEmployeesOpen} toggleEmp={toggleEmployee} />
      </div>


    </div>
  );
};

export default Profile;
