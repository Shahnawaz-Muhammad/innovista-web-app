import { useEffect, useState } from "react";
import { Button } from "../../components/register-form-components/button";
import { Sidebar } from "../../components/register-form-components/sidebar";
import { PersonalInfo } from "../../components/register-form-components/personalInfo";
import { SelectPlan } from "../../components/register-form-components/selectPlan";
import { Freelance } from "../../components/register-form-components/Freelance";
import { Group } from "../../components/register-form-components/Group";
import { Company } from "../../components/register-form-components/Company";
import { ServiceSummary } from "../../components/register-form-components/serviceSummary";
import { ThankYou } from "../../components/register-form-components/thankYou";
import { apiUrl } from "../../config";
import Spinner from "../../Loader/Spinner";
const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [step, setStep] = useState(1);
  const [showRequired, setShowRequiredFields] = useState(false);
  const [loading, setLoading] = useState(false);

  const ntnRegex = /^\d{7}-\d{1}$/;

  const [stationsData, setStationsData] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/GetStations`);
            const result = await response.json();
            
            // Extract and set stationsData from the API response
            const extractedStationsData = result.map(chapter => ({
                chapter: chapter.Chapter,
                stations: chapter.reservationTypes.map(station => ({
                    id: station._id,
                    name: station.type
                }))
            }));

            setStationsData(extractedStationsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);

console.log(stationsData);



  const [userServiceConfiguration, setUserServiceConfiguration] = useState({
    userInfo: {
      firstName: "",
      lastName: "",
      cnic: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    selectedPlan: null,
    freelanceInfo: {
      dob: "",
      gender: "",
      qualification: "",
      designation: "",
      address: "",
      city: "",
      country: "",
    },
    groupInfo: {
      people: "",
      address: "",
      city: "",
      country: "",
    },
    companyInfo: {
      ntn: "",
      people: "",
      address: "",
      city: "",
      country: "",
    },
  });

  const updateUserInfo = (userInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, userInfo });
  };

  const updateSelectedPlan = (plan) => {
    setUserServiceConfiguration((prevConfig) => {
      const newSelectedPlan =
        prevConfig.selectedPlan && prevConfig.selectedPlan.name === plan.name
          ? null
          : plan;

      return {
        ...prevConfig,
        selectedPlan: newSelectedPlan,
      };
    });
  };

  const updateFreelanceInfo = (freelanceInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, freelanceInfo });
  };

  const updateGroupInfo = (groupInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, groupInfo });
  };
  const updateCompanyInfo = (companyInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, companyInfo });
  };

  const nextStep = (onGoingStep) => {
    setShowRequiredFields(false);

    if (step === 5) return;
    if (step === 1 || (onGoingStep && onGoingStep !== 1 && step === 1)) {
      if (
        !userServiceConfiguration.userInfo.firstName ||
        !userServiceConfiguration.userInfo.lastName ||
        !userServiceConfiguration.userInfo.cnic ||
        !userServiceConfiguration.userInfo.mobile ||
        !userServiceConfiguration.userInfo.email ||
        !userServiceConfiguration.userInfo.password ||
        userServiceConfiguration.userInfo.password !==
          userServiceConfiguration.userInfo.confirmPassword
      ) {
        setShowRequiredFields(true);
        return;
      }
    }
    // else if (step === 2 || (onGoingStep && onGoingStep === 2 && step === 2)) {
    //   if (userServiceConfiguration.selectedPlan === null) {
    //     setShowRequiredFields(true);
    //     return;
    //   } else {
    //     setShowRequiredFields(false);
    //   }
    // }
    else if (step === 3 || (onGoingStep && onGoingStep !== 3 && step === 3)) {
      if (userServiceConfiguration.selectedPlan.name === "Individual") {
        if (
          !userServiceConfiguration.freelanceInfo.dob ||
          !userServiceConfiguration.freelanceInfo.gender ||
          !userServiceConfiguration.freelanceInfo.qualification ||
          !userServiceConfiguration.freelanceInfo.designation ||
          !userServiceConfiguration.freelanceInfo.address ||
          !userServiceConfiguration.freelanceInfo.bookingStation ||
          !userServiceConfiguration.freelanceInfo.city ||
          !userServiceConfiguration.freelanceInfo.country
        ) {
          setShowRequiredFields(true);
          return;
        }
      }
      if (userServiceConfiguration.selectedPlan.name === "Group") {
        if (
          !userServiceConfiguration.groupInfo.people ||
          !userServiceConfiguration.groupInfo.address ||
          !userServiceConfiguration.groupInfo.city ||
          !userServiceConfiguration.groupInfo.country ||
          !userServiceConfiguration.groupInfo.bookingStation
        ) {
          setShowRequiredFields(true);
          return;
        }
      }
      if (userServiceConfiguration.selectedPlan.name === "Company") {
        if (
          !ntnRegex.test(userServiceConfiguration.companyInfo.ntn) ||
          !userServiceConfiguration.companyInfo.people ||
          !userServiceConfiguration.companyInfo.address ||
          !userServiceConfiguration.companyInfo.city ||
          !userServiceConfiguration.companyInfo.bookingStation ||
          !userServiceConfiguration.companyInfo.country
        ) {
          setShowRequiredFields(true);
          return;
        }
      }
    }
    setStep((step) => {
      if (onGoingStep) return onGoingStep;
      return step + 1;
    });
  };

  const goBack = () => {
    if (step === 1) return;
    setStep((step) => step - 1);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (step === 4) {
      setLoading(true);
      let selectedPlanData = null;
      if (userServiceConfiguration.selectedPlan?.name === null) {
        setShowRequiredFields(true);
      } else if (userServiceConfiguration.selectedPlan.name === "Individual") {
        selectedPlanData = {
          firstName: userServiceConfiguration.userInfo.firstName,
          lastName: userServiceConfiguration.userInfo.lastName,
          cnicNo: userServiceConfiguration.userInfo.cnic,
          mobileNo: userServiceConfiguration.userInfo.mobile,
          emailAddress: userServiceConfiguration.userInfo.email,
          password: userServiceConfiguration.userInfo.password,
          category: userServiceConfiguration.selectedPlan.name,
          dob: userServiceConfiguration.freelanceInfo.dob,
          gender: userServiceConfiguration.freelanceInfo.gender,
          qualification: userServiceConfiguration.freelanceInfo.qualification,
          designation: userServiceConfiguration.freelanceInfo.designation,
          address: userServiceConfiguration.freelanceInfo.address,
          city: userServiceConfiguration.freelanceInfo.city,
          country: userServiceConfiguration.freelanceInfo.country,
        };
      } else if (userServiceConfiguration.selectedPlan.name === "Group") {
        selectedPlanData = {
          firstName: userServiceConfiguration.userInfo.firstName,
          lastName: userServiceConfiguration.userInfo.lastName,
          cnicNo: userServiceConfiguration.userInfo.cnic,
          mobileNo: userServiceConfiguration.userInfo.mobile,
          emailAddress: userServiceConfiguration.userInfo.email,
          password: userServiceConfiguration.userInfo.password,
          category: userServiceConfiguration.selectedPlan.name,
          people: userServiceConfiguration.groupInfo.people,
          address: userServiceConfiguration.groupInfo.address,
          city: userServiceConfiguration.groupInfo.city,
          country: userServiceConfiguration.groupInfo.country,
        };
      } else if (userServiceConfiguration.selectedPlan.name === "Company") {
        selectedPlanData = {
          firstName: userServiceConfiguration.userInfo.firstName,
          lastName: userServiceConfiguration.userInfo.lastName,
          cnicNo: userServiceConfiguration.userInfo.cnic,
          mobileNo: userServiceConfiguration.userInfo.mobile,
          emailAddress: userServiceConfiguration.userInfo.email,
          password: userServiceConfiguration.userInfo.password,
          category: userServiceConfiguration.selectedPlan.name,
          people: userServiceConfiguration.companyInfo.people,
          NTN: userServiceConfiguration.companyInfo.ntn,
          address: userServiceConfiguration.companyInfo.address,
          city: userServiceConfiguration.companyInfo.city,
          country: userServiceConfiguration.companyInfo.country,
        };
      }

      // Check if selectedPlanData exists before attempting to send it
      if (selectedPlanData) {
        await fetch(`${apiUrl}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedPlanData),
        })
          .then((data) => {
            // Handle the API response data here
            setLoading(false);
            setStep(5);
          })
          .catch((error) => {
            // Handle errors here
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
            setLoading(false);
          });
      }
    } else {
      nextStep();
    }
  };

  return (
    <main className=" flex flex-col mt-24 text-neutral-cool-gray w-full lg:mx-auto lg:max-w-[58.75rem] lg:mt-36 lg:mb-16 lg:flex-row grow lg:p-4 lg:rounded-lg lg:bg-white lg:h-[33.75rem] lg:shadow-[10px_10px_40px_10px_rgba(0,0,0,0.2)] ">
      <Sidebar currentStep={step} handleNextStep={nextStep} />
      <div className="px-4 relative bg-neutral-magnolia  lg:bg-transparent lg:flex lg:flex-col lg:w-full ">
        <form className="bg-neutral-alabaster px-6 py-9 rounded-[0.625rem]  -translate-y-[4.5rem] flex w-full grow [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary-marine-blue [&_h3]:font-medium [&_h3]:text-primary-marine-blue lg:bg-transparent lg:translate-y-0 ">
          {step === 1 && (
            <PersonalInfo
              userInfo={userServiceConfiguration.userInfo}
              updateUserInfo={updateUserInfo}
              showRequired={showRequired}
            />
          )}
          {step === 2 && (
            <SelectPlan
              selectedPlan={userServiceConfiguration.selectedPlan}
              monthly={userServiceConfiguration.monthly}
              updateSelectedPlan={updateSelectedPlan}
              showRequired={showRequired}
            />
          )}
          {step === 3 &&
            (userServiceConfiguration.selectedPlan.name === "Individual" ? (
              <Freelance
                freelanceInfo={userServiceConfiguration.freelanceInfo}
                updateFreelanceInfo={updateFreelanceInfo}
                showRequired={showRequired}
                stationsData={stationsData}
              />
            ) : userServiceConfiguration.selectedPlan.name === "Group" ? (
              <Group
                groupInfo={userServiceConfiguration.groupInfo}
                updateGroupInfo={updateGroupInfo}
                showRequired={showRequired}
                stationsData={stationsData}
              />
            ) : (
              <Company
                companyInfo={userServiceConfiguration.companyInfo}
                updateCompanyInfo={updateCompanyInfo}
                showRequired={showRequired}
                stationsData={stationsData}
              />
            ))}
          {step === 4 && (
            <ServiceSummary
              userServiceConfiguration={userServiceConfiguration}
            />
          )}
          {step === 5 && <ThankYou />}
        </form>
        {step < 5 && (
          <menu className="flex justify-between p-4 mt-auto">
            <li>
              <Button type="ghost" onClick={goBack}>
                Go Back
              </Button>
            </li>
            <li>
              <Button
                // onClick  ={() => nextStep()}
                type={step !== 4 ? "primary" : "submit"}
                onClick={handleFormSubmit}
              >
                {step !== 4 ? (
                  "Next Step"
                ) : loading ? (
                  <Spinner size={30} />
                ) : (
                  "Submit"
                )}
              </Button>
            </li>
          </menu>
        )}
      </div>
    </main>
  );
};

export default Register;
