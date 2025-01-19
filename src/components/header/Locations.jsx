import React, { useContext, useState } from "react";
import { DATA } from "../../Context/DataContext";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiAirplaneDeparture } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import AllDirections from "./AllDirections";

function Locations({
  onCountryClick,
  toggleSearchTab,
  inputValue,
  setInputValue,
  focusedInput,
  setFocusedInput,
  fromAirportCode, 
  toAirportCode,
  allDirectionTab,
  setAllDirectionTab,
}) {

  const { from } = useContext(DATA);
  const handleDirections = () => {
    setAllDirectionTab(true); 
  };


  if (!from || from.length === 0) {
    return console.log('Nope');
  }
  return (
    <div className="">
      <div className="w-full h-full fixed top-0 z-30 bg-opacity-20 backdrop-blur-md">
        <div
            id="fromcountries"
            className="w-full h-full fixed top-0  bg-white z-50  overflow-hidden md:relative md:w-[50%] md:h-[90%] md:top-5 md:left-[25%] md:rounded-md   "
          >
            <div>
              <h3 className="font-bold m-2 text-[1.4em] text-[#333539]">
                Choose direction
              </h3>
              <button
                onClick={toggleSearchTab}
                className="absolute right-6 top-3"
              >
                <RxCross1 size={25} />
              </button>
            </div>
            <div className=" w-[90%] mx-auto relative  ">
              <div>
                {allDirectionTab ? (
                <AllDirections
                onCountryClick={onCountryClick}
                inputValue={inputValue}
                setInputValue={setInputValue}
                focusedInput={focusedInput}
                  setFocusedInput={setFocusedInput}
                  fromAirportCode={fromAirportCode} 
                  toAirportCode={toAirportCode} 
                />
                ) : (
                    <div className="">
                      <div className="flex border rounded-md border-gray-300 focus-within:ring-1 focus-within:ring-blue-500 ">
                      <input
                      type="text"
                      className="w-full p-2 outline-none rounded-md peer workfontb"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder=""
                      onFocus={() => setFocusedInput(focusedInput)} 
                    />
                        <span className="p-2">
                          <FaMagnifyingGlass size={20} color="#333539" />
                        </span>
                        <label
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-2 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                        >
                          {focusedInput === "from" ? "From" : "To"}
                        </label>
                      </div>
                      <ul className="flex-col overflow-y-auto max-h-[75vh] specialscrollbar my-3 ">
                        {inputValue &&
                          from.filter((item) => {
                            if (focusedInput === "from" && item.code === toAirportCode) {
                              return false; 
                            }
                            if (focusedInput === "to" && item.code === fromAirportCode) {
                              return false; 
                            }
                            return (
                              item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                              item.code.toLowerCase().includes(inputValue.toLowerCase())
                            );
                          })
                            .map((item) => (
                              <li
                                key={item.code}
                                className="flex items-center w-[100%] p-1 cursor-pointer hover:bg-gray-100"
                                onClick={() => onCountryClick(item)}
                              >
                                <GiAirplaneDeparture className="min-w-6 min-h-6" color="#cdd5df" />
                                <span className="workfontb p-2 text-[0.95em] font-bold items-center text-ellipsis overflow-hidden whitespace-nowrap">
                                  {item.name}
                                </span>
                                <span className="ml-auto mr-2 text-[#6E7583]">{item.code}</span>
                              </li>
                            ))}
                      </ul>
                    </div>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDirections()}
              className={`flex w-[90%] mx-auto items-center py-3 my-3 hover:bg-gray-100 ${
                allDirectionTab ? "hidden" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-500 ml-2 "
                width={18}
                height={18}
                fill="#2C8DC7"
                viewBox="1.8 1.66 16.41 16.26"
              >
                <path
                  d="M9.988 1.656a.834.834 0 0 0-.654.333L6.703 4.62A.833.833 0 1 0 
                7.88 5.8l1.286-1.286v6.299L3.86 14.45l.31-1.547a.834.834 0 1 0-1.635-.326l-.723 3.62a.834.834 0 0 0
                .653.981l3.62.723a.832.832 0 0 0 .869-1.282.834.834 0 0 0-.541-.352l-1.747-.349L9.99 12.27l5.34 3.649-1.742.348a.835.835 0 1 0 .327
                1.634l3.62-.723a.833.833 0 0 0 .654-.98l-.724-3.621a.834.834 0 1 0-1.634.326l.31 1.552-5.306-3.627V4.513l1.285 1.286a.833.833
                0 1 0 1.179-1.179l-2.634-2.634a.834.834 0 0 0-.676-.33z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="text-[#2C8DC7] mx-2 workfontb">
                All Directions
              </span>
            </button>
        </div>
      </div>
   </div>
  );
}

export default Locations;
