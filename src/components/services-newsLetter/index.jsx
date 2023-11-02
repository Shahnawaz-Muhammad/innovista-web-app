import React from "react";
import { Link } from "react-router-dom";

const NewsLetter = () => {
  return (
    <div
      className={`w-full z-20 flex justify-center text-bgLight mx-auto px-4 md:px-8 xl:px-4 py-10 md:py-20 bg-yellow`}
    >
      <div className="max-w-screen-xl w-full">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6">
          <h1 className="text-center md:text-start text-4xl font-bold text-white">Create Something Exciting With Us</h1>
          <Link to="/contact" className="text-lg px-6 py-3 bg-darkGray text-white ">Contact Us Right Now</Link>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
