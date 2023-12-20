import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { apiUrl } from "../../../config";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { email } = useContext(AuthContext);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!email) {
      // If email doesn't exist, navigate to the "forgot-password" page
      navigate("/forgot-password");
      return;
    }

    // Call the updatePassword API
    try {
      const response = await fetch(
        `${apiUrl}/updatePassword?emailAddress=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: password }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      // Password updated successfully
      console.log("Password updated successfully");
      setError("");
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Error updating password. Please try again.");
    }
  };

  return (
    <div className="bg-slate-200 pt-40 py-20 px-2">
      <div class=" max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-3xl font-medium">Confirm OTP</h1>
        <p class="text-slate-500">Please Enter Your New Password.</p>
        <form class="my-5">
          <div class="flex flex-col space-y-1 h-48">
            <div class="flex flex-col space-y-5">
              <label htmlFor="password">
                <p class="font-medium text-slate-700 pb-1">New Password</p>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-700 text-gray-700 p-2 w-full"
                />
              </label>
              <label htmlFor="password">
                <p class="font-medium text-slate-700 pb-1">
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
          </div>
          <button
            onClick={handleResetPassword}
            class="w-full py-3 font-medium text-white bg-orange hover:bg-orangeDark rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
