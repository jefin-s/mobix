import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const Authcontext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate=useNavigate()
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
 const[loading,setloading]=useState(true)

 const [AccessToken,setAccessToken]=useState(null)
useEffect(() => {
  try {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    }

  } catch (error) {
    console.error("LocalStorage parse error:", error);
    localStorage.removeItem("currentUser");
  }

  setloading(false);

}, []);


  const loginUser = (userData,token) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    if(token){
      setAccessToken(token)
     

      // localStorage.setItem("token",token)
    }
  };
  const logoutUser = () => {
    setUser(null);
    setAccessToken(null)
    localStorage.removeItem("currentUser");
   
    navigate('/')
    toast.success("Logout successfully")
  };

  return (
    <Authcontext.Provider
      value={{ user, loginUser, logoutUser, searchTerm, setSearchTerm,loading}}
    >
      {children}
    </Authcontext.Provider>
  );
};
