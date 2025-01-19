import React, { useState, useContext } from "react";
import { Flight } from "../../Context/FlightContext";
import { FiEdit2 } from "react-icons/fi";
import { IoSwapHorizontalOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdAirplaneTicket } from "react-icons/md";
import { IoAirplane } from "react-icons/io5";



function FlightInfo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { outboundFlight, returnFlight, passengerData, formattedTotalDuration } = useContext(Flight); 

  

  return (
    <div >
        {!isExpanded && (
        <div
          className="flex justify-between items-center cursor-pointer border py-3 w-[90%] bg-white mx-auto mb-6 rounded-lg md:hidden"
          onClick={() => setIsExpanded(true)}
        >
          <div>
            <div className="text-black font-semibold flex items-center mx-2">
              {outboundFlight?.fromAirportName}
              <span className="mx-2">
                {returnFlight ? <IoSwapHorizontalOutline /> : <IoIosArrowRoundForward />}
              </span>
              {outboundFlight?.toAirportName}
            </div>
            <div className="text-gray-500 text-sm mx-2 flex">
              <span>
                  {new Date(outboundFlight.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
              </span>
              <span>
                {returnFlight?.date && (
                  " - " 
              )}
              </span>
              <span>
                {returnFlight?.date &&
                  new Date(returnFlight.date).toLocaleDateString("en-GB", {
                    month: "short",
                    day: "2-digit",
                  })}
                ,
              </span>
              <span className="flex mx-1">
                {(passengerData?.adults || 0) + (passengerData?.children || 0) + (passengerData?.babies || 0)}
                <p className="mx-1">passenger</p>
              </span>
            </div>
          </div>
        </div>
      )}
      {/*  =========== FLight detail ========= */}
      {isExpanded && (
        <div>
          <div className="bg-white w-[90%] mx-auto rounded-lg border my-2 md:hidden" >
          <div className="  my-3 flex  items-center justify-between">
            <div className="flex flex-wrap">
              <div className="p-2 rounded-full mi-w-[40px] m-1 bg-[#F4F5F5] flex  items-center justify-center">
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
              <div className="flex">
                {outboundFlight?.flightNumber &&
                      (outboundFlight?.fromAirportName !== "BAK" &&
                      outboundFlight?.toAirportName !== "BAK"
                      ? outboundFlight.flightNumber.slice(0, 2) 
                      : [outboundFlight.flightNumber[0]] 
                      ).map((flight, index) => (
                      <div
                      key={`flight-${index}`}
                      className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-2 rounded-3xl border-gray-300 "
                    >
                      <MdAirplaneTicket size={12} className="m-1" />
                      <p>{flight}</p>
                      </div>
                  ))}
              </div>
              <div className="flex">
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
              </div>
            </div>
            <span className="text-[#6E7583] m-2 text-[0.9em] ">
              { formattedTotalDuration}
            </span>
          </div>
          <section className='flex  justify-between py-4'>
              {/* ==================LINE============ */}
                <div id='line' className="flex flex-col items-center m-2 ">
                  <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                  <div className="border h-10 border-black"></div>
                  {outboundFlight?.fromAirportName !== "BAK" || outboundFlight?.toAirportName !== "BAK" && (
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
          </div>
          {returnFlight && (
             <div className="bg-white w-[90%] mx-auto rounded-lg border my-2" >
             <div className="  my-3 flex  items-center justify-between">
               <div className="flex flex-wrap">
                 <div className="p-2 rounded-full mi-w-[40px] m-1 bg-[#F4F5F5] flex  items-center justify-center">
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
                 <div className="flex">
                   {returnFlight?.flightNumber &&
                         (returnFlight?.fromAirportName !== "BAK" &&
                          returnFlight?.toAirportName !== "BAK"
                         ? returnFlight.flightNumber.slice(0, 2) 
                         : [returnFlight.flightNumber[0]] 
                         ).map((flight, index) => (
                         <div
                         key={`flight-${index}`}
                         className="flex items-center m-1 text-[#6e7583] text-[0.7em] font-semibold border p-2 rounded-3xl border-gray-300 "
                       >
                         <MdAirplaneTicket size={12} className="m-1" />
                         <p>{flight}</p>
                         </div>
                     ))}
                 </div>
                 <div className="flex">
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
                 </div>
               </div>
               <span className="text-[#6E7583] m-2 text-[0.9em] ">
                 { formattedTotalDuration}
               </span>
             </div>
             <section className='flex  justify-between py-4'>
                 {/* ==================LINE============ */}
                   <div id='line' className="flex flex-col items-center m-2 ">
                     <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                     <div className="border h-10 border-black"></div>
                     {returnFlight?.fromAirportName !== "BAK" || returnFlight?.toAirportName !== "BAK" && (
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
             </div>
          )}
        </div>
      )
      }
    {/*  =========== FLight detail DESKTOP========= */}
      <section className="hidden md:flex w-[90%] mx-auto mb-3">
        <div className={`bg-white min-h-[180px] rounded-lg border flex ${
            returnFlight ? "w-[50%]" : "w-full"
          }`}>
          <div className="flex flex-col justify-around p-2 border-r">
            <div>
              <div className="text-[#6E7583] text-[0.9em]"> 
              {new Date(outboundFlight.date).toLocaleDateString("en-GB", {
                weekday: "short",
              })}
              </div>
              <div className="text-[#01357E] text-[2em] mt-10">
              {new Date(outboundFlight.date).toLocaleDateString("en-GB", {
                day: "2-digit",
              })}
              </div>
              <div className="text-[#01357E ]">
              {new Date(outboundFlight.date).toLocaleDateString("en-GB", {
                month: "long", 
              })}
              </div>
            </div>
          </div>
          <div className="w-full p-2">
            <div>
              <div className="flex justify-between w-full ">
                <div className="m-2">
                  <p className="">
                    {outboundFlight.fromAirportName} — {outboundFlight.toAirportName}, Terminal 1
                  </p>
                  <p className="text-gray-600 capitalize">
                  {["budget", "classic", "plus"].includes(outboundFlight.fare.toLowerCase())
                  ? "Economy"
                  : "Business"}
                    / {outboundFlight.fare}
                  </p>
                  <p >
                    Flights: {outboundFlight?.flightNumber &&
                    (outboundFlight?.fromAirportName !== "BAK" &&
                    outboundFlight?.toAirportName !== "BAK"
                      ? outboundFlight.flightNumber.slice(0, 2) 
                      : [outboundFlight.flightNumber[0]] 
                    ).map((flight, index) => (
                      <span key={index}>
                        {flight}
                        {index < outboundFlight.flightNumber.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex flex-col justify-between ">
                  <div className="flex ">
                    <div className="bg-[#F4F5F5] p-2 w-9 h-9 flex items-center justify-center rounded-full">
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
                    </div>
                    <div className="bg-[#F4F5F5] text-[#6E7583] w-10 h-6 flex items-center justify-center rounded-2xl p-4 mx-2">
                      {outboundFlight?.fromAirportCode}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex mx-2 my-3 w-full justify-between mt-7">
                <div className="flex flex-wrap">
                  <div className="text-[1.3em]">
                  { outboundFlight.flightTime?.start } 
                  </div>
                  <div className=" flex flex-col md:flex-row items-center m-2 ">
                        <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                        <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[50px]"></div>
                        {returnFlight?.fromAirportName !== "BAK" && returnFlight?.toAirportName !== "BAK" && (
                        <div className="w-2 h-2 bg-black rounded-full my-1 mx-1"></div>
                        )}
                        <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[50px]"></div>
                      <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                  </div>
                  <div className="text-[1.3em]">
                  { outboundFlight.flightTime?.end }
                  </div>  
                </div>
                <div className="mr-5 text-[#6E7583]" >
                      <div>
                      {outboundFlight?.fromAirportCode !== "BAK" &&
                      outboundFlight?.toAirportCode !== "BAK" ? (
                        <span>1 Stop</span>
                      ) : (
                        <span>No Stops</span>
                      )}
                      </div>
                      <div>
                        {formattedTotalDuration}
                      </div>
                </div>    
              </div>
            </div>
          </div>
        </div>
        {returnFlight && (
            <div className="bg-white min-h-[180px] rounded-lg border flex w-[50%]">
            <div className="flex flex-col justify-around p-2 border-r">
              <div>
                <div className="text-[#6E7583] text-[0.9em]"> 
                {new Date(outboundFlight.date).toLocaleDateString("en-GB", {
                  weekday: "short",
                })}
                </div>
                <div className="text-[#01357E] text-[2em] mt-10">
                {new Date(outboundFlight.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                })}
                </div>
                <div className="text-[#01357E ]">
                {new Date(outboundFlight.date).toLocaleDateString("en-GB", {
                  month: "long", 
                })}
                </div>
              </div>
            </div>
            <div className="w-full p-2">
              <div>
                <div className="flex justify-between w-full ">
                  <div className="m-2">
                    <p className="">
                      {outboundFlight.fromAirportName} — {outboundFlight.toAirportName}, Terminal 1
                    </p>
                    <p className="text-gray-600 capitalize">
                    {["budget", "classic", "plus"].includes(outboundFlight.fare.toLowerCase())
                    ? "Economy"
                    : "Business"}
                      / {outboundFlight.fare}
                    </p>
                    <p >
                      Flights: {outboundFlight?.flightNumber &&
                      (outboundFlight?.fromAirportName !== "BAK" &&
                      outboundFlight?.toAirportName !== "BAK"
                        ? outboundFlight.flightNumber.slice(0, 2) 
                        : [outboundFlight.flightNumber[0]] 
                      ).map((flight, index) => (
                        <span key={index}>
                          {flight}
                          {index < outboundFlight.flightNumber.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between ">
                    <div className="flex ">
                      <div className="bg-[#F4F5F5] p-2 w-9 h-9 flex items-center justify-center rounded-full">
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
                      </div>
                      <div className="bg-[#F4F5F5] text-[#6E7583] w-10 h-6 flex items-center justify-center rounded-2xl p-4 mx-2">
                        {outboundFlight?.fromAirportCode}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex mx-2 my-3 w-full justify-between mt-7">
                  <div className="flex flex-wrap">
                    <div className="text-[1.3em]">
                    { outboundFlight.flightTime?.start } 
                    </div>
                    <div className=" flex flex-col md:flex-row items-center m-2 ">
                          <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                          <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[50px]"></div>
                          {returnFlight?.fromAirportName !== "BAK" && returnFlight?.toAirportName !== "BAK" && (
                          <div className="w-2 h-2 bg-black rounded-full my-1 mx-1"></div>
                          )}
                          <div className="border h-10 border-black md:h-[2px]  md:bg-black md:w-[50px]"></div>
                        <div className="w-2 h-2 rounded-full border-2 border-black"></div>
                    </div>
                    <div className="text-[1.3em]">
                    { outboundFlight.flightTime?.end }
                    </div>  
                  </div>
                  <div className="mr-5 text-[#6E7583]" >
                        <div>
                        {outboundFlight?.fromAirportCode !== "BAK" &&
                        outboundFlight?.toAirportCode !== "BAK" ? (
                          <span>1 Stop</span>
                        ) : (
                          <span>No Stops</span>
                        )}
                        </div>
                        <div>
                          {formattedTotalDuration}
                        </div>
                  </div>    
                </div>
              </div>
            </div>
          </div>
        )
        }
      </section>
    </div>
  )
}

export default FlightInfo;
