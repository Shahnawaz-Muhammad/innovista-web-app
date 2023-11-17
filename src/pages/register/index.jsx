import { useState } from "react";
import { Button } from "../../components/formComponents/button";
import { Sidebar } from "../../components/formComponents/sidebar";
import { PersonalInfo } from "../../components/formComponents/personalInfo";
import { SelectPlan } from "../../components/formComponents/selectPlan";
import { Freelance } from "../../components/formComponents/Freelance";
import { Group } from "../../components/formComponents/Group";
import { Company } from "../../components/formComponents/Company";
import { ServiceSummary } from "../../components/formComponents/serviceSummary";
import { ThankYou } from "../../components/formComponents/thankYou";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1);
  const [showRequired, setShowRequiredFields] = useState(false);
  const navigate = useNavigate()

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
      noOfPeople: "",
      address: "",
      city: "",
      country: "",
    },
    addons: [],
  });

  const updateUserInfo = (userInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, userInfo });
  };

  const updateSelectedPlan = (plan) => {
    setUserServiceConfiguration({
      ...userServiceConfiguration,
      selectedPlan: plan,
    });
  };

  const updateFreelanceInfo = (freelanceInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, freelanceInfo });
  };

  const updateGroupInfo = (groupInfo) => {
    setUserServiceConfiguration({ ...userServiceConfiguration, groupInfo });
  };

  const updateMonthly = () => {
    setUserServiceConfiguration((prevVal) => ({
      ...userServiceConfiguration,
      monthly: !prevVal.monthly,
    }));
  };

  const nextStep = (onGoingStep) => {
    if (step === 5) return;
    if (step === 1 || (onGoingStep && onGoingStep !== 1 && step === 1)) {
      if (
        !userServiceConfiguration.userInfo.firstName ||
        !userServiceConfiguration.userInfo.lastName ||
        !userServiceConfiguration.userInfo.email.includes("@") ||
        !userServiceConfiguration.userInfo.password
      ) {
        setShowRequiredFields(true);
        return;
      }
    } else if (step === 2 || (onGoingStep && onGoingStep !== 2 && step === 2)) {
      if (userServiceConfiguration.selectedPlan === null) {
        setShowRequiredFields(true);
        return;
      }
      else{
        setShowRequiredFields(false)
      }
    } else if (step === 3 || (onGoingStep && onGoingStep !== 3 && step === 3)) {
      if (userServiceConfiguration.selectedPlan.name === "Freelancer") {
        if (
          !userServiceConfiguration.freelanceInfo.dob ||
          !userServiceConfiguration.freelanceInfo.gender ||
          !userServiceConfiguration.freelanceInfo.qualification ||
          !userServiceConfiguration.freelanceInfo.designation ||
          !userServiceConfiguration.freelanceInfo.address ||
          !userServiceConfiguration.freelanceInfo.city ||
          !userServiceConfiguration.freelanceInfo.country
        ) {
          setShowRequiredFields(true);
          return;
        }
      }
      else if (userServiceConfiguration.selectedPlan.name === "Group") {
        if (
          !userServiceConfiguration.groupInfo.noOfPeople ||
          !userServiceConfiguration.freelanceInfo.address ||
          !userServiceConfiguration.freelanceInfo.city ||
          !userServiceConfiguration.freelanceInfo.country ||
          !userServiceConfiguration.freelanceInfo.address
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (step === 2) {
      if (userServiceConfiguration.selectedPlan) {
        updateSelectedPlan(userServiceConfiguration.selectedPlan);
        setShowRequiredFields(false);
      } else {
        // Show the required error message
        setShowRequiredFields(true);
      }
    }
    if (step === 4) {
      console.log("FORM SUBMITTED", userServiceConfiguration);
      // Perform any additional actions you want after submitting the form
      navigate("/login")
    } else {
      nextStep();
    }
  };
  return (
    <main className="h-screen flex flex-col text-neutral-cool-gray w-full lg:mx-auto lg:max-w-[58.75rem] lg:mt-40 lg:flex-row grow lg:p-4 lg:rounded-lg lg:bg-white lg:h-[33.75rem] lg:shadow ">
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
              updateIsMonthly={updateMonthly}
              showRequired={showRequired}
            />
          )}
          {step === 3 &&
            (userServiceConfiguration.selectedPlan.name === "Freelancer" ? (
              <Freelance
                freelanceInfo={userServiceConfiguration.freelanceInfo}
                updateFreelanceInfo={updateFreelanceInfo}
                showRequired={showRequired}
              />
            ) : userServiceConfiguration.selectedPlan.name === "Group" ? (
              <Group
                groupInfo={userServiceConfiguration.groupInfo}
                updateGroupInfo={updateGroupInfo}
                showRequired={showRequired}
              />
            ) : userServiceConfiguration.selectedPlan.name === "Company" ? (
              <Company
                userInfo={userServiceConfiguration.userInfo}
                updateUserInfo={updateUserInfo}
                showRequired={showRequired}
              />
            ) : (
              <div>error</div>
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
                {step !== 4 ? "Next Step" : "Confirm"}
              </Button>
            </li>
          </menu>
        )}
      </div>
    </main>
  );
};

export default Register;
