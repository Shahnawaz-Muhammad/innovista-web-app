import clsx from "clsx";
import { Input } from "./input";

export const Freelance = ({
  freelanceInfo,
  updateFreelanceInfo,
  showRequired = false,
  required = true,
}) => {
  const handleFreelanceInfo = (event, key) => {
    const updatedFreelanceInfo = { ...freelanceInfo };
    updatedFreelanceInfo[key] = event.currentTarget.value;
    updateFreelanceInfo(updatedFreelanceInfo);
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2>Detailed Info</h2>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            type="date"
            label="DOB"
            showRequired={showRequired && !freelanceInfo.dob}
            value={freelanceInfo.dob}
            onChange={(e) => handleFreelanceInfo(e, "dob")}
          />
        </div>
        <div className="md:w-1/2 relative mb-14">
          <div className="absolute top-0 left-0 w-full">
            <div className="w-full inline-flex justify-between">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-900 "
              >
                Gender
              </label>
              {required && showRequired && (
                <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                  This field is required
                </p>
              )}
            </div>

            <select
              id="gender"
              value={freelanceInfo.gender}
              className={clsx(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2.5 ",
                showRequired &&
                  required &&
                  !freelanceInfo.gender &&
                  "ring-1 ring-primary-starberry-red"
              )}
              onChange={(e) => handleFreelanceInfo(e, "gender")}
            >
              <option value="" disabled selected>Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            label="Qualification"
            placeholder="Bachelors"
            showRequired={showRequired && !freelanceInfo.qualification}
            value={freelanceInfo.qualification}
            onChange={(e) => handleFreelanceInfo(e, "qualification")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            label="Designation"
            placeholder="Freelancer"
            showRequired={showRequired && !freelanceInfo.designation}
            value={freelanceInfo.designation}
            onChange={(e) => handleFreelanceInfo(e, "designation")}
          />
        </div>
      </div>

      <Input
        label="Address"
        type="text"
        placeholder="Address"
        showRequired={showRequired && !freelanceInfo.address}
        value={freelanceInfo.address}
        onChange={(e) => handleFreelanceInfo(e, "address")}
      />

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            type="text"
            label="City"
            placeholder="Rawalpindi"
            showRequired={showRequired && !freelanceInfo.city}
            value={freelanceInfo.city}
            onChange={(e) => handleFreelanceInfo(e, "city")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            label="Country"
            placeholder="Pakistan"
            showRequired={showRequired && !freelanceInfo.country}
            value={freelanceInfo.country}
            onChange={(e) => handleFreelanceInfo(e, "country")}
          />
        </div>
      </div>
    </section>
  );
};
