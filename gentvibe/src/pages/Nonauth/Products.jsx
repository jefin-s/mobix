import React, { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/Usefetch";
import ProductCard from "../../components.jsx/common/Productcard";
import { base_url } from "../../api/api";
import { SearchContext } from "../../components.jsx/Context/Searchcontext";


const Products = () => {
  // url search params for pagination issue
  const queryParams = new URLSearchParams(window.location.search);
const initialPage = Number(queryParams.get("page")) || 1;
const initialCategory=queryParams.get("category")||"all"
const initialSort=queryParams.get("sort")||"none"

 
   const [currentPage, setCurrentPage] = useState(initialPage);
   const[category,setCategory]=useState(initialCategory)
   const[sortOrder,setOrder]=useState(initialSort)
   
  const { searchTerm } = useContext(SearchContext);
  const { data ,setUrlS} = useFetch(`${base_url}/products`);

  // pagination issue solving using url search params
    const updatePageInURL = (pageNum) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", pageNum);
    window.history.pushState({}, "", `/prdctpage?${params.toString()}`);

  };
//  category issue 
 const updateCategoryInURL = (value) => {
  const params = new URLSearchParams(window.location.search);
  params.set("category", value);
  window.history.pushState({}, "", `/prdctpage?${params.toString()}`);
};
// sort issue
const updateSortInURL = (value) => {
  const params = new URLSearchParams(window.location.search);
  params.set("sort", value);
  window.history.pushState({}, "", `/prdctpage?${params.toString()}`);
};

// debouncing logic 
const [debounceValue,setDebounceValue]=useState(searchTerm)

 useEffect(()=>{
  const handler=setTimeout(()=>{
    setDebounceValue(searchTerm)
    console.log(searchTerm);
    
  },500)
  return()=>clearTimeout(handler)
 },[searchTerm])

 useEffect(()=>{
  setUrlS(`${base_url}/products?search=${debounceValue}`)
 

 },[debounceValue])
  // for  product  browsing
  let  filteredProducts = data.filter((product) =>
    product.title&&
    product.title.toLowerCase().includes(debounceValue.toLowerCase())
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
      updatePageInURL(currentPage-1)
    } 
  };

  const goNext = () => {
    if (currentPage < totalPages) {setCurrentPage(currentPage+1)
      updatePageInURL(currentPage+1)
    }
  };

  const handlePageNumberClick = (pageNum) => {
    setCurrentPage(pageNum)
    updatePageInURL(pageNum)
  };
   useEffect(() => {
  if (category !== "all" || sortOrder !== "none") {
    setCurrentPage(1);
    updatePageInURL(1);
  }
}, [category, sortOrder]);

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
          onChange={(e) =>{setCategory(e.target.value)
          updateCategoryInURL(e.target.value)}}
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
          onChange={(e) => {setOrder(e.target.value)
             updateSortInURL(e.target.value)}
          }
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
        {currentProducts.map((product) =>product.isDeleted==false&& (
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
