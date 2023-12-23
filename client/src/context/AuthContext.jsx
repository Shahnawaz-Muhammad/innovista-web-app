// AuthContext.js

import React, { createContext, useState } from "react";
import { apiUrl } from "../config";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [unAuthorizedUser, setUnAuthorizedUser] = useState(false)
  const [user, setUser] = useState({});
  const [pdfUrl, setPdfUrl] = useState(null);
  const [emailAddress, setEmailAddress] = useState(""); 

 
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
        const errorData = await response.json();
        if (response.status === 401) {
          setUnAuthorizedUser(true)
        } else {
          // Other errors
          toast.error(errorData, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "light",
          });
        }
        return;
      }

      const responseData = await response.json();

      const { token, user } = responseData;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);
      setUnAuthorizedUser(false)

      toast.success("Logged In Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      })
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
      });
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
        emailAddress, 
        setEmailAddress,
        unAuthorizedUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
