import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartContext = createContext();

export const StartProvider = ({ children }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
      setIsLoading(false); 
    });
  }, []);
  
  return (
    <StartContext.Provider value={{ isFirstLaunch, isLoading }}>
      {children}
    </StartContext.Provider>
  );
};

export const useStart = () => {
  return useContext(StartContext);
};
