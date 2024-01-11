import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";

const FrequentlyAskedQuestions = () => {
  const faqList = [
    {
      id: 1,
      title: "What are your hours?  ",
      description:
        "We are open from 9:00 AM in the Morning till 2:00 AM over the Night.",
    },
    {
      id: 2,
      title: "Are there any commitments?",
      description:
        "We try our best to fulfill your commitments.",
    },
    {
      id: 3,
      title: "Do you allow pets?",
      description:
        "Currently, Pets are not allowed.",
    },
  ];

  const faqList2 = [
    {
      id: 4,
      title: "Is internet included?",
      description:
        "Yes, Internet is included.",
    },
    {
      id: 5,
      title: "What about your other locations?",
      description:
        `We had 8 Chapters as mentioned above in "Our Chapters" and location also mentioned in map as well`,
    },
    {
      id: 6,
      title: "How do I get started?",
      description:
        "Contact us, we will resolve your queries.",
    },
  ];

  const [expandedFAQIndex, setExpandedFAQIndex] = useState(null);
  return (
    <div
      className={`w-full z-20 flex justify-center py-20 text-bgLight mx-auto px-4 md:px-8 xl:px-4 bg-bgGray`}
    >
      <div className="max-w-screen-xl w-full">
        <div className="w-full flex flex-col items-center gap-8 justify-center ">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
            Frequently Asked Questions
          </h1>

          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-orange rounded-full"></div>
            <div className="w-2 h-2 bg-orange rounded-full"></div>
            <div className="w-2 h-2 bg-orange rounded-full"></div>
          </div>
          <div className="w-full flex flex-col md:flex-row md:gap-20">
            <div className="w-full flex flex-col md:py-3">
              {faqList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${index === 0 ? "border-t-2" : "border-t-0"} ${
                      expandedFAQIndex === item.id
                        ? "gap-5 transition-all duration-300"
                        : "gap-0 transition-all duration-300"
                    } w-full py-5 border-b-2 flex flex-col gap-5 px-4`}
                  >
                    <div
                      className="w-full flex items-center justify-between cursor-pointer "
                      onClick={() =>
                        setExpandedFAQIndex(
                          expandedFAQIndex === item.id ? null : item.id
                        )
                      }
                    >
                      <h2
                        className={`text-lg font-semibold ${
                          expandedFAQIndex === item.id
                            ? "text-orange"
                            : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h2>
                      <div
                        className={`${
                          expandedFAQIndex === item.id
                            ? "bg-orange"
                            : "bg-gray-300"
                        } p-1 transform transition-transform duration-300 ease-in-out`}
                      >
                        {expandedFAQIndex === item.id ? (
                          <BiMinus className="text-xl " />
                        ) : (
                          <BiPlus className="text-xl" />
                        )}
                      </div>
                    </div>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedFAQIndex === item.id ? "auto" : 0,
                        opacity: expandedFAQIndex === item.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <p className="text-lg font-light text-gray-500 font-roboto">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <div className="w-full flex flex-col md:py-3">
              {faqList2.map((item, index) => {
                return (
                  <div
                  key={index}
                  className={`${index === 0 ? "md:border-t-2" : "border-t-0"} ${
                    expandedFAQIndex === item.id
                      ? "gap-5 transition-all duration-300"
                      : "gap-0 transition-all duration-300"
                  } w-full py-5 border-b-2 flex flex-col gap-5 px-4`}
                >
                  <div
                    className="w-full flex items-center justify-between cursor-pointer "
                    onClick={() =>
                      setExpandedFAQIndex(
                        expandedFAQIndex === item.id ? null : item.id
                      )
                    }
                  >
                    <h2
                      className={`text-lg font-semibold ${
                        expandedFAQIndex === item.id
                          ? "text-orange"
                          : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </h2>
                    <div
                      className={`${
                        expandedFAQIndex === item.id
                          ? "bg-orangeDark"
                          : "bg-gray-300"
                      } p-1 transform transition-transform duration-300 ease-in-out`}
                    >
                      {expandedFAQIndex === item.id ? (
                        <BiMinus className="text-xl " />
                      ) : (
                        <BiPlus className="text-xl" />
                      )}
                    </div>
                  </div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedFAQIndex === item.id ? "auto" : 0,
                      opacity: expandedFAQIndex === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className="text-lg font-light text-gray-500">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
