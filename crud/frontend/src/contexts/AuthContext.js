import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  
  const storedAuth = localStorage.getItem('isAuthenticated');
  const [isAuthenticated, setIsAuthenticated] = useState(storedAuth === 'true');

 
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); 
  };

  
  useEffect(() => {
   
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
