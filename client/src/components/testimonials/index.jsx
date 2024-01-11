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
      "Working at Innovista IT-Parks has been a game-changer for me, making my life both easier and more thrilling. The chance to connect with this incredible group of individuals has allowed me to grow professionally and personally.",
    name: "Hammad Azhar",
    designation: "Freelancer",
  },
  {
    id: 2,
    description:
      "My time at Innovista IT-Parks has been nothing short of transformational. It has brought ease and excitement to my life. Being a part of this outstanding community has enabled me to nurture both my career and social abilities.",
    name: "Maimoon Khan",
    designation: "Freelancer",
  },
  {
    id: 3,
    description:
      "Life at Innovista IT-Parks is a true blessing, simplifying my daily routine and infusing excitement into it. I'm grateful for the chance to work alongside these remarkable people, which has been instrumental in boosting my professional growth and social aptitude.",
    name: "Adnan Malik",
    designation: "Freelancer",
  },
];

const Testimonials = () => {
  return (
    <div className=" max-w-full  bg-transparent  px-0 py-10 flex justify-center ">
      <div className=" relative w-full h-full flex justify-center bg-orange max-w-screen-xl ">
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
          speed={1800}
          color="black"
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {TestimonialsData.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="flex  items-center flex-col py-40 ">
                     
                          <div className=" text-xl md:text-2xl font-normal  text-white flex flex-col gap-4  text-center px-5 md:px-0 max-w-screen-md">
                            <h2 className="text-center -">{item.description}</h2>
                          <p className="text-3xl text-white font-semibold uppercase">
                            {item.name}
                          </p>
                          <p className=" text-lg font-semibold uppercase text-gray-300">
                            {item.designation}
                          </p>
                          </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="max-w-full flex justify-between absolute top-1/2 -translate-y-1/2 left-4 md:left-10 lg:left-20 custom-prev-button bg-secondary opacity-40 hover:opacity-100 transition-all duration-300 rounded-full z-10">
          <button className="custom-button-style text-gray-500 transition-all duration-500 hover:bg-orangeDarkbg-orange rounded-full">
            <BiSolidChevronLeft className="text-4xl" />
          </button>
        </div>
        <div className="max-w-full flex justify-between absolute top-1/2 -translate-y-1/2 right-4 md:right-10 lg:right-20 custom-next-button bg-secondary opacity-40 hover:opacity-100 transition-all duration-300 rounded-full z-10">
          <button className="custom-button-style text-gray-500 transition-all duration-500 hover:bg-orangeDarkbg-orange rounded-full">
            <BiSolidChevronRight className="text-4xl" />
          </button>
        </div>
        <div className="w-full h-full absolute top-0 left-0 p-40 md:p-28">
            <BiSolidQuoteRight className="w-full h-full text-orangeDark"/>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
