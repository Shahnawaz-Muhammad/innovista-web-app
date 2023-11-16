import { useState } from "react";
import { Input } from "./input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export const PersonalInfo = ({ userInfo, updateUserInfo, showRequired }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const handlePersonalInfo = (event, key) => {
    const updatedUserInfo = { ...userInfo };
    updatedUserInfo[key] = event.currentTarget.value;
    updateUserInfo(updatedUserInfo);
  };

  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="text-center">Personal Info</h2>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            showRequired={showRequired && !userInfo.firstName}
            value={userInfo.firstName}
            onChange={(e) => handlePersonalInfo(e, "firstName")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            label="Last Name"
            type="text"
            placeholder="Doe"
            showRequired={
              showRequired && !userInfo.lastName
            }
            value={userInfo.lastName}
            onChange={(e) => handlePersonalInfo(e, "lastName")}
          />
        </div>
      </div>
      

      <Input
        label="Email Address"
        placeholder="e.g. stephenking@lorem.com"
        showRequired={
          showRequired && (!userInfo.email || !userInfo.email.includes("@"))
        }
        value={userInfo.email}
        onChange={(e) => handlePersonalInfo(e, "email")}
      />

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2 relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            showRequired={showRequired && !userInfo.password}
            value={userInfo.password}
            onChange={(e) => handlePersonalInfo(e, "password")}
          />
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
        <div className="md:w-1/2 relative">
          <Input
            label="Confirm Password"
            type={showCPassword ? "text" : "password"}
            placeholder="********"
            showRequired={showRequired && !userInfo.confirmPassword}
            value={userInfo.confirmPassword}
            onChange={(e) => handlePersonalInfo(e, "confirmPassword")}
          />
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
