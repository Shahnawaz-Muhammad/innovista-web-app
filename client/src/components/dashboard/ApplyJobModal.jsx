import React from "react";

const ApplyJobModal = ({
  fileInputRef,
  handleFileChange,
  handleSelectFile,
  pdfData,
  HandlePdfFile,
  handleCancel,
}) => {
  return (
    <>
      <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 ">
        <div className="flex items-center justify-center min-h-screen ">
          <div className="flex flex-col justify-center items-center bg-white py-8 rounded-lg shadow-md text-black mx-3 md:px-0 w-[20rem] md:w-[35rem] overflow-hidden">
            <div className="flex flex-col justify-center text-center">
              <h2 className="text-2xl font-bold">Choose File</h2>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <button
                className="text-lg mt-4 border p-1 max-w-lg"
                onClick={handleSelectFile}
              >
                {pdfData ? pdfData.name : "Select file"}
              </button>
            </div>
            <div className="flex gap-1 mt-5">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-300"
                onClick={HandlePdfFile}
              >
                Upload
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyJobModal;
