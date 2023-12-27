import React, {  useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../../../config";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { state } = useLocation();
  const [passwordError, setPasswordError] = useState("");


  const emailAddress = state?.emailAddress || "";

  const validatePassword = (inputPassword) => {
    // Password validation for uppercase, lowercase, numeric, and special characters
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(inputPassword);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including uppercase, lowercase, numeric, and special characters"
      );
      return;
    } else {
      setPasswordError("");
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/updatePassword?emailAddress=${emailAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: emailAddress, // Replace with the user's email
          newPassword: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Handle the response, e.g., show a success message
      console.log(data.message);

      // Redirect to a success page or login page
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="bg-slate-200 pt-40 py-20 px-2">
      <div className=" max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-3xl font-medium">Reset Password</h1>
        {/* <p className="text-slate-500">Please Enter Your New Password.</p> */}
        <form className="my-5">
          <div className="flex flex-col space-y-1 h-48">
            <div className="flex flex-col space-y-5">
              <label htmlFor="password">
                <p className="font-medium text-slate-700 pb-1">New Password</p>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-700 text-gray-700 p-2 w-full"
                />
              </label>
              <label htmlFor="password">
                <p className="font-medium text-slate-700 pb-1">
                  Confirm New Password
                </p>
                <input
                  type="password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-700 text-gray-700 p-2 w-full"
                />
              </label>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {passwordError && (
                <p className="text-red-600 text-sm pl-2">{passwordError}</p>
              )}
            
          </div>
          <button
            onClick={handleResetPassword}
            className="w-full mt-4 py-3 font-medium text-white bg-orange hover:bg-orangeDark rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span>Confirm</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
