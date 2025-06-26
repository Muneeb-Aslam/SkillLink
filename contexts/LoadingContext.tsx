import React, { useContext, useState, createContext } from "react";

const LoadingContext = createContext(false);

export const useLoading = () => useContext(LoadingContext);

//@ts-ignore
export const LoadingProvider = ({ children }) => {
   const [isLoading, setLoading] = useState(false);

   return (
      //@ts-ignore
      <LoadingContext.Provider value={{ isLoading, setLoading }}>
         {children}
      </LoadingContext.Provider>
   );
};
