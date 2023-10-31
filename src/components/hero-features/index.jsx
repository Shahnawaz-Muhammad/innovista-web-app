import React, { useState } from "react";
import { SiFreelancer } from "react-icons/si";
import { GiTechnoHeart } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdAddBusiness, MdOutlineRealEstateAgent } from "react-icons/md";
import { motion } from "framer-motion";

const HeroFeatures = () => {
  const [showFeature1, setShowFeature1] = useState(false);
  const [showFeature2, setShowFeature2] = useState(false);
  const [showFeature3, setShowFeature3] = useState(false);
  const [showFeature4, setShowFeature4] = useState(false);
  const [showFeature5, setShowFeature5] = useState(false);
  return (
    <div className="grid grid-cols-6 lg:grid-cols-5  bg-yellowDark">
      <div
        className=" col-span-3 lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white uppercase cursor-pointer"
        
      >
        <div className="relative w-full h-full flex flex-col gap-4 items-center py-10"
        onMouseEnter={() => setShowFeature1(true)}
        onMouseLeave={() => setShowFeature1(false)}>
          <SiFreelancer className="text-5xl" />
          <h1 className="text-md">Freelance</h1>
        <motion.div
          initial={{ y: -100, opacity: 0, zIndex: -1 }}
          animate={
            showFeature1
              ? { y: 0, opacity: 1, zIndex: 1 }
              : { y: -100, opacity: 0, zIndex: -1 }
          }
          transition={{ duration: 0.3 }}
          className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white"
        >
          <h2>hello</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
            adipisci reiciendis pariatur.
          </p>
        </motion.div>
        </div>
      </div>
      <div className="relative col-span-3 lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white uppercase cursor-pointer">
        <div
          className="relative w-full h-full flex flex-col gap-4 items-center py-10"
          onMouseEnter={() => setShowFeature2(true)}
          onMouseLeave={() => setShowFeature2(false)}
        >
          <GiTechnoHeart className="text-5xl" />
          <h1 className="text-md">Startup</h1>
          <motion.div
            initial={{ y: -100, opacity: 0, zIndex: -1 }}
            animate={
              showFeature2
                ? { y: 0, opacity: 1, zIndex: 1 }
                : { y: -100, opacity: 0, zIndex: -1 }
            }
            transition={{ duration: 0.3 }}
            className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white"
          >
            <h2>hello</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates adipisci reiciendis pariatur.
            </p>
          </motion.div>
        </div>
      </div>
      <div className=" col-span-3 lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white uppercase cursor-pointer">
        <div
          className="relative w-full h-full flex flex-col gap-4 items-center py-10"
          onMouseEnter={() => setShowFeature3(true)}
          onMouseLeave={() => setShowFeature3(false)}
        >
          <RiSecurePaymentLine className="text-5xl" />
          <h1 className="text-md">Investor</h1>
          <motion.div
            initial={{ y: -100, opacity: 0, zIndex: -1 }}
            animate={
              showFeature3
                ? { y: 0, opacity: 1, zIndex: 1 }
                : { y: -100, opacity: 0, zIndex: -1 }
            }
            transition={{ duration: 0.3 }}
            className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white"
          >
            <h2>hello</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates adipisci reiciendis pariatur.
            </p>
          </motion.div>
        </div>
      </div>

      <div className=" col-span-3 lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white uppercase cursor-pointer">
        <div
          className="relative w-full h-full flex flex-col gap-4 items-center py-10"
          onMouseEnter={() => setShowFeature4(true)}
          onMouseLeave={() => setShowFeature4(false)}
        >
          <MdAddBusiness className="text-5xl" />
          <h1 className="text-md">Business</h1>
          <motion.div
            initial={{ y: -100, opacity: 0, zIndex: -1 }}
            animate={
              showFeature4
                ? { y: 0, opacity: 1, zIndex: 1 }
                : { y: -100, opacity: 0, zIndex: -1 }
            }
            transition={{ duration: 0.3 }}
            className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white"
          >
            <h2>hello</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates adipisci reiciendis pariatur.
            </p>
          </motion.div>
        </div>
      </div>

      <div className=" col-span-full lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white uppercase cursor-pointer">
        <div
          className="relative w-full h-full flex flex-col gap-4 items-center py-10"
          onMouseEnter={() => setShowFeature5(true)}
          onMouseLeave={() => setShowFeature5(false)}
        >
          <MdOutlineRealEstateAgent className="text-5xl" />
          <h1 className="text-md">Agency</h1>
          <motion.div
            initial={{ y: -100, opacity: 0, zIndex: -1 }}
            animate={
              showFeature5
                ? { y: 0, opacity: 1, zIndex: 1 }
                : { y: -100, opacity: 0, zIndex: -1 }
            }
            transition={{ duration: 0.3 }}
            className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white"
          >
            <h2>hello</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptates adipisci reiciendis pariatur.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroFeatures;
