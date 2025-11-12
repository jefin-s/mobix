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

  const deletewithuserid=(userid)=>{
   return  users.filter((item)=>item.id!=userid)

  }
  return (
    <Usercontext.Provider value={{ users,deletewithuserid }}>{children}</Usercontext.Provider>
  );
};
