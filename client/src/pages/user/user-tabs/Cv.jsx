import React, { useContext, useEffect, useState } from "react";
import UploadCvModal from "../../../components/dashboard/UploadCvModal";
import { AuthContext } from "../../../context/AuthContext";

const Cv = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

  const { user, pdfUrl,setPdfUrlContext} = useContext(AuthContext);

  useEffect(() => {
    // Make API request to get Base64 data
    // For example, using fetch or Axios
    fetch(`http://localhost:8080/api/getCv?userEmail=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        const binaryData = atob(data.cvContent);

        // Create a blob from the binary data
        const arrayBuffer = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          arrayBuffer[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: "application/pdf" });

        // Create a URL for the blob and set it in state
        const url = URL.createObjectURL(blob);
        setPdfUrlContext(url);
      })
      .catch((error) => console.error("Error fetching PDF:", error));
  }, [user.email, isAddModalOpen] );


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
        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            width="100%"
            height="100%"
            title="PDF Viewer"
            allowFullScreen
            controls={false}
          />
        ) : (
          <p>Loading PDF...</p>
        )}
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
