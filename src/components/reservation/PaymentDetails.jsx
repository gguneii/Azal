import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FlightContext, { Flight } from "../../Context/FlightContext";
import { IoPerson } from "react-icons/io5";
import { FaChild } from "react-icons/fa6";
import { MdChildFriendly } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";



function PaymentDetails( { currentStep }) {

  const navigate = useNavigate();
  const [DetailTab, setDetailTab] = useState(false);
  const [prices, setPrices] = useState(null);

  


  const {
    outboundFlight,
    returnFlight,
    passengerData,
    passengerInformation,
    ancillaries
  } = useContext(Flight); 

  const baggage = ancillaries?.baggage || {
    outbound: { adults: [], children: [], babies: [] },
    return: { adults: [], children: [], babies: [] },
  };


  useEffect(() => {
    document.body.style.overflow = DetailTab ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [DetailTab]);

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
    const adultSubtotal = adultTaxes * passengerData?.adults + adultPrice * passengerData?.adults;
    const childrenSubtotal = adultTaxes * passengerData?.children + ChildrenPrice * passengerData?.children;
    const infantSubtotal = passengerData.babies * infantPrice;
    const FinalPrice = adultSubtotal + childrenSubtotal + infantSubtotal +totalBaggagePrice  ;

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

  useEffect(() => {
    handlePrices();
  }, [outboundFlight, returnFlight, passengerData, ancillaries]);

  
  const handleConfirm = () => {

    if (currentStep === 0) {
      navigate("/confirm/passengers");
    } else if (currentStep === 1) {
      const isValid = validatePassengerDetails();

      if (!isValid) {
        return; 
      }
      navigate("/confirm/passengers/ancillaries");
    } else if (currentStep === 2) {
      navigate("/confirm/passengers/ancillaries/review");
    }
  };

  const validatePassengerDetails = () => {
    if (!passengerInformation) return false;
    
    const types = ["adults", "children", "babies"];
    for (const type of types) {
      const passengers = passengerInformation[type];
      if (passengers) {
        for (const passenger of passengers) {
          if (
            !passenger.firstName ||
            !passenger.lastName ||
            !passenger.gender ||
            !passenger.dateofBirth
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };



  return (
    <div>
         {/* ========================== Confirmation tab ================== */}
              <section className='fixed bottom-0  bg-[#C52F5C] h-[220px] p-3 w-full md:flex  md:h-[100px] md:items-center justify-between '>
                <div  className="md:w-[40%]">
                  <div className='flex justify-between flex-wrap  border-b-[0.1px] md:border-b-0 md:border-r border-gray-300 pb-5 
                  gap-3
                  '>
                      <div className='flex text-white items-center'>
                        <IoPerson className='w-[27px] h-[27px] ' />
                        <h3 className='px-1 font-semibold'>Adults:</h3>
                        <h3 className='px-1 font-semibold'>{passengerData?.adults}</h3>
                      </div>
                      {passengerData?.children > 0 ?(
                        <div className='flex text-white items-center'>
                          <FaChild  className='w-[17px] h-[17px] ' />
                          <h3 className='px-1 font-semibold'>Children:</h3>
                          <h3 className='px-1 font-semibold'>{passengerData?.children}</h3>
                      </div>
                      ): null
                      }
                      {passengerData?.babies > 0 ?(
                        <div className='flex text-white items-center'>
                          <MdChildFriendly    className='w-[17px] h-[17px] ' />
                          <h3 className='px-1 font-semibold'>Infants:</h3>
                          <h3 className='px-1 font-semibold'>{passengerData?.children}</h3>
                      </div>
                      ): null
                      }
                    <button className='text-white underline m-3 text-right ml-auto '
                       onClick={() => setDetailTab(true)}
                    >
                      <p className='font-semibold text-right'>
                          Flight details
                      </p>
                    </button>
                  </div>
                </div>
                  <div className="mb-3  md:border-r  mt-3  justify-between md:flex md:justify-center md:items-center border-gray-300 md:w-[25%] text-left px-4">{prices && prices.FinalPrice !== undefined ? (
                            <h1 className="text-[24px] text-white font-bold"> {prices.FinalPrice} ₼</h1>
                    ) : (null)}
                    <span className="text-[#ecc1cb] p-3 ">For all passengers</span>  
                  </div>
                <div className=" w-[100%] md:w-[25%]  flex items-center justify-center  text-center  ">
                  <button className="bg-transparent border-2 w-[90%] h-[40px] rounded-xl text-white mx-auto "
                  onClick={handleConfirm}
                  >Confirm
                  </button>
                 </div>
              </section>
              {/* ========================== Payment Details ================== */}
              {DetailTab && (
                <section className='w-full h-full fixed top-0  bg-white md:bg-black md:bg-opacity-60 '>
                 <div className=" md:w-[600px] md:h-[600px] md:absolute md:top-[40px] md:left-[25%]  md:bg-white md:rounded-lg">
                    <div className="font-semibold text-[1.3em] p-3 flex items-center justify-between">
                      <h3>Detailed Information</h3>
                      <button>
                        <RxCross2
                          onClick={() => setDetailTab(false)}
                          className="text-[1.3em]" />
                      </button>
                    </div>
                    <div className="px-4 py-3 overflow-y-auto specialscrollbar h-[70vh]">
                      <h3 className="font-semibold">Tariffs</h3>
                      <ul className="mt-4 text-[0.9em] overscroll-y-auto  specialscrollbar">
                        <li className=" flex justify-between items-center my-1">
                          <p className="text-[#6E7583;]">Passengers</p>
                          <p className="text-[#2E3034]">Adults:{ passengerData?.adults}</p>
                        </li>
                        <li className=" flex justify-between items-center my-1">
                          <p className="text-[#6E7583;]">Payment</p>
                          <p className="text-[#2E3034]">  {prices ? `${prices.adultPrice * passengerData?.adults}` : null} ₼</p>
                        </li>
                        <li className=" flex justify-between items-center my-1">
                          <p className="text-[#6E7583;]">Taxes and Fees</p>
                          <p className="text-[#2E3034]">  {prices ? `${  prices.adultTaxes * passengerData?.adults}` : null } ₼</p>
                        </li>
                        <li className=" flex justify-between items-center mt-4 border-t py-3">
                          <p className="text-[#6E7583;]">Subtotal</p>
                          <p className="text-[#2E3034]">  {prices ? `${ prices.adultSubtotal}` : '...'} ₼</p>
                        </li>
                      </ul>
                      {passengerData?.children > 0 && (
                        <ul className="text-[0.8em]">
                          <li className="flex justify-between items-center my-1">
                            <p className="text-[#6E7583]">Passengers</p>
                            <p className="text-[#2E3034]">Children: {passengerData.children}</p>
                          </li>
                          <li className="flex justify-between items-center my-1">
                            <p className="text-[#6E7583]">Payment</p>
                            <p className="text-[#2E3034]">
                              {prices
                                ? `${prices.ChildrenPrice * passengerData.children}₼`
                                : null}
                            </p>
                          </li>
                          <li className="flex justify-between items-center my-1">
                            <p className="text-[#6E7583]">Payment</p>
                            <p className="text-[#2E3034]">
                              {prices
                                ? `${prices.adultTaxes * passengerData.children}₼`
                                : null}
                            </p>
                          </li>
                          <li className=" flex justify-between items-center mt-4 border-t py-3">
                            <p className="text-[#6E7583;]">Subtotal</p>
                            <p className="text-[#2E3034]">  {prices ? `${  prices.childrenSubtotal}` : '...'} ₼</p>
                        </li>
                        </ul>
                      )}
                      {passengerData?.babies > 0 && (
                        <ul className="text-[0.8em]">
                          <li className="flex justify-between items-center my-1">
                            <p className="text-[#6E7583]">Passengers</p>
                            <p className="text-[#2E3034]">Infants: {passengerData.babies}</p>
                          </li>
                          <li className="flex justify-between items-center my-1">
                            <p className="text-[#6E7583]">Payment</p>
                            <p className="text-[#2E3034]">
                              {prices
                                ? `${prices.infantPrice * passengerData.babies}₼`
                                : null}
                            </p>
                          </li>
                          <li className="flex justify-between items-center my-1">
                            <p className="text-[#6E7583]">Taxes</p>
                            <p className="text-[#2E3034]">0</p>
                          </li>
                          <li className="flex justify-between items-center mt-4 border-t py-3">
                            <p className="text-[#6E7583;]">Subtotal</p>
                            <p className="text-[#2E3034]">
                              {prices
                                ? `${
                                  prices.infantSubtotal 
                                  }₼`
                                : '...'}
                            </p>
                          </li>
                        </ul>
                      )}
                      {prices?.totalBaggagePrice > 0 && (
                          <div>
                            <h3 className="font-semibold">Additional Services</h3>
                            <ul className="text-[0.8em]">
                              <li className=" flex justify-between items-center my-1">
                                <p className="text-[#6E7583;]">Service</p>
                                <p className="text-[#2E3034]">Baggage</p>
                              </li>
                              <li className=" flex justify-between items-center my-1">
                                <p className="text-[#6E7583;]">Payment</p>
                                <p className="text-[#2E3034]"> {prices ? `${prices.totalBaggagePrice}` : null} ₼</p>

                              </li>
                              <li className=" flex justify-between items-center my-1">
                                <p className="text-[#6E7583;]">Taxes and Fees</p>
                                 <p className="text-[#2E3034]"> 0 ₼ </p>
                              </li>
                              <li className=" flex justify-between items-center mt-4 border-t py-3">
                                  <p className="text-[#6E7583;]">Subtotal</p>
                                  <p className="text-[#2E3034]"> {prices ? `${prices.totalBaggagePrice}` : null} ₼</p>
                              </li>
                            </ul>
                                  
                          </div>
                        )}

                      <h3 className="font-semibold mt-5">Flights</h3>
                      {outboundFlight.fromAirportCode !== 'BAK' || outboundFlight.fromAirportCode !== 'BAK' ? (
                          <ul className=" text-[0.9em] border-b">
                            <li className=" flex justify-between items-center my-1">
                              <p className="text-[#6E7583;]">Outbound</p>
                              <p className="text-[#2E3034]">{ outboundFlight?.fromAirportName} -BAK, {outboundFlight?.flightNumber[0]} </p>
                            </li>
                            <li className=" flex justify-between items-center my-1">
                              <p className="text-[#6E7583;]">Fare Basis Code</p>
                              <p className="text-[#2E3034]">XK0R1ADA</p>
                            </li>  
                            <li className=" flex justify-between items-center my-1">
                              <p className="text-[#6E7583;]">Outbound</p>
                              <p className="text-[#2E3034]">BAK-{ outboundFlight?.toAirportName}, {outboundFlight?.flightNumber[1]} </p>
                            </li>
                            <li className=" flex justify-between items-center my-1">
                              <p className="text-[#6E7583;]">Fare Basis Code</p>
                              <p className="text-[#2E3034]">PK0P2ADA</p>
                            </li>  
                          </ul>
                        ) : (
                          <ul className=" text-[0.9em] border-b">
                          <li className=" flex justify-between items-center my-1">
                            <p className="text-[#6E7583;]">Outbound</p>
                            <p className="text-[#2E3034]">{ outboundFlight?.fromAirportName} -{outboundFlight?.toAirportName}, {outboundFlight?.flightNumber[0]} </p>
                          </li>
                          <li className=" flex justify-between items-center my-1">
                            <p className="text-[#6E7583;]">Fare Basis Code</p>
                            <p className="text-[#2E3034]">PC0D5ADA</p>
                          </li>  
                        </ul>
                      )}
                      {returnFlight ? (
                        <>
                           {outboundFlight.fromAirportCode !== 'BAK' || outboundFlight.fromAirportCode !== 'BAK' ? (
                          <ul className=" text-[0.9em] ">
                            <li className=" flex justify-between items-center my-1">
                              <p className="text-[#6E7583;]">Outbound</p>
                              <p className="text-[#2E3034]">{ outboundFlight?.toAirportName}-BAK  , {returnFlight?.flightNumber[1]} </p>
                            </li>
                            <li className=" flex justify-between items-center my-1">
                              <p className="text-[#6E7583;]">Fare Basis Code</p>
                              <p className="text-[#2E3034]">PK0R1ADA</p>
                            </li>  
                            <li className=" flex justify-between items-center my-1">
                              <p className="text-[#6E7583;]">Outbound</p>
                              <p className="text-[#2E3034]"> BAK-{ outboundFlight?.fromAirportName} , {returnFlight?.flightNumber[2]} </p>
                            </li>
                            <li className=" flex justify-between items-center my-1">
                              <p className="text-[#6E7583;]">Fare Basis Code</p>
                              <p className="text-[#2E3034]">PK0P2ADA</p>
                            </li>  
                          </ul>
                        ) : (
                          <ul className=" text-[0.9em] ">
                          <li className=" flex justify-between items-center my-1">
                            <p className="text-[#6E7583;]">Outbound</p>
                            <p className="text-[#2E3034]">{ outboundFlight?.toAirportName} -{outboundFlight?.fromAirportName}, {returnFlight?.flightNumber[0]} </p>
                          </li>
                          <li className=" flex justify-between items-center my-1">
                            <p className="text-[#6E7583;]">Fare Basis Code</p>
                            <p className="text-[#2E3034]">PC0D5ADA</p>
                          </li>  
                        </ul>
                      )}
                        </>
                        ) : (null)}
                    </div>
                    <div className="w-full h-[10vh] bottom-0 fixed flex justify-center border-t-2 md:relative md:rounded-b-lg bg-white font-semibold">
                       {prices && prices.FinalPrice !== undefined ? (
                          <h1 className="text-[24px] text-[#C52F5C] md:mt-3">Total: {prices.FinalPrice} ₼</h1>
                        ) : (null)} 
                    </div>  
                 </div>
               </section>
              )}      

    </div>
  )
}

export default PaymentDetails