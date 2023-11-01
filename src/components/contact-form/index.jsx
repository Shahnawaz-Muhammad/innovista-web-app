import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({ mode: "all" });

  const contactForm = useRef();

  //   const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (event) => {
    setLoading(true);
    console.log(event);
    setLoading(false);
  };
  return (
    <div
      className={`pt-10 w-full z-20 flex justify-center py-4 bg-bgGray mx-auto px-4 md:px-8 xl:px-4`}
    >
      <div className="max-w-screen-lg w-full flex justify-center">
        <div className="max-w-screen-md w-full flex flex-col items-center gap-8 justify-center ">
          <h2 className="text-yellow font-bold uppercase text-lg">
            Be In Touch
          </h2>
          <h1 className="text-5xl font-bold text-gray-900">Ask A Question</h1>

          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
            <div className="w-2 h-2 bg-yellow rounded-full"></div>
          </div>

          <p className="text-textGray text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
            error deleniti explicabo animi, debitis ab non expedita temporibus
            commodi perspiciatis.
          </p>

          <div className="w-full">
            <form
              className="flex flex-col  py-3"
              ref={contactForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col md:flex-row md:gap-3 ">
                <div className="relative z-0 w-full group min-h-[6rem]">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className=" block  px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-700   border bg-gray-300 appearance-none focus:outline-none peer"
                    placeholder=" "
                    {...register("name", {
                      required: "Name is required  ",
                      minLength: 3,
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "Name cannot be a number",
                      },
                    })}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-700  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-gray-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    First Name
                  </label>
                  {errors.name && (
                    <p role="alert" className="text-left text-red-500 mt-1">
                      {errors.name?.message}
                    </p>
                  )}
                </div>

                <div className="relative z-0 w-full group min-h-[6rem]">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block  px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-700   border bg-gray-300 appearance-none focus:outline-none peer"
                    placeholder=" "
                    // value={contactData.email}
                    // onChange={handleInputChange}
                    {...register("email", {
                      required: "Please enter a valid email",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Invalid Email",
                      },
                    })}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-700  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-gray-700  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Email*
                  </label>
                  {errors.email && (
                    <p role="alert" className="text-left text-red-500 mt-1">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative z-0 w-full group min-h-[8.5rem] max-h-[12rem] overflow-y-auto ">
                <textarea
                  id="interest"
                  name="message"
                  className="border bg-gray-300  block w-full py-2 px-4 placeholder-gray-700  text-gray-700 focus:outline-none"
                  rows="4"
                  placeholder="I'm interested in*"
                  {...register("message", {
                    required: "Message is required",
                  })}
                ></textarea>
                {errors.message && (
                  <p role="alert" className="text-left text-red-500 mt-1">
                    {errors.message?.message}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col items-center">
                <div className="flex flex-col gap-1 min-h-[4rem] mt-5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register("termsConditions", {
                        required:
                          "Check the field to Agree with Terms & Conditions",
                      })}
                      className="w-4 h-4"
                    />
                    <p className="text-textGray">
                      I agree that my submitted data is being collected and
                      stored.
                    </p>
                  </div>
                  {errors.termsConditions && (
                    <p role="alert" className="text-left text-red-500 mt-1">
                      {errors.termsConditions?.message}
                    </p>
                  )}
                </div>

                <div className="my-6">
                  <button
                    disabled={loading}
                    type="submit"
                    className={`${
                      loading ? "bg-opacity-50 cursor-none" : "bg-opacity-100"
                    } text-white bg-yellow  hover:bg-yellowDark hover:text-white focus:ring-4 focus:outline-none font-medium  text-sm w-full sm:w-auto px-10 py-6 text-center`}
                  >
                    {loading ? "Please wait..." : "Send Your Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
