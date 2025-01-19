import React, { createContext, useState, useEffect, useContext } from "react";
import { getFrom, getOffers, getFlights, getMenuItems, getServices, getExperience } from "../components/Services/api";
import { LoadingContext } from "../components/loading/LoadingContext";

export const DATA = createContext([]);

function DataContext({ children }) {
  const { setLoading } = useContext(LoadingContext); 

  const [from, setFrom] = useState([]);
  const [offers, setOffers] = useState([]);
  const [flights, setFlights] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [services, setServices] = useState([]);
  const [experience, setExperience] = useState([]);
  
  useEffect(() => {
    
    setLoading(true);

    getFrom().then(res => {
      setFrom(res);
      return getOffers();
    }).then(res => {
      setOffers(res);
      return getFlights();
    }).then(res => {
      setFlights(res);
      return getMenuItems();
    }).then(res => {
      setMenuItems(res);
      return getServices();
    }).then(res => {
      setServices(res);
      return getExperience();
    }).then(res => {
      setExperience(res);
      setLoading(false);
    }).catch(() => {

      setLoading(false); 
    });
  }, []);

  return (
    <DATA.Provider value={{ from, offers, flights, menuItems, services, experience }}>
      {children}
    </DATA.Provider>
  );
}

export default DataContext;
