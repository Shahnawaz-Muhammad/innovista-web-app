import React from "react";
import { FaFileUpload } from "react-icons/fa";

const ApplyJobModal = ({
  fileInputRef,
  handleFileChange,
  handleSelectFile,
  pdfData,
  HandlePdfFile,
  handleCancel,
  errorMessage,
}) => {
  return (
    <>
      <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 ">
        <div className="flex items-center justify-center min-h-screen ">
          <div className="bg-white p-8 rounded-lg shadow-md text-black w-[25rem] md:w-[40rem] overflow-hidden flex justify-center">
            <div className="w-80 flex flex-col items-center">
              <h2 className="text-2xl font-bold">Choose File</h2>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <button
                className="text-lg mt-4 border-2 py-2 px-5 hover:bg-gray-100"
                onClick={handleSelectFile}
              >
                {pdfData ? (
                  pdfData.name
                ) : (
                  <p className="flex gap-4 items-center">
                    Select file
                    <FaFileUpload className="text-3xl text-gray-500" />
                  </p>
                )}
              </button>
              <h1 className="text-red-500 pt-2">{errorMessage}</h1>
              <div className="flex gap-1 mt-5 w-full">
                <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={HandlePdfFile}
                >
                  Upload
                </button>
                <button
                  className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyJobModal;
