// ProfileContext.js

import React, { createContext, useState } from "react";
// import { apiUrl } from "../config";
// import { toast } from "react-toastify";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profilePictureChange, setProfilePictureChange] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("");


  const handleProfilePictureChange = () => {
    setProfilePictureChange(!profilePictureChange);
  };
  return (
    <ProfileContext.Provider
      value={{
        profilePictureChange,
        setProfilePictureChange,
        handleProfilePictureChange,
        selectedFile,
        setSelectedFile,
        userName,
        setUserName
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
