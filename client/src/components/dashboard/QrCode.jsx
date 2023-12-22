import React from "react";
import QRCode from "qrcode.react";
import { IoClose } from "react-icons/io5";

const QrCode = ({ booking, setShowQr }) => {

  const bookingDataString = JSON.stringify(booking);

  return (
    <>
      <div
        className="w-full z-50 h-screen fixed top-0 left-0  backdrop-blur-sm bg-opacity-50"
        onClick={() => setShowQr(false)}
      ></div>
      <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full ">
          <div className="relative bg-gray-100 rounded-lg border border-gray-600 h-80 w-80 flex items-center justify-center">
            <button
              className="absolute right-5 top-5"
              onClick={() => setShowQr(false)}
            >
              <IoClose  className="text-xl"/>
            </button>
            <QRCode value={bookingDataString} size={200} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QrCode;
