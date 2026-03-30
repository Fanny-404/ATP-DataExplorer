/**
 * Hooks for managing product data and filtering
 * @module hooks/useProducts
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Product, ProductsState } from '../types/product';
import { apiService } from '../services/api';

/**
 * Custom hook for managing products data and state
 * Fetches products and categories from the API on component mount
 * Provides a retry mechanism for failed requests
 * Falls back to sample data if API request fails
 * 
 * @hook useProducts
 * @returns {Object} Object containing:
 *   - products {Product[]} - Array of all products
 *   - categories {string[]} - Array of available categories
 *   - loading {boolean} - Loading state during data fetch
 *   - error {string|null} - Error message if fetch fails
 *   - retry {Function} - Function to retry failed requests
 * 
 * @example
 * const { products, categories, loading, error, retry } = useProducts();
 * if (loading) return <div>Loading...</div>;
 * if (error) return <button onClick={retry}>Retry</button>;
 * return <ProductGrid products={products} />;
 */
export const useProducts = () => {
  // Initialize state with empty products and loading indicator
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: true,
    error: null,
    categories: [],
  });

  // Fetch products and categories on component mount
  useEffect(() => {
    // Fallback products displayed when API fails (for demo purposes)
    const fallbackProducts: Product[] = [
      {
        id: 1,
        title: 'Sample Vintage Backpack',
        price: 45.99,
        description: 'Stylish and durable backpack for travel and daily use.',
        category: "men's clothing",
        image:
          'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 4.3, count: 120 },
      },
      {
        id: 2,
        title: 'Modern Wireless Headphones',
        price: 99.99,
        description: 'Noise-cancelling headphones with up to 20h battery life.',
        category: 'electronics',
        image:
          'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
        rating: { rate: 4.6, count: 220 },
      },
    ];

    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // Fetch products and categories in parallel for better performance
        const [products, categories] = await Promise.all([
          apiService.getAllProducts(),
          apiService.getCategories(),
        ]);

        setState({
          products,
          categories,
          loading: false,
          error: null,
        });
      } catch (error) {
        // Format error message for display
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch products';
        // Fall back to sample data and show error
        setState({
          products: fallbackProducts,
          categories: [],
          loading: false,
          error: `${errorMessage}. Se muestran datos de ejemplo.`,
        });
      }
    };

    fetchData();
  }, []);

  /**
   * Retry function to attempt fetching data again
   * Useful when user wants to retry after a failed request
   * @async
   */
  const retry = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const [products, categories] = await Promise.all([
        apiService.getAllProducts(),
        apiService.getCategories(),
      ]);
      setState({
        products,
        categories,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch products';
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
    }
  }, []);

  return { ...state, retry };
};

/**
 * Custom hook for filtering and sorting products
 * Applies search, category filter, and price sorting to product list
 * Automatically updates when any filter criteria change
 * 
 * @hook useFilteredProducts
 * @param {Product[]} products - Array of products to filter
 * @param {string} searchTerm - Search query term for title/description matching
 * @param {string|null} selectedCategory - Category filter (null = all categories)
 * @param {'asc'|'desc'|'none'} sortBy - Price sort order
 * @returns {Product[]} Filtered and sorted array of products
 * 
 * @example
 * const filtered = useFilteredProducts(
 *   products,
 *   'laptop',
 *   'electronics',
 *   'asc'
 * );
 * // Returns electronics products matching 'laptop', sorted price low to high
 */
export const useFilteredProducts = (
  products: Product[],
  searchTerm: string,
  selectedCategory: string | null,
  sortBy: 'asc' | 'desc' | 'none'
) => {
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Step 1: Apply category filter if selected
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Step 2: Apply search filter on title and description
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Step 3: Apply price sorting
    if (sortBy !== 'none') {
      result.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        // Sort ascending (low to high) or descending (high to low)
        return sortBy === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  return filteredProducts;
};

