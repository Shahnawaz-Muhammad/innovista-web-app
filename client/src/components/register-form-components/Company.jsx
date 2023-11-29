import clsx from "clsx";
import { Input } from "./input";

export const Company = ({
  companyInfo,
  updateCompanyInfo,
  showRequired = false,
  required = true,
}) => {
  const handleCompanyInfo = (event, key) => {
    const updatedCompanyInfo = { ...companyInfo };
    updatedCompanyInfo[key] = event.currentTarget.value;
    updateCompanyInfo(updatedCompanyInfo);
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2>Company Info</h2>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <div className=" flex flex-col md:flex-row justify-center gap-4">
            <div className="w-full relative mb-16">
              <div className="absolute -top-1 left-0 w-full">
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
                  value={companyInfo.noOfPeople}
                  className={clsx(
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-[.6rem] ",
                    showRequired &&
                      required &&
                      !companyInfo.noOfPeople &&
                      "ring-1 ring-primary-starberry-red"
                  )}
                  onChange={(e) => handleCompanyInfo(e, "noOfPeople")}
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
        </div>
        <div className="md:w-1/2">
          <Input
            label="NTN"
            type="text"
            placeholder="NTN"
            showRequired={showRequired && !companyInfo.ntn}
            value={companyInfo.ntn}
            onChange={(e) => handleCompanyInfo(e, "ntn")}
          />
        </div>
      </div>

      <Input
        label="Address"
        type="text"
        placeholder="Address"
        showRequired={showRequired && !companyInfo.address}
        value={companyInfo.address}
        onChange={(e) => handleCompanyInfo(e, "address")}
      />

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2">
          <Input
            type="text"
            label="City"
            placeholder="Rawalpindi"
            showRequired={showRequired && !companyInfo.city}
            value={companyInfo.city}
            onChange={(e) => handleCompanyInfo(e, "city")}
          />
        </div>
        <div className="md:w-1/2">
          <Input
            label="Country"
            placeholder="Pakistan"
            showRequired={showRequired && !companyInfo.country}
            value={companyInfo.country}
            onChange={(e) => handleCompanyInfo(e, "country")}
          />
        </div>
      </div>
    </section>
  );
};
