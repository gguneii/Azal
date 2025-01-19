import React, { useContext, useState } from "react";
import { DATA } from "../../Context/DataContext";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiAirplaneDeparture } from "react-icons/gi";

function AllDirections({  onCountryClick, inputValue, setInputValue, focusedInput,setFocusedInput,   fromAirportCode, toAirportCode }) {
  const { from } = useContext(DATA);

  const filteredItems = from.filter(
    (item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.code.toLowerCase().includes(inputValue.toLowerCase())
  );

  const Regions = {
    Azerbaijan: filteredItems.filter((item) =>
      item.name.includes("Azerbaijan")
    ),
    Turkey: filteredItems.filter((item) => item.name.includes("Turkiye")),
    Russia: filteredItems.filter((item) => item.name.includes("Russia")),
    Asia: filteredItems.filter(
      (item) =>
        item.zone.includes("Asia") &&
        !item.name.includes("Turkiye") &&
        !item.name.includes("Russia") &&
        !item.name.includes("Azerbaijan")
    ),
    Europe: filteredItems.filter(
      (item) =>
        item.zone.includes("Europe") &&
        !item.name.includes("Turkiye") &&
        !item.name.includes("Russia")
    ),
    Africa: filteredItems.filter((item) => item.zone.includes("Africa")),
  };

  return (
    <div className="absolute top-0 w-full h-full  z-30 bg-opacity-20 backdrop-blur-md">
      <div className="z-20 bg-white ">
        {/* ----------------INPUT--------------- */}
        <div className="flex border rounded-md border-gray-300 focus-within:ring-1 focus-within:ring-blue-500">
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

        {/* ----------------FILTERED REGIONS--------------- */}
        <div>
          <ul className="flex-col overflow-y-auto max-h-[80vh] specialscrollbar pb-[30px]">
          {Object.keys(Regions).map((region) => {
            const items = Regions[region];
            if (items.length > 0) {
              return (
                <li key={region} className="pt-5">
                  <span className="text-[1.1em] font-bold text-gray-700">{region}</span>
                  <ul className="border rounded-lg mt-2">
                    {items
                      .filter((item) => {
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
                      .map((item) => {
                        const cityName = item.name.split(",")[0]; 
                        return (
                          <li
                            key={item.code}
                            className="flex items-center w-[100%] p-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0 rounded-lg"
                            onClick={() => onCountryClick(item)} 
                          >
                            <GiAirplaneDeparture
                              className="min-w-6 min-h-6"
                              color="#cdd5df"
                            />
                            <span className="workfontb p-2 text-[0.95em] font-bold items-center text-ellipsis overflow-hidden whitespace-nowrap">
                              {cityName}
                            </span>
                            <span className="ml-auto text-[0.8em] mr-2 text-[#6E7583]">
                              ({item.code})
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              );
            }
            return null;
          })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AllDirections;
