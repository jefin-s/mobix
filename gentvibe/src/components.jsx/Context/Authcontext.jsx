import {  createContext, useEffect, useState } from "react";
export const Authcontext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }   
  }, []);
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <Authcontext.Provider value={{ user, loginUser, logoutUser,searchTerm,setSearchTerm}}>
        
      {children}
      
    </Authcontext.Provider>
  );
};
