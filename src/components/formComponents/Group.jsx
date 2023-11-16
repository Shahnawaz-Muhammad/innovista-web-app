import { Input } from "./input";

export const Group = ({ userInfo, updateUserInfo, showRequired }) => {
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
            type="text"
            data-inputmask="'mask': '99999-9999999-9'"
            placeholder="XXXXX-XXXXXXX-X"
            label="CNIC No"
            required=""
            showRequired={showRequired && !userInfo.cnic}
            value={userInfo.cnic}
            onChange={(e) => handlePersonalInfo(e, "cnic")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            type="numeric"
            placeholder="XXXX-XXXXXXX"
            label="Mobile No"
            required=""
            showRequired={showRequired && !userInfo.mobile}
            value={userInfo.mobile}
            onChange={(e) => handlePersonalInfo(e, "mobile")}
          />
        </div>
      </div>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            type="date"
            label="DOB"
            required=""
            showRequired={showRequired && !userInfo.dob}
            value={userInfo.dob}
            onChange={(e) => handlePersonalInfo(e, "dob")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            label="Designation"
            placeholder="Freelancer"
            required=""
            showRequired={showRequired && !userInfo.designation}
            value={userInfo.designation}
            onChange={(e) => handlePersonalInfo(e, "designation")}
          />
        </div>
      </div>

      <Input
        label="Address"
        type="text"
        placeholder="Address"
        required=""
        showRequired={showRequired && !userInfo.address}
        value={userInfo.address}
        onChange={(e) => handlePersonalInfo(e, "address")}
      />

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            type="text"
            label="City"
            placeholder="Rawalpindi"
            required=""
            showRequired={showRequired && !userInfo.city}
            value={userInfo.city}
            onChange={(e) => handlePersonalInfo(e, "city")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            label="Country"
            placeholder="Pakistan"
            required=""
            showRequired={showRequired && !userInfo.country}
            value={userInfo.country}
            onChange={(e) => handlePersonalInfo(e, "country")}
          />
        </div>
      </div>
    </section>
  );
};
