import React, { useContext, useState } from "react";

import { useFetch } from "../../hooks/Usefetch";
import ProductCard from "../../components.jsx/common/Productcard";
import { base_url } from "../../api/api";
import { SearchContext } from "../../components.jsx/Context/Searchcontext";
const Products = () => {
  const{searchTerm}=useContext(SearchContext)
  const { data} = useFetch(`${base_url}/products`);

  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
   
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Smartphones</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((value, index) => {
          return (
            <ProductCard key={value.id}
                 product={value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;
