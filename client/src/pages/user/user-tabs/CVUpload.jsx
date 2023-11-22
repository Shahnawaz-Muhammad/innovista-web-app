import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CVUpload() {
  const [filePreview, setFilePreview] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Notify the user that the selected file is not a PDF
      alert("Please select a PDF file.");
      // Clear any existing preview
      setFilePreview(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    } else {
      // Notify the user that the dropped file is not a PDF
      alert("Please drop a PDF file.");
      // Clear any existing preview
      setFilePreview(null);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <di className="mt-5 text-5xl font-bold text-gray-900">
            Upload your CV
          </di>
        </div>
        <form className="mt-8 space-y-3">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Attach Document
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="fileInput"
                className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 pt-2 group text-center relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {/* File Input */}
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                />
                {filePreview && (
                  <embed
                    src={filePreview}
                    type="application/pdf"
                    width="100%"
                    height="500px"
                  />
                )}
                {/* File upload description */}
                {filePreview ? null : (
                  <p className="pointer-none text-gray-700">
                    <span className="">Drag and drop</span> files here
                    <br /> or <br />
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        const fileInput = document.getElementById("fileInput");
                        fileInput.click();
                      }}
                    >
                      Select File
                    </button>
                    <br />
                    from your computer
                  </p>
                )}
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-bold"> Only pdf Files will be accepted</span>
          </p>
          <div className="flex flex-row justify-center items-center gap-4">
            <Link
              type="submit"
              to="/dashboard/cv"
              className="my-5 bg-orange  p-4 rounded-lg tracking-wide text-white hover:underline
                  font-bold  focus:outline-none focus:shadow-outline hover:bg-orangeDark  cursor-pointer transition ease-in duration-300"
            >
              Upload
            </Link>
            <Link
              to="/dashboard/cv"
              className="my-5 bg-gray-500 p-4 rounded-lg tracking-wide text-white hover:underline font-bold focus:outline-none focus:shadow-outline hover:bg-gray-700 cursor-pointer transition ease-in duration-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
