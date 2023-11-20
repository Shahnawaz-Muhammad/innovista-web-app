// AuthContext.js

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  const login = () => {
    setIsAuthenticated(true);
  
    setUserType(userType); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    
    setUserType('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType,setUserType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
