import React, { useContext, useEffect, useState } from "react";
import { IoSwapVertical } from "react-icons/io5";
import Directions from "../../assets/Icons/directions.svg";
import { IoCalendarOutline } from "react-icons/io5";
import { GiAirplaneDeparture } from "react-icons/gi";
import { PiArrowsOutCardinalLight } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { DATA } from "../../Context/DataContext";
import Locations from "./Locations";
import { SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";

import AllDirections from "./AllDirections";
import Calendar from "./CalendarComponent";
import { LoadingContext } from "../loading/LoadingContext";

function Booking() {
  const { from } = useContext(DATA);
  const navigate = useNavigate();
  
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [focusedInput, setFocusedInput] = useState("");
    const [allDirectionTab, setAllDirectionTab] = useState(false);
  
  const [outboundDate, setOutboundDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const [openTab, setOpenTab] = useState(null);

  const [fromAirportCode, setFromAirportCode] = useState("");
  const [toAirportCode, setToAirportCode] = useState("");

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [isPassengerOpen, setPassengerOpen] = useState(false);
  const { setLoading } = useContext(LoadingContext);


  useEffect(() => {


    const handleScroll = () => {
      document.body.style.overflow =
        isCalendarVisible && !window.matchMedia("(min-width: 710px)").matches
          ? "hidden"
          : "auto";
    };
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", handleScroll);
    };
  }, [isCalendarVisible]);

  const toggleSearchTab = () => {
    setOpenTab((item) => {
      if (!item) {
        setIsCalendarVisible(false);
        setPassengerOpen(false);  
      }
      return !item; 
    });
    setAllDirectionTab(false); 
  };

  const handleDirections = () => {
    setAllDirectionTab(true);
  };

  const handleCountryClick = (country) => {
    const [cityName, countryName] = country.name.split(",");
    const airportCode = country.code;

    if (focusedInput === "from") {
      setFromSearch(cityName.trim());
      setFromAirportCode(airportCode);
    } else if (focusedInput === "to") {
      setToSearch(cityName.trim());
      setToAirportCode(airportCode);
    }
    setOpenTab(false);
    setAllDirectionTab(false);
  };

  useEffect(() => {
    if (openTab) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openTab]);
  // -------------------------------Data submit --------------------

  const [errors, setErrors] = useState({
    fromSearch: false,
    toSearch: false,
    outboundDate: false,
    fromAirportCode: false,
    toAirportCode: false,
    selectedClass: false,
  });

  const handleSubmit = () => {
    const newErrors = {
      fromSearch: !fromSearch,
      toSearch: !toSearch,
      outboundDate: !outboundDate,
      fromAirportCode: !fromAirportCode,
      toAirportCode: !toAirportCode,
      selectedClass: !selectedClass,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      return;
    }

    const bookingDetails = {
      fromSearch,
      toSearch,
      outboundDate,
      returnDate,
      fromAirportCode,
      toAirportCode,
      adults,
      children,
      babies,
      selectedClass,
    };

    setLoading(true);

    setTimeout(() => {
      navigate("/book", { state: { ...bookingDetails} });
      setLoading(false); 
    }, 600); 

  };
  // -------------------------- Airports Swap --------------
  const swapLocations = () => {
    setFromSearch(toSearch);
    setToSearch(fromSearch);

    setFromAirportCode(toAirportCode);
    setToAirportCode(fromAirportCode);
  };

  //  ------------------------PASSENGER SELECT---------------

  const handleClick = (className) => {
    setSelectedClass(className);
  };

  const changeCount = (type, delta) => {
    const newCount =
      type === "adults"
        ? adults + delta
        : type === "children"
        ? children + delta
        : babies + delta;

    if (newCount >= 0 && adults + children + babies + delta <= 8) {
      if (type === "adults") setAdults(adults + delta);
      if (type === "children") setChildren(children + delta);
      if (type === "babies") setBabies(babies + delta);
    }
  };

  useEffect(() => {
    if (isPassengerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPassengerOpen]);


  const handleCloseCalendar = () => {
    setIsCalendarVisible((item) => {
      if (!item) setPassengerOpen(false); 
      return !item;
    });
  };
  
  const handlePassengerTab = () => {
    setPassengerOpen((item) => {
      if (!item) setIsCalendarVisible(false); 
      return !item;
    });
  };
  return (
    <div className=" w-full  content-center sm:bg-transparent">
      <div className="   my-3 sm:my-0  rounded-md  p-2  sm:bg-white md:w-[80%] mx-auto">
        <div className="   w-full    md:flex  md:items-center  md:relative ">
          {/*     ----------------------------------------Location----------------------------------*/}
          <div
            className={`mb-4 mt-4 relative  md:flex md:items-center md:w-[50%] border border-gray-400 rounded-md md:rounded-none  md:rounded-l-md
            ${errors.fromSearch ? "border-red-600  " : "border-gray-400 "}
            `}
          >
            <label
              className={`flex justify-between items-center h-[45px] p-3   relative
                    bg-white text-black  
                   rounded-t-md md:rounded-t-none  border-b md:border-b-0 md:border-r
                   ${
                     errors.fromSearch
                       ? "md:border-r border-red-600  "
                       : "border-gray-400"
                   }
                   `}
            >
              <input
                type="text"
                className={`w-full h-full outline-none font-bold workfontb p-2 ${
                  errors.fromSearch
                    ? "placeholder-red-600  "
                    : "placeholder-black"
                }`}
                value={fromSearch}
                onChange={(e) => setFromSearch(e.target.value)}
                onFocus={() => setFocusedInput("from")}
                onClick={toggleSearchTab}
                placeholder="From"
              />
              <span className="text-gray-500 workfontn md:mx-5">
                {fromAirportCode}
              </span>
            </label>
            <button
              onClick={swapLocations}
              className="absolute top-8 md:top-10 right-3 p-1 border-2 rounded-full z-10 bg-white
                      md:rotate-90 md:relative md:translate-y-[-40px]  "
            >
              <IoSwapVertical color="black" />
            </button>
            <label
              className="flex justify-between items-center h-[50px]
                  bg-white text-black
                    rounded-b-lg  p-3 relative
                    md:rounded-l-lg md: md:p-0  md:border-gray-400
                    "
            >
              <input
                type="text"
                className={`w-full h-full outline-none font-bold workfontb p-2 ${
                  errors.toSearch
                    ? "placeholder-red-600  "
                    : "placeholder-black"
                }`}
                value={toSearch}
                onChange={(e) => setToSearch(e.target.value)}
                onFocus={() => setFocusedInput("to")}
                onClick={toggleSearchTab}
                placeholder="To"
              />
              <span className="text-gray-500 workfontn md:p-2">
                {toAirportCode}
              </span>
            </label>
          </div>
          {/*     ----------------------------------------Calendar----------------------------------*/}
          <div
            className={`mb-4  border rounded-md  md:rounded-none md:h-13  md:my-3 md:min-w-[20%]  ${
              errors.outboundDate ? "border-red-600" : "md:border-gray-400"
            }`}
          >
            <label className="flex justify-around items-center h-[50px] bg-white  p-3 rounded-md relative">
              <button
                onClick={handleCloseCalendar}
                className="flex justify-between items-center w-full text-[#6E7583]"
              >
                {outboundDate || returnDate ? (
                  <>
                    <div className="flex-1 text-left text-black font-semibold">
                      <label
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-90 mt-1
                          top-2 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                          peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        Outbound
                      </label>
                      <p className="pt-3">
                        {outboundDate
                          ? outboundDate.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "Outbound"}
                      </p>
                    </div>
                    <span className="mx-2 text-gray-500">|</span>
                    <div className="flex-1 text-right text-black font-semibold">
                      <label
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-90 mt-1
                          top-2 z-10 origin-[0] end-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                          peer-focus:scale-75 peer-focus:-translate-y-3"
                      >
                        Return
                      </label>
                      <p className="pt-3">
                        {returnDate
                          ? returnDate.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "---"}
                      </p>
                    </div>
                  </>
                ) : (
                  <span
                    className={`flex justify-between items-center w-full text-[#6E7583] ${
                      errors.outboundDate ? "text-red-500" : "text-[#6E7583]"
                    }`}
                  >
                    <p>Flight date</p>
                    <IoCalendarOutline size={22} />
                  </span>
                )}
              </button>
            </label>
          </div>
          <div>
            <Calendar
              outboundDate={outboundDate}
              returnDate={returnDate}
              isCalendarVisible={isCalendarVisible}
              setOutboundDate={setOutboundDate}
              setReturnDate={setReturnDate}
              setIsCalendarVisible={setIsCalendarVisible}
            />
          </div>
          {/*------------- Classes ----------------- */}
          <div className="mb-2  sm:border rounded-md md:rounded-none  md:h-[52px]   md:my-3 md:border md:w-[30%]  md:border-gray-400 md:relative">
            <button
              className="bg-white text-black pt-4 pb-2 px-3 w-full rounded-lg relative flex justify-between items-center "
              onClick={handlePassengerTab}
            >
              <label
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-90 mt-1
                  top-2 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                  peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Pasengers
              </label>
              <p className="workfontb text-[0.8em] text-[#2E3034]">
                {adults + babies + children}, {selectedClass}
              </p>
              <IoIosArrowDown size={22} className="flex justify-end" />
            </button>
              {isPassengerOpen && (
              <div className=" fixed md:absolute top-0  right-0   w-full h-full bg-white z-40 
              md:top-[48px] md:right-[-30px]  md:w-[330px] md:rounded-md md:h-[320px] md:drop-shadow-lg">
                <div className="md:hidden">
                  <button
                    className="absolute right-2 top-3"
                    onClick={handlePassengerTab}
                  >
                    <RxCross1 size={25} />
                  </button>
                  <h3 className="p-2 text-[1.3em] workfontb">
                    Passenger selection
                  </h3>
                </div>
                <ul className="md:mt-3 md:mx-2">
                  <li className="flex justify-between items-center">
                    <span className="p-3 m-1">
                      <p>Adults</p>
                      <p className="text-xs text-gray-500">from 12 years</p>
                    </span>
                    <span className="flex items-center space-x-2">
                      <button
                        onClick={() => changeCount("adults", -1)}
                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                        disabled={adults === 1}
                      >
                        <span className="text-lg font-semibold">-</span>
                      </button>
                      <span className="font-medium">{adults}</span>
                      <button
                        onClick={() => changeCount("adults", 1)}
                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                        disabled={adults + children + babies === 8}
                      >
                        <span className="text-lg font-semibold">+</span>
                      </button>
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="p-3 m-1">
                      <p>Children</p>
                      <p className="text-xs text-gray-500">up to 12 years</p>
                    </span>
                    <span className="flex items-center space-x-2">
                      <button
                        onClick={() => changeCount("children", -1)}
                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                        disabled={children === 0}
                      >
                        <span className="text-lg font-semibold">-</span>
                      </button>
                      <span className="font-medium">{children}</span>
                      <button
                        onClick={() => changeCount("children", 1)}
                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                        disabled={adults + children + babies === 8}
                      >
                        <span className="text-lg font-semibold">+</span>
                      </button>
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="p-3 m-1">
                      <p>Infants</p>
                      <p className="text-xs text-gray-500">up to 2 years</p>
                    </span>
                    <span className="flex items-center space-x-2">
                      <button
                        onClick={() => changeCount("babies", -1)}
                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                        disabled={babies === 0}
                      >
                        <span className="text-lg font-semibold">-</span>
                      </button>
                      <span className="font-medium">{babies}</span>
                      <button
                        onClick={() => changeCount("babies", 1)}
                        className="rounded-full p-2 bg-gray-200 hover:bg-gray-300 w-8 h-8 flex items-center justify-center"
                        disabled={adults + children + babies === 8}
                      >
                        <span className="text-lg font-semibold">+</span>
                      </button>
                    </span>
                  </li>
                </ul>
                <div className="flex w-[90%] justify-center mx-auto m-2">
                  <button
                    onClick={() => handleClick("Economy")}
                    className={`rounded-l-lg  px-4 py-2 border w-[50%] 
                              ${
                                selectedClass === "Economy"
                                  ? "bg-blue-100 text-blue-700 border-blue-500 "
                                  : "bg-gray-100 text-black"
                              }`}
                  >
                    Economy
                  </button>
                  <button
                    onClick={() => handleClick("Business")}
                    className={`rounded-r-lg  px-4 py-2 border w-[50%] 
                              ${
                                selectedClass === "Business"
                                  ? "bg-blue-100 text-blue-700 border-blue-500"
                                  : "bg-gray-100 text-black"
                              }`}
                  >
                    Business
                  </button>
                </div>
              </div>
            )}
          </div>
         
          <div className="mb-4   sm:border border-[#2C8DC7] rounded-md md:hidden  ">
            <button className="bg-white text-blue-900 w-full p-3 rounded-md flex items-center justify-center">
              + Add promo code
            </button>
          </div>

          <div className="mb-4  md:hidden text-white sm:text-black">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Pay by Miles
            </label>
          </div>

          <div>
            <button
              className="bg-[#37A6DB] w-full text-white py-3 rounded-md md:rounded-r-lg md:rounded-none md:px-3 md:h-[52px] md:bg-[#01357e] "
              onClick={handleSubmit}
            >
              <p className="md:hidden">Search</p>
              <p className="hidden md:block">
                <SlMagnifier size={23} />
              </p>
            </button>
          </div>
        </div>
        <div className=" justify-between hidden md:flex ">
          <div className="mx-2 items-center flex ">
            <label className="flex items-center cursor-pointer relative">
              <input
                type="checkbox"
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border 
                            border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                id="check1"
              />

              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <p className="p-2">Pay with Miles </p>
          </div>
          <div className="  sm:border border-[#2C8DC7] rounded-md mx-2 mb-3 ">
            <button className="bg-white text-[#2C8DC7] w-[300px] p-3 rounded-md flex items-center justify-center">
              + Add promo code
            </button>
          </div>
        </div>
      </div>
      {openTab && (
        <Locations
        onCountryClick={handleCountryClick}
        toggleSearchTab={toggleSearchTab}
        inputValue={focusedInput === "from" ? fromSearch : toSearch}
        setInputValue={(value) =>
          focusedInput === "from" ? setFromSearch(value) : setToSearch(value)
        }
        focusedInput={focusedInput}
        setFocusedInput={setFocusedInput}
        allDirectionTab={allDirectionTab}
          setAllDirectionTab={setAllDirectionTab}
          fromAirportCode={fromAirportCode} 
          toAirportCode={toAirportCode} 
      />
      
      )}
    </div>
  );
}

export default Booking;
