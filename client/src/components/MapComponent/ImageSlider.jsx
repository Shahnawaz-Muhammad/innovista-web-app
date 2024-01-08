import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Islamabad from '../../assets/GalleryPics/islamabad1.jpg';
import Lahore from '../../assets/GalleryPics/lahore.jpg';
import Peshawar from '../../assets/GalleryPics/peshawar-2.jpg';

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { url: Islamabad, name: "Islamabad Chapter" },
    { url: Lahore, name: "Lahore Chapter" },
    { url: Peshawar, name: "Peshawar Chapter" }
    
  ];


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: false,
    beforeChange: (current, next) => setCurrentIndex(next),
  };
  const middleItem = images[Math.floor(images.length / 2)];
  console.log("Middle item data:", middleItem);
  return (
    <>
          <h1 className="text-4xl font-bold lg:text-6xl text-darkGray text-center pt-16">Our Chapters</h1>
      <div className="flex gap-3 items-center justify-center py-8">
        <div className="w-2 h-2 bg-orange rounded-full"></div>
        <div className="w-2 h-2 bg-orange rounded-full"></div>
        <div className="w-2 h-2 bg-orange rounded-full"></div>
      </div>

      <div className='flex'>
        <div className='w-full'>
     
        </div>
       
      </div>
    <div className="w-4/5 mx-auto h-full">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 p-4 relative overflow-hidden transition-transform duration-300 transform hover:scale-110">
            <img src={image.url} alt={`Slide ${index}`} className="w-full h-80 object-cover" />
            <div className="absolute bottom-4 left-4 right-4 bg-black text-white p-4 opacity-75 text-center">{image.name}</div>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
}

export default ImageSlider;