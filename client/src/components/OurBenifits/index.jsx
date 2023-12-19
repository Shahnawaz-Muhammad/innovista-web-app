import React from "react";
import images from "../../assets/images/utils/Images";
import { Link } from "react-router-dom";
export default function OurBenefits() {
  return (
    <div className="w-full flex justify-center pb-10 bg-bgGray">
      <div className="max-w-screen-xl w-full pt-10 px-8 xl:px-0 ">
        {/* <div className="flex justify-between">
          <h1 className="text-[#bdc1ca]">05 OUR BENEFITS</h1>
          <button className="text-[#bdc1ca]">FOLLOW US</button>
        </div> */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-20  pt-10 lg:pt-28  pb-4">
          <div className="  w-full md:w-1/2 ">
            <img
              src={images.imageBenifits}
              alt=" Description"
              className="min-h-full h-96 md:h-full object-cover w-full"
            />
          </div>

          <div className="w-full md:w-1/2 ">
            <h2 className="text-orange font-bold uppercase text-lg">
              BENEFITS
            </h2>
            <h1 className="text-2xl lg:text-5xl font-bold pt-6 text-darkGray">
              Perks of
              <br /> Your Startup in Our
              <br /> Co-working Space
            </h1>
            <p className="text-justify pt-6 lg:pt-10 px-2 text-textGray">
              We're thrilled with the vibrant community we've cultivated at our
              center! Here, you can engage with a wide array of talented
              professionals from diverse fields such as design, photography,
              engineering, and beyond. Find out how you can become a part of our
              community today
            </p>
            <div className=" h-[1px] bg-lightGray mt-8 mx-2"></div>
            <h1 className="pt-8 text-textGray">
              <span className="font-bold mr-2 text-darkGray text-2xl">1</span>{" "}
              Actual office space that promotes productivity
            </h1>
            <div className=" h-[1px] bg-lightGray mt-6 mx-2 lg:mt-10"></div>
            <h1 className="pt-10 text-textGray">
              <span className="font-bold mr-2 text-darkGray text-2xl">2</span>{" "}
              Meaningful connections with your team
            </h1>
            <div className=" h-[1px] bg-lightGray mt-6 mx-2 lg:mt-10"></div>
            <h1 className="pt-10 text-textGray">
              <span className="font-bold mr-2 text-darkGray text-2xl">3</span>{" "}
              Increased productivity to get some work done
            </h1>
            <div className=" h-[1px] bg-lightGray mt-6 mx-2 lg:mt-10"></div>
            <h1 className="pt-10 text-textGray">
              <span className="font-bold mr-2 text-darkGray text-2xl">4</span>{" "}
              Comfy accommodations and comfortable couches
            </h1>
            <div className=" h-[1px] bg-lightGray my-8 mx-2 lg:my-10"></div>
            <Link
              to="/services"
              className="px-10 py-4 bg-orange hover:bg-orangeDark mt-8 lg:mt-20 text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
