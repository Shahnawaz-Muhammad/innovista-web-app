import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { apiUrl } from "../../../config";
import { AuthContext } from "../../../context/AuthContext";
import AddEmployeeModal from "../../../components/dashboard/AddEmployeeModal";
import ProfileImg from "../../../assets/images/avatar-profile.jpeg";
import { MdAddBox, MdDeleteForever } from "react-icons/md";
import UpdateEmpModal from "../../../components/dashboard/UpdateEmpModal";
import { GoPlus } from "react-icons/go";
import DeleteEducationModal from "../../../components/dashboard/DeleteEduModal";
import { BsQrCodeScan } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import QrCode from "../../../components/dashboard/QrCode";

function Employees({ isEmployeeOpen, toggleEmp }) {
  const { user } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showQr, setShowQr] = useState({
    isOpen: false,
    data: null,
  });
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);

  const itemsPerPage = 10;

  const handleOptionsToggle = (index) => {
    setShowMoreOptions((prevShowOptions) =>
      prevShowOptions === index ? null : index
    );
  };

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

  const fetchEmployees = async (userEmail, employeeData) => {
    try {
      const response = await fetch(
        `${apiUrl}/GetEmployeeList?CompEmail=${userEmail}`
      );
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();

      // Assuming setEmployeeData is a function passed as a parameter
      if (JSON.stringify(data) !== JSON.stringify(employeeData)) {
        setEmployeeData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ...

  useEffect(() => {
    fetchEmployees(user.email, employeeData);
  }, [user.email, employeeData]);

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
      fetchEmployees(user.email, employeeData);
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

  const filteredData = employeeData?.filter((employees) =>
    Object.values(employees).some((field) =>
      String(field).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  console.log(employeeData);

  return (
    <>
      <div className="flex flex-col justify-between shadow-lg border border-gray-300 mt-5">
        <div
          onClick={toggleEmp}
          className={`flex items-center justify-between  cursor-pointer ${
            isEmployeeOpen
              ? "bg-orange text-white"
              : "bg-white hover:bg-slate-100 text-orange"
          } p-5 `}
        >
          <div>
            <h1 className="text-2xl ">
              {user.category === "Group" ? "Members" : "Employees"}
            </h1>
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
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label for="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 "
                        fill="currentColor"
                        viewbox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2  "
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
                  onClick={() => setAddModalOpen(!isAddModalOpen)}
                  type="button"
                  className="flex items-center justify-center gap-2 text-white bg-orange hover:bg-orangeDark focus:ring-1 focus:ring-orange font-medium rounded-lg text-sm px-4 py-2  focus:outline-none"
                >
                  <GoPlus className="text-xl" />
                  New {user.category === "Group" ? "Member" : "Employee"}
                </button>
                <div className="flex items-center space-x-3 w-full md:w-auto relative">
                  <button
                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700  "
                    type="button"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-4 w-4 mr-2 text-gray-400"
                      viewbox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Filter
                    <svg
                      className="-mr-1 ml-1.5 w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>
                  {showFilter && (
                    <div className="absolute top-10 right-0 z-50 w-48 p-3 bg-white rounded-lg shadow ">
                      <h6 className="mb-3 text-sm font-medium text-gray-900 ">
                        Choose brand
                      </h6>
                      <ul
                        className="space-y-2 text-sm"
                        aria-labelledby="filterDropdownButton"
                      >
                        <li className="flex items-center">
                          <input
                            id="apple"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                          />
                          <label
                            for="apple"
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            Apple (56)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="fitbit"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                          />
                          <label
                            for="fitbit"
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            Microsoft (16)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="razor"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                          />
                          <label
                            for="razor"
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            Razor (49)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="nikon"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                          />
                          <label
                            for="nikon"
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            Nikon (12)
                          </label>
                        </li>
                        <li className="flex items-center">
                          <input
                            id="benq"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                          />
                          <label
                            for="benq"
                            className="ml-2 text-sm font-medium text-gray-900 "
                          >
                            BenQ (74)
                          </label>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto ">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Employee Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Emp ID
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Designaton
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Contact No
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      QR Code
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 &&
                    filteredData
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      ?.map((employee, index) => {
                        return (
                          <tr key={index} className="border-b ">
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                            >
                              {employee?.EmployeeName}
                            </th>
                            <td className="px-4 py-3">{employee?.EmpId}</td>
                            <td className="px-4 py-3">
                              {employee?.Designation}
                            </td>
                            <td className="px-4 py-3">
                              {employee?.E_ContactNo}
                            </td>
                            <td className="px-4 py-3">
                              {employee?.EmployeeEmail}
                            </td>
                            <td className="px-4 py-3 ">
                              <button
                                onClick={() =>
                                  setShowQr({
                                    isOpen: true,
                                    employee: employee,
                                  })
                                }
                                className="border-2 rounded-lg text-black px-3 py-1 "
                              >
                                <BsQrCodeScan className="text-2xl  md:text-2xl text-green-700 hover:scale-110 transition-all duration-300" />
                              </button>
                            </td>
                            <td className="px-4 py-3 ">
                              <div className="w-full relative text-center">
                                <button
                                  onClick={() => handleOptionsToggle(index)}
                                  className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none  dark:hover:text-gray-100"
                                  type="button"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                  </svg>
                                </button>
                                {showMoreOptions === index && (
                                  <div
                                    className={` absolute top-5 right-3 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow  dark:divide-gray-600`}
                                  >
                                    <ul
                                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 cursor-pointer   "
                                      aria-labelledby="apple-imac-27-dropdown-button"
                                    >
                                      <li>
                                        <button
                                          className="block font-medium py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                          onClick={() =>
                                            toggleEditModal(employee)
                                          }
                                        >
                                          Edit
                                          {/* <TbEdit className="text-2xl md:text-3xl text-green-700 hover:scale-125 transition-all duration-300" /> */}
                                        </button>
                                      </li>
                                    </ul>
                                    <div className="py-1 hover:bg-gray-100 cursor-pointer ">
                                      <button
                                        className="block font-medium py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={() =>
                                          toggleDeleteModal(employee._id)
                                        }
                                      >
                                        Delete
                                        {/* <MdDeleteForever className="text-2xl md:text-3xl text-red-500 hover:scale-125 transition-all duration-300" /> */}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>

            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500  flex gap-2">
                Showing
                <span className="font-semibold text-gray-900 ">1-10</span>
                of
                <span className="font-semibold text-gray-900 ">
                  {employeeData?.length}
                </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-gray-500 hover:text-gray-700"
                  >
                    Previous
                  </button>
                </li>
                <li>
                  {[
                    ...Array(Math.ceil(employeeData.length / itemsPerPage)),
                  ].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`mx-2 px-3 py-1 text-gray-500 hover:text-gray-700 ${
                        currentPage === i + 1 ? "font-bold" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </li>

                <li>
                  <button
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(
                          prevPage + 1,
                          Math.ceil(employeeData.length / itemsPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(employeeData.length / itemsPerPage)
                    }
                    className="px-3 py-1 text-gray-500 hover:text-gray-700"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {showQr.isOpen && (
          <QrCode
            booking={showQr.data}
            showQr={showQr.isOpen}
            setShowQr={() => setShowQr({ isOpen: false, data: null })}
          />
        )}
        {isAddModalOpen && (
          <AddEmployeeModal
            userEmail={user.email}
            toggleModal={toggleAddModal}
            setModalOpen={setAddModalOpen}
            fetchEmployees={fetchEmployees}
          />
        )}

        {isEditModalOpen && (
          <UpdateEmpModal
            userEmail={user.email}
            toggleModal={toggleEditModal}
            setModalOpen={setEditModalOpen}
            selectedItemData={selectedItemData}
            selectedItemId={selectedItemId}
            fetchEmployees={fetchEmployees}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteEducationModal
            onConfirmDelete={handleConfirmDelete}
            onCancelDelete={handleCancelDelete}
          />
        )}
      </div>
    </>
  );
}

export default Employees;
