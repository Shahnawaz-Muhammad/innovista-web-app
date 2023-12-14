import clsx from "clsx";
import { Input } from "./input";
import { useEffect, useState } from "react";

export const Group = ({
  groupInfo,
  updateGroupInfo,
  showRequired = false,
  required = true,
}) => {

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountrySelect = (e) => {
    const selectedCountry = e.currentTarget.value;
    console.log("selected", selectedCountry);
    setSelectedCountry(selectedCountry);
    // // Update cities based on the selected country
    // fetchCities(selectedCountry);
    // Update freelanceInfo with the selected country
    handleGroupInfo(e, "country");
  };
  const handleGroupInfo = (event, key) => {
    const updatedGroupInfo = { ...groupInfo };
    updatedGroupInfo[key] = event.currentTarget.value;
    updateGroupInfo(updatedGroupInfo);
  };


  useEffect(() => {
    var headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "Y0hhVWFNMXNxSmpmVGtOemwyNzFHeWFVWEFMOUsycWhFVDVrM3RCSg=="
    );

    var requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    fetchCountries(requestOptions);
    // Fetch cities for the default selected country, e.g., "PK"
    fetchCities(selectedCountry, requestOptions);
  }, [selectedCountry]);

  const fetchCountries = (requestOptions) => {
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCountries(result);
      })
      .catch((error) => console.log("error", error));
  };

  const fetchCities = (countryCode, requestOptions) => {
    fetch(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/cities`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCities(result);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <h2>Group Info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="col-span-full h-[4.3rem] relative  flex flex-col gap-1">
          <div className="absolute top-0 left-0 w-full">
            <div className="mb-1">
              <label
                htmlFor="noOfPeople"
                className="block text-sm font-medium text-gray-900 "
              >
                No Of People
              </label>

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
                <option value="" selected>
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
            {showRequired &&
              !groupInfo.people && ( // Display error message condition
                <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                  This field is required
                </p>
              )}
          </div>
        </div>

        <div className="col-span-full h-[4.3rem] flex flex-col gap-1">
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
        </div>

        <div className="col-span-1 relative  h-[4.3rem] flex flex-col gap-1">
          <div className="absolute top-0 left-0 w-full">
            {/* <div className="w-full inline-flex justify-between"> */}
            <div className="mb-1">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-900 "
              >
                Country
              </label>

              <select
                id="country"
                value={groupInfo.country}
                className={clsx(
                  " border  text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2.5 ",
                  showRequired &&
                    required &&
                    !groupInfo.country &&
                    "ring-1 ring-primary-starberry-red"
                )}
                onChange={handleCountrySelect}
              >
                <option value="" selected>
                  Select Your Country
                </option>
                {countries?.map((country) => (
                  <option key={country.id} value={country.iso2}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {showRequired &&
              !groupInfo.country && ( // Display error message condition
                <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                  This field is required
                </p>
              )}
          </div>
        </div>

        <div className="col-span-1 relative  h-[4.3rem] flex flex-col gap-1">
          <div className="absolute top-0 left-0 w-full">
            {/* <div className="w-full inline-flex justify-between"> */}
            <div className="mb-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-900 "
              >
                City
              </label>

              <select
                id="city"
                value={groupInfo.city}
                className={clsx(
                  "border text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2.5",
                  showRequired &&
                    required &&
                    !groupInfo.city &&
                    "ring-1 ring-primary-starberry-red"
                )}
                onChange={(e) => handleGroupInfo(e, "city")}
              >
                <option value="" selected>
                  Select Your City
                </option>
                {cities.length > 0 &&
                  cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
              </select>
            </div>
            {showRequired && !groupInfo.city && (
              <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                This field is required
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
