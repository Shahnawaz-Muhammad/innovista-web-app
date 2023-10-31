import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { BiMobile } from "react-icons/bi";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const Footer = () => {
  return (
    <div
      className={`w-full z-20 flex justify-center py-20 bg-[#3d3d3d] text-bgLight mx-auto px-4 md:px-8 xl:px-4`}
    >
      <div className="max-w-screen-xl w-full">
        <div className="w-full grid grid-cols-4 gap-8 lg:gap-0">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
            <h1 className="text-2xl lg:text-4xl font-semibold text-secondary max-w-full flex items-center italic text-yellow uppercase">
              DLabs
            </h1>
            <div className="flex flex-col gap-4 font-light">
              <div className="flex items-start gap-3 text-lightGray">
                <IoHomeOutline className="mt-1" />
                <div className="flex flex-col ">
                  <p>123, New Lenox </p>
                  <p> Chicago, IL 60606</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-lightGray">
                <TfiEmail />
                <p>support@dlabs.com</p>
              </div>
              <div className="flex items-center gap-3 text-lightGray">
                <BiMobile />
                <p>support@dlabs.com</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-8 text-lightGray">
            <h2 className="text-xl font-semibold text-white">Links</h2>
            <div className="flex flex-col gap-4 font-light">
              <p>About Us</p>
              <p>Services</p>
              <p>Privacy</p>
              <p>Terms & Conditions</p>
            </div>
          </div>
          <div className="lg:hidden flex w-full col-span-full h-[.1px] bg-lightGray"></div>
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-8 text-lightGray">
            <h2 className="text-xl font-semibold text-white">Navigate</h2>
            <div className="flex flex-col gap-4 font-light">
              <p>Pricing</p>
              <p>Features</p>
              <p>Contact Us</p>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-8 text-lightGray">
            <h2 className="text-xl font-semibold text-white">Subscribe</h2>
            <div className="flex flex-col gap-4 font-light">
              <p>
                Subscribe to our e-mail list and stay up-to-date with all our
                news.
              </p>
              <div>
                <div className="w-full relative h-full">
                  <input
                    type="email"
                    className="w-full py-4 pl-4 pr-14 text-black focus:outline-none"
                    placeholder="Your Email"
                  />
                  <HiOutlineArrowLongRight className="absolute right-3 top-3 text-gray-600 text-4xl hover:right-2 transition-all ease-in-out duration-300 cursor-pointer" />
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                  <span className="ml-3">
                    I have read and agree to the terms & conditions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
