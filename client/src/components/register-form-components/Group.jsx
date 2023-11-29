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
        <div className="w-full relative mb-16">
          <div className="absolute top-0 left-0 w-full">
            <div className="w-full inline-flex justify-between">
              <label
                htmlFor="noOfPeople"
                className="block text-sm font-medium text-gray-900 "
              >
                No Of People
              </label>
              {required && showRequired && (
                <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                  This field is required
                </p>
              )}
            </div>

            <select
              id="noOfPeople"
              value={groupInfo.noOfPeople}
              className={clsx(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-[.6rem] ",
                showRequired &&
                  required &&
                  !groupInfo.noOfPeople &&
                  "ring-1 ring-primary-starberry-red"
              )}
              onChange={(e) => handleGroupInfo(e, "noOfPeople")}
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
      />

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            type="text"
            label="City"
            placeholder="Rawalpindi"
            showRequired={showRequired && !groupInfo.city}
            value={groupInfo.city}
            onChange={(e) => handleGroupInfo(e, "city")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            label="Country"
            placeholder="Pakistan"
            showRequired={showRequired && !groupInfo.country}
            value={groupInfo.country}
            onChange={(e) => handleGroupInfo(e, "country")}
          />
        </div>
      </div>
    </section>
  );
};
