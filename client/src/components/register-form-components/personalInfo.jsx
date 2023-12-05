import { useState } from "react";
import { Input } from "./input";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

export const PersonalInfo = ({ userInfo, updateUserInfo, showRequired }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const cnicRegex = /^\d{13}$/;
  const mobileRegex = /^\d{11}$/;

  const handlePersonalInfo = (event, key) => {
    const updatedUserInfo = { ...userInfo };
    updatedUserInfo[key] = event.currentTarget.value;
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
              Please enter your First Name.
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
              Please enter your Last Name.
            </p>
          )}
        </div>
      </div>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            type="text"
            data-inputmask="'mask': '99999-9999999-9'"
            placeholder="XXXXXXXXXXXXX"
            label="CNIC No"
            showRequired={showRequired && !userInfo.cnic}
            value={userInfo.cnic}
            onChange={(e) => handlePersonalInfo(e, "cnic")}
          />
          {showRequired && !userInfo.cnic && (
            <p className="text-primary-starberry-red leading-3 text-sm">
              Please enter your CNIC No. 
            </p>
          )}
          {showRequired && userInfo.cnic && !cnicRegex.test(userInfo.cnic) && (
            <p className="text-primary-starberry-red leading-3 text-sm">
              CNIC No. format should be XXXXXXXXXXXXX.
            </p>
          )}
        </div>
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            type="numeric"
            placeholder="XXXXXXXXXXX"
            label="Mobile No"
            showRequired={showRequired && !userInfo.mobile}
            value={userInfo.mobile}
            onChange={(e) => handlePersonalInfo(e, "mobile")}
          />
          {showRequired && !userInfo.mobile && (
            <p className="text-primary-starberry-red leading-3 text-sm">
              Please enter your Mobile No. 
            </p>
          )}
          {showRequired && userInfo.mobile && !mobileRegex.test(userInfo.mobile) && (
            <p className="text-primary-starberry-red leading-3 text-sm">
              Mobile No. format should be XXXXXXXXXXX.
            </p>
          )}
        </div>
      </div>

      <Input
        label="Email Address"
        className="h-16 flex flex-col gap-1"
        placeholder="e.g. stephenking@lorem.com"
        showRequired={
          showRequired && (!userInfo.email || !userInfo.email.includes("@"))
        }
        value={userInfo.email}
        onChange={(e) => handlePersonalInfo(e, "email")}
      />
      {showRequired && !userInfo.email && (
            <p className=" text-primary-starberry-red leading-3 text-sm">
              Please enter your Email Address.
            </p>
          )}

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
              Please enter your Password.
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
