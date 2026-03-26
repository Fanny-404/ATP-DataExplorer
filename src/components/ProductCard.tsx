/**
 * ProductCard Component
 * Displays a single product in the catalog grid
 * Shows product image, title, description, price, rating, and action button
 * Features:
 * - Lazy loading for product images
 * - Fallback placeholder for missing images
 * - 'Top Rated' badge for highly-rated products (>4.0 rating)
 * - Price formatting with currency
 * - Customer rating with count
 * - View Details button for opening product detail modal
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Product} props.product - Product data to display
 * @param {Function} props.onViewDetails - Callback fired when View Details button clicked
 * @returns {React.ReactElement} Product card component
 * 
 * @example
 * const product = { id: 1, title: 'Laptop', price: 999, ... }
 * return <ProductCard product={product} onViewDetails={handleViewDetails} />
 */

import React from 'react';
import type { Product } from '../types/product';
import '../styles/ProductCard.css';

/**
 * Props for ProductCard component
 */
interface ProductCardProps {
  /** Product object containing all product information */
  product: Product;
  /** Callback function triggered when View Details button is clicked */
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const rating = product.rating?.rate || 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23999%22%3EImage not available%3C/text%3E%3C/svg%3E';
          }}
        />
        {rating > 4.0 && <div className="product-badge">⭐ Top Rated</div>}
      </div>

      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>

        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <div className="product-price-rating">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {rating > 0 && (
              <span className="product-rating">
                ⭐ {rating.toFixed(1)} ({product.rating?.count || 0})
              </span>
            )}
          </div>
        </div>

        <div className="product-actions">
          <button
            className="btn btn-primary"
            onClick={() => onViewDetails(product)}
            aria-label={`View details for ${product.title}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
