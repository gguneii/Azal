import React from "react";
import { IoAirplane } from "react-icons/io5";
import { BsFillFilePersonFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";

function Stepper({ currentStep }) {
  const steps = [
    { icon: <IoAirplane />, label: "Select Flights" },
    { icon: <BsFillFilePersonFill />, label: "Passenger Details" },
    { icon: <FaStar />, label: "Additional Services" },
    { icon: <FaWallet />, label: "Details and Payment" },
    { icon: <GiConfirmed />, label: "Confirmation" },
  ];

  return (
    <div>
      <ul className="bg-white w-[90%] mx-auto h-[50px] rounded-lg flex items-center">
        {steps.map((step, index) => {
          const isPassed = index < currentStep;
          const isCurrent = index === currentStep;

          const stepClasses = isPassed
            ? "text-[#2C8DC7] "
            : isCurrent
            ? "bg-[#37A6DB] text-white  "
            : "text-gray-400 ";

          return (
            <li
              key={index}
              className={`flex items-center py-4 px-4 border-r h-[50px] w-[20%] justify-center ${stepClasses}`}
            >
               {isPassed ? (
                <div className="flex items-center">
                    <div className="min-w-5 min-h-5">{step.icon}</div>
                    <p className="hidden md:block text-[0.7em]">{step.label}</p>
                    <FaCheck className="hidden md:block m-2" />
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="min-w-5 min-h-5">{step.icon}</div>
                  <p className="hidden md:block text-[0.8em] font-semibold p-2">{step.label}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Stepper;
