// src/components/users/hooks/ProductsContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductsContext = createContext();
export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  // Initialize products from sessionStorage if available
  const [products, setProducts] = useState(() => {
    const cached = sessionStorage.getItem("productsCache");
    return cached ? JSON.parse(cached) : [];
  });

  const [loading, setLoading] = useState(products.length === 0); // only true if no cached products
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/products?status=Active`);
        const fetchedProducts = res.data.products || [];
        setProducts(fetchedProducts);

        // Cache products in sessionStorage
        sessionStorage.setItem("productsCache", JSON.stringify(fetchedProducts));
      } catch (err) {
        console.error("Failed to load products:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

