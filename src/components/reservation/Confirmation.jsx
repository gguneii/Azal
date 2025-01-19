import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { MdAirplaneTicket } from "react-icons/md";
import { IoAirplane } from "react-icons/io5";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { GiMeal } from "react-icons/gi";
import { FaSuitcase } from "react-icons/fa6";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { BsSuitcase2Fill } from "react-icons/bs";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import { Flight } from "../../Context/FlightContext";
import PaymentDetails from "./PaymentDetails";
import Stepper from "./Stepper";


function Confirmation() {
  const { outboundFlight, returnFlight, passengerData, formattedTotalDuration } = useContext(Flight); 




  return (
    <div className='pt-[100px bg-[#EDF1F4] mx-auto '>
      <div className="hidden"><Stepper currentStep={0} /></div>
      <div className="w-[90%] mx-auto h-full pb-[260px] ">
        <div className='w-[90%] md:mx-auto lg:w-[80%]  '>
          <h1 className="text-[20px] md:text-[35px]">Confirm selected tickets</h1>
          <h5 className="text-[#6E7583] text-[13px]  ">
            If the selected tickets are displayed correctly, click the “Confirm” button
          </h5>
        </div>
        <div id='card1' className='bg-white p-2 m-2 rounded-md  w-[90%] lg:w-[80%] md:mb-[20px]  md:mx-auto  '>
          <div className=" md:hidden">
            <div id="flightnumberandairplan" className='flex justify-between '>
              <ul className='flex items-center flex-wrap'>
                <li className="p-2 rounded-full mi-w-[40px] m-1 bg-[#F4F5F5] flex  items-center justify-center">
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
                        <span className=" hidden text-[#6E7583] text-[0.8em] md:block">Azerbaijan Airlines</span>
                </li>
                {outboundFlight?.flightNumber &&
                  (outboundFlight?.fromAirportName !== "BAK" &&
                  outboundFlight?.toAirportName !== "BAK"
                    ? outboundFlight.flightNumber.slice(0, 2) 
                    : [outboundFlight.flightNumber[0]] 
                  ).map((flight, index) => (
                    <li
                      key={`flight-${index}`}
                      className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300 "
                    >
                      <MdAirplaneTicket size={13} className="m-1" />
                      <p>{flight}</p>
                    </li>
                  ))}
                {outboundFlight?.airplaneModel &&
                  (outboundFlight?.fromAirportName !== "BAK" &&
                  outboundFlight?.toAirportName !== "BAK"
                    ? outboundFlight.airplaneModel.slice(0, 2) 
                    : [outboundFlight.airplaneModel[0]] 
                  ).map((model, index) => (
                    <li
                      key={`model-${index}`}
                      className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300 "
                    >
                      <IoAirplane size={13} className="m-1" />
                      <p>{model}</p>
                    </li>
                  ))}
              </ul>
              <span className='text-[#6e7583] text-[0.8em]  m-2 '>
                {formattedTotalDuration}
              </span>
            </div>
            <section className='flex border-b-2 justify-between'>
              {/* ==================LINE============ */}
                <div id='line' className="flex flex-col items-center m-2 ">
                  <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                  <div className="border h-10 border-black"></div>
                  {outboundFlight?.fromAirportName !== "BAK" && outboundFlight?.toAirportName !== "BAK" && (
                    <div className="w-1 h-1 bg-black rounded-full my-1"></div>
                  )}
                  <div className="border h-10 border-black"></div>
                  <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                </div>
              {/* ==================Datess============ */}
                  <div className='flex justify-between flex-col'>
                    <div className="flex-col">
                      <div className="">{outboundFlight?.flightTime?.start }</div>
                      <div className="text-[0.7em] text-[#6E7583]">
                      {new Date(outboundFlight.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        weekday: "short",
                        month: "short",
                      }).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-col">
                      <div className="">{outboundFlight?.flightTime?.end }</div>
                      <div className="text-[0.7em] text-[#6E7583]">
                      {new Date(outboundFlight.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        weekday: "short",
                        month: "short",
                      }).toUpperCase()}
                      </div>
                    </div>  
                  </div>
                  <div className="flex flex-col items-start   justify-between w-[40%] ">
                    <div className="flex flex-col">
                      <span className="font-semibold">{outboundFlight?.fromAirportName}</span>
                      <span className="text-[0.7em] text-[#6E7583]">
                        {outboundFlight?.fromAirportCode}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{outboundFlight?.toAirportName}</span>
                      <span className="text-[0.7em] text-[#6E7583]">
                        {outboundFlight?.toAirportCode}
                      </span>
                    </div>
                  </div>
            </section>
            <section>
              <div  className="flex items-center  m-3">
                  {(outboundFlight.fromAirportCode !== "BAK" || outboundFlight.toAirportCode !== "BAK") ? (
                      <span className='text-[#2c8dc7]'>
                        <FaPersonWalkingLuggage size={20} />
                      </span>
                    ) : (
                      <span className='text-[#2c8dc7]'>
                        <HiArrowLongRight size={20} />
                      </span>
                    )}
                    <p className="text-[0.8em] p-2">
                      {(outboundFlight.fromAirportCode !== "BAK" || outboundFlight.toAirportCode !== "BAK") 
                        ? "1 stop" 
                        : "Without stops"}
                    </p>
              </div>
              <article className='w-[90%] min-h-[120px] specialbackground rounded-md mx-auto  '>
                  <div className='flex items-center justify-between'>
                    <div className='text-[#01357E] p-3 '>
                      {["budget", "classic", "plus"].includes(outboundFlight.fare)
                        ? "Economy"
                        : "Business"}
                    </div>
                    <div className='m-3 h-[30px] min-w-[60px]  text-[#2C8DC7] flex items-center justify-center capitalize bg-white rounded-full text-[0.9em]'>
                      {outboundFlight?.fare }
                    </div>
                  </div>
                  <div>
                    <ul className='flex m-3 text-[#2C8DC7] gap-2 flex-wrap'>
                      <li className='bg-white p-2 rounded-full'>
                        <GiMeal className='w-[18px] h-[18px]' />
                      </li>
                      <li className='bg-white p-2 rounded-full'>
                        <FaSuitcase  className='w-[18px] h-[18px]' />
                      </li>
                      <li className='bg-white p-2 rounded-full'>
                        <MdAirlineSeatReclineExtra   className='w-[18px] h-[18px]' />
                      </li>
                      {outboundFlight?.fare === "classic" || outboundFlight?.fare === "plus"  ? (
                        <li className="bg-white p-2 rounded-full">
                          <BsSuitcase2Fill className="w-[18px] h-[18px]" />
                        </li>
                      ) : null}
                      {outboundFlight?.fare === "plus" ? (
                        <li className="bg-white p-2 rounded-full">
                          <MdPublishedWithChanges  className="w-[18px] h-[18px]" />
                        </li>
                      ) : null}
                    </ul>
                  </div>
              </article>
            </section>
          </div>
           {/* ==================== Desktopp============== */}
          <div className="hidden md:block lg:flex md:ml-4  lg:justify-between">
              <div >
               <div className="p-2 rounded-full  m-1 bg-[#F4F5F5] hidden md:flex w-[150px]  ">
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
                    <span className=" hidden text-[#6E7583] text-[0.8em] md:block">Azerbaijan Airlines</span>
                </div>
                <div className="flex m-2 items-center">
                <span className="text-[1.7em]">{outboundFlight?.flightTime?.start}</span>  
                <div className="pt-7">
                                <div className=" flex flex-col md:flex-row items-center m-2 ">
                                  <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                                  <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[75px]"></div>
                                    {outboundFlight?.fromAirportName !== "BAK" && outboundFlight?.toAirportName !== "BAK" && (
                                    <div className="w-2 h-2 bg-black rounded-full my-1"></div>
                                  )}
                                  <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[75px]"></div>
                                  <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                                </div>                    
                                <div className="flex justify-between text-[0.6em] font-semibold mx-1">
                                  <span>{outboundFlight?.fromAirportCode}</span>
                                  <span>{outboundFlight?.toAirportCode}</span>
                                </div>
                </div>
                <span className="text-[1.7em]">{outboundFlight?.flightTime?.end }</span>
                </div>
                <div className="flex gap-[130px] mx-2 my-4 ml-6 mb-5">
                      <div>
                          <span className="text-[#979DA8] w-12 h-12">
                            <MdFlightTakeoff />
                          </span>
                          <span className="text-[0.9em]">
                                {outboundFlight?.fromAirportName}, {outboundFlight?.fromAirportCode}
                           </span>  
                          </div>
                       <div>
                      <span className="text-[#979DA8]">
                        <MdFlightLand />
                      </span>
                      <span className="text-[0.9em]">
                        {outboundFlight?.toAirportName}, {outboundFlight?.toAirportCode}
                      </span>  
                  </div>
                </div>
              </div>      
              <div className="flex   justify-between ">
                <div className="flex flex-col justify-between  ">
                  <ul className='flex items-center flex-wrap mt-2'>
                      {outboundFlight?.flightNumber &&
                        (outboundFlight?.fromAirportName !== "BAK" &&
                        outboundFlight?.toAirportName !== "BAK"
                          ? outboundFlight.flightNumber.slice(0, 2) 
                          : [outboundFlight.flightNumber[0]] 
                        ).map((flight, index) => (
                          <li
                            key={`flight-${index}`}
                            className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300 "
                          >
                            <MdAirplaneTicket size={13} className="m-1" />
                            <p>{flight}</p>
                          </li>
                        ))}
                      {outboundFlight?.airplaneModel &&
                        (outboundFlight?.fromAirportName !== "BAK" &&
                        outboundFlight?.toAirportName !== "BAK"
                          ? outboundFlight.airplaneModel.slice(0, 2) 
                          : [outboundFlight.airplaneModel[0]] 
                        ).map((model, index) => (
                          <li
                            key={`model-${index}`}
                            className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300 "
                          >
                            <IoAirplane size={13} className="m-1" />
                            <p>{model}</p>
                          </li>
                        ))}
                  </ul>
                  <div className=' text-[1.5em] m-3   '>
                    {formattedTotalDuration}
                  </div>
                  <div  className="flex items-center  m-3 ">
                      {(outboundFlight.fromAirportCode !== "BAK" || outboundFlight.toAirportCode !== "BAK") ? (
                          <span className='text-[#2c8dc7]'>
                            <FaPersonWalkingLuggage size={20} />
                          </span>
                        ) : (
                          <span className='text-[#2c8dc7]'>
                            <HiArrowLongRight size={20} />
                          </span>
                        )}
                        <p className="text-[0.8em] p-2">
                          {(outboundFlight.fromAirportCode !== "BAK" || outboundFlight.toAirportCode !== "BAK") 
                            ? "1 stop" 
                            : "Without stops"}
                        </p>
                  </div>
                </div>
                <div className=' w-[60%] min-h-[200px] specialbackground rounded-md   '>
                    <div className='flex items-center justify-between'>
                      <div className='text-[#01357E] p-3 '>
                        {["budget", "classic", "plus"].includes(outboundFlight.fare)
                          ? "Economy"
                          : "Business"}
                      </div>
                      <div className='m-3 h-[30px] min-w-[60px]  text-[#2C8DC7] flex items-center justify-center capitalize bg-white rounded-full text-[0.9em]'>
                        {outboundFlight?.fare }
                      </div>
                    </div>
                    <div>
                      <ul className='flex m-3 text-[#2C8DC7] gap-2 flex-wrap'>
                        <li className='bg-white p-2 rounded-full'>
                          <GiMeal className='w-[18px] h-[18px]' />
                        </li>
                        <li className='bg-white p-2 rounded-full'>
                          <FaSuitcase  className='w-[18px] h-[18px]' />
                        </li>
                        <li className='bg-white p-2 rounded-full'>
                          <MdAirlineSeatReclineExtra   className='w-[18px] h-[18px]' />
                        </li>
                        {outboundFlight?.fare === "classic" || outboundFlight?.fare === "plus"  ? (
                          <li className="bg-white p-2 rounded-full">
                            <BsSuitcase2Fill className="w-[18px] h-[18px]" />
                          </li>
                        ) : null}
                        {outboundFlight?.fare === "plus" ? (
                          <li className="bg-white p-2 rounded-full">
                            <MdPublishedWithChanges  className="w-[18px] h-[18px]" />
                          </li>
                        ) : null}
                      </ul>
                    </div>
                </div>   
              </div>
          </div>
        </div>       
        {returnFlight  ? (
          <div id='card1' className='bg-white p-2 m-2 rounded-md  w-[90%] lg:w-[80%]   md:mx-auto  '>
          <div className=" md:hidden">
            <div id="flightnumberandairplan" className='flex justify-between '>
              <ul className='flex items-center flex-wrap'>
                <li className="p-2 rounded-full mi-w-[40px] m-1 bg-[#F4F5F5] flex  items-center justify-center">
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
                        <span className=" hidden text-[#6E7583] text-[0.8em] md:block">Azerbaijan Airlines</span>
                </li>
                {returnFlight?.flightNumber &&
                  (returnFlight?.fromAirportName !== "BAK" &&
                    returnFlight?.toAirportName !== "BAK"
                    ? returnFlight.flightNumber.slice(0, 2) 
                    : [returnFlight.flightNumber[0]] 
                  ).map((flight, index) => (
                    <li
                      key={`flight-${index}`}
                      className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300 "
                    >
                      <MdAirplaneTicket size={13} className="m-1" />
                      <p>{flight}</p>
                    </li>
                  ))}
                {returnFlight?.airplaneModel &&
                  (returnFlight?.fromAirportName !== "BAK" &&
                    returnFlight?.toAirportName !== "BAK"
                    ? returnFlight.airplaneModel.slice(0, 2) 
                    : [returnFlight.airplaneModel[0]] 
                  ).map((model, index) => (
                    <li
                      key={`model-${index}`}
                      className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300 "
                    >
                      <IoAirplane size={13} className="m-1" />
                      <p>{model}</p>
                    </li>
                  ))}
              </ul>
              <span className='text-[#6e7583] text-[0.8em]  m-2 '>
                {formattedTotalDuration}
              </span>
            </div>
            <section className='flex border-b-2 justify-between'>
              {/* ==================LINE============ */}
                <div id='line' className="flex flex-col items-center m-2 ">
                  <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                  <div className="border h-10 border-black"></div>
                  {returnFlight?.fromAirportName !== "BAK" && returnFlight?.toAirportName !== "BAK" && (
                    <div className="w-1 h-1 bg-black rounded-full my-1"></div>
                  )}
                  <div className="border h-10 border-black"></div>
                  <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                </div>
              {/* ==================Datess============ */}
                  <div className='flex justify-between flex-col'>
                    <div className="flex-col">
                      <div className="">{returnFlight?.flightTime?.start }</div>
                      <div className="text-[0.7em] text-[#6E7583]">
                      {new Date(returnFlight.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        weekday: "short",
                        month: "short",
                      }).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-col">
                      <div className="">{returnFlight?.flightTime?.end }</div>
                      <div className="text-[0.7em] text-[#6E7583]">
                      {new Date(returnFlight.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        weekday: "short",
                        month: "short",
                      }).toUpperCase()}
                      </div>
                    </div>  
                  </div>
                  <div className="flex flex-col items-start   justify-between w-[40%] ">
                    <div className="flex flex-col">
                      <span className="font-semibold">{returnFlight?.fromAirportName}</span>
                      <span className="text-[0.7em] text-[#6E7583]">
                        {returnFlight?.fromAirportCode}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{returnFlight?.toAirportName}</span>
                      <span className="text-[0.7em] text-[#6E7583]">
                        {returnFlight?.toAirportCode}
                      </span>
                    </div>
                  </div>
            </section>
            <section>
              <div  className="flex items-center  m-3">
                  {(returnFlight.fromAirportCode !== "BAK" || returnFlight.toAirportCode !== "BAK") ? (
                      <span className='text-[#2c8dc7]'>
                        <FaPersonWalkingLuggage size={20} />
                      </span>
                    ) : (
                      <span className='text-[#2c8dc7]'>
                        <HiArrowLongRight size={20} />
                      </span>
                    )}
                    <p className="text-[0.8em] p-2">
                      {(returnFlight.fromAirportCode !== "BAK" || returnFlight.toAirportCode !== "BAK") 
                        ? "1 stop" 
                        : "Without stops"}
                    </p>
              </div>
              <article className='w-[90%] min-h-[120px] specialbackground rounded-md mx-auto  '>
                  <div className='flex items-center justify-between'>
                    <div className='text-[#01357E] p-3 '>
                      {["budget", "classic", "plus"].includes(returnFlight.fare)
                        ? "Economy"
                        : "Business"}
                    </div>
                    <div className='m-3 h-[30px] min-w-[60px]  text-[#2C8DC7] flex items-center justify-center capitalize bg-white rounded-full text-[0.9em]'>
                      {returnFlight?.fare }
                    </div>
                  </div>
                  <div>
                    <ul className='flex m-3 text-[#2C8DC7] gap-2 flex-wrap'>
                      <li className='bg-white p-2 rounded-full'>
                        <GiMeal className='w-[18px] h-[18px]' />
                      </li>
                      <li className='bg-white p-2 rounded-full'>
                        <FaSuitcase  className='w-[18px] h-[18px]' />
                      </li>
                      <li className='bg-white p-2 rounded-full'>
                        <MdAirlineSeatReclineExtra   className='w-[18px] h-[18px]' />
                      </li>
                      {returnFlight?.fare === "classic" || returnFlight?.fare === "plus"  ? (
                        <li className="bg-white p-2 rounded-full">
                          <BsSuitcase2Fill className="w-[18px] h-[18px]" />
                        </li>
                      ) : null}
                      {returnFlight?.fare === "plus" ? (
                        <li className="bg-white p-2 rounded-full">
                          <MdPublishedWithChanges  className="w-[18px] h-[18px]" />
                        </li>
                      ) : null}
                    </ul>
                  </div>
              </article>
            </section>
          </div>
           {/* ==================== Desktopp============== */}
          <div className="hidden md:block lg:flex md:ml-4  lg:justify-between">
              <div >
               <div className="p-2 rounded-full  m-1 bg-[#F4F5F5] hidden md:flex w-[150px]  ">
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
                    <span className=" hidden text-[#6E7583] text-[0.8em] md:block">Azerbaijan Airlines</span>
                </div>
                <div className="flex m-2 items-center">
                <span className="text-[1.7em]">{returnFlight?.flightTime?.start}</span>  
                <div className="pt-7">
                                <div className=" flex flex-col md:flex-row items-center m-2 ">
                                  <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                                  <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[75px]"></div>
                                    {returnFlight?.fromAirportName !== "BAK" && returnFlight?.toAirportName !== "BAK" && (
                                    <div className="w-2 h-2 bg-black rounded-full my-1"></div>
                                  )}
                                  <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[75px]"></div>
                                  <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                                </div>                    
                                <div className="flex justify-between text-[0.6em] font-semibold mx-1">
                                  <span>{returnFlight?.fromAirportCode}</span>
                                  <span>{returnFlight?.toAirportCode}</span>
                                </div>
                </div>
                <span className="text-[1.7em]">{returnFlight?.flightTime?.end }</span>
                </div>
                <div className="flex gap-[130px] mx-2 my-4 ml-6 mb-5">
                      <div>
                          <span className="text-[#979DA8] w-12 h-12">
                            <MdFlightTakeoff />
                          </span>
                          <span className="text-[0.9em]">
                                {returnFlight?.fromAirportName}, {returnFlight?.fromAirportCode}
                           </span>  
                          </div>
                       <div>
                      <span className="text-[#979DA8]">
                        <MdFlightLand />
                      </span>
                      <span className="text-[0.9em]">
                        {returnFlight?.toAirportName}, {returnFlight?.toAirportCode}
                      </span>  
                  </div>
                </div>
              </div>      
              <div className="flex   justify-between ">
                <div className="flex flex-col justify-between  ">
                  <ul className='flex items-center flex-wrap mt-2'>
                      {returnFlight?.flightNumber &&
                        (returnFlight?.fromAirportName !== "BAK" &&
                          returnFlight?.toAirportName !== "BAK"
                          ? returnFlight.flightNumber.slice(0, 2) 
                          : [returnFlight.flightNumber[0]] 
                        ).map((flight, index) => (
                          <li
                            key={`flight-${index}`}
                            className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300 "
                          >
                            <MdAirplaneTicket size={13} className="m-1" />
                            <p>{flight}</p>
                          </li>
                        ))}
                      {returnFlight?.airplaneModel &&
                        (returnFlight?.fromAirportName !== "BAK" &&
                          returnFlight?.toAirportName !== "BAK"
                          ? returnFlight.airplaneModel.slice(0, 2) 
                          : [returnFlight.airplaneModel[0]] 
                        ).map((model, index) => (
                          <li
                            key={`model-${index}`}
                            className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-1 rounded-3xl border-gray-300 "
                          >
                            <IoAirplane size={13} className="m-1" />
                            <p>{model}</p>
                          </li>
                        ))}
                  </ul>
                  <div className=' text-[1.5em] m-3   '>
                    {formattedTotalDuration}
                  </div>
                  <div  className="flex items-center  m-3 ">
                      {(returnFlight.fromAirportCode !== "BAK" || returnFlight.toAirportCode !== "BAK") ? (
                          <span className='text-[#2c8dc7]'>
                            <FaPersonWalkingLuggage size={20} />
                          </span>
                        ) : (
                          <span className='text-[#2c8dc7]'>
                            <HiArrowLongRight size={20} />
                          </span>
                        )}
                        <p className="text-[0.8em] p-2">
                          {(returnFlight.fromAirportCode !== "BAK" || returnFlight.toAirportCode !== "BAK") 
                            ? "1 stop" 
                            : "Without stops"}
                        </p>
                  </div>
                </div>
                <div className=' w-[60%] min-h-[200px] specialbackground rounded-md   '>
                    <div className='flex items-center justify-between'>
                      <div className='text-[#01357E] p-3 '>
                        {["budget", "classic", "plus"].includes(returnFlight.fare)
                          ? "Economy"
                          : "Business"}
                      </div>
                      <div className='m-3 h-[30px] min-w-[60px]  text-[#2C8DC7] flex items-center justify-center capitalize bg-white rounded-full text-[0.9em]'>
                        {returnFlight?.fare }
                      </div>
                    </div>
                    <div>
                      <ul className='flex m-3 text-[#2C8DC7] gap-2 flex-wrap'>
                        <li className='bg-white p-2 rounded-full'>
                          <GiMeal className='w-[18px] h-[18px]' />
                        </li>
                        <li className='bg-white p-2 rounded-full'>
                          <FaSuitcase  className='w-[18px] h-[18px]' />
                        </li>
                        <li className='bg-white p-2 rounded-full'>
                          <MdAirlineSeatReclineExtra   className='w-[18px] h-[18px]' />
                        </li>
                        {returnFlight?.fare === "classic" || returnFlight?.fare === "plus"  ? (
                          <li className="bg-white p-2 rounded-full">
                            <BsSuitcase2Fill className="w-[18px] h-[18px]" />
                          </li>
                        ) : null}
                        {returnFlight?.fare === "plus" ? (
                          <li className="bg-white p-2 rounded-full">
                            <MdPublishedWithChanges  className="w-[18px] h-[18px]" />
                          </li>
                        ) : null}
                      </ul>
                    </div>
                </div>   
              </div>
          </div>
        </div> 
        ): null}
      </div>
      <PaymentDetails  currentStep={0}/>
    </div>
  )
}

export default Confirmation