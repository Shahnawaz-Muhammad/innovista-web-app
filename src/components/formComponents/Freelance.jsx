import clsx from "clsx";
import { Input } from "./input";

export const Freelance = ({
  detailedInfo,
  updateDetailedInfo,
  showRequired = false,
  required = true,
}) => {
  const handleDetailedInfo = (event, key) => {
    const updatedDetailedInfo = { ...detailedInfo };
    updatedDetailedInfo[key] = event.currentTarget.value;
    updateDetailedInfo(updatedDetailedInfo);
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2>Detailed Info</h2>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            type="date"
            label="DOB"
            showRequired={showRequired && !detailedInfo.dob}
            value={detailedInfo.dob}
            onChange={(e) => handleDetailedInfo(e, "dob")}
          />
        </div>
        <div className="md:w-1/2 relative mb-14">
          <div className="absolute top-0 left-0 w-full">
            <div className="w-full inline-flex justify-between">
              <label
                for="gender"
                className="block text-sm font-medium text-gray-900 "
              >
                Gender
              </label>
              {required && showRequired && (
                <p className="text-primary-starberry-red leading-3">
                  This field is required
                </p>
              )}
            </div>

              <select
                id="gender"
                // class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2.5 "
                value={detailedInfo.gender}
                className={clsx(
                  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2.5 ",
                  showRequired &&
                    required &&
                    !detailedInfo.gender &&
                    "ring-1 ring-primary-starberry-red"
                )}
                onChange={(e) => handleDetailedInfo(e, "gender")}
              >
                <option selected>Select Your Gender</option>
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
            showRequired={showRequired && !detailedInfo.qualification}
            value={detailedInfo.qualification}
            onChange={(e) => handleDetailedInfo(e, "qualification")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            label="Designation"
            placeholder="Freelancer"
            showRequired={showRequired && !detailedInfo.designation}
            value={detailedInfo.designation}
            onChange={(e) => handleDetailedInfo(e, "designation")}
          />
        </div>
      </div>

      <Input
        label="Address"
        type="text"
        placeholder="Address"
        showRequired={showRequired && !detailedInfo.address}
        value={detailedInfo.address}
        onChange={(e) => handleDetailedInfo(e, "address")}
      />

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            type="text"
            label="City"
            placeholder="Rawalpindi"
            showRequired={showRequired && !detailedInfo.city}
            value={detailedInfo.city}
            onChange={(e) => handleDetailedInfo(e, "city")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            label="Country"
            placeholder="Pakistan"
            showRequired={showRequired && !detailedInfo.country}
            value={detailedInfo.country}
            onChange={(e) => handleDetailedInfo(e, "country")}
          />
        </div>
      </div>
    </section>
  );
};
