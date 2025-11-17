import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { base_url } from "../../api/api";

export const Usercontext = createContext();
export const Userprovider = ({ children }) => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios(`${base_url}/users`);
        const data = response.data

        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  },[]);

  const deletewithuserid= async(userid)=>{
    try{
       await axios.patch(`${base_url}/users/${userid}`,{ isBlock: !users.find(u => u.id === userid)?.isBlock })
       setUsers((prevuser)=>prevuser.filter((item)=>item.id!==userid))
    }
    catch(error){
      console.log(error);
      
    }
 

  }
  return (
    <Usercontext.Provider value={{ users,deletewithuserid }}>{children}</Usercontext.Provider>
  );
};
