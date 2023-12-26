import React, { useContext, useEffect, useState } from "react";
import { BsEnvelope } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { apiUrl } from "../../config";
import Modal from "react-modal"; // Import the modal library
import "react-toastify/dist/ReactToastify.css";


const modalStyles = {
  content: {
    height:"150px",
    width: "400px", // Adjust the width as needed
    margin: "auto", // Center the modal horizontally
    top: "50%", // Center the modal vertically
    transform: "translateY(-50%)",
  },
};

const ProfileHero = ({ onProfilePictureChange, profilePictureChange }) => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSizeExceededModalOpen, setIsSizeExceededModalOpen] = useState(false);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      // Check the file size
      if (file.size > 5 * 1024 * 1024) {
        // Open the size exceeded modal
        setIsSizeExceededModalOpen(true);
        return;
      }


      const formData = new FormData();
      formData.append("profilePicture", file);

      try {
        const response = await fetch(
          `${apiUrl}/uploadProfilePicture?userEmail=${user.email}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          console.log("Image uploaded successfully");
          setIsSizeExceededModalOpen(false);
          onProfilePictureChange();
         
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await fetch(
          `${apiUrl}/bio?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (JSON.stringify(data) !== JSON.stringify(userInfo)) {
          setUserInfo(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email, userInfo]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/getProfilePicture?userEmail=${user?.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (JSON.stringify(data) !== JSON.stringify(selectedFile)) {
          setSelectedFile(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfilePicture();
  }, [user.email, selectedFile,onProfilePictureChange, profilePictureChange]);
  return (
    <>
      <div className="w-full bg-coverImage h-60 object-cover bg-center relative flex justify-center mx-auto px-5 lg:px-10 xl:px-0 transition-all duration-500">
        <div className=" max-w-7xl w-full ">
          <div
            className={`absolute z-50 left-10 -bottom-16 md:-bottom-20 flex flex-col items-center w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-white shadow-lg overflow-hidden transition-transform `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={`${apiUrl}${selectedFile?.imageURL}`}
              alt=""
              className={`w-full h-full rounded-full object-cover ${
                isHovered ? "scale-105 duration-300" : "scale-100 duration-300"
              }`}
            />
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-full">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-white w-full h-full rounded-full flex items-center justify-center"
                >
                  Change Image
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange} // Handle the file change as needed
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pt-20 md:pt-3 md:pl-52 py-3">
        <div className="w-full flex flex-col px-3">
          <h2 className="text-2xl font-semibold">
            {userInfo?.firstName} {userInfo?.lastName}
          </h2>
        </div>
          
          <div className="flex flex-col md:flex-row px-3 gap-2 md:gap-10  text-textGray ">
            <div className="flex items-center gap-1 ">
              <IoLocationOutline className="text-2xl" />
              <h2 className="text-lg">
                {userInfo?.city}, {userInfo?.country}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              <BsEnvelope className="text-2xl" />
              <h2 className="text-lg">{userInfo?.emailAddress}</h2>
            </div>
          </div>
      </div>
      <Modal
        isOpen={isSizeExceededModalOpen}
        onRequestClose={() => setIsSizeExceededModalOpen(false)}
        contentLabel="Size Exceeded Modal"
        style={modalStyles}
      >
        <div>
          <p>Image size exceeds 5 MB limit.</p>
          <p>Please select a new image.</p>
          <input
            type="file"
            onChange={handleFileChange}
            // You may want to customize the appearance of the input
          />
        </div>
      </Modal>
     
    </>
  );
};

export default ProfileHero;
