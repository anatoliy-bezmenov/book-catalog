import React, { createContext, useState, useContext, useEffect } from 'react';
import { getToken, getUser, removeToken, setDataToStorage } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const checkToken = () => {
      setToken(getToken());
    };
    checkToken();
    const checkUser = () => {
      setUser(getUser());
    };
    checkUser();
  }, [token, user]);

  const login = (token, email, name) => {
    setDataToStorage({ token, email, name });
    setToken(token);
    setUser({ email, name });
  };  

  const logout = () => {
    removeToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};