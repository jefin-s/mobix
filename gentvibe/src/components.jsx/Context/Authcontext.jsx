import {  createContext, useEffect, useState } from "react";
export const Authcontext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    //  read the  the data of current user inlocal storage set a user
    // using context we can share the userdetails in  any comppont in this project
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }   
  }, []);
  // at the time  of login  butted  ius cliked  store the data in local storage
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
