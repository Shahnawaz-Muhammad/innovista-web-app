import React, { useEffect, useState } from "react";

export default function SuccessModel(onCancelDelete) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isVisible && (
        <div>
          <div
            className="w-full h-screen fixed top-0 left-0 bg-gray-600 backdrop-blur-sm bg-opacity-50"
            onClick={onCancelDelete}
          ></div>
          <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className=" w-full max-w-md bg-white  shadow-md">
              <div className="py-2 pl-5 w-full max-w-md bg-orange text-xl font-bold text-white">
                Record
              </div>
              <div className="flex flex-row gap-1 pt-5 justify-center">
                <p className="text-lg  text-center font-semibold mb-4">
                  Record Deleted Successfully
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="green"
                  className="w-8 h-8 font-extrabold -mt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
