// Experience.js
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdAddBox, MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { AuthContext } from "../../../context/AuthContext";
import AddExperienceModal from "../../../components/dashboard/AddExperienceModal";
import UpdateExperienceModal from "../../../components/dashboard/UpdateExperienceModal";
import DeleteExperienceModal from "../../../components/dashboard/DeleteExperienceModal";
import { apiUrl } from "../../../config";
import { toast } from "react-toastify";

const AddExperience = ({ isExperienceOpen, toggleExperience }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [experienceData, setExperienceData] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState(null);

  const { user } = useContext(AuthContext);

  const toggleExperienceModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleEditModal = (item) => {
    setEditModalOpen(!isEditModalOpen);
    setSelectedItemData(item);
    setSelectedItemId(item._id);
  };

  const toggleDeleteModal = (id) => {
    setDeleteModalOpen(!isDeleteModalOpen);
    setSelectedItemId(id);
  };

  const fetchExperience = async (userEmail, experienceData) => {
    try {
      const response = await fetch(
        `${apiUrl}/getExperience?userEmail=${userEmail}`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();

      if (JSON.stringify(data) !== JSON.stringify(experienceData)) {
        setExperienceData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchExperience(user.email, experienceData);
  }, [user.email, experienceData]);

  const handleConfirmDelete = async () => {
    try {
      if (!selectedItemId) {
        return;
      }

      const response = await fetch(
        `${apiUrl}/deleteExperience/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete Experience");
      }
      fetchExperience(user.email, experienceData);

      setSelectedItemId(null);
      setDeleteModalOpen(false);
      toast.success("Experience Deleted Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Error deleting Experience:", error);
      toast.error("Error deleting Experience", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const handleCancelDelete = () => {
    // Clear the selectedItemId and close the modal
    setSelectedItemId(null);
    setDeleteModalOpen(false);
  };

  const getExperience = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const difference = end - start;

    // Convert milliseconds to months
    const monthsDifference = difference / (1000 * 60 * 60 * 24 * 30);

    // Round down to the nearest whole number
    const totalMonths = Math.floor(monthsDifference);

    return `${totalMonths} Months`;
  };

  console.log(experienceData);
  return (
    <div className="flex flex-col justify-between cursor-pointer shadow-lg border border-gray-300 mt-5">
      <div
        onClick={toggleExperience}
        className={`flex items-center justify-between ${
          isExperienceOpen
            ? "bg-orange text-white"
            : "bg-white hover:bg-slate-100 text-[#f15a27]"
        } p-5 `}
      >
        <div>
          <h1 className="text-2xl ">Experience</h1>
        </div>
        <div>
          {isExperienceOpen ? (
            <IoIosArrowUp size={30} />
          ) : (
            <IoIosArrowDown size={30} />
          )}
        </div>
      </div>

      {isExperienceOpen && (
        <div className=" pt-5 pb-10 px-5 ">
          <div className="flex  justify-end ">
            <MdAddBox
              className="text-2xl md:text-4xl text-orange hover:scale-125 transition-all duration-300"
              onClick={toggleExperienceModal}
            />
          </div>
          {experienceData?.length > 0 ? (
            experienceData
              ?.slice()
              .reverse()
              .map((item) => {
                return (
                  <div className="border-b-2">
                    <div className="flex justify-between  mt-10">
                      <h1 className="text-xl md:text-2xl ">
                        {item?.companyName}
                      </h1>
                      <div className="flex gap-4">
                        <TbEdit
                          className="text-2xl md:text-3xl text-green-700 hover:scale-125 transition-all duration-300"
                          onClick={() => toggleEditModal(item)}
                        />
                        <MdDeleteForever
                          className="text-2xl md:text-3xl text-red-500 hover:scale-125 transition-all duration-300"
                          onClick={() => toggleDeleteModal(item._id)}
                        />
                      </div>
                    </div>

                    <div className="md:flex  md:py-5 ">
                      <div className="md:flex md:w-[68%]">
                        <div className="py-5 md:py-0 md:w-1/2">
                          <h1 className="text-lg ">Total Experience</h1>
                          <h1 className="text-lg">
                            {item?.startDate &&
                              item?.endDate &&
                              getExperience(item.startDate, item.endDate)}
                          </h1>
                        </div>

                        <div className="md:w-1/2">
                          <h1 className="text-lg ">Designation</h1>
                          <h1 className="text-lg ">{item?.designation}</h1>
                        </div>
                      </div>
                      <div className="flex md:justify-between py-5  gap-20 md:gap-0 md:py-0 md:w-[32%]  ">
                        <div className=" md:py-0 ">
                          <h1 className="text-lg ">Start Date</h1>
                          <h1 className="text-lg ">
                            {item?.startDate &&
                              new Date(item.startDate).toLocaleDateString(
                                "en-US"
                              )}
                          </h1>
                        </div>

                        <div className=" md:py-0 ">
                          <h1 className="text-lg ">End Date</h1>
                          <h1 className="text-lg ">
                            {item?.endDate &&
                              new Date(item.endDate).toLocaleDateString(
                                "en-US"
                              )}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      )}

      {isModalOpen && (
        <>
          <AddExperienceModal
            userEmail={user.email}
            toggleModal={toggleExperienceModal}
            setModalOpen={setModalOpen}
            fetchExperience={fetchExperience}
          />
        </>
      )}

      {isEditModalOpen && (
        <UpdateExperienceModal
          toggleModal={toggleEditModal}
          setModalOpen={setEditModalOpen}
          selectedItemData={selectedItemData}
          selectedItemId={selectedItemId}
          userEmail={user.email}
          fetchExperience={fetchExperience}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteExperienceModal
          onConfirmDelete={handleConfirmDelete}
          onCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default AddExperience;
