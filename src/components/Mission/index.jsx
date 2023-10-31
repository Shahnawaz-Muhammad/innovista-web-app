import React from "react";
import images from "../../assets/images/utils/Images";
export default function LearnMore() {
  return (
    <div className="w-full flex justify-center pb-10">
      <div className="max-w-screen-xl w-full pt-10 px-8 xl:px-0 ">
        <div className="flex justify-between">
          <h1 className="text-[#bdc1ca]">01 WHAT WE BELIEVE</h1>
          <button className="text-[#bdc1ca]">FOLLOW US</button>
        </div>
        <div className=" w-full  px-8 xl:px-0">
          <div className="flex flex-col items-center text-center pt-10 lg:pt-28 ">
            <h1 className="pt-6 text-4xl font-bold lg:text-7xl">Our Mission</h1>
            <div className="flex justify-center pt-10">
              <div className="w-[6px] h-[6px]  rounded-full bg-[#40e2df]"></div>
              <div className="w-[6px] h-[6px]  ml-4 rounded-full bg-[#40e2df]"></div>
              <div className="w-[6px] h-[6px]   ml-4 rounded-full bg-[#40e2df]"></div>
            </div>
            <p className="pt-10  max-w-lg">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo conaute irure dolor in reprehendeca
              consectetur
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 md:gap-20  pt-10 lg:pt-28 ">
          <div className=" h-96 w-full md:w-1/2 ">
            <img
              src={images.SocialCreatures}
              alt="Image Description"
              className="min-h-full h-96 md:h-full object-cover w-full"
            />
          </div>

          <div className="w-full md:w-1/2 ">
            <h1 className="text-[#40e2df] ">COMMUNITY</h1>
            <h1 className="text-2xl lg:text-5xl font-bold pt-6">
              Humans Are <br />
              Social Creatures
            </h1>
            <p className="text-justify pt-6 lg:pt-20 px-2 text-[#cdcdcd]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqualaboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
              inreprehende.
            </p>

            <h1 className="px-2 py-4  mt-8  lg:mt-10">READ MORE</h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-20  pt-10 lg:pt-28 ">
          <div className="w-full md:w-1/2 ">
            <h1 className="text-[#40e2df] ">COLLABORATION</h1>
            <h1 className="text-2xl lg:text-5xl font-bold pt-6">
              We believe That <br />
              Collaboration Breeds <br />
              Innovation
            </h1>
            <p className="text-justify pt-6 lg:pt-12 px-2 text-[#cdcdcd]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqualaboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
              inreprehende.
            </p>

            <h1 className="px-2 py-4  mt-8  lg:mt-6">READ MORE</h1>
          </div>
          <div className=" h-96 w-full md:w-1/2 ">
            <img
              src={images.COLLABORATION}
              alt="Image Description"
              className="min-h-full h-96 md:h-full object-cover w-full"
            />
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <button className="px-16 py-6 bg-[#3fe1dd] mt-10 lg:mt-14 text-white">
            Book A Tour
          </button>
        </div>
      </div>
    </div>
  );
}
