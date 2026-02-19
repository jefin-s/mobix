  import { createContext, useEffect, useState } from "react";
  import toast from "react-hot-toast";
  import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
  export const Authcontext = createContext();
  export const AuthProvider = ({ children }) => {
    const navigate=useNavigate()
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
  const[loading,setloading]=useState(true)


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
      sessionStorage.setItem("token",token)
        console.log(token);

        // localStorage.setItem("token",token)
      }
    };
const logoutUser = async () => {

  try {

  
    await axiosInstance.post("/auth/logout");

  } catch (error) {

    console.error("Logout API error:", error);

  }

 
  setUser(null);

  localStorage.removeItem("currentUser");

  sessionStorage.removeItem("token");

  navigate("/");

  toast.success("Logout successfully");

};


    return (
      <Authcontext.Provider
        value={{ user, loginUser, logoutUser, searchTerm, setSearchTerm,loading}}
      >
        {children}
      </Authcontext.Provider>
    );
  };
