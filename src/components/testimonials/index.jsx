import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import {
  BiSolidChevronLeft,
  BiSolidChevronRight,
  BiSolidQuoteRight  // BiSupport,
} from "react-icons/bi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialsData = [
  {
    id: 1,
    description:
      "Working at WotaHub has made my life so much more easy and exciting! I love how you can join the amazing group of people and feel free to work on your career and social skills.",
    name: "Henry Jacobs",
    designation: "Freelancer",
  },
  {
    id: 2,
    description:
      "It’s a comfortable place with welcoming environment and all the utilities that are important in a facility like this. Thank you for the opportunity to work with you guys!",
    name: "Sandy Scooper",
    designation: "Freelancer",
  },
  {
    id: 3,
    description:
      "I never realized how quickly WotaHub would increase my productivity, create additional synergies & not limit any of my creative flow. We have had all positive experiences!",
    name: "Mike Peterson",
    designation: "Freelancer",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-bgGray max-w-full  bg-transparent  px-0 py-10 flex justify-center ">
      <div className="relative w-full h-full flex justify-center bg-[#4e3bc8] max-w-screen-xl ">
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          navigation={{
            clickable: true,
            prevEl: ".custom-prev-button",
            nextEl: ".custom-next-button",
          }}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
          }}
          loop={true}
          speed={1000}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {TestimonialsData.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="flex justify-center items-center flex-col py-40">
                  <div className="w-full max-h-screen relative">
                    <div className=" z-50 flex items-center justify-center w-full h-full ">
                      <div className="w-full  ">
                        <div className="w-full  flex flex-col items-center gap-6 mx-auto px-10 md:px-20 xl:px-4 ">
                          <div className="text-xl md:text-4xl font-bold capitalize text-white flex flex-col gap-4  text-center px-5 md:px-0 max-w-screen-md">
                            <h2 className="text-center">{item.description}</h2>
                          </div>
                          <p className="text-lg text-white font-semibold uppercase">
                            {item.name},{" "}
                            <span className="text-gray-400">
                              {item.designation}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="max-w-full flex justify-between absolute top-1/2 -translate-y-1/2 left-4 md:left-10 lg:left-20 custom-prev-button bg-secondary opacity-40 hover:opacity-100 transition-all duration-300 rounded-full z-50">
          <button className="custom-button-style text-gray-200 transition-all duration-500 bg-gray-500 hover:bg-gray-500 rounded-full">
            <BiSolidChevronLeft className="text-4xl" />
          </button>
        </div>
        <div className="max-w-full flex justify-between absolute top-1/2 -translate-y-1/2 right-4 md:right-10 lg:right-20 custom-next-button bg-secondary opacity-40 hover:opacity-100 transition-all duration-300 rounded-full z-50">
          <button className="custom-button-style text-gray-200 transition-all duration-500 bg-gray-500 hover:bg-gray-500 rounded-full">
            <BiSolidChevronRight className="text-4xl" />
          </button>
        </div>
        <div className="w-full h-full absolute top-0 left-0 p-40 md:p-28">
            <BiSolidQuoteRight className="w-full h-full text-[#4232ae]"/>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
