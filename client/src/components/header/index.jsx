import React, { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { RxCross1 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/innovista-logo-white.png";
const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [navMobile, setNavMobile] = useState(false);
  const location = useLocation(); // Get the current location from React Router
  const [activeNavItem, setActiveNavItem] = useState(location.pathname);

  const authPages =
    location.pathname === "/login" || location.pathname === "/register";
 const otherPages  = location.pathname === "/find-your-account" || location.pathname === "/confirm-otp" || location.pathname === "/reset-password";

  const navItems = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "Services", path: "/services" },
    { id: 3, label: "About", path: "/about" },
    { id: 4, label: "Pricing", path: "/pricing" },
    { id: 5, label: "Contact Us", path: "/contact" },
  ];
  const navigate = useNavigate();
  const toggleNavMobile = () => {
    setNavMobile(!navMobile);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const handleLogin = () => {
    // navigate("/login");
    console.log('login clicked')
    setActiveNavItem("");
    setNavMobile(false)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const gotoPage = (item) => {
    navigate(`${item.path}`);
    setNavMobile(false);
  };

  useEffect(() => {
    setActiveNavItem(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <div
        className={`fixed top-0 w-full z-20 flex justify-center ${
          authPages || scroll || otherPages
            ? "bg-black max-w-full"
            : "max-w-full bg-opacity-0"
        }  py-4 text-bgLight mx-auto px-4 md:px-8 xl:px-4`}
      >
        <div className="max-w-screen-xl w-full">
          <div className="max-w-full flex justify-between">
            <Link to="/">
              <img src={logo} alt="" className="h-16" />
            </Link>
            <div className="max-w-full text-primary hidden md:flex gap-5 font-roboto items-center text-white uppercase">
              {navItems.map((item) => (
                <Link
                  to={item.path}
                  key={item.id}
                  className={`relative group cursor-pointer `}
                  onMouseEnter={() => setActiveNavItem(item.path)}
                  onMouseLeave={() => setActiveNavItem(location.pathname)}
                >
                  {item.label}
                  <span
                    className={`absolute w-full h-1 bg-primary -bottom-2 left-0 transform scale-x-0 ${
                      activeNavItem === item.path ? "scale-x-100" : ""
                    } group-hover:scale-x-100 transition-transform duration-300 ease-in-out bg-orange`}
                  ></span>
                </Link>
              ))}
            </div>

            <div className="md:flex items-center hidden">
              <Link
              to="/login"
                onClick={handleLogin}
                className="bg-orange hover:bg-orangeDark text-white uppercase text-lg font-semibold py-2 px-4 "
              >
                Login
              </Link>
            </div>

            <button
              onClick={toggleNavMobile}
              className="md:hidden items-center flex"
            >
              <GiHamburgerMenu className="text-3xl text-white" />
            </button>
          </div>
        </div>
        <div
          className={`fixed top-0 w-full h-screen transition-transform duration-300 transform ${
            navMobile ? "translate-y-0" : "-translate-y-full"
          } lg:hidden bg-gray-600`}
        >
          <div className="w-full flex justify-end absolute right-12 top-8">
            <RxCross1
              className="text-3xl text-white cursor-pointer"
              onClick={toggleNavMobile}
            />
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col gap-10 uppercase text-xl items-center justify-center text-white">
              {navItems.map((item) => {
                return (
                  <button key={item.id} onClick={() => gotoPage(item)}>
                    {item.label}
                  </button>
                );
              })}
               <Link
              to="/login"
              onClick={handleLogin}
                className="bg-orange hover:bg-orangeDark  text-white uppercase text-lg font-semibold py-2 px-4 "
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
