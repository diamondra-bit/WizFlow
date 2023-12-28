import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [numero, setNumero] = useState("");
  
    return (
      <StateContext.Provider value={{ numero, setNumero }}>
        {children}
      </StateContext.Provider>
    );
  };
  
  export const useGlobalState = () => {
    return useContext(StateContext);
  };