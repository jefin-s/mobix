import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { base_url } from "../../api/api";

export const Usercontext = createContext();

export const Userprovider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token"); // ✅ FIXED

        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await axios.get(
          `${base_url}/AdminUser/viewalluser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data.data);

      } catch (err) {
        console.log("Fetch Error:", err.response);
      }
    };

    fetchUser();
  }, []);

  // ✅ Correct Block/Unblock
  const deletewithuserid = async (userid) => {
    try {
      const token = sessionStorage.getItem("token");

      const selectedUser = users.find(u => u.id === userid);

      await axios.put(
        `${base_url}/AdminUser/block/${userid}?status=${!selectedUser.isBlock}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      // Update UI immediately
      setUsers(prev =>
        prev.map(user =>
          user.id === userid
            ? { ...user, isBlock: !user.isBlock }
            : user
        )
      );

    } catch (error) {
      console.log("Block Error:", error.response);
    }
  };
  const getDetailedUser = async (id) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await axios.get(
      `${base_url}/AdminUser/detaileduser/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;

  } catch (error) {
    console.log("Detail Error:", error.response);
    return null;
  }
};

  

  return (
    <Usercontext.Provider value={{ users, deletewithuserid,getDetailedUser }}>
      {children}
    </Usercontext.Provider>
  );
};
