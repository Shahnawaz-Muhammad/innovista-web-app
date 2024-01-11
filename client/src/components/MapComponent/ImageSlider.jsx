import React from "react";
import Islamabad from "../../assets/GalleryPics/islamabad1.jpg";
import Lahore from "../../assets/GalleryPics/lahore.jpg";
import Peshawar from "../../assets/GalleryPics/peshawar-2.jpg";
import Bahawalpur from "../../assets/GalleryPics/bahawalpur.jpg";
import Quetta from "../../assets/GalleryPics/quetta.jpg";
import Karachi from "../../assets/GalleryPics/karachi.jpg";
import Multan from "../../assets/GalleryPics/multan.jpg";
import Gujranwala from "../../assets/GalleryPics/gujranwala.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "swiper/css/pagination";
import "swiper/css/scrollbar";

function ImageSlider() {
  const images = [
    { url: Islamabad, name: "Islamabad Chapter" },
    { url: Gujranwala, name: "Gujranwala Chapter" },
    { url: Lahore, name: "Lahore Chapter" },
    { url: Multan, name: "Multan Chapter" },
    { url: Bahawalpur, name: "Bahawalpur Chapter" },
    { url: Peshawar, name: "Peshawar Chapter" },
    { url: Quetta, name: "Quetta Chapter" },
    { url: Karachi, name: "Karachi Chapter" },
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
      <div className="w-full md:w-4/5 mx-auto h-full relative my-5 ">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          loop={true}
          pagination={{
            clickable: true, // Enable clickable pagination
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper "
        >
          {" "}
          {images.map((image, index) => (
            <SwiperSlide>
              <div className="bg-transparent h-[350px] flex flex-col  justify-end">

              <img
                src={image.url}
                alt={`Slide ${index}`}
                className="w-full h-80 object-cover"
              />
              <div className="absolute  font-bold bottom-4 left-4 right-4 bg-black text-white p-1 md:p-4 opacity-75 text-center">
                {image.name}
              </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default ImageSlider;
