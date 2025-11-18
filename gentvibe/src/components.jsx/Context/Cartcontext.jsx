  import React, { createContext, useEffect, useState } from "react";
  import axios from "axios";
  import { base_url } from "../../api/api";
import toast from "react-hot-toast";

  export const CartContext = createContext();

  export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (storedUser) {
        setUser(storedUser);
        fetchCart(storedUser.id);
      }
    }, []); 

    const fetchCart = async (userId) => {
      try {
        const res = await axios.get(`${base_url}/users/${userId}`);
        setCart(res.data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const addToCart = async (product) => {
      if (!user) {
       toast.warning("Please log in to add items to cart!");
        return;
      }  

      const existingItem=cart.find((item)=>item.id==product.id)
      let updatedcart;
      if(existingItem){
          updatedcart=cart.map((item)=>item.id===product.id?{...item,quantity:item.quantity+1}:item)
      }
      else{
          updatedcart=[...cart,{...product,quantity:1}]
      }
      // const updatedCart = [...cart, product];
      setCart(updatedcart);

      try {
        await axios.patch(`${base_url}/users/${user.id}`, {
          cart: updatedcart,
        });
       toast.success("Item succesfully added to cart")
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error("An error to updating the cart")
      }
    };
    const removeCartitem= async(productId)=>{
      if(!user){
          toast.warning("please login to remove")
          
      }
      const updatedCart=cart.filter((item)=>item.id!=productId)
      setCart(updatedCart)
      try{
          await axios.patch(`${base_url}/users/${user.id}`,{
              cart:updatedCart

          })
      }
      catch(err){
          console.log(err);
          
      }
    }
  //  to  increment the quantity 
    const incementQuantity= async(productId)=>{
      const updatedCart=cart.map((item)=>item.id===productId?{...item,quantity:item.quantity+1}:item)
    setCart(updatedCart)
    try{
        await  axios.patch(`${base_url}/users/${user.id}`,{
          cart:updatedCart
        })
    }
    catch(err){
      console.log(err);
      
    }
    }
  //   Function for decremneting the quantity
    const decremnetQuantity= async(productId)=>{
      const updatedCart=cart.map((item)=>item.id===productId?{...item,quantity:item.quantity>1?item.quantity-1:1}:item)
    setCart(updatedCart)
    try{
        await  axios.patch(`${base_url}/users/${user.id}`,{
          cart:updatedCart
        })
    }
    catch(err){
      console.log(err);
      
    }
    }
    const totalQuantity= cart.reduce((acc,item)=>acc+item.quantity,0)
    const totalprice=cart.reduce((acc,item)=>acc+item.price*item.quantity,0)
    const isIncart=(productId)=>{
      return cart.some((item)=> item.id===productId)
    }
    
    
  
    
    
    return (
      <CartContext.Provider value={{ cart, addToCart ,removeCartitem,incementQuantity,decremnetQuantity,isIncart,totalQuantity,totalprice}}>
        {children}
      </CartContext.Provider>
    );
  };
