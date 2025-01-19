import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { DATA } from "../../Context/DataContext";
import { MdAirplaneTicket } from "react-icons/md";
import { FaPlane } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { GiMeal } from "react-icons/gi";
import { MdOutlineLuggage } from "react-icons/md";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa6";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { TbExchange } from "react-icons/tb";
import { GiSofa } from "react-icons/gi";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import Booking from "../header/Booking";
import { FaExchangeAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { Flight } from "../../Context/FlightContext";
import { ImCross } from "react-icons/im";

import Stepper from "./Stepper";

function Reservation() {
  const { flights } = useContext(DATA);
  const navigate = useNavigate()
  const location = useLocation();
  const [bookingData, setBookingData] = useState(location.state);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const hasReturnFlight = bookingData.returnDate !== null;

  const [availabletab, setAvailabletab] = useState(false);

  const [outboundDates, setOutboundDates] = useState([]);
  const [returnDates, setReturnDates] = useState([]);
  const [selectedOutboundDate, setSelectedOutboundDate] = useState(
    bookingData?.outboundDate
  );
  const [selectedReturnDate, setSelectedReturnDate] = useState(
    bookingData?.returnDate
  );

  const getDateRange = (startDate, days = 6) => {
    const dates = [];
    const start = new Date(startDate);

    for (let i = 0; i < days; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }

    return dates;
  };
  useEffect(() => {
    if (bookingData?.outboundDate) {
      const outboundRange = getDateRange(bookingData.outboundDate);
      setOutboundDates(outboundRange);
    }

    if (bookingData?.returnDate) {
      const returnRange = getDateRange(bookingData.returnDate);
      setReturnDates(returnRange);
    }
  }, [bookingData]);

  //  FLight find

  useEffect(() => {
    if (bookingData?.fromAirportCode && bookingData?.toAirportCode) {
      const filtered = flights.filter((flight) =>
        bookingData.fromAirportCode === "BAK" ||
        bookingData.toAirportCode === "BAK"
          ? flight.from === bookingData.fromAirportCode &&
            flight.to === bookingData.toAirportCode
          : (flight.from === bookingData.fromAirportCode &&
              flight.to === "BAK") ||
            (flight.from === "BAK" && flight.to === bookingData.toAirportCode)
      );
      if (filtered.length === 0) {
        setFilteredFlights([]);
        setAvailabletab(true);
      } else {
        setFilteredFlights(filtered);
      }
    }
  }, [bookingData, flights]);

  const fromAirportName = bookingData?.fromSearch;
  const toAirportName = bookingData?.toSearch;
  const fromAirportCode = bookingData?.fromAirportCode;
  const toAirportCode = bookingData?.toAirportCode;
  const bakuAiportName = "Baku";

  //  ================= ClassBuuton =================

  const [selectedClass, setSelectedClass] = useState("Economy");

  const handleClass = (className) => {
    setSelectedClass(className);
  };
  const [classtabvisible, setclastabvisible] = useState(false);

  const handleClassTab = (classType) => {
    setSelectedClass(classType);
    setclastabvisible(!classtabvisible);
  };
  useEffect(() => {
    document.body.style.overflow = classtabvisible ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [classtabvisible]);

  //  ====== FLIGHT TOTAL HOUR ====

  const totalDuration = filteredFlights.reduce(
    (total, flight) => {
      if (flight.flightDuration) {
        const [hours, minutes] = flight.flightDuration
          .split(" ")
          .map((part) => parseInt(part));
        total.hours += hours;
        total.minutes += minutes;
      }
      return total;
    },
    { hours: 0, minutes: 0 }
  );

  totalDuration.hours += Math.floor(totalDuration.minutes / 60);
  totalDuration.minutes %= 60;
  const formattedTotalDuration = `${totalDuration.hours}h ${totalDuration.minutes}m`;

  //  =========  FLIGHT SELECTED ===========
  const [selectedFlightTime, setSelectedFlightTime] = useState({
    start: "",
    end: "",
  });

  const handleFlightTimeSelect = (filteredFlights) => {
    if (filteredFlights.length === 1) {
      const firstFlightTimes = filteredFlights[0]?.flightTimes[0];
      setSelectedFlightTime({
        start: firstFlightTimes?.start || "",
        end: firstFlightTimes?.end || "",
      });
    } else if (filteredFlights.length > 1) {
      const firstFlightTimes = filteredFlights[0]?.flightTimes[0];
      const lastFlightTimes =
        filteredFlights[filteredFlights.length - 1]?.flightTimes.slice(-1)[0];
      setSelectedFlightTime({
        start: firstFlightTimes?.start || "",
        end: lastFlightTimes?.end || "",
      });
    } else null;
  };
  useEffect(() => {
    handleFlightTimeSelect(filteredFlights);
  }, [filteredFlights]);

  const {
    setOutboundFlight,
    setReturnFlight,
    setPassengerData,
    setFormattedTotalDuration,
  } = useContext(Flight);

  const [outboundFlightDetails, setOutboundFlightDetails] = useState({
    fare: "",
    totalPrice: 0,
    flightNumber: "",
    airplaneModel: "",
    start: "",
    end: "",
    flightTime: "",
    date: "",
    fromAirportCode: "",
    toAirportCode: "",
  });

  const [returnFlightDetails, setReturnFlightDetails] = useState({
    fare: "",
    totalPrice: 0,
    flightNumber: "",
    airplaneModel: "",
    start: "",
    end: "",
    flightTime: "",
    date: "",
    fromAirportCode: "",
    toAirportCode: "",
  });

  const handleFareSelection = (fare, totalPrice, flightDetails, isOutbound) => {
    const selectedDetails = {
      fare,
      totalPrice,
      flightNumber: flightDetails.flightNumber,
      airplaneModel: flightDetails.airplaneModel,
      fromAirportName: fromAirportName,
      toAirportName: toAirportName,
      flightTime: selectedFlightTime,
      date: isOutbound ? selectedOutboundDate : selectedReturnDate,
      fromAirportCode: fromAirportCode,
      toAirportCode: toAirportCode,
    };

    const passengerData = {
      adults: bookingData.adults,
      children: bookingData.children,
      babies: bookingData.babies,
    };

    setPassengerData(passengerData);
    setFormattedTotalDuration(formattedTotalDuration);

    if (!bookingData.returnDate) {
      setReturnFlight(null);
      localStorage.removeItem("returnFlight");
      navigate("/confirm");
    } else {
      setSelected(1);
      setclastabvisible(false);
      swapAirportDetails();
    }

    if (isOutbound) {
      setOutboundFlight(selectedDetails);
      setOutboundFlightDetails(selectedDetails);

      if (!bookingData.returnDate) {
        navigate("/confirm");
      } else {
        setSelected(1);
        setclastabvisible(false);
        swapAirportDetails();
      }
    } else {
      const returnDetails = {
        ...selectedDetails,
        date: selectedReturnDate,
      };

      setReturnFlight(returnDetails);
      setReturnFlightDetails(returnDetails);

      navigate("/confirm");
      setclastabvisible(false);
    }
  };

  const swapAirportDetails = () => {
    const updatedBookingData = {
      ...bookingData,
      fromAirportCode: bookingData.toAirportCode,
      toAirportCode: bookingData.fromAirportCode,
      fromSearch: bookingData.toSearch,
      toSearch: bookingData.fromSearch,
    };

    setBookingData(updatedBookingData);

    const filtered = flights.filter((flight) =>
      updatedBookingData.fromAirportCode === "BAK" ||
      updatedBookingData.toAirportCode === "BAK"
        ? flight.from === updatedBookingData.fromAirportCode &&
          flight.to === updatedBookingData.toAirportCode
        : (flight.from === updatedBookingData.fromAirportCode &&
            flight.to === "BAK") ||
          (flight.from === "BAK" &&
            flight.to === updatedBookingData.toAirportCode)
    );

    setFilteredFlights(filtered);
  };

  // ===================  Flight Button================
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (outboundFlightDetails.fare && bookingData.returnDate) {
      setSelected(1);
    }
  }, [outboundFlightDetails.fare, bookingData.returnDate]);

  // =========  Booking Style ===========

  const [bookingtab, setBookingtab] = useState(false);

  useEffect(() => {
    if (location.state?.refresh) {
      setBookingtab(false);
      const updatedState = { ...location.state };
      delete updatedState.refresh;
      navigate("/book", { state: updatedState, replace: true });
      window.location.reload();
    }
  }, [location.state]);

  const getStartAndEndTimes = (filteredFlights) => {
    if (filteredFlights.length === 1) {
      const firstFlightTimes = filteredFlights[0]?.flightTimes[0];
      return {
        start: firstFlightTimes?.start,
        end: firstFlightTimes?.end,
      };
    } else if (filteredFlights.length > 1) {
      const firstFlightTimes = filteredFlights[0]?.flightTimes[0];
      const lastFlightTimes =
        filteredFlights[filteredFlights.length - 1]?.flightTimes.slice(-1)[0];
      return {
        start: firstFlightTimes?.start,
        end: lastFlightTimes?.end,
      };
    }
    return { start: null, end: null };
  };
  const { start, end } = getStartAndEndTimes(filteredFlights);


  return (
    <div className=" bg-[#edf1f4] p-2 min-h-[90vh] ">
      {/* ----------------BOOKING--------------*/}
      <div className="md:hidden">
        {bookingtab ? (
          <div className="fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50  p-5">
            <div className="flex  justify-between">
              <h2 className="text-lg font-bold">Booking</h2>
              <button
                onClick={() => {
                  setBookingtab(false);
                }}
                className="text-gray-500 hover:text-gray-800"
              >
                <RxCross2 className="text-[1.6em]" />
              </button>
            </div>
            <div>
              <Booking />
            </div>
          </div>
        ) : (
          <div
            className="p-3 m-3 flex bg-white rounded-lg border-2 justify-between  cursor-pointer"
            onClick={() => {
              setBookingtab(true);
            }}
          >
            <div>
              <div className="flex items-center font-semibold">
                <span className="m-2">{fromAirportName}</span>
                <FaExchangeAlt />
                <span className="m-2">{toAirportName}</span>
              </div>
              <div className="text-gray-600 text-[0.8em] mx-2">
                {new Date(bookingData.outboundDate).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )}{" "}
                -{" "}
                {bookingData.returnDate
                  ? new Date(bookingData.returnDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )
                  : "No return"}
                ,{" "}
                {bookingData.adults + bookingData.children + bookingData.babies}{" "}
                passenger
                {bookingData.adults +
                  bookingData.children +
                  bookingData.babies >
                1
                  ? "s"
                  : ""}
              </div>
            </div>
            <button className="text-gray-400 rounded">
              <MdModeEditOutline className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <Booking />
      </div>
      {/* ----------------FLIGHT BUTTONS--------------*/}
      <div id="FlightButtons" className="my-5">
        <div className="w-[90%] md:w-[90%] mx-auto flex justify-between gap-1">
          <button
            className={`border border-[#c1c8d1] rounded-lg h-13  items-center flex md:h-16 md:w-[60%]  ${
              selected === 0
                ? "bg-[#37a6db] w-[90%] md:bg-white  md:border-[#37a6db]"
                : "border-2 border-[#c1c8d1] "
            }`}
          >
            <span
              className={` h-[100%]   justify-center items-center flex p-2 rounded-l-lg md:w-[20%]  ${
                selected === 0 ? "bg-[#37a6db]  " : "md:bg-transparent"
              }`}
            >
              <MdFlightTakeoff
                className={` w-[20px] h-[20px]  ${
                  selected === 0
                    ? "text-white md:bg-[#37a6db]  "
                    : "text-[#8d9094]"
                }`}
              />
            </span>
            <p
              className={`font-semibold text-[0.8em]  md:text-[1em] p-2 ${
                selected === 0
                  ? "block text-white md:text-[#37a6db]"
                  : "hidden md:block text-[#8d9094]"
              }`}
            >
              Choose outbound flight
            </p>
            <span
              className={`hidden md:block  font-semibold mx-2 
              ${selected === 0 ? "text-[#37a6db]" : " text-[#8d9094]"}`}
            >
              {fromAirportName}-{toAirportName}
            </span>
          </button>
          <button
            className={`border border-[#c1c8d1] rounded-lg h-10  items-center flex md:h-16 md:w-[60%]  ${
              selected === 1
                ? "bg-[#37a6db] w-[90%] md:bg-white  md:border-[#37a6db]"
                : "border-2 border-[#c1c8d1] "
            }`}
          >
            <span
              className={` h-[100%]   justify-center items-center flex rounded-l-lg md:w-[20%]  ${
                selected === 0 ? "md:bg-transparent  " : " md:bg-[#37a6db]"
              }`}
            >
              <MdFlightLand
                className={` w-[20px] h-[20px]  ${
                  selected === 0 ? "text-[#8d9094] " : " text-white"
                }`}
              />
            </span>
            <p
              className={`font-semibold text-[0.8em]  md:text-[1em] p-2 ${
                selected === 1
                  ? "block text-white md:text-[#37a6db]"
                  : "hidden md:block text-[#8d9094]"
              }`}
            >
              Choose return flight
            </p>
            <span
              className={`hidden md:block  font-semibold mx-2 
              ${selected === 1 ? "text-[#37a6db]" : " text-[#8d9094]"}`}
            >
              {toAirportName}-{fromAirportName}
            </span>
          </button>
        </div>
      </div>
      {/* ----------------SLIDER--------------*/}

      {/* ----------------CARDCONTAINER--------------*/}
      <div id="CardsContainer">
        {filteredFlights[0]?.flightTimes.map((item, index) => (
          <div
            key={index}
            className="w-[90%]  mx-auto my-3 p-1  bg-white rounded-lg min-h-[200px] lg:flex  md:w-[90%] "
          >
            <div className="flex justify-between items-center my-2 md:ml-4">
              <ul className="flex items-center flex-wrap">
                <li className="p-2 rounded-full m-1 bg-gray-200 flex lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                    className="root_ESF size_20__Il"
                  >
                    <g id="logo">
                      <g id="Group 135">
                        <path
                          id="path23491"
                          fill="#036"
                          d="M15.154 12.916c-.868 2.63-3.347 4.534-6.264 4.534a6.604 6.604 0 0 1-6.596-6.597A6.604 6.604 0 0 1 8.89 4.257c1.108 0 2.152.275 3.069.76l.236-.208a6.847 6.847 0 0 0-3.305-.846c-3.8 0-6.89 3.09-6.89 6.89s3.09 6.89 6.89 6.89c3.086 0 5.705-2.04 6.58-4.842l-.316.015Z"
                        />
                        <path
                          id="path23493"
                          fill="#00B2E2"
                          d="M4.476 12.976c3.978-.366 7.919-.976 11.804-1.955l-.18.806c-4.97 1.133-8.437 1.237-11.624 1.15Z"
                        />
                        <path
                          id="path23495"
                          fill="#00B2E2"
                          d="M5.108 12.581a69.207 69.207 0 0 0 11.459-2.838l-.185.825c-4.346 1.366-8.051 1.976-11.274 2.013Z"
                        />
                        <path
                          id="path23497"
                          fill="#57C8E7"
                          d="M5.715 12.161c3.654-.911 7.375-2.186 11.141-3.713l-.185.83c-3.99 1.566-7.68 2.597-10.956 2.883Z"
                        />
                        <path
                          id="path23499"
                          fill="#98DAE9"
                          d="M6.32 11.664c3.685-1.12 7.309-2.803 10.895-4.821l-.227 1.017c-4.296 2.133-7.936 3.5-10.668 3.804Z"
                        />
                        <path
                          id="path23501"
                          fill="#57C8E7"
                          d="M7.104 11.139c4.138-2.001 7.502-4.074 10.533-6.18l-.25 1.121C13.95 8.274 10.52 10.091 7.103 11.14Z"
                        />
                        <path
                          id="path23503"
                          fill="#00B2E2"
                          d="M7.707 10.488c4.069-2.571 7.598-5.188 10.451-7.86l-.306 1.369c-3.375 2.913-6.83 4.919-10.145 6.491Z"
                        />
                        <path
                          id="path23505"
                          fill="#00B2E2"
                          d="m18.391 1-1.15.03a50.476 50.476 0 0 1-4.302 4.62c-1.563 1.489-3.134 2.824-4.707 4.138C11.677 7.464 15.095 4.861 18.392 1Z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span className=" hidden text-[#6E7583] text-[0.8em] md:block">
                    Azerbaijan Airlines
                  </span>
                </li>
                {filteredFlights.map((flight, index) =>
                  flight.flightNumber?.slice(0, 1).map((item, flightIndex) => (
                    <li
                      key={`${index}-${flightIndex}`}
                      className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1
                       rounded-3xl border-gray-300 md:hidden"
                    >
                      <MdAirplaneTicket size={13} className="m-1" />
                      <p>{item}</p>
                    </li>
                  ))
                )}
                {filteredFlights.map((airplane, index) =>
                  airplane.airplaneModel
                    ?.slice(0, 1)
                    .map((item, airplaneIndex) => (
                      <li
                        key={`${index}-${airplaneIndex}`}
                        className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300
                        md:hidden
                        "
                      >
                        <MdAirplaneTicket size={13} className="m-1" />
                        <p>{item}</p>
                      </li>
                    ))
                )}
              </ul>
              <span className="text-[#6e7583] text-[0.8em]  m-2 md:hidden">
                {formattedTotalDuration}
              </span>
            </div>
            <div className="flex justify-between">
              <div className=" flex flex-col items-center m-2 md:hidden">
                <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                <div className="border h-10 border-black"></div>
                {filteredFlights.length > 1 && (
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                )}
                <div className="border h-10 border-black"></div>
                <div className="w-3 h-3 rounded-full border-2 border-black"></div>
              </div>
              <div className="flex flex-col justify-between p-1 m-1 md:hidden">
                <div className="flex-col">
                  <div className="font-semibold">{item.start}</div>
                  <div className="text-[0.7em] text-[#6E7583]">
                    {(outboundFlightDetails.fare
                      ? selectedReturnDate || selectedOutboundDate
                      : selectedOutboundDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      weekday: "short",
                      month: "short",
                    })}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">{item.end}</div>
                  <div className="text-[0.7em] text-[#6E7583]">
                    {(outboundFlightDetails.fare
                      ? selectedReturnDate || selectedOutboundDate
                      : selectedOutboundDate
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      weekday: "short",
                      month: "short",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start   justify-between w-[40%] md:hidden">
                <div className="flex flex-col">
                  <span className="font-semibold">{fromAirportName}</span>
                  <span className="text-[0.7em] text-[#6E7583]">
                    {fromAirportCode}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{toAirportName}</span>
                  <span className="text-[0.7em] text-[#6E7583]">
                    {toAirportCode}
                  </span>
                </div>
              </div>
              <div className="hidden md:block md:ml-4 lg:mr-[20px]  ">
                <div className="p-2 rounded-full w-[150px] m-1 bg-gray-200 hidden lg:flex ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                    className="root_ESF size_20__Il"
                  >
                    <g id="logo">
                      <g id="Group 135">
                        <path
                          id="path23491"
                          fill="#036"
                          d="M15.154 12.916c-.868 2.63-3.347 4.534-6.264 4.534a6.604 6.604 0 0 1-6.596-6.597A6.604 6.604 0 0 1 8.89 4.257c1.108 0 2.152.275 3.069.76l.236-.208a6.847 6.847 0 0 0-3.305-.846c-3.8 0-6.89 3.09-6.89 6.89s3.09 6.89 6.89 6.89c3.086 0 5.705-2.04 6.58-4.842l-.316.015Z"
                        />
                        <path
                          id="path23493"
                          fill="#00B2E2"
                          d="M4.476 12.976c3.978-.366 7.919-.976 11.804-1.955l-.18.806c-4.97 1.133-8.437 1.237-11.624 1.15Z"
                        />
                        <path
                          id="path23495"
                          fill="#00B2E2"
                          d="M5.108 12.581a69.207 69.207 0 0 0 11.459-2.838l-.185.825c-4.346 1.366-8.051 1.976-11.274 2.013Z"
                        />
                        <path
                          id="path23497"
                          fill="#57C8E7"
                          d="M5.715 12.161c3.654-.911 7.375-2.186 11.141-3.713l-.185.83c-3.99 1.566-7.68 2.597-10.956 2.883Z"
                        />
                        <path
                          id="path23499"
                          fill="#98DAE9"
                          d="M6.32 11.664c3.685-1.12 7.309-2.803 10.895-4.821l-.227 1.017c-4.296 2.133-7.936 3.5-10.668 3.804Z"
                        />
                        <path
                          id="path23501"
                          fill="#57C8E7"
                          d="M7.104 11.139c4.138-2.001 7.502-4.074 10.533-6.18l-.25 1.121C13.95 8.274 10.52 10.091 7.103 11.14Z"
                        />
                        <path
                          id="path23503"
                          fill="#00B2E2"
                          d="M7.707 10.488c4.069-2.571 7.598-5.188 10.451-7.86l-.306 1.369c-3.375 2.913-6.83 4.919-10.145 6.491Z"
                        />
                        <path
                          id="path23505"
                          fill="#00B2E2"
                          d="m18.391 1-1.15.03a50.476 50.476 0 0 1-4.302 4.62c-1.563 1.489-3.134 2.824-4.707 4.138C11.677 7.464 15.095 4.861 18.392 1Z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span className=" hidden text-[#6E7583] text-[0.8em] md:block">
                    Azerbaijan Airlines
                  </span>
                </div>
                <div className="flex m-2 items-center">
                  <span className="text-[1.7em] ">{item.start}</span>
                  <div className="pt-7">
                    <div className=" flex flex-col md:flex-row items-center m-2 ">
                      <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                      <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[75px]"></div>
                      {filteredFlights.length > 1 && (
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      )}
                      <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[75px]"></div>
                      <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                    </div>
                    <div className="flex justify-between text-[0.6em] font-semibold mx-1">
                      <span>{fromAirportCode}</span>
                      <span>{toAirportCode}</span>
                    </div>
                  </div>
                  <span className="text-[1.7em]">{item.end}</span>
                </div>
                <div className="flex justify-between mx-2 ml-6 mb-5">
                  <div>
                    <span className="text-[#979DA8] w-12 h-12">
                      <MdFlightTakeoff />
                    </span>
                    <span className="text-[0.9em]">
                      {fromAirportName}, {fromAirportCode}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#979DA8]">
                      <MdFlightLand />
                    </span>
                    <span className="text-[0.9em]">
                      {toAirportName}, {toAirportCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="ClassOptions"
              className="my-2 border-t-2 w-full md:border-none md:flex md:w-[80%]"
            >
              <div className="md:w-[100%] md:ml-4 ">
                <div className="flex items-center">
                  <div className="flex items-center text-[#2c8dc7] m-3">
                    {filteredFlights.length === 2 ? (
                      <span>
                        <FaPersonWalkingLuggage size={20} />
                      </span>
                    ) : (
                      <HiArrowLongRight size={20} />
                    )}
                  </div>
                  <p className="text-[0.8em] font-semibold">
                    {filteredFlights.length === 2 ? "1 stop" : "Without stops"}
                  </p>
                </div>
                <div className="hidden md:block  ">
                  <ul className="flex items-center flex-wrap w-[76%]">
                    {filteredFlights.map((flight, index) =>
                      flight.flightNumber
                        ?.slice(0, 1)
                        .map((item, flightIndex) => (
                          <li
                            key={`${index}-${flightIndex}`}
                            className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1
                            rounded-3xl border-gray-300 "
                          >
                            <MdAirplaneTicket size={13} className="m-1" />
                            <p>{item}</p>
                          </li>
                        ))
                    )}
                    {filteredFlights.map((airplane, index) =>
                      airplane.airplaneModel
                        ?.slice(0, 1)
                        .map((item, airplaneIndex) => (
                          <li
                            key={`${index}-${airplaneIndex}`}
                            className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300
                              
                              "
                          >
                            <MdAirplaneTicket size={13} className="m-1" />
                            <p>{item}</p>
                          </li>
                        ))
                    )}
                  </ul>
                  <span className="text-[2em] mt-">
                    {" "}
                    {formattedTotalDuration}
                  </span>
                </div>
              </div>
              <div className="w-full my-3 lg:my-0 ">
                <ul className="flex w-full  justify-center  mx-auto flex-wrap gap-2 md:w-[100%] md:justify-end md:h-[200px] lg:h-[90%]">
                  <li className=" border min-w-[48%] md:min-w-[45%]   border-[#01357E] rounded-lg hover:border-2    ">
                    <div
                      className="flex items-center justify-between border-b text-[#315b97]  h-[50px] rounded-t-md cursor-pointer "
                      onClick={() => {
                        handleClassTab("Economy");
                        handleFlightTimeSelect(item, index);
                      }}
                    >
                      <h1 className="m-2 font-semibold">Economy</h1>
                      <IoIosArrowForward size={20} />
                    </div>
                    <div className="m-2">
                      <div className="flex items-center text-[#01357E] text-[1.3em] ">
                        <span>
                          {(filteredFlights[0]?.economy?.budget || 0) +
                            (filteredFlights[1]?.economy?.budget || 0)}
                        </span>
                        <span className="mx-1 font-semibold">₼</span>
                      </div>
                      <p className="text-[#6E7583] text-[0.6,2em]">
                        Starting price
                      </p>
                    </div>
                  </li>
                  <li className=" border min-w-[48%]  md:min-w-[45%]  border-[#01357E] rounded-lg hover:border-2   ">
                    <div
                      className="flex items-center justify-between border-b  bg-[#315b97] h-[50px] rounded-t-md cursor-pointer  text-white"
                      onClick={() => {
                        handleClassTab("Business");
                        handleFlightTimeSelect(item, index);
                      }}
                    >
                      <h1 className="m-2 font-semibold">Business</h1>
                      <IoIosArrowForward size={20} />
                    </div>
                    <div className="m-2">
                      <div className="flex items-center text-[#01357E] text-[1.3em] ">
                        <span>
                          {(filteredFlights[0]?.business || 0) +
                            (filteredFlights[1]?.business || 0)}
                        </span>
                        <span className="mx-1 font-semibold">₼</span>
                      </div>
                      <p className="text-[#6E7583] text-[0.6,2em]">
                        Starting price
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ----------------Class TAB--------------*/}
      {classtabvisible && (
        <div className="w-full h-full fixed top-0 left-0 z-40 backdrop-blur-md  ">
          <div className="fixed top-0 left-0 z-50 bg-white h-full w-full md:w-[70%] md:left-[16%] md:h-[80%] md:top-[40px] md:rounded-lg drop-shadow-md md:p-3">
            <div className="font-bold m-2 text-[1.2em] workfontb flex justify-between items-center ">
              <h1>Choose a tariff for the flight outbound</h1>
              <button onClick={handleClassTab}>
                <RxCross2 size={25} />
              </button>
            </div>
            <div className="mx-2 my-3 text-[#6E7583] text-[1.1em]">
              <span>
                {fromAirportName}-{toAirportName}⋅
                {(outboundFlightDetails.fare
                  ? selectedReturnDate
                  : selectedOutboundDate
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </div>
            <div className="flex w-[90%] justify-center mx-auto m-2">
              <button
                onClick={() => handleClass("Economy")}
                className={`rounded-l-lg  px-4 py-2 border w-[50%] 
                             ${
                               selectedClass === "Economy"
                                 ? " text-blue-700 border-blue-500 "
                                 : "bg-gray-100 text-black"
                             }`}
              >
                Economy
              </button>
              <button
                onClick={() => handleClass("Business")}
                className={`rounded-r-lg  px-4 py-2 border w-[50%] 
                             ${
                               selectedClass === "Business"
                                 ? " text-blue-700 border-blue-500"
                                 : "bg-gray-100 text-black"
                             }`}
              >
                Business
              </button>
            </div>
            <div id="fares">
              {/* ----------------FARES--------------*/}
              <ul className="flex w-full justify-center mx-auto flex-wrap gap-2 h-[80vh] overflow-y-auto ">
                {selectedClass === "Economy" &&
                  filteredFlights[0]?.economy &&
                  Object.entries(filteredFlights[0].economy).map(
                    ([fare, price]) => {
                      const totalPrice = filteredFlights.reduce(
                        (total, flight) => total + (flight.economy[fare] || 0),
                        0
                      );
                      return (
                        <li
                          id="card"
                          key={fare}
                          className="w-[90%] border-2 max-h-[420px] rounded-lg md:w-[30%] md:min-h-[200px] overflow-y-auto specialscrollbar"
                        >
                          <h3 className="text-[1.3em] capitalize font-semibold m-3">
                            {fare}
                          </h3>
                          <div className="m-3">
                            <p className="font-semibold text-[1.6em]">
                              {totalPrice}₼
                            </p>
                            <p className="text-[#6E7583]">for 1 passenger</p>
                          </div>
                          <div className="w-[90%] mx-auto ">
                            {/* ==================== Button for select============ */}
                            {!outboundFlightDetails.fare && (
                              <button
                                onClick={() =>
                                  handleFareSelection(
                                    fare,
                                    totalPrice,
                                    filteredFlights[0],
                                    true
                                  )
                                }
                                className="w-full h-[40px] text-white mx-auto rounded-md bg-[#37A6DB]"
                              >
                                Select Outbound
                              </button>
                            )}
                            {outboundFlightDetails.fare &&
                              !returnFlightDetails.fare &&
                              bookingData.returnDate && (
                                <button
                                  onClick={() =>
                                    handleFareSelection(
                                      fare,
                                      totalPrice,
                                      filteredFlights[0],
                                      false
                                    )
                                  }
                                  className="w-full h-[40px] text-white mx-auto rounded-md bg-[#37A6DB]"
                                >
                                  Select Return
                                </button>
                              )}
                          </div>
                          <div>
                            {fare === "budget" && (
                              <ul className="m-3">
                                <li className="text-[#58595D] flex items-center my-1">
                                  {" "}
                                  <GiMeal size={18} className="mr-2" />
                                  Economy meals included
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  <MdOutlineLuggage
                                    size={18}
                                    className="mr-2"
                                  />
                                  Hand luggage 1x10 kg
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  {" "}
                                  <MdAirlineSeatReclineExtra
                                    size={18}
                                    className="mr-2"
                                  />
                                  Economy seat
                                </li>
                                <li className="text-[#B6BAC1] flex items-center my-1">
                                  {" "}
                                  <FaSuitcaseRolling
                                    size={18}
                                    className="mr-2"
                                  />
                                  No baggage
                                </li>
                                <li className="text-[#B6BAC1] flex items-center my-1">
                                  <HiMiniReceiptRefund
                                    size={18}
                                    className="mr-2"
                                  />
                                  Refund unavailable
                                </li>
                                <li className="text-[#B6BAC1] flex items-center my-1">
                                  <TbExchange size={18} className="mr-2" />
                                  Changes unavailable
                                </li>
                              </ul>
                            )}
                            {fare === "classic" && (
                              <ul className="m-3">
                                <li className="text-[#58595D] flex items-center my-1">
                                  {" "}
                                  <GiMeal size={18} className="mr-2" />
                                  Economy meals included
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  <MdOutlineLuggage
                                    size={18}
                                    className="mr-2"
                                  />
                                  Hand luggage 1x10 kg
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  {" "}
                                  <MdAirlineSeatReclineExtra
                                    size={18}
                                    className="mr-2"
                                  />
                                  Economy seat
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  {" "}
                                  <FaSuitcaseRolling
                                    size={18}
                                    className="mr-2"
                                  />
                                  Baggage 1x23 kg
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  <HiMiniReceiptRefund
                                    size={18}
                                    className="mr-2"
                                  />
                                  Refund available before departure penalty 75 €
                                  <br />
                                  Refund after departure unavailable
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  <TbExchange />
                                  Changes available before departure penalty 60
                                  €
                                  <br />
                                  Changes after departure unavailable
                                </li>
                              </ul>
                            )}
                            {fare === "plus" && (
                              <ul className="m-3">
                                <li className="text-[#58595D] flex items-center my-1 ">
                                  {" "}
                                  <GiMeal size={18} className="mr-2" />
                                  Economy meals included
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  <MdOutlineLuggage
                                    size={18}
                                    className="mr-2"
                                  />
                                  Hand luggage 1x10 kg
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  {" "}
                                  <MdAirlineSeatReclineExtra
                                    size={18}
                                    className="mr-2"
                                  />
                                  Economy seat
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  {" "}
                                  <FaSuitcaseRolling
                                    size={18}
                                    className="mr-2"
                                  />
                                  Baggage 1x32 kg
                                </li>
                                <li className="text-[#58595D] flex items-center my-1">
                                  <HiMiniReceiptRefund
                                    size={18}
                                    className="mr-2"
                                  />
                                  Refund available before departure penalty 35 €
                                  <br />
                                  Refund after departure available penalty 75 €
                                </li>
                                <li className="text-[#58595D] flex items-center">
                                  <TbExchange />
                                  Changes available before departure
                                  <br />
                                  Changes available after departure penalty 50 €
                                </li>
                              </ul>
                            )}
                          </div>
                        </li>
                      );
                    }
                  )}
                {selectedClass === "Business" &&
                  filteredFlights[0]?.business && (
                    <li
                      id="card"
                      key="business"
                      className="w-[90%] border-2 max-h-[420px] rounded-lg md:w-[30%] md:min-h-[300px] overflow-y-auto specialscrollbar"
                    >
                      <h3 className="text-[1.3em] capitalize font-semibold m-3">
                        Business
                      </h3>
                      <div className="m-3">
                        <p className="font-semibold text-[1.6em]">
                          {(filteredFlights[0]?.business || 0) +
                            (filteredFlights[1]?.business || 0)}
                          ₼
                        </p>
                        <p className="text-[#6E7583]">for 1 passenger</p>
                      </div>
                      <div className="w-[90%] mx-auto">
                        {!outboundFlightDetails.fare && (
                          <button
                            onClick={() =>
                              handleFareSelection(
                                "business",
                                (filteredFlights[0]?.business || 0) +
                                  (filteredFlights[1]?.business || 0),
                                filteredFlights[0],
                                true
                              )
                            }
                            className="w-full h-[40px] text-white mx-auto rounded-md bg-[#37A6DB]"
                          >
                            Select Outbound Business
                          </button>
                        )}

                        {outboundFlightDetails.fare &&
                          !returnFlightDetails.fare &&
                          bookingData.returnDate && (
                            <button
                              onClick={() =>
                                handleFareSelection(
                                  "business",
                                  (filteredFlights[0]?.business || 0) +
                                    (filteredFlights[1]?.business || 0),
                                  filteredFlights[0],
                                  false
                                )
                              }
                              className="w-full h-[40px] text-white mx-auto rounded-md bg-[#37A6DB]"
                            >
                              Select Return Business
                            </button>
                          )}
                      </div>
                      <div>
                        <ul className="m-3">
                          <li className="text-[#58595D] flex items-center my-1">
                            <GiMeal className="mr-2" size={18} />
                            Business class meals included
                          </li>
                          <li className="text-[#58595D] flex items-center my-1">
                            <MdOutlineLuggage size={18} className="mr-2" />
                            Hand luggage 2x10 kg
                          </li>
                          <li className="text-[#58595D] flex items-center my-1">
                            <MdAirlineSeatReclineExtra
                              size={18}
                              className="mr-2"
                            />
                            Business class seat
                          </li>
                          <li className="text-[#58595D] flex items-center my-1">
                            <FaSuitcaseRolling size={18} className="mr-2" />
                            Baggage 2x32 kg
                          </li>
                          <li className="text-[#58595D] flex items-center my-1">
                            <HiMiniReceiptRefund size={18} className="mr-2" />
                            Refund available before departure penalty 60 €
                            <br />
                            Refund after departure available penalty 200 €
                          </li>
                          <li className="text-[#58595D] flex items-center my-1">
                            <GiSofa className="mr-2" size={18} />
                            Access to lounge
                          </li>
                          <li className="text-[#58595D] flex items-center my-1">
                            <MdAirplaneTicket className="mr-2" size={18} />
                            Priority check-in
                          </li>
                          <li className="text-[#58595D] flex items-center my-1">
                            <FaPersonWalkingLuggage
                              className="mr-2"
                              size={18}
                            />
                            Priority boarding
                          </li>
                        </ul>
                      </div>
                    </li>
                  )}
              </ul>
            </div>
          </div>
        </div>
      )}
      {availabletab && (
        <div className="fixed top-[30%] left-[30%] bg-white border-2 drop-shadow-md w-[40%] flex justify-center rounded-lg p-3 ">
          <div className=" flex justify-center flex-col items-center">
            <div className="">
              <ImCross className="w-[50px] h-[50px] text-[#37a6db] m-3" />
            </div>
            <h1 className="text-[0.8em] text-center">
              We are sorry, but there are no flights/seats available on chosen
              date.
            </h1>
            <button
              className="w-[90%] bg-[#37a6db] p-2 text-white rounded-lg m-3 "
              onClick={() => {
                setAvailabletab(false);
              }}
            >
              Okey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation;
