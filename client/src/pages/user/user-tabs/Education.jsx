import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdAddBox, MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { AuthContext } from "../../../context/AuthContext";
import AddEducationModal from "../../../components/dashboard/AddEducationModal";
import UpdateEduModal from "../../../components/dashboard/UpdateEduModal";
import DeleteEducationModal from "../../../components/dashboard/DeleteEduModal";
import { apiUrl } from "../../../config.js";

const Education = ({ isEducationOpen, toggleEducation, name }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  // const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [educationData, setEducationData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);

  const { user } = useContext(AuthContext);

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
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

  const fetchEducation = async (userEmail, educationData) => {
    try {
      const response = await fetch(
        `${apiUrl}/geteducations?userEmail=${userEmail}`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(educationData)) {
        setEducationData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEducation(user.email, educationData);
  }, [user.email, educationData]);

  const handleConfirmDelete = async () => {
    try {
      if (!selectedItemId) {
        return;
      }

      const response = await fetch(
        `${apiUrl}/deleteEducation/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );
      // setSuccessModalOpen(true);

      if (!response.ok) {
        throw new Error("Failed to delete education");
      }

      fetchEducation(user.email, educationData);

      setSelectedItemId(null);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  const handleCancelDelete = () => {
    // Clear the selectedItemId and close the modal
    setSelectedItemId(null);
    setDeleteModalOpen(false);
  };
  return (
    <div className="flex flex-col justify-between  cursor-pointer shadow-lg border border-gray-300 mt-5">
      <div
        onClick={toggleEducation}
        className={`flex items-center justify-between ${
          isEducationOpen
            ? "bg-orange text-white"
            : "bg-white hover:bg-slate-100 text-[#f15a27]"
        } p-5 `}
      >
        <div>
          <h1 className="text-2xl ">Education</h1>
        </div>
        <div>
          {isEducationOpen ? (
            <IoIosArrowUp size={30} />
          ) : (
            <IoIosArrowDown size={30} />
          )}
        </div>
      </div>

      {isEducationOpen && (
        <div className=" pt-5 pb-10 px-5 ">
          <div className="flex  justify-end ">
            <MdAddBox
              className="text-2xl md:text-3xl text-green-700 hover:scale-125 transition-all duration-300"
              onClick={toggleAddModal}
            />
          </div>
          {educationData?.length > 0 ? (
            educationData
              ?.slice()
              .reverse()
              .map((item) => {
                return (
                  <div className="flex justify-between border-b-2 pb-2  pt-10 md:pt-10">
                    <div className="flex justify-between  w-[75%]">
                      <h1 className="text-lg ">{item?.degree}</h1>
                      <h1 className="text-lg ">{item?.subject}</h1>
                      <h1 className="text-lg ">{item?.year}</h1>
                    </div>
                    <div className="flex w-[25%] gap-4  justify-end">
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
                );
              })
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      )}
      {isAddModalOpen && (
        <AddEducationModal
          uesrEmail={user.email}
          toggleModal={toggleAddModal}
          setModalOpen={setAddModalOpen}
          fetchEducation={fetchEducation}
        />
      )}
      {isEditModalOpen && (
        <UpdateEduModal
          uesrEmail={user.email}
          toggleModal={toggleEditModal}
          setModalOpen={setEditModalOpen}
          selectedItemData={selectedItemData}
          selectedItemId={selectedItemId}
          fetchEducation={fetchEducation}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteEducationModal
          onConfirmDelete={handleConfirmDelete}
          onCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Education;
