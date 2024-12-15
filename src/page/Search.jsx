import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsByCategory } from "../context/ProductsByCategoryProvider";
import Nav from "../components/Navbar/Nav.jsx";
import CardProduct from "../components/Product/CardProduct.jsx";

const Search = () => {
  const { categoryName } = useParams(); // Extract category from URL
  const navigate = useNavigate();
  const {
    products,
    productCategories = [], // Default to empty array
    fetchCategoriesWithProducts,
    error,
    fetchProductsByCategory,
  } = useProductsByCategory();
  // fetchProductsByCategory(categoryName)

  // Fetch all categories and products on initial load if not already loaded
  // useEffect(() => {
  //   if (Array.isArray(productCategories) && productCategories.length === 0) {
  //     console.log(
  //       "[Search] Fetching categories and products for the first time",productCategories
  //     );
  //     //fetchProductsByCategory();
  //     fetchCategoriesWithProducts();
  //   }
  // }, [fetchCategoriesWithProducts, productCategories]);

  useEffect(() => {
    if (categoryName) {
      fetchProductsByCategory(categoryName);
    }
  }, [categoryName, fetchProductsByCategory]);

  // Find the category and its products based on categoryName
  const currentCategory =
    productCategories?.find((category) => category.category === categoryName) ||
    categoryName;
  console.log("crrct:", currentCategory);
  // console.log("[Search] Current Category:", currentCategory);

  const handleCategoryChange = (category) => {
    navigate(`/search/${encodeURIComponent(category)}`);
    fetchProductsByCategory(category);
    //console.log("handle")
  };

  const handlePriceFilter = (min, max) => {
    if (categoryName) {
      fetchProductsByCategory(categoryName, { minPrice: min, maxPrice: max });
    }
  };
console.log("product in s",products)
  return (
    <>
      {/* Navbar */}
      <nav className="bg-white items-center">
        <Nav search back cart />
      </nav>

      {/* Breadcrumb */}
      <div className="relative mt-40 mb-2">
        <span className="text-xl font-bold text-gray-800 block text-left absolute bottom-0 left-7">
          <a href="/" className="text-blue-500 hover:underline">
            Home
          </a>{" "}
          / {categoryName || "Category"}
        </span>
      </div>

      {/* Content */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : currentCategory ? (
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden md:block w-[20%] bg-white ml-3 p-4 border-r border-gray-200 ">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Category
            </h3>
            <ul className="text-gray-600 text-sm space-y-2">
              {productCategories.map((category) => (
                <li key={category.category}>
                  <input
                    type="radio"
                    name="category"
                    id={category.category}
                    className="mr-2"
                    onClick={() => handleCategoryChange(category.category)}
                  />
                  <label htmlFor={category.category}>{category.category}</label>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
              Price
            </h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>
                <input
                  type="radio"
                  name="price"
                  id="all-prices"
                  className="mr-2"
                  onClick={() => handlePriceFilter(0, 10000)}
                />
                <label htmlFor="all-prices">All</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="price"
                  id="0-50"
                  className="mr-2"
                  onClick={() => handlePriceFilter(0, 50)}
                />
                <label htmlFor="0-50">฿0 - ฿99</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="price"
                  id="50-100"
                  className="mr-2"
                  onClick={() => handlePriceFilter(50, 100)}
                />
                <label htmlFor="50-100">฿100 - ฿499</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="price"
                  id="100-150"
                  className="mr-2"
                  onClick={() => handlePriceFilter(100, 150)}
                />
                <label htmlFor="100-150">฿500 - ฿999</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="price"
                  id="over-150"
                  className="mr-2"
                  onClick={() => handlePriceFilter(150, 10000)}
                />
                <label htmlFor="over-150">Over ฿1000</label>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full p-3 md:ml-auto">
            {/* {currentCategory?.products?.map((product, index) => (
              <div
                key={product._id || index}
                className="w-full max-w-[500px] mx-auto"
              >
                <CardProduct product={product} />
                123
              </div>
            ))} */}
            {
              products?.map((product, index) => (
                <div
                  key={product._id || index}
                  className="w-full max-w-[500px] mx-auto"
                > 
                  <CardProduct product={product} />
                </div>
              ))
            }
          </div>
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </>
  );
};

export default Search;
