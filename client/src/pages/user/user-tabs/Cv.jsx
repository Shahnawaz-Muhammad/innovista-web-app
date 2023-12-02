import React, { useContext, useEffect, useState } from "react";
import UploadCvModal from "../../../components/dashboard/UploadCvModal";
import { AuthContext } from "../../../context/AuthContext";

const Cv = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/getCv?userEmail=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        console.log("cv data", data);
        setCvFile(data); // setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email, cvFile]);

  console.log("pdf viewer", cvFile?.FilePath)

  return (
    <div className="h-96 flex flex-col md:flex-row justify-center">
      <div
        className="w-full  md:w-1/3 flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <button
          onClick={toggleAddModal}
          className="w-32 bg-orange py-4 text-center rounded-lg tracking-wide text-white hover:underline font-bold focus:outline-none focus:shadow-outline hover:bg-orangeDark cursor-pointer transition ease-in duration-300"
        >
          Update CV
        </button>
      </div>
      <div className="w-full   md:w-2/3 border-2 border-orange  flex justify-center items-center font-bold text-4xl ">
        {/* {cvFile?.FilePath ? (
          <iframe
            title="PDF Viewer"
            src={`file:///${cvFile.FilePath}`} // Replace with the actual URL
            width="100%"
            height="100%"
          />
        ) : (
          <h2>No file found</h2>
        )} */}
      </div>

      {isAddModalOpen && (
        <UploadCvModal
          toggleModal={toggleAddModal}
          setModalOpen={setAddModalOpen}
        />
      )}
    </div>
  );
};

export default Cv;
