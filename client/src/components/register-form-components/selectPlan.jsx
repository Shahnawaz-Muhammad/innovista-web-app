import { Card } from "./card";
import clsx from "clsx";
import freelancer from "../../assets/images/conference-room.jpeg";
import group from "../../assets/images/conference-room.jpeg";
import company from "../../assets/images/conference-room.jpeg";
import { useState } from "react";

const activeClasses = "border border-orange bg-neutral-magnolia falopa ";

const plans = [
  {
    name: "Freelancer",
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
    Freelancer: {
      description: "Freelancer plan description...",
      additionalInfo: "Additional information for freelancers...",
    },
    Group: {
      description: "Group plan description...",
      additionalInfo: "Additional information for groups...",
    },
    Company: {
      description: "Company plan description...",
      additionalInfo: "Additional information for companies...",
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
              <div className="	">
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
        <div className="mt-4">
          <h3 className="text-2xl font-bold">{selectedPlan.name} Details</h3>
          <p>{categoryData[selectedPlan.name].description}</p>
          <p>{categoryData[selectedPlan.name].additionalInfo}</p>
        </div>
      )}
    </section>
  );
};
