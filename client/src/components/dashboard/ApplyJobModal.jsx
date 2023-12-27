import React from "react";

const ApplyJobModal = ({ fileInputRef, handleFileChange, handleSelectFile, pdfData, HandlePdfFile, handleCancel, errorMessage }) => {
  return (
    <>
      <div className="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-50 ">
        <div className="flex items-center justify-center min-h-screen ">
          <div className="bg-white p-8 rounded-lg shadow-md text-black w-[25rem] md:w-[40rem] overflow-hidden">
            <h2 className="text-2xl font-bold">Choose File</h2>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <button
              className="text-lg mt-4 border p-1"
              onClick={handleSelectFile}
            >
              {pdfData ? pdfData.name : "Select file"}
            </button>
            <h1 className='text-red-500 pt-2'>{errorMessage}</h1>
            <div className="flex gap-1 mt-5">
              <button
                className="bg-blue-300 text-white px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring focus:border-blue-300"
                onClick={HandlePdfFile}
              >
                Upload File
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none focus:ring focus:border-blue-300"
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
