import React, { createContext, useContext, useState } from 'react';

const NotifContext=createContext();

export const NotifProvider =({children})=>{
    const [notification, setNotification] = useState('');

    return(
        <NotifContext.Provider  value={{ notification, setNotification }}>
            {children}
        </NotifContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotifContext);
  };
  