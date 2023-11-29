import React, { useState } from "react";
import EducationModal from "../../../components/dashboard/EducationModal";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";

const Education = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const educationData = [
    { id: 1, degree: "Matric", subject: "Science", year: "2015" },
    { id: 2, degree: "Intermediate", subject: "ICS", year: "2017" },
  ];
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
          {educationData.map((item) => {
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
                  <button className="bg-orange p-1 text-white">
                    <CiEdit className="text-lg" />
                  </button>
                  <button className="bg-red-700 p-1 text-white">
                    <IoTrashOutline className="text-lg" />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="w-full flex justify-center">
            <button
              className="bg-orange px-4 py-1 rounded-lg"
              onClick={toggleModal}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <>
          <EducationModal toggleModal={toggleModal} setModalOpen={setModalOpen}/>
        </>
      )}
    </div>
  );
};

export default Education;
