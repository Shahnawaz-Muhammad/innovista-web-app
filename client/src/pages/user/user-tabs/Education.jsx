import React, { useContext, useEffect, useState } from "react";
import EducationModal from "../../../components/dashboard/EducationModal";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { AuthContext } from "../../../context/AuthContext";
import DeleteEducationModal from "../../../components/dashboard/DeleteEduModal";
import UpdateEduModal from "../../../components/dashboard/UpdateEduModal";
import SuccessModel from "../../../components/dashboard/SuccessModel";

const Education = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [educationData, setEducationData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);


  const { user } = useContext(AuthContext);

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

  const toggleEditModal = (item) => {
    setEditModalOpen(!isEditModalOpen);
    setSelectedItemData(item)
    setSelectedItemId(item._id)
  };

  const toggleDeleteModal = (id) => {
    setDeleteModalOpen(!isDeleteModalOpen);
    setSelectedItemId(id);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/geteducations?userEmail=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setEducationData(data); // setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email, educationData]);



  const handleConfirmDelete = async () => {
    try {
      if (!selectedItemId) {
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/deleteEducation/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );
      setSuccessModalOpen(true);

      if (!response.ok) {
        throw new Error("Failed to delete education");
      }

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
    <div className="bg-[#fffbf5] rounded-3xl flex flex-col md:flex-row justify-center">
      <div
        className="w-full  md:w-1/3 flex justify-center items-center py-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <button className="p-3 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">
          Education
        </button>
      </div>

      <div className="py-10 w-full md:w-2/3 border-2 border-orange  ">
        <div className="px-10 grid grid-cols-1  gap-10 justify-center items-center">
          {educationData?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row border-b border-orange items-center text-center sm:text-start"
              >
                <h1 className="font-bold w-full sm:w-1/3 sm:pl-10">
                  {item.degree}{" "}
                </h1>
                <h2 className="font-bold w-full sm:w-1/3 ">{item.subject}</h2>
                <h3 className="font-medium w-full sm:w-1/3 sm:text-center">
                  {item.year}
                </h3>
                <div className="flex gap-1">
                  <button
                    className="bg-orange p-1 text-white"
                    onClick={() => toggleEditModal(item)}
                  >
                    <CiEdit className="text-lg" />
                  </button>
                  <button
                    className="bg-red-700 p-1 text-white"
                    onClick={() => toggleDeleteModal(item._id)}
                  >
                    <IoTrashOutline className="text-lg" />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="w-full flex justify-center">
            <button
              className="bg-orange px-4 py-1 rounded-lg"
              onClick={toggleAddModal}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {isAddModalOpen && (
        <EducationModal
          toggleModal={toggleAddModal}
          setModalOpen={setAddModalOpen}
        />
      )}

      {isEditModalOpen && (
        <UpdateEduModal
          toggleModal={toggleEditModal}
          setModalOpen={setEditModalOpen}
          selectedItemData={selectedItemData}
          selectedItemId={selectedItemId}
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
