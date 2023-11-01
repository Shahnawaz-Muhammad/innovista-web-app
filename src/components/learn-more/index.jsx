import React from "react";

export default function LearnMore() {
  return (
    <div className="w-full flex justify-center bg-bgGray">
      <div className="max-w-screen-xl w-full py-20 px-8 xl:px-0">
        {/* <div className="flex justify-between text-sm">
        <h1>01 WELCOME TO WORK HUB</h1>
        <button>FOLLOW US</button>
      </div> */}
        <div className="flex flex-col items-center text-center pt-10 lg:pt-10 gap-8">
          <h2 className="text-yellow font-bold uppercase text-lg">
            LEARN AND GROW
          </h2>
          <h1 className="text-4xl font-bold lg:text-7xl text-darkGray">
            Sustainable Coworking <br />
            in Your Town
          </h1>
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
          </div>
          <p className="max-w-lg text-textGray">
            By saying that our coworking space is sustainable and comfy we
            confirm that you will get 100% satisfaction from working here and
            making the best out of this experience.
          </p>
          <button className="px-10 py-4 bg-yellow mt-8  lg:mt-12 text-white">
              Learn More
            </button>
        </div>
      </div>
    </div>
  );
}
