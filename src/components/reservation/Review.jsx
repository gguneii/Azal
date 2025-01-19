import React, { useState, useEffect, useContext } from "react";
import Stepper from "./Stepper";
import { Flight } from "../../Context/FlightContext";
import { IoPerson } from "react-icons/io5";
import { FaChild } from "react-icons/fa";
import { MdChildFriendly } from "react-icons/md";
import FlightInfo from "./FlightInfo";
import PaymentDetails from "./PaymentDetails";
import { MdStarBorderPurple500 } from "react-icons/md";
import { useNavigate } from "react-router-dom";



function Review() {

    const navigate = useNavigate();
  
  const {
    passengerData,
    passengerInformation,
    setPassengerInformation,
    outboundFlight,
    returnFlight,
    ancillaries,
  } = useContext(Flight);

  const [prices, setPrices] = useState(null);

  const baggage = ancillaries?.baggage || {
    outbound: { adults: [], children: [], babies: [] },
    return: { adults: [], children: [], babies: [] },
  };

  const handlePrices = () => {
    if (!outboundFlight || !passengerData) return;

    const totalBaggagePrice = ["outbound", "return"].reduce(
      (total, flightType) =>
        total +
        Object.values(baggage[flightType] || {}).reduce(
          (groupTotal, groupArray) =>
            groupTotal + (groupArray?.reduce((sum, count) => sum + count, 0) || 0),
          0
        ),
      0
    ) * 120;

    const FlighPrice = Math.round(
      outboundFlight.totalPrice + (returnFlight?.totalPrice || 0)
    );
    const adultPrice = Math.round(FlighPrice - FlighPrice * 0.4);
    const adultTaxes = Math.round(FlighPrice - FlighPrice * 0.6);
    const ChildrenPrice = Math.floor(adultPrice * 0.85);
    const infantPrice = Math.floor(adultPrice * 0.1);
    const adultSubtotal =
      adultTaxes * passengerData?.adults + adultPrice * passengerData?.adults;
    const childrenSubtotal =
      adultTaxes * passengerData?.children +
      ChildrenPrice * passengerData?.children;
    const infantSubtotal = passengerData.babies * infantPrice;
    const FinalPrice = adultSubtotal + childrenSubtotal + infantSubtotal + totalBaggagePrice;

    setPrices({
      FinalPrice,
      adultSubtotal,
      infantSubtotal,
      childrenSubtotal,
      FlighPrice,
      adultPrice,
      adultTaxes,
      ChildrenPrice,
      infantPrice,
      totalBaggagePrice,
    });
  };
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const [selectedPayment, setSelectedPayment] = useState(""); 
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleConfirm = () => {
    if (!checkboxChecked) {
      return;
    }

    if (!selectedPayment) {
      return;
    }
    navigate("/confirm/passengers/ancillaries/review/payment");
  };



  useEffect(() => {
    handlePrices();
  }, [outboundFlight, returnFlight, passengerData]);

  return (
    <div className="bg-[#edf1f4] h-full pt-[100px] pb-8">
      <div>
        <Stepper currentStep={3} />
      </div>
      <div>
        <div className="w-[90%] mx-auto p-3 md:flex items-center md:justify-between">
          <h1 className="text-[20px] font-semibold md:text-[1.7em]"> Data Confirmation</h1>
          <div>
            Booking number:
            <span className="text-[#979DA8] bg-white p-1 rounded-md m-2">
              AAAAA
            </span>
          </div>
        </div>
        <div className="bg-white p-4 m-2 md:w-[90%] mx-auto" >
          <h3 className="font-semibold text-[1.3em] my-2 md:text-[24px]">
            {" "}
            Data for a few passengers
          </h3>
          <div className="md:flex md:flex-wrap">
            {["adults", "children", "babies"].map((group) =>
              passengerInformation[group]?.length > 0 ? (
                <div key={group}>
                  {
                    <div
                      key={group}
                      className="bg-white shadow-md rounded-md mb-4 md:w-[550px] md:mx-3"
                    >
                      {passengerInformation[group]?.map((passenger, index) => (
                        <div key={index}>
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
                          <ul className="w-full text-[0.9em]">
                            <li className=" flex gap-[12px] justify-between p-2  ">
                              <span className="text-[#6E7583]">Passenger</span>
                              <span className="capitalize text-[#2E3034]">
                                {passenger.firstName} {passenger.lastName}{" "}
                              </span>
                            </li>
                            <li className=" flex gap-[12px] justify-between p-2  ">
                              <span className="text-[#6E7583]">Type</span>
                              <span className="capitalize text-[#2E3034]">
                                {group}{" "}
                              </span>
                            </li>
                            <li className=" flex gap-[12px] justify-between p-2  ">
                              <span className="text-[#6E7583]">
                                Date of Birth
                              </span>
                              <span className="capitalize text-[#2E3034]">
                                {passenger.dateofBirth}{" "}
                              </span>
                            </li>
                          </ul>
                        </div>
                      )) || null}
                    </div>
                  }
                </div>
              ) : null
            )}
          </div>
          {/* ============ Flight Info =========== */}
          <div>
            <h3 className="font-semibold text-[1.3em] my-2 md:text-[24px]">
              Selected Flights
            </h3>
            <FlightInfo />
          </div>
          {/* ========== Tariffs =============  */}
          <div>
            <h3 className="font-semibold text-[1.3em] my-2 md:text-[24px]">Tariffs</h3>
            <div className="md:flex md:flex-wrap">
              {["adults", "children", "babies"].map((group) =>
                passengerInformation[group]?.length > 0 ? (
                  <div key={group}>
                    {
                      <div
                        key={group}
                        className="bg-white shadow-md rounded-md mb-4 md:w-[550px] md:mx-3"
                      >
                        {passengerInformation[group]?.map(
                          (passenger, index) => (
                            <div key={index}>
                              <div className="bg-[#01357E] p-3 flex items-center text-white text-[1.2em] capitalize rounded-t-lg justify-between">
                                <div className="flex items-center">
                                  {group === "adults" ? (
                                    <IoPerson />
                                  ) : group === "children" ? (
                                    <FaChild />
                                  ) : (
                                    <MdChildFriendly />
                                  )}
                                  <p className="p-2">{group}</p>
                                </div>
                                <div>
                                  {prices && passengerData
                                    ? group === "adults"
                                      ? prices.adultSubtotal
                                      : group === "children"
                                      ? prices.childrenSubtotal
                                      : prices.infantSubtotal
                                    : null}{" "}
                                  ₼
                                </div>
                              </div>
                              <ul className="w-full text-[0.9em]">
                                <li className=" flex gap-[12px] justify-between p-2  ">
                                  <span className="text-[#6E7583]">Tariff</span>
                                  <span className="capitalize text-[#2E3034]">
                                    {prices && passengerData
                                      ? group === "adults"
                                        ? prices.adultPrice *
                                          passengerData?.adults
                                        : group === "children"
                                        ? prices.ChildrenPrice *
                                          passengerData?.children
                                        : prices.infantPrice *
                                          passengerData?.babies
                                      : null}{" "}
                                    ₼
                                  </span>
                                </li>
                                <li className=" flex gap-[12px] justify-between p-2  ">
                                  <span className="text-[#6E7583]">
                                    Taxes and Fees
                                  </span>
                                  <span className="capitalize text-[#2E3034]">
                                    {prices && passengerData
                                      ? group === "adults"
                                        ? prices.adultTaxes *
                                          passengerData?.adults
                                        : group === "children"
                                        ? prices.adultTaxes *
                                          passengerData?.children
                                        : 0
                                      : null}{" "}
                                    ₼
                                  </span>
                                </li>
                                <li className=" flex gap-[12px] justify-between p-2  ">
                                  <span className="text-[#C52F5C] font-bold">
                                    Total
                                  </span>
                                  <span className="capitalize text-[#C52F5C] font-bold">
                                    {prices && passengerData
                                      ? group === "adults"
                                        ? prices.adultSubtotal
                                        : group === "children"
                                        ? prices.childrenSubtotal
                                        : prices.infantSubtotal
                                      : null}{" "}
                                    ₼
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )
                        ) || null}
                      </div>
                    }
                  </div>
                ) : null
              )}
            </div>
          </div>
          {/* ============= Additional Services ============ */}
          <div className="md:w-[550px] md:mx-3">
            <h3 className="font-semibold text-[1.3em] my-2 md:text-[24px]">
              Additional Services
            </h3>
            <div className="bg-[#01357E] p-3 flex items-center text-white text-[1.2em] capitalize rounded-t-lg  ">
              <MdStarBorderPurple500 />
              <span className="capitalize text-white">Additional Services</span>
            </div>
            <div className="bg-white shadow-md rounded-md mb-4">
              <ul className="w-full text-[0.9em]">
                <li className=" flex gap-[12px] justify-between p-2  ">
                  <span className="text-[#6E7583]">Baggage</span>
                  <span className="capitalize text-[#2E3034]">
                  { prices?.totalBaggagePrice} ₼
                  </span>
                </li>
                <li className=" flex gap-[12px] justify-between p-2  ">
                  <span className="text-[#6E7583]">Meals</span>
                  <span className="capitalize text-[#2E3034]">0 ₼</span>
                </li>
                <li className=" flex gap-[12px] justify-between p-2  ">
                  <span className="text-[#C52F5C] font-bold">Total</span>
                  <span className="capitalize text-[#C52F5C] font-bold">
                    { prices?.totalBaggagePrice} ₼
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 m-2 rounded md:w-[90%] mx-auto">
        <h1 className="text-[20px] font-semibold mt-2">Select Payment Method</h1>
        <div>
          <button
            className={`flex items-center border-2 w-full p-4 rounded-md my-2 ${
              selectedPayment === "full" ? "bg-[#F4F6FA] border-blue-500" : ""
            }`}
            onClick={() => setSelectedPayment("full")}
          >
            <input
              type="radio"
              className="rounded-full w-6 h-6 peer"
              checked={selectedPayment === "full"}
              readOnly
            />
            <p className="font-semibold mx-3 text-[1.1em]">Full payment</p>
          </button>
          <button
            className={` items-center border-2 w-full p-4 rounded-md my-2 ${
              selectedPayment === "installments" ? " border-blue-500 bg-[#F4F6FA]" : ""
            } `}
            onClick={() => setSelectedPayment("installments")}
          >
            <div className="flex items-center">
              <input
                type="radio"
                className="rounded-full w-6 h-6 peer"
                checked={selectedPayment === "installments"}
                readOnly
              />
              <p className="font-semibold mx-3 text-[1.1em]">
                Payment by installments
              </p>
            </div>
            {selectedPayment === "installments" && (
              <div className="w-[90%] mx-auto p-4">
                <div
                  className={`flex bg-white border items-center w-full p-3 rounded-md mb-3 cursor-pointer ${
                    selectedInstallment === "option1" ? "border-[#2C8DC7]" : ""
                  }`}
                  onClick={() => setSelectedInstallment("option1")}
                  >
                  <input
                    type="radio"
                    name="installmentOption"
                    className="rounded-full w-6 h-6"
                    checked={selectedInstallment === "option1"}
                    readOnly
                  />
                  <div className="mx-5 my-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="19" fill="none" viewBox="0 0 64 19" className="root_ESF iconMethodTAKSIT_lJY size_20__Il">
                        <path fill="#4F5A5C" d="M31.216 11.315c0-2.253.007-4.505-.008-6.758-.002-.351.069-.48.452-.474 1.608.022 3.218.018 4.826 0 .335-.004.446.096.417.42-.022.246-.008.496-.006.745.002.182.092.204.214.093.172-.157.326-.335.498-.493 1.936-1.783 6.36-1.682 7.868 1.078.212.388.318.103.442-.057 1.58-2.052 4.55-2.835 6.866-1.753 1.858.87 2.776 2.427 3.034 4.416.069.538.067 1.079.067 1.62-.002 2.649-.01 5.296.008 7.943.003.375-.107.464-.467.46a211.832 211.832 0 0 0-4.783 0c-.342.003-.446-.08-.444-.436.015-2.37.008-4.739.002-7.108 0-.277-.007-.56-.067-.828-.15-.657-.53-1.143-1.19-1.344-.666-.202-1.28-.067-1.79.414-.595.56-.776 1.29-.779 2.072-.006 2.253-.012 4.505.01 6.757.003.398-.11.48-.488.475a122.66 122.66 0 0 0-4.652.003c-.47.011-.534-.142-.53-.558.02-2.341.008-4.682.01-7.021 0-.55-.069-1.081-.425-1.53-.829-1.045-2.406-.899-3.05.283-.272.501-.35 1.047-.35 1.612.003 2.224-.01 4.447.008 6.67.004.405-.07.553-.517.544a170.22 170.22 0 0 0-4.784-.007c-.308.002-.396-.086-.395-.393.012-2.281.007-4.563.007-6.846h-.004v.001ZM23.196
                         5.167c.117-.376-.155-.834.145-1.026.24-.155.651-.048.987-.049 
                        1.389-.002 2.778.008 4.167-.009.33-.004.416.095.416.421-.01 4.534-.013 9.066 0 13.6.001.372-.11.456-.466.452-1.608-.019-3.217-.016-4.826 0-.304.003-.416-.07-.396-.384.015-.222.068-.462-.066-.718-1.474 1.421-3.25 1.707-5.149 1.421-2.363-.357-4.04-1.723-4.96-3.87-1.162-2.705-1.098-5.456.348-8.066 1.706-3.08 5.934-4.242 8.83-2.486.333.201.629.461.97.715v-.001Zm-5.22 6.153c.003 2.056 1.613 3.352 3.434 2.767 1.16-.373 1.944-1.665 1.815-2.989-.13-1.329-.863-2.304-1.946-2.59-1.783-.471-3.306.826-3.303 2.812ZM4.808.014c.79 0 1.58.017 2.37-.008.354-.01.479.073.467.457-.03 1.038.01 2.077-.022 3.115-.014.437.138.535.545.523.89-.028 1.784.003 2.676-.014.291-.005.375.087.373.373a161.138 161.138 0 0 0-.001 3.686c.003.315-.11.391-.405.387-.936-.016-1.873.002-2.808-.01-.288-.004-.378.091-.375.38.014 1.199-.007 2.398.01 3.597.015 1.07.544 1.573 1.62 1.573.485
                         0 .965-.065 1.407-.281.212-.104.272-.046.32.166.288 1.238.586 2.475.887 3.71.04.161.033.267-.14.35-2.256 1.084-4.581 1.364-6.914.363-1.756-.755-2.582-2.273-2.785-4.116-.194-1.762-.056-3.537-.074-5.306-.004-.337-.078-.468-.434-.438-.377.031-.761-.014-1.14.013-.317.023-.387-.099-.383-.397C.017 6.909.017 5.68 0 4.45c-.004-.295.087-.38.372-.363.364.022.733-.02 1.095.011.372.033.507-.063.494-.47-.032-1.051.004-2.106-.018-3.158-.008-.353.072-.484.451-.47.804.03 1.609.01 2.414.01v.003Z"></path><path fill="#7ABB45" d="M60.674 12.434c1.697-.084 3.18 1.456 3.157
                      3.124-.026 1.868-1.321 3.184-3.174 3.171-1.823-.013-3.103-1.317-3.091-3.149.01-1.823 1.32-3.15 3.108-3.146Z">
                          
                      </path>
                      </svg>
                    </span>
                    <p>2 / 3 / 6 months</p>
                  </div>
                </div>
                <div
                  className={`flex bg-white border items-center w-full p-3 rounded-md cursor-pointer ${
                    selectedInstallment === "option2" ? "border-[#2C8DC7]" : ""
                  }`}
                  onClick={() => setSelectedInstallment("option2")}
                >
                  <input
                    type="radio"
                    name="installmentOption"
                    className="rounded-full w-6 h-6"
                    checked={selectedInstallment === "option2"}
                    readOnly
                  />
                  <div className="mx-5 my-2">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="79" height="28" fill="none" viewBox="0 0 79 28" className="root_ESF size_20__Il">
                          <path fill="url(#paint0_linear_7150_17857)" fillRule="evenodd" d="M26.38 6.288a57.872 57.872 0 0 0-2.414-2.453c-.109-1.1-.23-2.204-.388-3.296.618-.202 1.24-.383 1.862-.539a38.825 38.825 0 0 1 2.084 2.15c.213.998.388 2.005.53 3.021-.563.367-1.119.742-1.674 1.117Zm-6.886 2.31a144.07 144.07 0 0 1 3.29-.797c.2-1.256.393-2.512.564-3.772A60.037 60.037 0 0 0 21.005.974a47.977 47.977 0 0 0-3.203.252c-.355 1.26-.689 2.525-1.014 3.793a200.49 200.49 0 0 1 2.706 3.578Zm-.339 9.785c-1.328.093-2.66.169-3.992.223-.74-1.509-1.462-3.03-2.163-4.568.697-1.534 1.42-3.06 2.159-4.573 1.332.06 2.668.131 4 .228a401.36 401.36 0 0 1 1.85 4.353 366.742 366.742 0 0 1-1.854 4.337Zm-2.334 4.631c.326 1.265.655 2.516 1.01 3.768a40.71 40.71 0 0 0 3.19.257c.811-.978 1.584-1.989 2.34-3.03-.172-1.252-.36-2.503-.56-3.75a124.538 124.538 0 0 1-3.282-.801 152.05 152.05 0 0 1-2.698 3.556Zm14.115-12.68c.246-.628.476-1.265.689-1.91a42.806 42.806
                          0 0 0-.74-2.903c-.484-.51-.985-.995-1.498-1.467-.276.535-.56 1.062-.852 1.585.313 1.133.588 2.276.826 3.434.535.4 1.061.822 1.575 1.26ZM32.86 14c-.155.89-.342 1.762-.551 2.63l-.591.13-.591.131c-.188-.97-.401-1.934-.64-2.887.239-.952.448-1.917.636-2.887.392.08.785.16 1.182.253.208.868.392 1.745.555 2.63Zm-3.45 9.95c.51-.472 1.007-.96 1.495-1.47.28-.953.527-1.922.736-2.9a34.754 34.754 0 0 0-.69-1.91c-.513.435-1.04.856-1.57 1.265a56.034 56.034 0 0 1-.827 3.426c.293.527.577 1.054.857 1.589Zm-1.858 1.913A37.168 37.168 0 0 1 25.47 28a26.822 26.822 0 0 1-1.854-.54c.155-1.087.28-2.182.384-3.282a57.478 57.478 0 0 0 2.41-2.44l.587.393.001.002c.36.242.72.484 1.082.721a45.213 45.213 0 0 1-.526 3.01Zm10.173-2.406h-3.337V5.31l3.337-.936v19.083Zm-32.155.274c2.242 0 3.967-.443 5.195-1.323 1.336-.936 1.992-2.314 1.987-4.143 0-1.243-.463-2.343-1.42-3.279-.789-.805-1.695-1.298-2.701-1.517v-.055c.927-.194 1.72-.632 2.347-1.323.768-.8 1.152-1.791 1.152-2.98 0-1.458-.572-2.646-1.695-3.498-1.203-.94-2.894-1.407-5.082-1.407-2.268 0-4.072.362-5.354 1.079v17.371c1.336.717 3.195 1.075 5.57 1.075ZM3.274 6.524a6.37 6.37 0 0 1 2.08-.333c2.296 0 3.44 1.05 3.445 3.144 0
                          1.188-.326 2.044-.986 2.566-.685.582-1.858.826-3.47.801l-1.069-.03V6.524Zm1.069 7.86-1.069.029v6.81c.576.249 1.315.359 2.188.359 2.54 0 3.825-1.134 3.825-3.363 0-2.651-1.637-3.916-4.944-3.836Zm47.276 9.073h-3.741l-4.916-7.586h-.058v7.586h-3.303V5.31l3.303-.936v10.95h.058l4.67-6.731h3.386l-5.078 6.81 5.68 8.054Zm11.146-.8c-1.34.716-3.115 1.074-5.333 1.074-4.017 0-6.009-1.517-6.009-4.522 0-1.791.823-3.144 2.435-4.054 1.282-.691 3.194-1.184 5.788-1.433v-.8c0-1.632-.982-2.458-2.92-2.458-1.231 0-2.459.304-3.69.91l-.77-1.93c1.533-.741 3.229-1.125 5.058-1.125 3.629 0 5.437 1.707 5.437 5.129v9.208h.004Zm-3.115-7.334c-1.75.22-2.978.552-3.717 1.02-.898.582-1.365 1.488-1.365 2.756 0 1.85 1.035 2.76 3.09 2.76.79 0 1.445-.138 1.992-.412v-6.124Zm11.442-4.526a4.728 4.728 0 0 0-1.532-.249c-.627 0-1.174.11-1.588.363v12.542H64.64V9.39c1.616-.801 3.992-1.13 7.108-1.05l-.656 2.457ZM76.7 23.621c.685 0 1.257-.11 1.696-.303h.004v-2.099c-.305.084-.572.14-.798.14-1.06 0-1.607-.637-1.607-1.93v-8.687h2.4V8.59h-2.4V4.37l-3.333.936v14.286c0 1.13.297 2.065.927 2.786.74.826 1.775 1.243 3.111 1.243Z" clipRule="evenodd">
                          </path><defs><linearGradient id="paint0_linear_7150_17857" x1="43.965" x2="74.157" y1="42.447" y2="-24.901" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F8645C"></stop><stop offset="1" stopColor="#FCE479"></stop></linearGradient></defs>
                        </svg>
                    </span>
                    <p>3 months</p>
                  </div>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="bg-white p-4  rounded md:w-[90%] mx-auto">
        <h1 className="text-[20px] font-semibold mt-2">Should be reviewed and confirmed</h1>
        <div className="border-t mx-2 my-3">
          <div className="w-full text-[#6E7583] bg-[#EDF1F4] h-[100px] md:h-[150px] overflow-y-scroll my-3 text-[0.9em] border p-3 rounded-lg">
            <p>"DEPENDING ON YOUR BILLING CURRENCY, ADDITIONAL CONVERSION CHARGES MAY OCCUR.</p>
            <p>In case of suspicion of unauthorized use of bank cards, or where computer-related
              fraud in relation to a specific person or group of persons is detected, or if there is a
              corresponding notification of the banking system about such cases, or if there are appropriate
              instructions from international air transport and financial organizations, the Airline reserves the right
              to request a passenger to present a credit card (a printed or digital copy) by which the payment for carriage was made,
              and, if necessary, request the written consent of the third party from whose credit card the payment is made to carry
              out such a transaction.
            </p>
            <p>CONDITIONS OF CONTRACT</p>
            <p>NOTICE: If the passenger’s journey involves an ultimate destination or stop in a country other than the country of departure, the Warsaw or Montreal Conventions may be applicable. The Convention governs and, in most cases, limits the liability of carriers for death or personal injury and in respect of loss of or damage to baggage.
              1. As used in this contract, “ticket” means this passenger ticket and baggage check or this itinerary/receipt - an electronic ticket of which these conditions and the notices form part. “Carriage” is equivalent to “transportation”, ”Carrier” means all air carriers that carry or undertake the carrying of the passenger, or his baggage, or perform any other service incidental to such air carriage. \""Electronic ticket\"" means the itinerary receipt issued
              by or on behalf of carrier the Electronic Coupons, or a boarding document, if applicable; \""Warsaw Convention\"" means the Convention for the Unification of Certain Rules Relating to International Carriage by Air signed at WARSAW on October 12th, 1929, or that Convention as amended at the Hague on September 28th, 1955, whichever may be applicable; \""Montreal Convention\"" - means the Convention for the Unification of Certain Rules Relating to
              International Carriage by Air signed in Montreal on May 28th, 1999

              2. Carriage hereunder is subject to the rules and limitations relating to liability established by
              the Warsaw or Montreal Conventions, unless such carriage is not “international carriage” as defined by that Convention.

              3. Since it is not inconsistent with the above carriage and other services performed by each
              carrier are subject to: (1) provisions contained in the ticket, (1) applicable tariffs, (1) carrier’s conditions of carriage
              and related regulations which are made part hereof (and are available on application at the offices of carrier).

              4. Carrier’s name may be abbreviated in the ticket, the full name and it’s Abbreviation being set forth in carrier’s tariffs
              handbook, conditions of carriage, and timetables; carrier’s address shall be the airport of departure shown opposite the first
              abbreviation of carrier’s name in the ticket; the agreed stopping places are those places set forth in this ticket or as shown
              in carrier’s timetable as scheduled stopping places on the passenger’s route; carriage to be performed hereunder by several successive
              carriers is regarded as a single operation.

              5. Any carrier issuing a ticket for carriage over the lines of another Air carrier does so only as its Agent.

              6. Any exclusion or limitation of liability of carrier shall apply also to any agents, servants and representatives of carrier and any person whose aircraft is used by carrier for carriage and its agents, servants and representatives.

              7. Checked baggage will be delivered to bearer of the baggage check. In case of damage to baggage moving in international transportation, complaint must be made in writing to carrier immediately after discovery of damage and, at the latest, within seven days from receipt; in case of delay, complaint must be made within 21 days from the baggage was delivered. See tariffs or conditions of carriage regarding non-international transportation.

              8. This ticket is valid for one year from date of issue, except as otherwise provided in this ticket, in carrier's tariffs, conditions of carriage or related regulations. The fare for carriage hereunder is subject to change prior to commencement of carriage. Carrier may refuse transportation if the applicable fare has not been paid.

              9. Carrier undertakes to use its best efforts to carry the passenger and baggage with reasonable dispatch.Times shown in timetables or elsewhere are not guaranteed and form no part of this contract. Carrier may without notice substitute alternate carriers or aircraft, and may alter or omit stopping places shown on the ticket in case of necessary. Schedules are subject to change without notice. Carrier assumes no responsibility for connecting flights

              10. Passengers shall comply with Government travel requirements, present exit, entry and other required documents and arrive at airport by time fixed by carrier or, if no time is fixed, early enough to complete departure procedures.

              11. No agent, servant or representative of carrier has authority to alter, modify or waive any provisions of this contract. Carrier reserves the right to refuse carriage to any person who has acquired a ticket by violating any of applicable law or carrier’s tariffs, rules or regulations. Passenger Ticket and Baggage Check are issued by the carrier whose name is specified in the “Issued by” section of the ticket or baggage check"</p>
          </div>
          <div className="flex items-center md:hidden">
            <input type="checkbox" 
                className={`w-7 h-7 border-2  ${ !checkboxChecked ? "border-[#C52F5C]" : ""}`}
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
            <h5 className="text-[0.9em] p-3">I read and confirm Conditions of tickets purchase, General rules of passenger, baggage and cargo transportation, Privacy policy.</h5>
          </div>
        </div>
        <div className="flex  mx-auto  items-center ">
          <div className="hidden items-center md:flex">
            <input type="checkbox"
              className={`w-7 h-7 border-2  ${ !checkboxChecked ? "border-[#C52F5C]" : ""}`}
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}

            />
            <h5 className={`text-[0.9em] p-3 w-[70%] ${ !checkboxChecked ? "text-[#C52F5C]" : ""}`}>I read and confirm Conditions of tickets purchase, General rules of passenger, baggage and cargo transportation, Privacy policy.</h5>
          </div>
          <div className="text-[#2E3034] mx-3">Total: <span className="text-[24px] md:text-[30px]">{prices?.FinalPrice}₼</span></div>
          <button
          className={`bg-[#C52F5C] text-white p-3 rounded-lg w-[60%] md:w-[300px] ${
            !checkboxChecked || !selectedPayment ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleConfirm}
          disabled={!checkboxChecked || !selectedPayment}
            >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
