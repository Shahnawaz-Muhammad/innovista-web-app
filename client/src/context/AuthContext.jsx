// AuthContext.js

import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [pdfUrl, setPdfUrl] = useState(null);




  const login = async (credentials, event) => {
    try {
      event.preventDefault();
      // Make an API call to authenticate the user and fetch user data
      const response = await fetch("http://192.168.150.134:8080/api/login", {
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

      setUser(user)
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
      value={{ isAuthenticated,setIsAuthenticated, user, setUser, login, logout, pdfUrl, setPdfUrlContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
