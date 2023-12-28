// IconeContext.js
import React, { createContext, useContext, useState } from 'react';

const IconeContext = createContext();

export function useIconeContext() {
  return useContext(IconeContext);
}

export function IconeProvider({ children }) {
  const [icone, setIcone] = useState(true);

  const updateIcone = (value) => {
    setIcone(value);
  };

  return (
    <IconeContext.Provider value={{ icone, updateIcone }}>
      {children}
    </IconeContext.Provider>
  );
}
