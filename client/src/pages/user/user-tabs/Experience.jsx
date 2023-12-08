import React, { useContext, useEffect, useState } from "react";
import ExperienceModal from "../../../components/dashboard/ExperienceModal";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { AuthContext } from "../../../context/AuthContext";
import DeleteExperienceModal from "../../../components/dashboard/DeleteExperienceModal";
import UpdateExperienceModal from "../../../components/dashboard/UpdateExperienceModal";

const Experience = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/getExperience?userEmail=${user.email}`
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

    fetchData();
  }, [user.email, experienceData]);

  const handleConfirmDelete = async () => {
    try {
      if (!selectedItemId) {
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/deleteExperience/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete Experience");
      }

      setSelectedItemId(null);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting Experience:", error);
    }
  };

  const handleCancelDelete = () => {
    // Clear the selectedItemId and close the modal
    setSelectedItemId(null);
    setDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="bg-[#fffbf5] rounded-3xl flex flex-col md:flex-row justify-center">
        <div
          className="w-full  md:w-1/3 flex justify-center items-center py-5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="flex flex-col gap-4">
            <button className="p-3 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">
              Work Experience
            </button>
            {/* <button className="p-3 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">
              2 Years
            </button> */}
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 md:w-2/3 border-2 border-orange py-5 ">
          {experienceData?.map((item, index) => (
            <div className="border-y py-3 px-2" key={index}>
              {/* <h1 className="text-xl text-orange font-bold uppercase decoration-slate-900">
                {item.companyName}
              </h1> */}
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-1">
                <div className="flex flex-row ">
                  <h1 className="font-bold w-1/3">Company</h1>
                  <h1 className="font-medium w-2/3">
                  {item.companyName}
                  </h1>
                </div>
                <div className="flex flex-row ">
                  <h1 className="font-bold w-1/3">Designation</h1>
                  <h1 className="font-medium w-2/3">{item.designation}</h1>
                </div>
                <div className="flex flex-row ">
                  <h1 className="font-bold w-1/3">Start Date</h1>
                  <h1 className="font-medium w-2/3">{item.startDate}</h1>
                </div>
                <div className="flex flex-row ">
                  <h1 className="font-bold w-1/3">End Date</h1>
                  <h1 className="font-medium w-2/3">{item.endDate}</h1>
                </div>
                <div className="col-span-full px-5 w-full flex justify-end gap-1">
                  <button className="bg-orange p-1 text-white">
                    <CiEdit
                      className="text-lg"
                      onClick={() => toggleEditModal(item)}
                    />
                  </button>
                  <button className="bg-red-700 p-1 text-white">
                    <IoTrashOutline
                      className="text-lg"
                      onClick={() => toggleDeleteModal(item._id)}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex justify-center">
            <button
              className="bg-orange px-4 py-1 rounded-lg text-white"
              onClick={toggleExperienceModal}
            >
              Add
            </button>
          </div>
        </div>
        {isModalOpen && (
          <>
            <ExperienceModal
              toggleModal={toggleExperienceModal}
              setModalOpen={setModalOpen}
            />
          </>
        )}

        {isEditModalOpen && (
          <UpdateExperienceModal
            toggleModal={toggleEditModal}
            setModalOpen={setEditModalOpen}
            selectedItemData={selectedItemData}
            selectedItemId={selectedItemId}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteExperienceModal
            onConfirmDelete={handleConfirmDelete}
            onCancelDelete={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Experience;
