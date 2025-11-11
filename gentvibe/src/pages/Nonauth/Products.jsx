import React, { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/Usefetch";
import ProductCard from "../../components.jsx/common/Productcard";
import { base_url } from "../../api/api";
import { SearchContext } from "../../components.jsx/Context/Searchcontext";


const Products = () => {
 
   const [currentPage, setCurrentPage] = useState(1);
   const[category,setCategory]=useState("all")
   const[sortOrder,setOrder]=useState("none")

  const { searchTerm } = useContext(SearchContext);
  const { data } = useFetch(`${base_url}/products`);
 

  // for  product  browsing
  let  filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // for catgeory 
  if(category!="all"){
    filteredProducts=filteredProducts.filter((product)=>product.category===category)
  }

  // sort 

  if(sortOrder=="low-high")
  {
    filteredProducts.sort((a,b)=>a.price-b.price)
  }
  if(sortOrder=="high-low"){
    filteredProducts.sort((a,b)=>b.price-a.price)
  }

  useEffect(() => {
   
    setCurrentPage(1)
  }, [searchTerm]);

  // ✅ Pagination Logic
  const totalProducts = filteredProducts.length;
  const perPage = 4;
  const offset = (currentPage - 1) * perPage;
  const currentProducts = filteredProducts.slice(offset, offset + perPage);
  const totalPages = Math.ceil(totalProducts / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goPrev = () => {
    if (currentPage > 1){
      setCurrentPage(currentPage-1)
    } 
  };

  const goNext = () => {
    if (currentPage < totalPages) {setCurrentPage(currentPage+1)}
  };

  const handlePageNumberClick = (pageNum) => {
    setCurrentPage(pageNum)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 pt-20">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Explore Our Products
      </h1>
       <div className="flex h-full justify-between mb-5">
        <div>
       <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="all">All Categories</option>
          <option value="smartphones">Smart Phones</option>
          <option value="audio">Audio</option>
          <option value="wearables">Wearables</option>
          <option value="accessories">Accessories</option>
          <option value="laptops">Laptops</option>
         
        </select>
        </div>
        <div>

        
         <select
          value={sortOrder}
          onChange={(e) => setOrder(e.target.value)}
          className="border px-4 py-2 rounded-lg shadow-sm ml-5"
        >
          <option value="none">Sort by Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
        </div>
    </div>

      {/* Product Grid */}
      <div
        className="
          grid 
          grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-6 sm:gap-8
        "
      >
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 gap-3 flex-wrap">
        {/* Prev Button */}
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2 flex-wrap justify-center">
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageNumberClick(pageNum)}
              className={`px-3 py-2 rounded-md border text-sm font-medium transition-all ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
     
    </div>
  );
};

export default Products;
