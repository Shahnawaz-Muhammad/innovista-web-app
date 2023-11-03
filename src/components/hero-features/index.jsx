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
      <div className=" col-span-3 lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white  cursor-pointer">
        <div
          className="relative w-full h-full flex flex-col gap-4 items-center py-10"
          onMouseEnter={() => setShowFeature1(true)}
          onMouseLeave={() => setShowFeature1(false)}
        >
          <SiFreelancer className="text-5xl" />
          <h1 className="text-md uppercase">Freelance</h1>
          <motion.div
            initial={{ y: -100, opacity: 0, zIndex: -1 }}
            animate={
              showFeature1
                ? { y: 0, opacity: 1, zIndex: 1 }
                : { y: -100, opacity: 0, zIndex: -1 }
            }
            transition={{ duration: 0.3 }}
            className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white px-6 py-4"
          >
            {/* <h2 className="text-xl font-semibold ">hello</h2> */}
            <p className="text-sm font-medium leading-5 text-justify">
            Are you in search of the perfect workspace to supercharge your productivity and ignite your innovative spark? Your quest has come to an end. Join our community of like-minded individuals, network, and propel your freelance career to new heights.
            </p>
          </motion.div>
        </div>
      </div>
      <div className="relative col-span-3 lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white  cursor-pointer">
        <div
          className="relative w-full h-full flex flex-col gap-4 items-center py-10"
          onMouseEnter={() => setShowFeature2(true)}
          onMouseLeave={() => setShowFeature2(false)}
        >
          <GiTechnoHeart className="text-5xl" />
          <h1 className="text-md uppercase">Startup</h1>
          <motion.div
            initial={{ y: -100, opacity: 0, zIndex: -1 }}
            animate={
              showFeature2
                ? { y: 0, opacity: 1, zIndex: 1 }
                : { y: -100, opacity: 0, zIndex: -1 }
            }
            transition={{ duration: 0.3 }}
            className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white px-6 py-4"
          >
            {/* <h2 className="text-xl font-semibold ">hello</h2> */}
             <p className="text-sm font-medium leading-5 text-justify">
             Innovative startups, unite! Our platform paves the way to a thriving entrepreneurial ecosystem. Whether you're in need of budget-friendly shared desks or fully-equipped startup suites, we have the workspace that aligns with your team's growth.
            </p>
          </motion.div>
        </div>
      </div>
      <div className=" col-span-3 lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white  cursor-pointer">
        <div
          className="relative w-full h-full flex flex-col gap-4 items-center py-10"
          onMouseEnter={() => setShowFeature3(true)}
          onMouseLeave={() => setShowFeature3(false)}
        >
          <RiSecurePaymentLine className="text-5xl" />
          <h1 className="text-md uppercase">Investor</h1>
          <motion.div
            initial={{ y: -100, opacity: 0, zIndex: -1 }}
            animate={
              showFeature3
                ? { y: 0, opacity: 1, zIndex: 1 }
                : { y: -100, opacity: 0, zIndex: -1 }
            }
            transition={{ duration: 0.3 }}
            className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white px-6 py-4"
          >
            {/* <h2 className="text-xl font-semibold ">hello</h2> */}
             <p className="text-sm font-medium leading-5 text-justify">
             Investors, are you ready to seize the most promising opportunities? Our platform is your gateway to connecting with the upcoming industry leaders. Enjoy exclusive access to a wide range of startups and businesses actively searching for investment prospects.
            </p>
          </motion.div>
        </div>
      </div>

      <div className=" col-span-3 lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white  cursor-pointer">
        <div
          className="relative w-full h-full flex flex-col gap-4 items-center py-10"
          onMouseEnter={() => setShowFeature4(true)}
          onMouseLeave={() => setShowFeature4(false)}
        >
          <MdAddBusiness className="text-5xl" />
          <h1 className="text-md uppercase">Business</h1>
          <motion.div
            initial={{ y: -100, opacity: 0, zIndex: -1 }}
            animate={
              showFeature4
                ? { y: 0, opacity: 1, zIndex: 1 }
                : { y: -100, opacity: 0, zIndex: -1 }
            }
            transition={{ duration: 0.3 }}
            className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white px-6 py-4"
          >
            {/* <h2 className="text-xl font-semibold ">hello</h2> */}
             <p className="text-sm font-medium leading-5 text-justify">
             For business proprietors and managers, the quest for flexible and convenient office solutions ends here. Our platform provides an extensive array of professional workspaces thoughtfully designed to meet the unique demands of your business.
            </p>
          </motion.div>
        </div>
      </div>

      <div className=" col-span-full lg:col-span-1 w-full flex flex-col justify-center gap-3 items-center text-center border-r border-b lg:border-b-0 lg:border-r border-gray-400 text-white  cursor-pointer">
        <div
          className="relative w-full h-full flex flex-col gap-4 items-center py-10"
          onMouseEnter={() => setShowFeature5(true)}
          onMouseLeave={() => setShowFeature5(false)}
        >
          <MdOutlineRealEstateAgent className="text-5xl" />
          <h1 className="text-md uppercase">Agency</h1>
          <motion.div
            initial={{ y: -100, opacity: 0, zIndex: -1 }}
            animate={
              showFeature5
                ? { y: 0, opacity: 1, zIndex: 1 }
                : { y: -100, opacity: 0, zIndex: -1 }
            }
            transition={{ duration: 0.3 }}
            className="w-full h-full absolute top-0 bg-yellow flex flex-col justify-center items-center text-white px-6 py-4"
          >
            {/* <h2 className="text-xl font-semibold ">hello</h2> */}
             <p className="text-sm font-medium leading-5 text-justify">
             Are you an agency seeking a vibrant environment to meet your clients' ever-changing demands? Look no further! Our platform presents versatile workspaces meticulously crafted to address the creative and collaborative needs of your agency.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroFeatures;
