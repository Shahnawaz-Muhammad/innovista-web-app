import React from "react";
import appleLogo from "../../../assets/logos/apple.png";
import amazonLogo from "../../../assets/logos/amazon.jpeg";
import ciscoLogo from "../../../assets/logos/cisco.png";

const JobAds = () => {
  const jobPosts = [
    {
      id: 1,
      company: "Apple",
      logo: appleLogo,
      location: "New Location, USA",
      jobTitle: "UI/UX Designer",
      skills: "HTML CSS FIGMA Ad. XD Illustrator",
      salery: "$60K - $100K ",
    },
    {
      id: 2,
      company: "CISCO",
      logo: ciscoLogo,
      location: "New Location, Norway",
      jobTitle: "AI/ ML Develope",
      skills: "Python NLP",
      salery: "$55K - $95K ",
    },
    {
      id: 3,
      company: "Amazon",
      logo: amazonLogo,
      location: "New Location, UK",
      jobTitle: "Sales Manager",
      skills: "HTML CSS FIGMA Ad. XD Illustrator",
      salery: "$70K - $120K ",
    },
  ];
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-3">
        {jobPosts.map((post) => {
          return (
            <div className="w-full flex gap-5 items-center">
              <div className="w-full flex gap-2 items-center shadow-[2px_1px_10px_5px_rgba(0,0,0,0.1)] rounded-xl p-5">
                <div className="w-40">
                  <img src={post.logo} alt="" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <h1 className="font-semibold">{post.company}</h1>
                  <h1>{post.location}</h1>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <h2>{post.jobTitle}</h2>
                  <h2 className="text-gray-600 text-sm">{post.skills}</h2>
                </div>
                <div className="w-[35%] flex flex-col items-center">
                  <h3 className=" text-gray-600 ">{post.salery} </h3>
                  <h3 className="text-sm text-gray-600">per year</h3>
                </div>
                <h3 className="w-[20%] text-gray-600 text-sm">Full Time</h3>
                <div className="lg:w-[50%]">
                  <button className="w-full bg-orange hover:bg-orangeDark text-white px-10 py-2 text-md">
                    Apply Now
                  </button>
                </div>{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobAds;
