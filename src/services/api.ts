/**
 * API Service Module
 * Handles all HTTP requests to the FakeStore API
 * Uses Axios for HTTP client with base configuration
 * 
 * @module services/api
 * @example
 * import { apiService } from './services/api';
 * const products = await apiService.getAllProducts();
 */

import axios from 'axios';
import type { Product } from '../types/product';
import type { AxiosInstance } from 'axios';

/** Base URL for FakeStore API */
const API_BASE_URL = 'https://fakestoreapi.com';

/** Axios instance with default configuration */
let apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout for API requests
});

/**
 * Override the API client instance (useful for testing)
 * @param {AxiosInstance} client - New axios instance to use
 */
export const setApiClient = (client: AxiosInstance) => {
  apiClient = client;
};

/**
 * API service object containing all product-related API calls
 */
export const apiService = {
  /**
   * Fetch all products from the API
   * @async
   * @returns {Promise<Product[]>} Array of all products
   * @throws {Error} If the API request fails
   */
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products. Please try again later.');
    }
  },

  /**
   * Fetch a single product by its ID
   * @async
   * @param {number} id - Product ID to fetch
   * @returns {Promise<Product>} The requested product
   * @throws {Error} If the API request fails
   */
  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product details.');
    }
  },

  /**
   * Fetch all available product categories
   * @async
   * @returns {Promise<string[]>} Array of category names
   * @throws {Error} If the API request fails
   */
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<string[]>('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories.');
    }
  },

  /**
   * Fetch all products in a specific category
   * @async
   * @param {string} category - Category name to filter by
   * @returns {Promise<Product[]>} Array of products in the category
   * @throws {Error} If the API request fails
   */
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error(`Failed to fetch products in category: ${category}`);
    }
  },
};

