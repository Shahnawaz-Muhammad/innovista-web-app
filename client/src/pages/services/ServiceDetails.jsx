import React from "react";
import { useParams } from "react-router-dom";

import conferenceRoomImg from "../../assets/images/conference-room.jpeg";
import privateOfficeImg from "../../assets/images/private-office.jpeg";
import dedicatedDeskImg from "../../assets/images/dedicated-desk.jpeg";
import hotDeskImg from "../../assets/images/hot-desk.jpeg";

const ServiceDetails = () => {
  const { slug } = useParams();

  // Fetch service details based on the slug or use a switch/case to display different details
  let serviceDetails;

  switch (slug) {
    case "conference-room":
      serviceDetails = {
        title: "Conference Room",
        img: conferenceRoomImg,
        description:
          "Our conference rooms are meticulously designed to provide a sophisticated and productive environment for your important meetings and presentations. With a capacity to accommodate up to 10 people, these rooms are spacious yet intimate, fostering collaboration and effective communication. The centerpiece of each room is the cutting-edge audio-visual technology that ensures seamless presentations and high-quality video conferencing. The ergonomic seating arrangements prioritize comfort, allowing participants to engage in lengthy discussions without distraction. Complimentary high-speed Wi-Fi is available to ensure a smooth and efficient online experience. Our professional staff is dedicated to making your meeting a success, offering technical support and assistance as needed. Beyond the technological aspects, we understand the importance of aesthetics in creating an inspiring atmosphere. The décor is carefully curated to blend professionalism with a touch of modern elegance. Natural light floods the room, creating a welcoming and energizing ambiance. For added convenience, we offer catering services and access to a fully equipped kitchen for refreshments. Whether you're hosting a client presentation, team meeting, or strategy session, our conference rooms provide the ideal backdrop for your business endeavors. Elevate your meetings with our thoughtfully designed spaces and exceptional services.",
      };
      break;
    case "private-office":
      serviceDetails = {
        title: "Private Office",
        img: privateOfficeImg,
        description:
          "Step into a world of productivity with our private offices. Tailored for individual use, each office is fully furnished and designed to provide a quiet, focused workspace. Enjoy the luxury of a dedicated office environment, allowing you to concentrate on your tasks without distractions. Our private offices offer a perfect blend of comfort and functionality, creating an ideal setting for professionals seeking a personalized workspace tailored to their needs.",
      };
      break;
    case "dedicated-desk":
      serviceDetails = {
        title: "Dedicated Desk",
        img: dedicatedDeskImg,
        description:
          "Embrace the benefits of a dedicated desk in our shared workspace. With assigned seating, you'll have a consistent spot to call your own within a collaborative and vibrant office atmosphere. Enjoy the advantages of working alongside like-minded individuals while maintaining the comfort and stability of your own dedicated workspace. It's a perfect solution for those who value a sense of ownership in a communal setting.",
      };
      break;
    case "hot-desk":
      serviceDetails = {
        title: "Hot Desk",
        img: hotDeskImg,
        description:
          "Dive into a flexible work experience with our hot desks. Offering non-assigned seating in a dynamic shared environment, hot desks are ideal for individuals seeking variety and adaptability. Choose any available desk each day, fostering a collaborative atmosphere that encourages networking and interaction. Benefit from a workspace that evolves with your needs, providing the freedom to move and explore different areas as you navigate your daily tasks. Hot desks offer the ultimate flexibility for professionals on the go.",
      };
      break;
    default:
      serviceDetails = {
        title: "Service Not Found",
        // You can also redirect or handle other cases here
      };
  }
  return (
    <>
      <div className=" max-w-full h-full bg-transparent  px-0 ">
        <div className="relative w-full h-full">
          <div className="flex justify-center items-center flex-col ">
            <div className="w-full max-h-screen relative">
              <img
                className="w-full h-[25rem] object-cover z-30 "
                src={serviceDetails.img}
                alt=""
              />
              <div className="absolute inset-0 bg-black bg-blend-difference opacity-50 z-10"></div>

              <div className="absolute top-0 z-10 flex items-center justify-center w-full h-full ">
                <div className="w-full max-w-screen-xl">
                  <div className="w-full  flex flex-col  gap-2 lg:gap-3 mx-auto px-4 md:px-8 xl:px-4 ">
                    <div className="text-4xl md:text-5xl  font-bold capitalize text-white flex flex-col gap-4  text-center md:text-start px-5 md:px-0 max-w-lg lg:max-w-2xl">
                      <h2>{serviceDetails.title}</h2>
                    </div>
                    <p className="text-orange uppercase">
                      Services /{" "}
                      <span className="text-white">
                        {serviceDetails.title}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center bg-[#f2f3f7] pb-10">
        <div className="max-w-screen-xl w-full pt-10 px-8 xl:px-0">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold text-gray-600">
              Conference Room
            </h1>

            <p className="text-textGray text-lg">
              {serviceDetails.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetails;
