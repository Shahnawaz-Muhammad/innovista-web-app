// Bio.js
import React, { useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { apiUrl } from "../../../config";
import UpdateBioModal from "../../../components/dashboard/UpdateBioModal";
const Bio = ({ isBioOpen, toggleBio, user }) => {
  const [userData, setUserData] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);

  const toggleEditModal = (item) => {
    setEditModalOpen(!isEditModalOpen);
    setSelectedItemData(item);
    setSelectedItemId(item._id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/bio?email=${user.email}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (JSON.stringify(data) !== JSON.stringify(userData)) {
          setUserData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email, userData]);
  return (
    <div className="flex flex-col justify-between  cursor-pointer shadow-lg border border-gray-300 mt-10">
      <div
        onClick={toggleBio}
        className={`flex items-center justify-between ${
          isBioOpen
            ? "bg-orange text-white"
            : "bg-white hover:bg-slate-100 text-[#f15a27]"
        } p-5 `}
      >
        <div>
          <h1 className="text-2xl ">Bio</h1>
        </div>
        <div>
          {isBioOpen ? (
            <IoIosArrowUp size={30} />
          ) : (
            <IoIosArrowDown size={30} />
          )}
        </div>
      </div>

      {isBioOpen && userData && (
        <div className="py-2 px-2 md:py-5 md:px-5 ">
          <div className="flex  justify-end ">
            <FiEdit
              onClick={() => toggleEditModal(userData)}
              className="text-2xl md:text-3xl text-green-700 hover:scale-125 transition-all duration-300"
            />
          </div>
          <div className="md:flex md:justify-between py-5">
            <div className="px-5 md:px-0  md:w-1/2">
              <h1 className="text-lg font-semibold ">First Name</h1>

              <h1>{userData?.firstName}</h1>
            </div>

            <div className="py-5 px-5 md:py-0 md:w-1/2">
              <h1 className="text-lg  font-semibold">Last Name</h1>
              <h1>{userData?.lastName}</h1>
            </div>

            <div className="px-5 md:w-1/2">
              <h1 className="text-lg  font-semibold">Address</h1>
              <h1>{userData?.address}{', '}{userData?.city}{', '}{userData?.country}</h1>
            </div>
          </div>

          <div className=" md:flex md:justify-between py-2 md:py-5">
            <div className="px-5 md:px-0 md:w-1/2">
              <h1 className="text-lg  font-semibold">Date of Birth</h1>
              <h1>
                {userData?.dob &&
                  new Date(userData.dob).toLocaleDateString("en-US")}
              </h1>
            </div>

            <div className="px-5 py-5 md:py-0 md:w-1/2">
              <h1 className="text-lg  font-semibold">Email</h1>
              <h1>{userData?.emailAddress}</h1>
            </div>

            <div className="px-5 pb-5 md:w-1/2">
              <h1 className="text-lg  font-semibold">Phone No</h1>
              <h1>{userData?.mobileNo}</h1>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <UpdateBioModal
          toggleModal={toggleEditModal}
          setModalOpen={setEditModalOpen}
          selectedItemData={selectedItemData}
          selectedItemId={selectedItemId}
        />
      )}
    </div>
  );
};

export default Bio;
