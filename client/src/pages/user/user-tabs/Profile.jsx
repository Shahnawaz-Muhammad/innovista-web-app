import React, { useContext, useState } from "react";
import ProfileHero from "../../../components/dashboard/ProfileHero";
import Bio from "./Bio";

import Education from "./Education";
import Experience from "./Experience";
import Employees from "./Employees";
import { AuthContext } from "../../../context/AuthContext";
const Profile = () => {
  const [isBioOpen, setIsBioOpen] = useState(true);
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
  const [profilePictureChange, setProfilePictureChange] = useState(false);
  
  const { user } = useContext(AuthContext);

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


  const handleProfilePictureChange = () => {
    setProfilePictureChange(!profilePictureChange);
  };
  return (
    <div className="pb-20">
       <ProfileHero
        onProfilePictureChange={handleProfilePictureChange}
        profilePictureChange={profilePictureChange}
      />

      <div className=" bg-white mt-6 border-t border-[#dbdbdb]">
        <Bio isBioOpen={isBioOpen} toggleBio={toggleBio} user={user}/>

        {user.category === "Freelancer" ? 
        <>
        <Education
          isEducationOpen={isEducationOpen}
          toggleEducation={toggleEducation}
        />

        <Experience
          isExperienceOpen={isExperienceOpen}
          toggleExperience={toggleExperience}
        />
        </> :
        <Employees
          isEmployeeOpen={isEmployeesOpen}
          toggleEmp={toggleEmployee}
        />
        }

      </div>
    </div>
  );
};

export default Profile;
