import { createContext, useEffect, useState } from "react";
import { base_url } from "../../api/api";
import axios from "axios";
import toast from "react-hot-toast";

export const Wishcontext= createContext()
export  const WishProvider=({children})=>{
    const[whishlist,setWhishlist]=useState([])
    const[user,setuser]=useState(null)

    useEffect(()=>{
       const storedUser=JSON.parse(localStorage.getItem("currentUser"))
       if(storedUser){
        setuser(storedUser)
        fethWishlistofUser(storedUser.id)
        
       }
    },[]) 

   const fethWishlistofUser=async(userId)=>{
    try{
        const  response=await axios.get(`${base_url}/users/${userId}`)
        setWhishlist(response.data.whishlist||[])
    }
     catch(error){
        console.log(error)
     }
   }
   const Togglewhishlist =async(product)=>{
      if(!user){
        alert("please login");
        return 
        
      }
      const existing=whishlist.find((item)=>item.id===product.id)
      let updatedWishlist;
      if(existing){
        updatedWishlist=whishlist.filter((item)=>item.id!==product.id)
        toast.success("removed from wishlist")

      }
      else{
        updatedWishlist=[...whishlist,product]
        toast.success("added to whish list")
      }
      setWhishlist(updatedWishlist)

      try{
        await axios.patch(`${base_url}/users/${user.id}`,{
            whishlist:updatedWishlist
        })

      }
      catch(error){
        console.log(error);
        
      }
      
   }
   const alreadyInWishlist=(ProductId)=>{
    return whishlist.some((item)=>item.id===ProductId)
   }
   
   return(
    <Wishcontext.Provider value={{whishlist,Togglewhishlist,alreadyInWishlist}}>
{children}
    </Wishcontext.Provider>
   )
   
}
