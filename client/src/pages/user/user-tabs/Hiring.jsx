import React, { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { AuthContext } from "../../../context/AuthContext";
import UpdateJobPostModal from "../../../components/dashboard/UpdateJobPostModal";
import DeleteJobModal from "../../../components/dashboard/DeleteJobModal";
const Hirings = () => {
  const [hiringData, setHiringData] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  

  const toggleEditModal = (item) => {
    setEditModalOpen(!isEditModalOpen);
    setSelectedItemData(item);
    // setSelectedItemId(item._id)
  };

  const toggleDeleteModal = (id) => {
    setDeleteModalOpen(!isDeleteModalOpen);
    setSelectedItemId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      if (!selectedItemId) {
        return;
      }

      const response = await fetch(
        `http://192.168.150.134:8080/api/deleteJobPost/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );

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

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.150.134:8080/api/GetJobPost?userEmail=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        if (JSON.stringify(data) !== JSON.stringify(hiringData)) {
          setHiringData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email, hiringData]);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-3">
        {hiringData?.map((post) => {
          return (
            <div className="w-full flex  gap-5 items-center">
              <div className="w-full flex flex-col md:flex-row gap-3 md:gap-2 items-center shadow-[2px_1px_10px_5px_rgba(0,0,0,0.1)] rounded-xl p-5">
                <div className="w-full md:w-[30%] flex flex-col items-center gap-2">
                  <h1 className="font-semibold bg-orange underline text-white text-3xl p-2">{post.company}</h1>
                </div>
                <div className="w-full flex flex-col items-center gap-2 text-center">
                  <h2 className="underline">{post.job_title}</h2>
                  <h2 className="text-gray-600 text-sm ">{post.description}</h2>
                </div>
                <div className="w-[35%] flex flex-col items-center">
                  <h3 className=" text-gray-600 font-bold">{post.salary}  </h3>
                  <h3 className=" text-gray-600 font-semibold">per Month </h3>
                </div>
                <div className="w-[35%] flex flex-col items-center">
                  <h3 className=" text-gray-600 font-bold">{post.job_vacancy}  </h3>
                  <h3 className=" text-gray-600 font-semibold">{post.job_type} </h3>
                </div>
                <div className="w-[20%] flex flex-col items-center">
                  <h3 className=" text-gray-600 font-bold text-xl p-1">{post.status === 0 ? "In Active" : "Active"}  </h3>
                </div>
                
                <div className="lg:w-[15%] flex gap-2 justify-center">
                  <button className="bg-orange p-1 text-white">
                    <CiEdit
                      className="text-lg"
                      onClick={() => toggleEditModal(post)}
                    />
                  </button>
                  <button className="bg-red-700 p-1 text-white">
                    <IoTrashOutline
                      className="text-lg"
                      onClick={() => toggleDeleteModal(post._id)}
                    />
                  </button>
                </div>{" "}
              </div>
            </div>
          );
        })}
      </div>
      {isEditModalOpen && (
        <UpdateJobPostModal
          toggleModal={toggleEditModal}
          setModalOpen={setEditModalOpen}
          selectedItemData={selectedItemData}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteJobModal
          onConfirmDelete={handleConfirmDelete}
          onCancelDelete={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Hirings;
