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
    const totalproducts=filteredProducts.length
    const[currentPage,setCurrentpage]=useState(1)
    const perPage=4
    const offset=(currentPage-1)*perPage
    const currentProducts=filteredProducts.slice(offset,offset+perPage)
    const  totalPage=Math.ceil(totalproducts/perPage)
    const pageNumber=Array.from({length:totalPage},(_,i)=>i+1)
      const goPrev=()=>{
    if (currentPage>1) {
      setCurrentpage(currentPage-1)
      
    }
  }
  const gotoNext=()=>{
    if(currentPage<totalPage){
      setCurrentpage(currentPage+1)
    }
  }

 const handlepageNumberClick=(pageNumber)=>{
    setCurrentpage(pageNumber)
 }
    return (
    
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">Smartphones</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentProducts.map((value, index) => {
            return (
              <ProductCard key={value.id}
                  product={value}
              />
            );
          })}
        </div>
        <div className="flex justify-center items-center mt-10 gap-5">
          <div>
            <button onClick={goPrev} disabled={currentPage==1} className="bg-blue-300 rounded-md p-2">prev</button>
          </div>
          <div >
           {
            pageNumber.map((pageNum,i)=>{
              return <button key={i}  onClick={()=>handlepageNumberClick(pageNum)} className="ml-2 border p-2 ">
                {pageNum}
              </button>
            })
           }
          </div>
          <div>
             <button onClick={gotoNext} disabled={currentPage==totalPage} className="bg-blue-300 rounded-md p-2">next</button>
          </div>
        </div>
      </div>
    );
  };

  export default Products;


