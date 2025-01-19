import React, { useContext, useState, useEffect } from "react";
import { Flight } from "../../Context/FlightContext";
import Stepper from "./Stepper";
import FlightInfo from "./FlightInfo";
import PaymentDetails from "./PaymentDetails";
import { IoPerson } from "react-icons/io5";
import { FaChild } from "react-icons/fa";
import { MdChildFriendly } from "react-icons/md";
import { BsSuitcase2Fill } from "react-icons/bs";
import { BsSuitcase2 } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { FaUniversalAccess } from "react-icons/fa";

function Ancillaries() {
  const {
    passengerInformation,
    passengerData,
    ancillaries,
    setAncillaries,
    outboundFlight,
    returnFlight,
  } = useContext(Flight);

  useEffect(() => {
    localStorage.removeItem("ancillaries");
    setAncillaries({
      mealSelection: {
        outbound: {
          adults: [],
          children: [],
          babies: [],
        },
        return: {
          adults: [],
          children: [],
          babies: [],
        },
      },
      baggage: {
        outbound: {
          adults: [],
          children: [],
          babies: [],
        },
        return: {
          adults: [],
          children: [],
          babies: [],
        },
      },
      limitedMobility: [],
    });
  }, []);

  const specialMeals = [
    { name: "Muslim Meal", price: 0 },
    { name: "Diabetic Meal", price: 0 },
    { name: "Non‑Vegetarian Hindu Meal", price: 0 },
    { name: "Asian vegetarian Meal (Indian vegetarian meal)", price: 0 },
    { name: "Western vegetarian Meal", price: 0 },
    { name: "Vegetarian Jain Meal", price: 0 },
    {
      name: "Meal without meat, fish, or seafood. May contain milk, butter, cheese, etc.",
      price: 0,
    },
    { name: "Low-Calorie Meal", price: 0 },
    { name: "Low Fat Meal", price: 0 },
    { name: "Kosher Meal", price: 0 },
    { name: "Seafood Meal", price: 0 },
  ];

  const passengers = [
    ...(passengerInformation?.adults || []),
    ...(passengerInformation?.children || []),
    ...(passengerInformation?.babies || []),
  ];

  const [isBaggageAdded, setIsBaggageAdded] = useState(
    Array(passengers.length).fill(false)
  );

  const handleAddBaggage = (index) => {
    const toggles = [...isBaggageAdded];
    toggles[index] = true;
    setIsBaggageAdded(toggles);
  };

  const handleBaggageChange = (flightType, group, index, change) => {
    setAncillaries((item) => {
      const updatedBaggage = { ...item.baggage };

      if (!updatedBaggage[flightType]) {
        updatedBaggage[flightType] = {
          adults: [],
          children: [],
          babies: [],
        };
      }

      if (!updatedBaggage[flightType][group][index]) {
        updatedBaggage[flightType][group][index] = 0;
      }

      updatedBaggage[flightType][group][index] = Math.max(
        0,
        updatedBaggage[flightType][group][index] + change
      );

      return { ...item, baggage: updatedBaggage };
    });
  };

  const handleMealSelection = (flightType, group, index, meal) => {
    setAncillaries((item) => {
      const updatedMealSelection = { ...item.mealSelection };

      if (!updatedMealSelection[flightType]) {
        updatedMealSelection[flightType] = {
          adults: [],
          children: [],
          babies: [],
        };
      }

      const updatedGroup = [...updatedMealSelection[flightType][group]];
      updatedGroup[index] = meal;

      updatedMealSelection[flightType][group] = updatedGroup;

      return { ...item, mealSelection: updatedMealSelection };
    });
  };

  return (
    <div className="bg-[#edf1f4] h-full pt-[100px]">
      <div className="my-4">
        <Stepper currentStep={2} />
      </div>
      <FlightInfo />
      <section className="pb-[240px]">
        <div className="md:flex md:justify-between m-3 w-[90%] mx-auto my-3 ">
          <h1 className="text-[1.3em] font-semibold">
            Choose services for a comfortable journey
          </h1>
          <p className="text-[0.9em] my-2">
            Booking number:
            <span className="text-[#979DA8] bg-white p-1 rounded-lg">
              AAAAA
            </span>
          </p>
        </div>
        <div className=" w-[90%] mx-auto ">
          {["adults", "children", "babies"].map((group) =>
            passengerInformation[group]?.length > 0 ? (
              <div key={group} className="my-6">
                {passengerInformation[group].map((passenger, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-md mb-4"
                  >
                    <div className="bg-[#01357E] p-3 flex items-center text-white text-[1.2em] uppercase rounded-t-lg">
                      {group === "adults" ? (
                        <IoPerson />
                      ) : group === "children" ? (
                        <FaChild />
                      ) : (
                        <MdChildFriendly />
                      )}
                      <p className="p-2">
                        {passenger.firstName} {passenger.lastName}
                      </p>
                    </div>
                    {/* ================== Baggage =============  */}
                    <div>
                      <div className="flex items-center p-3">
                        <span className="bg-[#2C8DC7] p-3 rounded-md text-white text-[1.3em] m-2">
                          <BsSuitcase2Fill />
                        </span>
                        <h3 className="font-semibold">Extra baggage</h3>
                      </div>
                      <div className="flex flex-wrap">
                        <div className="w-[90%] mx-auto md:w-[40%]">
                          <h3>
                            Outbound:
                            <span className="text-[#6E7583] bg-[#F5F6F8] m-2 p-1 rounded">
                              {outboundFlight?.fromAirportName} -{" "}
                              {outboundFlight?.toAirportName}
                            </span>
                          </h3>
                          <div className="h-[200px] rounded-md my-2">
                            <div className="border rounded-t-lg h-[50%]">
                              <div className="p-5 font-semibold">
                                {outboundFlight?.fare === "budget" ? (
                                  <div>
                                    <span className="text-[#6E7583]">
                                      <BsSuitcase2 />
                                    </span>
                                    <span className="text-[12px] text-[#6E7583]">
                                      Free baggage is not included in the
                                      selected tariff
                                    </span>
                                  </div>
                                ) : outboundFlight?.fare === "classic" ? (
                                  <div>
                                    <span>
                                      <BsSuitcase2 />
                                    </span>
                                    <span className="text-[0.9em] mr-3">
                                      1 X 23KG
                                    </span>
                                    <span className="text-[0.9em] text-[#6E7583]">
                                      Free
                                    </span>
                                  </div>
                                ) :
                                    outboundFlight?.fare === "plus" ? (
                                  <div>
                                    <span>
                                      <BsSuitcase2 />
                                    </span>
                                    <span className="text-[0.9em] mr-3">
                                      1 X 32KG
                                    </span>
                                    <span className="text-[0.9em] text-[#6E7583]">
                                      Free
                                    </span>
                                  </div>
                                ) : outboundFlight?.fare === "business" ? (
                                  <div>
                                    <span>
                                      <BsSuitcase2 />
                                    </span>
                                    <span className="text-[0.9em] mr-3">
                                      2 X 32KG
                                    </span>
                                    <span className="text-[0.9em] text-[#6E7583]">
                                      Free
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                            <div className="border rounded-b-lg h-[50%]">
                              {ancillaries.baggage?.outbound?.[group]?.[
                                index
                              ] === undefined ? (
                                <button
                                  className="h-full w-full"
                                  onClick={() =>
                                    handleBaggageChange(
                                      "outbound",
                                      group,
                                      index,
                                      1
                                    )
                                  }
                                >
                                  <p className="text-[#2C8DC7]">
                                    + Add paid baggage
                                  </p>
                                </button>
                              ) : (
                                <div className="items-center space-x-4">
                                  <BsSuitcase2 className="text-[1.5em] m-3" />
                                  <div className="flex justify-between items-center w-full">
                                    <div className="flex flex-col">
                                      <span>
                                        {ancillaries.baggage?.outbound?.[
                                          group
                                        ]?.[index] || 0}{" "}
                                        Baggage
                                      </span>
                                      <span>
                                        {(ancillaries.baggage?.outbound?.[
                                          group
                                        ]?.[index] || 0) * 120}{" "}
                                        ₼
                                      </span>
                                    </div>
                                    <div className="flex gap-2 mx-5">
                                      <button
                                        className="w-9 h-8 flex items-center justify-center text-[1.4em] bg-gray-200 rounded-full"
                                        onClick={() =>
                                          handleBaggageChange(
                                            "outbound",
                                            group,
                                            index,
                                            -1
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <button
                                        className="w-9 h-8 flex items-center justify-center text-[1.4em] bg-gray-200 rounded-full"
                                        onClick={() =>
                                          handleBaggageChange(
                                            "outbound",
                                            group,
                                            index,
                                            1
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {returnFlight && (
                          <div className="w-[90%] md:w-[40%] mx-auto">
                            <h3>
                              Inbound:
                              <span className="text-[#6E7583] bg-[#F5F6F8] m-2 p-1 rounded">
                                {returnFlight?.fromAirportName} -{" "}
                                {returnFlight?.toAirportName}
                              </span>
                            </h3>
                            <div className="h-[200px] rounded-md my-2">
                              <div className="border rounded-t-lg h-[50%]">
                                <div className="p-5 font-semibold">
                                  {returnFlight?.fare === "budget" ? (
                                    <div>
                                      <span className="text-[#6E7583]">
                                        <BsSuitcase2 />
                                      </span>
                                      <span className="text-[12px] text-[#6E7583]">
                                        Free baggage is not included in the
                                        selected tariff
                                      </span>
                                    </div>
                                  ) : returnFlight?.fare === "classic" ? (
                                    <div>
                                      <span>
                                        <BsSuitcase2 />
                                      </span>
                                      <span className="text-[0.9em] mr-3">
                                        1 X 23KG
                                      </span>
                                      <span className="text-[0.9em] text-[#6E7583]">
                                        Free
                                      </span>
                                    </div>
                                  ) : returnFlight?.fare === "plus" ? (
                                    <div>
                                      <span>
                                        <BsSuitcase2 />
                                      </span>
                                      <span className="text-[0.9em] mr-3">
                                        1 X 32KG
                                      </span>
                                      <span className="text-[0.9em] text-[#6E7583]">
                                        Free
                                      </span>
                                    </div>
                                  ) : returnFlight?.fare === "business" ? (
                                    <div>
                                      <span>
                                        <BsSuitcase2 />
                                      </span>
                                      <span className="text-[0.9em] mr-3 ">
                                        2 X 32KG
                                      </span>
                                      <span className="text-[0.9em] text-[#6E7583]">
                                        Free
                                      </span>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              <div className="border rounded-b-lg h-[50%]">
                                {ancillaries.baggage?.return?.[group]?.[
                                  index
                                ] === undefined ? (
                                  <button
                                    className="h-full w-full"
                                    onClick={() =>
                                      handleBaggageChange(
                                        "return",
                                        group,
                                        index,
                                        1
                                      )
                                    }
                                  >
                                    <p className="text-[#2C8DC7]">
                                      + Add paid baggage
                                    </p>
                                  </button>
                                ) : (
                                  <div className="items-center space-x-4">
                                    <BsSuitcase2 className="text-[1.5em] m-3" />
                                    <div className="flex justify-between items-center w-full">
                                      <div className="flex flex-col">
                                        <span>
                                          {ancillaries.baggage?.return?.[
                                            group
                                          ]?.[index] || 0}{" "}
                                          Baggage
                                        </span>
                                        <span>
                                          {(ancillaries.baggage?.return?.[
                                            group
                                          ]?.[index] || 0) * 120}{" "}
                                          ₼
                                        </span>
                                      </div>
                                      <div className="flex gap-2 mx-5">
                                        <button
                                          className="w-9 h-8 flex items-center justify-center text-[1.4em] bg-gray-200 rounded-full"
                                          onClick={() =>
                                            handleBaggageChange(
                                              "return",
                                              group,
                                              index,
                                              -1
                                            )
                                          }
                                        >
                                          -
                                        </button>
                                        <button
                                          className="w-9 h-8 flex items-center justify-center text-[1.4em] bg-gray-200 rounded-full"
                                          onClick={() =>
                                            handleBaggageChange(
                                              "return",
                                              group,
                                              index,
                                              1
                                            )
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ================== Special Meals=============  */}
                    <div>
                      <div className="flex items-center p-3">
                        <span className="bg-[#2C8DC7] p-3 rounded-md text-white text-[1.3em] m-2">
                          <GiMeal />
                        </span>
                        <h3 className="font-semibold">Special Meals</h3>
                      </div>
                      <div className="md:flex ">
                        <div className="p-3 w-[90%] mx-auto md:w-[40%]">
                          <div className="m-3">
                            <h3>
                              Outbound:
                              <span className="text-[#6E7583] bg-[#F5F6F8] m-2 p-1 rounded">
                                {outboundFlight?.fromAirportName} -{" "}
                                {outboundFlight?.toAirportName}
                              </span>
                            </h3>
                          </div>
                          <div>
                            <div>
                              <select
                                className="w-full border border-gray-300 p-2 rounded-md"
                                value={
                                  ancillaries.mealSelection?.outbound?.[
                                    group
                                  ]?.[index] || ""
                                }
                                onChange={(e) =>
                                  handleMealSelection(
                                    "outbound",
                                    group,
                                    index,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select a meal</option>
                                {specialMeals.map((meal, mealIndex) => (
                                  <option key={mealIndex} value={meal.name}>
                                    {meal.name} - {meal.price} ₼
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        {returnFlight && (
                          <div className="p-3 w-[90%] mx-auto md:w-[40%]">
                            <div className="m-3">
                              <h3>
                                Inbound:
                                <span className="text-[#6E7583] bg-[#F5F6F8] m-2 p-1 rounded">
                                  {returnFlight?.fromAirportName} -{" "}
                                  {returnFlight?.toAirportName}
                                </span>
                              </h3>
                            </div>
                            <div>
                              <div>
                                <select
                                  className="w-full border border-gray-300 p-2 rounded-md"
                                  value={
                                    ancillaries.mealSelection?.returnFlight?.[
                                      group
                                    ]?.[index] || ""
                                  }
                                  onChange={(e) =>
                                    handleMealSelection(
                                      "outbound",
                                      group,
                                      index,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select a meal</option>
                                  {specialMeals.map((meal, mealIndex) => (
                                    <option key={mealIndex} value={meal.name}>
                                      {meal.name} - {meal.price} ₼
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* ================== Disabled passengers=============  */}
                    <div>
                      <div className="flex items-center p-3">
                        <span className="bg-[#2C8DC7] p-3 rounded-md text-white text-[1.3em] m-2">
                          <FaUniversalAccess />
                        </span>
                        <h3 className="font-semibold">
                          Passenger with limited mobility
                        </h3>
                      </div>
                      <div className="md:flex w-[90%] mx-auto pb-5">
                        <div className="m-3">
                          <h3 className="font-semibold text-[1.1em]">
                            Situation
                          </h3>
                          <ul className="my-3 md:flex justfiy-bettween items-center">
                            <li className="flex items-center ">
                              <input type="checkbox" className="m-1 w-4 h-4" />
                              <p className="text-[0.9em]">
                                Visually impaired passenger
                              </p>
                            </li>
                            <li className="flex items-center">
                              <input type="checkbox" className="m-1 w-4 h-4" />
                              <p className="text-[0.9em]">
                                Hearing impaired passenger
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="m-3">
                          <h3 className="font-semibold text-[1.1em]">
                            Wheelchair
                          </h3>
                          <ul className="m-3 md:flex justfiy-bettween">
                            <li className="flex items-center">
                              <input type="checkbox" className="m-1 w-4 h-4" />
                              <p className="text-[0.9em]">For ramp</p>
                            </li>
                            <li className="flex items-center">
                              <input type="checkbox" className="m-1 w-4 h-4" />
                              <p className="text-[0.9em]">All the way</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>
      </section>
      <PaymentDetails currentStep={2} />
    </div>
  );
}

export default Ancillaries;
