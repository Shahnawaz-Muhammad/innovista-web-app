import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cv = () => {
  const [filePreview, setFilePreview] = useState(null);

  const handleFilePreview = (previewData) => {
    setFilePreview(previewData);
  };
  return (
    <div className="h-96 flex flex-col md:flex-row justify-center">
      <div
        className="w-full  md:w-1/3 flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <Link
          to={{
            pathname: "/dashboard/cvupload",
            state: { previewData:{handleFilePreview }},
          }}
          className="w-32 bg-orange py-4 text-center rounded-lg tracking-wide text-white hover:underline font-bold focus:outline-none focus:shadow-outline hover:bg-orangeDark cursor-pointer transition ease-in duration-300"
        >
          Update CV
        </Link>
      </div>
      <div className="w-full   md:w-2/3 border-2 border-orange  flex justify-center items-center font-bold text-4xl ">
        Update Your CV
      </div>
    </div>
  );
};

export default Cv;
