import React from "react";
import conferenceRoomImg from "../../assets/images/conference-room.jpeg";
import privateOfficeImg from "../../assets/images/private-office.jpeg";
import dedicatedDeskImg from "../../assets/images/dedicated-desk.jpeg";
import hotDeskImg from "../../assets/images/hot-desk.jpeg";

const Features = () => {
  return (
    <div className="w-full flex justify-center bg-[#f2f3f7] pb-10">
      <div className="max-w-screen-xl w-full pt-10 px-8 xl:px-0">
        {/* <div className="flex justify-between">
        <h1>02 WHY CHOOSE US</h1>
        <button>FOLLOW US</button>
      </div> */}
        <div className="flex flex-col items-center  pt-10 lg:pt-20 gap-8">
          <h2 className="text-orange font-bold uppercase text-lg">
            LEARN AND GROW
          </h2>
          <h1 className="text-4xl font-bold lg:text-6xl text-darkGray">
            What We Offer
          </h1>
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2bg-orange rounded-full"></div>
            <div className="w-2 h-2bg-orange rounded-full"></div>
            <div className="w-2 h-2bg-orange rounded-full"></div>
          </div>
          <p className=" text-textGray max-w-screen-lg text-center">
            Modest yet highly practical and comfortable working zones, chill
            zones, coffee shops and diners at you full disposal during your stay
            with us, as well and fast Internet and office supplies. Invite your
            teammates!
          </p>
        </div>

        <div className="w-full flex justify-center p-10 sm:p-0 pt-20">
          <div className="max-w-screen-lg w-full grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-0">
            <div className="w-full sm:w-[90%] md:w-[80%] flex flex-col gap-4 ">
              <img src={conferenceRoomImg} alt="" className="w-full bg-cover" />
              <div className="w-full flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-xl sm:text-lg md:text-2xl font-bold text-darkGray">
                  Conference Room
                </h1>
                <h2 className="text-xl sm:text-xl md:text-3xl font-bold text-orange">
                  $40
                  <span className="text-lg font-normal text-textGray">
                    /hour
                  </span>
                </h2>
              </div>
              <p className="text-textGray text-center md:text-start">
                All conference rooms are modern, well equipped and perfectly
                illuminated
              </p>
            </div>
            <div className="w-full sm:w-[90%] md:w-[80%] sm:mt-20 flex flex-col gap-4 justify-self-end">
              <img src={privateOfficeImg} alt="" />
              <div className="w-full flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-xl sm:text-lg md:text-2xl font-bold text-darkGray">
                  Private Office
                </h1>
                <h2 className="text-xl sm:text-xl md:text-3xl font-bold text-orange">
                  $399
                  <span className="text-lg font-normal text-textGray">
                    /month
                  </span>
                </h2>
              </div>
              <p className="text-textGray text-center md:text-start">
                All conference rooms are modern, well equipped and perfectly
                illuminated
              </p>
            </div>
            <div className="w-full sm:w-[90%] md:w-[80%]  flex flex-col gap-4">
              <img src={dedicatedDeskImg} alt="" className="w-full bg-cover" />
              <div className="w-full flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-xl sm:text-lg md:text-2xl font-bold text-darkGray">
                  Dedicated Desk
                </h1>
                <h2 className="text-xl sm:text-xl md:text-3xl font-bold text-orange">
                  $299
                  <span className="text-lg font-normal text-textGray">
                    /month
                  </span>
                </h2>
              </div>
              <p className="text-textGray text-center md:text-start">
                All conference rooms are modern, well equipped and perfectly
                illuminated
              </p>
            </div>
            <div className="w-full sm:w-[90%] md:w-[80%] sm:mt-20 flex flex-col gap-4 justify-self-end">
              <img src={hotDeskImg} alt="" />
              <div className="w-full flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-xl sm:text-lg md:text-2xl font-bold text-darkGray">
                  Hot Desk
                </h1>
                <h2 className="text-xl sm:text-xl md:text-3xl font-bold text-orange">
                  $30
                  <span className="text-lg font-normal text-textGray">
                    /day
                  </span>
                </h2>
              </div>
              <p className="text-textGray text-center md:text-start">
                All conference rooms are modern, well equipped and perfectly
                illuminated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
