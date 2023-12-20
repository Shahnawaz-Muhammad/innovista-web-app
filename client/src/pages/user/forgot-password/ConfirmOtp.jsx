import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOtp = () => {
  const navigate = useNavigate();
  const { randomNumber } = useContext(AuthContext);
  const [otpValue, setOtpValue] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleConfirmOtp = (e) => {
    e.preventDefault()
    const otpNumber = parseInt(otpValue, 10); // or Number(otpValue);
    
    if (!isNaN(otpNumber) && otpNumber === randomNumber) {
      navigate("/reset-password");
      setShowError(false);
    } else {
      setShowError(true);
    }
  };
  return (
    <div className="bg-slate-200 pt-40 py-20 px-2">
      <div class=" max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-3xl font-medium">Confirm OTP</h1>
        <p class="text-slate-500">
          Write the OTP that is sent to your email address in the below input
          field.
        </p>
        <form class="my-5">
          <div class="flex flex-col space-y-5">
            <label htmlFor="otp">
              <p class="font-medium text-slate-700 pb-2"></p>
              <input
                name="otp"
                type="text"
                className="border border-gray-700 text-gray-700 p-2 w-full"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
              />
              {showError && <p>OTP doesn't match</p>}
            </label>

            <button
              onClick={handleConfirmOtp}
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

              <span>Confirm OTP</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmOtp;
