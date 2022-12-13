import React, { createContext, useState, useLayoutEffect } from "react";
import * as SecureStore from 'expo-secure-store';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  async function getItem(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return false;
    }
  }

  const [loggedIn, setLoggedIn] = useState(false);
  const [redirectBack, setRedirectBack] = useState(false);

  useLayoutEffect(() => {
    async function getToken() {
      const token = await getItem('token');
      setLoggedIn(!!token || false);
    }
    getToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        redirectBack: redirectBack,
        setRedirectBack: setRedirectBack,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};