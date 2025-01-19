import React, { createContext, useContext, useState } from "react";
import Loading from "./Loading";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false); 

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loading />}
    </LoadingContext.Provider>
  );
};
