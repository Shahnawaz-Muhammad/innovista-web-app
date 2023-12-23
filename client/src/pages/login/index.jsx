import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/D-labs-logo-white.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import loginBg from "../../assets/images/bg-main.png";

const Login = () => {
  const { login, unAuthorizedUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (inputEmail) => {
    // Basic email validation using a regular expression
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(inputEmail);
  };

  const validatePassword = (inputPassword) => {
    // Password validation for uppercase, lowercase, numeric, and special characters
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(inputPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if(!email) {
      setEmailError("Email is Required!");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    else {
      setEmailError("");
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including uppercase, lowercase, numeric, and special characters"
      );
      return;
    } else {
      setPasswordError("");
    }

    login({ email, password }, event);
  };

  return (
    <div
      className="w-full flex justify-center py-10 mt-20 px-2"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="w-full  rounded-lg shadow shadow-slate-400 md:mt-0 sm:max-w-md xl:p-0 "
        style={{
          backdropFilter: "blur(10x)",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="bg-black rounded-full p-3 flex justify-center ">
            <img src={logo} alt="" className="h-16" />
          </div>

          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white">
            Welcome to D-Labs
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={(event) => handleLogin(event)}
            noValidate
          >
            <div>
              <label
                htmlFor="email"
                className="block pl-3 text-sm font-bold  dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="d-labs@gmail.com"
                className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-600 text-sm pl-2">{emailError}</p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className=" mb-2 text-sm font-bold pl-3 dark:text-white"
              >
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-red-600 text-sm pl-2">{passwordError}</p>
              )}
              {showPassword ? (
                <IoIosEye
                  className=" absolute right-2 top-9 cursor-pointer text-xl"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoIosEyeOff
                  className="absolute right-2 top-9 cursor-pointer text-xl"
                  onClick={() => setShowPassword(true)}
                />
              )}
              {unAuthorizedUser && (
                <p className="text-red-500 text-sm pl-2">
                  Email or Password is wrong!
                </p>
              )}
            </div>

            <div className="px-3 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 ">
                  <label
                    htmlFor="remember"
                    className="font-medium dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                to="/find-your-account"
                className=" font-medium  hover:underline dark:text-primary-500"
              >
                Forgot password ?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-orange hover:bg-orangeDark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
            <p className="text-md font-medium  dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                className="font-bold p-2 text-gray-600 hover:text-white hover:bg-orange hover:rounded-lg hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
