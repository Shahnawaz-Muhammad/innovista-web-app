import React, { useEffect, useState } from "react";

const Bio = ({ user }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/bio?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setUserData(data); // setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log("bio data++", userData);

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
          Personal Information
        </button>
      </div>

      <div className="w-full md:w-2/3 border-2 border-orange  ">
        <div className="p-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">First Name</h1>
            <h1 className="font-medium w-2/3">{userData?.firstName}</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Last Name</h1>
            <h1 className="font-medium w-2/3">{userData?.lastName}</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Address</h1>
            <h1 className="font-medium w-2/3">{userData?.address}</h1>
          </div>
          {user.category === "Freelancer" && (
            <div className="flex flex-row ">
              <h1 className="font-bold w-1/3">Date of Birth</h1>
              <h1 className="font-medium w-2/3">
                {" "}
                {userData?.dob
                  ? new Date(userData.dob).toLocaleDateString("en-US")
                  : "Not available"}
              </h1>
            </div>
          )}
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Email</h1>
            <h1 className="font-medium w-2/3">{user.email}</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">Phone No</h1>
            <h1 className="font-medium w-2/3">{userData?.mobileNo}</h1>
          </div>
          <div className="flex flex-row ">
            <h1 className="font-bold w-1/3">CNIC</h1>
            <h1 className="font-medium w-2/3">{userData?.cnicNo}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
