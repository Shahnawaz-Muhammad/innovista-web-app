import React, { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { AuthContext } from "../../../context/AuthContext";
import UpdateJobPostModal from "../../../components/dashboard/UpdateJobPostModal";
import DeleteJobModal from "../../../components/dashboard/DeleteJobModal";
import { apiUrl } from "../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import PostJobModal from "../../../components/dashboard/PostJobModal";
import ViewJobHiringModal from "../../../components/dashboard/ViewJobHiringModal";
import { FaEye } from "react-icons/fa6";

const Hirings = () => {
  const [hiringData, setHiringData] = useState(null);
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [jobDetail, setJobDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const toggleViewHiringModal = (post) => {
    setViewModalOpen(!isViewModalOpen);
    setJobDetail(post);
  };

  const toggleNewBookingModal = () => {
    setPostJobModalOpen(!postJobModalOpen);
  };

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
    navigate(`/dashboard/applicants`, { state: { id } });
  };

  const filteredData = hiringData?.filter((booking) =>
    Object.values(booking).some((field) =>
      String(field).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-full mt-5">
      <div className="bg-white relative shadow-md sm:rounded-xl overflow-hidden py-10 px-3">
        <div className="w-full flex flex-col gap-3 ">
          <div className="">
            <h1 className="text-orange text-3xl font-bold p-5">Hirings</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange focus:border-orange block w-full pl-10 p-2  "
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required=""
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                onClick={() => setPostJobModalOpen(!postJobModalOpen)}
                type="button"
                className="font-medium flex items-center justify-center gap-2 text-white bg-orange hover:bg-orangeDark focus:ring-1 focus:ring-orange  rounded-lg text-sm px-4 py-2  focus:outline-none"
              >
                <GoPlus className="text-xl " />
                Post a Job
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 items-center h-[calc(100vh-430px)] overflow-y-auto">
            {filteredData?.length > 0 ? (
              filteredData
                ?.slice()
                .reverse()
                .map((post) => (
                  <div
                    key={post._id}
                    className="w-full flex gap-5 items-center"
                  >
                    <div className="w-full flex flex-col md:flex-row gap-1 items-center  shadow-md rounded-md p-5  border">
                      <div className="w-full md:w-[20%] flex flex-col items-center gap-1">
                        <h1 className="font-semibold  text-gray-700 text-xl p-2 text-center">
                          {post.company}
                        </h1>
                      </div>
                      <div className="w-full md:w-[30%] flex flex-col items-center gap-2 text-center">
                        <h2 className="underline">{post.job_title}</h2>
                        <h2 className="text-gray-600 text-sm text-justify ">
                          {post.description.length > 120
                            ? `${post.description.substring(0, 50)} . . .`
                            : post.description}
                        </h2>
                      </div>
                      <div className="w-full md:w-[20%] flex flex-col items-center">
                        <h3 className=" text-gray-600 ">
                          {post.salaryFrom} - {post.salaryTo}
                        </h3>
                        <h3 className=" text-gray-600 ">Rs. per Month </h3>
                      </div>
                      <div className="w-full md:w-[20%] flex flex-col items-center">
                        <h3 className=" text-gray-600 font-bold">
                          {post.job_vacancy}{" "}
                        </h3>
                        <h3 className=" text-gray-600 font-semibold">
                          {post.job_type}{" "}
                        </h3>
                      </div>
                      <div className="w-full md:w-[20%] flex flex-col items-center">
                        {/* <h3 className=" text-gray-600 font-bold text-xl p-1">
                    {post.status === 0 ? "In Active" : "Active"}{" "}
                  </h3> */}
                        <button
                          onClick={() => handleShowApplicants(post._id)}
                          className="px-3 py-1 rounded-lg underline"
                        >
                          Applicants
                        </button>
                      </div>
                      <div className="w-full md:w-[20%] flex gap-2 justify-center">
                        <button
                          className="border border-green-500  rounded-lg  text-green-500"
                          onClick={() => toggleViewHiringModal(post)}
                        >
                          <FaEye className="p-[.3rem] text-3xl hover:scale-125 transition-all duration-300" />
                        </button>
                        <button
                          onClick={() => toggleEditModal(post)}
                          className="border border-green-500  rounded-lg  text-green-500"
                        >
                          <CiEdit className="p-1 text-3xl hover:scale-125 transition-all duration-300" />
                        </button>
                        <button
                          onClick={() => toggleDeleteModal(post._id)}
                          className="border border-red-500  rounded-lg text-red-500"
                        >
                          <IoTrashOutline className="p-1 text-3xl hover:scale-125 transition-all duration-300" />
                        </button>
                      </div>{" "}
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-black w-full flex justify-center">
                <h2  className="font-semibold text-xl">No hirings currently</h2>
              </div>
            )}
          </div>
        </div>
      </div>

      {isViewModalOpen && (
        <ViewJobHiringModal
          // applicantId={applicantId}
          toggleModal={toggleViewHiringModal}
          jobDetail={jobDetail}
        />
      )}
      {postJobModalOpen && (
        <PostJobModal
        fetchHiring={fetchHiring}
          toggleModal={toggleNewBookingModal}
          setPostJobModalOpen={setPostJobModalOpen}
        />
      )}
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
