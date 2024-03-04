import React from "react";
import conferenceRoomImg from "../../assets/images/conference-room.jpeg";
import privateOfficeImg from "../../assets/images/private-office.jpeg";
import dedicatedDeskImg from "../../assets/images/dedicated-desk.jpeg";
import hotDeskImg from "../../assets/images/hot-desk.jpeg";
import { Link } from "react-router-dom";

const Features = () => {
  const Data = [
    {
      to: "/services/conference-room",
      imgSrc: conferenceRoomImg,
      title: "Conference Room",
      price: "Rs 5000/day",
      description: "All conference rooms are modern, well-equipped, and perfectly illuminated",
    },
    {
      to: "/services/private-office",
      imgSrc: privateOfficeImg,
      title: "Private Office",
      price: "Rs 100000/month",
      description: "All private offices are modern, well-equipped, and perfectly illuminated",
    },
    {
      to: "/services/dedicated-desk",
      imgSrc: dedicatedDeskImg,
      title: "Dedicated Desk",
      price: "Rs 20000/month",
      description: "All dedicated desks are modern, well-equipped, and perfectly illuminated",
    },
    {
      to: "/services/hot-desk",
      imgSrc: hotDeskImg,
      title: "Hot Desk",
      price: "Rs 3000/day",
      description: "All hot desks are modern, well-equipped, and perfectly illuminated",
    },
  ];

  return (
    <div className="w-full flex justify-center bg-[#f2f3f7] pb-10">
      <div className="max-w-screen-xl w-full pt-10 px-8 xl:px-0">
        <div className="flex flex-col items-center pt-10 lg:pt-20 gap-8">
          <h2 className="text-orange font-bold uppercase text-lg">LEARN AND GROW</h2>
          <h1 className="text-4xl font-bold lg:text-6xl text-darkGray">What We Offer</h1>
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-orange rounded-full"></div>
            <div className="w-2 h-2 bg-orange rounded-full"></div>
            <div className="w-2 h-2 bg-orange rounded-full"></div>
          </div>
          <p className="text-textGray max-w-screen-lg text-center">
            Modest yet highly practical and comfortable working zones, chill zones, coffee shops and diners at your full disposal during your stay with us, as well as fast Internet and office supplies. Invite your teammates!
          </p>
        </div>

        <div className="w-full flex justify-center p-10 sm:p-0 pt-20">
          <div className="max-w-screen-lg w-full grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-0 ">
            {Data.map((feature, index) => (
              <Link key={index} to={feature.to} className={`w-full  sm:w-[90%] md:w-[80%] flex flex-col gap-4 ${index % 2 === 1 ? "justify-self-end sm:mt-20" : ""}  hover:shadow-2xl hover:bg-gray-200 hover:scale-105 hover:transform  transition-all duration-300 `}>
                <img src={feature.imgSrc} alt="" className="w-full bg-cover  " />
                <div className="w-full flex flex-col md:flex-row items-center justify-between">
                  <h1 className="text-xl sm:text-lg md:text-2xl font-bold text-darkGray">{feature.title}</h1>
                  <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-orange">
                    {feature.price}
                  </h2>
                </div>
                <p className="text-textGray text-center md:text-start">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
