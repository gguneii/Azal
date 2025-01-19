import React, { useState,useContext, useEffect   } from "react";
import Logo from "../../assets/icons/logo.svg";
import DarkLogo from "../../assets/icons/darklogo.svg";
import { CiGlobe } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { DATA } from "../../Context/DataContext";
import { useNavigate } from 'react-router-dom';

import { HiBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";


function Header() {
  const [show, setShow] = useState(false);
  const [selectedlist, setSelectedList] = useState(false);
  const [subItems, setSubItems] = useState([]);
  const [languagetab, setLanguagetab] = useState(false);
  const [language, setLanguage] = useState("");

    const { menuItems  } = useContext(DATA);
    const navigate = useNavigate(); 

  
    const handleClick = (item) => {
      setSelectedList(item);
      const selectedMenu = menuItems.find((menuItem) => menuItem.title === item);
      setSubItems(selectedMenu?.subItems || []);
  };

  useEffect(() => {
    if (menuItems?.length > 0) {
      const firstItem = menuItems[0].title;
      setSelectedList(firstItem);
      setSubItems(menuItems[0].subItems || []);
    }
  }, [menuItems]);
  
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  


  return (
    <>
      <div>
        <div className="relative ">
          <div
            className={`flex items-center justify-between w-full ${
              show ? "bg-white" : ""
            } `}
          >
            <div>
              <Link to={`/`}>
                <div className="ml-3 mt-1 ">
                  <img         src={show ? DarkLogo : Logo}  alt="" />
                </div>
              </Link>
            </div>
            <div className="flex items-center m-3">
              <button
                className={`p-2  bg-slate-100 bg-opacity-10 rounded-lg m-1 hover:bg-[#40b7de] cursor-pointer ${
                  show ? "border border-[#37A6DB]" : ""
                  }`}
                  onClick={() => {
                    setLanguagetab(true); 
                  }}
              >
                <CiGlobe
                  className={`  w-[18px] h-[18px]  md:w-[24px] md:h-[24px] ${
                    show ? "text-[#01357e]" : "text-white"
                  }`}
                />
              </button>
              {languagetab && (
                <ul
                  className="absolute top-[58px] bg-white p-3 rounded-lg drop-shadow-lg z-30"
                  role="menu"
                  aria-label="Language Selection"
                >
                  <li
                    className="flex items-center cursor-pointer p-1 hover:bg-gray-100"
                    onClick={() => {
                      setLanguage("Azerbaijan");
                      setLanguagetab(false); 
                    }}
                    role="menuitem"
                  >
                    <img src="/Images/aze.png" className="w-5 h-4 mx-1" alt="AZE" />
                    <span>Azerbaijan</span>
                  </li>
                  <li
                    className="flex items-center cursor-pointer p-1 hover:bg-gray-100"
                    onClick={() => {
                      setLanguage("Russian");
                      setLanguagetab(false);
                    }}
                    role="menuitem"
                  >
                    <img src="/Images/Ru.png" className="w-5 h-4 mx-1" alt="RU" />
                    <span>Russian</span>
                  </li>
                  <li
                    className="flex items-center cursor-pointer p-1 hover:bg-gray-100"
                    onClick={() => {
                      setLanguage("English");
                      setLanguagetab(false);
                    }}
                    role="menuitem"
                  >
                    <img src="/Images/eng.png" className="w-5 h-4 mx-1" alt="ENG" />
                    <span>English</span>
                  </li>
                </ul>
              )}

              <span
                className={`p-2  bg-slate-100 bg-opacity-10 rounded-lg m-1 hover:bg-[#40b7de] cursor-pointer ${
                  show ? "border border-[#37A6DB]" : ""
                }`}
              >
                <IoPersonOutline
                  className={`w-[18px] h-[18px]  md:w-[24px] md:h-[24px] ${
                    show ? "text-[#01357e]" : "text-white"
                  }`}
                />
              </span>
              {show ? (
                <span
                  className={`p-2 bg-slate-100 bg-opacity-10 rounded-lg m-1 hover:bg-[#40b7de] cursor-pointer border border-[#37A6DB]`}
                  onClick={() => setShow(false)}
                >
                  <RxCross1 className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] text-[#01357e]" />
                </span>
              ) : (
                <span
                  className={`p-2 bg-slate-100 bg-opacity-10 rounded-lg m-1 hover:bg-[#40b7de] cursor-pointer`}
                  onClick={() => setShow(true)}
                >
                  <HiBars3 className="w-[18px] h-[18px] md:w-[24px] md:h-[24px] text-white" />
                </span>
              )}
            </div>
          </div>
          <div
            id="navbackground"
            className={`w-full  absolute top-[60px] text-white  z-50 transition-all   ${
              show ? "h-[100vh]" : "h-0 overflow-hidden"
            }`}
          >
            <div className="md:flex  md:w-[80%]  mx-auto mt-[60px] md: h-[80%] overflow-y-auto specialscrollbar">
              <ul className="w-full  md:w-[50%] mb-[40px]">
              {menuItems.map((menuItem, index) => (
                <li
                  key={index}
                  onClick={() => handleClick(menuItem.title)}
                  className={`text-[1.3em] md:text-[2em] md:border-r md:border-[#96989a] cursor-pointer flex ml-1 items-center ${
                    selectedlist === menuItem.title
                      ? "text-[#40b7de]"
                      : "text-[#01357e]"
                  }`}
                >
                  <span
                    className={` h-[1.6px] bg-[#40b7de] transition-all mr-1 ${
                      selectedlist === menuItem.title ? "w-[25px]" : "w-[0px] "
                    }`}
                  ></span>
                  {menuItem.title}
                </li>
              ))}
              </ul>
              <ul id="subitems" className="gap-2 flex flex-col m-3  text-[1em]  ">
              {subItems.map((subItem, index) => (
                <li
                  key={index}
                  className="text-[1.2em] text-[#6e7583] hover:text-[#40b7de] cursor-pointer transition-all"
                >
                  <Link
                    to={`/${selectedlist.toLowerCase().replace(/\s+/g, '-')}/${subItem.replace(/\s+/g, '-')}`}
                    className="w-full"
                    onClick={() => setShow(false)}
                  >
                    {subItem}
                  </Link>
                </li>
              ))}

              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
