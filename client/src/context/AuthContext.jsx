// AuthContext.js

import React, { createContext, useState } from "react";
import { apiUrl } from "../config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [pdfUrl, setPdfUrl] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [email, setEmail] = useState(""); // New state for email

  const generateRandomNumber = () => {
    // Generate a 5-digit random number
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setRandomNumber(randomNum);
    return randomNum;
  };

  const login = async (credentials, event) => {
    try {
      event.preventDefault();
      // Make an API call to authenticate the user and fetch user data
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const responseData = await response.json();
      const { token, user } = responseData;
      // const {category, email} = user

      // Store token and user type in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("category");
    setUser({});
  };

  const setPdfUrlContext = (url) => {
    setPdfUrl(url);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
        pdfUrl,
        setPdfUrlContext,
        randomNumber,
        setRandomNumber,
        generateRandomNumber,
        email, // Include email in the context value
        setEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
