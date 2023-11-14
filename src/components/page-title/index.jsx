import React from "react";
import bgImg from "../../assets/images/header-bg.jpg";

const PageTitle = ({title}) => {
  return (
    <div className=" max-w-full h-full bg-transparent  px-0 ">
      <div className="relative w-full h-full">
        <div className="flex justify-center items-center flex-col ">
          <div className="w-full max-h-screen relative">
            <img
              className="w-full h-[25rem] object-cover  z-30"
              src={bgImg}
              alt=""
            />

            <div className="absolute top-0 z-10 flex items-center justify-center w-full h-full ">
              <div className="w-full max-w-screen-xl">
                <div className="w-full  flex flex-col  gap-2 lg:gap-3 mx-auto px-4 md:px-8 xl:px-4 ">
                  <div className="text-4xl md:text-5xl  font-bold capitalize text-white flex flex-col gap-4  text-center md:text-start px-5 md:px-0 max-w-lg lg:max-w-2xl">
                    <h2>{title}</h2>
                  </div>
                  <p className="text-orange uppercase">Home / <span className="text-white">{title} </span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
