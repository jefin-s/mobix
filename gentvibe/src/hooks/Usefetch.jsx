import React, { useEffect, useState } from "react";
import axios from "axios";
export const useFetch=(url)=>{
    const[data,setData]=useState([])
    useEffect(()=>{
        const fethApis=async()=>{
            try{
            const response=await axios.get(url)
            const product=response.data
            console.log(product);
            setData(product)
            }
            catch(errors){
                console.log(errors);
                

            }

        }
        fethApis()
    },[url])
    return {data}
}