import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { base_url } from '../api/api'
import { HiH2 } from 'react-icons/hi2'

const DetailedUser = () => {
    const{userid}=useParams()
    const[User,setUser]=useState(null)
       const fethwithid=async()=>{
       try{
      const response=await axios(`${base_url}/users/${userid}`)
         console.log(response.data);
         
          setUser(response.data)
       }
       catch(error){
        console.log(error); 
        
       }
       }
    useEffect(()=>{
        fethwithid()
        
    },[userid])
  return (
    <div>

      {
        User?
        <h1>{User.name}</h1>
        : <h2>Loading</h2>
      }

    </div>
  )
}

export default DetailedUser