import clsx from "clsx";
import { Input } from "./input";
import { useEffect, useState } from "react";

export const Freelance = ({
  freelanceInfo,
  updateFreelanceInfo,
  showRequired = false,
  required = true,
}) => {
  const currentDate = new Date().toISOString().split("T")[0];
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
    handleFreelanceInfo(e, "country");
  };

  const handleFreelanceInfo = (event, key) => {
    const updatedFreelanceInfo = { ...freelanceInfo };
    updatedFreelanceInfo[key] = event.currentTarget.value;
    updateFreelanceInfo(updatedFreelanceInfo);
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
    <section className="flex flex-col gap-2 w-full">
      <h2>Detailed Info</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="col-span-1 h-[4.3rem] flex flex-col gap-1">
          <div className="mb-1">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-900 "
            >
              DOB
            </label>
            <input
              type="date"
              name="dob"
              max={currentDate}
              showRequired={showRequired && !freelanceInfo.dob}
              value={freelanceInfo.dob}
              onChange={(e) => handleFreelanceInfo(e, "dob")}
              className={clsx(
                " border  text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2 ",
                showRequired &&
                  required &&
                  !freelanceInfo.dob &&
                  "ring-1 ring-primary-starberry-red"
              )}
            />
            {showRequired &&
              !freelanceInfo.dob && ( // Display error message condition
                <p className=" mt-1 text-primary-starberry-red leading-3 text-sm font-medium">
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
                htmlFor="gender"
                className="block text-sm font-medium text-gray-900 "
              >
                Gender
              </label>

              <select
                id="gender"
                value={freelanceInfo.gender}
                className={clsx(
                  " border  text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2.5 ",
                  showRequired &&
                    required &&
                    !freelanceInfo.gender &&
                    "ring-1 ring-primary-starberry-red"
                )}
                onChange={(e) => handleFreelanceInfo(e, "gender")}
              >
                <option value="" selected>
                  Select Your Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {showRequired &&
              !freelanceInfo.gender && ( // Display error message condition
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
                htmlFor="qualification"
                className="block text-sm font-medium text-gray-900 "
              >
                Qualification
              </label>

              <select
                id="qualification"
                value={freelanceInfo.qualification}
                className={clsx(
                  " border  text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2.5 ",
                  showRequired &&
                    required &&
                    !freelanceInfo.qualification &&
                    "ring-1 ring-primary-starberry-red"
                )}
                onChange={(e) => handleFreelanceInfo(e, "qualification")}
              >
                <option value="" selected>
                  Select Your Qualification
                </option>
                <option value="male">Matric</option>
                <option value="female">Intermediate</option>
                <option value="bachelors">Bachelors</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
              </select>
            </div>
            {showRequired &&
              !freelanceInfo.qualification && ( // Display error message condition
                <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                  This field is required
                </p>
              )}
          </div>
        </div>

        <div className="col-span-1 h-[4.3rem] flex flex-col gap-1">
          <Input
            label="Designation"
            placeholder="Freelancer"
            showRequired={showRequired && !freelanceInfo.designation}
            value={freelanceInfo.designation}
            onChange={(e) => handleFreelanceInfo(e, "designation")}
          />
          {showRequired &&
            !freelanceInfo.designation && ( // Display error message condition
              <p className="text-primary-starberry-red leading-3 text-sm font-medium">
                This field is required
              </p>
            )}
        </div>

        <div className="col-span-full h-[4.3rem] w-full flex flex-col md:gap-1">
          <Input
            label="Address"
            type="text"
            placeholder="Address"
            showRequired={showRequired && !freelanceInfo.address}
            value={freelanceInfo.address}
            onChange={(e) => handleFreelanceInfo(e, "address")}
          />
          {showRequired &&
            !freelanceInfo.address && ( // Display error message condition
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
                value={freelanceInfo.country}
                className={clsx(
                  " border  text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2.5 ",
                  showRequired &&
                    required &&
                    !freelanceInfo.country &&
                    "ring-1 ring-primary-starberry-red"
                )}
                onChange={handleCountrySelect}
              >
                <option value="" disabled selected>
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
              !freelanceInfo.country && ( // Display error message condition
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
                value={freelanceInfo.city}
                className={clsx(
                  "border text-gray-900 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-primary-purplish-blue block w-full p-2.5",
                  showRequired &&
                    required &&
                    !freelanceInfo.city &&
                    "ring-1 ring-primary-starberry-red"
                )}
                onChange={(e) => handleFreelanceInfo(e, "city")}
              >
                <option value="" disabled selected>
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
            {showRequired && !freelanceInfo.city && (
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
