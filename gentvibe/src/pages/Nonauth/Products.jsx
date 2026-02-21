import React, { useContext, useEffect, useState } from "react";
import { useFetch } from "../../hooks/Usefetch";
import ProductCard from "../../components/common/Productcard";
import { base_url } from "../../api/api";
import { SearchContext } from "../../components/Context/Searchcontext";
import { useDebounce } from "../../hooks/useDebounce";

const Products = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  

  const { searchTerm } = useContext(SearchContext);
  const debounceSearch=useDebounce(searchTerm,400)

  const { data, setUrl, loading } = useFetch("");
  
 const [categories,setCategories]=useState([]);

  

  const perPage = 10;

 
  useEffect(() => {

    let url = `${base_url}/Products/GetproductsCombined?pageNumber=${currentPage}&pageSize=${perPage}`;

    if (category) url += `&category=${category}`;
    if (searchTerm) url += `&search=${searchTerm}`;
    if (sortOrder) url += `&sortBy=${sortOrder}`;

    setUrl(url);

  }, [currentPage, category, sortOrder, debounceSearch]);
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${base_url}/Category/GetAllCategories`);
      const result = await response.json();
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();
}, []);


  // 🔥 Extract Backend Data
  const products = data?.data?.items || [];
 const totalCount = data?.data?.totalRecords || 0;

  const totalPages = Math.ceil(totalCount / perPage);

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050816] to-black text-white py-10 px-4 sm:px-8 pt-20">

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Explore Our Products
      </h1>

      {/* Category + Sorting */}
      <div className="flex justify-between mb-5">

        {/* Category */}
        <select
  value={category}
  onChange={(e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  }}
  className="border px-4 py-2 rounded-lg shadow-sm"
>
  <option value="">All Categories</option>

  {categories?.map((cat) => (
    <option key={cat.name} value={cat.name}>
      {cat.name}
    </option>
  ))}
</select>


        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="">Sort by Price</option>
          <option value="priceAsc">Low to High</option>
          <option value="priceDesc">High to Low</option>
        </select>

      </div>

     
     {/* Loading */}
{loading && (
  <p className="text-center text-white">Loading products...</p>
)}

{!loading && products.length === 0 && (
  <p className="text-center text-white">No Products Found</p>
)}

{!loading && products.length > 0 && (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)}
      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 gap-3 flex-wrap">

        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`px-3 py-2 rounded-md ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400"
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
