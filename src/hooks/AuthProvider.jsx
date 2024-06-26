import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    const storedUserData = JSON.parse(sessionStorage.getItem("userData"));

    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      setUserData(storedUserData);
    }
  }, []);

  const login = (authResp) => {
    setIsLoggedIn(true);
    setUserData(authResp);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userData", JSON.stringify(authResp));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userData");
  };

  const value = { isLoggedIn, userData, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
