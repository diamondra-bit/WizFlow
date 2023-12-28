import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [uid, setUid] = useState('');

  const updateUid = (newUid) => {
    setUid(newUid);
  };

  return (
    <UserContext.Provider value={{ uid, updateUid }}>
      {children}
    </UserContext.Provider>
  );
};
