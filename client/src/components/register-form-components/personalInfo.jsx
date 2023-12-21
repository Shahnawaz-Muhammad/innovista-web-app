import { useState } from "react";
import { Input } from "./input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";


export const PersonalInfo = ({ userInfo, updateUserInfo, showRequired }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex =  /^03\d{2}-\d{7}$/;;
  const nameRegex = /^[A-Za-z]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  const handlePersonalInfo = (event, key) => {
    let updatedValue = event.currentTarget.value;

    // Format CNIC by inserting dashes after the 5th and 12th digit
    if (key === "cnic") {
      // Remove existing dashes
      const numericValue = updatedValue.replace(/[^\d]/g, "");

      // Insert dashes after the 5th and 12th digit
      updatedValue =
        numericValue.slice(0, 5) +
        (numericValue.length >= 6 ? "-" : "") +
        numericValue.slice(5, 12) +
        (numericValue.length >= 13 ? "-" : "") +
        numericValue.slice(12);

      // Limit the total number of characters to 15
      updatedValue = updatedValue.slice(0, 15);
    }

    if (key === "mobile") {
      // Remove existing dashes
      const numericValue = updatedValue.replace(/[^\d]/g, "");

      // Insert dashes after the 5th and 12th digit
      updatedValue =
        numericValue.slice(0, 4) +
        (numericValue.length >= 5 ? "-" : "") +
        numericValue.slice(4, 11);

      // Limit the total number of characters to 15
      updatedValue = updatedValue.slice(0, 12);
    }

    const updatedUserInfo = { ...userInfo, [key]: updatedValue };
    updateUserInfo(updatedUserInfo);
  };

  return (
    <section className="flex flex-col gap-4 w-full">
      <h2>Personal Info</h2>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            showRequired={showRequired && !userInfo.firstName}
            value={userInfo.firstName}
            onChange={(e) => handlePersonalInfo(e, "firstName")}
          />
          {showRequired && !userInfo.firstName && (
            <p className=" text-primary-starberry-red leading-3 text-sm">
              This Field is Required 
            </p>
          )}
          {showRequired &&
            userInfo.firstName &&
            !nameRegex.test(userInfo.firstName) && (
              <p className="text-primary-starberry-red leading-3 text-sm">
                Name can only be Alphabets
              </p>
            )}
        </div>
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            label="Last Name"
            type="text"
            placeholder="Doe"
            showRequired={showRequired && !userInfo.lastName}
            value={userInfo.lastName}
            onChange={(e) => handlePersonalInfo(e, "lastName")}
          />
          {showRequired && !userInfo.lastName && (
            <p className=" text-primary-starberry-red leading-3 text-sm">
              This Field is Required 
            </p>
          )}
          {showRequired &&
            userInfo.lastName &&
            !nameRegex.test(userInfo.lastName) && (
              <p className="text-primary-starberry-red leading-3 text-sm">
                Name can only be Alphabets
              </p>
            )}
        </div>
      </div>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            type="text"
            data-inputmask="'mask': '99999-9999999-9'"
            placeholder="XXXXX-XXXXXXX-X"
            label="CNIC No"
            showRequired={showRequired && !userInfo.cnic}
            value={userInfo.cnic}
            onChange={(e) => handlePersonalInfo(e, "cnic")}
          />
          {showRequired && !userInfo.cnic && (
            <p className="text-primary-starberry-red leading-3 text-sm">
              This Field is Required 
            </p>
          )}
          {showRequired && userInfo.cnic && !cnicRegex.test(userInfo.cnic) && (
            <p className="text-primary-starberry-red leading-3 text-sm">
              Enter valid CNIC i.e. (xxxxx-xxxxxxx-x)
            </p>
          )}
        </div>
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            type="numeric"
            placeholder="03XX-XXXXXXX"
            label="Contact No"
            showRequired={showRequired && !userInfo.mobile}
            value={userInfo.mobile}
            onChange={(e) => handlePersonalInfo(e, "mobile")}
          />
          {showRequired && !userInfo.mobile && (
            <p className="text-primary-starberry-red leading-3 text-sm">
              This Field is Required 
            </p>
          )}
          {showRequired &&
            userInfo.mobile &&
            !mobileRegex.test(userInfo.mobile) && (
              <p className="text-primary-starberry-red leading-3 text-sm">
                Enter Valid Contact No i.e. (03xx-xxxxxxx)
              </p>
            )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Input
          label="Email"
          className="h-12 flex flex-col gap-1"
          placeholder="support@dlabs.com"
          showRequired={
            showRequired && (!userInfo.email || !userInfo.email.includes("@"))
          }
          value={userInfo.email}
          onChange={(e) => handlePersonalInfo(e, "email")}
        />
        {showRequired && !userInfo.email && (
          <p className=" text-primary-starberry-red leading-3 text-sm">
            This Field is Required
          </p>
        )}
        {showRequired &&
            userInfo.email &&
            !emailRegex.test(userInfo.email) && (
              <p className="text-primary-starberry-red leading-3 text-sm">
                Enter Valid Email
              </p>
            )}
      </div>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2 relative h-16 flex flex-col gap-1">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            showRequired={showRequired && !userInfo.password}
            value={userInfo.password}
            onChange={(e) => handlePersonalInfo(e, "password")}
          />
          {showRequired && !userInfo.password && (
            <p className=" text-primary-starberry-red leading-3 text-sm">
              This Field is Required 
            </p>
          )}
          {showRequired &&
            userInfo.password &&
            !passwordRegex.test(userInfo.password) && (
              <p className="text-primary-starberry-red leading-3 text-sm">
                Password must be minimum of 8 characters and combination of uppercase, lowercase, numeric and special characters.
              </p>
            )}
          {showPassword ? (
            <IoIosEye
              className="absolute right-2 top-7 cursor-pointer text-xl"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoIosEyeOff
              className="absolute right-2 top-7 cursor-pointer text-xl"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        <div className="md:w-1/2 relative h-16 flex flex-col gap-1">
          <Input
            label="Confirm Password"
            type={showCPassword ? "text" : "password"}
            placeholder="********"
            showRequired={showRequired && !userInfo.confirmPassword}
            value={userInfo.confirmPassword}
            onChange={(e) => handlePersonalInfo(e, "confirmPassword")}
          />
          {showRequired && userInfo.password !== userInfo.confirmPassword && (
            <p className="text-primary-starberry-red leading-3 text-sm">
              Passwords do not match.
            </p>
          )}
          {showCPassword ? (
            <IoIosEye
              className="absolute right-2 top-7 cursor-pointer text-xl"
              onClick={() => setShowCPassword(false)}
            />
          ) : (
            <IoIosEyeOff
              className="absolute right-2 top-7 cursor-pointer text-xl"
              onClick={() => setShowCPassword(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
};
