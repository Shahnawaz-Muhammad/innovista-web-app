import React from "react";

export default function LearnMore() {
  return (
    <div className="w-full flex justify-center bg-bgGray">
    <div className="max-w-screen-xl w-full py-20 px-8 xl:px-0">
      {/* <div className="flex justify-between text-sm">
        <h1>01 WELCOME TO WORK HUB</h1>
        <button>FOLLOW US</button>
      </div> */}
      <div className="flex flex-col items-center text-center pt-10 lg:pt-28 ">
        <h1>LEARN AND GROW</h1>
        <h1 className="pt-6 text-4xl font-bold lg:text-7xl text-darkGray">Sustainable Coworking <br />in Your Town</h1>
        <div className="flex justify-center pt-10">
          <div className="w-2 h-2  rounded-full bg-green-500"></div>
          <div className="w-2 h-2 ml-4 rounded-full bg-green-500"></div>
          <div className="w-2 h-2  ml-4 rounded-full bg-green-500"></div>
        </div>
        <p className="pt-10  max-w-lg text-textGray">By saying that our coworking space is sustainable and comfy we confirm that you will get 100% satisfaction from working here and making the best out of this experience.</p>
        <button className="px-10 py-4 bg-red-400 mt-10 lg:mt-14">LearnMore</button>
      </div>
      </div>
    </div>
  );
}
