import React, { useContext, useEffect, useState } from "react";
import "../user-tabs/Employees.css";
import { CiEdit } from "react-icons/ci";
import UpdateEmpModal from "../../../components/dashboard/UpdateEmpModal";
import EmployeeModal from "../../../components/dashboard/EmployeeModal";
import { AuthContext } from "../../../context/AuthContext";
import img from '../../../assets/icons/default-user.png'

const Employees = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/GetEmployeeList?CompEmail=${user.email}`
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


  return (
    <div>
      <div className="bg-[#fffbf5] rounded-3xl flex flex-col  justify-center">
        <div
          className="w-full  flex justify-center items-center py-5 "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <div className="flex flex-col gap-4">
            <button className="p-3 rounded-lg text-center text-4xl font-extrabold text-white bg-orange">
              Employees Record
            </button>
          </div>
        </div>

        <div className="w-full  border-2  border-orange p-5 ">
          <div className="mb-5   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4">
            {employeeData?.map((employee, index) => (
              <div key={index} className="flip-card h-80 w-72">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={img}
                      alt="Avatar"
                      className="h-80 w-72"
                    />
                  </div>
                  <div className="px-5 flip-card-back font-bold  ">
                    <div className="mt-5 flex flex-row ">
                      <h1 className="  font-bold w-2/5">Name</h1>
                      <h1 className="font-medium w-3/5 text-center">
                        {employee.EmployeeName}
                      </h1>
                    </div>
                    <div className="mt-5 flex flex-row ">
                      <h1 className="  font-bold w-2/5">ID</h1>
                      <h1 className="font-medium w-3/5 text-center">
                        {employee.EmpId}
                      </h1>
                    </div>
                    <div className="mt-5 flex flex-row ">
                      <h1 className="  font-bold w-2/5">Designation</h1>
                      <h1 className="font-medium w-3/5 text-center">
                        {employee.Designation}
                      </h1>
                    </div>
                    <div className="mt-5 flex flex-row ">
                      <h1 className="  font-bold w-2/5">Contact No</h1>
                      <h1 className="font-medium w-3/5 text-center">
                      {employee.E_ContactNo}
                      </h1>
                    </div>
                    <div className="mt-5 flex flex-row ">
                      <h1 className="  font-bold w-2/5">Email</h1>
                      <h1 className="font-medium w-3/5 text-center">
                        {employee.EmployeeEmail}
                      </h1>
                    </div>
                    
                    <div className="mt-5 flex justify-center">
                      <button className="bg-orange p-1 text-white">
                        <CiEdit
                          className="text-lg"
                          onClick={() => toggleEditModal(employee)}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
        <EmployeeModal
          toggleModal={toggleAddModal}
          setModalOpen={setAddModalOpen}
        />
      )}

      {isEditModalOpen && (
        <UpdateEmpModal
          toggleModal={toggleEditModal}
          setModalOpen={setEditModalOpen}
          selectedItemData={selectedItemData}
          selectedItemId={selectedItemId}
        />
      )}

      
    </div>
  );
};

export default Employees;
