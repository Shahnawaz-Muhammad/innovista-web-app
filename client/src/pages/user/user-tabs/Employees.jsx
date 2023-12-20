import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { apiUrl } from "../../../config";
import { AuthContext } from "../../../context/AuthContext";
import AddEmployeeModal from "../../../components/dashboard/AddEmployeeModal";
import ProfileImg from "../../../assets/images/img_bnfts.jpg";
import { MdAddBox, MdDeleteForever } from "react-icons/md";
import UpdateEmpModal from "../../../components/dashboard/UpdateEmpModal";
import DeleteEducationModal from "../../../components/dashboard/DeleteEduModal";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";

function Employees({ isEmployeeOpen, toggleEmp }) {
  const { user } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);

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



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/GetEmployeeList?CompEmail=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();

        if (JSON.stringify(data) !== JSON.stringify(employeeData)) {
          setEmployeeData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.email, employeeData]);

  const updateEmployeeList = async () => {
    try {
      const response = await fetch(`${apiUrl}/GetEmployeeList?CompEmail=${user.email}`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setEmployeeData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!selectedItemId) {
        return;
      }

      const response = await fetch(
        `${apiUrl}/deleteEmployee/${selectedItemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "light",
        });

        throw new Error("Failed to delete education");
      }

      toast.success("Employee deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });

      setEmployeeData((prevData) =>
        prevData.filter((item) => item._id !== selectedItemId)
      );

      setSelectedItemId(null);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("Error deleting employee. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    // Clear the selectedItemId and close the modal
    setSelectedItemId(null);
    setDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-between shadow-lg border border-gray-300 mt-5">
      <div
        onClick={toggleEmp}
        className={`flex items-center justify-between  cursor-pointer ${
          isEmployeeOpen
            ? "bg-orange text-white"
            : "bg-white hover:bg-slate-100 text-[#f15a27]"
        } p-5 `}
      >
        <div>
          <h1 className="text-2xl ">Employee</h1>
        </div>
        <div>
          {isEmployeeOpen ? (
            <IoIosArrowUp size={30} />
          ) : (
            <IoIosArrowDown size={30} />
          )}
        </div>
      </div>

      {isEmployeeOpen && (
        <div className="py-2 px-2 md:py-5 md:px-5">
          <div className="flex justify-end mb-2">
            <MdAddBox
              className="text-2xl md:text-3xl text-green-700 hover:scale-125 transition-all duration-300 cursor-pointer"
              onClick={toggleAddModal}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-2 md:mt-4">
            {employeeData?.map((data) => {
              return (
                <div
                  key={data._id}
                  className=" flex flex-col gap-3 bg-white shadow-lg rounded-lg  px-5 py-8 border-t-2 h-full"
                >
                  {/* Image in a circle */}
                  <div className="flex flex-col gap-1">
                    <div className="relative">
                      <img
                        className="h-32 w-32 object-cover mx-auto rounded-full"
                        src={ProfileImg}
                        alt="Profile"
                      />
                    </div>

                    {/* Designation */}
                    <div className="flex  flex-col justify-center items-center gap-1 mt-2">
                      <h1 className="text-lg font-semibold text-gray-800 h-14 max-h-16">
                        {data.EmployeeName}
                      </h1>
                      <h2 className="text-md text-gray-600">
                        {data.Designation}
                      </h2>
                      <h2 className="text-sm text-gray-600">
                        {data.EmployeeEmail}
                      </h2>
                      <h2 className="text-md text-gray-600">
                        {data.E_ContactNo}
                      </h2>
                    </div>
                  </div>

                  <div className="w-full flex justify-center gap-1">
                    <button
                      onClick={() => toggleEditModal(data)}
                      className="border-2 rounded-lg text-white px-3 py-1"
                    >
                      <TbEdit className="text-2xl md:text-3xl text-green-700 hover:scale-125 transition-all duration-300" />
                    </button>
                    <button
                      onClick={() => toggleDeleteModal(data._id)}
                      className="border rounded-lg text-white px-3 py-1"
                    >
                      <MdDeleteForever className="text-2xl md:text-3xl text-red-500 hover:scale-125 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <AddEmployeeModal
          toggleModal={toggleAddModal}
          setModalOpen={setAddModalOpen}
          updateEmployeeList={updateEmployeeList}
        />
      )}

      {isEditModalOpen && (
        <UpdateEmpModal
        updateEmployeeList={updateEmployeeList}
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
}

export default Employees;
