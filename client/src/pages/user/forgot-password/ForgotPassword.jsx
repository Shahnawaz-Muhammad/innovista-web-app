import React, { useContext, useState } from "react";
import { apiUrl } from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { AuthContext } from "../../../context/AuthContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(null);

  const {
    randomNumber,
    setRandomNumber,
    generateRandomNumber,
    setEmail: setContextEmail,
  } = useContext(AuthContext);

  const sendEmail = async (randomNumber) => {
    try {
      const templateParams = {
        to_email: email,
        random_number: randomNumber,
      };

      await emailjs.send(
        "service_xvm6qji",
        "template_1q4scwi",
        templateParams,
        "iXLqSwaAmmr_ku5qW"
      );

      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    try {
      const randomNumber = generateRandomNumber();
      setContextEmail(email);

      const response = await fetch(`${apiUrl}/checkEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.emailExists) {
        setEmailExists(true);
        sendEmail(randomNumber);
        navigate(`/confirm-otp`);
      } else {
        setEmailExists(false);
      }
    } catch (error) {
      console.error("Error checking email:", error);
      // Handle error
    }
  };
  return (
    <div className="bg-slate-200 pt-40 py-20 px-2">
      <div class=" max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-3xl font-medium">Verification</h1>
        <p class="text-slate-500">Fill up the form to verify your email</p>
        <form action="" class="my-10">
          <div class="flex flex-col space-y-5">
            <label for="email">
              <p class="font-medium text-slate-700 pb-2">Email address</p>
              <input
                type="email"
                className="border border-gray-700 text-gray-700 p-2 w-full"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              {emailExists === false && (
                <p className="text-red-500 text-sm px-1">
                  Email does not exist!
                </p>
              )}
            </label>

            <button
              onClick={handleEmailCheck}
              class="w-full py-3 font-medium text-white bg-orange hover:bg-orangeDark rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Send OTP</span>
            </button>

            <p class="text-center">
              Not registered yet?{" "}
              <Link
                to="/register"
                class="text-orange font-medium inline-flex space-x-1 items-center"
              >
                <span>Register now </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
