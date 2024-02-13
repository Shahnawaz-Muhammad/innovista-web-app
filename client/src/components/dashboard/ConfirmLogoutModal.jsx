import React from "react";

const ConfirmLogoutModal = ({setShowConfirmLogout  , logout }) => {

  return (
    <>
      <div
        className="z-50 w-full h-screen fixed top-0 left-0 bg-gray-600 backdrop-blur-sm bg-opacity-50"
        onClick={() => setShowConfirmLogout(false)}
      ></div>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-10 w-full max-w-md bg-white rounded-lg shadow-md">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to logout?
          </p>
          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={() => setShowConfirmLogout(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={logout}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmLogoutModal;
