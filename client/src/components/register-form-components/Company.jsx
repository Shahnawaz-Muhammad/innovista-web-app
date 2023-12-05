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

  const ntnRegex = /^\d{8}$/;

  return (
    <section className="flex flex-col gap-4 w-full ">
      <h2>Company Info</h2>

      <div className=" flex flex-col md:flex-row justify-center gap-4">
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <div className=" flex flex-col md:flex-row justify-center gap-4">
            <div className="w-full relative ">
              <div className="absolute -top-1 left-0 w-full">
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
                  value={companyInfo.people}
                  className={clsx(
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-[.6rem] ",
                    showRequired &&
                      required &&
                      !companyInfo.people &&
                      "ring-1 ring-primary-starberry-red"
                  )}
                  onChange={(e) => handleCompanyInfo(e, "people")}
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
                  !companyInfo.people && ( // Display error message condition
                    <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                      This field is required
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            label="NTN"
            type="text"
            placeholder="NTN"
            showRequired={showRequired && !companyInfo.ntn}
            value={companyInfo.ntn}
            onChange={(e) => handleCompanyInfo(e, "ntn")}
          />
          {showRequired && !companyInfo.ntn && (
            <p className="text-primary-starberry-red leading-3 text-sm">
              Please enter your NTN No.
            </p>
          )}
          {showRequired &&
            companyInfo.ntn &&
            !ntnRegex.test(companyInfo.ntn) && (
              <p className="text-primary-starberry-red leading-3 text-sm">
                NTN No. format should be XXXXXXXX.
              </p>
            )}
        </div>
      </div>

      <Input
        label="Address"
        type="text"
        placeholder="Address"
        showRequired={showRequired && !companyInfo.address}
        value={companyInfo.address}
        onChange={(e) => handleCompanyInfo(e, "address")}
        className="h-16 flex flex-col gap-1"
      />
      {showRequired &&
        !companyInfo.address &&   ( // Display error message condition
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
            showRequired={showRequired && !companyInfo.city}
            value={companyInfo.city}
            onChange={(e) => handleCompanyInfo(e, "city")}
            
          />
          {showRequired &&
            !companyInfo.city && ( // Display error message condition
              <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                This field is required
              </p>
            )}
        </div>
        <div className="md:w-1/2 h-16 flex flex-col gap-1">
          <Input
            label="Country"
            placeholder="Pakistan"
            showRequired={showRequired && !companyInfo.country}
            value={companyInfo.country}
            onChange={(e) => handleCompanyInfo(e, "country")}
          />
          {showRequired &&
            !companyInfo.country && ( // Display error message condition
              <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                This field is required
              </p>
            )}
        </div>
      </div>
    </section>
  );
};
