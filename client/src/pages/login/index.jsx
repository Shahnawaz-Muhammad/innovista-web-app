import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/innovista-logo-white.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Spinner from "../../Loader/Spinner";
const Login = () => {
  const {
    login,
    unAuthorizedUser,
    loading, 
    setLoading
  } = useContext(AuthContext);  
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

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
  
      // Set loading to true before making the API call
      setLoading(true);
  
      if (!email) {
        setEmailError("Email is Required!");
        setLoading(false); // Set loading back to false
        return;
      }
  
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        setLoading(false); // Set loading back to false
        return;
      } else {
        setEmailError("");
      }
  
      // Validate password
      if (!validatePassword(password)) {
        setPasswordError(
          "Password must contain at least 8 characters, including uppercase, lowercase, numeric, and special characters"
        );
        setLoading(false); // Set loading back to false
        return;
      } else {
        setPasswordError("");
      }
  
      // Call the login function from AuthContext
      await login({ email, password }, event);
    } finally {
      // Set loading back to false regardless of the API call result
      setLoading(false);
    }
  };
  

  return (
    <div
      className="w-full flex justify-center py-10 mt-20 px-2"
      // style={{
      //   backgroundImage: `url(${loginBg})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div
        className="w-full  rounded-lg  shadow-slate-400 md:mt-0 sm:max-w-md xl:p-0 "
        style={{boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)"}}
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="bg-black rounded-full h-20 flex justify-center items-center object-cover p-2">
            <img src={logo} alt="" className="w-30 h-16 object-cover" />
          </div>

          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-700 md:text-2xl ">
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
                className="block pl-3 text-sm font-bold  "
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="d-labs@gmail.com"
                className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                className=" mb-2 text-sm font-bold pl-3 "
              >
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="********"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                  Invalid Email or Password 
                </p>
              )}
            </div>

            <div className="md:px-3 flex flex-row  justify-between sm:font-normal md:font-medium">
              <div className="flex items-start">
                <div className="">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-3 h-3 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-1 ">
                  <label
                    htmlFor="remember"
                    className=" "
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                to="/find-your-account"
                className=" ml-3  hover:underline "
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-orange hover:bg-orangeDark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              {loading ? <Spinner size={30}/> : "Sign in"}
            </button>
            <p className="text-md font-medium  ">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                className="font-bold p-2 text-gray-600 hover:text-white hover:bg-orange hover:rounded-lg hover:underline"
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
