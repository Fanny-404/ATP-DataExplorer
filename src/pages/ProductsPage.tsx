/**
 * ProductsPage Component
 * Main page component that displays the E-Store product catalog
 * Serves as the layout container for search, filters, and product grid
 * 
 * Features:
 * - Product search by title/description
 * - Category filtering
 * - Price-based sorting
 * - Grid/List view toggle
 * - Loading skeleton UI
 * - Error handling with retry
 * 
 * @component
 * @example
 * return <ProductsPage />
 */

import React, { useState } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { SortBar } from '../components/SortBar';
import { SkeletonGrid } from '../components/Skeleton';
import { useProducts, useFilteredProducts } from '../hooks/useProducts';
import '../styles/ProductsPage.css';

export const ProductsPage: React.FC = () => {
  // Fetch products and categories from API
  const { products, categories, loading, error, retry } = useProducts();
  
  // Local state for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | 'none'>('none');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Apply filters to products
  const filteredProducts = useFilteredProducts(products, searchTerm, selectedCategory, sortBy);

  return (
    <div className="products-page">
      {/* Header with title and subtitle */}
      <header className="page-header">
        <h1 className="page-title">🛍️ E-Store Catalog</h1>
        <p className="page-subtitle">Discover our amazing collection of products</p>
      </header>

      <div className="page-container">
        {/* Search bar section */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          disabled={loading}
          placeholder="Search for products..."
        />

        {/* Category filter section */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          disabled={loading}
        />

        {/* Sort and view mode controls */}
        <SortBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          disabled={loading}
        />

        {/* Error state - shown when API request fails */}
        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button className="btn-retry" onClick={retry}>
              Retry
            </button>
          </div>
        )}

        {/* Loading state - skeleton loader shown while fetching data */}
        {loading && <SkeletonGrid count={12} />}

        {/* Products display - grid or list depending on viewMode */}
        {!loading && !error && (
          <ProductGrid products={filteredProducts} viewMode={viewMode} />
        )}
      </div>
    </div>
  );
};

