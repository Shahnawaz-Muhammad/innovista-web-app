import React, { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { AuthContext } from "../../../context/AuthContext";
import UpdateJobPostModal from "../../../components/dashboard/UpdateJobPostModal";
import DeleteJobModal from "../../../components/dashboard/DeleteJobModal";
import bgMain from "../../../assets/images/bg-main.png";
import { apiUrl } from "../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Hirings = () => {
  const [hiringData, setHiringData] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  const toggleEditModal = (item) => {
    setEditModalOpen(!isEditModalOpen);
    setSelectedItemData(item);
    // setSelectedItemId(item._id)
  };

  const toggleDeleteModal = (id) => {
    setDeleteModalOpen(!isDeleteModalOpen);
    setSelectedItemId(id);
  };

  const fetchHiring = async (userEmail, hiringData) => {
    try {
      const response = await fetch(
        `${apiUrl}/GetJobPost?userEmail=${userEmail}`
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

  useEffect(() => {
    fetchHiring(user.email, hiringData);
  }, [user.email, hiringData]);

  const handleConfirmDelete = async () => {
    try {
      if (!selectedItemId) {
        return;
      }

      const response = await fetch(
        `${apiUrl}/deleteJobPost/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete education");
      }
      fetchHiring(user.email, hiringData);

      setSelectedItemId(null);
      setDeleteModalOpen(false);
      toast.success("Job Ad Deleted Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("Error deleting Job Ad", {
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

  const handleShowApplicants = (id) => {
    navigate(`/dashboard/applicants`, {state:{id}})
  }


  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-3">
        <div
          className=" h-40  md:h-60 flex justify-center items-center"
          style={{
            backgroundImage: `url(${bgMain})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h1
            className="text-orange text-3xl md:text-5xl font-bold p-5"
            style={{
              backdropFilter: "blur(1x)",
              background: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Hirings
          </h1>
        </div>
        {hiringData?.length > 0 ? (
          hiringData?.slice()
          .reverse().map((post) => (
            <div key={post._id} className="w-full flex gap-5 items-center">
              <div className="w-full flex flex-col md:flex-row gap-3 md:gap-2 items-center shadow-[2px_1px_10px_5px_rgba(0,0,0,0.1)] rounded-xl p-5">
                <div className="w-full md:w-[25%] flex flex-col items-center gap-2">
                  <h1 className="font-semibold  text-gray-700 text-xl p-2 text-center">
                    {post.company}
                  </h1>
                </div>
                <div className="w-full flex flex-col items-center gap-2 text-center">
                  <h2 className="underline">{post.job_title}</h2>
                  <h2 className="text-gray-600 text-sm text-justify max-w-[80%]">
                    {post.description.length > 120
                      ? `${post.description.substring(0, 120)} . . .`
                      : post.description}
                  </h2>
                </div>
                <div className="w-[35%] flex flex-col items-center">
                  <h3 className=" text-gray-600 ">
                    {post.salaryFrom} - {post.salaryTo}
                  </h3>
                  <h3 className=" text-gray-600 ">Rs. per Month </h3>
                </div>
                <div className="w-[35%] flex flex-col items-center">
                  <h3 className=" text-gray-600 font-bold">
                    {post.job_vacancy}{" "}
                  </h3>
                  <h3 className=" text-gray-600 font-semibold">
                    {post.job_type}{" "}
                  </h3>
                </div>
                <div className="w-[20%] flex flex-col items-center">
                  {/* <h3 className=" text-gray-600 font-bold text-xl p-1">
                    {post.status === 0 ? "In Active" : "Active"}{" "}
                  </h3> */}
                  <button onClick={() => handleShowApplicants(post._id)} className="px-3 py-1 rounded-lg underline">
                    Applicants
                  </button>
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
          ))
        ) : (
          <div className="text-black w-full">
            <h2 className="font-semibold text-xl">No hirings currently</h2>
          </div>
        )}
      </div>
      {isEditModalOpen && (
        <UpdateJobPostModal
          userEmail={user.email}
          toggleModal={toggleEditModal}
          setModalOpen={setEditModalOpen}
          selectedItemData={selectedItemData}
          fetchHiring={fetchHiring}
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
