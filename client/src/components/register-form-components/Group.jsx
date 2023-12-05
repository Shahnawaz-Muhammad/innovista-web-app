import clsx from "clsx";
import { Input } from "./input";

export const Group = ({
  groupInfo,
  updateGroupInfo,
  showRequired = false,
  required = true,
}) => {
  const handleGroupInfo = (event, key) => {
    const updatedGroupInfo = { ...groupInfo };
    updatedGroupInfo[key] = event.currentTarget.value;
    updateGroupInfo(updatedGroupInfo);
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2>Group Info</h2>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="w-full relative  h-16 flex flex-col gap-1">
          <div className="absolute top-0 left-0 w-full">
            <div className="w-full inline-flex justify-between">
              <label
                htmlFor="noOfPeople"
                className="block text-sm font-medium text-gray-900 "
              >
                No Of People
              </label>
              
            </div>

            <select
              id="noOfPeople"
              value={groupInfo.people}
              className={clsx(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-[.6rem] ",
                showRequired &&
                  required &&
                  !groupInfo.people &&
                  "ring-1 ring-primary-starberry-red"
              )}
              onChange={(e) => handleGroupInfo(e, "people")}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="1-5">1 - 5</option>
              <option value="6-10">6 - 10</option>
              <option value="11-15">11 - 15</option>
              <option value="16-20">16 - 20</option>
              <option value="21-30">21 - 30</option>
              <option value="moreThan30">More than 30</option>
            </select>
            {showRequired &&
                !groupInfo.people && ( // Display error message condition
                  <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                    This field is required
                  </p>
                )}
          </div>
        </div>
      </div>

      <Input
        label="Address"
        type="text"
        placeholder="Address"
        showRequired={showRequired && !groupInfo.address}
        value={groupInfo.address}
        onChange={(e) => handleGroupInfo(e, "address")}
        className="h-16 flex flex-col gap-1"
      />
      {showRequired &&
                !groupInfo.address && ( // Display error message condition
                  <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                    This field is required
                  </p>
                )}

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            type="text"
            label="City"
            placeholder="Rawalpindi"
            showRequired={showRequired && !groupInfo.city}
            value={groupInfo.city}
            onChange={(e) => handleGroupInfo(e, "city")}
          />
          {showRequired &&
                !groupInfo.city && ( // Display error message condition
                  <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                    This field is required
                  </p>
                )}
        </div>
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            label="Country"
            placeholder="Pakistan"
            showRequired={showRequired && !groupInfo.country}
            value={groupInfo.country}
            onChange={(e) => handleGroupInfo(e, "country")}
          />
          {showRequired &&
                !groupInfo.country && ( // Display error message condition
                  <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                    This field is required
                  </p>
                )}
        </div>
      </div>
    </section>
  );
};
