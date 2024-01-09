import React from "react";
import Islamabad from "../../assets/GalleryPics/islamabad1.jpg";
import Lahore from "../../assets/GalleryPics/lahore.jpg";
import Peshawar from "../../assets/GalleryPics/peshawar-2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "swiper/css/pagination";
import "swiper/css/scrollbar";

function ImageSlider() {
  const images = [
    { url: Islamabad, name: "Islamabad Chapter" },
    { url: Lahore, name: "Lahore Chapter" },
    { url: Peshawar, name: "Peshawar Chapter" },
    { url: Islamabad, name: "Islamabad Chapter" },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold lg:text-6xl text-darkGray text-center pt-16">
        Our Chapters
      </h1>
      <div className="flex gap-3 items-center justify-center py-8">
        <div className="w-2 h-2 bg-orange rounded-full"></div>
        <div className="w-2 h-2 bg-orange rounded-full"></div>
        <div className="w-2 h-2 bg-orange rounded-full"></div>
      </div>

      <div className="flex">
        <div className="w-full"></div>
      </div>
      <div className="w-4/5 mx-auto h-full">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {" "}
          {images.map((image, index) => (
            <SwiperSlide>
              <img
                src={image.url}
                alt={`Slide ${index}`}
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black text-white p-4 opacity-75 text-center">
                {image.name}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default ImageSlider;
