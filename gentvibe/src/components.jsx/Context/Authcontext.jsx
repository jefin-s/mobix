import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const Authcontext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate=useNavigate()
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
    navigate('/')
    
  };

  return (
    <Authcontext.Provider
      value={{ user, loginUser, logoutUser, searchTerm, setSearchTerm }}
    >
      {children}
    </Authcontext.Provider>
  );
};
