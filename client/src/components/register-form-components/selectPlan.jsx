import { Card } from "./card";
import clsx from "clsx";
import freelancer from "../../assets/images/freelancer.jpeg";
import group from "../../assets/images/group.jpg";
import company from "../../assets/images/company.jpg";
import { useState } from "react";

const activeClasses = "border border-orange bg-neutral-magnolia falopa ";

const plans = [
  {
    name: "Individual",
    icon: freelancer,
  },
  {
    name: "Group",
    icon: group,
  },
  {
    name: "Company",
    icon: company,
  },
];

export const SelectPlan = ({
  selectedPlan,
  updateSelectedPlan,
  showRequired,
}) => {
  const [, setCategorySelected] = useState(false);

  const categoryData = {
    Individual: {
      description: "Access to job postings and projects matching skills.",
      additionalInfo: "Direct client communication channels.",
      additionalInfo1: "Early access to new project listings.",
      quantity: "Individual Only",
      additionalInfo2: "",
    },
    Group: {
      description:
        "Collaborative workspace for team communication and task management.",
      additionalInfo: "Dedicated team support for account management.",
      additionalInfo1: "Group discounts for skill development courses.",
      additionalInfo2: "Access to job postings and projects matching skills.",
      quantity: "All Group Members ",
    },
    Company: {
      description: "Customizable corporate profiles and branding.",
      additionalInfo:
        "Dedicated account manager and priority customer support.",
      additionalInfo1: "Enhanced visibility for projects and company listings.",
      additionalInfo2:
        "Access to exclusive industry insights and market reports.",
      quantity: "All Employees",
    },
  };

  return (
    <section className="flex flex-col gap-2 w-full ">
      <h2>Select your Category</h2>

      <ul className="mt-2 flex flex-col gap-2 lg:flex-row">
        {plans.map((plan) => (
          <li key={plan.name} className="lg:w-full">
            <Card
              className={clsx(
                " flex gap-4 transition-all w-full lg:flex-col lg:gap-3 hover:border-orange hover:bg-neutral-magnolia cursor-pointer",
                plan.name === selectedPlan?.name
                  ? activeClasses
                  : "border border-neutral-light-gray"
              )}
              onClick={() => {
                updateSelectedPlan(plan);
                setCategorySelected(true); // Set category as selected on click
              }}
            >
              <figure className="">
                <img
                  src={`${plan.icon}`}
                  alt=""
                  className="rounded-xl h-36 w-full"
                />
              </figure>
              <div className="flex justify-center items-center">
                <h3 className="leading-5 text-center pb-4 text-xl font-extrabold">
                  {plan.name}
                </h3>
              </div>
            </Card>
          </li>
        ))}
      </ul>
      {showRequired && !selectedPlan && (
        <p className="text-primary-starberry-red leading-3 text-sm">
          Please Select a Category
        </p>
      )}

      {selectedPlan && (
        <div className="mt-1 h-24">
          <h3 className="text-2xl font-bold">{selectedPlan.name} Details</h3>
          <p className="text-md font-md">
            {categoryData[selectedPlan?.name]?.description}
          </p>
          <p className="text-md font-md">
            {categoryData[selectedPlan?.name]?.additionalInfo}
          </p>
          <p className="text-md font-md">
            {categoryData[selectedPlan?.name]?.additionalInfo1}
          </p>
          <p className="text-md font-md">
            {categoryData[selectedPlan?.name]?.additionalInfo2}
          </p>
        </div>
      )}
    </section>
  );
};
