import React from "react";

const Features = () => {
  return (
    <div className="w-full flex justify-center bg-[#f2f3f7] pb-10">
      <div className="max-w-screen-xl w-full pt-10 px-8 xl:px-0">
        {/* <div className="flex justify-between">
        <h1>02 WHY CHOOSE US</h1>
        <button>FOLLOW US</button>
      </div> */}
        <div className="flex flex-col items-center text-center pt-10 lg:pt-20 gap-8">
          <h2 className="text-yellow font-bold uppercase text-lg">
            LEARN AND GROW
          </h2>
          <h1 className="text-4xl font-bold lg:text-6xl text-darkGray">
            Our Amenities
          </h1>
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
          </div>
          <p className=" text-textGray max-w-lg">
            A 2007 survey showed that many employees worry about feeling
            isolated and losing human interaction if they were to telecommute.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
