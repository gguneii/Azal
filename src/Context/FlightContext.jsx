import React, { createContext, useState, useEffect } from "react";

export const Flight = createContext([]);

function FlightContext({ children }) {
  const [outboundFlight, setOutboundFlight] = useState(
    JSON.parse(localStorage.getItem("outboundFlight")) || null
  );
  const [returnFlight, setReturnFlight] = useState(
    JSON.parse(localStorage.getItem("returnFlight")) || null
  );
  const [passengerData, setPassengerData] = useState(
    JSON.parse(localStorage.getItem("passengerData")) || null
  );
  const [formattedTotalDuration, setFormattedTotalDuration] = useState("");

  const [passengerInformation, setPassengerInformation] = useState(
    () => JSON.parse(localStorage.getItem("passengerInformation")) || { adults: 0, children: 0, babies: 0 }
  );
  
  const [ancillaries, setAncillaries] = useState(() => 
    JSON.parse(localStorage.getItem("ancillaries")) || { 
      mealSelection: [], 
      baggage: [], 
      limitedMobility: [] 
    }
  );
  
  
  useEffect(() => {
    localStorage.setItem("ancillaries", JSON.stringify(ancillaries));
  }, [ancillaries]);

  useEffect(() => {
    localStorage.setItem("passengerInformation", JSON.stringify(passengerInformation));
  }, [passengerInformation]);

  useEffect(() => {
    localStorage.setItem("outboundFlight", JSON.stringify(outboundFlight));
  }, [outboundFlight]);

  useEffect(() => {
    localStorage.setItem("returnFlight", JSON.stringify(returnFlight));
  }, [returnFlight]);

  useEffect(() => {
    localStorage.setItem("passengerData", JSON.stringify(passengerData));
  }, [passengerData]);

  useEffect(() => {
    localStorage.setItem("formattedTotalDuration", formattedTotalDuration);
  }, [formattedTotalDuration]);

  


  return (
    <Flight.Provider
      value={{
        outboundFlight,
        setOutboundFlight,
        returnFlight,
        setReturnFlight,
        passengerData,
        setPassengerData,
        formattedTotalDuration,
        setFormattedTotalDuration,
        passengerInformation, 
        setPassengerInformation,
        ancillaries,
        setAncillaries,
      }}
    >
      {children}
    </Flight.Provider>
  );
}

export default FlightContext;
