import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const UploadCvModal = ({ toggleModal, setModalOpen }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [showFileHere,setShowFileHere]=useState(null);
  const { user } = useContext(AuthContext);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFilePreview(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setShowFileHere(reader.result);
      };
      reader.readAsDataURL(selectedFile);

    } else {
      alert("Please select a PDF file.");

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
      setFilePreview(droppedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setShowFileHere(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    } else {
      // Notify the user that the dropped file is not a PDF
      alert("Please drop a PDF file.");
      // Clear any existing preview
      setFilePreview(null);
    }
  };

  const handleCvSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("cv", filePreview);

      const response = await fetch(
        `http://localhost:8080/api/uploadCV?userEmail=${user.email}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data); // You can handle the response data here
    } catch (error) {
      console.error(error);
    }
    setModalOpen(false);
  };

  return (
    <>
      <div
        className="w-full z-50 h-screen fixed top-0 left-0 bg-gray-600 backdrop-blur-sm bg-opacity-50"
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
            <div className="text-center">
              <di className="mt-5 text-5xl font-bold text-gray-900">
                Upload your CV
              </di>
            </div>
            <form className="mt-8 space-y-3" onSubmit={handleCvSubmit}>
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
                    {showFileHere && (
                      <embed
                        src={showFileHere}
                        type="application/pdf"
                        width="100%"
                        height="500px"
                      />
                    )}
                    {/* File upload description */}
                    {showFileHere ? null : (
                      <p className="pointer-none text-gray-700">
                        <span className="">Drag and drop</span> files here
                        <br /> or <br />
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            const fileInput =
                              document.getElementById("fileInput");
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
                <span className="font-bold">
                  {" "}
                  Only pdf Files will be accepted
                </span>
              </p>
              <div className="flex flex-row justify-center items-center gap-4">
                <button
                  type="submit"
                  className="my-5 bg-orange  p-4 rounded-lg tracking-wide text-white hover:underline
                  font-bold  focus:outline-none focus:shadow-outline hover:bg-orangeDark  cursor-pointer transition ease-in duration-300"
                >
                  Upload
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="my-5 bg-gray-500 p-4 rounded-lg tracking-wide text-white hover:underline font-bold focus:outline-none focus:shadow-outline hover:bg-gray-700 cursor-pointer transition ease-in duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadCvModal;
