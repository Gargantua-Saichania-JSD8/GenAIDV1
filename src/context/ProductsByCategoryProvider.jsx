import React, { createContext, useState, useContext, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

export const ProductsByCategoryContext = createContext();

const ProductsByCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]); // Store all categories
  const [products, setProducts] = useState([]); // Store products by category
  const [loading, setLoading] = useState(false); // Generic loading state
  const [error, setError] = useState(null); // Store error messages
  const { backendUrl } = useContext(AuthContext); // Backend URL from AuthContext

  const isFetchingCategories = useRef(false); // To prevent concurrent fetches for categories

  // Fetch all categories
  const fetchCategoriesWithProducts = useCallback(async () => {
    if (isFetchingCategories.current || categories.length > 0) return; // Prevent re-fetching if already loading or data exists
    isFetchingCategories.current = true;

    setLoading(true);
    setError(null);

    try {
      if (!backendUrl) throw new Error("Backend URL is missing");
      const response = await axios.get(`${backendUrl}/api/categories`);
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        throw new Error("Invalid data structure received from API");
      }
    } catch (err) {
      console.error("Error fetching categories:", err.message);
      setError(err.response?.data?.message || "Error fetching categories");
    } finally {
      setLoading(false);
      isFetchingCategories.current = false;
    }
  }, [backendUrl, categories.length]);

  // Fetch products by category
  const fetchProductsByCategory = useCallback(
    async (category, filters = {}) => {

      if (!category) return;
      setLoading(true);
      setError(null);
      console.log("Fetching products for category:", category);
      
      try {
        if (!backendUrl) throw new Error("Backend URL is missing");
        
        const response = await axios.get(
          `${backendUrl}/api/categories/filter-by-category`,
          { params: { category: category , ...filters } }
        );
        console.log("param cate in contenxt ",category)
        console.log("Response from API:", response.data);
        
        if (Array.isArray(response.data)) {
          setProducts(response.data);  // Directly set the array
          console.log("Products set:", response.data);
        } else if (response.data?.products) {
          setProducts(response.data.products);  // Handle object with 'products' key
          console.log("Products set from response object:", response.data.products);
        } else {
          throw new Error("Invalid data structure received from API");
        }
      } catch (err) {
        console.error("Error fetching products by category:", err.message);
        setError(err.response?.data?.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    },
    [backendUrl]  // Dependency array; only re-create function when 'backendUrl' changes
  );
  

  // Fetch categories on mount
  useEffect(() => {
    fetchCategoriesWithProducts();
    fetchProductsByCategory()
  }, [fetchCategoriesWithProducts]);

  return (
    <ProductsByCategoryContext.Provider
      value={{
        products,
        categories, // Expose categories
        products, // Expose products
        fetchCategoriesWithProducts, // Expose function to fetch categories
        fetchProductsByCategory, // Expose function to fetch products
        loading, // Loading state
        error, // Error state
      }}
    >
      {children}
    </ProductsByCategoryContext.Provider>
  );
};

// Custom Hook for easier access
export const useProductsByCategory = () => {
  const context = useContext(ProductsByCategoryContext);
  if (!context) {
    throw new Error(
      "useProductsByCategory must be used within a ProductsByCategoryProvider"
    );
  }
  return context;
};

export default ProductsByCategoryProvider;
