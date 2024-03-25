import React from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});