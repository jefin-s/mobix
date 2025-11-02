import React, { useState } from 'react'
import { URL } from '../../api/productapi'
import { useFetch } from '../../hooks/Usefetch'
import ProductCard from '../../components.jsx/common/Productcard'
const Products = () => {
   const {data}= useFetch("https://dummyjson.com/products/category/smartphones")
    console.log(data);
    
  return (
 <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Smartphones</h1>



     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
    {
        data.map((value,index)=>{
            
            return(
                    <ProductCard name={value.title} price={value.price} id={value.id} image={value.thumbnail}/>

            )
        })
    }
    </div>
 

</div>
  )
}

export default Products