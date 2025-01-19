import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

function FlightStatus() {
  const [selectedOption, setSelectedOption] = useState("Arrival");
  const renderInputField = () => {
    switch (selectedOption) {
      case "Arrival":
        return (
          <input
            type="text"
            className="w-full mx-auto rounded-lg m-3 p-3 md:p-1 border"
            placeholder="To"
          />
        );
      case "Departure":
        return (
          <input
            type="text"
            className="w-full mx-auto rounded-lg m-3 p-3 md:p-1 border"
            placeholder="From"
          />
        );
      case "Flight Number":
        return (
          <input
          type="text"
          className="w-full mx-auto rounded-lg m-3 p-3 md:p-1 border"
          placeholder="Enter Flight Number"
          defaultValue="J2"
          onInput={(e) => {
            if (!e.target.value.startsWith("J2")) {
              e.target.value = "J2 ";
            } else {
              const input = e.target.value.slice(2).replace(/\D/g, ""); 
              e.target.value = `J2${input.slice(0, 4)}`;
            }
          }}
          maxLength={6}
        />
      
        );
      case "Route":
        return (
          <>
            <input
              type="text"
              className="w-full mx-auto rounded-lg m-3 p-3 md:p-1 border"
              placeholder="Enter Origin"
            />
            <input
              type="text"
              className="w-full mx-auto rounded-lg m-3 p-3 md:p-1 border"
              placeholder="Enter Destination"
            />
          </>
        );
      default:
        return null;
    }
  };


  return (
      <div className='w-full md:w-[80%] mx-auto sm:bg-white sm:rounded-lg md:flex md:p-1 mt-10 sm:mt-0'>
    
        <div className='md:flex mx-auto w-[90%] gap-2 md:w-[90%]'>
        <select name="" id="serchby" className='w-full md:w-[30%] mx-auto rounded-lg m-3 p-3 md:p-1 border'
           onChange={(e) => setSelectedOption(e.target.value)}
           value={selectedOption}
        >
             <option value="Arrival">Arrival</option>
             <option value="Departure">Departure</option>
              <option value="Flight Number">Flight Number</option>
               <option value="Route">Route</option>
          </select>
          {renderInputField()}
         <select name="flightdate" id="flightdate" className="w-full md:w-[30%] mx-auto rounded-lg m-3 p-3 border" placeholder="Flight Date">
            {Array.from({ length: 6 }).map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() - 2 + index); 
              return (
                <option key={index} value={date.toISOString().split('T')[0]}>
                  {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </option>
              );
            })}
          </select>
           
          </div>
            <div className='w-full mx-auto md:w-[10%] p-4'>
              <button className='text-white bg-[#37A6DB] mx-auto p-3 rounded-xl w-full flex items-center justify-center '>
                  <p className='md:hidden'>Search</p>
                  <span className='m-3'><FaSearch /></span>
              </button>      
            </div>
      </div>
  )
}

export default FlightStatus